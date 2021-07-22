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
Shift-Command-5 | 在 macOS Mojave 或更高版本中，拍摄截屏或录制屏幕。
Shift-Command-4 |  截屏自定义的部分区域
Shift-Command-3 |  整个桌面截屏 


**访达和系统快捷键**

快捷键 | 含义
------- | -------
Command-I | 显示所选文件的“显示简介”窗口。
Shift-Command-G | 打开“前往文件夹”窗口。
Option-Command-L | 打开“下载”文件夹。
Shift-Command-R | 打开“隔空投送”窗口
Shift-Command-N | 创建一个新的应用

## 常用命令

命令 | 含义
------- | -------
`sudo vi /etc/hosts` | 修改hosts权限
`nc -vz -w 2 120.79.79.253 12009` | ping对应的ip + 端口
`sudo spctl --master-disable`  |   Mac下允许安装任意来源的命令
`ifconfig` | 获取本地地址,或者打开网络设置，wifi上有本地ip地址
`shasum + 文件路径/文件名` | 查看本地文件的hash值
`defaults write com.apple.finder AppleShowAllFiles -bool true` | 显示隐藏文件
`defaults write com.apple.finder AppleShowAllFiles  YES` | 显示隐藏文件
`defaults write com.apple.finder AppleShowAllFiles  N` | 隐藏文件
`defaults write com.apple.finder AppleShowAllFiles -bool false` | 隐藏文件
`killall Finder `   |  重启Finer
`zip -e ~/Desktop/a.zip  ~/Desktop/file.text` | 单个文件加密成zip
`zip -er ~/Desktop/a.zip  ~/Desktop/相册` | 文件加密成zip


## 路径信息
文件位置 | 具体路径
------- | -------
Mac设置文件位置 | `/System/Library/PreferencePanes/Keyboard.prefPane`
iOS描述文件位置 | `~/Library/MobileDevice/Provisioning Profiles`

## 修改图片hash值的办法
使用 ImageMagick 对png图片做轻量压缩，并且不损失图片质量，又可以改变图片文件的hash值
1. 安装 ImageMagick，brew install imagemagick
2. 先 cd 到对应目录下，使用命令`find . -iname "*.png" -exec echo {} \; -exec convert {} {} \;`;
   1. exec 是可选参数，含义是命令执行完成后，会退出本shell。
   2. {} 表示当前文件的路径 

[苹果内购测试流程](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox)

## 常见问题
1. 使用自动打包时一直提示输入管理员账号和密码
`钥匙串 -> 找到对应的证书秘钥 -> 选择对应的秘钥 -> 双击 -> 选择属性控制 -> 允许所有应用程序访问此程序`