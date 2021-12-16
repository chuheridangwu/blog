# ListView
ListView 在项目开发中经常使用,跟iOS中的TableView类似,常用来做列表数据的展示,比如说商品列表、用户列表等等。常用功能有下拉刷新、上拉加载、点击跳转顶部、左滑删除 等等。

>ListView 默认是没有滚动条的，如果想添加滚动条在 ListView 外部添加 `Scrollbar`

ListView 中常用到的参数有以下几种:
```markdown
* `itemCount`: 列表项的数量，如果为null，则为无限列表
* `itemBuilder`: 列表项的构造器，只有使用 ListView.builder() 构造方法时才有
* `separatorBuilder`: 分割构造器，只有使用 ListView.separated() 构造方法时才有
* `controller`: 用来监听滚动
* `itemExtent`:  强制给与每一行的高度
* `shrinkWrap`：该属性表示是否根据子控件的内容来决定 ListView的长度，默认值为false 。默认情况下，ListView的会在滚动方向尽可能多的占用空间。当 ListView 在一个无边界(滚动方向上)的容器中时，**`shrinkWrap` 必须为 true**
* `scrollDirection`: 滚动方向
* `reverse`: 数据取反
* `cacheExtent`: 调整缓冲区的屏幕大小，以像素为单位，默认是屏幕的1/3
* `physics`: 滚动风格 + 是否允许滚动
    * `ClampingScrollPhysics()` 安卓风格，滚动到顶部不能继续滚动
    * `BouncingScrollPhysics()` iOS风格，滚动到顶部允许反弹
    * `AlwaysScrollableScrollPhysics()` 允许滚动
    * `NeverScrollableScrollPhysics()` 不允许滚动
```

>需要注意的是： ListView 默认Padding不为0，留有安全区域的高度

## ListView 的构造函数
ListView 常用的构造函数有三种,`ListView()`默认构造函数在项目中使用较少,`ListView.builder()`和`ListView.separated()`在项目中使用较多:
```markdown
* `ListView()`: 这种方式适合只有少量的子组件数量已知且比较少的情况,系统会将所有children一次性传递给 ListView
* `ListView.builder()`: 适合列表项比较多或者列表项不确定的情况
* `ListView.separated()`: 如果需要在列表之间建立分割组件的时候可以使用
```

####  ListView.builder()
ListView.builder()的重用原理跟TableView类似,可以通过`cacheExtent`参数设置屏幕缓冲区的大小。下面是简单的一个列子:
```dart
ListView.builder(
  itemCount: 100,
  itemExtent:44, // 强制高度为44
  itemBuilder: (context,index){
    return ListTile(title: Text("$index"));
}),
```

ListTile 是列表中常见的一种格式，比如iPhone手机设置中的cell。常见的参数有:
```markdown
* leading: 左边的视图
* title: 左边的文字
* trailing: 右边的视图
* onTap:  点击事件
```

####  ListView.separated()
在 ListView 中如果想在每个数据之间添加一些控件，需要使用`ListView.separated()`构造方法,使用`separatorBuilder`创建对应的控件。
```dart
ListView.separated(
  itemCount: 100,
  separatorBuilder: (context,index){  // 分割视图构造器
    if (index == 0) {
      return const Divider(color: Colors.red,thickness: 15,);
    }
    return const Divider();
  },
  itemBuilder: (context,index){
    return ListTile( title: Text("$index"));
}),
```

## 向左滑动 Dismissible
ListView 添加左滑功能时可以选择使用`Dismissible`控件,它相关的参数有：
```markdown
* `key`: key是必填参数，这里可以使用`UniqueKey()`
* `background`: 向右滑动时显示的视图
* `secondaryBackground`: 向左滑动时显示的视图
* `onDismissed`: 滑动结束之后的回调
* `confirmDismiss`: 确认是否真的要删除当前行，返回一个`Future<bool>`值 
* `direction`: 滑动方向，从左到右滑动还是从右到左滑动
* `onResize`: 删除时的尺寸变化，`onDismissed`之后它会被一直调用
* `resizeDuration`: 滑动结束之后删除行的时长
* `movementDuration`: 滑动结束之后还原的时长
* `dismissThresholds`: 滑动的比例,默认40%就算true,可以自己设置
```

我们制作一个简单的Demo看一下，这里将`Dismissible`的控件作用都进行了演示:
```dart
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return Dismissible(
      key: UniqueKey(),
      background: Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.only(left: 5),
        child:const Icon(Icons.phone,color: Colors.green,),
      ),
      secondaryBackground: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 5),
        child:const Icon(Icons.delete,color: Colors.red,),
      ),
      onDismissed: (direction){
        if (direction == DismissDirection.startToEnd) {
          print("向右滑动");
        }
        if (direction == DismissDirection.endToStart) {
          print("向左滑动");
        }
      },
      confirmDismiss: (direction) async {
          print("确认是否删除,true为是");
        await Future.delayed(const Duration(seconds: 2));
        return true;
      },
      onResize: (){
        print("onResize");
      },
      resizeDuration:const Duration(seconds: 5),
      movementDuration: const Duration(seconds: 3),
      dismissThresholds:const {
        DismissDirection.endToStart:0.4,
        DismissDirection.startToEnd:0.8
      },
      child: Container(
          alignment: Alignment.center,
          color: Colors.yellow[(index % 5) * 100],
          child: ListTile(title: Text("$index"))),
    );
  })
```
## ListView 例子
在这里简单写一个 ListView 的例子,包含下拉刷新，左滑删除 ,数据通过http对`https://api.github.com/events`进行请求,返回的数据使用Dart内置的编码库进行解析。

```dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

class ListView3 extends StatefulWidget {
  const ListView3({ Key? key }) : super(key: key);
  @override
  _ListView3State createState() => _ListView3State();
}

class _ListView3State extends State<ListView3> {
  final List<GitEvent> _events = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () async {
          await _refresh();
        },
        child: ListView.builder(
          itemCount: _events.length,
          itemBuilder: (context,index){
            final GitEvent event = _events[index];
            return Dismissible(
              key: ValueKey(event.id),
              onDismissed: (_){
                setState(() {
                  _events.removeWhere((e) => e.id == event.id);
                });
              },
              confirmDismiss: (_) async {
                return showDialog(context: context, builder: (_){
                  return _showAlertDialog();
                });
              },
              child: ListTile(leading: Image.network(event.avatarUrl),title: Text(event.userName),subtitle: Text(event.repoName),));
        }),
      )
    );
  }

  Widget _showAlertDialog(){
    return AlertDialog(
      title: const  Text("Are yout sure?"),
      content: const Text("Do you want to delete this item?"),
      actions: [
        TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text("Cancel")),
        TextButton(onPressed: () => Navigator.of(context).pop(true), child: const Text("Delete",style:  TextStyle(color: Colors.red),)),
      ],
    );
  }

  _refresh() async {
    final res = await http.get(Uri.https("api.github.com", "/events"));
    if (res.statusCode == 200) {
      List json = convert.jsonDecode(res.body);
      setState(() {
        _events.clear();
        _events.addAll(json.map((item) => GitEvent(item)));        
      });
    }
  }
}

class GitEvent{
  late String id;
  late String userName;
  late String avatarUrl;
  late String repoName;

  GitEvent(json){
    id = json["id"];
    userName = json["actor"]["login"];
    avatarUrl = json["actor"]["avatar_url"];
    repoName = json["repo"]["name"];
  }
}
```

## ListView 单独使用时顶部会出现部分空白
解决方案，使用`MediaQuery.removePadding`移除顶部空白
```dart
MediaQuery.removePadding(
  context: context,
  removeTop: true,
  child: ListView.builder(
    .......
  )
);
```
