# Swift
文档内容主要是Swift的基础语法和常用的第三方及使用方法，包含常用的API。对于位掩码，Swift 给出的方案是：选项集合 `OptionSet`
```markdown
* objc是 `UIRectCornerTopLeft | UIRectCornerTopRight`
* swift是 `[.topLeft,.topRight]`
```

### Swift关键字
```markdown
## @objc  在方法前进行修改,被@objc修改过的Swift中的方法可以在OC中调用
## inout  输入参数，可以在函数内部修改外部实参的值
## ...  可变参数，在参数类型后面加上...表示这是一个可变参数
## @autoclosure 自动闭包
## typealias  给当前类型起别名   `typealias Demo = Int`
## defer：用来定义以任何方式（抛错误、return等）离开代码块前必须要执行的代码
## where 添加过滤条件
## guard 条件不成立时执行大括号的语句，大括号内必须包含return 或者break
## lazy  定义延迟存储属性
## willSet  属性观察器，var定义的属性值即将改变,会传递新值，默认叫newValue
## didSet  属性观察器，var定义的属性值即已经改变,会传递旧值，默认叫oldValue
## set  计算属性set方法
## get  计算属性get方法，如果计算属性只有get没有set属于只读计算属性
## mutating   允许结构体和枚举在实例方法中修改成员属性
## @discardableResult  可以消除：函数调用后返回值未被使用的警告⚠
## subscript    可以给任意类型（枚举、结构体、类）增加下标功能
## override     重写父类方法
## final    被final修饰的类、方法、属性、下标禁止被继承和重写
## convenience      便捷初始化器
## required  修饰指定初始化器，表明其所有子类都必须实现该初始化器（通过继承或者重写实现）
## deinit   反初始化器，类似于C++的析构函数、OC中的dealloc方法
## AnyObject  所有类都隐式遵守的协议,表示类  // print(AnyObject.self) // Prints: AnyObject
## AnyClass   所有类的类型，比如Int的类型是Int.type  // print(AnyClass.self) // Prints: AnyObject.Type
## Any  可以表示任何类型的实例，包括函数类型、结构体、类
## any 
## self  当前实例对象
## Self  当前类型，一般作为返回值类型
## @escaping  表明当前闭包是一个逃逸闭包(闭包脱离了当前函数的作用范围到外部去调用就是逃逸闭包)
## @_silgen_name 解决Swift和C语言方法冲突，对C语言函数重命名
```

#### 推荐网站
* [OC代码转Swift](https://swiftify.com/converter/code/) 只能转部分代码
* [SwiftTips](https://swifter.tips/) 王巍的100个swift示例，资料有点老了
* [swift关键字含义](https://www.jianshu.com/p/8ba6d1513141)
* [swift博客信息](https://www.avanderlee.com/category/swift/)