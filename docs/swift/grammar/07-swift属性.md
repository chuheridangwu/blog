# 属性
Swift中跟实例相关的属性可以分为2大类：存储属性、计算属性
```markdown
* 存储属性`（Stored Property）`: 类似于成员变量这个概念,存储在实例的内存中。结构体、类可以定义存储属性。枚举不可以定义存储属性。
* 计算属性`（Computed Property）`: 本质就是方法（函数）,不占用实例的内存,枚举、结构体、类都可以定义计算属性
```
比如下面的代码，定义一个存储属性和计算属性：
```swift
struct Circle {
    // 存储属性
    var radius: Double
    // 计算属性
    var diameter: Double {
        set {
            radius = newValue / 2
        }
        get {
            radius * 2
        }
    }
}
```

## 存储属性
关于存储属性，Swift有个明确的规定:` 在创建类 或 结构体的实例时，必须为所有的存储属性设置一个合适的初始值`。可以在初始化器里为存储属性设置一个初始值,也可以分配一个默认的属性值作为属性定义的一部分。

## 计算属性
计算属性本质就是函数，在方法名内部嵌套`set`和`get`函数。`set`方法传入的新值默认叫做`newValue`，也可以自定义,比如:
```swift
struct Circle {
    var radius: Double
    var diameter: Double {
        set(newDiameter) {
            radius = newDiameter / 2
        }
        get {
            radius * 2
        }
    }
}
```
如果计算属性只有get方法，属于只读计算属性
```swift
var diameter: Double {
    get {
        radius * 2
    }
}
```
>⚠️ 定义计算属性只能用`var`，不能用let。let代表常量，值是一成不变的。计算属性的值是可能发生变化的（即使是只读计算属性）

枚举原始值`rawValue`的本质是：只读计算属性,比如下面的代码：
```swift
enum Seasom : Int {
    case spring = 1, summer
    var rawValue: Int {
        switch self {
            case .spring:
                return 10
            case .summer:
                return 11
        }
    }
}
```

## 延迟存储属性（Lazy Stored Property）
使用`lazy`可以定义一个延迟存储属性，在第一次用到属性的时候才会进行初始化。类似oc中的懒加载，需要注意，定义的是存储属性。
```swift
class PhotoView {
    lazy var header = UIView()
    lazy var image: Image = {
        let url = "https://www.520it.com/xx.png"
        let data = Data(url: url)
        return Image(data: data)
    }()
}
```
>⚠️ `lazy`属性必须是`var`，不能是`let`。因为 let 必须在实例的初始化方法完成之前就拥有值.另外如果多条线程同时第一次访问lazy属性,无法保证属性只被初始化1次。

当结构体包含一个延迟存储属性时，只有定义结构体实例为 var 才能访问延迟存储属性，**因为延迟属性初始化时需要改变结构体的内存**
```swift
struct Point{
    var x = 0
    lazy var y = 0
}
// 这里实例变量p必须是var才能访问y
var p = Point()
```

## 属性观察器（Property Observer）
属性观察期类似于oc中的KVC,可以为**非lazy的var存储属性设置属性观察器**,在属性的值改变前后通过`willSet`和`didSet`进行监听。
```swift
struct Circle {
    var radius: Double {
        willSet {
            print("willSet", newValue)
        }
        didSet {
            print("didSet", oldValue, radius)
        }
    }
    init() {
        self.radius = 1.0 // init方法中设置属性的值不会引发willSet方法
        print("Circle init!")
    }
}
```
>⚠️ willSet会传递新值，默认叫newValue,didSet会传递旧值，默认叫oldValue。在初始化器中设置属性值不会触发willSet和didSet。在属性定义时设置初始值也不会触发willSet和didSet。

全局变量和局部变量也是可以使用willSet和didSet的:
```swift
func test() {
    var age = 10 {
        willSet {
            print("willSet", newValue)
        }
        didSet {
            print("didSet", oldValue, age)
        }
    }
    age = 11
    // willSet 11
    // didSet 10 11
}
test()
```

## ioput的本质
如果实参有物理内存地址，且没有设置属性观察器,直接将实参的内存地址传入函数（实参进行引用传递）。

如果实参是计算属性 或者 设置了属性观察器,采取了`Copy In Copy Out`的做法:
```markdown
1. 调用该函数时，先复制实参的值，产生副本【get】
2. 将副本的内存地址传入函数（副本进行引用传递），在函数内部可以修改副本的值
3. 函数返回后，再将副本的值覆盖实参的值【set】

总结：inout的本质就是引用传递（地址传递）
```
可以通过汇编查看下面的代码，当传入不同的实参时，汇编时如何变化的：
```swift
struct Shape {
    var width: Int
    var side: Int {
        willSet {
            print("willSetSide", newValue)
        }
        didSet {
            print("didSetSide", oldValue, side)
        }
    }
    var girth: Int {
        set {
            width = newValue / side
            print("setGirth", newValue)
        }
        get {
            print("getGirth")
            return width * side
        }
    }
    func show() {
        print("width=\(width), side=\(side), girth=\(girth)")
    }
}

func test(_ num: inout Int) {
    num = 20
}
var s = Shape(width: 10, side: 4)
test(&s.width)
s.show()
print("----------")
test(&s.side)
s.show()
print("----------")
test(&s.girth)
s.show()
```

## 类型属性（Type Property）
属性严格来说，可以分为:
```markdown
* 实例属性`（Instance Property）`：只能通过实例去访问
    * 存储实例属性（`Stored Instance Property）`：存储在实例的内存中，每个实例都有1份
    * 计算实例属性`（Computed Instance Property）`
* 类型属性`（Type Property）`：只能通过类型去访问
    * 存储类型属性`（Stored Type Property）`：整个程序运行过程中，就只有1份内存（类似于全局变量）
    * 计算类型属性`（Computed Type Property）`

```
可以通过`static`定义类型属性,如果是类，也可以用关键字`class`进行定义。
```swift
struct Car {
    static var count: Int = 0  //等价于全局变量，只是限制了读取范围
    init() {
        Car.count += 1
    }
}
let c1 = Car()
let c2 = Car()
print(Car.count) // 2 因为count只有一份内存
```
关于存储类型属性的注意点有以下几点:
```markdown
1. 不同于存储实例属性，存储类型属性可以不设定初始值,因为类型没有像实例那样的init初始化器来初始化存储属性。
2. 存储类型属性默认就是lazy，会在第一次使用的时候才初始化,就算被多个线程同时访问，保证只会初始化一次
3. 存储类型属性可以是let
4. 枚举类型也可以定义类型属性（存储类型属性、计算类型属性）
```

## 单例模式
类型属性的经典应用就是单利,swift中定义单利可以使用下面的方式:
```swift
public class FileManager {
    public static let shared = FileManager()
    private init() { }
}
// 或者
public class FileManager {
    public static let shared = {
        // ....
        return FileManager()
    }()
    private init() { }
}
```

## 方法
枚举、结构体、类都可以定义实例方法、类型方法
```markdown
* 实例方法`（Instance Method）`：通过实例对象调用
* 类型方法`（Type Method）`：通过类型调用，用`static`或者`class`关键字定义
    * `static`修饰的类型方法，不允许被子类重写
    * `class`修饰的类型方法，允许被子类重写
```
使用`static`定义类型方法,`self`在实例方法中代表实例对象,在类型方法中代表类型。在类型方法中，count等价于`self.cout、Car.self.cout、Car.cout`。
```swift
class Car {
    static var cout = 0
    init() {
        Car.cout += 1
    }
    static func getCount() -> Int { cout }
}
let c0 = Car()
let c1 = Car()
let c2 = Car()
print(Car.getCount()) // 3
```

## 方法 mutating
结构体和枚举是值类型，默认情况下，值类型的属性不能被自身的实例方法修改。在func关键字前加`mutating`可以允许这种修改行为。
```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(deltaX: Double, deltaY: Double) {
        x += deltaX
        y += deltaY
        // self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

>⚠️ 在`func`前面加个`@discardableResult`，可以消除：函数调用后返回值未被使用的警告⚠

## 下标（subscript）
使用`subscript`可以给任意类型（枚举、结构体、类）增加下标功能，有些地方也翻译为：下标脚本。
`subscript`的语法类似于实例方法、计算属性，本质就是方法（函数）。
```swift
class Point {
    var x = 0.0, y = 0.0
    subscript(index: Int) -> Double {
        set {
            if index == 0 {
                x = newValue
            } else if index == 1 {
                y = newValue
            }
        }
        get {
            if index == 0 {
                return x
            } else if index == 1 {
                return y
            }
            return 0
        }
    }
}
// 使用时，可以用数组下标的方式赋值取值
var p = Point()
p[0] = 11.1
p[1] = 22.2
print(p.x) 
```
>`subscript`中定义的返回值类型决定了,`get`方法的返回值类型,`set`方法中newValue的类型
。并且`subscript`可以接受多个参数，并且类型任意

使用下标时的一些注意事项:
```markdown
1. `subscript`可以没有set方法，但必须要有get方法
2. 如果只有get方法,可以省略get
3. 可以设置参数标签，比如`subscript(index i: Int) -> Double`
4. 下标可以是类型方法,比如`static subscript(v1: Int, v2: Int) -> Int`
```

>  结构体属于值类型,如果下标返回的参数是结构体,下标必须包含set方法。

接收多个参数的下标格式:
```swift
class Grid {
    var data = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ]
    subscript(row: Int, column: Int) -> Int {
        set {
            guard row >= 0 && row < 3 && column >= 0 && column < 3 else {
                return
            }
            data[row][column] = newValue
        }
        get {
            guard row >= 0 && row < 3 && column >= 0 && column < 3 else {
                return 0
            }
            return data[row][column]
        }
    }
}

var grid = Grid()
grid[0, 1] = 77
grid[2, 0] = 99
print(grid.data)
```