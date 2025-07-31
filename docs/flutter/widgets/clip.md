# 裁剪Clip
裁剪是UI常用的一种方式,Flutter中裁剪相关的Widget有:
```markdown
ClipOval	子组件为正方形时剪裁成内贴圆形；为矩形时，剪裁成内贴椭圆
ClipRRect	将子组件剪裁为圆角矩形
ClipRect	默认剪裁掉子组件布局空间之外的绘制内容（溢出部分剪裁）
ClipPath	按照自定义的路径剪裁
```

## CustomClipper 自定义裁剪区域
如果我们想剪裁子组件的特定区域，比如，在上面示例的图片中，如果我们只想截取图片中部40×30像素的范围应该怎么做？这时我们可以使用CustomClipper来自定义剪裁区域，实现代码如下：

首先，自定义一个CustomClipper:
```dart
class MyClipper extends CustomClipper<Rect> {
  @override
  Rect getClip(Size size) => Rect.fromLTWH(10.0, 15.0, 40.0, 30.0);

  @override
  bool shouldReclip(CustomClipper<Rect> oldClipper) => false;
}
```

`getClip()`是用于获取剪裁区域的接口，由于图片大小是60×60，我们返回剪裁区域为Rect.fromLTWH(10.0, 15.0, 40.0, 30.0)，即图片中部40×30像素的范围。

`shouldReclip()` 接口决定是否重新剪裁。如果在应用中，剪裁区域始终不会发生变化时应该返回false，这样就不会触发重新剪裁，避免不必要的性能开销。如果剪裁区域会发生变化（比如在对剪裁区域执行一个动画），那么变化后应该返回true来重新执行剪裁。

然后，我们通过ClipRect来执行剪裁，为了看清图片实际所占用的位置，我们设置一个红色背景：
```dart
DecoratedBox(
  decoration: BoxDecoration(
    color: Colors.red
  ),
  child: ClipRect(
    clipper: MyClipper(), //使用自定义的clipper
    child: avatar
  ),
)
```

可以看到我们的剪裁成功了，但是图片所占用的空间大小仍然是60×60（红色区域），这是因为组件大小是是在layout阶段确定的，而剪裁是在之后的绘制阶段进行的，所以不会影响组件的大小，这和Transform原理是相似的。

ClipPath 可以按照自定义的路径实现剪裁，它需要自定义一个CustomClipper<Path> 类型的 Clipper，定义方式和 MyClipper 类似，只不过 getClip 需要返回一个 Path，不再赘述。