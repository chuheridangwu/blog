# MAC 
重装电脑之后，xcodebuild报错误：`xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance`

是因为xcodebuild找不到Xcode，需要重定向一下Xcode的文档位置：
 `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer/`

 xcrun：

 xcrun的文章
 [iOS 编译 LLVM/Clang](https://www.zybuluo.com/qidiandasheng/note/1076130)
 [iOS编译命令 clang xcrun](https://www.jianshu.com/p/80240af0bac6)

 ## Mac快捷键
快捷键用的好，下班回家早。点击进入[Mac快捷键官网](https://support.apple.com/zh-cn/HT201236)

**通用按钮**

column0 | column1 | column2
------- | ------- | -------
Command（或 Cmd）⌘ | Shift ⇧ | Option（或 Alt）⌥
Control（或 Ctrl）⌃ | Caps Lock ⇪ | Fn

**常用快捷键**

快捷键 | 含义
------- | -------
Command-H | 隐藏最前面的应用的窗口
Command-Option-H | 除最前面的窗口外，隐藏其他应用
Command-M | 将最前面的窗口最小化至“程序坞”
Command-Option-M | 最小化最前面的应用的所有窗口（打开的文件夹比较多的时候常使用）
Command-W | 关闭窗口
Command-Option-W | 要关闭应用的所有窗口
Command-Tab | 切换打开的 App 
Command-逗号(,) | 打开当前应用的偏好设置

**访达和系统快捷键**

快捷键 | 含义
------- | -------
Command-I | 显示所选文件的“显示简介”窗口。
Shift-Command-G | 打开“前往文件夹”窗口。
Option-Command-L | 打开“下载”文件夹。
Shift-Command-R | 打开“隔空投送”窗口
Shift-Command-N | 创建一个新的应用



killall Finder      重启Finer

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



[苹果内购测试流程](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox)