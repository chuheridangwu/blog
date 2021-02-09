# Xcode
Xcode是iOS开发必备的开发工具，在项目中，经常会遇到各种配置和路径问题，在这里做一下讲解。

## 配置
xcode常见的一些配置，平时经常遇到找不到库、找不到头文件，可能都是这些配置导致的

* ${SRCROOT}：代表的是项目根目录下
* ${PROJECT_DIR}：代表的是整个项目
* ${PROJECT_FILE_PATH}表示project的当前路径，相当于$(PROJECT_DIR)/$(PROJECT_NAME).xcodeproj
* $(PROJECT_NAME) ： 项目名字
* ${PODS_ROOT}  : 项目使用cocoapods，pod文件目录
* $(inherited)：添加目录的时候写上 “$(inherited)” 就是表示路径自己从frameworks里面读取。 默认的情况下路径配置是不被 Targets 继承的，只有当Targets的设置加入了$(inherited)时才被继承，继承来自更高一级的配置。


## 路径
Framework Search Paths
附加到项目中的framework 的搜索路径。

Library Search Paths
附加到项目中的第三方Library的搜索路径。

Header Search Path
头文件的搜索路径。

User Header Search Paths
只有在Always Search User Paths为Yes时才会被搜索。

## 查看汇编代码的两种方式
* 进入断点查看汇编的方式 `Debug -> Debug Workflow -> Always show Disassembly`，进入断点时会显示汇编代码
* 通过将.m文件转成汇编文件的方式 `Product -> Perform Action -> Assemble 文件名.m`,会将对应的文件转成汇编文件。如果想看具体的行号，搜索`m:行号`

## Instruments — Time Profiler使用 排查耗时代码
有时候程序在某个时间运行很慢，通过Time Profiler工具可以对耗时代码进行排查，比如我在做PK时，需要使用YY_Image加载webp动画，webp动画解码的时候特别耗时，通过`Time Profiler`工具可以直接定位到代码。
打开方式：`Instruments` -> `Time Profiler`

![](./imgs/ios_img_43.jpg)

* `Separate by State :` 线程分离，状态分开显示 ，例如：Running状态，
* `Separate by Thread :` 线程分离, 每个线程分开显示，只有这样 才能在调用路径中能够清晰看到占用CPU耗时最大的线程.(默认勾选)
* `Invert Call Tree :` 堆栈信息显示顺序,默认是`FunA { FunB { FunC } }`,勾选后堆栈顺序是`C->B->A`
* `Hide System Libraries :` 隐藏系统调用,只关注自己代码的耗时(建议勾选，方便查看)
* `Flatten Recursion : `递归函数, 每个堆栈跟踪一个条目
* `Top Functions :` 显示某个函数的总时间，A函数内调用多个函数时，可以显示A函数的总耗时

## 设置环境变量
`Product` -> `Scheme` -> `Edit Scheme` -> `Run` -> `Environment Variables`

## 关闭ARC
选中`Build Settings`,选择 `ALL` 和 `Combined` ，搜索 `Automatic Reference Counting`，将值从YES 更改为 NO;

Xcode 提供了一个迁移工具，可以自动将MRC代码转换为ARC代码，选择 `Edit > Convert > To Objective-C ARC`

使用ARC作为默认方式的项目,可以使用`-fno-objc-arc`编译器标志为指定文件禁用ARC
使用MRC作为默认方式的项目,可以使用`-fobjc-arc`编译器标志为指定文件启用ARC

## 开启僵尸对象
`Product` -> `Scheme` -> `Edit Scheme` -> `Run` -> `Diagnostics` -> `Zombie Objects`

## 开启LinkMap
生成LinkMap条件，`Build Settings` 
 `Path to Link Map File`  LinkMap 文件保存地址
 `Write Link Map File`  开启LinkMap
可借助第三方工具解析LinkMap文件： https://github.com/huanxsd/LinkMap
