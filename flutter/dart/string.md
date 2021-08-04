# String
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

## 属性
属性 | 描述
------- | -------
属性 | 描述
codeUnits | 返回此字符串的UTF-16代码单元的不可修改列表。
isEmpty | 如果此字符串为空，则返回true。
length | 返回字符串的长度，包括空格，制表符和换行符。

## 常用方法

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