# 线程锁
在上一章中我们讲到了多线程的安全问题，也提出了解决方案是使用线程同步技术，而常见的线程同步方案就是加锁。

锁的种类有很多,自旋锁、互斥锁、读写锁、递归锁等等

* 自旋锁: 等待锁的线程会处于忙等待（busy-wait）状态，可以使用伪代码`while (test_and_set(lock) == 1);`表示。自旋锁避免了进程上下文的调度开销，因此对于线程只会阻塞很短时间的场合是有效的。 自旋锁属于轻量级锁。也叫低级锁。(自旋锁的缺点：可能会引起优先级反转问题)
* 互斥锁: 当有一个线程加锁执行任务的时候，其他等待锁的线程会进入休眠状态，线程的休眠由系统进行调度的。这种属于重量级锁，也叫高级锁
* 递归锁: 递归调用时,允许同一个线程对一把锁进行重复加锁。

这里的什么轻量级锁、重量级锁、低级锁、高级锁只是一个叫法，不用死记硬背,它们主要是根据**线程是不是由系统进行调度**来决定的。

## OSSpinLock
OSSpinLock 叫做”自旋锁”,使用时需要导入头文件`#import <libkern/OSAtomic.h>`,在iOS10中被弃用。
```objc
// 初始化锁
OSSpinLock lock = OS_SPINLOCK_INIT;
// 尝试加锁（如果需要等待就不加锁，返回false，如果不需要等待就加锁，返回true）
bool result = OSSpinLockTry(&lock);
// 加锁
OSSpinLockLock(&lock);
// 解锁
OSSpinLockUnlock(&lock);
```

## os_unfair_lock
`os_unfair_lock` 用于取代不安全的`OSSpinLock`，从iOS10开始才支持。从底层调用看，等待`os_unfair_lock`锁的线程会处于休眠状态，并非忙等,需要导入头文件`#import <os/lock.h>`
```objc
// 初始化锁
OSSpinLock lock = OS_SPINLOCK_INIT;
// 尝试加锁（如果需要等待就不加锁，返回false，如果不需要等待就加锁，返回true）
OSSpinLockTry(&lock);
// 加锁
OSSpinLockLock(&lock);
// 解锁
OSSpinLockUnlock(&lock);
```

## pthread_mutex
mutex 叫做”互斥锁”，等待锁的线程会处于休眠状态。需要导入头文件`#import <pthread.h>`
```objc
// Mutex type attributes
#define PTHREAD_MUTEX_NORMAL		0   // 默认锁
#define PTHREAD_MUTEX_ERRORCHECK	1   // 检查错误的锁
#define PTHREAD_MUTEX_RECURSIVE		2   // 递归锁
#define PTHREAD_MUTEX_DEFAULT		PTHREAD_MUTEX_NORMAL

// 初始化属性
pthread_mutexattr_t attr;
pthread_mutexattr_init(&attr);
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_DEFAULT);
// 初始化锁
pthread_mutex_t mutex;
pthread_mutex_init(&mutex, &attr);
// 使用默认属性初始化锁时，可以直接使用NUll,等同于上面的初始化锁
pthread_mutex_init(&mutex, NULL);

// 加锁
pthread_mutex_lock(&mutex);
// 尝试加锁
pthread_mutex_trylock(&mutex);
// 解锁
pthread_mutex_unlock(&mutex);
// 销毁属性
pthread_mutexattr_destroy(&attr);
// 不使用时销毁锁
pthread_mutex_destroy(&mutex);
```
**递归锁**

在递归方法中进行加锁的话，需要使用递归锁。递归锁的原理：**允许同一个线程对一把锁进行重复加锁**
```objc
// 初始化属性
pthread_mutexattr_t attr;
pthread_mutexattr_init(&attr);
pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
// 初始化锁
pthread_mutex_t mutex;
pthread_mutex_init(&mutex, &attr);
```

**条件锁**


## 通过汇编对比  OSSpinLock 、os_unfair_lock 、 pthread_mutex
在Xcode中使用`Debug -> Debug Workflow -> Always Show Disassembly`的方式通过汇编查看其他线程在锁外等待解锁的状态
```
 ->  0x7fff60c81aef <+14>: movl   (%rdi), %eax
     0x7fff60c81af1 <+16>: testl  %eax, %eax
     0x7fff60c81af3 <+18>: jne    0x7fff60c81afd            ; <+28>
     0x7fff60c81af5 <+20>: xorl   %eax, %eax
     0x7fff60c81af7 <+22>: lock
     0x7fff60c81af8 <+23>: cmpxchgl %edx, (%rdi)
     0x7fff60c81afb <+26>: je     0x7fff60c81b0c            ; <+43>
     0x7fff60c81afd <+28>: cmpl   $-0x1, %eax
     0x7fff60c81b00 <+31>: jne    0x7fff60c81b14            ; <+51>
     0x7fff60c81b02 <+33>: testl  %ecx, %ecx
     0x7fff60c81b04 <+35>: je     0x7fff60c81b0e            ; <+45>
     0x7fff60c81b06 <+37>: pause
     0x7fff60c81b08 <+39>: incl   %ecx
     0x7fff60c81b0a <+41>: jmp    0x7fff60c81aef            ; <+14>
```
根据调试，我们看到使用`OSSpinLock`进行加锁，其他线程等待解锁这块汇编跟`while()条件语句`的汇编基本是一样的。

`os_unfair_lock` 的汇编结果，通过`syscall`函数让线程休眠
```
libsystem_kernel.dylib`__ulock_wait:
->  0x7fff60c53554 <+0>:  movl   $0x2000203, %eax          ; imm = 0x2000203 
    0x7fff60c53559 <+5>:  movq   %rcx, %r10
    0x7fff60c5355c <+8>:  syscall 
    0x7fff60c5355e <+10>: jae    0x7fff60c53568            ; <+20>
    0x7fff60c53560 <+12>: movq   %rax, %rdi
    0x7fff60c53563 <+15>: jmp    0x7fff60c52629            ; cerror_nocancel
    0x7fff60c53568 <+20>: retq  
```

`pthread_mutex` 的汇编结果，通过`syscall`函数让线程休眠
```
 libsystem_kernel.dylib`__psynch_mutexwait:
 ->  0x7fff60c54058 <+0>:  movl   $0x200012d, %eax          ; imm = 0x200012D
     0x7fff60c5405d <+5>:  movq   %rcx, %r10
     0x7fff60c54060 <+8>:  syscall
     0x7fff60c54062 <+10>: jae    0x7fff60c5406c            ; <+20>
     0x7fff60c54064 <+12>: movq   %rax, %rdi
     0x7fff60c54067 <+15>: jmp    0x7fff60c52629            ; cerror_nocancel
     0x7fff60c5406c <+20>: retq
```
通过查看汇编的方法，我们可以更清楚的看到线程在等待解锁的过程底层是如何实现的。

## 知识扩展
* [优先级倒置](https://zh.wikipedia.org/wiki/%E4%BC%98%E5%85%88%E8%BD%AC%E7%BD%AE)
1. 进程分优先级，`高优先级进程需要执行时可打断现正在执行的低优先级进程`
2. 普通的临界资源使用方法，`如果一个临界资源被获取了，其它想要获取此资源的程序被阻塞，直到此资源被释放`
3. 有三个进程（其优先级从高到低分别为T1、T2、T3），有一个临界资源CS（T1与T3会用到）。这时，T3先执行，获取了临界资源CS。然后T2打断T3。接着T1打断T2，但由于CS已被T3获取，因此T1被阻塞，这样T2获得时间片。直到T2执行完毕后，T3接着执行，其释放CS后，T1才能获取CS并执行。这时，我们看T1与T2，虽然T1优先级比T2高，但实际上T2优先于T1执行。这称之为优先级逆转。

* [忙等（busy-wait）](https://zh.wikipedia.org/wiki/%E5%BF%99%E7%A2%8C%E7%AD%89%E5%BE%85)


在软件工程中，忙碌等待（也称自旋；英语：Busy waiting、busy-looping、spinning）是一种以进程反复检查一个条件是否为真为根本的技术，条件可能为键盘输入或某个锁是否可用。忙碌等待也可以用来产生一个任意的时间延迟，若系统没有提供生成特定时间长度的方法，则需要用到忙碌等待。不同的计算机处理器速度差异很大，特别是一些处理器设计为可能根据外部因素（例如操作系统上的负载）动态调整速率。因此，忙碌等待这种时间延迟技术容易产生不可预知、甚至不一致的结果，除非实现代码来确定处理器执行“什么都不做”循环的速度，或者循环代码明确检查实时时钟。

在某些情况下，忙碌等待是有效的策略，特别是实现自旋锁设计的操作系统上运行对称多处理。不过一般来说，忙碌等待是应该避免的反模式[1]，处理器时间应该用来执行其他任务，而不是浪费在无用的活动