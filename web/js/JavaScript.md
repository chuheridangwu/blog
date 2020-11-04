# JavaScript
JavaScript 因为也是一门语言，所以学起来应该也是快的。基础变量什么的不用学习，直接学习函数和类


## 数据类型转换

基本数据类型

* Number
* String
* Boolean
* Undefined
* Null
* Object

转换成对应的字符串

```Javascript
// number 转 string
let num = 123;
let string = num.toString();

// bool 转 string
let bool = true;
let string1 = bool.toString();

// undefined 转 string
let un = undefined
let string2 = String(un)

// null 转 string
let un = null
let string2 = String(un)
```

转换成数据类型

```Javascript
// 字符串 转 number类型，如果字符串是空，默认转为0 ，如果不是纯数字字符串，转成NaN = Not a Number
let string = "123"
let num = Number(string)
```

## 数组

[点击跳转到菜鸟教程查看](https://www.runoob.com/jsref/jsref-obj-array.html)

方法 | 含义 | 代码 
------- | ------- | ------
`concat()` | 合并多个数组 | ```var children = hege.concat(ary);```
`join()` | 用数组的元素组成字符串 | ```ary.join()```
`pop()` | 删除数组的最后一个元素 | ```ary.pop()```
`push()` | 数组的末尾添加新的元素 | ```ary.push("a")```
`reverse()` | 数组内的元素顺序反转排序 | ```ary.reverse()```
`shift()` | 删除数组的第一个元素 | ```ary.shift()```
`slice()` | 从数组中选择元素 | ```ary.aplice(1,3) // 取数组内1-2的元素```
`sort()` | 数组排序，可安装字母、数字 进行升序或者降序, | ```ary.sort(function(a,b){return a- b}) //升序排列数组 ```
`splice()` | 数组的第二个位置添加一个元素 | ```fruits.splice(2,0,"Lemon","Kiwi");```
`toString()` | 数组转换成字符串 | ```ary.toString()```
`unshift()` | 数组的开头添加新元素 | ```ary.unshift("a")```

## 字符串

[点击跳转到菜鸟教程查看](https://www.runoob.com/js/js-obj-string.html)

方法 | 描述
------- | -------
charAt() | 返回在指定位置的字符。
charCodeAt() | 返回在指定的位置的字符的 Unicode 编码。
concat() | 连接两个或更多字符串，并返回新的字符串。
fromCharCode() | 将 Unicode 编码转为字符。
indexOf() | 返回某个指定的字符串值在字符串中首次出现的位置。
includes() | 查找字符串中是否包含指定的子字符串。
lastIndexOf() | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
match() | 查找找到一个或多个正则表达式的匹配。
repeat() | 复制字符串指定次数，并将它们连接在一起返回。
replace() | 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。
search() | 查找与正则表达式相匹配的值。
slice() | 提取字符串的片断，并在新的字符串中返回被提取的部分。
split() | 把字符串分割为字符串数组。
startsWith() | 查看字符串是否以指定的子字符串开头。
substr() | 从起始索引号提取字符串中指定数目的字符。
substring() | 提取字符串中两个指定的索引号之间的字符。
toLowerCase() | 把字符串转换为小写。
toUpperCase() | 把字符串转换为大写。
trim() | 去除字符串两边的空白
toLocaleLowerCase() | 根据本地主机的语言环境把字符串转换为小写。
toLocaleUpperCase() | 根据本地主机的语言环境把字符串转换为大写。
valueOf() | 返回某个字符串对象的原始值。
toString() | 返回一个字符串。

## 函数

函数的定义，函数有多种展现方式，可以当做参数和返回值，有匿名函数和箭头函数，和`swift`和`kotlin`的语法比较像，现在语言基本都差不多是这种套路

```javascript
function 方法名(形参){
    方法体
}

let sum = (a,b)=>{
    return a + b
}

let con = _ => console.log("测试")
```
函数的参数：arguments
函数可以传递多个参数，参数都被集合到arguments这个数组中，每个函数都拥有这个属性。可以直接从中获取参数
```javascript
function sum(){
    let a = arguments[0]
    let b = arguments[1]
    return a + b
}
```
