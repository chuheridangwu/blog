# xcodebuild打包工具
xcodebuild 是苹果发布的自动构建工具,平时打包的过程中可以使用 xcodebuild 命令直接进行打包。运行`man xcodebuild` 或者 `xcodebuild --help`可以看到xcodebuild支持的命令。或者使用`xcode serve`的方式进行自动打包。

## 常用的xcodebuild命令
常用的命令有这么几个，`clean`清除项目 、`archive` 打包 、 `-exportArchive` 导出ipa。
1. 清理项目`xcodebuild clean`
2. 打包 `xcodebuild archive`，打包有两种方式，一种是项目中没有使用cocoapods，一种是项目中使用了cocoapods。打包完成后生成对应的`.xcarchive`文件。
```
// 没有使用cocoapods的项目进行打包，在当前目录下只有一个个项目时可以忽略 -project projectName.xcodeproj 
xcodebuild archive -project projectName.xcodeproj -scheme schemeName  -archivePath projectName.xcarchive
// 使用了cocoapods的项目进行打包
xcodebuild archive -workspace 9158Live.xcworkspace  -scheme MoreLive -archivePath projectName.xcarchive
//如果Scheme找不到，查看 Manage Schemes,选择对应 Scheme，选择 Shared。或者使用 xcodebuild -list 查看对应的Scheme。
```
3. 导出IPA
```
// 使用打包的xcarchive文件导出ipa
xcodebuild -exportArchive -archivePath projectName.xcarchive -exportPath 文件路径 -exportOptionsPlist ./ExportOptions.plist
```
在xcode9之后，导出ipa需要对应的证书文件和描述文件，`ExportOptions.plist`文件在第一次手动打包之后才会有。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>destination</key>
	<string>export</string>
	<key>method</key>
	<string>app-store</string>
	<key>signingStyle</key>
	<string>automatic</string>
	<key>stripSwiftSymbols</key>
	<true/>
	<key>teamID</key>
	<string>DLBFL5Q63Z</string>
	<key>uploadSymbols</key>
	<false/>
</dict>
</plist>
```

## xcodebuild对应的参数说明	

可选参数 | 对应值 | 说明
------- | ------- | -------
-project | name.xcodeproj | 在当前目录下有多个项目是需要指定改参数
-target | targetname | 如果不指定的话默认会构建第一个target
-alltargets |  | 表示同时构建所有的target
-workspace | name.xcwordspace | 构建workspace，需要指定scheme，使用cocoapods必选
-scheme | schemename | 指定对应的scheme，构建workspace时必选
-destination | destinationspecifier | 通过描述使用对应的设备，默认使用当前scheme所匹配的设备
-destination-timeout | timeout | 搜索对应设备时需要的时间，可以设置搜索超时时间，默认为30s
-configuration | configurationname | 使用对应的配置进行构建，一般为Debug 或 Release
-arch | architecture | 指定构建的包所支持的指令集 arm64、armv7、armv7s
-sdk | sdkfullpath sdkname | 针对指定的SDK选择合适的构建工具构建，如-sdk iphoneos
-showsdks |  | 列出所有的SDK，一般列出的后面会跟上版本号，-sdk不写版本号默认为所有版本
-list |  | 列出当前项目所有的 Targets、Build、Configurations、Schemes
-derivedDataPath | path | 构建成功时相关的缓存文件默认路径
-archivePath | xcarchivepath | 设置导出的.xcarchive文件的路径
-allowProvisioningUpdates | | 允许xcodebuild与Apple Developer网站进行通信。对于自动签名的目标，xcodebuild将创建并更新配置文件，应用程序ID和证书。对于手动签名的目标， xcodebuild将下载丢失或更新的配置文件。要求已在Xcode的帐户中添加开发者帐户。

参数 | 说明
------- | -------
build | 构建target，当没有其他action指定时，这是xcodebuild默认的一个action
build-for-testing | 构建target和对应的相关单元测试，需要指定scheme
analyze | 构建和分期target或scheme，需要指定scheme
archive | 存档对应的构建scheme，需要指定scheme
test | 从SYMROOT目录测试scheme，需要指定scheme和可选的destination
install | 构建target然后安装到target的安装目录和发布目录（DSTROOT）
clean | 从构建目录（SYMROOT）删除构建时的products和一些中间文件

## Xcode Serve
Xcode开发工具提供了自动打包工具`Xcode Serve`，`Xcode Serve`是一个基本的持续继承方案，可以获取分支代码，指定出发CI的条件，执行对应的Archive操作。在`Preferences`中，选择`Accounts`，删除`Xcode Serve`。

## 常见问题

1. 找不到`exportOptionsPlist`文件

```
error: Couldn't load -exportOptionsPlist: The file “ExportOptions.plist” couldn’t be opened because there is no such file.

Error Domain=NSCocoaErrorDomain Code=260 "The file “ExportOptions.plist” couldn’t be opened because there is no such file." UserInfo={NSFilePath=/ExportOptions.plist, NSUnderlyingError=0x7f80c769ff70 {Error Domain=NSPOSIXErrorDomain Code=2 "No such file or directory"}}

** EXPORT FAILED **
```

**解决方案:** 看一下`exportOptionsPlist`文件路径是否正确

2. 没有允许自动签名，项目使用了一个新的`Bundle id`，在使用xcodebuild进行自动打包时出现这个问题

```
IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/lq/035f13253jg7rg4pbw518q440000gn/T/loan_2021-04-15_09-14-34.927.xcdistributionlogs'.
error: exportArchive: No profiles for 'com.elephan222.cccc' were found

Error Domain=IDEProfileLocatorErrorDomain Code=1 "No profiles for 'com.elephan222.cccc' were found" UserInfo={IDEDistributionIssueSeverity=3, NSLocalizedDescription=No profiles for 'com.elephan222.cccc' were found, NSLocalizedRecoverySuggestion=Xcode couldn't find any iOS App Store provisioning profiles matching 'com.elephan222.cccc'. Automatic signing is disabled and unable to generate a profile. To enable automatic signing, pass -allowProvisioningUpdates to xcodebuild.}
```
**解决方案:**xcodebuild 没有允许自动签名导致的，使用`-allowProvisioningUpdates`,允许xcodebuild与Apple Developer网站进行通信。对于自动签名的目标，xcodebuild将创建并更新配置文件，应用程序ID和证书。对于手动签名的目标， xcodebuild将下载丢失或更新的配置文件。要求已在Xcode的帐户中添加开发者帐户。

## 参考网址
* [iOS开发-自动打包初步探究](http://zhangzr.cn/2018/07/27/iOS%E5%BC%80%E5%8F%91-%E8%87%AA%E5%8A%A8%E6%89%93%E5%8C%85%E5%88%9D%E6%AD%A5%E6%8E%A2%E7%A9%B6/)
* [使用 Xcode Server 持续集成](https://blog.wskfz.com/index.php/archives/82/)
* [Xcode Server教程](https://www.jianshu.com/p/167fb1dbe489)