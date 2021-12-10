# 滚动视图介绍
Flutter常用的滚动视图有:ListView、GridView、CustomScrollView、SingleChildScrollView。


## 监听滑动 ScrollController
在滚动视图中监听视图的滚动或者控制视图跳转到指定的位置需要使用到 `ScrollController`,**如果有跟其他的滚动组件搭配，其他组件也需要指定对应的ScrollController**，比如 Scrollbar。

```dart
// 跳转到起始位置,没有动画，如果想有动画可以使用 animateTo() 函数
_controller.jumpTo(0.0);

// 这里-20主要是为了模拟用户下拉
_controller.animateTo(-20.0, duration:const Duration(seconds: 1), curve: Curves.linear); 

// 滚动到指定位置
 _controller.jumpTo(_controller.offset + 200);
```

## 滚动条 Scrollbar
Scrollbar是一个Material风格的滚动指示器（滚动条），如果要给可滚动组件添加滚动条，只需将Scrollbar作为可滚动组件的任意一个父级组件即可，如：
```dart
Scrollbar(
  child: ListView(
    ...
  ),
);
```
`CupertinoScrollbar`是 iOS 风格的滚动条，在iOS平台使用 Scrollbar 时它会自动切换为CupertinoScrollbar。