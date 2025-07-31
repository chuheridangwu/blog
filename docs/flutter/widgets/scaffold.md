# Scaffold
Scaffold 英文意思是脚手架。
Scaffold相关的参数：
```markdown
* `PreferredSizeWidget? appBar`: 顶部导航栏，PreferredSizeWidget是一个抽象类,AppBar/TabBar/CupertinoNavigationBar是它的实现类
* `Widget? body`: 屏幕主界面
* `Widget? floatingActionButton`: 悬浮按钮，常用控件FloatingActionButton
* `FloatingActionButtonLocation? floatingActionButtonLocation`: 悬浮按钮位置
* `FloatingActionButtonAnimator? floatingActionButtonAnimator`: 悬浮按钮动画
* `List<Widget>? persistentFooterButtons`: 底部Tabbar按钮,最多是5个
* `Widget? drawer`: 左滑界面，一般配合使用Drawer
* `DrawerCallback? onDrawerChanged`: 打开/关闭 左侧Drawer的回调
* `Widget? endDrawer`: 右侧的侧滑界面，一般配合Drawer使用
* `DrawerCallback? onEndDrawerChanged`: 打开/关闭 右侧Drawer的回调
* `Color? drawerScrimColor`: Drawer的颜色
* `Color? backgroundColor`: 背景颜色
* `Widget? bottomNavigationBar`: 底部导航栏,在persistentFooterButtons控件的下面,一般配合 CupertinoNavigationBar/BottomNavigationBar/BottomAppBar使用
* `Widget? bottomSheet`: 要显示的持久底部工作表。一般很少使用
* `bool? resizeToAvoidBottomInset`: 避免碰触到键盘
* `bool primary`: 主题颜色
* `double? drawerEdgeDragWidth`: 水平滑动将打开的区域的宽度
* `bool drawerEnableOpenDragGesture`: 是否启动手势滑动，默认是
* `bool endDrawerEnableOpenDragGesture`: 是否启动手势滑动，默认是
* `Color? drawerScrimColor`: Drawer颜色
```

## 左边的侧滑弹窗
类似QQ的侧滑效果，侧滑之后显示一个窗口，在窗口内显示控件，测试窗口有左滑有右滑两个。
```dart
final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
void _openDrawer() {
  _scaffoldKey.currentState!.openDrawer();
}
void _closeDrawer() {
  Navigator.of(context).pop();
}
@override
Widget build(BuildContext context) {
  return Scaffold(
    key: _scaffoldKey,
    appBar: AppBar(title: const Text('Drawer Demo')),
    body: Center(
      child: ElevatedButton(
        onPressed: _openDrawer,
        child: const Text('Open Drawer'),
      ),
    ),
    drawer: Drawer(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('This is the Drawer'),
            ElevatedButton(
              onPressed: _closeDrawer,
              child: const Text('Close Drawer'),
            ),
          ],
        ),
      ),
    ),
    // Disable opening the drawer with a swipeure.
    drawerEnableOpenDragGesture: false,
  );
}
```