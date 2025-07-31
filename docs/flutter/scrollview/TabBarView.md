# TabBarView
项目中经常使用的组合，如果要去掉导航栏需要使用`PreferredSize`自定义高度， TabBar 和 TabBarView 需要使用一个默认的`DefaultTabController`进行包裹。Appbar使用`elevation: 0`,//隐藏导航栏底部阴影分割线.TabBar的背景色跟随它的父控件。

```dart
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: tabs.length,
      child: Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(40),
          child: AppBar(
            automaticallyImplyLeading: false,
            excludeHeaderSemantics: true,
            bottom: TabBar(
              controller: _tabController,
              tabs: tabs.map((e) =>  Text(e)).toList(),
            ),
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: tabs.map((e){
        return Container(
          alignment: Alignment.center,
          child: Text(e, textScaleFactor: 5),
        );
        }).toList()),
        floatingActionButton: floatingBtn(),
      ),
    );
  }
```

使用TabBarView的时候，每次切换tabbar都会重置，继承自 AutomaticKeepAliveClientMixin 和重写 wantKeepAlive 方法。保持widget的状态
```dart
class _OrderListPageState extends BaseState with AutomaticKeepAliveClientMixin{
  @override
  Widget build(BuildContext context) { return Text('Hello World');
  } 
  @override
  bool get wantKeepAlive => true;
}
```

## Tabbar
```dart
  const TabBar({
    Key key,
    @required this.tabs,//显示的标签内容，一般使用Tab对象,也可以是其他的Widget
    this.controller,//TabController对象
    this.isScrollable = false,//是否可滚动
    this.indicatorColor,//指示器颜色
    this.indicatorWeight = 2.0,//指示器高度
    this.indicatorPadding = EdgeInsets.zero,//底部指示器的Padding
    this.indicator,//指示器decoration，例如边框等
    this.indicatorSize,//指示器大小计算方式，TabBarIndicatorSize.label跟文字等宽,TabBarIndicatorSize.tab跟每个tab等宽
    this.labelColor,//选中label颜色
    this.labelStyle,//选中label的Style
    this.labelPadding,//每个label的padding值
    this.unselectedLabelColor,//未选中label颜色
    this.unselectedLabelStyle,//未选中label的Style
    }) : assert(tabs != null),
    assert(isScrollable != null),
    assert(indicator != null || (indicatorWeight != null && indicatorWeight > 0.0)),
    assert(indicator != null || (indicatorPadding != null)),
    super(key: key);
```

TabbarView默认是全屏，使用sizeBox限制高度
```dart
SizedBox(
    height: 220,
    child: DefaultTabController(
      length: _giftGroups.length,
      child: TabBarView(
          controller: _tabController,
          children: _giftGroups.map((giftGroup) {
            return itemView(giftGroup.gifts);
          }).toList()),
    ),
  );
```

## 动态添加tabbar
根据接口数据确定是否隐藏tabbar，有几个坑需要注意。
1. TabBarView 的组件内容需要根据 _tabs 的长度进行重新创建，不能使用数据封装，会造成不能删除的情况
2. _tabController 需要重新初始化信息，长度需要跟 _tabs 保持一致
3. 如果在动态修改前，你已经滑动了TabBarView，动态修改 tabbar 后,需要主动跳转对应位置，内容不会自动跳转
 
```
setState(() {
  _tabs = ["1", "2", "3", "4", "5"];
  _tabController = TabController(
      initialIndex: 1, length: _tabs.length, vsync: this);
  _tabController.animateTo(0);
});
```