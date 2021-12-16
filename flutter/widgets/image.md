# 图片
图片有本地图片和网络图片，记载本地资源图片可以使用`Image.asset`和`Image.file`,加载网络图片使用`Image.network`,目前较好用的第三方库`CachedNetworkImage`。

## 加载图片
#### 加载本地图片
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
#### 加载网络图片
2. 网络图片
`Image.network`无本地缓存
```dart
Image.network(
  'https://pic4.zhimg.com/v2-19dced236bdff0c47a6b7ac23ad1fbc3.jpg',
  width: 200,
  height: 200,
)
```
FadeInImage.assetNetwork 淡入效果，无本地缓存。
```dart
FadeInImage.assetNetwork(
  placeholder: 'images/avatar.png',
  image: 'https://pic1.zhimg.com/v2-7fab628481a26f025188b095b5cfafbc.jpg',
  width: 200,
  height: 200
)
```
#### 第三方组件
`CachedNetworkImage` 第三方控件，有本地缓存和淡入效果
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

## 圆角头像图片
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

## ShapeDecoration
使用`ShapeDecoration`可以做出各种形状,相关的属性有:
```markdown
* 斜切角: BeveledRectangleBorder
* 圆角: RoundedRectangleBorder
* 超椭圆: SuperellipseShape
* 体育场: StadiumBorder
* 圆形: CircleBorder //斜切角形状示例
```
用一个简单的Demo进行示例:
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