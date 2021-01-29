# 线程锁
在上一章中我们讲到了多线程的安全问题，也提出了解决方案是使用线程同步技术，而常见的线程同步方案就是加锁。

锁的种类有很多,自旋锁、互斥锁、读写锁、递归锁等等

* 自旋锁: 等待锁的线程会处于忙等待（busy-wait）状态，可以使用伪代码`while (test_and_set(lock) == 1);`表示。自旋锁避免了进程上下文的调度开销，因此对于线程只会阻塞很短时间的场合是有效的。 自旋锁属于轻量级锁。(自旋锁的缺点：可能会引起优先级倒置问题)
* 互斥锁: 当有一个线程加锁执行任务的时候，其他等待锁的线程会进入休眠状态，线程的休眠由系统进行调度的。这种属于重量级锁
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

当条件不满足时，调用`pthread_cond_wait()`解锁休眠当前线程，条件满足时通过`pthread_cond_signal()`或者`pthread_cond_broadcast()`唤醒被休眠的线程。线程被唤醒后，会重新加锁。
```objc
// 初始化锁
pthread_mutex_t mutex;
pthread_mutex_init(&mutex, NULL);
// 初始化条件
pthread_cond_t cond;
pthread_cond_init(&cond, NULL);
// 等待条件（进入休眠，放开mutex锁，被唤醒后，会重新加锁）
pthread_cond_wait(&cond, &mutex);
// 激活一个等待该条件的线程
pthread_cond_signal(&cond);
// 激活所有等待该条件的线程
pthread_cond_broadcast(&cond);
// 销毁资源
pthread_mutex_destroy(&mutex);
pthread_cond_destroy(&cond);
```
通过在两个线程对数组进行添加、删除数据的例子演示一下条件锁的使用，类似于生产者消费者模式。
```objc
@interface MutexDemo2 ()
@property (nonatomic, assign)pthread_mutex_t mutex;
@property (nonatomic, assign)pthread_cond_t cond;
@property (nonatomic, strong)NSMutableArray *dataAry;
@end

@implementation MutexDemo2
- (instancetype)init{
    self = [super init];
    if (self) {
        _dataAry = [NSMutableArray array];
        // 初始化锁
        pthread_mutex_init(&_mutex, NULL);
        // 初始化条件
        pthread_cond_init(&_cond, NULL);
    }
    return self;
}

- (void)otherTest{
    [[[NSThread alloc] initWithTarget:self selector:@selector(__removeObject) object:nil] start];
    sleep(1);
    [[[NSThread alloc] initWithTarget:self selector:@selector(__addObject) object:nil] start];
}

- (void)__removeObject{
    // 加锁
    pthread_mutex_lock(&_mutex);
    if (_dataAry.count == 0) {
        //当前线程进入休眠状态，等待条件成立，会先解锁，条件成立之后再次加锁继续执行
        pthread_cond_wait(&_cond, &_mutex);
        NSLog(@"消费者");
    }
    [_dataAry removeLastObject];
    pthread_mutex_unlock(&_mutex);
}

- (void)__addObject{
    // 加锁
    pthread_mutex_lock(&_mutex);
    [_dataAry addObject:@"1"];
    NSLog(@"生产者");
    // 发出信号,唤醒等待条件的线程
    pthread_cond_signal(&_cond);
    // 解锁
    pthread_mutex_unlock(&_mutex);
}

- (void)dealloc{
    pthread_mutex_destroy(&_mutex);
    pthread_cond_destroy(&_cond);
}
@end
```
1. 线程A 先调用 `__removeObject` 方法，休眠1秒后，线程B调用 `__addObject`方法
2. 在 `__removeObject` 方法中，如果数组没有数据，让当前线程解锁并进入休眠状态
3. 线程A 解锁之后，线程B 进入 `__addObject `方法
4. 数组添加数据之后，调用`pthread_cond_signal()`函数唤醒处于休眠状态的线程
5. 在`__addObject`方法解锁之后，`pthread_cond_wait()`函数重新加锁向下运行。


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
通过查看汇编的方法，我们可以更清楚的看到线程是如何在等待解锁的过程

## NSLock、NSRecursiveLock、NSCondition、NSConditionLock
* NSLock 是对mutex普通锁的封装
* NSRecursiveLock 是对mutex递归锁的封装，API跟NSLock基本一致
* NSCondition 是对mutex和cond的封装
* NSConditionLock 是对 NSCondition 的进一步封装，可以设置具体的条件值

```objc
@protocol NSLocking
- (void)lock;
- (void)unlock;
@end

@interface NSLock : NSObject <NSLocking> {
// 尝试加锁，不会让线程休眠
- (BOOL)tryLock;
// 截止传入的时间之前让线程休眠，如果到时候会依然没有加锁成功返回NO，在时间之前加锁成功返回YES，继续向下执行
- (BOOL)lockBeforeDate:(NSDate *)limit;
@end

@interface NSRecursiveLock : NSObject <NSLocking> {
- (BOOL)tryLock;
- (BOOL)lockBeforeDate:(NSDate *)limit;
@end

@interface NSCondition : NSObject <NSLocking> {
- (void)wait;
- (BOOL)waitUntilDate:(NSDate *)limit;
- (void)signal;
- (void)broadcast;
@end

@interface NSConditionLock : NSObject <NSLocking> {
// 初始化一个条件
- (instancetype)initWithCondition:(NSInteger)condition;

@property (readonly) NSInteger condition;
// 根据条件进行加锁
- (void)lockWhenCondition:(NSInteger)condition;
- (BOOL)tryLock;
- (BOOL)tryLockWhenCondition:(NSInteger)condition;
- (void)unlockWithCondition:(NSInteger)condition;
- (BOOL)lockBeforeDate:(NSDate *)limit;
- (BOOL)lockWhenCondition:(NSInteger)condition beforeDate:(NSDate *)limit;
@end
```
## 串行队列
直接使用GCD的串行队列，也是可以实现线程同步的。线程同步本来就是为了防止多个线程更改同一块资源，使用串行队列，让任务交替执行也可以达到线程同步的效果。
```
dispatch_queue_t lock_queue = dispatch_queue_create("lock_queue", DISPATCH_QUEUE_SERIAL);
dispatch_sync(lock_queue, ^{
    // 执行任务，注意当前串行队列不能和异步调用的队列是同一个。
});
```
## dispatch_semaphore
`semaphore`叫做"信号量",信号量的初始值，可以用来控制线程并发访问的最大数量。信号量的初始值为1，代表同时只允许1条线程访问资源，保证线程同步。
```objc
// 信号量初始值
int value = 1;
// 初始化信号量
dispatch_semaphore_t semaphore = dispatch_semaphore_create(value);
// 如果信号量的值 <= 0,当前线程会进入休眠等待 （直到信号量的值>0）
// 如果信号量的值 > 0, 信号量 -1, 然后向下继续执行代码
dispatch_semaphore_wait(semaphore,DISPATCH_TIME_FOREVER);
// 信号量的值 + 1
dispatch_semaphore_signal(semaphore);
```
信号量的使用技巧，直接写成宏定义来调用
```objc
// 加锁
#define SemaphoreBegin \
static dispatch_semaphore_t semaphore; \
static dispatch_once_t onceToken; \
dispatch_once(&onceToken, ^{ \
    semaphore = dispatch_semaphore_create(1); \
}); \
dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER); \

// 解锁
#define SemaphoreEnd  dispatch_semaphore_signal(semaphore);
```

## @synchronized
`@synchronized`是对mutex递归锁的封装，通过 objc4 中的`objc-sync.mm`文件查看源码，`@synchronized(obj)`内部会生成obj对应的递归锁，然后进行加锁、解锁操作。
```objc
@synchronized (对象) { // 使用汇编查看，进入时调用 objc_sync_enter
    // 任务
} // 结束时调用 objc_sync_exit
```

## 自旋锁和互斥锁的比较
**什么情况使用自旋锁比较划算？**
* 预计线程等待锁的时间很短
* 加锁的代码（临界区）经常被调用，但竞争情况很少发生
* CPU资源不紧张
* 多核处理器

**什么情况使用互斥锁比较划算？**
* 预计线程等待锁的时间较长
* 单核处理器
* 临界区有IO操作 (临界区是指加锁和解锁之间的区域)
* 临界区代码复杂或者循环量大
* 临界区竞争非常激烈

## atumic
`atomic`用于保证属性`setter、getter`的原子性操作，相当于在`getter和setter`内部加了线程同步的锁
,通过objc4 的`objc-accessors.mm`文件可以查看源码，

注意:`atomic`只能保证赋值和取值时的安全，并不能保证使用属性的过程是线程安全的。这句话怎么解读呢？比如说我们定义一个数组，在使用setter和getter的方法的内部数组是安全的，如果是往数组内添加数据，这个过程是不能保证线程安全的。

通过源码查看`automic`:
```objc
// getter方法
id objc_getProperty(id self, SEL _cmd, ptrdiff_t offset, BOOL atomic) {
    ...
    id *slot = (id*) ((char*)self + offset);
    if (!atomic) return *slot;
        
    // Atomic retain release world
    spinlock_t& slotlock = PropertyLocks[slot];
    slotlock.lock();
    id value = objc_retain(*slot);
    slotlock.unlock();
    
    return objc_autoreleaseReturnValue(value);
}

// setter方法
static inline void reallySetProperty(id self, SEL _cmd, id newValue, ptrdiff_t offset, bool atomic, bool copy, bool mutableCopy)
{
   ...
    if (!atomic) { // 如果不是atomic，直接赋值，
        oldValue = *slot;
        *slot = newValue;
    } else { // 如果是atomic,在赋值前会先加锁，赋值后解锁。
        spinlock_t& slotlock = PropertyLocks[slot];
        slotlock.lock();
        oldValue = *slot;
        *slot = newValue;        
        slotlock.unlock();
    }
    ...
}
```

## 读写锁
我们知道多线程引发的安全问题原因：主要在于多个线程同时修改同一个资源或者同时读写同一个资源引发的安全问题。如果只是多个线程读取资源，会引发安全问题吗？并不会对吧。那么在IO操作中，只用一个线程对它进行写，多个线程对它的内容进行读取。是不是读写文件时更好的一种方式呢？这种场景就是典型的"多读单写"。
* 同一时间，只能有1个线程进行写的操作
* 同一时间，允许有多个线程进行读的操作
* 同一时间，不允许既有写的操作，又有读的操作

多读单写"经常用于文件等数据的读写操作，iOS中的实现方案有
* `pthread_rwlock`：读写锁
* `dispatch_barrier_async`：异步栅栏调用

**pthread_rwlock**
读写锁主要是使用`pthread_rwlock_rdlock()`方法对读操作进行加锁，使用`pthread_rwlock_wrlock()`方法对写操作进行加锁。
```objc
// 初始化锁
pthread_rwlock_t lock;
pthread_rwlock_init(&lock, NULL);
// 读-加锁
pthread_rwlock_rdlock(&lock);
// 读-尝试加锁
pthread_rwlock_tryrdlock(&lock);
// 写-加锁
pthread_rwlock_wrlock(&lock);
// 写-尝试加锁
pthread_rwlock_trywrlock(&lock);
// 解锁
pthread_rwlock_unlock(&lock);
// 销毁
pthread_rwlock_destroy(&lock);
```

**pthread_rwlock**
这个函数传入的并发队列必须是自己通过`dispatch_queue_cretate`创建的,如果传入的是一个串行或是一个全局的并发队列，那这个函数便等同于dispatch_async函数的效果

```objc
// 初始化队列
dispatch_queue_t queue = dispatch_queue_create("rw_queue", DISPATCH_QUEUE_CONCURRENT);
// 读
dispatch_async(queue, ^{
    
});
// 写
dispatch_barrier_async(queue, ^{
    
});
```

## 知识扩展
* [优先级倒置](https://zh.wikipedia.org/wiki/%E4%BC%98%E5%85%88%E8%BD%AC%E7%BD%AE)
1. 进程分优先级，`高优先级进程需要执行时可打断现正在执行的低优先级进程`
2. 普通的临界资源使用方法，`如果一个临界资源被获取了，其它想要获取此资源的程序被阻塞，直到此资源被释放`
3. 有三个进程（其优先级从高到低分别为T1、T2、T3），有一个临界资源CS（T1与T3会用到）。这时，T3先执行，获取了临界资源CS。然后T2打断T3。接着T1打断T2，但由于CS已被T3获取，因此T1被阻塞，这样T2获得时间片。直到T2执行完毕后，T3接着执行，其释放CS后，T1才能获取CS并执行。这时，我们看T1与T2，虽然T1优先级比T2高，但实际上T2优先于T1执行。这称之为优先级逆转。

* [忙等（busy-wait）](https://zh.wikipedia.org/wiki/%E5%BF%99%E7%A2%8C%E7%AD%89%E5%BE%85)

在软件工程中，忙碌等待（也称自旋；英语：Busy waiting、busy-looping、spinning）是一种以进程反复检查一个条件是否为真为根本的技术，条件可能为键盘输入或某个锁是否可用。忙碌等待也可以用来产生一个任意的时间延迟，若系统没有提供生成特定时间长度的方法，则需要用到忙碌等待。不同的计算机处理器速度差异很大，特别是一些处理器设计为可能根据外部因素（例如操作系统上的负载）动态调整速率。因此，忙碌等待这种时间延迟技术容易产生不可预知、甚至不一致的结果，除非实现代码来确定处理器执行“什么都不做”循环的速度，或者循环代码明确检查实时时钟。

在某些情况下，忙碌等待是有效的策略，特别是实现自旋锁设计的操作系统上运行对称多处理。不过一般来说，忙碌等待是应该避免的反模式[1]，处理器时间应该用来执行其他任务，而不是浪费在无用的活动