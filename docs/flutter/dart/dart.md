# Dart前言

一门编程语言无非是以下这几个问题：
```markdown
1. 怎么定义一个变量
2. 怎么定义一个结构体
3. 怎么定义一个方法以及方法中如何添加参数及返回值
4. 怎么使用条件语句和循环语句
5. List、Map、Set的使用方式
6. 怎么定义一个类
    6.1 类中怎么添加方法和变量,如何定义类方法和实例方法
    6.2 类的构造函数
    6.2 类的继承关系
    6.3 类的单例模式
    ...
```

每一门编程语言创建变量和类的关键字大致都一样，只要了解了一门编程语言，学习其他的编程语言上手都很快，重点主要在与 类 ,类一定要熟悉，这个是比较重要的，其他不熟悉的API可以直接查询[官方文档](https://dart.cn/guides/language/language-tour)或者谷歌百度。

List和Map在编程中使用的也很频繁，主要是增删改查,可以查看看相关的初始化以及常用的方法，其他的API需要用到的就看官方文档

类在每一门编程语言中都是很重要的，毕竟我们是面向对象开发。每一门编程语言都有自己的特点，比如OC是一门动态语言，可以通过运行时创建一个之前不存在的类。如何创建一个类以及它们的继承关系和搭配关系直接关系到代码的结构和质量。在iOS开发中不存在抽象类,所以对抽象类的使用是我的一个软肋。**熟悉类的使用能更好的使用这门语言**。

除核心库外，Dart 还通过一整套软件包提供了许多 API。 Dart 团队发布了许多有用的补充包，例如：
* [characters (字符)](https://pub.flutter-io.cn/packages/characters)
* [intl (国际化)](https://pub.flutter-io.cn/packages/intl)
* [http (http 请求)](https://pub.flutter-io.cn/packages/http)
* [crypto (哈希加密)](https://pub.flutter-io.cn/packages/crypto)
* [markdown](https://pub.flutter-io.cn/packages/markdown)

此外，第三方发布者和更广泛的社区也发布了上千个软件包，支持诸如此类功能：
* [XML](https://pub.flutter-io.cn/packages/xml)
* [Windows integration (Windows API 调用)](https://pub.flutter-io.cn/packages/win32) 
* [SQLite](https://pub.flutter-io.cn/packages/sqflite)
* [compression (压缩)](https://pub.flutter-io.cn/packages/archive)

在 Flutter 网站，查看 package 的使用。或者使用 Pub 网站 查找 [Flutter package](https://pub.flutter-io.cn/flutter/packages)。