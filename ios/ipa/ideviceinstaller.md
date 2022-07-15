# ideviceinstaller
[ideviceinstaller](https://github.com/libimobiledevice/libimobiledevice) 应用程序允许与 iOS 设备的应用程序安装服务进行交互。它利用了神话般的libimobiledevice 库，允许与 iOS 设备进行通信。通过`brew install ideviceinstaller`进行安装。

## ideviceinstaller  管理IPA
ideviceinstaller 可以直接安装IPA到手机上，如果需要在指定的手机上进行安装，加上可选参数`-u`，指定手机的UDID。

指令 | 含义
------- | -------
`ideviceinstaller -i xx.ipa` | 安装ipa
`ideviceinstaller -u [udid] -i xx.ipa` | 在指定手机上安装ipa
`ideviceinstaller -U xx.ipa` | 卸载ipa
`ideviceinstaller -l ` | 查看设备安装的第三方应用,以及对应软件的bundleid
`ideviceinstaller -l -o list_system` | 查看设备安装的系统应用
`ideviceinstaller -l -o list_all` | 查看设备安装的所有应用

## idevicediagnostics 管理设备状态 - 重启、关机、睡眠
如果需要在指定的手机上进行安装，加上可选参数`-u`，指定手机的UDID。

指令 | 含义
------- | -------
`idevicediagnostics shutdown` | 手机关机
`idevicediagnostics restart` | 手机重启
`idevicediagnostics sleep` | 休眠(熄屏灭屏)


## Ideviceinfo 获取设备信息
Ideviceinfo 如果需要在指定的手机上进行安装，加上可选参数`-u`，指定手机的UDID。

指令 | 含义
------- | -------
`Ideviceinfo -k ProductVersion` | 获取设备版本号，13.4.1
`ideviceinfo -k DeviceName` | 获取设备的名称，xxx的iPhone
`ideviceinfo -k ProductType` | 获取手机的设备名,iPhone10,3
`ideviceinfo -k ProductName` | 获取设备系统名称,iPhone OS

## 其他的一些指令

指令 | 含义
------- | -------
`idevice_id -l` | 显示当前所连接设备的 udid 
`idevicedebug run bundle_id ` | 可以直接launch某个app，这个app必须是你通过development证书build到手机上的才行。
`idevicescreenshot` | 截屏

## Tidevice
阿里系的[Tidevice](https://github.com/alibaba/taobao-iphone-device)工具也能够用于与iOS设备进行通信, 提供以下功能
```markdown
* 截图
* 获取手机信息
* ipa包的安装和卸载
* 根据bundleID 启动和停止应用
* 列出安装应用信息
* 模拟Xcode运行XCTest，常用的如启动WebDriverAgent测试（此方法不依赖xcodebuild)
* 获取指定应用性能(CPU,MEM,FPS)
* 文件操作
```

使用方法，如果需要在指定手机安装需要指定udid：
```markdown
1. 安装 tidevice 使用`pip3 install -U "tidevice[openssl]" `如果提示安装失败，使用`pip3 install -U tidevice`（不过这种方法安装，配对功能就没有了，因为没有办法进行签名）
2. tidevice version   查看版本
3. tidevice pair   配对设备
4. tidevice unpair   取消配对设备
5. tidevice list   列出连接设备
6. tidevice list --json   以json的形式列出连接设备
7. tidevice relay 8100 8100   转发请求到手机，类似于iproxy
8. tidevice relay -x 8100 8100   转发并把传输的内容用hexdump的方法print出来
```

应用管理
```markdown
# 安装应用
$ tidevice install example.ipa

# 指定设备安装
$ tidevice --udid $UDID install https://example.org/example.ipa

# 卸载应用
$ tidevice uninstall com.example.demo

# 启动应用
$ tidevice launch com.example.demo

# 停止应用
$ tidevice kill com.example.demo

# 查看已安装应用
$ tidevice applist

# 查看运行中的应用
$ tidevice ps
$ tidevice ps --json output as json
```


## 参考网址
* [libimobiledevice 一些常用指指令](https://blog.csdn.net/babytiger/article/details/121511002)