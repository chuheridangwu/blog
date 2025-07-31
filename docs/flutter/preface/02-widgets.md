# Widget目录
Flutter一共有很多很多很多的Widget,在本章中对它进行分类归类，根据官网的方式将常用的Widget进行列出，可以当做一个Widget字典，不知道用什么控件实现的时候可以来此进行查询。

## 常见的Widget
主要列举一些经常用到的Widget,根据不同的作用对它们进行区分，比如 动画相关的Widget、布局相关的Widget、Text相关的Widget、Button相关的Widget、图片相关的Widget。

#### 布局相关的Widget
布局相关的小部件可以分为:单个子元素的Widget、多个子元素的Widget、Sliver的widget。参考[Flutter官网Layout Widget](https://flutter.cn/docs/development/ui/widgets/layout)

>LayoutBuilder，当不知道当前的父类约束是多少的时候，可以通过LayoutBuilder进行查看当前小部件的约束

##### 拥有单个子元素的Widget

Widget | 描述
------- | -------
Container | 一个拥有绘制、定位、调整大小、边框的 widget。
Align | 一个widget，它可以将其子widget对齐，并可以根据子widget的大小自动调整大小。关键参数`alignment`/`widthFactor`/`heightFactor`
Center | 继承自Align,将其子widget居中显示在自身内部的widget
AspectRatio | 一个widget,将子widget的大小指定为某个特定的长宽比，关键参数`aspectRatio`
FittedBox | 嵌套的盒子过大时，可以按自己的大小调整其子widget的大小和位置。关键参数`fit`/`alignment`
SizedBox | 一个特定大小的盒子。这个widget强制它的子视图有一个特定的宽度和高度。如果宽度或高度为NULL，则此widget将调整自身大小以匹配该维度中的孩子的大小。**SizedBox 是一个布局控件，默认不拦截手势，导致事件透传。**
FractionallySizedBox | 一个比例盒子，根据参数`widthFactor`/`heightFactor`设置自身为父控件对应比例
LimitedBox | 一个当其自身不受约束时才限制其大小的盒子,如果父控件对子控件有约束，则LimitedBox设置的约束无效，参数`maxHeight`/`maxWidth`
OverflowBox | 对其子部件施加不同约束的widget，允许子部件溢出父级。必须设置最大宽度或者最大高度才允许子部件移除,**溢出的部分点击是无效的。**
SizedOverflowBox | 一个具有特定大小但将其原始约束传递给其子级的小部件，然后它可能会溢出。父控件如果有约束则会按照父控件的约束，父控件没有约束时才会使用SizedOverflowBox的约束。
ConstrainedBox | 对其子部件通过设置最大和最小宽高施加附加约束的widget
Expanded | 扩展 Row、Column 、 Flex 子项的小部件，常用语来当做它们的剩余约束
Padding | 一个widget,会给其子widget添加指定的填充
Offstage | 一个布局widget，参数`offstage`可以控制其子widget的显示和隐藏。默认为true
Baseline | 根据子项的基线对它们的位置进行定位的widget,比如Row中默认是居中对齐，使用之后可以底部对齐
CustomSingleChildLayout | 可容纳一个子组件，并指定代理类对子组件进行排布。代理类可获取父容器区域和子组件的区域大小，及区域约束情况。在小说的应用中，常用户计算当前一行显示多少文字。
IntrinsicHeight | 一个widget，它将它的子widget的高度调整其本身实际的高度
IntrinsicWidth | 一个widget，它将它的子widget的宽度调整其本身实际的宽度
Transform | 一个widgegt,在绘制小部件之前将它进行旋转的小部件。快速创建的方法有`Transform.rotate()`/`Transform.scale()`/`Transform.translate()`
Directionality  | 修改小部件的阅读方向，适配阿拉伯语时需要，参数`textDirection`

##### 拥有多个子元素的Widget
多个子元素的Widget是指在一个小部件内可以装多个小部件。

Widget | 描述
------- | -------
Column | 继承自Flex,在垂直方向上排列子widget的列表，如果子部件过大会造成越界
Row | 继承自Flex,在水平方向上排列子widget的列表，如果子部件过大会造成越界,
Flow | 一个实现流式布局算法的widget,通过实现FlowDelegate计算每个widget的大小和位置。
GridView | 网格列表，UICollectionView的简化版本
ListView | 线性列表，UITableView的简化版本，可以配置ListTitle进行使用，ListTitle类似UITableViewCell | 
Wrap | 显示多个水平或垂直运行中其子项的小部件。使用场景 搜索框下的搜索记录或热门搜索关键字
Stack | 以重叠的方式显示子项的小部件，后加入的小部件显示在顶部，一般配合`Positioned`进行使用。子部件越界可以通过`clipBehavior: Clip.hardEdge,`进行裁剪
IndexedStack | 如果在应用中需要切换小部件，可以使用此控件，它会保留所有子部件的状态，根据`index`决定显示哪一个小部件
ListBody | 一个widget，它沿着一个给定的轴，顺序排列它的子元素,目前不知道它的使用场景是什么
CustomMultiChildLayout | 通过delegate去实现自定义布局，通过提供的delegate，可以实现控制节点的位置以及尺寸。
Table | 不能滚动的表格视图，内部包含多个TableRow。
LayoutBuilder | 在添加小部件之前可以知道当前的约束是多少。

##### Sliver的widget

Sliver控件名称 | 说明
------- | -------
CustomScrollView | 使用 slivers 创建自定义滚动效果的 ScrollView。
SliverList | 列表，对应ListView，代理使用`SliverChildListDelegate`
SliverFixedExtentList | 高度固定的列表ListView，指定itemExtent时
SliverPrototypeExtentList | 根据原型生成高度固定的列表 | ListView，指定prototypeItem 时
SliverGrid | 网格列表，对应GridView,代理使用`SliverChildBuilderDelegate`
SliverFillViewport | 包含多给子组件，每个都可以填满屏幕，对比PageView
SliverPadding | 内间距，对应Padding
SliverToBoxAdapter | 一个适配器，可以将 RenderBox 适配为 Sliver,比如使用 Text 和 Image 的时候通过SliverToBoxAdapter 转成Sliver控件
SliverAppBar | 对应 AppBar，主要是为了在 CustomScrollView 中使用。
SliverPersistentHeader | 滑动到顶部时可以固定住,主要在CustomScrollView 中使用。
SliverAnimatedList | 添加/删除列表项可以执行动画 | AnimatedList
CupertinoSliverNavigationBar | 一个 iOS 风格的导航栏，带有使用条子的 iOS-11 风格的大标题。
SliverOpacity | 对控件进行半透明操作
SliverSafeArea | 安全区域
SliverIgnorePointer | 不允许点击
SliverFillRemaining | 占领Sliver组件剩余的屏幕空间
SliverLayoutBuilder | 知道当前滚动视窗的剩余约束

#### 容器类

#### 滚动视图类的Widget

Widget | 场景
------- | -------
ListView | 列表视图，常用于商品展示，如果是简单的列表展示，可以搭配`ListTitle`使用
GridView | 网格视图，常用语商品展示，瀑布流数据展示
PageView | 分页滚动视图，常用首页开屏广告或者轮播图
TabBarView | 多个滚动视图组合，内部封装了PageView,TabBar 配合使用，使用场景比如订单列表中的`未付款、已付款、代发货、待收货、已完成`这种场景。
CustomScrollView | 自定义滚动视图
SingleChildScrollView | 类似于iOS中的UIScrollView,只能接收一个子组件,最好不要在内容超过屏幕太多时进行使用
ListWheelScrollView | 类似于iOS中的 UIPickerView的滚动视图，常用语选择时间或者地区
ReorderableListView | 自动拖拽子控件位置的滚动视图，在iOS中，需要使用UICollectionView进行实现
Scrollbar   |   右边的滚动条。如果要和ListView产生对应关系，需要使用 controller将它们两个关联起来
Dismissible | 滑动删除


#### 弹窗相关按钮

```dart
// 从底部弹出一个界面
showModalBottomSheet(context: context, builder: builder)
// 苹果的Modal效果，从底部弹出一个界面
showCupertinoModalPopup(context: context, builder: builder)
```

#### 动画相关的类

#### 文本相关的小部件

Widget | 描述
------- | -------
DefaultTextStyle | 应用于没有明确样式的后代 Text 小部件的文本样式。
RichText | 富文本，文本使用 TextSpan 对象数描述。
Text | 具有单一样式的文本。

#### 手势相关的类

Widget | 描述
------- | -------
GestureDetector | 点击手势
Draggable | 可以拖拽的小部件  
DraggableScrollableSheet | 可以滑动的小部件


#### 其他的控件
Divider | 分割线
RotatedBox  | 旋转控件,可以选择子控件
ListTile | 配合ListView进行适配，类似于iOS中的一行cell，有左侧图标、标题、副标题 右侧图标
Visibility | 设置透明度的Widget
IgnorePointer  |  创建一个不能被点击的widget
Material  | 添加阴影
BottomAppBar |  底部导航栏，配合悬浮按钮进行使用 
BottomNavigationBar |  底部导航栏,单个Item使用`BottomNavigationBarItem` 控件,主要参数`items`
BottomNavigationBarItem  | 底部导航栏按钮
Drawer  |  左右侧滑界面，在`Scaffold`部件中使用
TextField | 输入框
InputDecoration  | 输入框的描述
InputBorder  | 输入框的边框
AnnotatedRegion |  修改状态栏颜色
Opacity  | 透明控件，`value`控制透明度
DefaultTabController  |  配合TabBar和TabBarView使用
BackdropFilter  |  高斯模糊效果
RadioListTile |  单选列表
Radio  | 单选按钮,不能更改大小，可以使用Tran
Switch  | 选择开关
Checkbox  |  复选框

1、Flutter自带工具 DevTools
2、使用字节开源的ume
3、使用滴滴开源的 dokit


#### 功能性相关的类
ChangeNotifier
StreamBuilder
Listener  监听触摸事件或者鼠标事件
NotificationListener  监听通知事件
InheritedWidget  可以在子树中共享数据
GlobalKey  可以获取到控件的位置和大小
FocusNode  可以获取到焦点
MediaQuery  可以获取到设备的信息
ScaffoldMessenger  可以显示一个消息提示框
Timer  定时器
Animation  动画
AnimatedWidget  动画的控件
AnimatedBuilder  动画的构建器
AnimatedContainer  动画的容器
AnimatedCrossFade  动画的交叉淡入淡出
AnimatedOpacity  动画的透明度
AnimatedPositioned  动画的位置
AnimatedSize  动画的大小
AnimatedSwitcher  动画的切换器
AnimatedList  动画的列表
AnimatedIcon  动画的图标
AnimatedDefaultTextStyle  动画的默认文本样式
AnimatedTheme  动画的主题
AnimatedAlign  动画的对齐
AnimatedPadding  动画的内边距

globalToLocal  
locakToGlobal
这两个值得到的都是自身控件到屏幕的X、Y，不同的地方在于是以自己为参照物还是以屏幕为参照物，以自己为参照物得到的是负值，以屏幕为参照物得到的是正值

#### [Cupertino iOS风格的Widget](https://flutter.cn/docs/development/ui/widgets/cupertino)
Material 设计风格是为全平台设计的。当编写一个 Material 风格的 app 时，它运行在任何平台上都是有着 Material 的设计展示，即使是在 iOS 下。但是如果你想要让你的 app 更像标准的 iOS 风格的话，需要用到 Cupertino 库。

安卓和iOS的手机是两种风格,Flutter有些地方为了我们做了适配，比如滚动视图，如果是安卓手机下拉到顶的时候不会有回弹效果，而iOS则会回弹一下再归位, 下面是iOS风格的一些Widge。

控件 | 描述
------- | -------
CupertinoActivityIndicator | 一个iOS风格的loading指示器。显示一个圆形的灰色转圈菊花.
CupertinoAlertDialog | iOS风格的底部操作列表
CupertinoDialog | iOS风格的对话框
CupertinoDialogAction | iOS对话框的按钮
CupertinoButton | iOS风格的按钮
CupertinoSlider | iOS风格的滑竿
CupertinoSwitch | iOS风格的状态开关
CupertinoContextMenu | iOS风格的模态按钮，长按弹出，类似于iOS桌面长按图标弹出的按钮
CupertinoSearchTextField | iOS风格搜索框
CupertinoNavigationBar | iOS风格的顶部导航栏
CupertinoPageTransition | iOS风格的过度动画
CupertinoFullscreenDialogTransition | iOS风格的弹窗动画
CupertinoTimerPicker | iOS风格时间选择器
CupertinoDatePicker | iOS风格日历选择器
CupertinoPicker | iOS风格内容选择器
CupertinoTextField | iOS风格键盘上的输入框
CupertinoSegmentedControl | iOS风格互斥选择器
CupertinoSlidingSegmentedControl | 一个 iOS-13 风格的分段控件。用于在水平列表中选择互斥的选项


## 小试身手

LayoutBuilder 可以查看当前小部件面临的父级约束.
```dart
Container(
  color: Colors.red,
  child: LayoutBuilder(
    builder: (BuildContext context, BoxConstraints constraints) { 
      print("当前的约束是 -> $constraints");
      return Container(color: Colors.blue,);
    },
  )
)
```

LimitedBox的练习，例如下面的代码，ListView中添加Container，并且没有给Container设置宽高，就会导致Container自身不受约束，这个时候添加LimitedBox才有效。
```dart
ListView(
  children: List.generate(10, (index) => LimitedBox(
    maxHeight: 20,
    maxWidth: 200,
    child:Container(color: Colors.yellow)),
  ),
)
```

SizedOverflowBox的练习， SizedOverflowBox 和 OverflowBox的区别在于，第一 SizedOverflowBox 是可以设置大小的，如果父控件没有约束，则使用它自身的大小， 第二 它会将其原始约束传递给其子级的小部件。
例如下面的代码，如果第一层的Container有宽高约束，则SizedOverflowBox的宽高则不起作用
```dart
Container(
//  width: 300,
//  height: 300,
  color: Colors.blue,
  child: SizedOverflowBox(
    alignment: Alignment.topLeft,
    size: Size(300, 600),
    child: Container(
      width: 50,
      height: 80,
      color: Colors.amber,
    ),
  ),
)
```

Baseline基准线是指将所有的元素都统一的放在一条水平线上。多用文字排版中的时候，可以将不同大小的文字处于同一水平线上。比如下面的代码，如果不使用Baseline则会默认居中对齐，使用BaseLine之后底部对齐。
```dart
Padding(
  padding: const EdgeInsets.only(top: 200),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      
      // Text("123",style: TextStyle(fontSize: 12),),
      // Container(color: Colors.blue,width: 120,height: 130,),
      // Text("456",style: TextStyle(fontSize: 32),)

      Baseline(baseline: 0, baselineType: TextBaseline.ideographic,child: Text("123",style: TextStyle(fontSize: 12),)),
      Baseline(baseline: 0, baselineType: TextBaseline.ideographic,child: Container(color: Colors.blue,width: 60,height: 80,)),
      Baseline(baseline: 0, baselineType: TextBaseline.ideographic,child: Text("456",style: TextStyle(fontSize: 32),)),
        ],
    ),
),
```

 CustomSingleChildLayout组件可容纳一个子组件，并指定代理类对子组件进行排布。代理类可获取父容器区域和子组件的区域大小，及区域约束情况。获取布局的能力主要在代理身上。参考下面的代码：
 ```dart
Container(
  color: Colors.red,
  child: CustomSingleChildLayout(
    delegate: _CustomLayoutDemoDelegate(),
    child: Container(color: Colors.yellow,)),
)


class _CustomLayoutDemoDelegate extends SingleChildLayoutDelegate {
    @override
  bool shouldRelayout(SingleChildLayoutDelegate oldDelegate) {
    return true;
  }

  // 获取大小约束
  @override
  Size getSize(BoxConstraints constraints) {
    print('----getSize:----constraints:$constraints----');
    return super.getSize(constraints);
  }
  // 位置是否偏移
  @override
  Offset getPositionForChild(Size size, Size childSize) {
    print('----size:$size----childSize:$childSize----');
    // return super.getPositionForChild(size, childSize);
    return Offset(size.width/8,0 );
  }

  // 传递给子部件约束
  @override
  BoxConstraints getConstraintsForChild(BoxConstraints constraints) {
    print('----getConstraintsForChild:----constraints:$constraints----');
    // return super.getConstraintsForChild(constraints);
    return BoxConstraints(
      maxHeight: constraints.maxHeight/1.5,
      maxWidth: constraints.maxWidth/1.5,
      minHeight: constraints.minHeight/8,
      minWidth: constraints.minHeight/8,
    );
  }
}
```

IntrinsicHeight 将它的子widget的高度调整其本身实际的高度,比如嵌套在Column中，Column只会显示它子部件的实际占用大小。
```dart
Container(
  color: Colors.red,
  child: Center(
    child:Container(
      color: Colors.yellow,
      child: IntrinsicHeight(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
              FlutterLogo(size: 120,),
              FlutterLogo(size: 120,),
              Text("data")
            ],
        ),
      ),
    )
  ),
)
```

Flow 流式布局的Widget，通过FlowDelegate去计算每个widget的大小和位置。
```dart
import 'package:flutter/material.dart';

void main() => runApp(const FlowApp());

class FlowApp extends StatelessWidget {
  const FlowApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Flow Example'),
        ),
        body: const FlowMenu(),
      ),
    );
  }
}

class FlowMenu extends StatefulWidget {
  const FlowMenu({Key? key}) : super(key: key);

  @override
  State<FlowMenu> createState() => _FlowMenuState();
}

class _FlowMenuState extends State<FlowMenu>
    with SingleTickerProviderStateMixin {
  late AnimationController menuAnimation;
  IconData lastTapped = Icons.notifications;
  final List<IconData> menuItems = <IconData>[
    Icons.home,
    Icons.new_releases,
    Icons.notifications,
    Icons.settings,
    Icons.menu,
  ];

  void _updateMenu(IconData icon) {
    if (icon != Icons.menu) {
      setState(() => lastTapped = icon);
    }
  }

  @override
  void initState() {
    super.initState();
    menuAnimation = AnimationController(
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
  }

  Widget flowMenuItem(IconData icon) {
    final double buttonDiameter =
        MediaQuery.of(context).size.width / menuItems.length;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: RawMaterialButton(
        fillColor: lastTapped == icon ? Colors.amber[700] : Colors.blue,
        splashColor: Colors.amber[100],
        shape: const CircleBorder(),
        constraints: BoxConstraints.tight(Size(buttonDiameter, buttonDiameter)),
        onPressed: () {
          _updateMenu(icon);
          menuAnimation.status == AnimationStatus.completed
              ? menuAnimation.reverse()
              : menuAnimation.forward();
        },
        child: Icon(
          icon,
          color: Colors.white,
          size: 45.0,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Flow(
      delegate: FlowMenuDelegate(menuAnimation: menuAnimation),
      children:
          menuItems.map<Widget>((IconData icon) => flowMenuItem(icon)).toList(),
    );
  }
}

class FlowMenuDelegate extends FlowDelegate {
  FlowMenuDelegate({required this.menuAnimation})
      : super(repaint: menuAnimation);

  final Animation<double> menuAnimation;

  @override
  bool shouldRepaint(FlowMenuDelegate oldDelegate) {
    return menuAnimation != oldDelegate.menuAnimation;
  }

  @override
  void paintChildren(FlowPaintingContext context) {
    double dx = 0.0;
    for (int i = 0; i < context.childCount; ++i) {
      dx = context.getChildSize(i)!.width * i;
      context.paintChild(
        i,
        transform: Matrix4.translationValues(
          dx * menuAnimation.value,
          0,
          0,
        ),
      );
    }
  }
}
```
IndexedStack,如果在应用中需要切换小部件，可以使用此控件，它会保留所有子部件的状态，根据`index`决定显示哪一个小部件。
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    IndexedStack(
      index: _index,
      children: [
        Container(width: 60,height: 60,color: Colors.red,),
        Container(width: 60,height: 60,color: Colors.red[200],),
        Container(width: 60,height: 60,color: Colors.blue[400],),
      ],
    ),
    IconButton(onPressed: (){
      setState(() {
          _index += 1;
          _index %= 3;
      });
    }, icon: Icon(Icons.refresh))
  ],
)
```
CustomMultiChildLayout    通过delegate去实现自定义布局，通过提供的delegate，可以实现控制节点的位置以及尺寸。
```dart
class TestLayoutDelegate extends MultiChildLayoutDelegate {
  TestLayoutDelegate();

  static const String title = 'title';
  static const String description = 'description';

  @override
  void performLayout(Size size) {
    final BoxConstraints constraints =
        new BoxConstraints(maxWidth: size.width);

    final Size titleSize = layoutChild(title, constraints);
    positionChild(title, new Offset(0.0, 0.0));

    final double descriptionY = titleSize.height;
    layoutChild(description, constraints);
    positionChild(description, new Offset(0.0, descriptionY));
  }

  @override
  bool shouldRelayout(TestLayoutDelegate oldDelegate) => false;
}

Container(
  width: 200.0,
  height: 100.0,
  color: Colors.yellow,
  child: CustomMultiChildLayout(
    delegate: TestLayoutDelegate(),
    children: <Widget>[
      LayoutId(
        id: TestLayoutDelegate.title,
        child: new Text("This is title",
            style: TextStyle(fontSize: 20.0, color: Colors.black)),
      ),
      LayoutId(
        id: TestLayoutDelegate.description,
        child: new Text("This is description",
            style: TextStyle(fontSize: 14.0, color: Colors.red)),
      ),
    ],
  ),
)
```

## 单选框Radio
Radio,不能手动设置大小，可以选择通过`Transform.scale`的方式对其进行缩小，但是实际大小并不会变化。
```dart
class Radio<T> extends StatefulWidget {
  const Radio({
    Key key,
    @required this.value,       // 当前单选框设置的值
    @required this.groupValue,  // 当前单选框选定状态的值
    @required this.onChanged,   // 选中回调
    this.activeColor,           // 选中状态颜色
    this.focusColor,            // 获取焦点时颜色
    this.hoverColor,            // 高亮时颜色
    this.materialTapTargetSize, // 点击范围最小大小
    this.focusNode,
    this.autofocus = false,
  })
}

```
## 推荐阅读
* [Widget目录](https://flutterchina.club/w  idgets/)
* [核心Widget目录](https://flutter.cn/docs/development/ui/widgets)
* [6.1 可滚动组件简介](https://book.flutterchina.club/chapter6/intro.html#scrollable)