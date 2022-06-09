# Swift 混编
目前项目是使用OC编写的，外面的公司基本上都是Swift进行编写的，开始搞混编吧，要不越混越回去了。妈的，应用层的语言一变在再变。有意思吗？

## Swift 和 OC 混编
Swift和OC代码进行混编，需要注意的地方有:
```markdown
1. Swift 内访问 OC 的类，需要添加`TargetName-Bridging-Header.h`文件，在我们添加混编文件时系统默认会创提示建,如果没有提示需要手动创建，在`Build Settings → Swift Compiler - General → Objective-C Bridging Header`中设置对应的路径,**需要在Swift中访问的OC类将.h添加到当前文件中**
2. OC 访问 Swift 的类，系统会自动生成`TargetName-Swift.h`文件，在Objc类中导入该文件即可访问Swift中暴露的类和方法。在`Build Settings -> Objective-C Generated interface Header Name`中可以看到文件名。
```

**使用第三方**
如果是混编项目使用Swift第三方时，需要在`Podfile`文件中加上`use_frameworks!`。这是因为静态库的生成方式不同。

```markdown
* 静态库：（静态链接库）（.a）在编译时会将库copy一份到目标程序中，编译完成之后，目标程序不依赖外部的库，也可以运行。 缺点是会使应用程序变大
* 动态库：（.dylib）编译时只存储了指向动态库的引用。
       * 可以多个程序指向这个库，在运行时才加载，不会使体积变大，
       * 但是运行时加载会损耗部分性能，并且依赖外部的环境，如果库不存在或者版本不正确则无法运行
* Framework：实际上是一种打包方式，将库的二进制文件，头文件和有关的资源文件打包到一起，方便管理和分发。
```
> 对于是否使用`Framework`，CocoaPods 通过`use_frameworks`来控制.

如果不使用use_frameworks!cocoapods会生成相应的 .a文件（静态链接库),`Link Binary With Libraries: libPods-**.a `包含了其他用pod导入有第三库的.a文件

如果使用了`use_frameworks!`，cocoapods会生成对应的frameworks文件（包含了头文件，二进制文件，资源文件等等）,`Link Binary With Libraries：Pods_xxx.framework`包含了其它用pod导入的第三方框架的.framework文件

```markdown
1. 纯oc项目中 通过pod导入纯oc项目, 一般都不使用frameworks
2. swift 项目中通过pod导入swift项目，必须要使用use_frameworks！，在需要使用的到地方 `import AFNetworking`
3. swift 项目中通过pod导入OC项目, 使用`use_frameworks`，在桥接文件里加上`#import "AFNetworking/AFNetworking.h"`, 不使用frameworks，桥接文件加上`#import "AFNetworking.h"`
```


## Swift 和 C语言 混编

## Swift 和 C++ 混编

## Swift混编多语言切换



* [Swift 教程中文版](https://swiftgg.gitbook.io/swift/swift-jiao-cheng/20_extensions)
* [从预编译的角度理解Swift与Objective-C及混编机制](https://tech.meituan.com/2021/02/25/swift-objective-c.html)

* [Swift扩展1](https://github.com/JoanKing/JKSwiftExtension)
* [Swift扩展2](https://github.com/JoanKing/JKSwiftExtension)


Object-C 代码转 swift ，使用[SWIFTIFY](https://swiftify.com/converter/code/),苹果商店搜索  Swiftify for Xcode


swift中的懒加载
```swift
lazy var containerView: UIView = {
        let containerView = UIView()
        view.addSubview(containerView)
        containerView.snp.makeConstraints { (make) in
            make.height.equalTo(400)
            make.width.equalTo(400)
            make.centerY.equalTo(view)
            make.left.equalTo(view.snp_rightMargin)
        }
        containerView.backgroundColor = .gray
        return containerView
    }()
```
swift中的安全区域
```swift
joinView.snp.makeConstraints { make in
    make.left.right.equalToSuperview()
    make.height.equalTo(64)
    make.bottom.equalTo(safeAreaLayoutGuide.snp.bottom)
}
```

对于位掩码，Swift 给出的方案是：选项集合 `OptionSet`
```markdown
* objc是 `UIRectCornerTopLeft | UIRectCornerTopRight`
* swift是 `[.topLeft,.topRight]`
```

PCH 文件中添加了定义结构体，在swift中调用对应的类时，会提示`expected a type`,找不到定义的结构体


* [技术分享-swift防御编程](https://blog.csdn.net/yong_19930826/article/details/122493668?spm=1001.2014.3001.5502)



swift中的一些关键字作用

## @objc
## inout  输入参数，可以在函数内部修改外部实参的值
## ...  可变参数，在参数类型后面加上...表示这是一个可变参数
## @autoclosure 自动闭包
## typealias  给当前类型起别名
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

* [swift关键字含义](https://www.jianshu.com/p/8ba6d1513141)
* [swift博客信息](https://www.avanderlee.com/category/swift/)

##  carthage 使用
现在很多第三方使用carthage进行管理，相对cocoapods来说更加轻量级，它会先将第三方打包成静态库，添加到项目中进行管理，不好的就是不能修改第三方的源码
1. 安装 `brew install carthage`
2. 项目中创建`Cartfile`文件,liunx命令`touch Cartfile`
3. 编辑Cartfile文件，添加第三方对应的下载地址。例如`github "SVProgressHUD/SVProgressHUD" ~> 1.0`。
4. 下载对应文件，打包成静态库 `carthage update --platform iOS`
5. 在项目下的`Carthage -> Build -> xxx.xcframework`会看到对应的静态库，直接拖到`target -> General -> Frameworks,Libraries, and Embeddeb Content`中，可以直接在项目中引用

#### Cartfile文件格式
Carthage支持两种类型的源，一个是github，另一个是git。
```markdown
* `github` 表示依赖源，告诉Carthage去哪里下载文件。依赖源之后跟上要下载的库，格式为Username/ProjectName
* `git` 关键字后面跟的是资料库的地址，可以是远程的URL地址。例如`git://xxx`, `http://xxx`, `ssh://xxx`，或者是本地资料库地址。
```
告诉Carthage使用哪个版本，这是可选的，不写默认使用最新版本
```markdown
* `== 1.0` 表示使用1.0版本
* `>= 1.0` 表示使用1.0或更高的版本
* `~> 1.0` 表示使用版本1.0以上但是低于2.0的最新版本，如1.2，1.6
* `branch名称 / tag名称 / commit名称`，意思是使用特定的分支/标签/提交，比如可以是分支名master，也可以是提交5c8a74a。
```

在使用`carthage update --platform iOS`时如果遇到报错arm64架构错误`Building universal frameworks with common architectures is not possible`。

使用`carthage update --platform iOS --use-xcframeworks`指令生成对应的静态库

* [Cartahge 更新报错](https://blog.csdn.net/iOS_MingXing/article/details/118526112)* [Carthage的安装和使用](https://www.jianshu.com/p/a734be794019)