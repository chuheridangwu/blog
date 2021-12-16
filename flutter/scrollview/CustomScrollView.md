# CustomScrollView

`CustomScrollView`是可以使用`Sliver`来自定义滚动模型（效果）的组件。它可以包含多种滚动模型，举个例子，假设有一个页面，顶部需要一个`GridView`，底部需要一个`ListView`。使用`CustomScrollView`可以将它们粘合在一起。

```dart
import 'package:flutter/material.dart';

class CustomScrollViewTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //因为本路由没有使用Scaffold，为了让子级Widget(如Text)使用
    //Material Design 默认的样式风格,我们使用Material作为本路由的根。
    return Material(
      child: CustomScrollView(
        slivers: <Widget>[
          //AppBar，包含一个导航栏
          SliverAppBar(
            pinned: true,
            expandedHeight: 250.0,
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Demo'),
              background: Image.asset(
                "./images/avatar.png", fit: BoxFit.cover,),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(8.0),
            sliver: new SliverGrid( //Grid
              gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, //Grid按两列显示
                mainAxisSpacing: 10.0,
                crossAxisSpacing: 10.0,
                childAspectRatio: 4.0,
              ),
              delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建子widget      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.cyan[100 * (index % 9)],
                    child: new Text('grid item $index'),
                  );
                },
                childCount: 20,
              ),
            ),
          ),
          //List
          new SliverFixedExtentList(
            itemExtent: 50.0,
            delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建列表项      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: new Text('list item $index'),
                  );
                },
                childCount: 50 //50个列表项
            ),
          ),
        ],
      ),
    );
  }
}
```

## 监听滚动的方法
* Controller:可以设置默认滚动值，监听滚动的位置，不能监听开始滚动
* NotificationListener

```dart
class _DemoTestState extends State<DemoTest> {

  ScrollController _controller = ScrollController();

  @override
    void initState() {
      super.initState();
      _controller.addListener(() {
        print("当前滚动的距离: ${_controller.offset}");
      });
    }

  @override
  Widget build(BuildContext context) {
    return  Material(
      child: ListView(
        controller: _controller,
        children: List.generate(100, (index){
          return Text("index --- $index");
        }),
      )
    );
  }
}

// 使用NotificationListener 的方式监听滚动
  @override
  Widget build(BuildContext context) {
    return  Material(
      child: NotificationListener(
        onNotification: (ScrollNotification notification){
          if (notification is ScrollStartNotification) { //开始滚动
            
          } else if (notification is ScrollUpdateNotification) { //正在滚动
            
          } else if(notification is ScrollEndNotification){ //结束滚动
          
          }
          return true;
        },
        child: ListView(
          controller: _controller,
          children: List.generate(100, (index){
            return Text("index --- $index");
          }),
        ),
      )
    );
  }
}
```