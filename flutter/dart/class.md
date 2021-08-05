# 类和对象

Dart 是支持基于**mixin 继承机制**的面向对象语言，所有对象都是一个类的实例，而除了 `Null` 以外的所有的类都继承自 `Object`类。 基于 mixin 的继承 意味着尽管每个类（top class Object? 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。 扩展方法 是一种在不更改类或创建子类的情况下向类添加功能的方式。

## 构造函数
构造函数的命名方式可以为 `类名 或 类名 . 标识符 `的形式。

Dart默认会给类一个类名形式的构造函数，如果我们自定义了构造函数，默认的构造函数将不能再使用。
```dart
class Person{

  double x = 0;
  double y = 0;
  double? z;   // 声明实例变量 z，初始为 null。所有未初始化的实例变量其值均为 null。
 
  // 类名 形式的构造函数，this关键字引用当前实例
  Point(double x, double y) {
    this.x = x; 
    this.y = y;
  }
  
  // 类名.标识符 形式的构造函数
  Point.from(Map<String,dynamic> map){
    this.x = map["x"];
    this.y = map["y"];
  }
}
```

**常量构造函数** 常量构造函数需要使用 const 进行修饰，并且其成员变量都是final类型
```dart
class Person{
  final String name;
  final int age;
  const Person(this.name,this.age);
}

// 使用常量构造函数，在构造函数名之前加 const 关键字
Person person = const Person("jack",100);
```

## 实例变量

* 所有未初始化的实例变量其值均为 `null`
* `static`修饰的成员变量或者方法是类属性/方法
* `_`下划线是区分 私有成员变量/方法 的一种方式
* 所有实例变量均会隐式地声明一个 `Getter` 方法。非终值的实例变量和使用 `late 、final` 声明但未声明初始化的实例变量还会隐式地声明一个 `Setter` 方法。

**Getter 和 Setter 方法**
```dart
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  double get right => left + width;
  set right(double value) => left = value - width;

  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}
```

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