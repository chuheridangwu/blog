# Runtime的API
本章从 类、成员变量、属性、方法 4个方面来介绍Runtime的API，并使用Demo的形式展示他们的用法。

## Runtime关于类的API
```objc
// 动态创建一个类（参数：父类，类名，额外的内存空间）
Class objc_allocateClassPair(Class superclass, const char *name, size_t extraBytes)
// 注册一个类（要在类注册之前添加成员变量）
void objc_registerClassPair(Class cls) 
// 销毁一个类
void objc_disposeClassPair(Class cls)
// 获取isa指向的Class
Class object_getClass(id obj)
// 设置isa指向的Class
Class object_setClass(id obj, Class cls)
// 判断一个OC对象是否为类对象(Class)
BOOL object_isClass(id obj)
// 判断一个Class是否为元类(metaClass)
BOOL class_isMetaClass(Class cls)
// 获取父类
Class class_getSuperclass(Class cls)
```

代码练习：
```objc
void run(id self,IMP _cmd){
    NSLog(@"--%@ -- %@",self,NSStringFromSelector(_cmd));
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // 创建类
        Class cls = objc_allocateClassPair([NSObject class], "Dog", 0);
        // 添加属性
        class_addIvar(cls, "_name", sizeof(NSString*), 1, @encode(NSString*));
        class_addIvar(cls, "_age", sizeof(int), 1, @encode(int));
        // 添加方法
        class_addMethod(cls, @selector(run), (IMP)run, "@vi");
        // 注册类
        objc_registerClassPair(cls);
        
        id dog = [[cls alloc] init];
        [dog setValue:@10 forKey:@"_age"];
        [dog setValue:@"testName" forKey:@"_name"];
        [dog run];
        
        // 修改dog isa的指向，isa指向Person类对象
        object_setClass(dog, [Person class]);
        [dog run];

        // 不使用时销毁类对象
        objc_disposeClassPair(cls);
    }
    return 0;
}
```

## Runtime关于成员变量的API
```objc
// 获取一个实例变量信息
Ivar class_getInstanceVariable(Class cls, const char *name)
// 拷贝实例变量列表（最后需要调用free释放）
Ivar *class_copyIvarList(Class cls, unsigned int *outCount)
// 设置和获取成员变量的值
void object_setIvar(id obj, Ivar ivar, id value)
id object_getIvar(id obj, Ivar ivar)
// 动态添加成员变量（已经注册的类是不能动态添加成员变量的 cls:类  name:成员变量名称 size_t: 占用内存 uint8_t: 内存对齐，一般使用1  types: @encode(int)）
BOOL class_addIvar(Class cls, const char * name, size_t size, uint8_t alignment, const char * types)
// 获取成员变量的相关信息
const char *ivar_getName(Ivar v)
const char *ivar_getTypeEncoding(Ivar v)
```

定义 Person 类，获取Person的成员变量信息并给成员变量赋值:
```objc
// 定义Person类
@interface Person : NSObject
@property (nonatomic, assign)int age;
@property (nonatomic, strong)NSString *name;
@end

// 通过Ivar 获取成员变量信息
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // 获取属性信息
        Ivar ageIvar = class_getInstanceVariable([Person class], "_age");
        Ivar nameIvar = class_getInstanceVariable([Person class], "_name");
        NSLog(@"%s --- %s",ivar_getName(ageIvar),ivar_getTypeEncoding(ageIvar)); // _age --- i
        
        // 通过Ivar 给 p 属性赋值
        Person *p = [[Person alloc] init];
        object_setIvar(p, ageIvar, (__bridge id)(void*)10);
        object_setIvar(p, nameIvar, @"testIvar");
        
        // 获取所有成员变量               
        unsigned int count; //成员变量数量
        Ivar *ivars = class_copyIvarList([Person class], &count);
        for (int i = 0; i < count; i++) {
            Ivar ivar = ivars[i];
            NSLog(@"%s -- %s",ivar_getName(ivar),ivar_getTypeEncoding(ivar));
        }
        // 释放
        free(ivars);
    }
    return 0;
}
```
在iOS13系统之前，我们经常使用KVC的方式获取系统的私有变量进行改造，从iOS13开始，苹果不再允许通过这种方式来获取私有变量了，谨慎使用。

**简易的字典转模型Demo**
```objc
@implementation NSObject (Json)
+ (instancetype)object_withJson:(NSDictionary*)json{
    id cls = [[self alloc] init];
    
    unsigned int count;
    Ivar *ivars = class_copyIvarList(self, &count);
    for (int i = 0; i < count; i++) {
        Ivar ivar = ivars[i];
        
        // 去掉成员变量_
        NSMutableString *key = [NSMutableString stringWithUTF8String:ivar_getName(ivar)];
        [key deleteCharactersInRange:NSMakeRange(0, 1)];

        // 赋值
        [cls setValue:json[key] forKey:key];
    }
    free(ivars);
    
    return cls;
}
@end

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSDictionary *json = @{
            @"age":@100,
            @"height":@20,
            @"name":@"xiaoming"
        };
        Person *p = [Person object_withJson:json];
    }
    return 0;
}
```

## Runtime关于属性的API
```objc
// 获取一个属性
objc_property_t class_getProperty(Class cls, const char *name)

// 拷贝属性列表（最后需要调用free释放）
objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount)

// 动态添加属性
BOOL class_addProperty(Class cls, const char *name, const objc_property_attribute_t *attributes,
                  unsigned int attributeCount)

// 动态替换属性
void class_replaceProperty(Class cls, const char *name, const objc_property_attribute_t *attributes,
                      unsigned int attributeCount)

// 获取属性的一些信息
const char *property_getName(objc_property_t property)
const char *property_getAttributes(objc_property_t property)
```

## Runtime关于方法的API
```objc
// 获得一个实例方法、类方法
Method class_getInstanceMethod(Class cls, SEL name)
Method class_getClassMethod(Class cls, SEL name)

// 方法实现相关操作
IMP class_getMethodImplementation(Class cls, SEL name) 
IMP method_setImplementation(Method m, IMP imp)
void method_exchangeImplementations(Method m1, Method m2) 

// 拷贝方法列表（最后需要调用free释放）
Method *class_copyMethodList(Class cls, unsigned int *outCount)

// 动态添加方法
BOOL class_addMethod(Class cls, SEL name, IMP imp, const char *types)

// 动态替换方法
IMP class_replaceMethod(Class cls, SEL name, IMP imp, const char *types)

// 获取方法的相关信息（带有copy的需要调用free去释放）
SEL method_getName(Method m)
IMP method_getImplementation(Method m)
const char *method_getTypeEncoding(Method m)
unsigned int method_getNumberOfArguments(Method m)
char *method_copyReturnType(Method m)
char *method_copyArgumentType(Method m, unsigned int index)

// 选择器相关
const char *sel_getName(SEL sel)
SEL sel_registerName(const char *str)

// 用block作为方法实现
IMP imp_implementationWithBlock(id block)
id imp_getBlock(IMP anImp)
BOOL imp_removeBlock(IMP anImp)
```

**方法交换的Demo**
```objc
void run(id self ,IMP _cmd){
    NSLog(@"%s",__func__);
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // 将Person类的sayHello方法交换成run方法
        class_replaceMethod([Person class], @selector(sayHello), (IMP)run, "v@:");

        //直接交换方法，使用block
        class_replaceMethod([Person class], @selector(sayHello), imp_implementationWithBlock(^{
            NSLog(@"-----%s-----%@",__func__,[NSThread currentThread]);
        }),"v");
    
        // 获取两个方法，进行交换
        Method m1 = class_getInstanceMethod([Person class], @selector(sayHello));
        Method m2 = class_getInstanceMethod([Person class], @selector(run));
        method_exchangeImplementations(m1, m2);
    }
    return 0;
}
```

方法交换可以做什么？比如说统计按钮点击，预防数组添加nil数据和字典Key为空,代码Demo:
```objc
// 交换点击事件
@implementation UIControl (Extension)
+ (void)load{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method m1 = class_getInstanceMethod(self, @selector(sendAction:to:forEvent:));
        Method m2 = class_getInstanceMethod(self, @selector(xb_sendAction:to:forEvent:));
        method_exchangeImplementations(m1, m2);
    });
}

- (void)xb_sendAction:(SEL)action to:(id)target forEvent:(UIEvent *)event{
    [self xb_sendAction:action to:target forEvent:event];
}
@end

// 预防数组添加nil数据，注意，NSString、NSArray、NSDictionary都是类簇，真实类型是其他类型
@implementation NSMutableArray (Extension)
+ (void)load{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class cls = NSClassFromString(@"__NSArrayM");
        Method m1 = class_getInstanceMethod(cls, @selector(insertObject:atIndex:));
        Method m2 = class_getInstanceMethod(cls, @selector(xb_insertObject:atIndex:));
        method_exchangeImplementations(m1, m2);
    });
}
- (void)xb_insertObject:(id)anObject atIndex:(NSUInteger)index{
    if (anObject == nil) {
        return;
    }
    // 这里为什么不会造成死循环？是因为已经做了方法交换，调用的是 insertObject:atIndex: 方法
    [self xb_insertObject:anObject atIndex:index];
}
@end

// 预防字典Key值为空 ,NSMutableDictionary是 __NSDictionaryM 类型，NSDictionary没有值的类型： __NSDictionary0，有一个值时的类型：__NSSingleEntryDictionaryI，多个值时的类型：__NSDictionaryI  
@implementation NSMutableDictionary (Extension)
+ (void)load{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class cls = NSClassFromString(@"__NSDictionaryM");
        Method m1 = class_getInstanceMethod(cls, @selector(setObject:forKeyedSubscript:));
        Method m2 = class_getInstanceMethod(cls, @selector(xb_setObject:forKeyedSubscript:));
        method_exchangeImplementations(m1, m2);
    });
}

- (void)xb_setObject:(id)obj forKeyedSubscript:(id<NSCopying>)key{
    if (!key) return;
    [self xb_setObject:obj forKeyedSubscript:key];
}
@end

```

方法交换的本质:就是**交换`method_t`中的IMP**，方法交换之后系统会删除方法缓存，通过源码查看`method_exchangeImplementations`方法的实现，代码片段来自`objc4-818.2`
```c
void method_exchangeImplementations(Method m1, Method m2)
{
    ...
    IMP imp1 = m1->imp(false);
    IMP imp2 = m2->imp(false);
    SEL sel1 = m1->name();
    SEL sel2 = m2->name();

    m1->setImp(imp2);
    m2->setImp(imp1);
    // 删除缓存
    flushCaches(nil, __func__, [sel1, sel2, imp1, imp2](Class c){
        return c->cache.shouldFlush(sel1, imp1) || c->cache.shouldFlush(sel2, imp2);
    });
    ...
}
```

## Runtime的面试题
**讲一下 OC 的消息机制**
* OC中的方法调用其实都是转成了`objc_msgSend函数`的调用，给`receiver（方法调用者）`发送了一条消息`（selector方法名）`
* objc_msgSend底层有3大阶段 `消息发送（当前类、父类中查找）、动态方法解析、消息转发`

**什么是Runtime？平时项目中有用过么？**
1. OC是一门动态性比较强的编程语言，允许很多操作推迟到程序运行时再进行
2. OC的动态性就是由Runtime来支撑和实现的，Runtime是一套C语言的API，封装了很多动态性相关的函数,
平时编写的OC代码，底层都是转换成了Runtime API进行调用

**Runtime在项目中的具体应用**
1. 利用关联对象（AssociatedObject）给分类添加属性
2. 遍历类的所有成员变量（修改textfield的占位文字颜色、字典转模型、自动归档解档）iOS13系统之后苹果不允许使用此方法获取系统私有api
3. 交换方法实现（交换系统的方法）
4. 利用消息转发机制解决方法找不到的异常问题 等等