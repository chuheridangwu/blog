# Stream / SrteamBuilder
Stream 类似于iOS中的定时器，可以在活动期间不断反馈回调。SrteamBuilder 需要对应的 Srteam，根据它的回调不断的创建对应的Builder。

创建 Stream 的方式，可以直接通过`Stream.periodic()`创建，也可以通过`StreamController`创建。
```dart
// 创建Stream 
final stream = Stream.periodic(Duration.zero, (_) => 42);

// 通过 StreamController()创建对应的Stream
final _controller = StreamController();
// 添加事件
_controller.sink.add("123");
// 添加监听
_controller.stream.listen((event) { 
  
},onDone: (){

},onError: (error){

});

// 关闭流，关闭流之后不能再进行监听
@override
void dispose() {
  _controller.close();
  super.dispose();
}
```
默认情况下，一个数据流只能有一个人监听，如果想要多个人进行监听，需要将数据流进行广播，`final _controller = StreamController.broadcast();`，用一个简单的Demo举例:
```dart
class _StreamDemo2State extends State<StreamDemo2> {
  final _controller = StreamController.broadcast();

  @override
  void initState() {
    super.initState();

    _controller.stream.listen((event) {
      print("事件 Event - $event");
    }, onDone: () {
      print("流完成");
    }, onError: (error) {
      print("流error  $error");
    });
  }

  @override
  void dispose() {
    _controller.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextButton(
            child: const Text("添加事件"),
            onPressed: () {
              _controller.sink.add(1);
            },
          ),
          TextButton(
            child: const Text("添加事件"),
            onPressed: () {
              _controller.sink.add(10);
            },
          ),
          TextButton(
            child: const Text("关闭流"),
            onPressed: () {
              _controller.close();
            },
          ),
          TextButton(
            child: const Text("报错"),
            onPressed: () {
              _controller.sink.addError("stream error");
            },
          ),
          StreamBuilder(
            stream: _controller.stream,
            builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
              switch (snapshot.connectionState) {
                case ConnectionState.none:
                  return Text("Stream none");
                  break;
                case ConnectionState.waiting:
                  return Text("Stream waiting");
                  break;

                case ConnectionState.active:
                  return Text("Stream active 相关数据 = ${snapshot.data}");
                  break;

                case ConnectionState.done:
                  return Text("Stream done");
                  break;
                default:
              }
              return Text("data");
            },
          )
        ],
      ),
    );
  }
}
```

**广播数据流的缺陷，不会帮你保存数据流的状态，如果不是广播的数据流，当你进行监听之前对数据流做一些操作，在监听之后，非广播数据流会反馈给你这些事件**。比如下面的代码，在按钮中添加一些事件，隔5秒之后再进行监听，在程序运行之后点击对应的按钮，5秒钟之后数据流监听时会打印对应的事件：
```dart
class StreamDemo2 extends StatefulWidget {
  const StreamDemo2({Key? key}) : super(key: key);
  @override
  _StreamDemo2State createState() => _StreamDemo2State();
}

class _StreamDemo2State extends State<StreamDemo2> {
  final _controller = StreamController();

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 5),(){
      print("开始监听");
      _controller.stream.listen((event) {
        print("事件 Event - $event");
      }, onDone: () {
        print("流完成");
      }, onError: (error) {
        print("流error  $error");
      });
    });
  }

  @override
  void dispose() {
    _controller.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextButton(
            child: const Text("添加事件"),
            onPressed: () {
              _controller.sink.add(1);
            },
          ),
          TextButton(
            child: const Text("添加事件"),
            onPressed: () {
              _controller.sink.add(10);
            },
          ),
          TextButton(
            child: const Text("关闭流"),
            onPressed: () {
              _controller.close();
            },
          ),
          TextButton(
            child: const Text("报错"),
            onPressed: () {
              _controller.sink.addError("stream error");
            },
          )
        ],
      ),
    );
  }
}
```

#### 创建Stream的语法糖 async*
跟Future一样，创建Stream也有对应的语法糖， `async*` 表示这是一个Stream函数, `yield`返回一个Stream对象。

```dart
// 使用语法糖创建一个Stream
Stream<DateTime> getTime() async* {
  while (true) {
    await Future.delayed(const Duration(seconds: 1));
    yield DateTime.now();
  }
}
```

## StreamBuilder

StreamBuilder 中常用到的参数有:
```markdown
* `stream`: Stream事件
* `initialData`: 默认初始化的值
* `builder`: builder参数，会根据Stream事件进行回调，会调用包含两个参数，当前Context和AsyncSnapshot.
    * `AsyncSnapshot` 异步的状态,里面有一个连接状态 `connectionState`,状态有四种
        * `ConnectionState.none` Future/Stream为null
        * `ConnectionState.waiting` 连接到异步计算并等待交互
        * `ConnectionState.active` 活跃的数据流，Stream中才会有这个状态
        * `ConnectionState.done` 已完成
```