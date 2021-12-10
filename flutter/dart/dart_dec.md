# Dart
Dart的开发工具:`Android Studio`、`VSCode` 或者是命令行`dart helloword.dart`。

Dart的入口是`main`函数,使用`print`进行打印:
```dart
main() { 
   print("Hello World!"); 
}
```

## Dart的数据类型
* 数字类型 `int`、`double`
* 字符串 `String`
* 布尔,`bool` 布尔类型没有 `非零即真` 或者 `非空即真`
* 列表 `List info = [1, 2, 3]`
* 集合 `Set`无序集合`var halogens = {'yiibai.com', 'chlorine', 'bromine'}`
* 映射 `Map info = {1 : "java", 2 : "python", 3 : "go"}`
* 符文(用于表示字符串中的Unicode字符)
* 符号 

**字符串和数字之间的转换**
```dart
// String 转为 int
var one = int.parse('1');

// String 转为 double
var onePointOne = double.parse('1.1');

// int 转为 String
String oneAsString = 1.toString();

// double 转为 String,取2位小数
String piAsString = 3.14159.toStringAsFixed(2);
```

**判断变量是否是某种类型**
```dart
var str = "小明";
print(str is String);
print(str.runtimeType); // 使用`runtimeType`属性获取变量的类型,String 
```

**符文**
在Dart中，符文是字符串的`UTF-32`代码点。
Unicode为世界上所有书写系统中使用的每个字母，数字和符号定义唯一的数值。由于Dart字符串是`UTF-16`代码单元的序列，因此在字符串中表示32位 Unicode值需要特殊语法。
String类有几个属性可用于提取符文信息。codeUnitAt 和 codeUnit 属性返回16位代码单元。使用`runes 属性`获取字符串的符文。
```dart
print("abc".codeUnits); // [97, 98, 99]
print("abc".runes.toList()); // [97, 98, 99]

Runes input = new Runes(
    '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
print(String.fromCharCodes(input)); // ♥ 😅 😎 👻 🖖 👍
```

## 条件语句
Dart条件决策语句 - 条件/决策构造在执行指令之前评估条件。Dart中的条件结构有以下几种:
* `if语句` - if语句由一个布尔表达式后跟一个或多个语句组成。
* `if…else语句` - if后面跟一个可选的else块。如果if块测试的布尔表达式求值为false，则执行else块中的代码。
* `else…if语句` - else...if可用于测试多个条件。
* `switch…case语句` - switch语句计算表达式，将表达式的值与case子句匹配，并执行与case相关的语句。

## 循环语句
Dart循环语句 - 某些指令需要重复执行，循环是一种理想的方法。循环表示必须重复的一组指令。在循环的上下文中，重复称为迭代。
* `for循环` - for循环是一个确定循环的实现，用于执行代码块指定的次数。
* `for…in循环` for...in循环用于循环对象的属性。
* `while循环` - 每次指定的条件求值为true时，while循环都会执行指令。在执行代码块之前评估条件。* `do…while循环` - do...while循环类似于while循环，只是do...while循环不会在第一次循环执行时评估条件。
  * `break语句` - break语句用于将控件从构造中取出。在循环中使用break会导致程序退出循环。
  * `continue语句` - continue语句跳过当前迭代中的后续语句，并将控制权带回循环的开头。


## Typedef 定义别名
`Typedef `或函数类型别名有助于定义指向内存中可执行代码的指针。简单地说，typedef 可以用作引用函数的指针。


## 声明变量
Dart 声明变量有两种方式，指定变量类型或者根据变量的值推导变量类型。
* const修饰的变量必须在编译期间有一个确定值
* final可以通过计算/函数获取值。

```dart
String name = "小明";
var name = "小明";
const name = "小明";
final name = "小明";
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

## 符号 ?? 、??= 、 ..

* `name ??= "xiaoming"`:name有值时使用name，没有值时使用右边的值
* `name1 = name ?? "小明"`同上
* 级联运算符，类似与链式语法。使用`..`进行连接。例如:
```dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
// 使用级联运算符
querySelector('#confirm')
..text = 'Confirm'
..classes.add('important')
..onClick.listen((e) => window.alert('Confirmed!'));
```

## String
Dart字符串是一系列`UTF-16`代码单元。符文用于表示`UTF-32`代码单元序列

**字符串初始化**
```dart
var str = "小明";
var str1 = '${3 + 2}';
var str2 = '$str $str1';
var str3 = "${3.toString()}";
```

**使用带有单引号或双引号的三引号创建多行字符串**：
```dart
var str1 = '''
可以换行
哦哦哦
''';

var str2 = """可以换行
哦哦哦""";
```

### 属性
属性 | 描述
------- | -------
属性 | 描述
codeUnits | 返回此字符串的UTF-16代码单元的不可修改列表。
isEmpty | 如果此字符串为空，则返回true。
length | 返回字符串的长度，包括空格，制表符和换行符。

### 常用方法

方法 | 方法含义 | 举例
------- | ------- | ------- 
toLowerCase() | 将此字符串中的所有字符转换为小写。
toUpperCase() | 将此字符串中的所有字符转换为大写。
trim() | 返回没有任何前导和尾随空格的字符串。
compareTo() | 将此对象与另一对象进行比较。
replaceAll() | 用给定值替换与指定模式匹配的所有子字符串。
split() | 在指定分隔符的匹配处拆分字符串并返回子字符串列表。
substring() | 返回此字符串的子字符串,不包含end，| `print("01234567".substring(1,5)); //1234`
toString() | 返回此对象的字符串表示形式。
codeUnitAt() | 返回给定索引处的16位UTF-16代码单元。
indexof()  |  获取某个字符在字符串中的位置,返回 -1 表示找不到该字符 | `"abcde".indexOf("e") // 4`

**符文**

在Dart中，符文是字符串的`UTF-32`代码点。
Unicode为世界上所有书写系统中使用的每个字母，数字和符号定义唯一的数值。由于Dart字符串是`UTF-16`代码单元的序列，因此在字符串中表示32位 Unicode值需要特殊语法。
String类有几个属性可用于提取符文信息。codeUnitAt 和 codeUnit 属性返回16位代码单元。使用`runes 属性`获取字符串的符文。
```dart
print("abc".codeUnits); // [97, 98, 99]
print("abc".runes.toList()); // [97, 98, 99]

Runes input = new Runes(
    '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
print(String.fromCharCodes(input)); // ♥ 😅 😎 👻 🖖 👍
```

## enum 枚举类型
每一个枚举值都有一个名为 `index` 成员变量的 `Getter` 方法，该方法将会返回以 `0` 为基准索引的位置值。例如，第一个枚举值的索引是 0 ，第二个枚举值的索引是 1，以此类推。
```dart
// 定义枚举类型
enum Color { red, green, blue }
// 获得全部的枚举值
List<Color> colors = Color.values;
```
> ⚠️ 在 `Switch `语句中使用枚举，必须处理枚举值的每一种情况

## 库的使用
Dart中一个dart文件就是一个库，导入一个库使用`import`关键字。
当两个库有同一个方法时会引起冲突，导入库的时候使用`as`给库文件起一个别名`import 'dart:math' as mUtils;`
如果导入库时要隐藏或者显示某个方法使用`hide`或者`show`,`import 'demo.dart' show sum,mul;`

在一个文件下的dart文件可以使用`export` 导入一个公共头文件。

使用第三方库需要创建一个文件`pubspec.yaml`，文件中的内容
```dart
name:
description:
dependencies:
```
1. 点击进入[第三方库网站](https://pub.dev/)
2. 输入找到的第三方库，选择 installing 进行安装