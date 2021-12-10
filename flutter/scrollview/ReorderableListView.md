# ReorderableListView
ReorderableListView 是一个长按可以对子控件进行拖动的滚动视图,注意事项**子控件必须使用key**。相关的参数有:
```markdown
* `onReorder`: 子控件切换位置的回调
* `header`: 视图头部Widget
```

相关的子控件:
```dart
ReorderableListView(
    header: Container(color: Colors.yellow,height: 50,margin: const EdgeInsets.all(10),),
    children: List.generate(10, (index) => Container(key: UniqueKey(),height: 40,color: Colors.blue, alignment: Alignment.center,child:Text("$index"))), 
    onReorder: (oldIndex,newIndex){
    print("oldindex = $oldIndex, newIndex = $newIndex");
    }
)
```