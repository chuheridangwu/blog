# Flutter中是如何渲染的以及Key
Key在Flutter中是一个抽象，使用时必须是不能重复的,直接子类主要有局部键`LocalKey`和全局键`GlobalKey`,LocalKey有三个子类 ValueKey、ObjectKey、UniqueKey。
```markdown
* LocalKey: 应用于具有相同父Element的Widget进行比较，也是diff算法的核心所在
    * ValueKey: 以特定的值作为Key使用，比如字符串、数字 等等
    * ObjectKey: 根据内存中的内存地址做为Key
    * UniqueKey: 随机产生的Key，具有唯一性,只跟自己相等。比如在动画中Text的文字发生变化时需要将控件以前的Key丢掉，生成新的Key
* GlobalKey: 通常我们会使用GlobalKey某个Widget对应的 Widget 或 State 或 Element
```

我们知道了Key是什么，再来看一下不使用Key时在某些场景会发生什么？

## 不使用Key会发生什么问题
1. 第一步: 我们首先创建一个简单的按钮控件，颜色由外部传递，点击自身时，数字 += 1
```dart
  // 创建一个Box
  class Box extends StatefulWidget {
    final Color color;
    const Box(this.color,{Key? key }) : super(key: key);
    @override
    _BoxState createState() => _BoxState();
  }

  class _BoxState extends State<Box> {
    int _count = 0;
    @override
    Widget build(BuildContext context) {
      return Container(
        color: widget.color,
        child: TextButton(
          onPressed: ()=> setState(() => _count += 1), 
          child: Text("$_count",style:const TextStyle(fontSize: 32,color: Colors.white),)
      );
    }
  }
```
2. 第二步: 使用这个自定义控件,在项目中创建三个Box，点击按钮之后显示对应的数字，1. 如果不使用Key，当我们更换他们之间的顺序，热更新之后发现他们只是颜色上发生变化，数字并没有发生变化。2. 使用Key之后,如果在Box外部包裹其他控件,热更新之后Box内的数字会变为0
```dart
// 1. 如果不使用Key，交换Box时会遇到颜色发生变化,数字不变的问题
// 2. 使用Key之后,如果在Box外部包裹其他控件,热更新之后Box内的数字会变为0
class KeyDemo1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      alignment: Alignment.center,
      child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children:const [
            Box(Colors.orange,key: ValueKey(3)),
            Box(Colors.blue,key: ValueKey(2),),
            Box(Colors.orange,key:  ValueKey(1),),
          ],
        ),
    );
  }
}
```
为什么会有这个问题呢？Flutter是根据什么确定需要更新那些部分呢？

## Widget 和 Element 的对应关系
Widget并不是最终绘制在屏幕上的。Widget可以看做是一个蓝图，告诉你要绘制的是什么颜色、大小是什么、形状是什么。对应Widget的是Elemenet,Element管理里面的状态。这也是为什么`StatefulWidget`需要在State里面创建组件。

>这样做的好处是可以将状态和组件进行隔离,比如说热更新,如果我只是更改颜色和高度，我不需要去关注里面的状态。

在上面的代码中，Widget可以看做是一棵树🌲，管理着Column,Column里面有三个Box。当 Widget Tree 发生改变时,对应的 Element Tree 也需要对应的发生变化,他们之间的对应改需如下图:

![](../imgs/flutter_img_1.jpg ':size=350')

当 Widget Tree 发生变化时,Element Tree根据**控件类型 和 Key**来确定是否发生变化的，并且Element Tree只在跟他同级的Widget Tree中查找。我们再回头来看之前的两个问题。

1. 第一个问题: 不使用Key时,更换Box之间的顺序，热更新之后发现他们只是颜色上发生变化，数字并没有跟随发生变化，为什么会有这样的问题呢？
```markdown
问题的原因: 
当我们不使用Key时，Element只能根据类型来确定是否改变。
我们只是更换Box的顺序时，对Element来说，Widget Tree 是没有发生变化的，自己也不要改变。
```

1. 使用Key之后,如果在Box外部包裹其他控件,热更新之后Box内的数字会变为0
```markdown
问题的原因: 
Element Tree只会在同级的Widget Tree中进行查找。
当我们对Box包裹一个新的控件时，对Element Tree来说,因为在同级查询不到对应的Box，它会将旧的Box删除掉，产生一个新的被控件包裹的Box。
```

## 全局键 - GlobalKey
GlobalKey 可以帮助我们访问某个Widget的信息，包括Widget或State或Element等对象,类似于iOS中的Tag。跟Tag不同的是,我们在获取GlobalKey的时候，并不知道它的什么类型，需要通过`as 关键字`转换成对应的类型。

下面的代码是一个简单的例子，通过GlobalKey获取元素的大小、位置信息和State。
```dart
// GlobalKey
class GlobalKeyDemo extends StatefulWidget {
  const GlobalKeyDemo({ Key? key }) : super(key: key);
  @override
  State<GlobalKeyDemo> createState() => _GlobalKeyDemoState();
}

class _GlobalKeyDemoState extends State<GlobalKeyDemo> {
  final GlobalKey _key1 = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Center(
        child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Box3(Colors.yellow),
          Box3(Colors.blue,key: _key1,)
        ],
      ),
      ),
    floatingActionButton: FloatingActionButton(
      onPressed: (){
          final state  = _key1.currentState as _Box3State;
          final renderBox  = _key1.currentContext!.findRenderObject() as RenderBox;
          final widget  = _key1.currentWidget as Box3;
          print(state._count);
          //  获取顶部的宽高
          print(renderBox.localToGlobal(Offset.zero));
          print(renderBox.size);
          print(widget);
      },
      child: Icon(Icons.data_saver_off),
    ),
    );
  }
}

// 创建一个Box
class Box3 extends StatefulWidget {
  final Color color;
  const Box3(this.color,{Key? key }) : super(key: key);
  @override
  _Box3State createState() => _Box3State();
}

class _Box3State extends State<Box3> {
  int _count = 0;
  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.color,
      child: TextButton(
        onPressed: ()=> setState(() => _count += 1), 
        child: Text("$_count",style:const TextStyle(fontSize: 32,color: Colors.white),)),
    );
  }
}
```

## 推荐网址
* [Flutter的Widget-Element-RenderObject](https://mp.weixin.qq.com/s?__biz=Mzg5MDAzNzkwNA==&mid=2247483782&idx=1&sn=5cca87b95f82131ed0052d935f907807&chksm=cfe3f279f8947b6f9a21b92d7c5084e9404993ccce3c80f6329c0734f037f89d1d859651616f&scene=178&cur_album_id=1566028536430247937#rd)
* [Element、BuildContext和RenderObject](https://book.flutterchina.club/chapter14/element_buildcontext.html#_14-2-2-buildcontext)