# Cycript
Cycript是`Objective-C++`、`ES6（JavaScript）`、`Java`等语法的混合物,可以用来探索、修改、调试正在运行的Mac\iOS APP。点击[进入官网](http://www.cycript.org/),点击[查看文档](http://www.cycript.org/manual/)

## 查看要调试的进程
手机需要安装adv-cmds插件,ps命令可以列出系统当前的进程，
`ps -A` 列出所有进程
`ps -A | grap 关键字` 根据关键字搜索进程

##  开启

`cycript` 进入cycript。
`cycript -p 进程ID`
`cycript -p 进程名字`

取消输入 Ctrl +c
退出 Ctrl + d

## 语法
UIApp 等价于 [UIApplication sharedApplication]
定于变量使用 var xxx = UIApp.keyWindow
也可以使用内存地址获取对象，比如 `#0x231212121`地址使用控件
使用ObjectiveC.classes 查看已加载的所有OC类，很容易崩溃
查看对象的所有成员变量 `*UIApp `或者`*#0x231212121`
递归查看view的所有子控件view.recursiveDescription.toString()
筛选出某种类型的对象 choose(UIViewController)  或者 choose(UITableView)



