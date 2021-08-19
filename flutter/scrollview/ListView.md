# ListView


## ListView 单独使用时顶部会出现部分空白
解决方案，使用`MediaQuery.removePadding`移除顶部空白
```
Widget _myListView(){
  return MediaQuery.removePadding(
    context: context,
    removeTop: true,
    child: ListView.builder(
     .......
    )
  );
}
```


## ListView用法

`shrinkWrap`：该属性表示是否根据子 widget 的总长度来设置 ListView的长度，默认值为false 。默认情况下，ListView的会在滚动方向尽可能多的占用空间。当 ListView 在一个无边界(滚动方向上)的容器中时，`shrinkWrap` 必须为 true

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
