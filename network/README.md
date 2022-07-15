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
`telnet 主机 端口` | `telnet 主机 端口` | 查看是否可以访问主机的某个端口
`curl -I www.oschina.net | head -n 1` | `curl -I www.oschina.net | head -n 1` | 检查某个主机是否运行 HTTP 服务，或者检查某网站是否可用
`dig www.oschina.net` | `dig www.oschina.net` | 使用 dig 来诊断域名信息,查看域名被解析到那一台服务器