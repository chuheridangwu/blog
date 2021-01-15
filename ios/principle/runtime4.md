# Runtime引发的面试题 super的本质


## super调用方法的本质
我们通过打印先认识一下super是否是跟我们想象的一样。下面的代码中 Student 继承自 Person , Person 继承自 NSObject。在 Student 初始化的时候打印：
```objc
@implementation Student
- (instancetype)init{
    if (self = [super init]) {
        NSLog(@"[self class] --%@",[self class]);  //[self class] -- Student
        NSLog(@"[self superclass] --%@",[self superclass]); //[self superclass] -- Person
        NSLog(@"[super class] --%@",[super class]); //[super class] -- Student
        NSLog(@"[super class] --%@",[super superclass]);    //[super class] -- Person
    } 
    return self;
}
@end
```
打印结果是不是跟你想的很不一样。不要慌，我们通过转换 c++代码 的形式窥探一下 super 调用方法时会发生什么？

> super是怎样调用父类方法的

在Person中定义`-sayHello`方法，在Student内部重写sayHello并调用父类的方法
```objc
@implementation Student
-(void)sayHello{
    [super sayHello];
}
@end
```
使用`xcrun -sdk clang -arch arm64  -rewrite-objc Student.m`转成c++代码,下面是经过整理后的代码：
```objc
@implementation Student

struct objc_super {
    __unsafe_unretained _Nonnull id receiver; // 消息接收者
    __unsafe_unretained _Nonnull Class super_class; //消息接收者的父类（标记从这个类对象开始搜索方法）
};
-(void)sayHello{
    struct objc_super arg = {self,[Person class]};
    objc_msgSendSuper(arg,@selector(sayHello));
}

@end
```
**`struct objc_super`结构体中有两个参数:**
* `receiver`: 消息接收者，self
* `super_class`: 消息接收者的父类（标记从这个类对象开始搜索方法）

我们看到`[super sayHello]`实际上是调用的`objc_msgSendSuper(struct objc_super * _Nonnull super, SEL _Nonnull op, ...)`函数。传入两个参数`struct objc_super`和`SEL`。`objc_super`结构体中有两个参数，消息接收者（self）和 它的父类(super_class),也就是当我们调用`[super sayHello]`时消息接收者是 self 自己。 `super_class` 只是起到一个标志作用，表示从它开始搜索方法。

**注意：转换后的代码跟实际编译会有一定差异，在下面的面试题会讲到。实际编译时会调用`objc_msgSendSuper2()函数`**

> `NSObject`内部是怎么实现`class`方法

知道了 super 是怎么调用方法的，我们再来了解一下`NSObject`内部是怎么实现`class`方法的。代码片段来自`objc4-818.2`
```objc
// 获取当前self的类对象
- (Class)class {
    return object_getClass(self);
}
// 获取当前self的superclass
- (Class)superclass {
    return [self class]->getSuperclass();
}
```
根据源码我们发现，`class和superclass`是根据 self 返回的类对象和父类的。根据我们上面的知识，我们在调用`super`调用方法时，它的 self 其实就是当前对象本身。谜底揭晓，**super调用方法时，消息接收者还是当前对象，只是查找方法时，从父类开始查找。**

## 综合面试题
下面这道题有点变态，考察的点很多，上代码：
定义一个Person类，在ViewController中调用
```objc


```

查看局部变量的地址，从高向低
```c
void test(){
    int a = 1;
    int b = 1;
    int c = 1;
    int d = 1;

    NSLog(@" a = %p",&a); // a = 0x7ffee531111c
    NSLog(@" b = %p",&b); // b = 0x7ffee5311118
    NSLog(@" c = %p",&c); // c = 0x7ffee5311114
    NSLog(@" d = %p",&d); // d = 0x7ffee5311110
}
```
局部变量的地址是从高地址往低地址走

[苹果内购测试流程](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox)