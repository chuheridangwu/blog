# Windows虚拟机安装MacOS系统
在Window在虚拟机安装MacOS系统，需要`VMware Workstation`虚拟机、`MacOS`的ISO镜像、`unlocker`解锁工具。VM虚拟机默认不能不支持 MacOS，unlocker 为VMware添加 macos 支持

## 安装下载
1. VM是17.0版本
2. Mac OS系统最少要装12.5以上版本[点击下载13.0](https://archive.org/download/macos-collection/Public%20Betas/macOS%2013%20%28Ventura%29/Ventura%2013.0%20v18.0.03.iso)
3. unlocker工具[点击下载](https://github.com/DrDonk/unlocker)

>2023年4月25日开始，要求开发者在提交应用到 App Store 时必须使用 Xcode 14.1 或更高版本的工具开发，如果想知道Xcode版本中需要的苹果系统,[点击查看参考网址](https://xcodereleases.com/?scope=release)

## 安装中的注意事项
1. 由于VM虚拟机默认不能不支持 MacOS系统的，下载安装VM之后，要完全从系统退出，点开任务管理器关掉所有VM相关的任务
2. unlocker 为VMware添加 macos 支持，以管理员身份运行unlocker,unlocker会对macos进行patch。以后升级了vmware也需要重新运行unlocker进行patch
3. 在VMware中新建虚拟机，选择ISO镜像，在分配处理器的内核数量时最少要分配4个，在分配处理器界面 开启VT(不开太卡)注意下面两个虚拟化选中的话可能会导致无限重启，不要选中，若你的macos虚拟机出现无限重启或者无法开机，可以尝试关闭虚拟化IOMMU。
4. 保存虚拟机设置后不要开机，修改`.vmx`配置文件：将`ethernet0.virtualDev` 修改成 `"vmxnet3" `否则无法上网，在安装过程中若是配置网络会直接直接崩溃。(这里我没遇到过)
5. 安装MacOS系统时，首先选择磁盘工具,将内置磁盘抹掉，格式选择为可扩展的。也就是顶部VM开头的磁盘
6. 右击计算机安装`VMwareTools`,可以拷贝物理电脑中的文件到虚拟机

>注意：在安装`Mac OS 13.0`及以上系统在安装过程中不断重启的时候，先不要管它，只要分配处理器的内核数量是4个就行。我第一次安装`macOS Ventura 13.5.2`系统时自动重启了好几次。

### VM中的快捷键
1. 在安装系统时通过`Ctrl + A`释放光标
2. 如果想把Windows上的文件拷贝到Mac中需要安装`VMware Tools`,安装路径右击VM我的计算机下的文件，选择安装`VMware Tools`
3. 使用克隆模式恢复好安装的MacOS系统，这样就不用每次都安装浪费时间了，如果想让其他用户创建此虚拟机中的克隆。`虚拟机` -> `右键设置` -> `选项` -> `高级` 下启用模版模式

## 安装Cocoapods
1. 安装Homebrew
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    如果报错使用
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh | sed 's#/Library/Developer/CommandLineTools#$(xcode-select -p)#')"
    ```
2. 安装rvm
    ```
    curl -L get.rvm.io | bash -s stable 

    source ~/.bashrc

    source ~/.bash_profile

    ```
3. 通过rvm来安装Ruby
    ```
    rvm install 3.0.0
    ```
    设置默认
    ```
    rvm use 3.0.0 --default
    ```
4. 安装cocoapods
    ```
    sudo gem install -n /usr/local/bin cocoapods
    ```

>解决 can't find gem cocoapods (>= 0.a) (Gem::GemNotFoundException)，卸载重装
```
sudo gem uninstall cocoapods
gem install cocoapods
```

一些常见命令
```c
// 安装最新版cocoapods
sudo gem install cocoapods --pre
// 移除本地master
sudo rm -fr ~/.cocoapods/repos/master
// 移除本地缓存
sudo rm -fr ~/Library/Caches/CocoaPods/
// 重新setup，如果很慢可使用问题1的解决方法（git clone）
pod setup --verbose
// 移除trunk
pod repo remove trunk
```

## 电脑上安装开发者证书之后一直无效
1. 下载Apple Worldwide Developer Relations 认证媒介中间证书，[双击安装](https://developer.apple.com/certificationauthority/AppleWWDRCA.cer),此时极有可能，安装后你的证书还是显示无效。因为那是个旧的WWDRCA证书，将于2023年2月7日到期。

2. 再下载新的WWDRCA证书，这个证书将于2030年2月20日到期。新证书将用于签署2021年1月28日后为苹果开发者项目颁发的新软件签名证书。下载安装：https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer

补充说明下[Apple证书列表](https://www.apple.com/certificateauthority/)，红框中的便是Apple全球开发者关系认证中间证书WWDRCA的2个版本。
在`Apple Intermediate Certificates`列表下包含`Developer ID`名称的就是根证书

> 安装好证书之后记得重启电脑

## 创建描述文件安装之后Xcode项目一直找不到
一个新的开发者账号，创建好了证书和描述文件，点击安装到Mac电脑之后，打开Xcode项目一直显示描述文件有问题，找不到开发者证书，重启Xcode也不行。

> 安装新的描述文件记得一定要重启电脑才行，一定要重启电脑

## 找不到xcrun altool 指令
Xcode开发工具是通过官网下载的，双击之后就可以运行，在命令行运行`xcrun altool`指令时提醒找不到这个指令。解决方式
1. 打开finder，将Xcode拖到应用列表下，这时候Xcode的路径改变了
2. 通过`sudo xcode-select --reset`重置Xcode的路径就可以了

## 通过 xcrun altool 上传ipa
准备工作：
1. 打开开发者后台 -> 选择用户和协议 -> 点击秘钥 -> 点击+号按钮添加新的秘钥
2. 在页面上会有`Issuer ID` 和 `秘钥ID`,这两个对应上传中的`apiIssuer`和`apiKey`
3. 生成新的秘钥之后会有一个p8文件，p8文件只能下载一次，谨慎保存
4. 新的电脑一般没有 `~/.private_keys` 文件夹，通过`mkdir ~/.private_keys`创建
5. 将p8文件拷贝到`~/.private_keys`文件夹下，`cp ~/Desktop/xxx.p8  ~/.private_keys`

也可以通过一条指令拷过去` mkdir -p ~/private_keys; cp ~/Desktop/*.p8 ~/private_keys `

这个时候通过 ` xcrun altool --upload-package /Users/pcmac/Desktop/loan.ipa --apiKey Y7JD2T8FCW --apiIssuer 7d165115-01ee-49bb-ab0a-771d41a8072e -t ios   --apple-id 6472611228 --bundle-id comthailin.app  --bundle-version 1 --bundle-short-version-string 1.0.0`指令就可以传到苹果开发者后台了，参数解释：

`--upload-package` : 参数是ipa包
`--apiKey` : 参数是ipa包
`--apiIssuer` : 参数是ipa包
`-t` : 包的类型，mac还是iOS海慧寺watch
`--apple-id` : 注意，这里的apple-id指的是在开发者后台创建的 APP 的 ID，也就是你要上传的APP，在`点击创建的APP -> APP信息`中可以看到，在sku的下面
`--bundle-id` : Bundle ID
`--bundle-version` : 应用程序版本号，对应CFBundleVersion
`--bundle-short-version-string` : 短版本号，编译版本 对应 CFBundleShortVersionString


## 参考文章
* [Xcode历史版本下载](https://xcodereleases.com/?scope=release)
* [在VMware上安装MacOS 13(Ventura)](https://blog.bai.re/2022/11/14/macOS13-on-VMware/)
* [Windows搭建mac黑苹果系统](https://cloud.tencent.com/developer/article/2144134)
* [macOS多版本虚拟机镜像](https://blog.csdn.net/WELFSDAF/article/details/127154939)
* [钥匙串提示此证书的签发者无效](https://www.dongchuanmin.com/archives/692.html)
* [altool 上传iPa文件](https://blog.csdn.net/it_15077647703/article/details/134202064)
* [altool苹果官方文档](https://help.apple.com/asc/appsaltool/#/apdATD1E53-D1E1A1303-D1E53A1126)