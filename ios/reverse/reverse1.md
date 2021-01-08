# 逆向的准备工作
现在没有时间去记录这个笔记，优先记录底层原理和swift

## 越狱的概念


## 准备工作
1. 手机越狱
2. 准备的软件
3. 逆向研究

iOS9之后越狱的环境越来越差，现在使用iOS越狱都不是完美越狱，只要手机重启就需要重新越狱。

## ssh
shh 用户名@IP地址
ssh root@192.168.2.1
是否保存秘钥 ，密码默认是alpine
exit: 退出登录

iOS下有两个账号：root/mobile

mobile： 普通权限账户，只能操作一些普通文件，不能操作系统级别的文件  $HOME是/var/mobile
root：最高权限账户  $HOME是/var/root
$HOME:表示用户文件夹位置


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

## Cyript
cyript 是一个脚本语言。