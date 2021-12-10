# 常用的Widget
Flutter一共有200多个Widget，我们不可能一一去练习，我们需要知道哪些是常用的widget，哪些widget是什么作用，可以对widget进行分类

## Button相关的widget

## 布局类相关的widget

Align
Center
LayoutBuilder  查看当前约束是什么


SizeBox
FractionallySizeBox()  比例盒子 0-1
ConstrainedBox  自定义约束

padding  间距


Flex 布局

Expanded  有弹性的
Flexible  有弹性的


Stack: 有位置的和没有位置  clipBehavior: 溢出时是否裁剪，（溢出部分不能被点击，）


Positioned

LimietdBox, maxHeight 如果父控件是无穷大的时候最大值，如果父控件不是无穷大随意使用


越大越好 double.infinity
越小越好  double.

## 容器类

## 滚动视图类的Widget

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
Scrollbar   |   滚动条
 



Scrollbar 滚动条

滚动条和ListView如果要产生对应关系，需要使用 controller将它们两个关联起来

Dismissible 滑动删除



## 动画相关的类

## 手势相关的类
GestureDetector  点击手势
Draggable 可以拖拽的小部件



## 其他的控件
Divider 分割线
RotatedBox  旋转控件,可以选择子控件
ListTile  配合ListView进行适配，类似于iOS中的一行cell，有左侧图标、标题、副标题 右侧图标
Visibility  设置透明度的Widget


## 功能性相关的类
ChangeNotifier
StreamBuilder
Listener  监听触摸事件或者鼠标事件


globalToLocal  
locakToGlobal
这两个值得到的都是自身控件到屏幕的X、Y，不同的地方在于是以自己为参照物还是以屏幕为参照物，以自己为参照物得到的是负值，以屏幕为参照物得到的是正值