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

在上面我们提到了松约束，相对还有一个紧约束，它俩是什么概念呢？


https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html

https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html


在我们不知道当前约束是多少的时候，可以使用 LayoutBuilder 进行查看，如下面的代码：
```dart
LayoutBuilder(
    builder: (BuildContext context, BoxConstraints constraints) { 
        print("当前约束是: $constraints");
        return Container();
    }
)
```



