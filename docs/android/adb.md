# adb命令
进入[官方文档](https://developer.android.com/studio/command-line/adb?hl=zh-cn)
adb只是一套用于调试android系统的指令集合。有了这套指令集合，方便我们开发与测试，android studiokai 工具自带 adb，在`platform-tools`文件夹下

>通过 USB 连接的设备上使用 adb，您必须在设备的系统设置中启用 USB 调试（位于开发者选项下）

## 设备查看相关的命令
| 命令 | 作用 | 备注 |
| --- | --- | --- |
| `adb devices` | 查看连接的设备 |  |
| `adb命令 -s 设备id` | 选择设备 | 单个设备可以不指定设备id，多个设备需要使用-s指定设备id |
| `adb remount` | 重新挂载 | 一般用于我们要对已经root的设备里面的文件进行操作的时候，需要重新挂载 |
| `adb reboot` | 重启手机 |  |
| `adb shell reboot -p` | 关机 | -p 则是poweroff的意思 |
| `adb shell` | 进入shell |  |
| `adb root` | 获取root权限 | 进入shell里面，没有权限，有些文件夹是不允许你进入的 |
| `adb kill-server` | 关闭adb |  |
| `adb start-server` | 启动adb |  |

## 文件操作
| 命令 | 作用 | 备注 |
| --- | --- | --- |
| `adb pull 内部文件地址 电脑本地目录 ` | 从android系统中拉取文件到本地 |  需要退出shell进行拉取 |
| `adb push 电脑本地目录 内部文件地址` | 将本地文件推送到android文件夹内 |  |




## log文件捕捉
| 命令 | 作用 | 备注 |
| --- | --- | --- |
| `adb logcat > log.txt` | 抓取log日志 | 需要在android studio运行调试的时候进行抓取，ctrl + c 停止抓取，log在本地文件夹内 |

## 应用操作
| 命令 | 作用 | 备注 |
| --- | --- | --- |
| `adb install 本地apk地址 ` | 安装apk | 手机需要允许usb安装应用 |
| `adb uninstall 包名 ` | 卸载应用 | 一般应用的目录放在`/system/priv-app ` `/system/app`,第三方的目录`/data/app` |
| `adb shell am start -n 包名/类名` | 启动一个Activity | 例子 ` adb shell am start -n com.cool.melive/.ui.activity.MainActivity` （包名和类名两个都要写 格式是`包名/类名`） |
| `adb shell am broadcast 参数` | 发送广播 | |
| `adb shell screencap -p /sdcard/screen.png` | 截屏 | 手机界面截屏 |
| `adb shell screenrecord /sdcard/demo.mp4` | 录制屏幕 |  |
| `adb shell input keyevent  键码（keyCode）` | 模拟手机按钮 | kesCode的值在`android.view.KeyEvent`文件中查看，按`command + shift + a 搜索 KeyEvent` |




## 获取其他app包名
1. `adb shell` 进入shell
2. `logcat | grep START` 抓取日志
3. 手机打开app，获取应用日志
4. 分析获取的日志`07-27 06:24:13.329  1443  5981 I ActivityManager: START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10200000 cmp=com.android.browser/.BrowserActivity bnds=[455,1533][623,1701] (has extras)} from uid 10021`

| 命令 | 作用 | 备注 |
| --- | --- | --- |
| `act=android.intent.action.MAIN` | action的值 |  |
| `cat=[android.intent.category.LAUNCHER` | Category的值 |  |
| `com.android.browser` | 包名 |  |
| `com.android.browser/.BrowserActivity` | ComponentName |  |

### 使用Intent进行调用
```kotlin
// 隐式调用
intent.action = "android.intent.action.MAIN"
intent.addCategory("android.intent.category.LAUNCHER")
intent.setPackage("com.android.browser")
startActivity(intent)

// 显示调用
val intent = Intent()
val cmp = ComponentName("com.android.browser","com.android.browser/.BrowserActivity")
intent.component = cmp
startActivity(intent)
```

## 手机界面截屏拉取到本地文件夹
手机相册的图片路径`/sdcard/DCIM`、相机照片路径`/sdcard/DCIM/Camera` 、截屏路径：`/sdcard/DCIM/Screenshots`
```kotlin
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png ./
/sdcard/screen.png  手机文件路径
./ :  表示当前文件夹下

adb pull /sdcard/DCIM/Screenshots/  : 会直接将文件拉取到本地当前路径下
```

## 修改模拟器的hosts文件
模拟器的host文件通过`adb pull`拉取到桌面，修改后通过`adb push` 上传到模拟器原来位置，因为 hosts 文件时只读的，需要通过`emulator -avd (your AVD name) -writable-system`的形式启动模拟器后对 hosts 文件进行修改[来源网址](https://blog.csdn.net/mq2553299/article/details/68065469)

启动模拟器
```
cd ~/Library/Android/sdk/emulator //进入目标文件夹
./emulator -list-avds //列出所有模拟器
./emulator -avd Nexus_4_API_22 -writable-system //启动你想要修改的模拟器
```

打开另外一个窗口，修改文件
```
1.adb root  //root 运行
2.adb remount  //可更改用户账户
3.adb pull /system/etc/hosts ~/Desktop/hosts // 将hosts文件放在指定文件夹下（本文中放在桌面）
4. 修改对应的hosts文件
5.adb push ~/Desktop/hosts /system/etc/hosts //将修改完成的hosts文件放到模拟器中。
6.shell cat /etc/hosts //查看host文件
```

## Mac电脑不能使用adb功能
项目已经安装了AndroidStudio，但是还不能使用adb，原因是没找到对应的路径,需要把`platform-tools`文件路径添加到PATH中。由于在`macOS Catalina`系统中，`shell`文件更换成`zsh`文件进行启动。使用`cat /etc/shells`查看 Mac电脑中的所有的shell文件路径，`echo $SHELL`查看当前使用的shell路径，[点击查看苹果文档](https://support.apple.com/en-us/HT208050)

1.  在终端输入：`echo $HOME`。进入home目录下，及/Users/songyan
2.  继续输入：`touch .bash_profile`，创建.bash_profile文件
3.  在终端输入：`open -e .bash_profile`，打开bash_profile文件，即打开了一个文本编辑器
4.  `source ~/.bash_profile` 立刻生效

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn 
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn 
export PATH=${PATH}:/Users/xxx/Desktop/flutter/bin:/Users/xxx/Library/Android/sdk/platform-tools
```
单个路径是: `export PATH=/Users/xxx/Desktop/flutter/bin:$PATH`
多个路径使用`:`号进行区分,如果指定多个路径，结尾就不用写:`$PATH了`: `export PATH=${PATH}:/Users/xxx/Desktop/flutter/bin:/Users/xxx/Library/Android/sdk/platform-tools`

## 无线调试
要使用ADB无线调试，您需要满足以下基本要求：
1. Android设备和PC在同一WiFi网络下：无线调试需要Android设备和PC在同一WiFi网络下。
2. 启用开发者选项和无线调试模式：在Android设备上，您需要启用开发者选项和无线调试模式。
3. 安装最新版本的SDK：确保您的SDK为最新版本（adb --version ≥ 30.0.0）。
4. 配对设备：使用二维码或配对码将设备与工作站配对。

要使用配对码进行ADB无线调试，您需要执行以下步骤：
1. 启用无线调试：在手机上启用开发者模式和USB调试。同时，打开无线调试开关。
2. 获取配对码：进一步点击无线调试选项，会进入二级菜单页面，里面会显示配对码、IP地址和端口号等信息。
3. 配对设备：在电脑上的命令行工具中输入以下命令：`adb pair <设备IP地址>:<端口号>`。其中，`<设备IP地址>和<端口号>`是在第2步中获取的IP地址和端口号。
4. 输入配对码：命令行工具会提示要求输入配对码，输入第2步中获取的配对码即可。
5. 配对成功之后使用`adb connect 设备IP地址:5555`连接手机,提示`connected to 192.168.0.198:5555`代表连接手机成功

如果长时间不连接可能会报错，尝试以下步骤：
1. 重新启动TCP/IP连接：首先，将手机通过USB线连接到电脑。然后在终端执行以下命令：`adb usb`。这将会重启USB模式。然后执行：`adb tcpip 5555`。这将会重启TCP模式。
2. 重新连接设备：在终端执行以下命令：`adb connect 192.168.160.110:5555`。这将会尝试重新连接到设备。

如果以上步骤不能解决问题，可能需要检查以下几点：
* 确保Android设备已开启USB调试。
* 确保Android设备和PC在同一个局域网。
* 在执行`adb tcpip 5555`后可能需要重新开启USB调试。

## 错误问题
### 模拟器adbd cannot run as root in production builds
是因为模拟器的问题， Google Play类型的模拟器，不支持`adb root`

* google APIs：支持adb root
* google Play：不支持adb root 

>技术来源：[阳光沙滩](https://www.sunofbeach.net/a/1186220804795289600)

他们这个网站挺不错的，准备学习安卓可以直接在这里看，对初学者很友好