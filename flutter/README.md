## Flutter
Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。可以看做是一个纯粹的UI框架来使用。VSCode安装插件Flutter/Dart/Code Runner,按F5进行调试。

## Mac平台安装Flutter
1. 首先[下载SDK](https://flutter.dev/docs/development/tools/sdk/releases#macos)
2. 使用`vi ~/.bash_profile`编辑文件,在`.bash_profile`文件,添加`Flutter`SDK的路径，` export PATH=~/Desktop/flutter/bin:$PATH`。如果使用的是zsh，需要配置`$HOME/.zshrc`文件
3. 运行 `source $HOME/.bash_profile `刷新当前终端窗口。**如果你使用的是zsh，终端启动时 `~/.bash_profile` 将不会被加载，解决办法就是修改 `~/.zshrc` ，在其中添加：`source ~/.bash_profile`**
4. 使用`flutter doctor`检查需要安装的依赖项

## 创建项目
1. 使用`flutter create helloworld`创建 helloworld项目，
2. 使用`flutter devices`检查当前电脑的测试设备，如果没有的打开iOS模拟器`open -a Simulator`
3. cd 到对应的文件夹，使用`flutter run`运行项目

## 学习Flutter推荐网址
* [Flutter实战电子书](https://book.flutterchina.club/#%E7%BC%98%E8%B5%B7) 讲解的比较细，查看一些控件的使用可以从这里看。这本书写的比较早，很多API都过时了，仅作为参考。
* [Flutter官方中文网](https://flutter.cn/docs/cookbook)
* [Flutter中的图标集合](https://fonts.google.com/icons?selected=Material+Icons)
* [Flutter|老孟](http://laomengit.com/guide/widgets/TextField.html)
* [Flutter官方所有的Widget](https://flutter.dev/docs/development/ui/widgets)

## 常用的第三方
```dart
  dio: ^4.0.0 #网络请求 >>>
  share: ^2.0.1 #分享 >>>
  pull_to_refresh: ^2.0.0 #上拉加载 >>>
  shake_animation_widget: ^1.0.0 #抖动动画
  animations: ^2.0.0 #动画
  cached_network_image: ^3.0.0 #图片缓存 >>>
  shared_preferences: ^2.0.6 #本地存储 >>>
  package_info: ^2.0.2 #获取APP包名、版本号等信息 >>>
  webview_flutter: ^2.0.8 #webView
  path_provider: ^2.0.2 #清除缓存
  photo_view: ^0.11.1 #图片预览工具
  google_mobile_ads: ^0.13.0 #谷歌广告
  fijkplayer: ^0.9.0 # 视频播放器，使用ijk播放器进行封装可以播放rtmp格式
  fluttertoast: ^8.0.7 # toast 弹窗提示
  provider: ^5.0.0  #数据传递 >>>
  sqflite: ^2.0.0+3  #sqlite数据库 >>>
  permission_handler: ^8.1.3  #权限请求 >>>
  url_launcher: ^6.0.9  #可以打开网页，发送邮件，拨打电话>>>
  fluro: ^2.0.3 #第三方路由控件
  cupertino_icons: ^1.0.2
  lpinyin: ^2.0.3   #汉字转拼音库，转失败会报错，需要处理
  intl: ^0.17.0   # 配合flutter_localizations 进行使用，多语言适配，使用插件Flutter_intl
```