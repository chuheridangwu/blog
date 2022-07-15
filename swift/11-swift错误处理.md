# 错误处理
在swift中，如果我们想抛出错误需要使用`throw`关键字,我们在调用函数的时候如何才能知道这个函数会不会返回错误呢？需要在函数的参数后面加上`throws`关键字，比如`func demo() throws {}`。我们知道这个函数有可能会返回错误,在调用时就需要注意，可以使用`try`、`do-catch`进行处理。

Swift中可以通过`Error`协议自定义运行时的错误信息。比如：
```swift
enum SomeError : Error {
    case illegalArg(String)
    case outOfBounds(Int, Int)
    case outOfMemory
}
```
函数内部通过`throw`抛出自定义`Error`，**可能会抛出`Error`的函数必须在返回值前加上`throws`声明**,比如下面的代码:
```swift
func divide(_ num1: Int, _ num2: Int) throws -> Int { // 使用 throws 表示这是一个可能会抛出错误的函数，在调用时需要注意
    if num2 == 0 {
        throw SomeError.illegalArg("0不能作为除数") // 因为 0 不能作为被除数,如果想抛出错误使用 throw
    }
    return num1 / num2
}
```

## do-catch 处理 throws 的函数
对于带有`throws`关键字的函数，需要使用`try`进行调用。比如：
```swift
var result = try divide(20, 10)
```
使用`try`调用函数仅仅保证编译时不会报错，如果抛出错误没有处理系统依然会崩溃。这时可以选择使用`do-catch`捕捉错误。
```swift
// do-catch 可以这样用
func test() {
    do {
        print(try divide(20, 0)) // 一旦抛出异常，当前作用域内这行下面的代码都不会执行
    } catch let SomeError.illegalArg(msg) {
        print("参数异常:", msg)
    } catch let SomeError.outOfBounds(size, index) {
        print("下标越界:", "size=\(size)", "index=\(index)")
    } catch SomeError.outOfMemory {
        print("内存溢出")
    } catch {
        print("其他错误")
    }
}

//  也可以这样用
do {
    try divide(20, 0)
} catch let error {
    switch error {
    case let SomeError.illegalArg(msg):
        print("参数错误：", msg)
    default:
        print("其他错误")
    }
}

//  也可以这样用
do {
    print(try divide(20, 0))
} catch is SomeError {
    print("SomeError")
}

//  也可以这样用
do {
    print(try divide(20, 0))
} catch let error as SomeError {
    print(error)
}
```
需要注意的是:**抛出`Error`后，`try`下一句直到作用域结束的代码都将停止运行**

如果在调用时不捕捉Error，可以在当前函数增加`throws`声明，`Error`将自动抛给上层函数。如果最顶层函数（main函数）依然没有捕捉Error，那么程序将终止。
```swift
func divide(_ num1: Int, _ num2: Int) throws -> Int {
    if num2 == 0 {
        throw SomeError.illegalArg("0不能作为除数")
    }
    return num1 / num2
}

func test() throws { // 不对错误进行处理，继续往上抛
    try divide(20, 0)
}
```

## try? 、try!处理错误
也可以使用try?、try!调用可能会抛出Error的函数，这样就不用去处理Error
```swift
var result1 = try? divide(20, 10) // Optional(2), Int?
var result2 = try? divide(20, 0) // nil
var result3 = try! divide(20, 10) // 2, Int

//a、b是等价的
var a = try? divide(20, 0)
var b: Int?
do {
    b = try divide(20, 0)
} catch { b = nil }
```

## rethrows - 闭包中含有throws
`rethrows`表明：函数本身不会抛出错误，但调用闭包参数抛出错误，那么它会将错误向上抛。
```swift
func exec(_ fn: (Int, Int) throws -> Int, _ num1: Int, _ num2: Int) rethrows {
    print(try fn(num1, num2))
}
// Fatal error: Error raised at top level
try exec(divide, 20, 0)
```

## defer
`defer`语句：用来定义以任何方式（抛错误、return等）离开代码块前必须要执行的代码。使用defer语句的代码块将延迟至当前作用域结束之前执行
```swift
func processFile(_ filename: String) throws {
    let file = open(filename)
    defer {  // 使用defer定义的代码块，将在函数调用前才会执行，这里是不会执行的
        close(file)
    }
    // 使用file
    // ....
    try divide(20, 0)
    // close将会在这里调用
}

// 如果多个defer，要注意调用顺序，执行顺序与定义顺序相反
func test() {
    defer { fn1() }  // 最后调用
    defer { fn2() }
    defer { fn3() }
}
```

## assert（断言）
很多编程语言都有断言机制：不符合指定条件就抛出运行时错误，常用于调试（Debug）阶段的条件判断.

默认情况下，Swift的断言只会在Debug模式下生效，Release模式下会忽略
```swift
func divide(_ v1: Int, _ v2: Int) -> Int {
    assert(v2 != 0, "除数不能为0")
    return v1 / v2
}
print(divide(20, 0))
```
增加Swift Flags修改断言的默认行为： `-assert-config Release`：强制关闭断言。 `-assert-config Debug：` 强制开启断言
![](./imgs/swift/ios_swift_32.png)

## fatalError
如果遇到严重问题，希望结束程序运行时，可以直接使用`fatalError`函数抛出错误（这是无法通过`do-catch`捕捉的错误）。

使用了`fatalError`函数，就不需要再写return。
```swift
func test(_ num: Int) -> Int {
    if num >= 0 {
        return 1
    }
    fatalError("num不能小于0")
}
```
在某些不得不实现、但不希望别人调用的方法，可以考虑内部使用fatalError函数.
```swift
class Person { required init() {} }
class Student : Person {
    required init() { fatalError("don't call Student.init") }
    init(score: Int) {}
}
var stu1 = Student(score: 98)
var stu2 = Student()
```

## 局部作用域
可以使用 do 关键字实现局部作用域
```swift
do {
    let dog1 = Dog()
    dog1.age = 10
    dog1.run()
}
```