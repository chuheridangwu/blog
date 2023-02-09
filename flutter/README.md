# 关于Flutter
Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter自身只是一个纯粹的UI框架。

文档内容是在学习过程中的一些积累，一些文档内容来自 [Dart的官方文档](https://dart.cn/guides/language/language-tour)、[《Flutter实战·第二版》](https://book.flutterchina.club/chapter14/flutter_app_startup.html)、[B站王叔不秃](https://space.bilibili.com/589533168/?spm_id_from=333.999.0.0),这些对我学习Flutter都提供了很大的帮助。

我自己学习Flutter也算有一段时间了，断断续续的学，因为自身有开发经验，所以在Dart语言这里就没怎么看，直接上手Flutter。在转换语言的时候，总是带一些以前的编程思维，搞的不伦不类。在转换编程语言的时候，还是要打好语言基础。

#### 学习路线
1. 首先要掌握好Dart这门语言的特性，尤其是函数和类。数组、字典、语法糖可以在以后写项目的过程中慢慢积累
2. Flutter可以看做一个UI库，里面包含了各种各样的Widget,当然也存在了很多坑。学Flutter的过程可以
   - 先学习Flutter的布局原理，知道它是怎么控制它的小部件的
   - 再熟悉常用的Widget，根据Widget的分类进行学习,按钮、图片、输入框、导航、页面传值和回调、动画、滚动视图
   - 熟悉之后写一些常见的页面布局
3. 写一些小项目进行练手，熟悉一些常用的第三方和熟悉Flutter的项目结构。
4. 跟原来的项目做一些交互，将Flutter使用到现有的项目中。

#### 关于Dart
如何学习一门新语言,有时候看很多大佬会很多们语言，尤其是不单单会写，而是理解它的一些特性，可以直接进行教学，很奇怪他们是怎么学习的。

首先说一下我对语言的理解，一门编程语言可以看成一本定义规则的书，这本书中描述了怎么去写一个变量，怎么去定义一个方法，怎么去定义一个类 等等。

当我们把这本书读懂之后，我们可以在这本书的基础上去进行创作。这本书可以当做是房屋的地基。**在学习Flutter之前，需要先将Dart语言学清楚**。

#### 关于Flutter
因为自身有iOS开发经验，所以在Flutter的学习过程中，不自觉的会将Flutter中的控件和iOS中的控件进行对比。如果有开发经验的话，还是看一下Flutter的开发文档比较好，Flutter官方有整理出Flutter跟安卓、iOS之中的开发指南，方便快速上手。毕竟**磨刀不误砍柴工**。
* [Flutter for Android 开发者](https://flutterchina.club/flutter-for-android/)
* [给 Android 开发者的 Flutter 指南](https://flutter.cn/docs/get-started/flutter-for/android-devs)
* [Flutter for iOS 开发者](https://flutterchina.club/flutter-for-ios/)
* [给 iOS 开发者的 Flutter 指南](https://flutter.cn/docs/get-started/flutter-for/ios-devs)

Flutter的控件和iOS中的控件概念上是不一样的，在Flutter中万物皆是 Widget ,即使是一些功能组件也是Widget,跟iOS中的View有很大的区别，理解起来很快，但是在使用上思想上转变比较慢。

### 推荐网址
* [《Flutter实战·第二版》](https://book.flutterchina.club/) 讲解的比较细，查看一些控件的使用可以从这里看。这本书写的比较早，很多API都过时了，仅作为参考。
* [Flutter 新建一个App](https://www.yuque.com/weiza1026/zprvt8/hu5xpq)
* [Flutter系列教程](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg5MDAzNzkwNA==&action=getalbum&album_id=1566028536430247937&scene=173&from_msgid=2247483692&from_itemidx=1&count=3&nolastread=1#wechat_redirect) coderwhy的公众号教程
* [Flutter官方中文网](https://flutter.cn/docs/cookbook)
* [Flutter中文网](https://flutterchina.club/get-started/install/) 用户搭建的Flutter中文社区
* [Flutter中的图标集合](https://fonts.google.com/icons?selected=Material+Icons)
* [Flutter|老孟](http://laomengit.com/guide/widgets/TextField.html)
* [Flutter官方所有的Widget](https://flutter.dev/docs/development/ui/widgets)
* [第三方库网站](https://pub.dev/)