# String
string 字符串是我们在项目开发中经常使用到的，最常见的拼接、截取、转换、查询、比较

char是字符类型，使用`' '`进行区分，字符串是`" "`双引号

## 字符串常用方法

```kotlin
 var str  = "13"
 var b = str.toInt() // 转Int类型
 
 tv.text.toString().toInt() // TextView获取的text是CharSequence类型，需要先转换成string类型再转换成数字

val count = str.length //字符串长度

val count = str.count { it == 'o' }  //统计字符在字符串中出现的次数 

isEmpty() : 判断其length是等于0，若等于0则返回true,反之返回false。不能直接用于可空的字符串
isNotEmpty() : 判断其length是否大于0，若大于0则返回true,反之返回false。不能直接用于可空的字符串
isNullOrEmpty() : 判断该字符串是否为null或者其length是否等于0。
isBlank() : 判断其length是否等于0,或者判断其包含的空格数是否等于当前的length。不能直接用于可空的字符串
isNotBlank() : 对isBlank()函数取反。不能直接用于可空的字符串
isNotOrBlank() : 判断该字符串是否为null。或者调用isBlank()函数
```

## 字符串查找

> `first()` |  `firstOrNull()`  获取第一个元素
* first()  若字符串为空串时，前者会抛出NoSuchElementException异常 
* firstOrNull() 若字符串为空串时，会返回null

> `first{}` |  `firstOrNull{}`  查找第一个元素是否等于某个字符
*  first { }   若字符串为空串时，前者会抛出NoSuchElementException异常 
*  firstOrNull { }  若字符串为空串时，会返回null

```kotlin
val value = "13"
Log.d("TAG", "onCreate:${value.first { it == '1' }} ")
Log.d("TAG", "onCreate:${value.firstOrNull { it == '2' }} ")
```

> 对应获取最后一个元素的方法 `last()` `lastOrNull()`  `last{}`  `lastOrNull{}`

> 下标查询  `indexOf()` `indexLastOf()` `indexOfFirst{}`  `indexOfLast{}`
* `indexOf()`  查找某一个元素或字符串在原字符串中第一次出现的下标。
* `indexLastOf()`  查找某一个元素或字符串在原字符串中最后一次出现的下标。

> 字符传是否包含了某段子字符串 `contains`


## 字符串截取
Kotlin中除了调用`subString()`函数外，还可以调用`subSequence()`函数

```kotlin
val value = "hello world"
value.substring(2) // 从起始位置到结束
value.substring(2,4) // 从起始位置到结束位置，4下标位置的字符串不会截取
value.substring(IntRange(2,4)) // 使用IntRange(),4下标位置的字符串会被截取
```
参数设置
* startIndex参数：截取字符串的开始下标，会截取包含在内
* endIndex参数：截取字符串的结束下标， 不会包含
* rang参数，是指一个IntRang类型，表示一个范围

## 字符串替换

字符串替换`replace()`函数外，还提供了另外的`replaceFirst()`、`replaceAfter()`、`replaceBefore()`、`replaceIndent()`等函数

```kotlin
val value = "hello world"
value.replace("hello","nihao")  // 替换字符串
value.replaceFirst("l","a")   // 把满足条件的第一个字符或字符串 替换成新的字符或字符串
value.replaceBefore("l","b") // 把满足条件字符或字符串  前面的所有字符   替换成新的字符串。
value.replaceAfter("l","c")  // 把满足条件字符或字符串  后面的所有字符   替换成新的字符串。
value.replaceAfterLast("l","d") // 把满足条件的第一个字符或字符串  前面的所有字符   替换成新的字符串。

// 正则表达式字符串
// 正则的规则为检测数字，如果为数字则替换成字符串`kotlin`
val value = " 1 2 3 kotlin  456 7"
str.replace(Regex("[0-9]+"),"kotlin")
```

## 字符串分割
Kotlin 除了实现Java中的`split()`函数之外，还提供了`splitToSequence()` 返回一个字符集
```kotlin
val value = "hello world"
value.split("l") // 字符串分割
value.split(Regex("[0-9]+")) // 使用正则表达式进行分割
```

## 来源网址
[Kotlin：字符串（String）](https://juejin.im/post/6844903613869883405#heading-3)