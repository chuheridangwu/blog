# PageView
PageView 是一个分页滚动视图，常用于轮播图或者启动页介绍等场景，结构简单，相关属性有:
```markdown
* `onPageChanged`: 滚动之后的回调
* `scrollDirection`: 滚动方向
* `controller`: 监听滚动，PageController 类型
* `pageSnapping`: 默认为true，设置为false可以滚动到任何位置
* `physics`: 滚动风格 + 是否允许滚动
    * `ClampingScrollPhysics()` 安卓风格，滚动到顶部不能继续滚动
    * `BouncingScrollPhysics()` iOS风格，滚动到顶部允许反弹
    * `AlwaysScrollableScrollPhysics()` 允许滚动
    * `NeverScrollableScrollPhysics()` 不允许滚动
    * `FixedExtentScrollPhysics()` 滚动之后停在某个item,如果需要稳稳停在某个item上可以使用此选项
```

一个简单的例子:
```dart
PageView(
    pageSnapping: true, // 
    onPageChanged: (index){
        print("当前滚动到 $index");
    },
    scrollDirection:Axis.vertical,
    children: List.generate(5,  (index) => Container(color: Colors.red[index % 5 * 100],)),
),
```