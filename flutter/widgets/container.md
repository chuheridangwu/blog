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

## decoration - 修饰属性
盒子修饰属性，设置颜色和渐变色时，Container属性不能直接设置颜色

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

