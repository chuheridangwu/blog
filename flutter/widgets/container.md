# Container

## decoration
盒子修饰属性，设置颜色和渐变色时，Container属性不能直接设置颜色
```dart
Container(
    decoration: BoxDecoration(
        gradient:  LinearGradient( 
        begin: Alignment.topCenter, // 设置起始位置
        end:Alignment.bottomCenter, // 设置结束位置
        colors: [Colors.blue,Colors.white], // 设置渐变色
        stops: [0,1] // 设置渐变范围，默认是0-1
    ),
    boxShadow: [BoxShadow(spreadRadius: 25,blurRadius: 25)], // 设置阴影
    borderRadius: BorderRadius.circular(150) //设置圆角
)
```

设置