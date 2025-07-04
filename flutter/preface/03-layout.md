# Flutter的布局原理
一个小部件如果要显示在手机上需要知道两个条件: `它的位置和它的大小`。我们在平时使用Flutter小部件如果出现异常情况时，不妨思考一下🤔它知道自己的位置和大小吗？如果我们希望Widget宽度越大越好，可以使用`double.infinity`。

Flutter在布局过程中，会遍历组件树。遍历过程时，深度优先，从root将约束一级级的向下传，在传递过程中，如果符合父级的约束，向下传递时传递自己的约束，子控件必须满足父控件的约束条件，如果不能满足则会被修正。遍历完之后，小部件会向上传递自己的大小。Flutter的布局记住一句话， **向下传递约束，向上传递尺寸**。 如下图：

![](../imgs/flutter_img_4.jpg ':size=500')
```markdown
1. root是屏幕的尺寸，414、896是屏幕的宽高,在向下传递约束给Container时，Container设置自己的宽为0.04,高为0.0008,由于它自身的赋值不符合父级的约束，所以系统会强制将Container设置为宽414高896以符合父级约束。
2. 约束向下传递到Center,Center会将父级的紧约束搞成松约束，并且Center的子部件只要小于父级就会被居中。
3. Container设置自己的宽高为200，满足父级的约束。在向下传递时则使用新的约束。
4. FlutterLogo将自己大小设置成9001，由于不符合父级的约束，所以以父级的约束为主。
```

在上面我们提到了松约束，相对还有一个紧约束，它们是什么概念呢？
```markdown
* 紧约束：当最大约束和最小约束相等时就是紧约束
* 松约束：当最小约束为0时就是松约束
```

## 创建约束 -- BoxConstraints
创建约束可以使用`BoxConstraints`,它可以设置最大宽高和最小宽高。[点击查看相关API](https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html)
```dart
// 尽可能的填充父级约束
BoxConstraints.expand()
// 创建禁止尺寸大于给定尺寸的框约束。
BoxConstraints.loose（尺寸 大小）
// 设置尽可能的宽
BoxConstraints(
    maxWidth: double.infinity
)
// 设置一个松约束
BoxConstraints(
    maxWidth: double.infinity
).loosen()
```

## 查看当前约束 -- LayoutBuilder
在我们不知道当前约束是多少的时候，可以使用 LayoutBuilder 进行查看，如下面的代码：
```dart
LayoutBuilder(
    builder: (BuildContext context, BoxConstraints constraints) { 
        print("当前约束是: $constraints");
        return Container();
    }
)
```

## Flex布局
布局中常用的控件还有Flex， Row 和 Column 都继承自Flex。

在Flex中，小部件分为两种，一种是有弹性的，一种是没有弹性。有弹性是指没有固定的宽高，比如Expanded、Flexible，没有弹性是指有固定的宽高，比如图片、按钮。**如果没有弹性的小部件大小已经超过了Flex的约束，就会出现溢出。**

Flex在布局时，首先确定没有弹性的小部件的大小。在确认好没有弹性的小部件大小之后，将多余的控件分配给有弹性的小部件，默认是平分，通过flex参数可以设置每个弹性小部件占用的比例。

一个简单的Flex布局Demo:
```dart
Column(
    children: [
        LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) { 
                print("当前约束是: $constraints");
                return FlutterLogo(size:200);
            },
        ),
        Expanded(child: Container(color: Colors.red,)),
        FlutterLogo(size: 300,)
    ],
)
```

## Stack布局
在很多时候，我们需要小部件进行重叠可以使用Stack，Stack内部的小部件分为两种，一种是有位置的，一种是没有位置的。有位置的是指使用了`Positioned`。Stack默认会对溢出组件进行裁剪。

Stack布局的时候，先将没有位置的小部件都布局好，之后再将自己的尺寸调整为没有位置最大尺寸小部件的大小。

当Stack内部的小部件都是有位置的小部件时，Stack尺寸会是符合父级约束的最大尺寸。

使用Positioned时，向下传递的是一种紧约束。


## CustomMultiChildLayout
我们一直强调Flutter的布局是向下传递约束，向上传递尺寸，我们该怎么确认呢？通过CustomMultiChildLayout 小部件，我们能更清楚的看到Flutter的布局方式。

CustomMultiChildLayout的局限性，它自己的size不能根据child去调整。另一个限制是不能无中生有，需要什么部件需要从外部进行传递。下面是一个简单的Demo:
```dart
ColoredBox(
    color: Colors.yellow,
    child: CustomMultiChildLayout(
        delegate: MyDelegate(),
        children: [
            LayoutId(
                id: 1,
                child: FlutterLogo(),
            ),
            LayoutId(
                id: 2,
                child: FlutterLogo(),
            )
        ],
    ),
)


class MyDelegate extends MultiChildLayoutDelegate{

  // 向上传递自己的大小
  @override
  Size getSize(BoxConstraints constraints) {
    return super.getSize(constraints);
  }

  // 设置子部件的约束
  @override
  void performLayout(Size size) {
    print("size  = $size");
    Size size1 = Size(0,0);
    if (hasChild(1)) {
     size1 =  layoutChild(1, BoxConstraints.loose(size));
    }
    if (hasChild(2)) {
      layoutChild(2, BoxConstraints(minHeight: 150,minWidth: 150,maxHeight: 400,maxWidth: 400));
      positionChild(2, Offset(size1.width, 0));
    }
  }

  // 询问是否需要重新获取尺寸
  @override
  bool shouldRelayout(covariant MultiChildLayoutDelegate oldDelegate) => true;
}
```

## RenderObject
RenderObject常用于自定义Widget，根据项目需求写定制化的Widget。下面的代码 MyRenderBox是我们自定义的一个RenderObject。
```dart
Container(
    color: Colors.yellow,
    child: MyRenderBox(
        child: FlutterLogo(size: 160,),
    ),
)

class MyRenderBox extends SingleChildRenderObjectWidget{
  MyRenderBox({Widget? child}) : super(child: child);
  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderMyRenderBox();
  }

  // 什么时候更新RenderObject
  @override
  void updateRenderObject(BuildContext context, covariant RenderObject renderObject) {
    super.updateRenderObject(context, renderObject);
  }

}

class RenderMyRenderBox extends RenderBox with RenderObjectWithChildMixin{
  // 处理布局
  @override
  void performLayout() {
    // child?.layout(constraints);
    // size = Size(300, 300); // 设置自己的尺寸

    // 如果需要使用子部件的大小,需要通过 parentUsesSize 进行声明，这牵扯到组件树的刷新问题
    child?.layout(constraints,parentUsesSize: true);
    size = (child as RenderBox).size;
  }

  // 处理绘制，这里绘制可以随便绘制
  @override
  void paint(PaintingContext context, Offset offset) {
    context.paintChild(child!, offset);
    context.paintChild(child!, offset + Offset(60,60));
    context.canvas.drawColor(Colors.blue, BlendMode.color);
    context.pushOpacity(offset, 127, (context, offset) {
      context.paintChild(child!, offset + Offset(-60,-60));
     });
  }
}
```
在 `performLayout` 方法中，如果父控件不使用子控件的大小,parentUsesSize设置为false，如果需要使用，则设置为YES。为什么要这么设计呢？

在布局过程中，如果父控件不需要使用到子控件的大小，parentUsesSize设置为false，在这个节点对组件树是一个阻断。如果子控件发生任何变化，不会对父控件产生影响。

在创建一个新的RenderBox的时候，先去Flutter找一个跟你需求相近的RenderBox，直接继承它，可以少写很多方法。