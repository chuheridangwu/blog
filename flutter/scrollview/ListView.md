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