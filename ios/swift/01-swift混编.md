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


## Swift中的第三方
第三方中的SnapKit简单用法
```

```


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