# 动画
文章来源：[Flutter 实战电子书](https://book.flutterchina.club/chapter9/intro.html) 和 哔哩哔哩的[王叔不秃](https://www.bilibili.com/medialist/play/589533168?from=space&business=space_channel&business_id=130705&desc=1)

动画的原理就是将每一帧画面进行快速刷新，由于人眼的视觉效果，看到的就是一个连续的动画。决定动画流畅度的一个重要指标就是帧率`FPS（Frame Per Second）`，即每秒的动画帧数。只要动画帧率超过16FPS，就比较流畅了。


Flutter 中关于动画的类有:
* `Animation`:
* `AnimationController`: 
* `Curve`: 动画曲线
* `Tween`: 补间动画

在`Flutter`中我们应该如何选择动画：如果需要 循环播放、随时中断、多个动画协调的时候使用显示动画。如果是内容更新、按钮点击、翻页效果、弹窗、添加/删除控件、渐变过度等效果使用隐式动画

## 隐式动画(系统默认)
系统自带隐式动画控件以`Animatedxxx`进行开头，常见的控件有：
* `AnimatedContainer`: 在Container的属性发生变化时拥有动画，比如颜色、大小、圆角,必填参数`duration`,用来设置动画时间。

```dart
AnimatedContainer(
  duration: Duration(seconds: 2),
  width: 300,
  height: 300,
  color: Colors.blue,
)
```

* `AnimatedSwitcher`: 在切换不同的控件时拥有动画,必填参数`duration`,如果是同一个控件切换不同属性时(比如Text使用不同的文字)，可以使用`UniqueKey()`表示需要刷新。`transitionBuilder`属性也很关键,用来显示切换控件时的效果，默认是`FadeTransition`淡入淡出。相关的类不止下面这几个： 
  * `FadeTransition`: 淡入淡出
  * `ScaleTransition`: 缩放
  * `RotationTransition`: 旋转
  * `SizeTransition`: 大小
* `AnimatedCrossFade`: 如果只是两个控件来回切换的动画，可以直接使用`AnimatedCrossFade`

```dart
AnimatedSwitcher(
  duration: Duration(seconds: 2),
  child: Text("Hello", style: TextStyle(fontSize: 40),key: UniqueKey(),),
  // child: Image.network("https://img-pre.ivsky.com/img/tupian/pre/202103/10/sunyunzhu_wuxiushan_baoshenqun.jpg"),
)

/* 
transitionBuilder:是一个函数 Widget Function(Widget child, Animation<double> animation)，
拥有两个参数，child:表示动画的控件，animation: 动画过程中的变量。
*/
AnimatedSwitcher(
  transitionBuilder: (child,animation){
    return FadeTransition( // 如果想要多个效果可以直接嵌套,目前既有淡入淡出的效果，又有旋转的效果
                opacity: animation,
                child: RotationTransition(turns: animation,child: child,),
           );;
  },
  duration: Duration(seconds: 2),
  child: Text("hello", style: TextStyle(fontSize: 40),key: UniqueKey(),),
)

AnimatedCrossFade(
  crossFadeState: CrossFadeState.showFirst,
  secondChild: Image.network("https://img-pre.ivsky.com/img/tupian/pre/202103/10/sunyunzhu_wuxiushan_baoshenqun.jpg"),
  duration: Duration(seconds: 2),
  firstChild: Text("hi", style: TextStyle(fontSize: 40),),
)
```

* `AnimatedOpacity`: 透明度动画
* `AnimatedPadding`: 间距动画

补间动画`TweenAnimationBuilder`,当我们想自定义一些动画时，可以选择补间动画，默认有三个参数:tween(动画变化过程中的值)、duration(动画时长)、builder(动画控件)。补间动画还可以配合 `Transform` 完成平移旋转和缩放。

```dart
TweenAnimationBuilder(
  tween: Tween(begin: 0.0, end: 0.1), //between 0-1,不写begin时，默认begin和end的值是一样的,当动画运行期间修改end的值，系统不会先完成上一个未完成的动画，而是会以当前值开始下一个动画。
  duration: Duration(seconds: 1),
  builder: (BuildContext context,double value,Widget? child) {
    return Opacity(
      opacity: value,
      child: Container(
      width: 300,
      height: 300,
      color: Colors.blue,
    ),
  );
})

// TweenAnimationBuilder 和  Transform 的配合
TweenAnimationBuilder(
  tween: Tween(begin: Offset(0,0), end: Offset(30,30)), // 可以直接在Tween这里写Offset，也可以在平移动画里写
  duration: Duration(seconds: 2),
  builder: (BuildContext context,Offset value,Widget? child) {
    return  Container(
      width: 300,
      height: 300,
      color: Colors.blue,
      child: Center(
        child: Transform.translate(
          offset: value,
          child: Text("Hi",style: TextStyle(fontSize: 50)),
        )
      ),
    );
})
```
`Transform`平移、缩放、旋转三个函数讲解：
```dart
Transform.rotate(
  angle: 3.14, // 旋转的角度 一圈的取值范围0-2π ，3.14表示旋转半圈
  child: Text("Hi",style: TextStyle(fontSize: 50)),
)

Transform.scale(
  scale: 1.2, // 缩放倍数 1.0 表示原来的大小
  child: Text("Hi",style: TextStyle(fontSize: 50)),
)

Transform.translate(
  offset: Offset(10,value), // 平移，需要设置x,y的值。 Offset(10,0)表示不平移
  child: Text("Hi",style: TextStyle(fontSize: 150)),
)
```


## 显示动画
需要用到动画控制器，并且回收。
Flutter现有控件`...Teansition`
自定义显示动画`AnimationBuilder`



## 动画曲线 Curve
动画过程可以是匀速的、匀加速的或者先加速后减速等。Flutter中通过Curve（曲线）来描述动画过程，我们把匀速动画称为线性的(Curves.linear)，而非匀速动画称为非线性的。

我们可以通过`CurvedAnimation`来指定动画的曲线，如：

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
bounceOut | 回弹效果

除了上面列举的， Curves (opens new window)类中还定义了许多其它的曲线，在此便不一一介绍，读者可以自行查看Curves类定义。

当然我们也可以创建自己Curve，例如我们定义一个正弦曲线：

```dart
class ShakeCurve extends Curve {
  @override
  double transform(double t) {
    return math.sin(t * math.PI * 2);
  }
}
```