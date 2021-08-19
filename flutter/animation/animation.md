# 动画
文章来源：[Flutter 实战电子书](https://book.flutterchina.club/chapter9/intro.html)
动画的原理就是将每一帧画面进行快速刷新，由于人眼的视觉效果，看到的就是一个连续的动画。决定动画流畅度的一个重要指标就是帧率`FPS（Frame Per Second）`，即每秒的动画帧数。只要动画帧率超过16FPS，就比较流畅了。


Flutter 中关于动画的类有:`Animation` AnimationController  Curve Tween

在`Flutter`中我们应该如何选择动画：如果需要 循环播放、随时中断、多个动画协调的时候使用显示动画。如果是内容更新、按钮点击、翻页效果、弹窗、添加/删除控件、渐变过度等效果使用隐式动画

## 隐式动画(系统默认)
系统自带隐式动画控件以`Animationxxx`进行开头
自定义隐式动画以`TweenAnimationBuilder`

## 显示动画
需要用到动画控制器，并且回收。
Flutter现有控件`...Teansition`
自定义显示动画`AnimationBuilder`

## 自定义动画

## 动画过程 Curve
动画过程可以是匀速的、匀加速的或者先加速后减速等。Flutter中通过Curve（曲线）来描述动画过程，我们把匀速动画称为线性的(Curves.linear)，而非匀速动画称为非线性的。

我们可以通过CurvedAnimation来指定动画的曲线，如：

```dart
final CurvedAnimation curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
```    
`CurvedAnimation`和`AnimationController`（下面介绍）都是`Animation<double>`类型。`CurvedAnimation` 可以通过包装`AnimationController`和`Curve`生成一个新的动画对象 ，我们正是通过这种方式来将动画和动画执行的曲线关联起来的。我们指定动画的曲线为Curves.easeIn，它表示动画开始时比较慢，结束时比较快。

Curves (opens new window)类是一个预置的枚举类，定义了许多常用的曲线，下面列几种常用的：

Curves曲线 | 动画过程
------- | -------
linear | 匀速的
decelerate | 匀减速
ease | 开始加速，后面减速
easeIn | 开始慢，后面快
easeOut | 开始快，后面慢
easeInOut | 开始慢，然后加速，最后再减速

除了上面列举的， Curves (opens new window)类中还定义了许多其它的曲线，在此便不一一介绍，读者可以自行查看Curves类定义。

当然我们也可以创建自己Curve，例如我们定义一个正弦曲线：

class ShakeCurve extends Curve {
  @override
  double transform(double t) {
    return math.sin(t * math.PI * 2);
  }
}