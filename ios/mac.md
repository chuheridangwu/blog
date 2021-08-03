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

**使用convert裁剪大小**
```shell
// convert 命令改变图片的大小。将原图片转成大小为 200x100 像素的图片,ImageMagick 会优先保持原图片的比例,但图片本身并不一定是精确的 200x100 像素。
$ convert image.png -resize 200x100 out.png

// 如果就是需要将原图片转换为特定大小，而不用考虑形变的影响。可以使用如下命令：
$ convert image.png -resize 200x100! out.png

// 当然更多的时候，指定输出图片的大小时并非一定需要“宽x高”这样的形式，可以单独指定宽或者高。如指定输出图片的宽度：
$ convert image.png -resize 200 out.png

// 或者指定输出图片的高度：
$ convert image.png -resize x100 out.png
```

在 Mac 电脑中，默认有 sips 命令可以裁剪图片
```
sips -Z 600 test.jpg   ##宽度600 高度动态调整所有图片,如果宽高比不对头，会设置成高度，宽度自适应
sips -z 300 600 test.jpg           ##指定宽300高600
sips -r 90 ~/*.JPG                 ##顺时针调整90度
sips -f horizontal ~/*.jpg         ##水平翻转
sips -f vertical ~/*.jpg           ##垂直翻转
sips -s format jpeg test.HEIC --out test.jpg  ## HEIC 转换成jpg图片

for i in *.jpg; do sips -Z 600 "${i}" --out "600_${i%}"; done ## 批量指定宽度为600像素，并且文件名前面加600_

```

## 生成RSA
PEM格式：RSA公私钥对常用的编码方式，OPENSSL以PEM格式为主，相对DER可读性更强，以BASE64编码呈现；
开头类似 -----BEGIN PRIVATE KEY-----
结尾类似 -----END PRIVATE KEY-----

PKCS#8密钥格式，多用于JAVA、PHP程序加解密中，为目前用的比较多的密钥、证书格式；
PKCS#1密钥格式，多用于JS等其它程序加解密，属于比较老的格式标准。
PKCS#1和PKCS#8的主要区别，从本质上说，PKCS#8格式增加验证数据段，保证密钥正确性。

1. 安装openssl，MAC电脑默认已安装`sudo apt-get install openssl`
2. 生成 1024位 RSA私钥,`rsa_private_key.pem`是文件名称。 `openssl genrsa -out rsa_private_key.pem 1024`
3. 将 RSA私钥转换成 PKCS8 格式，`–nocrypt`可不用，`openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM –nocrypt`
4. 生成公钥`openssl rsa -in rsa_private_key.pem -out rsa_public_key.pem -pubout `

[苹果内购测试流程](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox)

## 常见问题
1. 使用自动打包时一直提示输入管理员账号和密码
`钥匙串 -> 找到对应的证书秘钥 -> 选择对应的秘钥 -> 双击 -> 选择属性控制 -> 允许所有应用程序访问此程序`