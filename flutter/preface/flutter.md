# Flutter
工欲善其事，必先利其器! Flutter开发工具可以选择 `Android Studio` 和 `VS Code`，当前文档主要介绍Flutter的安装方式和开发工具中的一些快捷键，用来提高开发效率。

## 安装Flutter
,当前也主要介绍MAC电脑中如何安装Flutter,其他系统的安装方式可以[查看官网](https://flutter.cn/docs/get-started/install)。Flutter的安装过程如下：
1. 首先[下载FlutterSDK](https://flutter.dev/docs/development/tools/sdk/releases#macos)
2. 使用`vi ~/.bash_profile`编辑文件,在`.bash_profile`文件,添加`Flutter`SDK的路径，` export PATH=~/Desktop/flutter/bin:$PATH`。如果使用的是zsh，需要配置`$HOME/.zshrc`文件
3. 运行 `source $HOME/.bash_profile `刷新当前终端窗口。**如果你使用的是zsh，终端启动时 `~/.bash_profile` 将不会被加载，解决办法就是修改 `~/.zshrc` ，在其中添加：`source ~/.bash_profile`**
4. 使用`flutter doctor`检查需要安装的依赖项

运行`flutter doctor`确认安装好之后，可以通过开发工具创建Flutter项目或者通过命令行创建Flutter项目,Flutter中常用的一些命令:

作用 | 命令
------- | -------
创建xxx项目 | `flutter create xxx`
检查当前电脑的测试设备 | `flutter devices`
打开iOS模拟器 | `open -a Simulator`
运行项目 | cd到对应的文件夹，使用`flutter run`
运行指定设备 | `flutter run -d 设备id `
终止运行 | `q`
热重载 | `r`
清除终端输出的信息 | `command + k`
清理缓存 | `flutter clean`
查看Flutter版本 | `flutter --version`
Flutter升级 | `flutter upgrade`

##  Android Studio 快捷键
Android studio 自动补全插件`Flutter snipets`,AS可以在保存代码的时候自动格式化，Setting>Language & Frameworks >Flutter中选中`Format Code on Save`选项。
作用 | 快捷键 
------- | ------- 
快速创建Widget | 输入 stf 或者 stl 出现提示后按回车
快读修复 | `option + 回车`
自动生成构造函数 | `选中 final 参数，option + 回车`
添加父组件、变为子组件、删除子组件 | `option + 回车`
搜索 | `双击shift`
查看最近打开的文件 | `command + E`
重命名 | `fn + shift + f6 `
查看当前类结构 | `command +f12`
查看源码 | `command + 鼠标点击`
查看类的子类 | 选中类,`command + B` 或者 `option + command +B`
将代码更新到模拟器 | 选中模拟器`command + R`
导入类的快捷键 | 光标放到类上 `option + enter`
前进后退 | 后退:`option+command+方向左键`,前进:`option+command+方向右键`
全局搜索 | `commnad + shift + F`
全局替换 | `command + shift + R`
查找引用 | `option + shift + F7`


##  VSCode 快捷键
作用 | 快捷键 
------- | ------- 
快速创建Widget | 输入 stf 或者 stl 出现提示后按回车
快读修复 | `option + .`
自动生成构造函数 | `选中 final 参数，option + .`
添加父组件、变为子组件、删除子组件 | `option + .`
重新打开关闭的编辑页面 | `command + shift + T`
通过匹配文本打开文件 | `command + T`
代码格式化 | `command + shift + F `
打开console | `command +J`
查看源码 | `command + 鼠标点击`
查看类的子类 | 选中类,`command + F12`
导入类的快捷键 | 光标放到类上 `command + .`
前进后退 | 后退:`command + -`
全局搜索 | `commnad + shift + F`
交换代码位置 | `option + 上下键`
快速复制当前行 | `option + shift + 上下键`

>如果是Windows系统，将command 换成Ctrl, option 换成 Alt 即可。VS Code工具自动补全同样可以使用`Flutter snippets`插件


## 安卓设置导航栏透明
```dart
if (Platform.isAndroid) {
  //设置Android头部的导航栏透明
  SystemUiOverlayStyle systemUiOverlayStyle =
      SystemUiOverlayStyle(statusBarColor: Colors.transparent);
  SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
}
```

## 高斯模糊效果 BackdropFilter sigmaX和sigmaY跟高斯模糊的程度有关
高斯模糊当做前景：只需要把 BackdropFilter 的 child 设置为一个 Container()，并且设置上颜色（我这里使用的是 Colors.white10），然后放在 Stack 中就ok啦。

```dart
BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
        child: Column()
        );
```

## 将Flutter添加到现有项目中
使用cocoaPods遇到错误`CocoaPods could not find compatible versions for pod "xxPlugin""`,这是因为 `flutter build ios` 的时候会运行 `pod install` 命令，而 ios（或者.ios）下的 PodFile文件。会根据  `.ios/Flutter/FlutterPluginRegistrant/` 本地引用`FlutterPluginRegistrant`。
而 `FlutterPluginRegistrant.podspec` 内会引用所有的 plugin（有ios和android代码）,查看下所有的 plugin 的 podspec 中指定的 ios 版本要求，是否高于 ios 文件夹下 PodFile 的版本，如果高于，修改成对应版本即可


## 遇到的问题
1.在Row中使用IconButtom的时候，提示No Material widget found.
这是因为IconButton属于Material类型的widget，而我们脚手架中并不包含Material。解决方法，在父分支上加上Material就可以了

2. 禁止横屏
  
```dart
void main() {
    WidgetsFlutterBinding.ensureInitialized();
   SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
    .then((_) {
      runApp(new MyApp());
    });
}
```

3. 读取json文件
首先需要跟配置图片资源一样在`pubspec.yaml`文件中添加配置。然后通过编码解析成json

```dart
Future<List<Anchor>> getAnchors() async {
    //1. 读取json文件
    String jsonString = await rootBundle.loadString("assets/test.json");

    //2.转成List或Map类型
    final jsonResult = json.decode(jsonString);

    //遍历List，并且转成Anchor对象放到另一个List中
    List<Anchor> anchors = new List();
    for(Map<String,dynamic> map in jsonResult) {
      anchors.add(Anchor.withMap(map));
    }

    return anchors;
  }
```
## flutter-android启动时全屏显示图片,状态栏透明
更改 `android\app\src\main\res\drawable\launch_background.xml`
 

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@android:color/white" />
    <item>
        <bitmap
            android:gravity="fill" <!-- 这句 -->
            android:src="@mipmap/launcher" />  <!-- 启动图放mipmap-**hdpi目录中 -->
    </item>
</layer-list>
```

`更改 E:\flu\adrtc\android\app\src\main\res\values\styles.xml`
 

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="LaunchTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- api 21 以后才支持下两项-->
        <item name="android:navigationBarColor">@android:color/transparent</item>
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowBackground">@drawable/launch_background</item>
    </style>
    <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
        <item name="android:windowBackground">@android:color/white</item>
    </style>
</resources>
```

## 弹窗dialog
弹窗需要使用方法 `showDialog`,返回一个widget，可以自定义，也可以使用系统的控件，相当于给你提供一个view，context表示在那一层进行显示。
```dart
showDialog(context: context, builder: (ctx){
                  return createDialog();
 });

  // 弹窗widget
  Widget createDialog(){
    return AlertDialog(
      title: Text("缓存清除完毕"),
      actions: [
        TextButton(onPressed:(){
          Navigator.pop(context);
        }, child: Text("确定",style: TextStyle(fontSize: 16,fontWeight: FontWeight.bold,color: Colors.black),))
      ],
    );
  }

```

Flutter 打多个渠道包。
Android打渠道包，可以使用美团出品的`walle`。其原理是apk分四个段，第二段数据可以被修改，在程序安装之后，利用dex读取apk中第二段存储的数据，用来区分渠道，walle的原理就是这样。
[新一代开源Android渠道包生成工具Walle](https://tech.meituan.com/2017/01/13/android-apk-v2-signature-scheme.html), dex是程序，在程序安装之后，apk文件并没有被删除，被存储在系统内存中，打开软件时可以apk文件的内容。


## Flutter2.0之后报错
1. `inheritFromWidgetOfExactType` 修改为 `context.dependOnInheritedWidgetOfExactType(aspect: _xxxProvider)`
2. `ancestorWidgetOfExactType` 修改为 `SliverAppBar sliverAppBar = context.ancestorWidgetOfExactType(SliverAppBar);`
3. Error: No named parameter with the name ‘nullOk’.原因是`localeOf()`的`nullOk`参数在新版中被删除了，不需要了。
4. `resizeToAvoidBottomPadding` 更改为 `resizeToAvoidBottomInset=false`


## Flutter Incorrect use of ParentDataWidget
经过排查后发现是Expanded、Flexible等组件，在“Container、Padding、Stack”组件中导致的。
## 空安全 The default value of an optional parameter must be constant.
一个数组初始化，竟然还要const
```
class SectionData{
  String title = "";
  List<dynamic> datas = [];
  SectionData({this.title = "",this.datas = const []});
}
```

## GestureDetector 点击空白处没有效果
查了一下发现 GestureDetector 有个 behavio r属性，点进去，看一下，包括这三种模式
* deferToChild: 只有当前容器中的child被点击时才会响应点击事件,默认是这个
* opaque:  点击整个区域都会响应点击事件，但是点击事件不可穿透向下传递
* translucent： 点击整个区域都会响应点击事件，并且向下传递点击事件

## 数据处理 json 转模型

![模型生成网址](https://czero1995.github.io/json-to-model/)
vscode 模型生成插件 `Json to Dart Model`插件。


在lib同级目录下创建assets文件,在pubspec文件下创建对应的 `assets/`描述。加载本地文件时，，使用rootBundle.loadString("assets/test.json")。