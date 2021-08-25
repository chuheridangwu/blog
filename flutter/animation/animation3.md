# 其他动画

动画的原理就是将每一帧画面进行快速刷新，由于人眼的视觉效果，看到的就是一个连续的动画。决定动画流畅度的一个重要指标就是帧率`FPS（Frame Per Second）`，即每秒的动画帧数。只要动画帧率超过16FPS，就比较流畅了。

在我们之前的展示中，不管是`AnimatedContainer`还是`AnimatedBuilder`,我们观察它的源码，会发现其实都是系统封装好的控件，最后还是使用的`AnimationController`，当我们将`AnimationController`传过去的时候，它会进行做一个监听操作，然后刷新状态
* `AnimatedContainer` -> `ImplicitlyAnimatedWidget` -> `ImplicitlyAnimatedWidgetState`中包含 `AnimationController`
* `AnimatedBuilder` -> `AnimatedWidget` -> `_AnimatedState`中包含 `AnimationController` -> 监听`_handleChange `方法 -> 调用`setState()`

## 关于Ticker
`Ticker`主要用来监听屏幕的刷新回调,我们使用`AnimationController`时总是要添加`SingleTickerProviderStateMixin`,这是系统为我们写好的`Ticker`。

下面我们简单的自定义一个`Tiker`实现一个动画，这里只是简单的调用，如果是实际情况需要考虑的情况很多，屏幕的刷帧率，跳转到其他界面，进入后台等等情况:
```data

```