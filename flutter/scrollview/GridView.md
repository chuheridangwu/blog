# GridView
GridView 类似于 iOS 中的 UICollectionView，一种网格视图，常用于创建多个网格列表或者瀑布流数据展示。常用到的参数有以下几种:
```markdown
* `gridDelegate`: 设置网络的代理，有两种方式，设置一行固定个数 或者 设置一行的item最大的宽度
    * `SliverGridDelegateWithFixedCrossAxisCount` 设置一行有几个item，系统计算item宽度
    * `SliverGridDelegateWithMaxCrossAxisExtent` 设置一行中item最大的宽度，由系统判断一行应该有几个item
* `controller`: 用来监听滚动
* `shrinkWrap`：该属性表示是否根据子 widget 的总长度来设置 ListView的长度，默认值为false。默认情况下，ListView的会在滚动方向尽可能多的占用空间。当 ListView 在一个无边界(滚动方向上)的容器中时，**`shrinkWrap` 必须为 true**
* `scrollDirection`: 滚动方向
* `reverse`: 数据取反
* `cacheExtent`: 调整缓冲区的屏幕大小，以像素为单位，默认是屏幕的1/3
* `physics`: 滚动风格 + 是否允许滚动
    * `ClampingScrollPhysics()` 安卓风格，滚动到顶部不能继续滚动
    * `BouncingScrollPhysics()` iOS风格，滚动到顶部允许反弹
    * `AlwaysScrollableScrollPhysics()` 允许滚动
    * `NeverScrollableScrollPhysics()` 不允许滚动
```

## GridView 构造函数
GridView 的构造函数有好几种,`GridView.builder()`在项目中使用较多,`GridView.count()`和`GridView.extent()`是一种创建GridView的快捷方式，它内部已经实现了代理,不支持动态加载。:
```markdown
* `GridView()`: 这种方式适合只有少量的子组件数量已知且比较少的情况,系统会将所有children一次性传递给 GridView
* `GridView.builder()`: 适合列表项比较多或者列表项不确定的情况
* `GridView.custom()`: 自定义网格item
* `GridView.count()`: 不支持动态加载,内部使用了SliverGridDelegateWithFixedCrossAxisCount，通过它可以快速创建横轴固定数量子元素的GridView
* `GridView.extent()`: 不支持动态加载,内部使用了SliverGridDelegateWithMaxCrossAxisExtent，通过它可以快速的创建横轴子元素为不超过设置最大长度的GridView
```

## 布局代理 - SliverGridDelegate
GridView 通过`SliverGridDelegate`代理设置网格的个数、间距、宽高比,`SliverGridDelegate`是抽象类,`SliverGridDelegateWithFixedCrossAxisCount`和`SliverGridDelegateWithMaxCrossAxisExtent`是它的具体实现类。

`SliverGridDelegateWithFixedCrossAxisCount`可以创建横轴固定数量子元素的GridView,它含有的参数:
```markdown
* `crossAxisCount`: 一行item的个数
* `mainAxisSpacing`: 主轴的间距
* `crossAxisSpacing`: 横轴的间距
* `childAspectRatio`: 控件的宽高比
* `mainAxisExtent`: 主轴子控件的大小
```

`SliverGridDelegateWithMaxCrossAxisExtent`可以创建横轴子元素为不超过设置最大长度的GridView,它含有的参数:
```markdown
* `maxCrossAxisExtent`: 横轴item的最大值，由系统判断一行有多少个item
* `mainAxisSpacing`: 主轴的间距
* `crossAxisSpacing`: 横轴的间距
* `childAspectRatio`: 控件的宽高比
* `mainAxisExtent`: 主轴子控件的大小
```

一个简单的例子:
```dart
// SliverGridDelegateWithFixedCrossAxisCount
GridView.builder(
  gridDelegate:const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    mainAxisSpacing: 5,
    crossAxisSpacing: 5
  ), itemBuilder: (context,index){
    return Container(color: Colors.red,child: Text("$index"));
  }
)

// SliverGridDelegateWithMaxCrossAxisExtent
GridView.builder(
  gridDelegate:const SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 80,
    mainAxisSpacing: 5,
    crossAxisSpacing: 5
  ), itemBuilder: (context,index){
    return Container(color: Colors.red,child: Text("$index"));
  }
)
```

## 关于 GridView.custom()方法
GridView.custom() 方法需要实现`gridDelegate` 和 `childrenDelegate`代理，一个简单的例子:
```dart
// GridView.custom()方法
GridView.custom(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    mainAxisSpacing: 5,
    crossAxisSpacing: 5,
  ),
  childrenDelegate: SliverChildListDelegate(_buildItems(20))
),

// 创建多个itme数组
List<Widget> _buildItems(int count) {
  List<Widget> listItems = [];

  for (int i = 0; i < count; i++) {
    listItems.add(
      Container(
        color: RandomColor().getColor(),
        child: Center(
          child: Text(
            'Grid Item ${i.toString()}',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 22.0),
          ),
        ),
      ),
    );
  }
  return listItems;
}

// 随机颜色
class RandomColor {
  Random random = Random();
  Color getColor() {
    return Color.fromARGB(random.nextInt(255), random.nextInt(255),
        random.nextInt(255), random.nextInt(255));
  }
}
```