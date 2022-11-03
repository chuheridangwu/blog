# carthage
现在很多第三方使用carthage进行管理，相对cocoapods来说更加轻量级，它会先将第三方打包成静态库，添加到项目中进行管理，不好的地方在于**不能修改第三方的源码**

## carthage安装
1. 安装 `brew install carthage`
2. 项目中创建`Cartfile`文件,liunx命令`touch Cartfile`
3. 编辑Cartfile文件，添加第三方对应的下载地址。例如`github "SVProgressHUD/SVProgressHUD" ~> 1.0`。
4. 下载对应文件，打包成静态库 `carthage update --platform iOS`
5. 在项目下的`Carthage -> Build -> xxx.xcframework`会看到对应的静态库，直接拖到`target -> General -> Frameworks,Libraries, and Embeddeb Content`中，可以直接在项目中引用

## Cartfile文件格式
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




## Swift Package Manager
Xcode中使用Swift Package有两种方式:
1. Xcode 工程中选中`当前 Project 名称` -> `选择 Swift Packages` -> `点击 + 图标添加`
2. 在 Xcode 中，点击 `File（文件）`>  `Add Package`（添加软件包依赖项）,在出现的对话框中，输入存储库网址,比如 `https://github.com/facebook/facebook-ios-sdk`


选择好要依赖的 Package 后。我们可以指定 Package 的版本号范围，规则如下，与 CocoaPods 类似：
* `Up to Next Major`: 当前指定的版本号到下一个大版本号之间的最新版本，例如 2.0.0 ~ 3.0.0（不包含 3.0.0）
* `Up to Next Minor`: 当前指定的版本号到下一个次版本号之间的最新版本，例如 2.0.0 ~ 2.1.0（不包含 2.1.0）
* `Range`: 指定的两个版本号之间的最新版本，例如 2.1.0 ~ 2.7.2（不包含 2.7.2）
* `Exact`: 指定使用某一具体的版本号



## 参考文档
* [Cartahge 更新报错](https://blog.csdn.net/iOS_MingXing/article/details/118526112)* [Carthage的安装和使用](https://www.jianshu.com/p/a734be794019)

* [在 Xcode 中使用 Swift Package](https://www.jianshu.com/p/99aa983e3d89)
* [如何使用Swift Package Manager](https://www.jianshu.com/p/d75c1752955a)