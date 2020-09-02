# xcode配置
xcode常见的一些配置，平时经常遇到找不到库、找不到头文件，可能都是这些配置导致的

* ${SRCROOT}：代表的是项目根目录下
* ${PROJECT_DIR}：代表的是整个项目
* ${PROJECT_FILE_PATH}表示project的当前路径，相当于$(PROJECT_DIR)/$(PROJECT_NAME).xcodeproj
* $(PROJECT_NAME) ： 项目名字
* ${PODS_ROOT}  : 项目使用cocoapods，pod文件目录
* $(inherited)：添加目录的时候写上 “$(inherited)” 就是表示路径自己从frameworks里面读取。 默认的情况下路径配置是不被 Targets 继承的，只有当Targets的设置加入了$(inherited)时才被继承，继承来自更高一级的配置。


## 搜索路径
Framework Search Paths
附加到项目中的framework 的搜索路径。

Library Search Paths
附加到项目中的第三方Library的搜索路径。

Header Search Path
头文件的搜索路径。

User Header Search Paths
只有在Always Search User Paths为Yes时才会被搜索。


## MAC 修改host权限
sudo vi /etc/hosts

## XIB创建TableViewCell
```oc
// 创建cell
[_tableView registerNib:[UINib nibWithNibName:@"PersonMessageCell" bundle:nil] forCellReuseIdentifier:@"PersonMessageCell"];

// 使用
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
PersonMessageCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PersonMessageCell"];
return cell;
}

// 初始化界面时，需要创建圆角等
- (void)awakeFromNib {
    [super awakeFromNib];
    _bgView.layer.cornerRadius = 5;
    _bgView.layer.masksToBounds = YES;
}
```

### APP内切换语言



1387371333 ： 是appid
testflight测试地址：https://beta.itunes.apple.com/v1/app/1391515055
appstore下载地址：https://itunes.apple.com/app/id1387371333


### 面试题：
▲ 题目1:方法的本质，sel是什么？IMP是什么？两者之间的关系?是什么
▲ 题目2:OC底层以及内存平移问题
▲ 题目3:你对优化iOS界面流畅度有哪些经验 - 谈谈你对异步渲染和离屏渲染的理解
▲ 题目4:聊聊你对 Block 的理解，拷贝和捕获外部变量以及释放流程
▲ 题目5:synchronized 锁是否可以循环加锁，如何实现的？
▲ 题目6:xcode打包ipa，xcode都做了什么，详细说明123步骤

# 1. 百度

- 一面
	- MVC、MVP、MVVM的区别，使用场景
	- NSLayout、Masonry、SpanKit的区别，使用场景
	- ARC内存管理机制
	- 对Runtime的了解
	- 对Runloop的了解
	- 项目中遇到的困难
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 离职原因
	- 你开发的SDK的使用量
	- 用Python做过什么
	- 对开发的这个App有没有自己的看法
	- 最近看了什么书
	- 发展方向(职业规划)
	- 对百度地图了解吗
	- 对加班的看法
	- 你想问的问题
	- 有其他公司的offer吗
	- 想问的问题
- 二面
	- 谈谈你做的自动化测试
	- GCD的几个题目做一下
	- 子线程中创建NSTimer会执行吗
	- 在dealloc中释放NSTimer会怎样
	- NSNoticationCenter不释放监听者着会怎样
	- 自动释放池什么时候释放
	- Runloop何时退出
	- 互斥锁、自旋锁
	- NSLock、递归所、读写锁的区别和使用场景
	- 看过哪些源码
	- NSNoticationCenter的实现原理，如何自定义
	- KVO原理
	- 手写：字符串中寻找是否出现了重复的字符
		- 两层循环
		- hash
	- 设计hash表
	- 想问的问题
- 三面
	- 项目架构
	- 职业规划
	- 遇到的困难
	- 对项目的贡献
	- 离职原因
	- 如何看待加班
	- 和同事有矛盾如何解决
	- 你的优点
	- 你的缺点
	- 想问的问题

# 2. 腾讯

- 一面
	- 谈谈你做的自动化测试
	- Block中捕获全局、静态、实例、局部变量是怎样实现的
	- ARC内存管理机制
	- Runloop
	- Runtime
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 动/静态库分别在哪里占用了时间?
	- 项目中遇到的困难
	- 字符串转数字
	- 你想问的问题

# 3. 富途

- 一面
	- ARC内存管理机制
	- Runloop
	- Runtime
	- 性能优化
	- App体积优化
	- 启动时间优化
	- KVO原理
	- struct和class的区别
	- swift协议
	- 手写快排
	- 手写，数组[1,0,3,0,4,0,0,-2],将0放在数组最前面且不影响非0值的顺序
	- 手写翻转二叉树
	- 绳子粗细不均匀，但烧完一定需要60分钟，如何烧出45分钟。
	- 想问的问题
- 二面
	- 启动时间优化
	- 结构体 { char int int } 占用多少字节，内存对齐是什么
	- int a = 0, 两个线程中各加十次，a=多少，为什么，a的范围是多少?
	- 员工表，18年3月-18年8月工资少发了，现在需要对其补发，手写SQL
	- 25个人有5个跑道，求出最快的三个人，至少需要比赛多少次
	- 有2个玻璃珠和100层楼，玻璃珠摔坏了则无法二次使用，求玻璃球能承受的最大高度，至多需要多少次测试。
	- 1000瓶水，1瓶有毒，老鼠喝水后3天死亡，给3天时间，求至少需要多少只老鼠。
	- 手写二叉搜索树插入函数
	- 求无序数组中最大的K个数
	- 想问的问题

# 4. 有赞

- 一面
 	- Runloop
	- Runtime
	- 消息转发机制
	- 事件传递机制
	- 性能优化
	- App体积优化
	- 启动时间优化
	- KVO原理
	- 组件化
	- 职业规划
	- 想问的问题
- 二面
	- 你做了什么功能，画出并解释流程图和项目结构
	- 你的职业规划
	- 想问的问题
- 三面
	- 项目架构
	- 你的职业规划
	- 想问的问题

# 5. 方直

- 一面
	- Runtime
 	- Runloop
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 启动流程
	- KVO原理
	- 事件传递机制
	- 消息转发机制
	- 自动释放池内部实现
	- Storyboard、classify
	- 想问的问题
- 二面
	- 性能优化
	- 项目架构
	- 你能为公司带来什么
	- 你的价值
	- 你的职业规划
	- 想问的问题

# 6. TCL

- 一面
	- Runloop
	- Runtime
	- OC底层结构
	- 消息转发机制
	- 事件传递机制
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 启动流程
	- KVO原理
	- 组件化
	- load和initlize的区别
	- 两个相同的油漆桶，一个红色一个蓝色，一个勺子，使用勺子从红桶挖一勺到蓝桶并搅拌均匀，此时从蓝桶挖一勺到红桶搅拌均匀，问红桶中的红蓝比和蓝桶中的蓝红比是怎样的
	- 手写归并排序
	- 想问的问题
- 二面
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 组件化
	- 项目的产品角度
	- 项目架构
	- 想问的问题

# 7. 编程猫

- 一面
	- Runloop
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 启动流程
	- KVO原理
	- 暗黑模式适配
	- 了解哪些设计模式
	- 一个按钮会触发网络加载然后更新列表，用MVVM说思路
	- RAC的冷信号和热信号区别
	- 说说自动化测试
	- Bugly解决不了的异常，怎么处理的
	- atomic, weak
	- 链表和数组的区别，队列和栈的区别
	- SwiftUI
	- 想问的问题

# 8. 抖音

- 一面
	- 说一个你做的App有什么功能
	- 说一说用到了AVFoundation的哪些功能
	- AVFoundation相机代理的视频流返回的图片是什么格式，如何显示在屏幕上
	- KVO原理
	- struct和class的区别，如果for循环1000次struct会怎样
	- unowned和weak的区别
	- NSTimer准吗，不准的话会延时调用吗，如何解决
	- AutoRelease对象什么时候释放
	- Runloop什么时候释放
	- Runloop干了什么
	- 自动释放对象在Runloop的哪个阶段释放
	- 野指针如何产生的
	- 使用Block时，为什么会使用__strong或__weak
	- 离屏渲染是什么，如何产生的，如何解决
	- 屏幕上的内容是如何显示的，卡顿是如何产生的，如果解决
	- 以对角线顺序打印二维数组
	- 想问的问题

# 9. 随手

- 一面
 	- Runloop
	- Runtime
	- OC底层结构
	- 消息转发机制
	- 事件传递机制
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 启动流程
	- KVO原理
	- 英文笔试题：给NSString添加一个分类，实现将其转换为NSNumber
	- 英文笔试题：如何产生循环引用
	- 英文笔试题：设计低耦合的<花开蜂猜谜，花闭蜂回家>
	- 英文笔试题：寻找数组中出现次数最多的数值的和
	- 想问的问题
- 二面
 	- 消息转发机制
	- 事件传递机制
	- 性能优化
	- App体积优化
	- 启动时间优化
	- 组件化
	- 向我解释什么是GCD，假设我不懂iOS。
	- 职业规划
	- 想问的问题

1.block的实现详解
2.对象调用方法的整个流程
3.oc在运行时时如何动态生成类的
4.kvo实现的原理
5.锁的作用是什么，oc中有哪几种锁
6.http协议2.0升级了啥 ？
7.tcp的三次握手，分别发送了啥 ？
8.arc原理
9.对像释放的时候，是如何将weak指针置nil ,原理 
10.iOS内存优化
11.网络模型的几层
12.渲染的整个流程 。 (从事件触发开始，越详细越好) （视图渲染的流程）
13.你知道的设计模式有哪些 (mvvm 和mvc的区别)  可以选几个比较经典的设计模式来讲解
14.并行和并发的区别
15.对象方法和实例方法是怎么存放的
16.如果你来监控卡顿，你怎么来实现 。 
17.启动优化流程 
19.autorelase pool的实现原理 
20.runloop的实现原理 
21 view和layer的区别
22. 分类可以添加实例对象吗 ？ 为什么
23 分类的方法是在何时，如何添加到类里面去的 
24.https的整个流程   （重点关注，加密解密， 算法等）
25 离屏渲染的原因和规避