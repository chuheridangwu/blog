# Flutter中获取屏幕尺寸的方式


##  屏幕常见变量

```dart
  MediaQueryData mq = MediaQuery.of(context);
  // 屏幕密度
  pixelRatio = mq.devicePixelRatio;
  // 屏幕宽(注意是dp, 转换px 需要 screenWidth * pixelRatio)
  screenWidth = mq.size.width;
  // 屏幕高(注意是dp)
  screenHeight = mq.size.height;
  // 顶部状态栏, 随着刘海屏会增高
  statusBarHeight = mq padding.top;
  // 底部功能栏, 类似于iPhone XR 底部安全区域
  bottomBarHeight = mq.padding.bottom;

/// material 系统保存的常量值里面查看
export 'src/material/constants.dart’;
/// AppBar 高度
const double kToolbarHeight = 56.0;
/// BottomNavigationBar 高度
const double kBottomNavigationBarHeight = 56.0;

/// 安全内容高度(包含 AppBar 和 BottomNavigationBar 高度)
double get safeContentHeight => screenHeight - statusBarHeight - bottomBarHeight;
/// 实际的安全高度
double get safeHeight => safeContentHeight - kToolbarHeight - kBottomNavigationBarHeight;
```


## SafeArea  适配安全区域的View


## 屏幕适配
Flutter尺寸单位采用的是逻辑像素，类似于iOS中的`pt`和Android的`dp`.
* 逻辑像素: 也被称为与设备或分辨率无关的像素
* 物理像素: 又称设备像素，指屏幕的基础单元，也是我们能看到的尺寸。比如 iPhone6 的屏幕在宽度方向有750 个像素点，高度方向有 1334 个像素点

> 逻辑像素 = `物理像素px` / `devicePixelRatio`

在Flutter中,`devicePixelRatio` 由`ui.Window` 类提供，Window是 `Flutter Framework`连接宿主操作系统的接口。因此，Flutter的`devicePixelRatio`属性正是引擎层从原生平台中获取的。而这个值在安卓中就对应着 `density`，在iOS 中就对应着 `[UIScreenmainScreen].scale`。相同逻辑像素在不同分辨率手机的看到的物理像素不一样的原因是每个设备可能都会有不同的 dpr。

```dart
///屏幕适配工具类，如果UI要求要和UI稿完全一致的还原度时可以使用
class ScreenHelper {
  static late MediaQueryData mediaQueryData;
  static late double screenWidth;
  static late double screenHeight;
  static late double ratio;
  ///根据设计稿实际宽度初始化,basewidth 设计稿宽度
  static void init(BuildContext context, {double baseWidth = 375}){
    mediaQueryData = MediaQuery.of(context);
    screenWidth = mediaQueryData.size.width;
    screenHeight = mediaQueryData.size.height;
    ratio = screenWidth / baseWidth;
  }
  ///获取设计稿对应的大小
  static double getPx(double size){
    return ScreenHelper.ratio * size;
  }
}
```

对int类型和double类型的数据进行适配
```dart
import 'package:flutter/material.dart';
///扩展int以方便使用
extension IntFit on int {
  ///eg: 200.px
  double get px {
    return ScreenHelper.getPx(toDouble());
  }
}
///扩展double以方便使用
extension DoubleFit on double {
  ///eg: 200.0.px
  double get px {
    return ScreenHelper.getPx(this);
  }
}
```