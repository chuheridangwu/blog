# 其他动画

动画的原理就是将每一帧画面进行快速刷新，由于人眼的视觉效果，看到的就是一个连续的动画。决定动画流畅度的一个重要指标就是帧率`FPS（Frame Per Second）`，即每秒的动画帧数。只要动画帧率超过16FPS，就比较流畅了。

在我们之前的展示中，不管是`AnimatedContainer`还是`AnimatedBuilder`,我们观察它的源码，会发现其实都是系统封装好的控件，最后还是使用的`AnimationController`，当我们将`AnimationController`传过去的时候，它会进行做一个监听操作，然后刷新状态
* `AnimatedContainer` -> `ImplicitlyAnimatedWidget` -> `ImplicitlyAnimatedWidgetState`中包含 `AnimationController`
* `AnimatedBuilder` -> `AnimatedWidget` -> `_AnimatedState`中包含 `AnimationController` -> 监听`_handleChange `方法 -> 调用`setState()`

## 关于Ticker
`Ticker`主要用来监听屏幕的刷新回调,我们使用`AnimationController`时总是要添加`SingleTickerProviderStateMixin`,这是系统为我们写好的`Ticker`。

下面我们简单的自定义一个`Tiker`实现一个动画，这里只是简单的调用，如果是实际情况需要考虑的情况很多，屏幕的刷帧率，跳转到其他界面，进入后台等等情况:
```data
class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  late Ticker _ticker;
  var _height = 300.0;

  @override
  void initState() {
    super.initState();
    _ticker = Ticker((Duration duration){
      setState(() {
        _height --;
        if (_height <= 0) {
          _height = 300;
        }
      });
    });
    _ticker.start();
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          width: 300,
          height: _height,
          color: Colors.blue,
        ),
      ),
    );
  }
}
```

## 转场动画 Hero
`Hero`指的是可以在路由(页面)之间“飞行”的widget，简单来说`Hero`动画就是在路由切换时，有一个共享的`widget`可以在新旧路由间切换。由于共享的`widget`在新旧路由页面上的位置、外观可能有所差异，所以在路由切换时会从旧路逐渐过渡到新路由中的指定位置，这样就会产生一个`Hero`动画。`Hero`中两个`Widget`对应的`tag`必须是一致的，并且是界面上唯一的。

Hero 动画有很多，比如从商品列表点击图片到商品详情，商品图片从列表上慢慢移动到详情上的大图。或者举下面的例子，假设有两个路由A和B，他们的内容交互如下：
A：包含一个用户头像，圆形，点击后跳到B路由，可以查看大图。
B：显示用户头像原图，矩形；

在AB两个路由之间跳转的时候，用户头像会逐渐过渡到目标路由页的头像上，接下来我们先看看代码，然后再解析：
```dart
// 路由A
class HeroAnimationRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.topCenter,
      child: InkWell(
        child: Hero(
          tag: "avatar", //唯一标记，前后两个路由页Hero的tag必须相同
          child: ClipOval(
            child: Image.asset("images/avatar.png",
              width: 50.0,
            ),
          ),
        ),
        onTap: () {
          //打开B路由  
          Navigator.push(context, PageRouteBuilder(
              pageBuilder: (BuildContext context, Animation animation,
                  Animation secondaryAnimation) {
                return FadeTransition(
                  opacity: animation,
                  child: Scaffold(
                    appBar: AppBar(
                      title: Text("原图"),
                    ),
                    body: HeroAnimationRouteB(),
                  ),
                );
              })
          );
        },
      ),
    );
  }
}
```

路由B:

```dart
class HeroAnimationRouteB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Hero(
          tag: "avatar", //唯一标记，前后两个路由页Hero的tag必须相同
          child: Image.asset("images/avatar.png"),
      ),
    );
  }
}
```

我们可以看到，实现Hero动画只需要用Hero组件将要共享的widget包装起来，并提供一个相同的tag即可，中间的过渡帧都是Flutter Framework自动完成的。必须要注意， 前后路由页的共享Hero的tag必须是相同的，Flutter Framework内部正是通过tag来确定新旧路由页widget的对应关系的。

## CustomPainter 底层动画
如果上面的动画还不能够满足你，我们可以直接在画布上进行绘制。举一个雪人举例,背景设置为渐变颜色，画一个圆形头像和矩形身体，最后再画一些雪花，配合动画进行下落：
```dart

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin{

  late AnimationController _controller;
  // 制造雪花
  List<Snowflake> _snowflakes = List.generate(100, (_) => Snowflake());

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: Duration(seconds: 2),vsync: this)..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, // 设置无限宽，最终跟屏幕一样宽
      height: double.infinity,
      decoration: BoxDecoration(
        color: Colors.blue,
        gradient: LinearGradient( // 制作背景
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.blue,Colors.lightBlue,Colors.white],
          stops: [0.0,0.7,1.0]
        )
      ),
      child: AnimatedBuilder(
        animation: _controller, 
        builder: (_,__){

          // 雪花下落
          _snowflakes.forEach((snowflake) => snowflake.fall());

          return CustomPaint(painter: MyPainter(_snowflakes));
        })
    );
  }
}

class MyPainter extends CustomPainter{

  MyPainter(this._snowflakes);

  final List<Snowflake> _snowflakes;

  @override
  void paint(Canvas canvas, Size size) {
    final  whitePaint = Paint()..color = Colors.white;

    // 使用原型制作雪人头,offset：位置，radius:半径 paint： 修饰
    canvas.drawCircle(size.center(Offset(0,110)), 60, whitePaint);

    // 使用矩形制作雪人身体
    canvas.drawOval(Rect.fromCenter(center: size.center(Offset(0,330)), width: 250, height: 360), whitePaint);

    // 制作雪花
    _snowflakes.forEach((snowflake) => canvas.drawCircle(Offset(snowflake.x,snowflake.y), snowflake.radius, whitePaint));
    
  }

  // 是否需要重新绘制，这里因为有雪花飘落所以需要重新绘制
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) =>  true;
  
}

// 雪花
class Snowflake{
  double x = Random().nextDouble() * 400; // x
  double y = Random().nextDouble() * 800; // y值，雪花默认铺满屏幕
  double radius = Random().nextDouble() * 2 + 2; // 半径 2-4 之间
  double velocity = Random().nextDouble() * 4 + 2; // 下落速度 2-6 之间

  // 下落
  void fall(){
    y += velocity;
    if (y > 800) {
      y = 0;
      x = Random().nextDouble() * 400; // x
      radius = Random().nextDouble() * 2 + 2; // 半径 2-4 之间
      velocity = Random().nextDouble() * 4 + 2; // 下落速度 2-6 之间
    }
  }
}
```