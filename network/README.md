# 网络篇文档介绍
当前文档主要来自于李明杰老师的《网络协议从入门到底层原理》,文档素材来自李明杰老师制作的教材和自己实践的一些截图。

文档内容主要是学习过程中的一些总结,主要内容包括: 局域网通信、IP地址、路由器、物理层、数据链路层、网络层、传输层(UDP/TCP)、应用层(HTTP/HTTPS)

如果你已经对网络有过了解，可以直接查找你感兴趣的部分。如果没有基础的话，我建议你从头阅读，感触良多。对网络的整体设计会有更多的了解。

**网络诊断时常用命令**

MAC | Window | 作用
------- | ------- | -------
`traceroute www.baidu.com` | `tracert www.baidu.com` | 查看当前主机到目标主机经过的路径  
`nslookup  www.baidu.com` | `nslookup www.baidu.com` | 可以查到DNS记录的生存时间，还可以指定使用哪个DNS服务器进行解析
`netstat -r` | `netstat -r` | 查看路由表
`netstat -an` | `netstat -an` | 查看被占用的端口
`netstat -anb` | `netstat -anb` | 查看被占用的端口、占用端口的应用程序
`curl -I www.oschina.net | head -n 1` | `curl -I www.oschina.net | head -n 1` | 检查某个主机是否运行 HTTP 服务，或者检查某网站是否可用
`dig www.oschina.net` | `dig www.oschina.net` | 使用 dig 来诊断域名信息,查看域名被解析到那一台服务器
`telnet 主机 端口` | `telnet 主机 端口` | 查看是否可以访问主机的某个端口
`tcping 主机 端口` | `tcping 主机 端口` | 查看是否可以访问主机的某个端口
`nc -zv 主机 端口` | `nc -zv 主机 端口` | 查看是否可以访问主机的某个端口


#### 三种查看端口是否通的区别
```
使用telnet测试8.134.193.24 端口 9999报错 Connection closed by foreign host，使用tcping测试是open，nc - zv 命令 返回结果也是 [tcp/distinct] succeeded! ，这是什么原因呢

telnet 命令与 tcping 和 nc 命令在检测端口的开放状态时使用了不同的方法和协议，导致你测试时出现了不同的结果。

对于 telnet 命令，它使用的是 Telnet 协议。当你使用 telnet 8.134.193.24 9999 进行连接时，报错 "Connection closed by foreign host" 表示连接被目标主机（8.134.193.24）关闭。这可能表明该主机上的服务或应用程序没有在指定的端口上监听，并且主动拒绝了你的连接请求。

对于 tcping 命令，它使用 ICMP Echo 请求来检测端口的可达性。当你使用 tcping 8.134.193.24 9999 进行测试时，显示 "open" 表示指定的端口是开放的。这意味着该主机上的防火墙或应用程序在指定的端口上接受连接，并成功响应了 ICMP Echo 请求。

对于 nc -zv 命令，它使用 TCP 协议来检测端口的可达性。返回结果 "[tcp/distinct] succeeded!" 表示指定的端口是可达的。这表明该主机上的防火墙或应用程序在指定的端口上接受连接，并成功建立了 TCP 连接。

因此，telnet 命令返回错误，而 tcping 和 nc 命令返回成功，可能是目标主机上的服务或应用程序只接受特定类型的连接，比如只接受 TCP 连接，而拒绝了 Telnet 连接。

需要注意的是，telnet 命令在现代环境中并不常用，因为它的安全性较差，在传输中可能暴露敏感信息。推荐使用 tcping 或 nc 命令来检测端口开放状态。
```