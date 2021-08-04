# Flutter
主要针对Flutter中常用的控件布局和第三方做一些讲解。方便以后快速查看文档代码。目前的一些网站对Flutter这些讲解的挺好了，这里主要是看能不能做一些简化。方便以后自己查找。

1. 如果想给一个按钮设置宽和高，使用一个Container包裹住一个按钮就可以了
2. 必传参数不传的话编译会报错，选传参数使用@required修饰不传只会报警告



## CustomScrollView
`CustomScrollView`是可以使用`Sliver`来自定义滚动模型（效果）的组件。它可以包含多种滚动模型，举个例子，假设有一个页面，顶部需要一个`GridView`，底部需要一个`ListView`。使用`CustomScrollView`可以将它们粘合在一起。

```dart
import 'package:flutter/material.dart';

class CustomScrollViewTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //因为本路由没有使用Scaffold，为了让子级Widget(如Text)使用
    //Material Design 默认的样式风格,我们使用Material作为本路由的根。
    return Material(
      child: CustomScrollView(
        slivers: <Widget>[
          //AppBar，包含一个导航栏
          SliverAppBar(
            pinned: true,
            expandedHeight: 250.0,
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Demo'),
              background: Image.asset(
                "./images/avatar.png", fit: BoxFit.cover,),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(8.0),
            sliver: new SliverGrid( //Grid
              gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, //Grid按两列显示
                mainAxisSpacing: 10.0,
                crossAxisSpacing: 10.0,
                childAspectRatio: 4.0,
              ),
              delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建子widget      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.cyan[100 * (index % 9)],
                    child: new Text('grid item $index'),
                  );
                },
                childCount: 20,
              ),
            ),
          ),
          //List
          new SliverFixedExtentList(
            itemExtent: 50.0,
            delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建列表项      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: new Text('list item $index'),
                  );
                },
                childCount: 50 //50个列表项
            ),
          ),
        ],
      ),
    );
  }
}
```

## 监听滚动的方法
* Controller:可以设置默认滚动值，监听滚动的位置，不能监听开始滚动
* NotificationListener

```dart
class _DemoTestState extends State<DemoTest> {

  ScrollController _controller = ScrollController();

  @override
    void initState() {
      super.initState();
      _controller.addListener(() {
        print("当前滚动的距离: ${_controller.offset}");
      });
    }

  @override
  Widget build(BuildContext context) {
    return  Material(
      child: ListView(
        controller: _controller,
        children: List.generate(100, (index){
          return Text("index --- $index");
        }),
      )
    );
  }
}

// 使用NotificationListener 的方式监听滚动
  @override
  Widget build(BuildContext context) {
    return  Material(
      child: NotificationListener(
        onNotification: (ScrollNotification notification){
          if (notification is ScrollStartNotification) { //开始滚动
            
          } else if (notification is ScrollUpdateNotification) { //正在滚动
            
          } else if(notification is ScrollEndNotification){ //结束滚动
          
          }
          return true;
        },
        child: ListView(
          controller: _controller,
          children: List.generate(100, (index){
            return Text("index --- $index");
          }),
        ),
      )
    );
  }
}
```

Flutter处理I/O操作时使用的是非阻塞式调用,Dart中异步操作的主要使用Future/async、await,Future跟前端的Promise基本一致



##  屏幕常见变量

```dart
  MediaQueryData mq = MediaQuery.of(context);
  // 屏幕密度
  pixelRatio = mq.devicePixelRatio;
  // 屏幕宽(注意是dp, 转换px 需要 screenWidth * pixelRatio)
  screenWidth = mq.size.width;
  // 屏幕高(注意是dp)
  screenHeight = mq.size.height;
  // 顶部状态栏, 随着刘海屏会增高
  statusBarHeight = mq padding.top;
  // 底部功能栏, 类似于iPhone XR 底部安全区域
  bottomBarHeight = mq.padding.bottom;

/// material 系统保存的常量值里面查看
export 'src/material/constants.dart’;
/// AppBar 高度
const double kToolbarHeight = 56.0;
/// BottomNavigationBar 高度
const double kBottomNavigationBarHeight = 56.0;

/// 安全内容高度(包含 AppBar 和 BottomNavigationBar 高度)
double get safeContentHeight => screenHeight - statusBarHeight - bottomBarHeight;
/// 实际的安全高度
double get safeHeight => safeContentHeight - kToolbarHeight - kBottomNavigationBarHeight;
```

## SafeArea  适配安全区域的View

## 安卓设置导航栏透明
```dart
if (Platform.isAndroid) {
  //设置Android头部的导航栏透明
  SystemUiOverlayStyle systemUiOverlayStyle =
      SystemUiOverlayStyle(statusBarColor: Colors.transparent);
  SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
}
```

## Tabbar
```dart
  const TabBar({
    Key key,
    @required this.tabs,//显示的标签内容，一般使用Tab对象,也可以是其他的Widget
    this.controller,//TabController对象
    this.isScrollable = false,//是否可滚动
    this.indicatorColor,//指示器颜色
    this.indicatorWeight = 2.0,//指示器高度
    this.indicatorPadding = EdgeInsets.zero,//底部指示器的Padding
    this.indicator,//指示器decoration，例如边框等
    this.indicatorSize,//指示器大小计算方式，TabBarIndicatorSize.label跟文字等宽,TabBarIndicatorSize.tab跟每个tab等宽
    this.labelColor,//选中label颜色
    this.labelStyle,//选中label的Style
    this.labelPadding,//每个label的padding值
    this.unselectedLabelColor,//未选中label颜色
    this.unselectedLabelStyle,//未选中label的Style
    }) : assert(tabs != null),
    assert(isScrollable != null),
    assert(indicator != null || (indicatorWeight != null && indicatorWeight > 0.0)),
    assert(indicator != null || (indicatorPadding != null)),
    super(key: key);
```

TabbarView默认是全屏，使用sizeBox限制高度
```dart
SizedBox(
    height: 220,
    child: DefaultTabController(
      length: _giftGroups.length,
      child: TabBarView(
          controller: _tabController,
          children: _giftGroups.map((giftGroup) {
            return itemView(giftGroup.gifts);
          }).toList()),
    ),
  );
```

flutter column row布局的列表自适应宽高  mainAxisSize: MainAxisSize.min

## 高斯模糊效果 BackdropFilter sigmaX和sigmaY跟高斯模糊的程度有关

高斯模糊当做前景：只需要把 BackdropFilter 的 child 设置为一个 Container()，并且设置上颜色（我这里使用的是 Colors.white10），然后放在 Stack 中就ok啦。

```dart
BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
        child: Column()
        );
```

## 分割线 Divider
```dart
Divider(height: 1.0,indent: 20.0,endIndent: 20,color: Colors.white,),
```



## Decoration  背景设定（边框、圆角、阴影、形状、渐变、背景图像等

```dart
BoxDecoration:实现边框、圆角、阴影、形状、渐变、背景图像
ShapeDecoration:实现四个边分别指定颜色和宽度、底部线、矩形边色、圆形边色、体育场（竖向椭圆）、 角形（八边角）边色
FlutterLogoDecoration:实现Flutter图片
UnderlineTabindicator:下划线
```
2 介绍
一个背景装饰对象，相当于Android中的shape.xml，定制各种各样的背景（边框、圆角、阴影、形状、渐变、背景图像）。

3 BoxDecoration构造方法：

```dart
  const BoxDecoration({
    this.color, // 底色
    this.image, // 图片
    this.border, 边色
    this.borderRadius, // 圆角度
    this.boxShadow, // 阴影
    this.gradient, // 渐变
    this.backgroundBlendMode, // 混合Mode
    this.shape = BoxShape.rectangle,  // 形状
  }) 

```3.1 边框+圆角:
```dart
decoration: new BoxDecoration(
  border: new Border.all(color: Color(0xFFFF0000), width: 0.5), // 边色与边宽度
  color: Color(0xFF9E9E9E), // 底色
  //        borderRadius: new BorderRadius.circular((20.0)), // 圆角度
  borderRadius: new BorderRadius.vertical(top: Radius.elliptical(20, 50)), // 也可控件一边圆角大小
),

```3.2 阴影：
```dart
decoration: new BoxDecoration(
    border: new Border.all(color: Color(0xFFFF0000), width: 0.5), // 边色与边宽度
// 生成俩层阴影，一层绿，一层黄， 阴影位置由offset决定,阴影模糊层度由blurRadius大小决定（大就更透明更扩散），阴影模糊大小由spreadRadius决定
    boxShadow: [BoxShadow(color: Color(0x99FFFF00), offset: Offset(5.0, 5.0),    blurRadius: 10.0, spreadRadius: 2.0), BoxShadow(color: Color(0x9900FF00), offset: Offset(1.0, 1.0)), BoxShadow(color: Color(0xFF0000FF))],
),

```3.3 形状（圆形与矩形）：
```dart
decoration: new BoxDecoration(
  border: new Border.all(color: Color(0xFFFFFF00), width: 0.5), // 边色与边宽度
  color: Color(0xFF9E9E9E), // 底色
  //        shape: BoxShape.circle, // 圆形，使用圆形时不可以使用borderRadius
  shape: BoxShape.rectangle, // 默认值也是矩形
  borderRadius: new BorderRadius.circular((20.0)), // 圆角度
),

```3.4 渐变（环形、扫描式、线性）：
```dart
decoration: new BoxDecoration(
  border: new Border.all(color: Color(0xFFFFFF00), width: 0.5), // 边色与边宽度
// 环形渲染
  gradient: RadialGradient(colors: [Color(0xFFFFFF00), Color(0xFF00FF00), Color(0xFF00FFFF)],radius: 1, tileMode: TileMode.mirror)
//扫描式渐变
//        gradient: SweepGradient(colors: [Color(0xFFFFFF00), Color(0xFF00FF00), Color(0xFF00FFFF)], startAngle: 0.0, endAngle: 1*3.14)
// 线性渐变
//        gradient: LinearGradient(colors: [Color(0xFFFFFF00), Color(0xFF00FF00), Color(0xFF00FFFF)], begin: FractionalOffset(1, 0), end: FractionalOffset(0, 1))
),

```3.4 背景图像：
```dart
decoration: new BoxDecoration(
  border: new Border.all(color: Color(0xFFFFFF00), width: 0.5), // 边色与边宽度
  image: new DecorationImage(
  image: new NetworkImage('https://avatar.csdn.net/8/9/A/3_chenlove1.jpg'), // 网络图片
  // image: new AssetImage('graphics/background.png'), 本地图片
  fit: BoxFit.fill // 填满
  //          centerSlice: new Rect.fromLTRB(270.0, 180.0, 1360.0, 730.0),// 固定大小
  ),
),
```

## 将Flutter添加到现有项目中
使用cocoaPods遇到错误`CocoaPods could not find compatible versions for pod "xxPlugin""`,这是因为 `flutter build ios` 的时候会运行 `pod install` 命令，而 ios（或者.ios）下的 PodFile文件。会根据  `.ios/Flutter/FlutterPluginRegistrant/` 本地引用`FlutterPluginRegistrant`。
而 `FlutterPluginRegistrant.podspec` 内会引用所有的 plugin（有ios和android代码）,查看下所有的 plugin 的 podspec 中指定的 ios 版本要求，是否高于 ios 文件夹下 PodFile 的版本，如果高于，修改成对应版本即可

## TextField 的属性
这个破玩意属性太多了，找的心累。TextField样式自带下划线背景，在decoration中设置`border: InputBorder.none`即可去掉。点击空白处让收回键盘，在最外层添加点击事件，调用`FocusScope.of(context).requestFocus(FocusNode())`让TextField是去焦点。
```dart
 const TextField({
    Key key,
    this.controller,    //编辑框的控制器，跟文本框的交互一般都通过该属性完成，如果不创建的话默认会自动创建
    this.focusNode,  //用于管理焦点
    this.decoration = const InputDecoration(),   //输入框的装饰器，用来修改外观
    TextInputType keyboardType,   //设置输入类型，不同的输入类型键盘不一样
    this.textInputAction,   //用于控制键盘动作（一般位于右下角，默认是完成）
    this.textCapitalization = TextCapitalization.none,
    this.style,    //输入的文本样式
    this.textAlign = TextAlign.start,   //输入的文本位置
    this.textDirection,    //输入的文字排列方向，一般不会修改这个属性
    this.autofocus = false,   //是否自动获取焦点
    this.obscureText = false,   //是否隐藏输入的文字，一般用在密码输入框中
    this.autocorrect = true,   //是否自动校验
    this.maxLines = 1,   //最大行
    this.maxLength,   //能输入的最大字符个数
    this.maxLengthEnforced = true,  //配合maxLength一起使用，在达到最大长度时是否阻止输入
    this.onChanged,  //输入文本发生变化时的回调
    this.onEditingComplete,   //点击键盘完成按钮时触发的回调，该回调没有参数，(){}
    this.onSubmitted,  //同样是点击键盘完成按钮时触发的回调，该回调有参数，参数即为当前输入框中的值。(String){}
    this.inputFormatters,   //对输入文本的校验
    this.enabled,    //输入框是否可用
    this.cursorWidth = 2.0,  //光标的宽度
    this.cursorRadius,  //光标的圆角
    this.cursorColor,  //光标的颜色
    this.keyboardAppearance,
    this.scrollPadding = const EdgeInsets.all(20.0),
    this.dragStartBehavior = DragStartBehavior.down,
    this.enableInteractiveSelection,
    this.onTap,    //点击输入框时的回调(){}
    this.buildCounter,
  })
```

TextField的边框描述：一堆属性好恶心
```dart
InputDecoration({
    this.icon,    //位于装饰器外部和输入框前面的图片
    this.labelText,  //用于描述输入框，例如这个输入框是用来输入用户名还是密码的，当输入框获取焦点时默认会浮动到上方，
    this.labelStyle,  // 控制labelText的样式,接收一个TextStyle类型的值
    this.helperText, //辅助文本，位于输入框下方，如果errorText不为空的话，则helperText不会显示
    this.helperStyle, //helperText的样式
    this.hintText,  //提示文本，位于输入框内部
    this.hintStyle, //hintText的样式
    this.hintMaxLines, //提示信息最大行数
    this.errorText,  //错误信息提示
    this.errorStyle, //errorText的样式
    this.errorMaxLines,   //errorText最大行数
    this.hasFloatingPlaceholder = true,  //labelText是否浮动，默认为true，修改为false则labelText在输入框获取焦点时不会浮动且不显示
    this.isDense,   //改变输入框是否为密集型，默认为false，修改为true时，图标及间距会变小
    this.contentPadding, //内间距
    this.prefixIcon,  //位于输入框内部起始位置的图标。
    this.prefix,   //预先填充的Widget,跟prefixText同时只能出现一个
    this.prefixText,  //预填充的文本，例如手机号前面预先加上区号等
    this.prefixStyle,  //prefixText的样式
    this.suffixIcon, //位于输入框后面的图片,例如一般输入框后面会有个眼睛，控制输入内容是否明文
    this.suffix,  //位于输入框尾部的控件，同样的不能和suffixText同时使用
    this.suffixText,//位于尾部的填充文字
    this.suffixStyle,  //suffixText的样式
    this.counter,//位于输入框右下方的小控件，不能和counterText同时使用
    this.counterText,//位于右下方显示的文本，常用于显示输入的字符数量
    this.counterStyle, //counterText的样式
    this.filled,  //如果为true，则输入使用fillColor指定的颜色填充
    this.fillColor,  //相当于输入框的背景颜色
    this.errorBorder,   //errorText不为空，输入框没有焦点时要显示的边框
    this.focusedBorder,  //输入框有焦点时的边框,如果errorText不为空的话，该属性无效
    this.focusedErrorBorder,  //errorText不为空时，输入框有焦点时的边框
    this.disabledBorder,  //输入框禁用时显示的边框，如果errorText不为空的话，该属性无效
    this.enabledBorder,  //输入框可用时显示的边框，如果errorText不为空的话，该属性无效
    this.border, //正常情况下的边框，可以直接设置不显示底部边框
    this.enabled = true,  //输入框是否可用
    this.semanticCounterText,  
    this.alignLabelWithHint,
  })
```

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

## TabBar 和 TabBarView
项目中经常使用的组合，如果要去掉导航栏需要使用`PreferredSize`自定义高度， TabBar 和 TabBarView 需要使用一个默认的`DefaultTabController`进行包裹。Appbar使用`elevation: 0`,//隐藏导航栏底部阴影分割线.TabBar的背景色跟随它的父控件。

```dart
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: tabs.length,
      child: Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(40),
          child: AppBar(
            automaticallyImplyLeading: false,
            excludeHeaderSemantics: true,
            bottom: TabBar(
              controller: _tabController,
              tabs: tabs.map((e) =>  Text(e)).toList(),
            ),
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: tabs.map((e){
        return Container(
          alignment: Alignment.center,
          child: Text(e, textScaleFactor: 5),
        );
        }).toList()),
        floatingActionButton: floatingBtn(),
      ),
    );
  }
```

使用TabBarView的时候，每次切换tabbar都会重置，继承自 AutomaticKeepAliveClientMixin 和重写 wantKeepAlive 方法。保持widget的状态
```dart
class _OrderListPageState extends BaseState with AutomaticKeepAliveClientMixin{
  @override
  Widget build(BuildContext context) { return Text('Hello World');
  } 
  @override
  bool get wantKeepAlive => true;
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

## 动态添加tabbar
根据接口数据确定是否隐藏tabbar，有几个坑需要注意。
1. TabBarView 的组件内容需要根据 _tabs 的长度进行重新创建，不能使用数据封装，会造成不能删除的情况
2. _tabController 需要重新初始化信息，长度需要跟 _tabs 保持一致
3. 如果在动态修改前，你已经滑动了TabBarView，动态修改 tabbar 后,需要主动跳转对应位置，内容不会自动跳转
 
```
setState(() {
  _tabs = ["1", "2", "3", "4", "5"];
  _tabController = TabController(
      initialIndex: 1, length: _tabs.length, vsync: this);
  _tabController.animateTo(0);
});
```

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

