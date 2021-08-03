# Dart
Dart使用`main`函数作为入口，使用`print`进行打印,使用`runtimeType`属性获取变量的类型。Dart中布尔类型没有非零即真或者非空即真。

## 声明变量
Dart 声明变量有两种方式，指定变量类型或者根据变量的值推导变量类型。
* const修饰的变量必须在编译期间有一个确定值
* final可以通过计算/函数获取值。

```dart
String name = "xiaoming";
var name = "xiaoming";
const name = "小明";
final name = "小明";
```

## String
字符串拼接使用`my name is ${name}`进行拼接

## 集合
集合包含列表list、映射Map、集合Set。
```dart
// List
 var names = ["1","2","3"];
// 利用set给数组去重  
 names = Set.from(names).toList();
 // Set
 var moves =  {"莎士比亚","肖金钱豹","花蝴蝶"};
 // Map
 var info = {"name":"小明","age":12};
```

## 函数
dart中没有函数重载。
```dart
// 定义函数
int sum(int num1,int num2){
    return num1 + num2;
}
// 函数可选参数有两种形式，一种是按位置可选[]，一种是按形参名可选{},另外只有可选参数才有默认值
void sayHello(String name,[int age = 10,double height]){

}

void sayHello1(String name,{int age,double height}){

}
// 匿名函数，在Dart中函数是可以传递的
(){}
// 箭头函数，只有当函数体只有一行时使用箭头函数
()=>print("箭头函数")
// 定义一个传参函数
void sum1(int foo(int num1, int num2)){

}
// 对函数进行别名封装
typedef Calculate = int Function(int num1, int num2);

void sum1(Calculate fun){
  print(fun(20,20));
}
```

## 符号

* `name ??= "xiaoming"`:name有值时使用name，没有值时使用右边的值
* `name1 = name ?? "小明"`同上

级联运算符，类似与链式语法。使用..进行连接
```dart
 var p = Person()
 ..name="123"
 ..run();
```

## 循环
```
 for (var i = 0; i < 10; i++) {
   
 }

 for (var item in items) {
   
 }
```

## enum 结构体

```dart
Colors.red/Colors.value/Colors.red.index
enum Colors{
  red,
  blue,
  yellow
}
```

## 类和对象
所有的类默认继承自Object,dart默认会给类一个构造函数，如果我们自定义了构造函数，默认的构造函数就不能使用了。 

**static 修饰的成员变量或者方法是类属性/方法。**

`_`下划线是区分 私有成员变量/方法 的一种方式

object:调用方法时，编译时会报错
dynamic:调用方法时，编译不会报错，但是运行时存在安全隐患。

```dart
class Person{
  // 私有成员属性
  String _name;
  int age;
  double height;
  // 系统默认会有一个构造函数，如果重写不会再调用系统默认的构造函数
  Person(this._name,this.age);
  // 命名构造函数
  Person.withNameAgeHeight(this._name,this.age,this.height);
  Person.fromMap(Map<String,dynamic> map){
    this._name = map["name"];
    this.age = map["age"];
    this.height = map["height"];
  }
}
```

类的初始化列表,只有成员变量用final修饰，并且是可选参数时，使用初始化列表更加灵活
```dart
class Person{
  final String name;
  final int age;
  Person(this.name,{int age}): age = age ?? 10{

  }
}
```

构造函数的重定向
```dart
class Person{
  String name;
  int age;
  // 构造函数的重定向
  Person(String name):this._internal(name,0);
  Person._internal(this.name,this.age);
}
```

工厂构造函数 `factory`，使用factory修饰的方法属于工厂构造函数，可以手动返回一个对象
```dart
class Person{
  String name;
  String color;

  // 类属性
  static final Map<String,Person> _nameMap = {};
  static final Map<String,Person> _colorMap = {};
  
  // 工厂构造函数,可以手动返回一个对象
  factory Person.withName(String name){
    if(_nameMap.containsKey(name)){
      return _nameMap[name];
    }else{
      Person p = new Person(name, "color");
      _nameMap[name] = p;
      return p;
    }
  }

  factory Person.withColor(String color){
    if(_colorMap.containsKey(color)){
      return _colorMap[color];
    }else{
      Person p = Person("name",color);
      _colorMap[color] = p;
      return p;
    }
  }

  Person(this.name,this.color);
}
```

set/get
```dart
main(List<String> args) {
  // 使用set
  final p1 = Person1();
  p1.setName = "123";
}

class Person1{
  String name;
  set setName(String name){
    this.name = name;
  }

  get getName => this.name;
}
```

继承，调用父类的初始化方法
```dart
class Animal{
  int age;
  Animal(this.age);
}

class Person extends Animal{
  String name;
  Person(this.name,int age): super(age);
}
```

抽象类abstract
```dart
// 接口类可以使用 external 的方式先声明方法，通过@patch对方法进行实现，这样做的好处是可以实现多个平台不同的实现方式
abstract class shape{
  int getArea();
  String getInfo(){
    return "形状";
  }
}

class Person extends shape{
  @override
  int getArea() {
    // TODO: implement getArea
  }
}
```

隐式接口 `implements`,如果一个类是接口类，当其他类进行实现时，需要实现它的所有方法。

## 库的使用
Dart中一个dart文件就是一个库，导入一个库使用`import`关键字。
当两个库有同一个方法时会引起冲突，导入库的时候使用`as`给库文件起一个别名`import 'dart:math' as mUtils;`
如果导入库时要隐藏或者显示某个方法使用`hide`或者`show`,`import 'demo.dart' show sum,mul;`

在一个文件下的dart文件可以使用export 导入一个公共头文件。

使用第三方库需要创建一个文件`pubspec.yaml`，文件中的内容
```dart
name:
description:
dependencies:
```
1. 点击进入[第三方库网站](https://pub.dev/)
2. 输入找到的第三方库，选择 installing 进行安装


widget:
有状态的widget：statefulwidget,在运行过程中有一些数据需要改变
无状态的widget，statelesswidget,在运行过程中内容都是确定的

## dart 中List使用Map方法获取到索引的技巧
首先将List转成map对象，然后使用
```
final fruitList = ['apple', 'orange', 'mango'];
final fruitMap = myList.asMap(); // {0: 'apple', 1: 'orange', 2: 'mango'}

// To access 'orange' use the index 1.
final myFruit = fruitMap[1] // 'orange'

// To convert back to list
fruit fruitListAgain = fruitMap.values.toList();

// 使用方式
fruitList.asMap.map((i, element) => MapEntry(i, Stack(
  GestureDetector(onTap: () {
    setState(() {
      // print("element=${element.toString()}");
    });
  }),
))).values.toList();
```