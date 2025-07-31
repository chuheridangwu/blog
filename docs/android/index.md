# 安卓开发过程体验

> 为什么要学习安卓

iOS上架的限制比较多，目前APP包的分发一般是下面四个渠道，appstore、企业包、testflight、超级签名（通常是把设备当做开发人员的测试设备，成本较大，每个账号只能绑定100个测试设备）

很多时候你做了APP功能无法上架，给人的心里打击比较大，造成开发成本也比较高

在做国外版的app过程中，发现国外使用安卓手机的比例还是比较大的，安卓和苹果手机的体验差别也在减少，尝试安卓开发也未尝不可

> 学习安卓过程中的体验

学习安卓的体验还是不错的，学习过程是看`Android 第一行代码(第2版)`书和哔哩哔哩上看的`程序员拉大锯`的视频学习的，

`Android 第一行代码(第2版)`看过之后会对安卓开发的基本流程和开发工具、常用控件等有一些了解，`程序员拉大锯`的视频有一个完整的小项目带你体验。跟着敲一遍之后基本对安卓的界面、项目结构、常用的三方框架比较熟悉了。

学习过程中会面临是使用java语言开发还是kotlin进行开发，因为kotlin找到的项目资料视频较少，还是先根据java进行学习了，语言只是一个工具而已。

项目使用的是`mvp`架构，现在好像已经落伍了，都是用`mvvm`,但对我目前来说已经完全足够了。

> 学习成果

在此基础上完成了自己第一个APP`图片大全`,里面包含了RecyclerView的使用、自定义View、值传递、数据保存、原生AdMob广告、Retrofit、BaseRecyclerViewAdapterHelper 第三方的使用等等。

项目虽小，在实际开发的工程中还是遇到了一些小问题。比如 `保存不同的数据模型时，在获取的时候怎么转换成原来的模型`、`在不同的fragment中切换全屏`等，不过都一一解决了。对自己的android开发经验帮助不小。

> 安卓自动化

安卓自动化操作可以使用autojs，可以达到自动操作APP。比如自动刷抖音和快手。autojs分免费版和pro版本，Pro版本需要付费，并且不支持快手、淘宝、抖音等应用，免费版现在作者不维护

相关资源：

```
vscode插件是：Auto.js-VSCodeExt-Fixed
https://zhuanlan.zhihu.com/p/90065914   Auto.js快速入门实战教程
https://www.jianshu.com/p/d2ad3ce9cf87  2019-04-25 Auto js 通过VS Code电脑进行调试
apk 下载 --  https://github.com/Ericwyn/Auto.js/releases
https://github.com/hyb1996/Auto.js  // github
https://zhuanlan.zhihu.com/p/237697371   知乎上的介绍
https://hyb1996.github.io/AutoJs-Docs/#/   autojs免费版的文档
https://blog.csdn.net/qq_20191467/article/details/113836532     autojs 打包
```
