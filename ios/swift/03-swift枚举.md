# 枚举和可选项
Swift中枚举的用法比oc中要多，基本使用是一样的。枚举的基本格式是：
```swift
enum Direction {
    case north, south, east, west
}
```

## 关联值
在oc中最常用的就是枚举对应整数类型的值，在Swift中也有`关联值（Associated Values）`。可以在一个枚举中关联多种类型。比如：
```swift
enum Date {
    case digit(year: Int, month: Int, day: Int)
    case string(String)
}
var date = Date.digit(year: 2011, month: 9, day: 10)
date = .string("2011-09-10")

// 枚举中的成员可以使用let也可以使用var进行修饰
switch date {
    case .digit(let year, let month, let day):
        print(year, month, day)
    case let .string(value):
        print(value)
}
```
## 原始值（Raw Values）
枚举成员可以使用相同类型的默认值预先对应，这个默认值叫做：`原始值（Raw Values）`。代码如下:
```swift
enum Grade : String {
case perfect = "A"
case great = "B"
case good = "C"
case bad = "D"
}
var suit = Grade.good
print(suit) // good
print(Grade.perfect.rawValue) // A
print(Grade.great.rawValue) // B
```
>📢注意: 原始值不占用枚举变量的内存,可以通过`MemoryLayout`进行查看

## 隐式原始值（Implicitly Assigned Raw Values）
隐式原始值就是说即使你不明确的给它赋值，但是它也是有值的，比如下面的代码：
```swift
enum Direction : String {
    case north, south, east, west
}

// 上面的枚举等价于下面的写法
enum Direction : String {
    case north = "north"
    case south = "south"
    case east = "east"
    case west = "west"
}
```
这两种写法是一样的，当枚举标明类型，Swift会隐式的对其赋值。Int类型的枚举跟oc一样会隐式赋值。也可以跟下面的代码一样进行隐式赋值。
```swift
enum Season : Int {
    case spring = 1, summer, autumn = 4, winter
}
print(Season.spring.rawValue) // 1
print(Season.summer.rawValue) // 2
print(Season.autumn.rawValue) // 4
print(Season.winter.rawValue) // 5
```
## 递归枚举（Recursive Enumeration）
递归枚举是指在枚举中也要使用到当前的枚举，必须使用到关键字`indirect`。代码如下：
```swift
indirect enum ArithExpr {
    case number(Int)
    case sum(ArithExpr, ArithExpr)
    case difference(ArithExpr, ArithExpr)
}
// 上面的写法等价于下面的代码
enum ArithExpr {
    case number(Int)
    indirect case sum(ArithExpr, ArithExpr)
    indirect case difference(ArithExpr, ArithExpr)
}
```
在使用时，可以直接传入当前枚举,比如下面的代码：
```swift
let five = ArithExpr.number(5)
let four = ArithExpr.number(4)
let two = ArithExpr.number(2)
let sum = ArithExpr.sum(five, four)
let difference = ArithExpr.difference(sum, two)

func calculate(_ expr: ArithExpr) -> Int {
switch expr {
    case let .number(value):
    return value
    case let .sum(left, right):
        return calculate(left) + calculate(right)
    case let .difference(left, right):
        return calculate(left) - calculate(right)
    }
}
calculate(difference)
```

## MemoryLayout 获取类型占用的大小
c 语言中使用`sizeof()`获取类型的大小，Swift中可以使用`MemoryLayout`获取数据类型占用的内存大小。比如我们想知道枚举占用的内存大小
```swift
enum Password {
    case number(Int, Int, Int, Int)
    case other
}

MemoryLayout<Password>.stride // 40, 分配占用的空间大小
MemoryLayout<Password>.size // 33, 实际用到的空间大小
MemoryLayout<Password>.alignment // 8, 对齐参数

var pwd = Password.number(9, 8, 6, 4)
pwd = .other
MemoryLayout.stride(ofValue: pwd) // 40
MemoryLayout.size(ofValue: pwd) // 33
MemoryLayout.alignment(ofValue: pwd) // 8
```

## 枚举的内存管理
我们可以通过`Xcode->Debug->Debug Workflow->View Memory`查看对应的内存细节,在Swift中通过LLDB不能直接获取到内存地址，我们可以通过明杰老师编写的[小工具](https://github.com/CoderMJLee/Mems)获取变量内存地址,使用方式是`print(Mems.ptr(ofVal: &t))`。获取到变量地址后，将地址填入对应的内存地址框中就可以查看具体的内存细节了。先看一个简单的枚举。
```swift
enum TestEnum {
    case test1, test2, test3
}// 内存大小为1个字节

var t = TestEnum.test1 // 内存中保存值为0
print(Mems.ptr(ofVal: &t))  // 获取到内存地址
t = .test2  // 内存中保存值为1
t = .test3  // 内存中保存值为2
```
定义一个`TestEnum`枚举，定义一个枚举变量，获取到内存中的数据值为0，当 `t = .test2`时内存地址中的值为1,`t = .test3`时内存地址值为2。如下图：
![](../imgs/swift/ios_swift_16.png)

如果枚举是关联值的时候，内存中有一个字节是存储它的成员值，其他内存保存它关联的值。枚举有内存对齐，会取最多参数成员值中的参数类型进行内存对齐。比如下面的代码：
```swift
enum TestEnum {
    case test0
    case test1
    case test2
    case test3(Int)
    case test4(Int, Int)
    case test5(Int, Int, Int)
}
print(MemoryLayout<TestEnum>.size)   // 实际使用 25
print(MemoryLayout<TestEnum>.stride) // 系统分配 32
print(MemoryLayout<TestEnum>.alignment) // 内存对齐 8


// 01 00 00 00 00 00 00 00
// 02 00 00 00 00 00 00 00
// 03 00 00 00 00 00 00 00
// 02  存储成员变量的值
// 00 00 00 00 00 00 00
var t = TestEnum.test5(1,2,3)

// 01 00 00 00 00 00 00 00
// 02 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 01  存储成员变量的值
// 00 00 00 00 00 00 00
var t = TestEnum.test4(1,2)

// 01 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 00  存储成员变量的值
// 00 00 00 00 00 00 00
var t = TestEnum.test3(1)

// 02 00 00 00 00 00 00 00  // 这里存放成员变量的值
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00  // 这里因为用不到，内存没清理还是原来的值
var t = TestEnum.test2()

// 01 00 00 00 00 00 00 00  // 这里存放成员变量的值
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00  
var t = TestEnum.test1()

// 00 00 00 00 00 00 00 00  // 这里存放成员变量的值
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00  
var t = TestEnum.test1()
```

