# 数据共享（InheritedWidget）
InheritedWidget是Flutter中非常重要的一个功能型组件，它提供了一种数据在widget树中从上到下传递、共享的方式，比如我们在应用的根widget中通过InheritedWidget共享了一个数据，那么我们便可以在任意子widget中来获取该共享的数据！这个特性在一些需要在widget树中共享数据的场景中非常方便！如Flutter SDK中正是通过InheritedWidget来共享应用主题（Theme）和Locale (当前语言环境)信息的。

基于  InheritedWidget  实现的第三方  Provider

## Provider的用法

1. `provider: ^5.0.0` 安装
2. 创建监听模型
```dart
class DemoModel with ChangeNotifier{
  int _count = 0;
  int get count => _count;
  void add(){
    _count += 1;
    notifyListeners();
  }
}
```
3. 使用监听
```dart
 MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_){
          return DemoModel();
        }, ),
      ],
      child: Text("${context.watch<DemoModel>().count}")
 );
```
4. 获取`Text("${context.watch<DemoModel>().count}")`，获取结果有三种方式:
   1. `context.watch<T>()` : widget能够监听泛型T上发生的改变
   2. `context.read<T>()` : 直接返回T，不会监听改变
   3. `context.select<T， R>(R cb(T value))` : 允许widget只监听T上的一部分(R)
5. 修改`context.read<DemoModel>().add(); `