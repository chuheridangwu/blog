# 主题和颜色
* [Flutter实战第二版](https://book.flutterchina.club/chapter7/theme.html#_7-4-2-theme)
* [使用 Themes 统一颜色和字体风格](https://flutter.cn/docs/cookbook/design/themes)

## Color 和 MaterialColor
我们知道显示器颜色是由红、绿、蓝三基色组成，每种颜色占1个字节,取值范围为`0~255`,RGBA是在RGB颜色的基础上加上透明度alpha，实现带有透明度的颜色。`alpha取值0.0~1.0`。在Flutter中alpha的值是在最前面的一个字节。如下:

如 Web 开发中的色值通常是一个字符串如`"#dc380d"`，它是一个 RGB 值，我们可以通过下面这些方法将其转为Color类：

```dart
Color(0xffdc380d); //如果颜色固定可以直接使用整数值
//颜色是一个字符串变量
var c = "dc380d";
Color(int.parse(c,radix:16)|0xFF000000) //通过位运算符将Alpha设置为FF
Color(int.parse(c,radix:16)).withAlpha(255)  //通过方法将Alpha设置为FF
```

Color 类中提供了一个`computeLuminance()`方法检测颜色亮度，返回一个[0-1]的一个值，数字越大颜色就越浅。

----

`MaterialColor`是实现`Material Design`中的颜色的类，它包含一种颜色的10个级别的渐变色。`MaterialColor`通过`"[]"`运算符的索引值来代表颜色的深度，有效的索引有：`50，100，200，…，900`，数字越大，颜色越深。`MaterialColor`的默认值为索引等于500的颜色。举个例子，`Colors.blue`是预定义的一个`MaterialColor`类对象。白色和黑色不是 `MaterialColor`类。

```dart
// 定义蓝色
static const int _bluePrimaryValue = 0xFF2196F3;
// 定义MaterialColor 颜色
static const MaterialColor blue = MaterialColor(
  _bluePrimaryValue,
  <int, Color>{
     50: Color(0xFFE3F2FD),
    100: Color(0xFFBBDEFB),
    200: Color(0xFF90CAF9),
    300: Color(0xFF64B5F6),
    400: Color(0xFF42A5F5),
    500: Color(_bluePrimaryValue),
    600: Color(0xFF1E88E5),
    700: Color(0xFF1976D2),
    800: Color(0xFF1565C0),
    900: Color(0xFF0D47A1),
  },
);
```

## 主题 Theme
通过定义 Theme，我们可以更好地复用颜色和字体样式，从而让整个 app 的设计看起来更一致。全局 Theme 会在整个 app 范围内生效，而局部 Theme 只作用于特定元素。

其实所谓的全局 Theme 和局部 Theme 的区别只在于，**全局 Theme 定义在了 app 的 root 处而已。而 MaterialApp 已经事先为你预设了一个全局的 Theme Widget。**

在定义一个 Theme 之后，我们可以让它在指定的 widgets （包括 Flutter 自带的 Material widgets，例如 AppBars、Buttons、Checkboxes 等等）中生效。

关于ThemeData的参数:
```dart
factory ThemeData({
    Brightness brightness, // 应用主题亮度 可以设置夜间模式
    MaterialColor primarySwatch, // 主要样式，
    Color primaryColor, // 主要部分背景颜色（目前没弄明白那里的）
    Color disabledColor, // 禁用状态下部件的颜色，无论其当前状态如何。例如，一个禁用的复选框(可以选中或未选中)。
    Color buttonColor, // RaisedButton按钮中使用的Material 的默认填充颜色。
    ButtonThemeData buttonTheme, // 定义按钮部件的默认配置，
    Color cardColor, // Card的颜色
    Color dividerColor, // Divider和PopupMenuDivider的颜色，也用于ListTile之间、DataTable的行之间等。
    Color dialogBackgroundColor, // Dialog元素的背景颜色
    String fontFamily, // 文本字体
    TextTheme textTheme, // 文本的颜色与卡片和画布的颜色形成对比。
    IconThemeData iconTheme, // 与卡片和画布颜色形成对比的图标主题
    Brightness accentColorBrightness, // accentColor的亮度
    Color canvasColor, // MaterialType.canvas 的默认颜色
    Color shadowColor, // 阴影颜色
    Color scaffoldBackgroundColor, // Scaffold的背景颜色。典型Material应用程序或应用程序内页面的背景颜色
    Color bottomAppBarColor, // BottomAppBar的默认颜色
    Color focusColor, // 突出颜色
    Color hoverColor, //  hoverColor
    Color highlightColor, // 高亮颜色,选中在泼墨动画期间使用的突出显示颜色，或用于指示菜单中的项。
    Color splashColor, // 墨水飞溅的颜色。InkWell
    InteractiveInkFeatureFactory splashFactory, // 定义由InkWell和InkResponse反应产生的墨溅的外观。
    Color selectedRowColor, // 用于突出显示选定行的颜色。
    Color unselectedWidgetColor, // 用于处于非活动(但已启用)状态的小部件的颜色。例如，未选中的复选框。通常与accentColor形成对比。也看到disabledColor。
    ToggleButtonsThemeData toggleButtonsTheme, // 切换按钮的主题
    Color secondaryHeaderColor, // 选定行时PaginatedDataTable标题的颜色。
    Color textSelectionColor, // 文本框中文本选择的颜色，如TextField
    Color cursorColor, // 文本框中光标的颜色，如TextField
    Color textSelectionHandleColor, // 调整当前选定的文本部分的句柄的颜色。
    Color backgroundColor, // 与主色形成对比的颜色，例如用作进度条的剩余部分。
    Color indicatorColor, // 选项卡中选定的选项卡指示器的颜色。
    Color hintColor, // 用于提示文本或占位符文本的颜色，例如在TextField中。
    Color errorColor, // 用于输入验证错误的颜色，例如在TextField中
    Color toggleableActiveColor, // 用于突出显示Switch、Radio和Checkbox等可切换小部件的活动状态的颜色。
    TextTheme primaryTextTheme, // 与primaryColor形成对比的文本主题
    TextTheme accentTextTheme, // 与accentColor形成对比的文本主题。
    InputDecorationTheme inputDecorationTheme, // 基于这个主题的 InputDecorator、TextField和TextFormField的默认InputDecoration值。
    IconThemeData primaryIconTheme, // 与primaryColor形成对比的图标主题
    IconThemeData accentIconTheme, //  与accentColor形成对比的图标主题。
    SliderThemeData sliderTheme, // 用于呈现Slider的颜色和形状
    TabBarTheme tabBarTheme, // 用于自定义选项卡栏指示器的大小、形状和颜色的主题。
    TooltipThemeData tooltipTheme, // tooltip主题
    CardTheme cardTheme, // Card的颜色和样式
    ChipThemeData chipTheme, // Chip的颜色和样式
    TargetPlatform platform, //
    MaterialTapTargetSize materialTapTargetSize, // 配置某些Material部件的命中测试大小
    bool applyElevationOverlayColor, // 应用叠加颜色
    PageTransitionsTheme pageTransitionsTheme, // 页面转换主题
    AppBarTheme appBarTheme, // appBar主题
    BottomAppBarTheme bottomAppBarTheme, // bottomAppBar主题
    ColorScheme colorScheme, // 拥有13种颜色，可用于配置大多数组件的颜色。
    DialogTheme dialogTheme, // 自定义Dialog的主题形状
    FloatingActionButtonThemeData floatingActionButtonTheme, // floating按钮主题
    NavigationRailThemeData navigationRailTheme, // 导航边栏主题
    Typography typography, // 用于配置TextTheme、primaryTextTheme和accentTextTheme的颜色和几何TextTheme值。
    CupertinoThemeData cupertinoOverrideTheme, 
    SnackBarThemeData snackBarTheme, 
    BottomSheetThemeData bottomSheetTheme, 
    PopupMenuThemeData popupMenuTheme, 
    MaterialBannerThemeData bannerTheme, 
    DividerThemeData dividerTheme, 
    ButtonBarThemeData buttonBarTheme, 
    BottomNavigationBarThemeData bottomNavigationBarTheme, 
    TimePickerThemeData timePickerTheme, 
    TextButtonThemeData textButtonTheme, 
    ElevatedButtonThemeData elevatedButtonTheme, 
    OutlinedButtonThemeData outlinedButtonTheme, 
    bool fixTextFieldOutlineLabel, 
  })
```

### 定义全局的Theme
```dart
MaterialApp(
  title: appName,
  theme: ThemeData(
    // Define the default brightness and colors.
    brightness: Brightness.dark,
    primaryColor: Colors.lightBlue[800],
    // Define the default font family.
    fontFamily: 'Georgia',

    // Define the default `TextTheme`. Use this to specify the default
    // text styling for headlines, titles, bodies of text, and more.
    textTheme: const TextTheme(
      headline1: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
      headline6: TextStyle(fontSize: 36.0, fontStyle: FontStyle.italic),
      bodyText2: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
    ),
  ),
  home: const MyHomePage(
    title: appName,
  ),
);
```

### 使用定义好的 Theme

在我们 widget 的 build 方法中调用` Theme.of(context) `函数，可以让这些主题样式生效。

`Theme.of(context)` 会查询 widget 树，并返回其中最近的 Theme。所以他会优先返回我们之前定义过的一个独立的 Theme，如果找不到，它会返回全局 theme。

实际上，`FloatingActionButton `就是使用这种方式来定义自己的 accentColor 的。

```dart
Container(
  color: Theme.of(context).colorScheme.secondary,
  child: Text(
    'Text with a background color',
    style: Theme.of(context).textTheme.headline6,
  ),
),
```


