# 多线程
多线程在项目中经常使用，在我们进行耗时操作时，比如网络请求、下载图片、加载音视频等耗时操作，为了不卡住主线程，都需要在异步进行操作。

**iOS中的多线程方案有几下几种：**

**技术方案** | **简介** | **语言** | **线程生命周期** | **使用频率**
------- | ------- | ------- | ------- | -------
pthread | 一套通用的多线程API<br>适用于Unix\Linux\Windows等系统<br>跨平台\可移植<br>使用难度大 | C | 程序员管理 | 几乎不用
NSThread | 使用更加面向对象<br>简单易用，可直接操作线程对象 | OC | 程序员管理 | 偶尔使用
GCD | 旨在替代NSThread等线程技术<br>充分利用设备的多核 | C | 自己管理 | 经常使用
NSOperation | 基于GCD（底层是GCD）<br>比GCD多了一些更简单实用的功能,使用更加面向对象 | OC | 自己管理 | 经常使用

* `NSOperation`、`GCD`、`NSThread`的底层使用的都是`pthread`。

## GCD的基本概念
因为在项目中使用的GCD偏多，所以我们通过GCD讲清楚一些多线程的基本概念。GCD是开源项目，[点击进入下载](https://github.com/apple/swift-corelibs-libdispatch)

GCD中有2个用来执行任务的函数`dispatch_sync(dispatch_queue_t queue, dispatch_block_t block)`和`dispatch_async(dispatch_queue_t queue, dispatch_block_t block)`
```c
用同步的方式执行任务
dispatch_sync(dispatch_queue_t queue, dispatch_block_t block);
用异步的方式执行任务
dispatch_async(dispatch_queue_t queue, dispatch_block_t block);
queue：队列
block：任务
```

多线程中比较容易混淆的几个术语：`同步、异步、并发、串行`,**同步和异步主要影响：能不能开启新的线程，并发和串行主要影响：任务的执行方式**，注意，主队列是一种特殊的串行队列。
* 同步`dispatch_sync`：在当前线程中执行任务，不具备开启新线程的能力  (需要马上在当前线程执行任务，执行完成之后才能继续往下执行)
* 异步`dispatch_async`：在新的线程中执行任务，具备开启新线程的能力   (不要求马上在当前线程执行任务)
* 并发：多个任务并发（同时）执行
* 串行：一个任务执行完毕后，再执行下一个任务

它们之间的关系如下图，图片来源小码哥的MJ老师：
![](./../imgs/ios_img_44.jpg)

通过代码获取队列：
```objc
// 主队列，一种特殊的串行队列
dispatch_queue_t mainQueue = dispatch_get_main_queue();
// 串行队列
dispatch_queue_t queue1 = dispatch_queue_create("queue1", DISPATCH_QUEUE_SERIAL);
// 全局并发队列
dispatch_queue_t queue2 = dispatch_get_global_queue(0, 0 );
// 并发队列
dispatch_queue_t queue3 = dispatch_queue_create("queue3", DISPATCH_QUEUE_CONCURRENT);
```

## 死锁
当两个以上的运算单元，双方都在等待对方停止运行，以获取系统资源，但是没有一方提前退出时，就称为死锁。通过代码的方式展示死锁的两种方式：
```objc
// 情况1
- (void)viewDidLoad {
    [super viewDidLoad];
    dispatch_sync(dispatch_get_main_queue(), ^{

    });
}
```
要想知道这里为什么会死锁？我们需要先知道串行队列和同步的特点：
* **串行队列的特点: FIFO 先进先出。谁先进来，就先把谁执行完。**
* **同步`dispatch_sync`: 需要马上在当前线程执行任务，执行完成之后才能继续往下执行**

根据串行队列的特点，viewDidLoad函数 在 sync 任务的前面,所有需要先执行 viewDidLoad 函数，而在 viewDidLoad函数中又有 sync，根据 sync 的特点，需要先执行完 sync 的任务才能继续往下执行，这样就造成了双方都在等待对方先执行结束。也就造成了我们说的死锁。

下面的代码也是一样，虽然 sync 任务是在 async 内部进行的，但是它和 async 使用的是同一个串行队列，也会造成死锁的情况。
```objc
// 情况2
- (void)viewDidLoad {
    [super viewDidLoad];
    
    dispatch_queue_t queue = dispatch_queue_create("queue", DISPATCH_QUEUE_SERIAL);
    
    dispatch_async(queue, ^{
        dispatch_sync(queue, ^{

        });
    });
}
```
我们可以根据以上情况做一个总结,_**`当使用sync函数往当前串行队列中添加任务时，会卡住当前的串行队列（产生死锁）`**_

## 队列组
当有一个需求是先异步并发执行 任务1、任务2, 等任务1、任务2都执行完毕后，再回到主线程执行任务3。可以考虑使用队列组。
```
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 创建队列组
    dispatch_group_t group = dispatch_group_create();
    // 创建并发队列
    dispatch_queue_t queue = dispatch_get_global_queue(0, 0);
    // 添加异步任务
    dispatch_group_async(group, queue, ^{
        for (int i = 0; i < 10; i++) {
            NSLog(@"%d --- 任务1 --%@",i,[NSThread currentThread]);
        }
    });
    dispatch_group_async(group, queue, ^{
        for (int i = 0; i < 10; i++) {
            NSLog(@"%d ---任务2 -- %@",i,[NSThread currentThread]);
        }
    });
    //等前面的任务执行完毕，会执行当前任务
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        for (int i = 0; i < 10; i++) {
            NSLog(@"%d ---任务3 --  %@",i,[NSThread currentThread]);
        }
    });
}
```
## 多线程的隐患