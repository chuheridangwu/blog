# Container
Flutter中最最最常用的组件是Container,我们经常使用Container包住一个小部件，然后给小部件设置边框、大小、颜色等等。

## Container的尺寸
Container默认使用child的尺寸，如果child时,使用父级约束的最大值。比如下面的代码,SizeBox设置宽度为200,那么传给Container的紧约束就是宽度200，Container的高度使用的是子部件FlutterLogo的值，高度100。
```dart
SizedBox(
    width: 200,
    child: Container(  // width = 200 height = 100
        color: Colors.red,
        child: FlutterLogo(size:100), // width = 200 height = 100
    ),
)
```

* 有child就匹配尺寸。(前提 不使用对齐方式alignment)
* 没child就越大越好。(前提 父级约束不能是越大越好)


## Container到底是什么
Container内部集成了很多小部件，包含`Align`、`Padding`、`ColoredBox`、`ClipPath`、`DecoratedBox`、`ConstrainedBox`、`Transform`。当我们使用时，可以设置属性达到嵌套组件的效果，防止代码写成金字塔的形状。我们看一下Container的builder函数：
```dart
@override
Widget build(BuildContext context) {
Widget? current = child;

if (child == null && (constraints == null || !constraints!.isTight)) {
    current = LimitedBox(
    maxWidth: 0.0,
    maxHeight: 0.0,
    child: ConstrainedBox(constraints: const BoxConstraints.expand()),
    );
}

if (alignment != null)
    current = Align(alignment: alignment!, child: current);

final EdgeInsetsGeometry? effectivePadding = _paddingIncludingDecoration;
if (effectivePadding != null)
    current = Padding(padding: effectivePadding, child: current);

if (color != null)
    current = ColoredBox(color: color!, child: current);

if (clipBehavior != Clip.none) {
    assert(decoration != null);
    current = ClipPath(
    clipper: _DecorationClipper(
        textDirection: Directionality.maybeOf(context),
        decoration: decoration!,
    ),
    clipBehavior: clipBehavior,
    child: current,
    );
}

if (decoration != null)
    current = DecoratedBox(decoration: decoration!, child: current);

if (foregroundDecoration != null) {
    current = DecoratedBox(
    decoration: foregroundDecoration!,
    position: DecorationPosition.foreground,
    child: current,
    );
}

if (constraints != null)
    current = ConstrainedBox(constraints: constraints!, child: current);

if (margin != null)
    current = Padding(padding: margin!, child: current);

if (transform != null)
    current = Transform(transform: transform!, alignment: transformAlignment, child: current);

return current!;
}
```

## Decoration - 修饰属性（边框、圆角、阴影、形状、渐变、背景图像等)
Decoration 的作用定制各种各样的背景（边框、圆角、阴影、形状、渐变、背景图像）。**设置Decoration之后,Container属性不能直接设置颜色**,Decoration是一个抽象类,它的子类有以下几种：
```markdown
BoxDecoration:实现边框、圆角、阴影、形状、渐变、背景图像
ShapeDecoration:实现四个边分别指定颜色和宽度、底部线、矩形边色、圆形边色、体育场（竖向椭圆）、 角形（八边角）边色
FlutterLogoDecoration:实现Flutter图片
UnderlineTabindicator:下划线
```
BoxDecoration足够应付大部分的需求，常用的属性和相关功能:
```dart
BoxDecoration({
  Color color, //颜色
  DecorationImage image,//图片
  BoxBorder border, //边框
  BorderRadiusGeometry borderRadius, //圆角
  List<BoxShadow> boxShadow, //阴影,可以指定多个
  Gradient gradient, //渐变
  BlendMode backgroundBlendMode, //背景混合模式
  BoxShape shape = BoxShape.rectangle, //形状
})
```
* 渐变色
```dart
Container(
    decoration: BoxDecoration(
        gradient:  LinearGradient( 
            begin: Alignment.topCenter, // 设置起始位置
            end:Alignment.bottomCenter, // 设置结束位置
            colors: [Colors.blue,Colors.white], // 设置渐变色
            stops: [0,1] // 设置渐变范围，默认是0-1
        ),
    ),
    boxShadow: [BoxShadow(spreadRadius: 25,blurRadius: 25)], // 设置阴影
    borderRadius: BorderRadius.circular(150) //设置圆角
)
```
* 边框+圆角
```dart
decoration: new BoxDecoration(
    border: new Border.all(color: Color(0xFFFF0000), width: 0.5), // 边色与边宽度
    color: Color(0xFF9E9E9E), // 底色
    //        borderRadius: new BorderRadius.circular((20.0)), // 圆角度
    borderRadius: new BorderRadius.vertical(top: Radius.elliptical(20, 50)), // 也可控件一边圆角大小
)
```
*  阴影
```dart
decoration: new BoxDecoration(
    border: new Border.all(color: Color(0xFFFF0000), width: 0.5), // 边色与边宽度
// 生成俩层阴影，一层绿，一层黄， 阴影位置由offset决定,阴影模糊层度由blurRadius大小决定（大就更透明更扩散），阴影模糊大小由spreadRadius决定
    boxShadow: [BoxShadow(color: Color(0x99FFFF00), offset: Offset(5.0, 5.0),    blurRadius: 10.0, spreadRadius: 2.0), BoxShadow(color: Color(0x9900FF00), offset: Offset(1.0, 1.0)), BoxShadow(color: Color(0xFF0000FF))],
)
```
* 形状（圆形与矩形）：
```dart
decoration: new BoxDecoration(
    border: new Border.all(color: Color(0xFFFFFF00), width: 0.5), // 边色与边宽度
    color: Color(0xFF9E9E9E), // 底色
    //        shape: BoxShape.circle, // 圆形，使用圆形时不可以使用borderRadius
    shape: BoxShape.rectangle, // 默认值也是矩形
    borderRadius: new BorderRadius.circular((20.0)), // 圆角度
)
```

* 渐变（环形、扫描式、线性）：
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
```
* 背景图像：
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

