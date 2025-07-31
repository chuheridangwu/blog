# Category的本质
Category在项目开发过程中会经常使用，通过它可以给原来的类扩展一些方法或者替换一些系统的方法。但是我们一定会有几个疑问，分类中的方法是怎么调用的，分类的信息储存在什么位置，分类可以添加实例变量吗..等等？下面就让我们来掀开它神秘的面纱。

我们将从以下几个方面观察Category:
1. 将 Category 转换成c++代码，观察它的结构 `struct category_t`结构体
2. 通过 runtime 观察 Category 和 class 之间的关系以及分类信息的存储位置
3. 查看类、分类之间`+load`和`+initialize`的加载顺序
4. 通过关联对象给分类添加实例变量以及通过runtime观察分类的实例变量存储位置

## Category的结构
我们如果想看到 Category 内部的结构，可以使用之前的方法，把oc代码转换成 c++ 代码之后窥探它的内部结构。

假设我们有一个Person的Test分类,内部包含`- (void)instanceTest;`和`+ (void)metaTest;`方法。通过`xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc Person+Test.m`命令将.m文件转换成c++代码。

```cpp
// Person+Test 分类的结构体
struct _category_t {
	const char *name;
	struct _class_t *cls;
	const struct _method_list_t *instance_methods;
	const struct _method_list_t *class_methods;
	const struct _protocol_list_t *protocols;
	const struct _prop_list_t *properties;
};

// 对象方法
static struct /*_method_list_t*/ {
	unsigned int entsize;  // sizeof(struct _objc_method)
	unsigned int method_count;
	struct _objc_method method_list[1];
} _OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_Test __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_objc_method),
	1,
	{{(struct objc_selector *)"instanceTest", "v16@0:8", (void *)_I_Person_Test_instanceTest}}
};

// 类方法
static struct /*_method_list_t*/ {
	unsigned int entsize;  // sizeof(struct _objc_method)
	unsigned int method_count;
	struct _objc_method method_list[1];
} _OBJC_$_CATEGORY_CLASS_METHODS_Person_$_Test __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_objc_method),
	1,
	{{(struct objc_selector *)"metaTest", "v16@0:8", (void *)_C_Person_Test_metaTest}}
};

// 分类的初始化
static struct _category_t _OBJC_$_CATEGORY_Person_$_Test __attribute__ ((used, section ("__DATA,__objc_const"))) = 
{
	"Person",
	0, // &OBJC_CLASS_$_Person,
	(const struct _method_list_t *)&_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_Test,
	(const struct _method_list_t *)&_OBJC_$_CATEGORY_CLASS_METHODS_Person_$_Test,
	0,
	0,
};
```
我们发现一个`_category_t`这样一个结构体，这个就是分类的结构。如果通过runtime源码去查看这个结构体，发现`category_t`这个结构体跟我们现在转换之后的不一样，这是因为转换的代码跟实际源码还是存在一定的差异，但是并不多。
## 通过 runtime 观察分类信息的存储位置
源码中的`struct category_t` 结构体，跟我们通过oc代码转换的`_category_t`结构体基本差不多。
```cpp
struct category_t {
    const char *name;
    classref_t cls;
    struct method_list_t *instanceMethods;
    struct method_list_t *classMethods;
    struct protocol_list_t *protocols;
    struct property_list_t *instanceProperties;
    // Fields below this point are not always present on disk.
    struct property_list_t *_classProperties;

    method_list_t *methodsForMeta(bool isMeta) {
        if (isMeta) return classMethods;
        else return instanceMethods;
    }

    property_list_t *propertiesForMeta(bool isMeta, struct header_info *hi);
    
    protocol_list_t *protocolsForMeta(bool isMeta) {
        if (isMeta) return nullptr;
        else return protocols;
    }
};
```
通过runtime 的源码查看分类,在`void _objc_init(void)`入口方法中，我们看到`load_images()`，`load_images()`中有调用`loadAllCategories()`方法,这应该就是我们要找的分类了。通过`didInitialAttachCategories`值观察到，`loadAllCategories()`方法只会调用一次。
```cpp
void
load_images(const char *path __unused, const struct mach_header *mh)
{
    if (!didInitialAttachCategories && didCallDyldNotifyRegister) {
        didInitialAttachCategories = true;
        loadAllCategories();
    }

    ....

    // Call +load methods (without runtimeLock - re-entrant)
    call_load_methods();
}
```
通过`loadAllCategories()` -> `load_categories_nolock()`,全局搜索`load_categories_nolock()`,发现只有`loadAllCategories()`和`_read_images()`这两处地方调用。

```cpp
static void loadAllCategories() {
    mutex_locker_t lock(runtimeLock);

    for (auto *hi = FirstHeader; hi != NULL; hi = hi->getNext()) {
        load_categories_nolock(hi);
    }
}

void _read_images(header_info **hList, uint32_t hCount, int totalClasses, int unoptimizedTotalClasses)
{
    ...
    if (didInitialAttachCategories) {
        for (EACH_HEADER) {
            load_categories_nolock(hi);
        }
    }
    ...
}
```
`didInitialAttachCategories`只有在调用`loadAllCategories()`之前被设置为 YES，证明`_read_images()`中的方法是在`loadAllCategories()`之后进行调用的。继续往下走，通过`load_categories_nolock()` -> `attachCategories()`,在`attachCategories()`方法的注释中我们看到`attachCategories()`方法的主要作用就是把分类的方法添加到类中，并且越晚被编译的分类显示在最前面。
```cpp
// Attach method lists and properties and protocols from categories to a class.
// Assumes the categories in cats are all loaded and sorted by load order, 
// oldest categories first.
static void
attachCategories(Class cls, const locstamped_category_t *cats_list, uint32_t cats_count,
                 int flags)
{
    ....
    // 是都是元类对象
    bool isMeta = (flags & ATTACH_METACLASS);
    // 获取到 class_rw_ext_t 这个结构体，class_rw_ext_t中包含着类的具体信息
    auto rwe = cls->data()->extAllocIfNeeded();

    // 获取到分类的方法、属性、协议
    for (uint32_t i = 0; i < cats_count; i++) {
        auto& entry = cats_list[i];

        method_list_t *mlist = entry.cat->methodsForMeta(isMeta);
        if (mlist) {
            if (mcount == ATTACH_BUFSIZ) {
                prepareMethodLists(cls, mlists, mcount, NO, fromBundle);
                rwe->methods.attachLists(mlists, mcount);
                mcount = 0;
            }
            mlists[ATTACH_BUFSIZ - ++mcount] = mlist;
            fromBundle |= entry.hi->isBundle();
        }

        property_list_t *proplist =
            entry.cat->propertiesForMeta(isMeta, entry.hi);
        if (proplist) {
            if (propcount == ATTACH_BUFSIZ) {
                rwe->properties.attachLists(proplists, propcount);
                propcount = 0;
            }
            proplists[ATTACH_BUFSIZ - ++propcount] = proplist;
        }

        protocol_list_t *protolist = entry.cat->protocolsForMeta(isMeta);
        if (protolist) {
            if (protocount == ATTACH_BUFSIZ) {
                rwe->protocols.attachLists(protolists, protocount);
                protocount = 0;
            }
            protolists[ATTACH_BUFSIZ - ++protocount] = protolist;
        }
    }

    if (mcount > 0) {
        prepareMethodLists(cls, mlists + ATTACH_BUFSIZ - mcount, mcount, NO, fromBundle);
        // 将分类中的方法添加到类对象中
        rwe->methods.attachLists(mlists + ATTACH_BUFSIZ - mcount, mcount);
        if (flags & ATTACH_EXISTING) flushCaches(cls);
    }
    // 将分类中的属性添加到类对象中
    rwe->properties.attachLists(proplists + ATTACH_BUFSIZ - propcount, propcount);

    // 将分类中的协议添加到类对象中
    rwe->protocols.attachLists(protolists + ATTACH_BUFSIZ - protocount, protocount);
}
```

`attachLists()`主要更新类的方法、属性、协议等信息，会把分类的方法放在类信息中本来的方法前面，如果分类和类中有相同的自定义方法，会首先调用分类的方法。`load()`和`initialize()`方法除外。

```cpp
// 对类原来的维护的列表进行添加 
void attachLists(List* const * addedLists, uint32_t addedCount) {
    if (addedCount == 0) return;

    if (hasArray()) {
        // many lists -> many lists
        uint32_t oldCount = array()->count;
        uint32_t newCount = oldCount + addedCount;
        setArray((array_t *)realloc(array(), array_t::byteSize(newCount)));
        array()->count = newCount;
        // array()->lists  原来的方法列表
        memmove(array()->lists + addedCount, array()->lists, 
                oldCount * sizeof(array()->lists[0]));
        // addedLists 所有分类的列表
        memcpy(array()->lists, addedLists, 
                addedCount * sizeof(array()->lists[0]));
    }
    else if (!list  &&  addedCount == 1) {
        ...
    } 
    else {
        ...
    }
}
```
至此，我们可以做一个总结：**Category 编译之后的底层结构是`struct category_t`结构体，里面存储着`分类的对象方法、类方法、属性、协议信息。`
在程序运行的时候，runtime 会将 Category的数据，合并到类信息中（类对象、元类对象中）**

## 知识扩展
**`memmove()`和`memcpy()`的区别**

` void *memmove(void *str1, const void *str2, size_t n)` 从 str2 复制 n 个字符到 str1，**如果目标区域和源区域有重叠的话，memmove() 能够保证源串在被覆盖之前将重叠区域的字节拷贝到目标区域中，复制后源区域的内容会被更改。**如果目标区域与源区域没有重叠，则和 memcpy() 函数功能相同。memmove()方法整体进行拷贝，它里面会做一个判断是向左移还是向右移。

` void *memcpy(void *str1, const void *str2, size_t n)` 从存储区 str2 复制 n 个字节到存储区 str1。挨个字节进行拷贝

**成员变量和属性的区别**
```markdown
* 成员变量
    1. 成员变量不会自动生成set和get方法，需要自己手动实现。
    2. 成员变量不能用点语法调用，因为没有set和get方法，只能使用->调用。复制代码
* 属性
    1. 属性的默认修饰是@protected。
    2. 属性会自动生成set和get方法。分类中添加的属性不会自动生成set和get方法。
    3. 属性用点语法调用，点语法实际上调用的是set和get方法。
```

* [iOS-成员变量和属性的区别](https://juejin.cn/post/6844903809982922760)