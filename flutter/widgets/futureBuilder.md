# FutureBuilder
在开发中，有些时候我们需要根据返回的数据或者延时延时对应的控件，当有这种场景时我们可以考虑使用FutureBuilder 组件，它会根据Future事件，重新创建当前组件。

FutureBuilder 中常用到的参数有:
```markdown
* `future`: Future事件
* `initialData`: 默认初始化的值
* `builder`: builder参数，会根据Future事件进行回调，会调用包含两个参数，当前Context和AsyncSnapshot.
    * `AsyncSnapshot` 异步的状态,里面有一个连接状态 `connectionState`,状态有四种
        * `ConnectionState.none` Future/Stream为null
        * `ConnectionState.waiting` 连接到异步计算并等待交互
        * `ConnectionState.active` 活跃的数据流，Stream中才会有这个状态
        * `ConnectionState.done` 已完成
```

简单的FutureBuilder示例：
```dart
FutureBuilder(
    future: Future.delayed(const Duration(seconds: 1),() =>  1234),
    builder: (BuildContext context,AsyncSnapshot<dynamic> snapshot){
        if (snapshot.hasError) {
            return const Icon(Icons.error);
        }
        if (snapshot.hasData) {
            return Center(child: Text("${snapshot.data}"));
        }
        return const CircularProgressIndicator();
    },
)
```