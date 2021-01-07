# Wireshark

## iPhone手机连接电脑
mac电脑使用 wireshark 通过usb连接苹果手机，使用Remote Virtual Interface，RVI有时候可以，有时候不行

手机UUID通过Findler进行查看，手机->单击型号的位置
```
rvictl -s UUID   : 开启虚拟网络
rvictl -x UUID   : 关闭虚拟网络
```