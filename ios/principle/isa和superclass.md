# isa和superclass
oc对象可以分为三种，`instance对象 （实例对象）`、 `class 对象 （类对象）` 和 `meta-class 对象(元类对象)`

## 类对象
类对象在内存中只保存一份，保存
获取方式

```objc
#import <objc/runtime.h>

NSObject *obj = [[NSObject alloc] init];

Class class1 = [obj class];
Class class2 = [NSObject class];
Class class3 = object_getClass(obj);

NSLog(@"%p %p %p",class1,class2,class3);
```

获取元类对象
每个类的元类对象只有一个，主要保存isa指针，superclass指针和 类的类方法信息

```objc
<!-- 将类对象作为参数传进去，获取的是元类对象 -->
class metaClass = object_getClass([NSObject class]);
// 判断是否是元类
Bool isMetaClass = class_isMetaClass(metaClass);

```


面试题: 对象的isa指向哪里
当一个实例对象调用方法时，本质是通过runtime方法给类发送消息，实例对象本身没有方法，通过自身isa指针找到类对象，调用类对象中保存的方法。