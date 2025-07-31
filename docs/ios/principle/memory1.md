# 内存管理 - 定时器
在项目开发中，我们经常需要定时执行一些任务，这里就会用到定时器。iOS中的定时器有三种`CADisplayLink`、`NSTimer`、`GCD`。使用 CADisplayLink 和 NSTimer时需要注意，它们会对target产生强引用，如果不能妥善处理，非常容易引发内存泄漏和循环引用的问题。

## CADisplayLink 、 NSTimer 注意点
我们使用一个简单的例子来展示一下非常容易出现的循环引用问题：
```objc
@interface ViewController ()
@property (nonatomic, strong)NSTimer *timer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(timerTest) userInfo:nil repeats:YES];
}

- (void)timerTest{
    NSLog(@"%s",__func__);
}

- (void)dealloc{
    [_timer invalidate];
}
```
在上面的代码中，self 强引用着 NSTimer, NSTimer 又强引用着 self。虽然在 dealloc 方法中写着让 NSTimer 释放s elf，但是因为循环引用的关系，这个方法永远不会被调用。它们之间的引用关系：`self-> NSTimer -> self`

**注意：当我们不使用NSTimer、CADisplayLink时，一定要调用`invalidate`方法使定时器无效。**

根据我们在Runloop中所学的知识,一个 RunLoop 包含若干个Mode，每个Mode又包含若干个 Source0/Source1/Timer/Observer,当我们使用定时器时，Runloop对象中会强引用NSTimer，如果我们不主动调用`invalidate`方法，会造成内存泄露问题。例如：
```objc
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [NSTimer scheduledTimerWithTimeInterval:1.0 target:[Proxy proxyWithTarget:self] selector:@selector(timerTest) userInfo:nil repeats:YES];
}

- (void)timerTest{
    NSLog(@"%s --",__func__);
}
@end
```
在上面的代码中，Runloop对象引用者 NSTimer, NSTimer又引用者self,如果不调用`invalidate`方法，会导致NSTimer和self一直无法释放，造成内存泄露问题

## NSProxy 代理模式
知道了NSTimer在使用过程中可能引起的问题，我们应该如何解决这个问题呢？答案是使用代理转发的模式。

所谓代理模式，就是制造一个中间对象。self 强引用 NSTimer，NSTimer 强引用 代理对象，在代理对象中弱引用 self。调用方法时通过消息转发的形式让 self 调用自身方法。它们之间的引用关系就变成了：`self -> NSTimer->代理 --- >self`。

代理转发的形式有两种，使用自定义类 或者 通过继承`NSProxy`的方式来进行代理转发。`NSProxy`是一个专门用来转转发的类。

* 通过自定义类的形式

```objc
@interface ObjcProxy : NSObject
+ (id)proxyWithTarget:(id)target;
@property (nonatomic, weak)id target;
@end

@implementation ObjcProxy
+ (id)proxyWithTarget:(id)target{
    ObjcProxy *obj = [[ObjcProxy alloc] init];
    obj.target = target;
    return obj;
}
- (id)forwardingTargetForSelector:(SEL)aSelector{
    return self.target;
}
@end
```

* 继承自`NSProxy`的方式

```objc
@interface Proxy : NSProxy
+ (id)proxyWithTarget:(id)target;
@property (nonatomic, weak)id target;
@end

@implementation Proxy
+ (id)proxyWithTarget:(id)target{
    Proxy *proxy = [Proxy alloc];
    proxy.target = target;
    return proxy;
}
- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel{
    return [self.target methodSignatureForSelector:sel];
}
- (void)forwardInvocation:(NSInvocation *)invocation{
    [invocation invokeWithTarget:self.target];
}
@end
```

>两种方式的区别

`NSProxy` 和 `NSObject`是平级的，`NSProxy`是一个专门用来做代理的类。在Runtime的学习中我们知道，实例对象调用方法的流程是`先通过缓存和父类寻找方法，直到没有父类时进入动态方法解析，最后进入消息转发`
而`NSProxy`在调用方法时直接进入消息转发的流程。通过`isKindOfClass`的方法我们可以清楚的看到它们之间的区别：
```objc
ViewController *vc = [ViewController new];
Proxy *pr = [Proxy proxyWithTarget:vc];
ObjcProxy *obj = [ObjcProxy proxyWithTarget:vc];
NSLog(@"%d --- %d",[pr isKindOfClass:[ViewController class]],[obj isKindOfClass:[ViewController class]]);
// 打印结果 1 --- 0
```

我们也可以通过[GNUstep](http://www.gnustep.org/resources/downloads.php)中的代码作为参考，NSProxy中调用`isKindClass`方法时是直接进行消息转发的：
```objc
- (BOOL) isKindOfClass: (Class)aClass{
  NSMethodSignature	*sig;
  NSInvocation		*inv;
  BOOL			ret;

  sig = [self methodSignatureForSelector: _cmd];
  inv = [NSInvocation invocationWithMethodSignature: sig];
  [inv setSelector: _cmd];
  [inv setArgument: &aClass atIndex: 2];
  [self forwardInvocation: inv];
  [inv getReturnValue: &ret];
  return ret;
}
```

## GCD定时器
在Runloop章节中，我们知道Runloop是一个循环，不断的循环处理block、source0、source1、timers事件，当没有事件处理时进行休眠。然而NSTimer依赖于RunLoop，如果RunLoop执行的任务过于繁重时，可能会导致NSTimer不准时

比如一个定时器1s执行一次任务，Runloop执行一圈任务耗时0.4s _<small>(这里只是做一个假设,实际上Runloop每次执行的任务不同、耗时不同)</small>_ ，当它执行定时任务时，已经1.2s过去了,这就造成了NSTimer不准时的情况。

如果我们想要更加精准的定时任务，GCD是一个更好的选择。GCD定时器直接监听系统内核，不与Runloop挂钩，所以时间上更加精准。GCD定时器的使用：_<small>(注意：dispatch_source_t 定时器对象需要被强引用)</small>_ 
```objc
// 创建队列
dispatch_queue_t queue = dispatch_queue_create("queue", DISPATCH_QUEUE_CONCURRENT);

// 创建定时器 (需要强引用保留定时器对象)
dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, queue);

// 设置时间 source:tiemr  start:开始时间  interval: 间隔时间  leeway:误差
uint64_t start = 2.0;  //2秒后开始执行
uint64_t interval = 1.0;  //每隔1秒执行一次
dispatch_source_set_timer(timer,
                            dispatch_time(DISPATCH_TIME_NOW, start * NSEC_PER_SEC),
                            interval * NSEC_PER_SEC,
                            0);

// 设置回调
dispatch_source_set_event_handler(timer, ^{
    NSLog(@"GCD定时器回调block");
});

// 启动定时器
dispatch_resume(timer);
```

封装一个GCD定时器工具：
```objc
@interface GCDTimerTool : NSObject

+ (NSString*)execTask:(void(^)(void))task
                start:(NSTimeInterval)start
             interval:(NSTimeInterval)interval
              repeats:(BOOL)repeats
                async:(BOOL)async;

+ (NSString*)execTask:(id)target
             selector:(SEL)selector
                start:(NSTimeInterval)start
             interval:(NSTimeInterval)interval
              repeats:(BOOL)repeats
                async:(BOOL)async;

+ (void)cancelTask:(NSString*)name;

@end

// 实现
@implementation GCDTimerTool

static  NSMutableDictionary *timers_;
dispatch_semaphore_t semaphore_;

+ (void)initialize{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        timers_ = [NSMutableDictionary dictionary];
        semaphore_ = dispatch_semaphore_create(1);
    });
}

+ (NSString *)execTask:(void (^)(void))task start:(NSTimeInterval)start interval:(NSTimeInterval)interval repeats:(BOOL)repeats async:(BOOL)async{
    if (!task || start < 0 || (interval <= 0 && repeats)) return  nil;
    
    // 队列
    dispatch_queue_t queue = async ? dispatch_queue_create("queue_timers", DISPATCH_QUEUE_CONCURRENT) : dispatch_get_main_queue();
    
    // 创建定时器
    dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, queue);
    
    // 设置时间
    dispatch_source_set_timer(timer,
                              dispatch_time(DISPATCH_TIME_NOW, start * NSEC_PER_SEC),
                              interval * NSEC_PER_SEC,
                              0);
   
    // 使用semaphore 只允许一条线程运行
    dispatch_semaphore_wait(semaphore_, DISPATCH_TIME_FOREVER);
    // 创建唯一标识
    NSString *name = [NSString stringWithFormat:@"gcd_timer_%zd",timers_.count];
    timers_[name] = timer;
    dispatch_semaphore_signal(semaphore_);
    
    // 设置回调
    dispatch_source_set_event_handler(timer, ^{
        task();
        if (!repeats) { //如果不重复执行任务
            [self cancelTask:name];
        }
    });
    
    // 启动定时器
    dispatch_resume(timer);
    
    return  name;
}

+ (NSString *)execTask:(id)target selector:(SEL)selector start:(NSTimeInterval)start interval:(NSTimeInterval)interval repeats:(BOOL)repeats async:(BOOL)async{
    return [self execTask:^{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        if ([target respondsToSelector:selector]) {
            [target performSelector:selector];
        }
#pragma clang diagnostic pop
    } start:start interval:interval repeats:repeats async:async];
}

+ (void)cancelTask:(NSString *)name{
    if (name.length == 0) return;
    
    dispatch_semaphore_wait(semaphore_, DISPATCH_TIME_FOREVER);
    
    dispatch_source_t timer = timers_[name];
    if (timer) {
        dispatch_source_cancel(timer);
        [timers_ removeObjectForKey:name];
    }
    
    dispatch_semaphore_signal(semaphore_);
}
@end
```


## 面试题
1. 使用CADisplayLink、NSTimer有什么注意点？

    CADisplayLink、NSTimer会对target产生强引用，如果target又对它们产生强引用，那么就会引发循环引用

2. 介绍下内存的几大区域

3. 讲一下你对 iOS 内存管理的理解

4. ARC 都帮我们做了什么？
    LLVM + Runtime，利用LLVM编译器，自动帮我们生成retain和release操作。在程序过程中，通过runtime将程序中的弱引用置为nil。


5. weak指针的实现原理

6. autorelease对象在什么时机会被调用release

7. 方法里有局部对象， 出了方法后会立即释放吗