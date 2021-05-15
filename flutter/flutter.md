# Flutter
主要针对Flutter中常用的控件布局和第三方做一些讲解。方便以后快速查看文档代码。目前的一些网站对Flutter这些讲解的挺好了，这里主要是看能不能做一些简化。方便以后自己查找。

1. 如果想给一个按钮设置宽和高，使用一个Container包裹住一个按钮就可以了
2. 必传参数不传的话编译会报错，选传参数使用@required修饰不传只会报警告



## ListView用法
```
ListView(
      children: List.generate(100, (index){
        return Text("hello + $index");
      })
      
ListView.builder(
      itemBuilder: (ctx,index){
        return Text("hello world  $index");
      }
    )
```

## GridView 用法
```
 GridView(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          mainAxisSpacing: 10,
          crossAxisCount: 3,
          childAspectRatio: 4,
        ),
        children: List.generate(100, (index) => Text("hello world -- $index")),
      ))  
```

## CustomScrollView
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

Flutter处理I/O操作时使用的是非阻塞式调用,Dart中异步操作的主要使用Future/async、await,Future跟前端的Promise基本一致

## 图片圆角的处理
1. 本地图片Image.asset加载项目资源包的图片
```dart
//先将图片拷贝到项目 images 目录中，然后在 pubspec.yaml文件配置文件相对路径到 assets 
Image.asset(
  'images/cat.jpg',
  width: 200,
  height: 200,
)
```

`Image.file`加载手机内置或外置存储的图片
```dart
//加载Android平台的外置存储图片需要AndroidManifest.xml配置android.permission.READ_EXTERNAL_STORAGE权限
Image.file(
  File('/0/images/cat.jpg'),
  width: 200,
  height: 200,
)
```
2. 网络图片
`Image.network`无本地缓存
```dart
Image.network(
  'https://pic4.zhimg.com/v2-19dced236bdff0c47a6b7ac23ad1fbc3.jpg',
  width: 200,
  height: 200,
)
```
FadeInImage.assetNetwork 淡入效果，无本地缓存

```dart
FadeInImage.assetNetwork(
  placeholder: 'images/avatar.png',
  image: 'https://pic1.zhimg.com/v2-7fab628481a26f025188b095b5cfafbc.jpg',
  width: 200,
  height: 200
)
```
CachedNetworkImage 第三方控件，有本地缓存和淡入效果

```dart
//1、将依赖框架配置到pubspec.yaml文件
dependencies:
  cached_network_image: ^0.7.0

//2、引入相关类
import 'package:cached_network_image/cached_network_image.dart';

//3、使用控件，默认自带图片淡入效果
CachedNetworkImage(
  imageUrl: 'https://pic4.zhimg.com/v2-19dced236bdff0c47a6b7ac23ad1fbc3.jpg',
  width: 200,
  height: 200,
)
```

圆形头像方式

1: CircleAvatar

```dart
CircleAvatar(
  //头像半径
  radius: 60,
  //头像图片 -> NetworkImage网络图片，AssetImage项目资源包图片, FileImage本地存储图片
  backgroundImage: NetworkImage(
    'https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg'
  ),
)
```
2: ClipOval

```dart
ClipOval(
  child: Image.network(
    'https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg',
    width: 120,
    height: 120,
    fit: BoxFit.cover,
  ),
)
```

3:  Container + BoxDecoration

```dart
Container(
  width: 120,
  height: 120,
  decoration: BoxDecoration(
    shape: BoxShape.circle,
    image: DecorationImage(
      image: NetworkImage('https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg'),
      fit: BoxFit.cover
    )
  )
)
```

圆角图片方式1: ClipRRect

```
ClipRRect(
  borderRadius: BorderRadius.circular(8),
  child: Image.network(
    'https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg',
    width: 120,
    height: 120
  )
)
```

Container  + BoxDecoration

```dart
Container(
  width: 120,
  height: 120,
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(8),
    image: DecorationImage(
      image: NetworkImage('https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg')
    )
  )
)
```

使用`ShapeDecoration`可以做出各种形状
* 斜切角: BeveledRectangleBorder
* 圆角: RoundedRectangleBorder
* 超椭圆: SuperellipseShape
* 体育场: StadiumBorder
* 圆形: CircleBorder //斜切角形状示例
```dart
Container(
  width: 120,
  height: 120,
  decoration: ShapeDecoration(
    shape: BeveledRectangleBorder(
      borderRadius: BorderRadius.circular(16)
    ),
    image: DecorationImage(
      fit: BoxFit.cover,
      image: NetworkImage('https://pic2.zhimg.com/v2-639b49f2f6578eabddc458b84eb3c6a1.jpg')
    )
  )
)
```