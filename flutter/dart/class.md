# 类和对象
文档来源于:[Dart官方网站](https://dart.cn/guides/language/language-tour#classes)

Dart 是支持基于**mixin 继承机制**面向对象语言，所有对象都是一个类的实例，而除了 `Null` 以外的所有的类都继承自 `Object`类。 基于 mixin 的继承 意味着尽管每个类（top class Object? 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。 扩展方法 是一种在不更改类或创建子类的情况下向类添加功能的方式。

## 构造函数
构造函数的命名方式可以为 `类名 或 类名 . 标识符 `的形式。构造函数有多种形式:默认构造函数、命名式构造函数、重定向构造函数、常量构造函数、工厂构造函数。

1. `默认构造函数`: 如果你没有声明构造函数，那么 Dart 会自动生成一个无参数的构造函数并且该构造函数会调用其父类的无参数构造方法。
2. `构造函数不被继承`: 子类不会继承父类的构造函数，如果子类没有声明构造函数，那么只会有一个默认无参数的构造函数。
3. `命名式构造函数`: 可以为一个类声明多个命名式构造函数来表达更明确的意图,例如`Point.origin()`
```dart
class Person{

  double x = 0;
  double y = 0;
  double? z;   // 声明实例变量 z，初始为 null。所有未初始化的实例变量其值均为 null。
 
  // 类名 形式的构造函数，this关键字引用当前实例,语法糖写法简化步骤:
  Point(this.x,this.y);
  
  // 类名.标识符 形式的构造函数， 语法糖可以写 Point.from(Map<String,double> map) :x = map['x'],  y = map['y'] { }
  Point.from(Map<String,double> map){
    this.x = map["x"];
    this.y = map["y"];
  }

  // 命名式构造函数
  Point.origin(): x = 5 , y = 10;
}
```

 **调用父类非默认构造函数**

构造函数是不能被继承的,子类的构造函数会调用父类的匿名无参数构造方法，并且该调用会在 子类构造函数 的 函数体代码执行前，如果子类构造函数还有一个 初始化列表，那么该初始化列表会在调用父类的该构造函数之前被执行，总的来说，这三者的调用顺序如下：
1. 初始化列表
2. 父类的无参数构造函数
3. 当前类的构造函数

如果父类没有匿名无参数构造函数，子类必须调用父类的其中一个构造函数.为子类的构造函数指定一个父类的构造函数只需在构造函数体前使用`:`指定
```dart
class Person {
  String? firstName;
  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
  
  // 因为参数会在子类构造函数被执行前传递给父类的构造函数，该参数也可以是一个表达式，比如一个函数
  Employee() : super.fromJson(fetchDefaultData());
}
```

> ⚠️ 传递给父类构造函数的参数不能使用 this 关键字，因为在参数传递的这一步骤，子类构造函数尚未执行，子类的实例对象也就还未初始化，因此所有的实例成员都不能被访问，但是类成员可以。

**初始化列表**: 除了调用父类构造函数之外，还可以在构造函数体执行之前初始化实例变量。每个实例变量之间使用逗号分隔
```dart
Point.fromJson(Map<String, double> json) : x = json['x']!, y = json['y']! {
  print('In Point.fromJson(): ($x, $y)');
}

// 初始化列表验证数据输入是否正确 （常用）
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}

// 初始化列表设置final 修饰的实例变量
class Point {
  final double x;
  final double y;
  final double distanceFromOrigin;

  Point(double x, double y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}
```

**重定向构造函数**
```dart
class Person{
  String name;
  int age;
  // 构造函数的重定向
  Person(String name):this._internal(name,0);
  Person._internal(this.name,this.age);
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

**工厂构造函数 factory**
使用 `factory` 关键字标识类的构造函数将会令该构造函数变为工厂构造函数，这将意味着使用该构造函数构造类的实例时并非总是会返回新的实例对象。例如，工厂构造函数可能会从缓存中返回一个实例，或者返回一个子类型的实例。
```dart
// Logger 的工厂构造函数从缓存中返回对象，和 Logger.fromJson 工厂构造函数从 JSON 对象中初始化一个最终变量。
class Logger {
  final String name;
  bool mute = false;

  static final Map<String, Logger> _cache = {};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

}
```
> ⚠️ 在工厂构造函数中无法访问 this。

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

## 抽象类 abstract
使用关键字 `abstract` 标识类可以让该类成为 抽象类，`抽象类将无法被实例化`。抽象类常用于声明接口方法、有时也会有具体的方法实现。`如果想让抽象类同时可被实例化，可以为其定义 工厂构造函数`。
抽象方法只能存在于 抽象类中。

* 抽象类用 `abstract` 关键字声明
* 抽象类中没有方法体的方法是抽象方法
* 子类继承抽象类必须实现抽象类中的抽象方法
* 抽象类作为接口使用的时候必须实现所有的属性和方法
* 抽象类不能被实例化继承抽象类的子类可以,通过工厂构造函数可以使抽象类实例化

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
   
  }
}
```

* 抽象类:  继承的子类都用到了父类的同一个或多个方法或者属性的情况下
* 接口: 继承的子类只是把父类作为一个模版和标准的时候需要自己全部实现属性和方法的时候


## 隐式接口 implements
每一个类都隐式地定义了一个接口并实现了该接口，这个接口包含所有这个类的实例成员以及这个类所实现的其它接口。如果想要创建一个 A 类支持调用 B 类的 API 且不想继承 B 类，则可以实现 B 类的接口。

一个类可以通过关键字 `implements` 来实现一个或多个接口并实现每个接口定义的 API：

```dart
class Person {

  final String _name;

  Person(this._name);

  String greet(String who) => 'Hello, $who. I am $_name.';
}

class Impostor implements Person {
  String get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

// 如果需要实现多个类接口，可以使用逗号分割每个接口类：
class Point implements Comparable, Location {...}
```

## 扩展类（继承） extends
使用 `extends` 关键字来创建一个子类，并可使用 super 关键字引用一个父类：
```dart
class Television {
  void turnOn() {
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
  }
  // ···
}
```

## 单利模式
```dart
class Singleton {
  // 静态变量指向自身
  static final Singleton _instance = Singleton._();
  // 私有构造器
  Singleton._();

  // 方案1：静态方法获得实例变量
  static Singleton getInstance() => _instance;
  // 方案2：工厂构造方法获得实例变量，工厂构造方法，实例属性不能是异步的
  factory Singleton() => _instance;
  // 方案3：静态属性获得实例变量
  static Singleton get instance => _instance;
}
```

## noSuchMethod 方法
如果调用了对象上不存在的方法或实例变量将会触发 `noSuchMethod` 方法，你可以重写 `noSuchMethod` 方法来追踪和记录这一行为：
```dart
class A {
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: '
        '${invocation.memberName}');
  }
}
```
只有下面其中一个条件成立时，你才能调用一个未实现的方法：
* 接收方是静态的 `dynamic` 类型。
* 接收方具有静态类型，定义了未实现的方法（抽象亦可），并且接收方的动态类型实现了 noSuchMethod 方法且具体的实现与 Object 中的不同。

## 使用 Mixin 为类添加功能
`Mixin` 是一种在多重继承中复用某个类中代码的方法模式。使用 `with` 关键字并在其后跟上 `Mixin` 类的名字来使用 `Mixin` 模式：
```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```
想要实现一个 `Mixin`，请创建一个继承自 `Object` 且未声明构造函数的类。除非你想让该类与普通的类一样可以被正常地使用，否则请使用关键字 `mixin` 替代 class。例如:
```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```
可以使用关键字 on 来指定哪些类可以使用该 Mixin 类，比如有 Mixin 类 A，但是 A 只能被 B 类使用，则可以这样定义 A：
```dart
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}
class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
```

## 类变量和方法
使用关键字 `static` 可以声明类变量或类方法。可以将静态方法作为编译时常量。例如，你可以将静态方法作为一个参数传递给一个常量构造函数。