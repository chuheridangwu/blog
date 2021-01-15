# runtime引发的面试题

## 关于 isMemberOfClass 和  isKindOfClass
* **isKindOfClass** 判断当前方法调用者的 类对象 是否是 传入的类对象 或者是 传入类对象的子类
* **isMemberOfClass** 判断当前方法调用者的 类对象 是否是 传入的类对象

查看官方源码，看是否跟我们描述的一致，代码片段来自`objc4-818.2`
```objc
// 通过isa获取元类对象（meta-class），判断是否相等
+ (BOOL)isMemberOfClass:(Class)cls {
    return self->ISA() == cls;
}
// 直接通过class方法获取类对象（class），判断跟传入的cls是否是同一个类对象
- (BOOL)isMemberOfClass:(Class)cls {
    return [self class] == cls;
}
// 通过当前self的isa获取元类对象（meta-class），判断是跟传入的class一样，如果不相等，获取当前元类对象的父类继续判断，直接上层没有superclass为止
+ (BOOL)isKindOfClass:(Class)cls {
    for (Class tcls = self->ISA(); tcls; tcls = tcls->getSuperclass()) {
        if (tcls == cls) return YES;
    }
    return NO;
}
// 通过当前self的isa获取类对象(class)，判断是跟传入的class一样，如果不相等，获取当前类对象的父类继续判断，直接上层没有superclass为止
- (BOOL)isKindOfClass:(Class)cls {
    for (Class tcls = [self class]; tcls; tcls = tcls->getSuperclass()) {
        if (tcls == cls) return YES;
    }
    return NO;
}
```
通过学习`isKindOfClass:`和`isMemberOfClass:`方法，我们来判断下面的代码的打印结果
```objc
// Person 继承自 NSObject
NSLog(@"%d ---",[[Person class] isKindOfClass:[Person class]]);  // 0
NSLog(@"%d ---",[[NSObject class] isKindOfClass:[NSObject class]]); // 1

NSLog(@"%d ---",[[Person class] isMemberOfClass:[Person class]]); // 0
NSLog(@"%d ---",[[NSObject class] isMemberOfClass:[NSObject class]]); // 0
```
为什么`[[NSObject class] isKindOfClass:[NSObject class]]`返回的是YES，我们知道`[NSObject class]`返回的是一个类对象（class），所以调用的是`+isKindOfClass`方法，通过isa，找到的是NSObject的元类对象(meta-class),根据我们之前所学，NSObject元类对象(meta-class)的父类正是NSObject类对象(class)，所以返回值为YES。[点击查看isa和superclass](../principle/isa和superclass.md)

## 关于super
我们定义一个Person类继承自NSObject,Student类继承自Person，当调用以下代码时，看一下他们的打印结果
```objc
#import "Student.h"
@implementation Student
- (instancetype)init{
    if (self = [super init]) {
        NSLog(@"[self class] --- %@",[self class]); // 打印结果：  [self class] --- Student
        NSLog(@"[super class] --- %@",[super class]); // [super class] --- Student
        NSLog(@"[self superclass] --- %@",[self superclass]); // [self superclass] --- Person
        NSLog(@"[super superclass] --- %@",[super superclass]); // [super superclass] --- Person
    }
    return self;
}
@end
```
看到打印结果是不是觉得很奇怪，为什么会是这样的结果呢？我们通过上一章的学习指导，oc的方法调用本质就是消息传递。 super为什么会跟我们想象的不一样呢？我们通过将oc代码转换成c++来一窥究竟。

我们在 Person 中定义sayHello方法，在Student中进行调用
```objc
@implementation Student
- (void)sayHelo{
    [super run];    
}
@end
```
通过`xcrun`将代码转成c++,发现调用的是objc_msgSendSuper函数，传入两个参数，__rw_objc_super结构体和SEL，将代码整理一下大概是这个样子
```
objc_msgSendSuper)((__rw_objc_super){(id)self, (id)class_getSuperclass(objc_getClass("Student"))}, sel_registerName("run"));
```