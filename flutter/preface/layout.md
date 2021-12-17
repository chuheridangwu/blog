# Flutter的布局原理
一个小部件如果要显示在手机上需要知道两个条件: `它的位置和它的大小`。我们在平时使用Flutter小部件如果出现异常情况时，不妨思考一下🤔它知道自己的位置和大小吗？

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
布局中常用的控件还有Flex， Row 和 Column 都继承自Flex。在Flex中，小部件分为两种，一种是有弹性的，一种是没有弹性。有弹性是指没有固定的宽高，比如Expanded、Flexible，没有弹性是指有固定的宽高，比如图片、按钮。

Flex在布局时，首先确定没有弹性的小部件的大小。在确认好没有弹性的小部件大小之后，将多余的控件分配给有弹性的小部件，默认是平台，通过flex参数可以设置每个弹性小部件占用的比例。


