# 初始化
类、结构体、枚举都可以定义初始化器。类有2种初始化器：`指定初始化器（designated initializer）`、`便捷初始化器（convenience initializer）`
```swift
// 指定初始化器
init(parameters) {
    statements
}
// 便捷初始化器
convenience init(parameters) {
    statements
}
```
## 指定初始化器
每个类至少有一个指定初始化器。指定初始化器是类的主要初始化器。默认初始化器总是类的指定初始化器，类偏向于少量指定初始化器，一个类通常只有一个指定初始化器。
```swift
class Size{
    var width: Int
    var height: Int
    // 指定初始化器(主初始化器)
    init(width: Int,height: Int){
        self.width = width
        self.height = height
    }
    convenience init(width: Int) {
        self.init(width:width, height:0)
    }
}
```

初始化器的相互调用规则:
```markdown
* 指定初始化器 必须从它的直系父类调用指定初始化器
* 便捷初始化器 必须从相同的类里调用另一个初始化器
* 便捷初始化器 最终必须调用一个指定初始化器
```
可以参考下面的代码：
```swift
class Person{
    var age: Int
    init(age: Int) {
        self.age = age
    }
    convenience init(){
        self.init(age: 0)
    }
}

class Student: Person{
    var score: Int
    init(age: Int,score: Int) {
        self.score = score // 调用父类指定初始化器之前，自己的全部属性需要初始化完成
        super.init(age: age)
    }
}
```
![](./imgs/swift/ios_swift_30.png ":size=500")

## 类的初始化过程
Swift在编码安全方面是煞费苦心，为了保证初始化过程的安全，设定了`两段式初始化`、 `安全检查`两个阶段。

两段式初始化:
```markdown
* 第1阶段：初始化所有存储属性
    * ① 外层调用指定\便捷初始化器
    * ② 分配内存给实例，但未初始化
    * ③ 指定初始化器确保当前类定义的存储属性都初始化
    * ④ 指定初始化器调用父类的初始化器，不断向上调用，形成初始化器链
* 第2阶段：设置新的存储属性值
    * ① 从顶部初始化器往下，链中的每一个指定初始化器都有机会进一步定制实例
    * ② 初始化器现在能够使用self（访问、修改它的属性，调用它的实例方法等等）
    * ③ 最终，链中任何便捷初始化器都有机会定制实例以及使用self
``` 
![](./imgs/swift/ios_swift_31.png)

安全检查:
```markdown
* 指定初始化器必须保证在调用父类初始化器之前，其所在类定义的所有存储属性都要初始化完成
* 指定初始化器必须先调用父类初始化器，然后才能为继承的属性设置新值
* 便捷初始化器必须先调用同类中的其它初始化器，然后再为任意属性设置新值
* 初始化器在第1阶段初始化完成之前，不能调用任何实例方法、不能读取任何实例属性的值，也不能引用self
* 直到第1阶段结束，实例才算完全合法
```

## 重写初始化器
当重写父类的指定初始化器时，必须加上`override`（即使子类的实现是便捷初始化器）。

如果子类写了一个匹配父类便捷初始化器的初始化器，不用加上override,因为父类的便捷初始化器永远不会通过子类直接调用，因此，严格来说，**子类无法重写父类的便捷初始化器。**

```swift
class Person{
    var age:Int
    init(age: Int) {
        self.age = age
    }
    convenience init(){
        self.init(age: 0)
    }
}
class Student: Person{
    var score:Int
    init(){ // 这种情况不属于重写
        self.score = 0
        super.init(age: 0)
    }
}
```
如果子类没有自定义指定初始化器，会有以下几种情况:
```markdown
① 如果子类没有自定义任何指定初始化器，它会自动继承父类所有的指定初始化器，一旦子类指定了初始化器，就不会继承父类的初始化器
② 如果子类提供了父类所有指定初始化器的实现（要么通过方式①继承，要么重写）,子类自动继承所有的父类便捷初始化器
③ 就算子类添加了更多的便捷初始化器，这些规则仍然适用
④ 子类以便捷初始化器的形式重写父类的指定初始化器，也可以作为满足规则②的一部分
```
## required
用`required`修饰指定初始化器，表明其所有子类都必须实现该初始化器（通过继承或者重写实现）。如果子类重写了`required`初始化器，也必须加上`required`，不用加`override`。
```swift
class Person {
    required init() { }
    init(age: Int) { }
}
class Student : Person {
    required init() {
        super.init()
    }
}
```

## 属性观察器
父类的属性在它自己的初始化器中赋值不会触发属性观察器，但在子类的初始化器中赋值会触发属性观察器
```swift
class Person {
    var age: Int {
        willSet {
            print("willSet", newValue)
        }
        didSet {
            print("didSet", oldValue, age)
        }
    }
    init() {
        self.age = 0
    }
}
class Student : Person {
    override init() {
        super.init()
        self.age = 1
    }
}

// willSet 1
// didSet 0 1
var stu = Student()
```

## 可失败初始化器
类、结构体、枚举都可以使用`init?`定义可失败初始化器,比如系统中常用的UIImage、Int等都有可失败初始化器。
```swift
class Person {
    var name: String
    init?(name: String) {
        if name.isEmpty {
            return nil
        }
        self.name = name
    }
}
```
可失败初始化器的一些规则：
```markdown
* 不允许同时定义参数标签、参数个数、参数类型相同的可失败初始化器 和 非可失败初始化器
* 可以用`init!`定义隐式解包的可失败初始化器
* 可失败初始化器可以调用非可失败初始化器，非可失败初始化器调用可失败初始化器需要进行解包
* 如果初始化器调用一个可失败初始化器导致初始化失败，那么整个初始化过程都失败，并且之后的代码都停止执行
* 可以用一个非可失败初始化器重写一个可失败初始化器，但反过来是不行的
```

## 反初始化器（deinit）
`deinit`叫做反初始化器，类似于C++的析构函数、OC中的`dealloc`方法。当类的实例对象被释放内存时，就会调用实例对象的deinit方法。
```swift
class Person {
    deinit {
        print("Person对象销毁了")
    }
}

```
deinit函数的规则:
```markdown
1. deinit不接受任何参数，不能写小括号，不能自行调用
2. 父类的deinit能被子类继承
3. 子类的deinit实现执行完毕后会调用父类的deinit
```

## 可选链（Optional Chaining）
可选链（Optional Chaining）是一种可以请求和调用属性、方法和子脚本的过程，用于请求或调用的目标可能为nil。多次请求或调用可以被链接成一个链，如果任意一个节点为nil将导致整条链失效。
```swift
class Car { var price = 0 }
class Dog { var weight = 0 }
class Person {
    var name: String = ""
    var dog: Dog = Dog()
    var car: Car? = Car()
    func age() -> Int { 18 }
    func eat() { print("Person eat") }
    subscript(index: Int) -> Int { index }
}
var person: Person? = Person()
var age1 = person!.age() // Int
var age2 = person?.age() // Int?
var name = person?.name // String?
var index = person?[6] // Int?

func getName() -> String { "jack" }
// 如果person是nil，不会调用getName()
person?.name = getName()

var price = person?.car?.price // Int?  多个?可以链接在一起  如果链中任何一个节点是nil，那么整个链就会调用失败
```
可选链的注意事项：
```markdown
1. 如果可选项为nil，调用方法、下标、属性失败，结果为nil
2. 如果可选项不为nil，调用方法、下标、属性成功，结果会被包装成可选项
3. 如果结果本来就是可选项，不会进行再次包装
```

如果我们想知道一个可选对象是否调用了方法，可以使用下面的方式。一个没有标明返回值的方法，默认是返回`()`元组，我们只需要判断调用方法时有没有返回元组就行了:
```swift
if let _ = person?.eat() { // ()?
    print("eat调用成功")
} else {
    print("eat调用失败")
}
```
可选链在项目中关于字典、可选类型的一些用法：
```swift
// 字典根据key取值时默认是可选类型
var scores = ["Jack": [86, 82, 84], "Rose": [79, 94, 81]]
scores["Jack"]?[0] = 100
scores["Rose"]?[2] += 10

// 设置可选类型
var num1: Int? = 5
num1? = 10 // Optional(10)

//字典字符串为key，函数为value
var dict: [String : (Int, Int) -> Int] = [
    "sum" : (+),
    "difference" : (-)
]
var result = dict["sum"]?(10, 20) // Optional(30), Int?
```