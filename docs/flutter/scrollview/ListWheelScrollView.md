# ListWheelScrollView
ListWheelScrollView 类似于iOS中的 UIPickerView的滚动视图,常用的场景比如地区选择器、时间选择器等。
常用到的参数有以下几种:
```markdown
* `offAxisFraction`: 轴心的偏移,可以设置正数或者负数偏移
* `itemExtent`: 每个Item的高度
* `diameterRatio`: 直径比例，默认2.0
* `overAndUnderCenterOpacity`: 设置中间外的其他控件透明度
* `magnification`: 实现中间控件放大的效果，如果没有设置 overAndUnderCenterOpacity 的值，必须将 useMagnifier 设置为 true
* `useMagnifier`: 是否使用放大镜效果
* `onSelectedItemChanged`: 选择item的回调，注意滚动时只要经过的item都会调用

* `physics`: 滚动风格 + 是否允许滚动
    * `ClampingScrollPhysics()` 安卓风格，滚动到顶部不能继续滚动
    * `BouncingScrollPhysics()` iOS风格，滚动到顶部允许反弹
    * `AlwaysScrollableScrollPhysics()` 允许滚动
    * `NeverScrollableScrollPhysics()` 不允许滚动
    * `FixedExtentScrollPhysics()` 滚动之后停在某个item,如果需要稳稳停在某个item上可以使用此选项
```

一个简单的例子:
```dart
ListWheelScrollView(
    itemExtent: 50,
    // offAxisFraction: -1.5,
    diameterRatio: 0.8,
    // overAndUnderCenterOpacity: 0.5,
    // magnification: 2,
    // useMagnifier: true,
    physics:const FixedExtentScrollPhysics(),
    onSelectedItemChanged: (index){
        print("选择了 $index");
    },
    children: List.generate(10, (index) => Container(color: Colors.blue))
)
```
ListWheelScrollView 的一个不好的地方是不能选择滚动方向，如果想达到横屏选择的的效果，可以选择使用`RotatedBox`对控件进行旋转。以下面的代码举例:
```dart
 RotatedBox(
    quarterTurns: 1,
    child: ListWheelScrollView(
        itemExtent: 50,
        children: List.generate(10, (index) => RotatedBox( 
        quarterTurns: -1
        ,child: Container(color: Colors.blue,alignment: Alignment.center,child: Text("$index"),)))
    ),
)
```
