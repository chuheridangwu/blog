# MAC 
重装电脑之后，xcodebuild报错误：`xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance`

是因为xcodebuild找不到Xcode，需要重定向一下Xcode的文档位置：
 `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer/`

 xcrun：

 xcrun的文章
 [iOS 编译 LLVM/Clang](https://www.zybuluo.com/qidiandasheng/note/1076130)
 [iOS编译命令 clang xcrun](https://www.jianshu.com/p/80240af0bac6)

 ## MAC 修改hosts权限
sudo vi /etc/hosts

## ping ip + 端口
nc -vz -w 2 120.79.79.253 12009


显示隐藏文件命令  defaults write com.apple.finder AppleShowAllFiles -bool true
隐藏文件命令      defaults write com.apple.finder AppleShowAllFiles -bool false
显示Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles  YES
隐藏Mac隐藏文件的命令：defaults write com.apple.finder AppleShowAllFiles  N


iOS描述文件位置
~/Library/MobileDevice/Provisioning Profiles


## Mac下安装任意来源的命令
sudo spctl --master-disable

## 获取本地地址 ifconfig
或者打开网络设置，wifi上有本地ip地址

## 查看本地文件的hash值
使用命令行， shasum + 文件路径/文件名

## 修改图片hash值的办法
使用 ImageMagick 对png图片做轻量压缩，并且不损失图片质量，又可以改变图片文件的hash值
1. 安装 ImageMagick，brew install imagemagick
2. 压缩工程目录下所有 png 文件，find filename "*.png" -exec echo {} \; -exec convert {} {} \;

## Mac快捷键
重启Finer  killall Finder
快速找到MAC主目录， Command + shift + G  ->  输入 /  回车

Command+Option+M
//  可以实现快速隐藏除当前应用程序之外所有程序窗口的目的。

Command+Option+H
//  可以实现快速隐藏当前应用程序所有窗口的目的

Command+H
//  关闭窗口
Command+w
// 隐藏窗口
Command+h


[苹果内购测试流程](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox)