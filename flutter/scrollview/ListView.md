# ListView


## ListView用法

shrinkWrap：该属性表示是否根据子widget的总长度来设置ListView的长度，默认值为false 。默认情况下，ListView的会在滚动方向尽可能多的占用空间。当ListView在一个无边界(滚动方向上)的容器中时，shrinkWrap必须为true

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
