# SingleChildScrollView
SingleChildScrollView 类似于iOS中的 UIScrollView,只能接收一个子组件，通常在内容不会超出屏幕太多的时候进行使用。这是因为`SingleChildScrollView`不支持基于 Sliver 的延迟加载模型。

>SingleChildScrollView 在不能滚动的时候，用户是感受不到它的存在，在子控件超出屏幕需要滚动的时候才会滚动,内部只有一个子控件

举个例子:
```dart
SingleChildScrollView(
    child: Column(
        children:const [
            FlutterLogo(size: 100),
            FlutterLogo(size: 500),
        ],
    ),
)
```