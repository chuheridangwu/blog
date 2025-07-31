# Category的 +load 和 +initialize 方法
按照我们之前的学习，如果分类中有多个重复的方法，调用方法时，会优先调用最后编译的分类。当你在分类中重写 `+load` 和 `+initialize`方法时，发现并没有按照这个顺序来，系统会优先调用类的`+load`方法，然后才会按照编译顺序调用分类`+load`方法。这是为什么呢？

## +(void)load(){ }

首先来简单了解一下load方法, **`+load`方法在 runtime 加载类、分类时调用，并且每个类、分类的`+load`，在程序运行过程中只调用一次**

### +load 源码分析
在`_objc_init` 中，查看`load_images`函数，有没有觉得这个方法很眼熟，之前把分类中的信息合并到类中也是在这个方法中调用的。`load_images`函数中有一个`call_load_methods()`函数，看一下它是做什么的。

```cpp
// load_images 方法 代码都进行了缩减
void load_images(const char *path __unused, const struct mach_header *mh)
{
   ...
    // Discover load methods
    {
        mutex_locker_t lock2(runtimeLock);
        prepare_load_methods((const headerType *)mh);
    }

    // Call +load methods (without runtimeLock - re-entrant)
    call_load_methods();
}
```

通过对`call_load_methods`函数的观察，我们发现`call_load_methods`函数主要是用来调用+load方法，那它的调用顺序是谁控制的呢？

```cpp
void call_load_methods(void)
{
    ...
    do {
        // 1. Repeatedly call class +loads until there aren't any more
        while (loadable_classes_used > 0) {
            call_class_loads();
        }

        // 2. Call category +loads ONCE
        more_categories = call_category_loads();

        // 3. Run more +loads if there are classes OR more untried categories
    } while (loadable_classes_used > 0  ||  more_categories);
    ...
}

// 调用类  +load方法
static void call_class_loads(void)
{
    ...
    // Call all +loads for the detached list.
    for (i = 0; i < used; i++) {
        Class cls = classes[i].cls;
        load_method_t load_method = (load_method_t)classes[i].method;

        ...
        // +load根据方法地址直接调用，并不是经过objc_msgSend函数调用
        (*load_method)(cls, @selector(load));
    }
    ...
}

// 调用分类  +load方法
static bool call_category_loads(void)
{
    ...
    for (i = 0; i < used; i++) {
        Category cat = cats[i].cat;
        load_method_t load_method = (load_method_t)cats[i].method;
        Class cls;
        if (!cat) continue;

        cls = _category_getClass(cat);
        if (cls  &&  cls->isLoadable()) {
            ...
            (*load_method)(cls, @selector(load));
            cats[i].cat = nil;
        }
    }
    ...
}
```

### +load 调用顺序
通过直接查看源码我们看到,在`call_class_loads()`和`call_category_loads()`两个函数中，系统直接使用 for 循环从数组中获取`load_method`方法地址,通过地址直接调用load方法。这样一来我们可以判断，+load的调用顺序跟数组是有关系的，只要知道数组内对象是怎么添加的就可以知道+load的调用顺序了。

`load_images`函数在调用`call_load_methods`之前先调用了`prepare_load_methods`，看一下这个函数里面做了什么。

* `prepare_load_methods`： 做调用+load之前的准备，将类和分类分别放到`loadable_classes`和`loadable_categories`数组中,**`schedule_class_load`是一个递归函数，优先将自己的父类加载到数组中，这也是为什么父类的+load方法比子类先调用的原因。**

```cpp
void prepare_load_methods(const headerType *mhdr)
{
    ...
    // 把所有的类放到 loadable_classes 数组中
    classref_t const *classlist = 
        _getObjc2NonlazyClassList(mhdr, &count);
    for (i = 0; i < count; i++) {
        schedule_class_load(remapClass(classlist[i]));
    }

    // 把所有的分类放到 loadable_categories 数组中
    category_t * const *categorylist = _getObjc2NonlazyCategoryList(mhdr, &count);
    for (i = 0; i < count; i++) {
        category_t *cat = categorylist[i];
        ...
        add_category_to_loadable_list(cat);
    }
}

// 为什么父类的+load比子类先调用，原理就在schedule_class_load()这个方法中。 
static void schedule_class_load(Class cls)
{
    if (!cls) return;
    ASSERT(cls->isRealized());  // _read_images should realize

    if (cls->data()->flags & RW_LOADED) return;

    // Ensure superclass-first ordering
    schedule_class_load(cls->superclass);

    add_class_to_loadable_list(cls);
    cls->setInfo(RW_LOADED); 
}
```
**+load调用顺序**
* 先调用类的+load
* 按照编译先后顺序调用（先编译，先调用）
* 调用子类的+load之前会先调用父类的+load,再调用分类的+load,按照编译先后顺序调用（先编译，先调用）

## +(void)initialize(){  }

**`+initialize`方法是通过`objc_msgSend`进行调用的，会在类第一次接收到消息时调用，它的调用顺序是先调用父类的`+initialize`，再调用子类的`+initialize`(先初始化父类，再初始化子类，每个类只会初始化1次)**

### 源码分析
因为`+initialize`只有在类第一次接收到消息的时候才会调用，由于`[Person new] 等价于 objc_msgSend([Person class],@selector(new))`，所以我们猜想，是`objc_msgSend`方法内部做了判断，当类第一次接收到消息的时候给它发`+initialize`消息。

搜索`objc_msgSend(`发现是汇编写成的，看起来太费力,换一种思路，消息调用是根据 isa 和 superclass 来找到的，`+initialize`方法它总归是要调用的，我们只要查看`class_getInstanceMethod`是如何获取到方法的就可以了。

通过`class_getInstanceMethod` -> `lookUpImpOrForward` -> `initializeAndLeaveLocked` -> `initializeAndMaybeRelock` ->  `initializeNonMetaClass` -> `initializeNonMetaClass`。到此，我们终于找到入口了。代码片段来自`objc4-781`

`initializeNonMetaClass`是一个递归方法，我们看到如果有父类并且父类没有初始化，先初始化父类。这也证实了我们刚才说的先调用父类的initialize，再调用子类的initialize方法。
```cpp
/***********************************************************************
* class_initialize.  Send the '+initialize' message on demand to any
* uninitialized class. Force initialization of superclasses first.
**********************************************************************/
void initializeNonMetaClass(Class cls)
{
    ...
    // 如果有父类并且父类没有初始化，先初始化父类
    supercls = cls->superclass;
    if (supercls  &&  !supercls->isInitialized()) {
        initializeNonMetaClass(supercls);
    }
    // 初始化
    callInitialize(cls);
    ...
}

void callInitialize(Class cls)
{
    ((void(*)(Class, SEL))objc_msgSend)(cls, @selector(initialize));
    asm("");
}
```
### +initialize的注意点

* **如果子类没有实现 +initialize，会调用父类的 +initialize（所以父类的+initialize可能会被调用多次）**
* **调用+initialize是消息机制，如果分类实现了+initialize，会覆盖类本身的+initialize调用**