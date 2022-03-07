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





## 第三方库



第三方 | 作用
------- | -------
[Alamofire](https://github.com/Alamofire/Alamofire) | 网络请求,使用Swift开发的网络请求库,其开发团队是AFNetworking的原团队。
[Moya](https://github.com/Moya/Moya) | 网络请求,基于Alamofire的更高层网络请求封装的抽象层。
[Reachability.swift](https://github.com/ashleymills/Reachability.swift) | 检测当前网络连接状况。
[HandyJSON](https://github.com/alibaba/HandyJSON) | 数据解析,阿里出的能够做到JSON转Model一步到位，而且使用起来，非常简洁方便。
[KakaJSON](https://github.com/kakaopensource/KakaJSON) | 数据解析
[JSONConverter](https://github.com/vvkeep/JSONConverter) | 模型类生成工具,类似AndroidStudio中的插件，将json放进去生成类对象
[SnapKit](https://github.com/SnapKit/SnapKit)  | 自动布局框架，类似于Masonry。（推荐）
[SwiftyUserDefaults](https://github.com/sunshinejr/SwiftyUserDefaults) | 对NSUserDefaults的封装，让NSUserDefaults使用更简单。
[KeychainAccess](https://github.com/kishikawakatsumi/KeychainAccess) | 使用Keychain非常方便。

[SwiftString]() 关于Swift中字符串处理的扩展，有between(left, right)、camelize()、capitalize()、count(string)、decodeHTML()、contains(substring)等。
[ExSwift]() 包含一组标准类型和类的Swift扩展。

Refresh刷新

DGElasticPullToRefresh：有弹性效果的下拉刷新控件。

ESPullToRefresh：同OC语言的MJRefresh的下拉刷新和上拉加载。

加载指示、HUD

NVActivityIndicatorView：很多漂亮的加载指示器。

FillableLoaders：自定义的进度加载器，有waves、plain、spike、rounded等效果。

图表、绘画

Charts：非常好的图表框架，类似于MPAndroidChart。

PNChart-Swift：周凯文写的PNChart的swift版。

加密算法

CryptoSwift：使用非常方便的加密算法库。

链式编程

RxSwift：函数响应式编程框架，是ReactiveX的swift版本，可以简化异步操作和事件/数据流。

Dollar：无需扩展任何内置对象就为Swift语言提供有效的函数式编程辅助方法,类似于Lo-Dash或JavaScript中的Underscore。

社会化分享

MonkeyKing：社会化分享框架，支持分享text、url、image、audio、file到WeChat、QQ、Alipay、Weibo。

UIKit

Chatto：轻量级构建聊天应用的框架。

Koloda：卡片视图，而且滑动视图有滑动卡片一样的动画效果。

ImagePicker：图片选择器。

MaterialKit：关于Material design做的一系列UI组件。

Material：集Animation和UI与一身，还有Icon、Color等元素，使用这个库就可以打造一个漂亮的UI界面并具有优雅的动画效果。

引导页、新手教程

IFTTT/RazzleDazzle：集成引导页，具有不错的动画效果。

Instructions：应用于操作指南、新手教程。

Tab Bar

Animated Tab Bar：Ramotion出品,给tabbar items各单元添加动画效果。

Adaptive Tab Bar：同样的Ramotion出品，提供适合的Tab Bar。

Table View

Eureka：通过详细的映射，创建动态的tableView forms。

folding-cell：折叠的cell效果，动画很nice。

Alert、Sheet

SCLAlertView-Swift：不错的一款alertView。

SweetAlert-iOS：alert。

Button

DOFavoriteButton：有动画效果的button，适用于收藏、喜欢、点赞等。

hamburger-button：hamburger button，动画过渡不错。

Switch

paper-switch：Ramotion出品，turned on覆盖父视图的动画效果。

Label

LTMorphingLabel：拥有很多种特性的label。

ActiveLabel.swift：支持Hashtags、Mentions、Links响应事件处理。

TextField

TextFieldEffects：具有非常多、非常nice的输入框视图。

PhoneNumberKit：专门针对电话号码格式做的一个输入框，很赞。

SkyFloatingLabelTextField：类似于OC的JVFloatLabeledTextField，编辑就会出现浮动的提示label。

FloatLabelFields：类似于SkyFloatingLabelTextField。

TextView

NextGrowingTextView：取自于HPGrowingTextView,文本输入视图，对于消息编辑非常有用。

Color

Hue：集成color公用的库，使用的是hex颜色值。

Animation动画

Spring：MengTo写的动画框架，他的书《Design+Code》。

EasyAnimation：主要应用于UIView.animateWithDuration(_:, animations:...)。

IBAnimatable：主要使用于Interface Builder,不需要一行代码就可打造拥有炫酷动画效果的UI界面。

Advance：可应用于 iOS、 tvOS、 and OS X的动画框架。

PeekPop：使用3D touch 被引用的两个动画特性peek、pop。

Transition

StarWars.iOS：很炫酷的转场动画效果，视图碎片化掉落。

其他动画

NumberMorphView：label数字变形过渡动画，用于金额数字变动或者时间上面会非常nice！

FillableLoaders：自定义的进度加载动画。

AutoLayout



Cartography：自动布局DSL。

Neon：一款关于UI自动布局的框架。

Stevia：自动布局。

TZStackView:UISatckView的代替品，支持iOS7+。

Image

GPUImage2：GPUImage的Swift版，GPU加速image和video的处理。

图片加载、缓存

Kingfisher：喵神王巍写的一款关于图片下载、缓存的框架，灵感取自于SDWebImage。

HanekeSwift：轻量带缓存高性能图片加载组件。

Gif

Gifu：加载gif的框架，表现良好。

JWAnimatedImage：加载gif和apng的引擎，低内存和cpu消耗。

特殊效果

Filterpedia：给图片加滤镜效果，有很多种滤镜。

Toucan：图片处理，支持重设尺寸、裁剪、风格化等

Menu

FlowingMenu：很有意思的一个menu,具有平滑的弹簧效果，且手势拖动动画特别有趣。

ENSwiftSideMenu：手势侧滑menu。

CircleMenu：简单、优雅的一款circle menu,有不错的动画效果。

Page Menu

PageMenu：滑动出现不同分页的一个pagemenu，用于不同状态分页效果上是很好的选择。

XLPagerTabStrip：功能同上，类似于android的PageTabStrip。

作者：追梦_1c31
链接：https://www.jianshu.com/p/e95f0cd77f94
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。