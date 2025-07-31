# MAC地址
每一个网卡都有一个 6 字节（ 48bit）的 MAC地址:

组织唯一标识符(OUI) | 网络接口标识符
------- | -------
40-55-82 | 0A-8C-6D

每一个网卡的物理地址都是唯一的，固化在网卡的ROM中，由 IEEE802标准规定。前三个字节是组织唯一标识符：由 IEEE 的注册管理机构分配给厂商。后三个字节是网络接口标识符：由厂商自行分配。
* [OUI厂家MAC地址查询](http://standards-oui.ieee.org/oui/oui.txt)
* [MAC地址厂商查询](https://mac.bmcx.com/)

## 不同设备的MAC地址
当 MAC地址 48位全为1时，代表广播地址 `FF-FF-FF-FF-FF-FF`。 Windows可以通过 更改适配器选项 -> 属性 -> 配置 -> 高级 -> 网络地址 修改MAC地址。填写的时候需要把`-`去掉。

当网络对上网设备有限制时，我们可以通过修改主机的MAC地址达到蹭网的目的。

设备 | MAC地址 | 查询方式
------- | ------- | -------
Windows | 40-55-82-0A-8C-6D | `ipconfig / all`
Linux、Android、Mac、iOS | `40:55:82:0A:8C:6D` | Mac电脑 `ifconfig` 
Packet Tracer | `4055.820A.8C6D`


## MAC地址的获取
当不知道对方主机的 MAC 地址时，可以通过发送 ARP 广播获取对方的 MAC 地址,
* 获取成功后，会缓存IP地址、MAC地址的映射信息，俗称：ARP缓存
* 通过 AR P广播获取的 MAC 地址，属于动态（dynamic）缓存,存储时间比较短（默认是2分钟），过期了就自动删除
* 如果更换了网卡设置，MAC地址也会改变，当发送消息失败发现ARP缓存过期时，会重新发送一次ARP广播。


## APR
ARP (Address Resolution Protocol)译为：地址解析协议,通过IP地址获取MAC地址

RAPP (Reverse Address Resolution Protocol)译为：逆地址解析协议,使用与ARP相同的报头结构,作用与ARP相反，用于将MAC地址转换为IP地址,后来被BOOTP、DHCP所取代。
    

命令 | 含义
------- | -------
`arp -a [主机地址]` | 查询ARP缓存
`arp -d [主机地址]` | 删除ARP缓存
`arp -s 主机地址 MAC地址` | 增加一条缓存信息（这是静态缓存，存储时间较久，不同系统的存储时间不同）

## ICMP
ICMP（`Internet Control Message Protocol）`，译为：互联网控制消息协议。IPv4中的ICMP被称作ICMPv4，IPv6中的ICMP则被称作ICMPv6。

通常用于返回错误信息: 比如 值过期、目的不可达,ICMP 的错误消息总是包括了源数据并返回给发送者。`ping` 命令发送的就是 ICMP 协议。