# iOS三方库
如果是混编项目使用Swift第三方时，需要在`Podfile`文件中加上`use_frameworks!`。这是因为静态库的生成方式不同。

```markdown
* 静态库：（静态链接库）（.a）在编译时会将库copy一份到目标程序中，编译完成之后，目标程序不依赖外部的库，也可以运行。 缺点是会使应用程序变大
* 动态库：（.dylib）编译时只存储了指向动态库的引用。
       * 可以多个程序指向这个库，在运行时才加载，不会使体积变大，
       * 但是运行时加载会损耗部分性能，并且依赖外部的环境，如果库不存在或者版本不正确则无法运行
* Framework：实际上是一种打包方式，将库的二进制文件，头文件和有关的资源文件打包到一起，方便管理和分发。
```
> 对于是否使用`Framework`，CocoaPods 通过`use_frameworks`来控制.

如果不使用`use_frameworks!`,cocoapods会生成相应的 .a文件（静态链接库),`Link Binary With Libraries: libPods-**.a `包含了其他用pod导入有第三库的.a文件

如果使用了`use_frameworks!`，cocoapods会生成对应的frameworks文件（包含了头文件，二进制文件，资源文件等等）,`Link Binary With Libraries：Pods_xxx.framework`包含了其它用pod导入的第三方框架的.framework文件
```markdown
1. 纯oc项目中 通过pod导入纯oc项目, 一般都不使用frameworks
2. swift 项目中通过pod导入swift项目，必须要使用use_frameworks！，在需要使用的到地方 `import AFNetworking`
3. swift 项目中通过pod导入OC项目, 使用`use_frameworks`，在桥接文件里加上`#import "AFNetworking/AFNetworking.h"`, 不使用frameworks，桥接文件加上`#import "AFNetworking.h"`
```

## SnapKit
SnapKit 和 Masonry 一样,是布局中常用的三方库，主要记录一些常用方法。
```swift
.equalTo // 等于
.lessThanOrEqualTo // 小于等于
.greaterThanOrEqualTo //大于等于

// 跟父类大小一样
imageView.snp.makeConstraints { make in
    make.edges.equalToSuperview()
}
```

#### 约束关系
方法 | 含义
------- | -------
`equalTo()` | 设置属性等于某个数值
`greaterThanOrEqualTo()` | 设置属性大于或等于某个数值
`lessThanOrEqualTo()` 设置属性小于或等于某个数值
`multipliedBy()` | 设置属性乘以因子后的值


## Moya

#### Moya图片上传、文档上传、下载文档
```swift
// 第一步
enum InterfaceAPI {
    // 获取想要存储的文件路径
    var localLocation: URL {
        switch self {
        case .download(_, let fileName):
            let filePath = FileManager.default.temporaryDirectory
            return filePath.appendingPathComponent(fileName)
        default:
            return URL(string: "")!
        }
    }
    // 封装下下载路径
    var downloadDestination: DownloadDestination {
        // `createIntermediateDirectories` will create directories in file path
        return { _, _ in return (self.localLocation, [.removePreviousFile, .createIntermediateDirectories]) }
    }

    case uploadImg(files: [UIImage], name: String)
    case documentationTranslation(files: [URL], name: String, transType: String)
    case download(filePath: String, fileName: String)
}
```
第二步
```swift
extension InterfaceAPI: TargetType {
    var baseURL: URL {
        switch self {
        case let .download(filePath, _):
            return URL(string: filePath)!
        default:
            return URL(string: InterfaceUrl)!
        }
    }

    var method: Moya.Method {
        switch self {
        case .download:
            return .get
        default:
            return .post
        }
    }
    var path: String {
        switch self {
        case .uploadImg
            return "/assist/UploadImg"
        case .documentationTranslation:
            return "/translate/DocumentationTranslation"
        case .download:
            return ""
        }
    }
}
```
第三部
```swift
var task: Task {
    // 公共参数
    var params: [String: Any] = [:]
    // 收集参数
    switch self {
    case let .uploadImg(files, name):
        var formDatas = [MultipartFormData]()
        for image in files {
            let imageData = image.pngData()
            let fileName = "iOS\(Date().millisecondsSince1970).png"
            let formData = MultipartFormData(provider: .data(imageData!), name: name, fileName: fileName, mimeType: "image/png")
                formDatas.append(formData)
            }
        return .uploadMultipart(formDatas)
    case let .documentationTranslation(fileUrls, name, transType):
        var formDatas = [MultipartFormData]()
        for fileUrl in fileUrls {
            do {
                let data = try Data(contentsOf: fileUrl, options: .alwaysMapped)
                let fileName = fileUrl.absoluteString.components(separatedBy: "/").last?.toString
                let formData = MultipartFormData(provider: .data(data), name: name, fileName: fileName, mimeType: "multipart/form-data")
                    
                formDatas.append(formData)
            }
            catch{
                    
            }
        }
        params["transType"] = transType
        return .uploadCompositeMultipart(formDatas, urlParameters: params)
    case .download:
        return .downloadDestination(downloadDestination)
}
```

## HandJSON
模型需要继承自`HandJSON`,结构体和类都可以
```swift
class Info: HandyJSON {
    var age: Int = 0
    required init() {}
}

class User: HandyJSON{
    var name: String?
    var infos: [Info]?  // 数组
    var first: Info?  // 嵌套模型
    
    required init() {}
    
    //方法映射,把解析到的json数据,映射给其他的变量,
    func mapping(mapper: HelpingMapper) {
        mapper <<< self.first <-- "info"  //把info 转换为模型中的 first
    }
}
```
数据解析成模型
```swift
let jsonString = """
    {
        "name":"user111",
        "infos":[ {"age":"18"},
                { "age":"14"}
    ],
        "info":{
            "age":"19"
        }
    }
    """

// 这里是两个重名方法，可以传入json字符串和字典
let u = User.deserialize(from: jsonString)
let u1 = JSONDeserializer<User>.deserializeFrom(json: jsonString) // 这样也可以转

// 模型转换成字典，属性为nil的不显示，映射的键不会改成属性名
u.toJSON()

// 模型转换成字符串，属性为nil的不显示，映射的键不会改成属性名
u.toJSONString()

// 从json下一个子节点进行解析
let dict = u?.toJSON()
let i = Info.deserialize(from: dict, designatedPath: "info")

// 解析数组
let jsonAryString: String? = "[{\"age\":\"20\"}, {\"age\":\"21\"},{\"age\":\"22\"}]"
let infos = [Info].deserialize(from: jsonAryString)
```
支持枚举类型
```swift
enum AnimalType: String, HandyJSONEnum {
    case Cat = "cat"
    case Dog = "dog"
    case Bird = "bird"
}

struct Animal: HandyJSON {
    var name: String?
    var type: AnimalType?
}

let jsonString = "{\"type\":\"cat\",\"name\":\"Tom\"}"
if let animal = Animal.deserialize(from: jsonString) {
    print(animal.type?.rawValue)
}
```

## 参考网址
* [Swift 教程中文版](https://swiftgg.gitbook.io/swift/swift-jiao-cheng/20_extensions)
* [从预编译的角度理解Swift与Objective-C及混编机制](https://tech.meituan.com/2021/02/25/swift-objective-c.html)
* [Swift扩展1](https://github.com/JoanKing/JKSwiftExtension)
* [技术分享-swift防御编程](https://blog.csdn.net/yong_19930826/article/details/122493668?spm=1001.2014.3001.5502)
* [Swift加密解密](https://atreey.github.io/2018/01/08/Swift%E5%8A%A0%E5%AF%86%E7%9B%B8%E5%85%B3/)
* [HandyJSON文档](https://github.com/alibaba/HandyJSON/blob/master/README_cn.md)


## Swift第三方库
第三方名称 | 功能
------- | -------
[Alamofire](https://github.com/Alamofire/Alamofire) | 网络请求,使用Swift开发的网络请求库,其开发团队是AFNetworking的原团队。
[Moya](https://github.com/Moya/Moya) | 网络请求,基于Alamofire的更高层网络请求封装的抽象层。
[Reachability.swift](https://github.com/ashleymills/Reachability.swift) | 检测当前网络连接状况。
[HaishinKit.swift](https://github.com/shogo4405/HaishinKit.swift) |  rtmp推流库
[LFLiveKit](https://github.com/LaiFengiOS/LFLiveKit) |  OC版本的rtmp推流库
[socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) |  Socket通信
[HandyJSON](https://github.com/alibaba/HandyJSON) | 数据解析,阿里出的能够做到JSON转Model一步到位，而且使用起来，非常简洁方便。
[KakaJSON](https://github.com/kakaopensource/KakaJSON) | 数据解析
[JSONConverter](https://github.com/vvkeep/JSONConverter) | 模型类生成工具,类似AndroidStudio中的插件，将json放进去生成类对象
[SnapKit](https://github.com/SnapKit/SnapKit)  | 自动布局框架，类似于Masonry。（推荐）
[SwiftyUserDefaults](https://github.com/sunshinejr/SwiftyUserDefaults) | 对NSUserDefaults的封装，让NSUserDefaults使用更简单。
[KeychainAccess](https://github.com/kishikawakatsumi/KeychainAccess) | 使用Keychain非常方便。
[GTMRefresh](https://github.com/GTMYang/GTMRefresh) | swift下拉刷新版本
[NVActivityIndicatorView](https://github.com/ninjaprox/NVActivityIndicatorView) | 很多漂亮的加载指示器。
[Charts](https://github.com/danielgindi/Charts) | 非常好的图表框架
[CryptoSwift](https://github.com/krzyzanowskim/CryptoSwift) | 加密算法,使用非常方便的加密算法库。
[RxSwift](https://github.com/ReactiveX/RxSwift) | 链式编程,函数响应式编程框架，是ReactiveX的swift版本，可以简化异步操作和事件/数据流。
[Dollar](https://github.com/ankurp/Dollar) | 链式编程,无需扩展任何内置对象就为Swift语言提供有效的函数式编程辅助方法,类似于Lo-Dash或JavaScript中的Underscore。
[MonkeyKing](https://github.com/nixzhu/MonkeyKing) | 社会化分享框架，支持分享text、url、image、audio、file到WeChat、QQ、Alipay、Weibo。
[Chatto](https://github.com/badoo/Chatto) | 轻量级构建聊天应用的框架。
[Koloda](https://github.com/Yalantis/Koloda) | 卡片视图，而且滑动视图有滑动卡片一样的动画效果。
[ImagePicker](https://github.com/hyperoslo/ImagePicker) | 图片选择器。
[Material](https://github.com/CosmicMind/Material) | 集Animation和UI与一身，还有Icon、Color等元素，使用这个库就可以打造一个漂亮的UI界面并具有优雅的动画效果。
[RazzleDazzle]([RazzleDazzle](https://github.com/IFTTT/RazzleDazzle)) | 集成引导页，具有不错的动画效果。
[Instructions](https://github.com/ephread/Instructions) | 应用于操作指南、新手教程。
[Animated Tab Bar](https://github.com/Ramotion/animated-tab-bar) | Ramotion出品,给tabbar items各单元添加动画效果。
[Eureka](https://github.com/xmartlabs/Eureka) | 通过详细的映射，创建动态的表单tableView forms。
[folding-cell](https://github.com/Ramotion/folding-cell) | 带有折叠的cell效果，动画很nice。
[SCLAlertView-Swift](https://github.com/vikmeup/SCLAlertView-Swift) | 不错的一款alertView。
[SweetAlert-iOS](https://github.com/codestergit/SweetAlert-iOS) | alert。
[DOFavoriteButton](https://github.com/okmr-d/DOFavoriteButton) | 有动画效果的button，适用于收藏、喜欢、点赞等。
[paper-switch](https://github.com/Ramotion/paper-switch) | Ramotion出品，turned on覆盖父视图的动画效果。
[LTMorphingLabel](https://github.com/lexrus/LTMorphingLabel) | 拥有很多种特性的label。
[ActiveLabel.swift](https://github.com/optonaut/ActiveLabel.swift) | 支持Hashtags、Mentions、Links响应事件处理。能支持富文本处理
[TextFieldEffects](https://github.com/raulriera/TextFieldEffects) | 具有非常多、非常nice的输入框视图。
[PhoneNumberKit](https://github.com/marmelroy/PhoneNumberKit) | 专门针对电话号码格式做的一个输入框，很赞。
[SkyFloatingLabelTextField](https://github.com/Skyscanner/SkyFloatingLabelTextField) | 类似于OC的JVFloatLabeledTextField，编辑就会出现浮动的提示label。
[JXSegmentedView](https://github.com/pujiaxin33/JXSegmentedView) | 分类滚动视图
[FloatLabelFields](https://github.com/FahimF/FloatLabelFields) | 类似于SkyFloatingLabelTextField。
[NextGrowingTextView](https://github.com/muukii/NextGrowingTextView) | 取自于HPGrowingTextView,文本输入视图，对于消息编辑非常有用。
[Hue](https://github.com/zenangst/Hue) | 集成color公用的库，使用的是hex颜色值。
[Spring](https://github.com/MengTo/Spring) | MengTo写的动画框架，他的书《Design+Code》。
[EasyAnimation](https://github.com/icanzilb/EasyAnimation) | 主要应用于UIView.animateWithDuration(_:, animations:...)。
[IBAnimatable](https://github.com/IBAnimatable/IBAnimatable) | 主要使用于Interface Builder,不需要一行代码就可打造拥有炫酷动画效果的UI界面。
[Advance](https://github.com/timdonnelly/Advance) | 可应用于 iOS、 tvOS、 and OS X的动画框架。
[StarWars.iOS](https://github.com/Yalantis/StarWars.iOS) | 很炫酷的转场动画效果，视图碎片化掉落。
[NumberMorphView](https://github.com/me-abhinav/NumberMorphView) | label数字变形过渡动画，用于金额数字变动或者时间上面会非常nice！
[FillableLoaders](https://github.com/polqf/FillableLoaders) | 自定义的进度加载动画。
[Cartography](https://github.com/robb/Cartography) | 自动布局DSL。
[TZStackView](https://github.com/tomvanzummeren/TZStackView) | UISatckView的代替品，支持iOS7+。
[GPUImage2](https://github.com/BradLarson/GPUImage2) | GPUImage的Swift版，GPU加速image和video的处理。
[Kingfisher](https://github.com/onevcat/Kingfisher) | 喵神王巍写的一款关于图片下载、缓存的框架，灵感取自于SDWebImage。可以加载Gift动画
[KingfisherWebP](https://github.com/Yeatse/KingfisherWebP) | swift版本加载webp图片
[SwiftSVG](https://github.com/mchoe/SwiftSVG) | svg格式的图片播放器,这种格式图片可跟应用交互
[HanekeSwift](https://github.com/Haneke/HanekeSwift) | 轻量带缓存高性能图片加载组件。
[Gifu](https://github.com/kaishin/Gifu) | 加载gif的框架，表现良好。
[JWAnimatedImage](https://github.com/ACFancy/JWAnimatedImage) | 加载gif和apng的引擎，低内存和cpu消耗。
[Filterpedia](https://github.com/FlexMonkey/Filterpedia) | 给图片加滤镜效果，有很多种滤镜。
[Toucan](https://github.com/gavinbunney/Toucan) | 图片处理，支持重设尺寸、裁剪、风格化等
[FlowingMenu](https://github.com/yannickl/FlowingMenu) | 很有意思的一个menu,具有平滑的弹簧效果，且手势拖动动画特别有趣。
[ENSwiftSideMenu](https://github.com/evnaz/ENSwiftSideMenu) | 手势侧滑menu。
[CircleMenu](https://github.com/hu55a1n1/Swift-CircleMenu) | 简单、优雅的一款圆角 menu,有不错的动画效果。
[PageMenu](https://github.com/PageMenu/PageMenu) | 滑动出现不同分页的一个pagemenu，用于不同状态分页效果上是很好的选择。
[XLPagerTabStrip](https://github.com/xmartlabs/XLPagerTabStrip) | 功能同上，类似于android的PageTabStrip。
[IQKeyboardManagerSwift](https://github.com/hackiftekhar/IQKeyboardManager) | 键盘弹出时视图上移
[SwifterSwift](https://github.com/SwifterSwift/SwifterSwift) | Swift类扩展
[Reusable](https://github.com/AliSoftware/Reusable) |  xib的扩展，快速创建cell和view
[ParallaxHeader](https://github.com/romansorochak/ParallaxHeader) | 滚动视图上面增加一个背景图
[PLPlayerKit](https://github.com/pili-engineering/PLPlayerKit) |  七牛拉流库SDK
[GYSide](https://github.com/yuan-gao/GYSide)  侧边栏


## OC第三方库
第三方名称 | 功能
------- | -------
[腾讯播放器](https://github.com/LiteAVSDK/Player_iOS) | 视频拉流,支持rtmp、flv、m3u8
[AlphaPlayer](https://github.com/bytedance/AlphaPlayer) | 字节出品,利用视频颜色叠加的方式播放大礼物效果，缺点，没有音效和只能左灰右彩
[JXCategoryView](https://github.com/pujiaxin33/JXCategoryView) | 分类滚动视图
[MBProgressHUD](https://github.com/jdg/MBProgressHUD) | 弹窗提示
[MJRefresh](https://github.com/CoderMJLee/MJRefresh) | mj刷新
[TZImagePickerController](https://github.com/banchichen/TZImagePickerController) | 一个支持多选、选原图和视频的图片选择器，同时有预览功能
[FDFullscreenPopGesture](https://github.com/forkingdog/FDFullscreenPopGesture) | 全局侧滑手势
[NinePatchKit](https://github.com/zxinsunshine/NinePatchKit) | iOS中使用.9图