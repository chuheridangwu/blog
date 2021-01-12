# objc_msgSend函数
当我们使用`[ ]`调用方法时，底层是通过`objc_msgSend()`函数进行调用的，这也是OC特有的消息机制，方法调用是通过消息传递的形式进行的。比如下面的代码：
```c
NSObject *objc = [[NSObject alloc] init];
[objc class];
[NSObject class];
```
通过`xcrun -sdk iphoneos clang -arch arm64  -rewrite-objc main.m -o main.cpp`命令转成c++代码
```c
sel_registerName("class") 等价于 @selector(class)

objc_msgSend(objc, sel_registerName("class"));
objc_msgSend(objc_getClass("NSObject"), sel_registerName("class"));

// OC的方法调用：消息机制 给方法调用者发送消息
// 消息接受者(receiver)： objc 、[NSObject class]
// 消息名称： class
```

**objc_msgSend的执行流程可以分为3大阶段**
* 消息发送
* 动态方法解析
* 消息转发


## 通过源码认识 objc_msgSend
objc_msgSend方法是汇编编写的，因为我们是手机，只看`objc-msg-arm64.s`文件即可。查看路径：

`ENTRY _objc_msgSend` -> `__objc_msgLookup_uncached` ->`MethodTableLookup` -> `_lookUpImpOrForward` 

汇编中调用函数会去掉前面的下划线，全局搜索`lookUpImpOrForward`,对应的函数实现如下，代码经过删减，代码片段来自于`objc-818.2`：
```c
IMP lookUpImpOrForward(id inst, SEL sel, Class cls, int behavior)
{
    // 获取转发的imp
    const IMP forward_imp = (IMP)_objc_msgForward_impcache;
    IMP imp = nil;
    Class curClass;

    runtimeLock.assertUnlocked();

    if (slowpath(!cls->isInitialized())) {
        behavior |= LOOKUP_NOCACHE;
    }

    ....

    cls = realizeAndInitializeIfNeeded_locked(inst, cls, behavior & LOOKUP_INITIALIZE);
    // runtimeLock may have been dropped but is now locked again
    runtimeLock.assertLocked();
    curClass = cls;

    for (unsigned attempts = unreasonableClassCount();;) {
        if (curClass->cache.isConstantOptimizedCache(/* strict */true)) {
            imp = cache_getImp(curClass, sel);
            if (imp) goto done_unlock;
            curClass = curClass->cache.preoptFallbackClass();
        } else {
            // 方法列表
            Method meth = getMethodNoSuper_nolock(curClass, sel);
            if (meth) {
                imp = meth->imp(false);
                goto done;
            }

            // 找不到方法并且方法解析器也无效时，使用转发
            if ((curClass = curClass->getSuperclass()) == nil) {
                imp = forward_imp;
                break;
            }
        }

        ....

        // Superclass cache.
        imp = cache_getImp(curClass, sel);
        if (imp == forward_imp) {// 在超类的forward::方法中找到，停止搜索，不缓存，首先调用此类的解析器
            break;
        }
        if (imp) {   // 在超类中找到该方法。 将其缓存在此类中
            goto done;
        }
    }

    // 找不到实现。 尝试一次方法解析器
    if (behavior & LOOKUP_RESOLVER) {
        behavior ^= LOOKUP_RESOLVER;
        return resolveMethod_locked(inst, sel, cls, behavior);
    }

 done:
    if ((behavior & LOOKUP_NOCACHE) == 0) {
        while (cls->cache.isConstantOptimizedCache(/* strict */true)) {
            cls = cls->cache.preoptFallbackClass();
        }
        log_and_fill_cache(cls, imp, sel, inst, curClass);
    }
 done_unlock:
    runtimeLock.unlock();
    if ((behavior & LOOKUP_NIL) && imp == forward_imp) {
        return nil;
    }
    return imp;
}
```

## 消息发送

## 动态方法解析

## 消息转发
