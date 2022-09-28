# 泛型
泛型可以将类型参数化，提高代码复用率，减少代码量。比如下面的交换值的函数:
```swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    (a, b) = (b, a)
}
var i1 = 10
var i2 = 20
swapValues(&i1, &i2)  // 传入第一个参数的时候函数已经知道是什么类型了
```
函数中也支持多个泛型，将泛型函数赋值给变量时需要注意，需要说明泛型的类型，另外函数默认是有返回值的.
```swift
func test<T1, T2>(_ t1: T1, _ t2: T2) {}
var fn: (Int, Double) -> () = test
```
## 泛型的使用
泛型在类中、结构体、枚举中都可以使用。比如定义一个使用泛型的栈
```swift
class Stack<E> {
    var elements = [E]()
    func push(_ element: E) { elements.append(element) }
    func pop() -> E { elements.removeLast() }
    func top() -> E { elements.last! }
    func size() -> Int { elements.count }
    // 如果在初始化方法中需要传入第一个元素，在使用时不需要标明类型
    //func init(firstElement: E){
    //    elements.append(firstElement)
    //}
}
var intStack = Stack<Int>()
var stringStack = Stack<String>()
```
结构体中使用泛型，需要注意的细节是，如果在函数中需要修改结构体属性的内存，需要在方法前添加 mutating关键字
```swift
struct Stack<E> {
    var elements = [E]()
    mutating func push(_ element: E) { elements.append(element) }
    mutating func pop() -> E { elements.removeLast() }
    func top() -> E { elements.last! }
    func size() -> Int { elements.count }
}

// 枚举中使用泛型
enum Score<T> {
    case point(T)
    case grade(String)
}
let score0 = Score<Int>.point(100)
let score1 = Score.point(99)
let score2 = Score.point(99.5)
let score3 = Score<Int>.grade("A") // 必须告诉结构体泛型是什么类型
```

## 关联类型（Associated Type） - 协议中使用泛型
关联类型的作用：给协议中用到的类型定义一个占位名称，协议中可以拥有多个关联类型。
```swift
protocol Stackable {
    associatedtype Element // 关联类型,在继承协议
    mutating func push(_ element: Element)
    mutating func pop() -> Element
    func top() -> Element
    func size() -> Int
}

// 类实现某个协议
class Stack<E> : Stackable {
    // typealias Element = E   //可以直接告诉编译器是什么类型，也可以让编译器自己发现
    var elements = [E]()
    func push(_ element: E) {
    elements.append(element)
    }
    func pop() -> E { elements.removeLast() }
    func top() -> E { elements.last! }
    func size() -> Int { elements.count }
}
```

## 类型约束
我们在使用泛型时，可以对泛型做一些约束以满足我们的需求。比如要求泛型满足某个协议或者是只允许泛型是类。
```swift
protocol Runnable { }
class Person { }
// 要求泛型必须是Person类型或者Person的子类型并且遵守Runnable协议
func swapValues<T : Person & Runnable>(_ a: inout T, _ b: inout T) {
    (a, b) = (b, a)
}
```
协议的关联类型也是可以定义约束的.比如下面的代码。协议定义关联类型，并且遵守Equatable协议。
```swift
protocol Stackable {
    associatedtype Element: Equatable
}
class Stack<E : Equatable> : Stackable { typealias Element = E }

// 要求泛型遵守Stackable协议 并且S1.Element = S2.Element, 并且 S1.Element 遵守Hashable协议
func equal<S1: Stackable, S2: Stackable>(_ s1: S1, _ s2: S2) -> Bool
    where S1.Element == S2.Element, S1.Element : Hashable {
    return false
}
var stack1 = Stack<Int>()
var stack2 = Stack<String>()
equal(stack1, stack2) // error: requires the types 'Int' and 'String' be equivalent
```

## 协议类型的注意点
协议类型的需要注意的地方，在下面的代码中，我们在代码上看r1是Person对象，r2是Car对象,但是在代码中使用时，是Runnable对象。
```swift
protocol Runnable {}
class Person : Runnable {}
class Car : Runnable {}
 
func get(_ type: Int) -> Runnable {
    if type == 0 {
        return Person()
    }
    return Car()
}
var r1 = get(0)
var r2 = get(1)
```
如果协议中有使用关联类型 `associatedtype`,在使用时需要确定协议中的关联类型是什么类型。在下面的代码中是无法确定的。
```swift
protocol Runnable {
    associatedtype Speed
    var speed: Speed { get }
}
class Person : Runnable {
    var speed: Double { 0.0 }
}
class Car : Runnable {
    var speed: Int { 0 }
}

func get(_ type: Int) -> Runnable { // 会报错，不知道关联类型是什么
    if type == 0 {
        return Person()
    }
    return Car()
}
```

#### 解决方案1 使用泛型
```swift
func get<T : Runnable>(_ type: Int) -> T {
    if type == 0 {
        return Person() as! T
    }
    return Car() as! T
}
var r1: Person = get(0)
var r2: Car = get(1)
```

#### 不透明类型（Opaque Type）
解决方案②：使用`some`关键字声明一个不透明类型
```swift
func get(_ type: Int) -> some Runnable { Car() }
var r1 = get(0)
var r2 = get(1)
```
为什么加上some之后就可以了，这是因为some限制只能返回一种类型,some除了用在返回值类型上，一般还可以用在属性类型上
```swift
protocol Runnable { associatedtype Speed }
class Dog : Runnable { typealias Speed = Double }
class Person {
    var pet: some Runnable {
        return Dog()
    }
}
```
> some给人的感觉比较鸡肋，既然只能返回一种类型，为什么不直接返回对应的类型就好了，还要使用some。比如这样一种场景，在调用函数时，如果你不想让别人知道你里面的具体实现的真实类型，可以使用这种方法

## 可选项的本质
可选项的本质是`enum`类型:
```swift
public enum Optional<Wrapped> : ExpressibleByNilLiteral {
    case none
    case some(Wrapped)
    public init(_ some: Wrapped)
}
```
比如下面的代码是等价的
```swift
var age: Int? = 10
var age0: Optional<Int> = Optional<Int>.some(10)
var age1: Optional<Int> = .some(10)
var age2 = Optional.some(10)
var age3 = Option(10)
age = nil
age3 = .none
```