import 'dart:math';

main(List<String> args) {
  var a = 10;
  var b = 20;
  min(a, b);
  }

// 接口类可以使用 external 的方式先声明方法，通过@patch对方法进行实现，这样做的好处是可以实现多个平台不同的实现方式
abstract class shape{
  int getArea();
  String getInfo(){
    return "形状";
  }
}

class Person implements shape{
  @override
  int getArea() {
    // TODO: implement getArea
  }
  @override
  String getInfo() {
    // TODO: implement getInfo
    
  }
}
