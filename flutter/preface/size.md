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