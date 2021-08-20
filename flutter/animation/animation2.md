# 显示动画
如果需要循环播放、暂停、多个动画协调时可以选择显示动画,显示动画需要用到`AnimationController`。

## AnimationController


```dart
_controller = AnimationController(
    duration: Duration(seconds: 1),
    vsync: this // 垂直同步:屏幕什么时候需要显示新的帧，因为不同的设置有不同的刷新频率，有的是60Hz，一秒刷新60次，16毫秒一次，有的是120Hz，8毫秒一次,Flutter提供了SingleTickerProviderStateMixin 获取同步数据
);

_controller.forward(); // 运行一次
_controller.repeat(); //无线循环
_controller.reset(); //重置
_controller.stop(); //停止动画，会停在原地

// _controller.value 等价于 Tween补间动画中的value
```

需要用到动画控制器，并且回收。
Flutter现有控件`...Teansition`
自定义显示动画`AnimationBuilder`



