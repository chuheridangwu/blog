# SSH
iOS 和 Mac OSX 都是基于Darwin(苹果的一个基于Unix的开源系统内核)，所以iOS设备同样支持终端的命令行操作，在逆向工程中，我们经常会通过命令行来操作iPhone。

为了能够让Mac终端中的命令行能作用到iPhone设备上，我们首先需要让 Mac 和 iPhone 建立链接。当我们连接远程服务器时，可以通过 ssh 的方式进行连接，同样的操作适用于 iPhone。我们可以把 iPhone 当做一个远程服务端，通过 ssh 进行连接。

SSH 是`Secure Shell`的缩写，意为安全外壳协议，是一种可以为远程登录提供安全保障的协议。使用SSH，可以把所有传输的数据进行加密，中间人攻击的方式就不可能实现，并且 SSH 能够防止DNS欺骗和IP欺骗。

OpenSSH 是SSH协议的免费开源实现，可以通过OpenSSH的的方式让Mac远程登录到iPhone设备上。我们需要在越狱手机中通过Cydia商店安装OpenSSH。在商店首页有告诉我们如何使用OpenSSH登录iPhone,默认初始密码是`alpine`。

## OpenSSH 常用的命令
SSH 是通过TCP协议通信，所以要保证Mac和iPhone在同一个局域网下，iPhone可以通过 `设置->无限局域网->点击连接wifi右侧的感叹号图标` 查看当前IP地址。OpenSSH常用的命令有:
```markdown
1. ssh 用户名@IP地址 : 例如  `ssh root@192.168.2.1`
2. 如果是第一次登录手机会让你选择是否保存rsa秘钥   选择yes
3. 输入账号密码，默认初始密码是`alpine`。输入之后命令行左侧显示root表示登录成功
4. 退出登录: 输入`exit`
5. 修改root账号密码: 在登录成功之后输入`passwd`,输入新密码 、重复输入新密码 就可以了。下次登录需要输入新的密码。
6. 修改 mobile 账号密码: 在登录成功之后输入`passwd mobile`,输入新密码 、重复输入新密码 就可以了
```

iPhone设备上有`root` 和 `mobile`两个用户。mobile是普通权限账户，只能操作一些普通文件，不能操作系统级别的文件,`$HOME`是`/var/mobile`,root是最高权限账户,`$HOME`是`/var/root`。`$HOME`表示当前用户文件夹位置。登录 root 用户是`ssh root@IP地址`,登录 mobile 用户是`ssh mobile@IP地址`。登录之后可以通过`pwd`查看当前路径，会发现两个用户的路径是不同的。

## SSH、OpenSSH - SSL、OpenSSL
在使用 Cydia 安装OpenSSH的过程中，我们会发现它首先安装了OpenSSl。这几个概念的关系是什么样的呢？

SSL 是`Secure Socket Layer`的缩写，是为网络通信提供安全及数据完整性的一种安全协议，在传输层对网络连接进行加密。`OpenSSL` 是 SSL 的开源实现，绝大部分HTTPS的请求等价于 `HTTP + OpenSSL`。

我们可以简单的理解为，SSH 和 SSL 是一种协议，OpenSSH 和 OpenSSL 是协议的具体实现。OpenSSH 的加密是通过 OpenSSL完成的。






## ssh
ssh 用户名@IP地址
ssh root@192.168.2.1
是否保存秘钥 ，密码默认是alpine
exit: 退出登录

修改登录账号密码
登录成功之后输入：passwd
输入新密码 、重复输入新密码 可以了

SSL OpenSSL
https = HTTP+ openssl

openSSH的加密就是通过openSSL完成的

查看ssh版本方法：cd /etc/ssh
ssh_config:客户端
sshd_config： 服务器

## ssh 通讯步骤：
1. 建立安全链接
2. 客户端认证
3. 数据传输

### 建立安全链接
在建立安全链接过程中，服务器会提供自己的身份证明，公钥`/etc/ssh/ssh_host_rsa_key.pub`和私钥`/etc/ssh/ssh_host_rsa_key`

服务器发送公钥等信息到客户端，客户端把公钥存在`~/.ssh/known_hosts`

删除公钥
ssh-keygen -R 服务器IP地址



### 客户端认证
1. 使用密码认证
2. 基于秘钥的客户端认证，免密码认证

基于秘钥的客户端认证，需要客户端先生成对应的ras文件和秘钥文件,使用`ssh-keygen`，一路按回车，生成`~/.ssh/is_rsa`私钥和`~/.ssh/id_rsa.pub`公钥。

生成文件之后，使用`ssh-copy-id root@192.168.0.1`将客户端的公钥追加到服务端`~/.ssh/authorized_keys`授权文件尾部

## 文件拷贝
复制客户端的公钥到服务器的某个路径
scp ~/.ssg/id_rsa.pub root@服务器IP地址:服务器路径


scp是secure copy的缩写，基于SSH登录进行安全的远程文件拷贝命令，把一个文件copy到远程另外一台主机上

cat a>>b，将a文件的内容追加到b文件，如果b文件不存在，会先创建b文件

如果配置好ssh环境之后还是不能登录，需要给对应的.ssh文件增加权限，
chmod 755 ~
chmod 755 ~/.ssh
chmod 644 ~/.ssh/authorized_keys

## 端口
端口范围 0~65535，2的16次方
21端口提供FTP服务
22端口提供SSH服务
80端口提供HTTP服务

iphone默认使用22端口进行SSH通信，采用TCP协议

### 通过usb进行ssh登录
Mac上有个服务usbmuxd（开机自启动），可以将Mac的数据通过usb传输到iPhone

usbmuxd原理，客户端通过ssh登录到自己另外一个端口，比如220端口，通过usbmuxd映射到服务器的22端口，将数据传输给他，服务端反馈时同理