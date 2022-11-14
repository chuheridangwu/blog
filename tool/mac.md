# MAC电脑 
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
`zip -er ~/Desktop/a.zip  ~/Desktop/相册` | 文件夹加密成zip
`zip -r ~/Desktop/a.zip  ~/Desktop/相册` | 文件夹压缩成zip
`otool -L ../sbin/nginx`   |  查看可执行文件链接的库

## 路径信息
文件位置 | 具体路径
------- | -------
Mac设置文件位置 | `/System/Library/PreferencePanes/Keyboard.prefPane`
iOS描述文件位置 | `~/Library/MobileDevice/Provisioning Profiles`
Liunx指令路径 | 隐藏文件夹`/bin/sh`
Liunx指令路径 | 用户不能添加指令到当前文件夹`/usr/bin`
Liunx添加的指令路径 | `/usr/local/bin`

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

### sips命令
在 Mac 电脑中，默认有 sips 命令可以裁剪和转换图片格式,使用`sips --formats`查看sips支持的格式。

**转换格式**
```shell
# 基本用法
sips -s format [格式名称] [文件名] --out [输出文件的名称]

# png转换成jpg
sips -s format jpeg test.png --out test.jpg

# jpg转换成png
sips -s format png test.jpg --out test.png

# 批量转换图片
for i in [文件名列表]; do sips -s format [格式名称] $i --out [终点]/$i.[格式名称];done

# 例如：
for i in *.png; do sips -s format jpeg $i --out ${i%.*}.jpg;done;
```

**裁剪图片**

```shell
sips -Z 600 test.jpg   ##宽度600 高度动态调整所有图片,如果宽高比不对头，会设置成高度，宽度自适应
sips -z 300 600 test.jpg           ##指定宽300高600
sips -r 90 ~/*.JPG                 ##顺时针调整90度
sips -f horizontal ~/*.jpg         ##水平翻转
sips -f vertical ~/*.jpg           ##垂直翻转
sips -s format jpeg test.HEIC --out test.jpg  ## HEIC 转换成jpg图片

for i in *.jpg; do sips -Z 600 "${i}" --out "600_${i%}"; done ## 批量指定宽度为600像素，并且文件名前面加600_
for mshk in *; do name="${mshk%%.*}"; sips -s format png $mshk --out $name.png;done  ##批量将文件夹内图片转换成png图片

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

## MAC中提高工作效率的几个软件
* Alfred: 便捷搜索，工作流
* XtraFinder: 增强型Finder
* iTerm2: 完爆Terminal的命令行工具
* Go2Shell: 从Finder快速定位到命令行工具

## MAC添加终端指令
我们在MAC电脑上敲一些指令时,比如`cd`/`curl`/`clang`/`file`等指令，是在`/usr/bin`目录下。从Mac10.11开始,`/usr/bin`目录就不能写了，即使有管理员权限也不行。

如果想增加一些指令需要放在`/usr/local/bin`目录中。同时需要给与它权限`chmod +x /usr/local/bin/xxx`

## mac 添加环境变量
Mac电脑的环境变量配置在`~/.bash_profile`环境下,通过`vim ~/.bash_profile`编辑当前文件.
```shell
export PATH=~/Desktop/flutter/bin:$PATH
export THEOS=~/theos
export PATH=~/theos/bin:$PATH
```
终端中的`cd`/`curl`/`clang`/`file`等指令之所以能找到，是因为它们都在`/usr/bin`或者`/usr/local/bin`目录下，为什么在这个目录下就能找到了，因为电脑的环境变量`PATH`配置了当前目录。我们通过`echo $PATH`打印看一下：
```shell
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Users/mlive/Desktop/flutter/bin:~/usr/local/Cellar/
```
所以如果我们有一些指令不想放在电脑的bin目录中时，可以通过修改PATH的值来新增路径
```markdown
* `export THEOS=~/theos`表示新增了一个变量 THEOS，值是 ~/theos
* `export PATH=~/theos/bin:$PATH`表示PATH新增一个`~/theos/bin`目录，我们不能直接将PATH的值更改掉，还要它以前的值,`:$PATH`表示引用环境变量的值。
```
修改好之后，使用`source ~/.bash_profile`使当前环境变量生效。

>从 macOS 版本开始，使用`zsh`替换bash用做默认的shell工具，我们在 `~/.bash_profile` 中配置环境变量, 每次重启终端后配置不生效。需要重新执行 `source ~/.bash_profile`,这是因为zsh加载的是 `~/.zshrc`文件,**我们需要在`~/.zshrc`文件最后增加一行：
`source ~/.bash_profile`**


## 常见问题
1. 使用自动打包时一直提示输入管理员账号和密码
`钥匙串 -> 找到对应的证书秘钥 -> 选择对应的秘钥 -> 双击 -> 选择属性控制 -> 允许所有应用程序访问此程序`

2. 怎么判断有没有安装对应的指令
在命令行使用`command -v brew`，如果有安装对应的工具，则会返回对应的安装路径，如果没有安装，返回空的字符串
```shell
mlive@mlivedeMacBook ~ % command -v brew 
/opt/homebrew/bin/brew
```

## iPhone手机投屏到Mac电脑
如果想将 iPhone 手机屏幕投射到 Mac 屏幕上，有两种方式：
* `QuickTime Player`
  * 第一步 首先使用USB数据线将iPhone和Mac进行连接
  * 第二步 打开系统自带软件`QuickTime Player`,在菜单栏【文件】里面找到【新建影片录制】
  * 第三步 在【QuickTime Player】录制界面中找到红色的【录制按钮】，点击旁边的【小箭头】，选择手机设备
* 将 Mac 设置为隔空播放接收器
  * 第一步 iPhone 和  Mac设备处于同一局域网中
  * 第二步 Mac中 选择 【系统偏好设置】，点按【共享】 ,左侧服务列表中选择【隔空播放接收器】
  * 第三步  选择可以使用“隔空播放”将内容流播放到此 Mac 的设备。选择 同一网络中的任何人

参考苹果官网：[将 Mac 设置为隔空播放接收器](https://support.apple.com/zh-cn/guide/mac-help/mchleee00ec8/mac)

## 局网内文件共享
1. 在 Mac 上打开文件共享，并且将其设置为与 Windows 用户共享文件。
2. 准备好 Mac 上用于 Windows 共享的用户帐户的名称和密码。
3. 在 Windows 电脑上，打开“文件资源管理器”，点按“网络”，然后找到您想要连接到的 Mac。
4. 连按 Mac，然后输入用户帐户的帐户名称和密码。**Windows 电脑可能要花一些时间以在网络中显示该 Mac。**

如果在Windows电脑的网络中找不到 Mac 电脑,可以参考下面的方式:
1. Mac电脑共享文件，点击`设置` -> `共享`-> `文件共享`-> 右侧`选项`-> `允许账号，设置密码`
2. 到 Windows 系统的网上邻居 或是 按键盘`winodws键和R键`打开运行窗口，输入 `\\192.168.1.10`（192.168.1.10是苹果系统的ip地址）按回车键.
3. 会提示你输入苹果系统的账户和密码，进入后就可以访问传输文件了。

参考苹果官网：[从 Windows 电脑连接到 Mac](https://support.apple.com/zh-cn/guide/mac-help/mchlp1658/12.0/mac/12.0)
参考博客：[windows电脑怎么访问苹果电脑共享文件夹](https://www.my607.com/hulianwang/2022-03-21/443426.html)

## 其他软件想输出信息到命令行
1. 在命令行输入`tty`显示软连接地址
   ```shell
   mlive@mlivedeMacBook-Pro-2 ~ % tty
    /dev/ttys003
   ```
2. 在其他软件上输入 `echo "123" > /dev/ttys003`就会显示在当前命令行上

## 参考文章
* [iOS工程化「一」Xcode工程分析](https://juejin.cn/post/7125456510817140749)