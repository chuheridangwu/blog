# Dart
Dart使用`main`函数作为入口，使用`print`进行打印,使用`runtimeType`属性获取变量的类型。Dart中布尔类型没有非零即真或者非空即真。

## 声明变量
Dart 声明变量有两种方式，指定变量类型或者根据变量的值推导变量类型，const修饰的变量必须在编译期间有一个确定值，final可以通过计算/函数获取值。
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

## 类和对象
所有的类默认继承自Object,dart默认会给类一个构造函数，如果我们自定义了构造函数，默认的构造函数就不能使用了。
object:调用方法时，编译时会报错
dynamic:调用方法时，编译不会报错，但是运行时存在安全隐患。

```dart
class Person{
  String name;
  int age;
  double height;
  // 系统默认会有一个构造函数，如果重写不会再调用系统默认的构造函数
  Person(this.name,this.age);
  // 命名构造函数
  Person.withNameAgeHeight(this.name,this.age,this.height);
  Person.fromMap(Map<String,dynamic> map){
    this.name = map["name"];
    this.age = map["age"];
    this.height = map["height"];
  }
}
```