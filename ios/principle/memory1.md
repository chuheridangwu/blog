# 内存管理 - 定时器
在项目开发中，我们经常需要定时执行一些任务，这里就会用到定时器。iOS中的定时器有三种：`CADisplayLink、NSTimer、GCD`。使用 CADisplayLink 和 NSTimer时需要注意，它们会对target产生强引用，如果不能妥善处理，非常容易引发内存泄漏和循环引用的问题。例如：
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
在上面的代码中，它们之间的引用关系：`self-> NSTimer -> self`,self引用着NSTimer,NSTimer中又强引用着self。虽然我们在dealloc方法中写着让NSTimer释放self，但是因为循环引用的关系，这个方法不会被调用。这个问题该如何解决呢？我们可以通过使用**代理转发**的方式解决这个问题。

通过代理转发的方式，它们之间的引用关系就变成了：`self -> NSTimer->代理 - 弱引用 - >self`。self 引用着 NSTimer，NSTimer 引用着代理对象，代理对象中弱引用self。通过我们之前学习的Runtime，通过消息转发的形式让self调用方法。

代理转发的形式有两种，一种是通过自定义一个类进行转发，一种是通过继承`NSProxy`类的方式。先看一下代码：

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

`NSProxy`跟`NSObject`是平级的，`NSProxy`是一个专门用来做代理的类。
在Runtime的学习中我们知道，实例对象调用方法的流程是`先通过缓存和父类寻找方法，直到没有父类时进入动态方法解析，最后进入消息转发`
它们两个之间的区别在于：`NSProxy`在调用方法时直接进入消息转发的流程。通过isKindClass的方法可以看到：

```objc
ViewController *vc = [ViewController new];
Proxy *pr = [Proxy proxyWithTarget:vc];
ObjcProxy *obj = [ObjcProxy proxyWithTarget:vc];
NSLog(@"%d --- %d",[pr isKindOfClass:[ViewController class]],[obj isKindOfClass:[ViewController class]]);
// 打印结果 1 --- 0
```

通过GunStep的代码我们也可以看到，NSProxy中调用`isKindClass`方法时是直接进行消息转发的：
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

在Runloop章节中我们知道，Runloop在不断的处理source0、source1和timer的事件，当没有事件处理时进行休眠。因此我们可能会产生一个疑问？NSTimer定时器是否准确。

假设，定时器需要1s调用一次，Runloop在执行因为要处理的事情过多，一圈任务需要0.4s,可能会造成NSTimer不准时的情况。GCD定时器更加准时。

NSTimer依赖于RunLoop，如果RunLoop的任务过于繁重，可能会导致NSTimer不准时

GCD的定时器：
```objc

```

封装一个GCD定时器：
```objc
```


## 面试题
1. 使用CADisplayLink、NSTimer有什么注意点？
CADisplayLink、NSTimer会对target产生强引用，如果target又对它们产生强引用，那么就会引发循环引用

2. 介绍下内存的几大区域

3. 讲一下你对 iOS 内存管理的理解

4. ARC 都帮我们做了什么？
LLVM + Runtime

5. weak指针的实现原理

6. autorelease对象在什么时机会被调用release

7. 方法里有局部对象， 出了方法后会立即释放吗