# 位域和共同体union
假设有下面的场景，需要用一个字节记录多个bool值，应该怎么去做呢？

在代码中，我们经常会看到别人这样写一个结构体，这又是什么意思呢？
```objc
typedef NS_OPTIONS(NSUInteger, NSKeyValueObservingOptions) {
    NSKeyValueObservingOptionNew = 0x01,    //使用二进制表示  0b0000 0001
    NSKeyValueObservingOptionOld = 0x02,    //  0b0000 0010
    NSKeyValueObservingOptionInitial = 0x04, //  0b0000 0100
    NSKeyValueObservingOptionPrior = 0x08 //  0b0000 1000
};
或者
typedef NS_OPTIONS(NSUInteger, NSKeyValueObservingOptions) {
    NSKeyValueObservingOptionNew = 1<<0,    //使用二进制表示  0b0000 0001
    NSKeyValueObservingOptionOld = 1<<1,    //  0b0000 0010
    NSKeyValueObservingOptionInitial = 1<<2, //  0b0000 0100
    NSKeyValueObservingOptionPrior = 1<<3 //  0b0000 1000
};
```
这是为了节省存储空间使用的一种数据结构，位域。我们都知道一个字节有8个二进制位，每一位都有两个值，0和1，如果使用0代表fasle，1代表true，是不是就可以使用一个字节表示三个布尔值了。

## 一个字节保存三个BOOL类型
在下面的代码中，我们将演示如何使用一个字节存储三个bool值，我们在 Person 中定义`tall/rich/handsome`三个属性，使用一个字节 _tallRichHandsome存储这三个bool值。
```objc
// .h文件
@interface Person : NSObject
- (void)setTall:(BOOL)tall;
- (void)setRich:(BOOL)rich;
- (void)setHandsome:(BOOL)handsome;

- (BOOL)isTall;
- (BOOL)isRich;
- (BOOL)isHandsome;
@end

//.m文件 利用一个字节，使用位域的方式存储三个bool值
#define TallMask (1<<0)  // 二进制 0b0000 0001  十进制就是1
#define RichMask (1<<1)  // 二进制 0b0000 0010  十进制就是2
#define HandsomeMask (1<<2) // 二进制 0b0000 0100  十进制就是4

@interface Person()
{
  char  _tallRichHandsome; //一个字节是8个二进制位 0b0000 0000， 利用后三位存储三个bool值
}
@end

@implementation Person

- (void)setTall:(BOOL)tall{
    if (tall) { // 当为yes时，使用按位或，只要对应的两个二进制位有一个为1，结果值就是1
        _tallRichHandsome |= TallMask;
    }else{  //当为no时，使用按位与，只有对应的两个二进制位都为1，结果值才是1，对1进行按位取反，所以值肯定为0
        _tallRichHandsome &= ~TallMask;
    }
}
- (void)setRich:(BOOL)rich{
    if (rich) {
        _tallRichHandsome |= RichMask;
    }else{
        _tallRichHandsome &= ~RichMask;
    }
}
- (void)setHandsome:(BOOL)handsome{
    if (handsome) {
        _tallRichHandsome |= HandsomeMask;
    }else{
        _tallRichHandsome &= ~HandsomeMask;
    }
}
- (BOOL)isTall{
    return !!(_tallRichHandsome & TallMask);
}
- (BOOL)isRich{
    return !!(_tallRichHandsome & RichMask);
}
- (BOOL)isHandsome{
    return !!(_tallRichHandsome & HandsomeMask);
}
@end
```
这里主要使用的是`按位与 &`和`按位或 |`以及`按位取反~`来计算的。mask也称为掩码。
* `按位与 &` 只有对应的两个二进制位都为1，结果值才是1
```c
      0b0000 0000
&   0b0000 0001
     -------------
      0b0000 0000
```

* `按位或 |` 只要对应的两个二进制位有一个为1，结果值就是1
```c
      0b0000 0000
|   0b0000 0001
     -------------
      0b0000 0001
```

* `按位取反~` 
```c
1 的二进制位是：  0b0000 0001
~1 按位取反之后： 0b1111 1110
```
关于`!!(_tallRichHandsome & 1)`的疑问，为什么这里要使用两个`!`,这是因为可以省略掉BOOL类型的强制转换。取反之后再取反，不就是原来的值嘛。一个小技巧。

## 位域
我们使用位域的方式重构一下代码，`char tall : 1; `表示只占字节中的一个二进制位，结构体的大小只占1个字节。如果有不同的类型，取最大的值。

位域这种数据结构的缺点在于，其内存分配与内存对齐的实现方式依赖于具体的机器和系统，在不同的平台可能有不同的结果，这导致了位段在本质上是不可移植的。
```objc
@interface Person()
{
    struct{  // 使用位域的方式保存数据
        char tall : 1;  //:1  表示tall只占字节中的一个二进制位
        char rich : 1;
        char handsome : 1;
    } _tallRichHandsome;  //0b0000 0000 ，tall 是最后一位，rich是第二位，hansome是第三位，跟顺序有关系
}
@end

@implementation Person

- (void)setTall:(BOOL)tall{
    _tallRichHandsome.tall = tall;
}
- (void)setRich:(BOOL)rich{
    _tallRichHandsome.rich = rich;
}
- (void)setHandsome:(BOOL)handsome{
    _tallRichHandsome.handsome = handsome;
}
- (BOOL)isTall{
    // 这里要注意，如果只是 return _tallRichHandsome.tall，当tall为YES时，你会发现返回的是-1，这是因为_tallRichHandsome.tall只占1位，而BOOL是一个字节，需要八位，那么它会把剩余的部分全部使用1去填充，也就变成了0b1111 1111
    return !!_tallRichHandsome.tall;
}
- (BOOL)isRich{
    return !!_tallRichHandsome.rich;
}
- (BOOL)isHandsome{
    return !!_tallRichHandsome.handsome;
}
@end
```

获取返回值的时候要注意，如果只是 `return _tallRichHandsome.tall`，当tall为YES时，你会发现返回的是-1，这是因为_tallRichHandsome.tall只占1位，而BOOL是一个字节，需要八位，那么它会把剩余的部分全部使用1去填充，也就变成了0b1111 1111，可以使用两次取反或者`char tall : 2;`来解决这个问题
* 使用1个字节存储-1和255时，地址都是0b1111 1111,无符号是255，有符号是-1

## 共同体 union
使用共用体的方式来解决这个问题，结构体在这里只起到增加可读性的作用，并没有使用到它，这里我们使用两个二进制位表示rich字段。
```objc
#define TallMask (1<<0)  // 二进制 0b0000 0001  十进制就是1
#define RichMask (3<<1)  // 二进制 0b0000 0110  十进制就是6
#define HandsomeMask (1<<3) // 二进制 0b0000 1000  十进制就是8

@interface Person()
{
    union{
        char bits;
        
        struct{ // 结构体在这里只是为了增加可读性，不起任何作用
            char tall : 1;
            char rich : 2;  //这里使用2个二进制位来表示ritch
            char handsome : 1;
        };
    }_tallRichHandsome;

}
@end

@implementation Person

- (void)setTall:(BOOL)tall{
    if (tall) {
        _tallRichHandsome.bits |= TallMask;
    }else{
        _tallRichHandsome.bits &= ~TallMask;
    }
}
- (void)setRich:(BOOL)rich{
    if (rich) {
        _tallRichHandsome.bits |= RichMask;
    }else{
        _tallRichHandsome.bits &= ~RichMask;
    }
}
- (void)setHandsome:(BOOL)handsome{
    if (handsome) {
        _tallRichHandsome.bits |= HandsomeMask;
    }else{
        _tallRichHandsome.bits &= ~HandsomeMask;
    }
}
- (BOOL)isTall{
    return !!(_tallRichHandsome.bits & TallMask);
}
- (BOOL)isRich{
    return !!(_tallRichHandsome.bits & RichMask);
}
- (BOOL)isHandsome{
    return !!(_tallRichHandsome.bits & HandsomeMask);
}
@end
```
这里我们使用两个二进制位来保存 rich, 两个二进制位是`0b0000 0011`,转化为十进制是3，所以使用`#define RichMask (3<<1)`来表示。

## 项目中的应用
在项目中使用 `按位|`的方式将多个值传递过去。
```objc
typedef enum {
    DateType_Year = 1 << 0,
    DateType_Month = 1 << 1,
    DateType_Day = 1 << 2,
    DateType_Hour = 1 << 3,
    DateType_Minute = 1 << 4,
    DateType_Second = 1 << 5,
}DateOption;

void setOptinon(DateOption option){
    if (option & DateType_Year) {
        NSLog(@"包含年");
    }
    if (option & DateType_Month) {
        NSLog(@"包含月");
    }
    if (option & DateType_Day) {
        NSLog(@"包含日");
    }
    if (option & DateType_Hour) {
        NSLog(@"包含时");
    }
    if (option & DateType_Minute) {
        NSLog(@"包含分");
    }
    if (option & DateType_Second) {
        NSLog(@"包含秒");
    }
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {  
        setOptinon(DateType_Year | DateType_Second | DateType_Day);    
    }
    return 0;
}
```