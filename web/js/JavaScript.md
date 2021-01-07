# JavaScript
JavaScript 因为也是一门语言，所以学起来应该也是快的。基础变量什么的不用学习，直接学习函数和类

 HTML是逐行解析的，所以在使用JavaScript时，需要将引用的JavaScript放在body结束标签前面，或者使用`window.load=function(){}`的方式来进行执行，这段代码是告诉浏览器在界面加载完成之后进行执行里面的代码

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

数组的初始化`var list = new Array();`

[点击跳转到菜鸟教程查看](https://www.runoob.com/jsref/jsref-obj-array.html)

方法 | 含义 | 代码 
------- | ------- | ------
`concat()` | 合并多个数组 | ```var children = hege.concat(ary);```
`join()` | 用数组的元素组成字符串 | ```ary.join()```
`pop()` | 删除数组的最后一个元素 | ```ary.pop()```
`push()` | 数组的末尾添加新的元素 | ```ary.push("a")```
`reverse()` | 数组内的元素顺序反转排序 | ```ary.reverse()```
`shift()` | 删除数组的第一个元素 | ```ary.shift()```
`sort()` | 数组排序，可安装字母、数字 进行升序或者降序, | ```ary.sort(function(a,b){return a- b}) //升序排列数组 ```
`splice()` | 数组的第二个位置添加一个元素 | ```fruits.splice(2,0,"Lemon","Kiwi");```
`toString()` | 数组转换成字符串 | ```ary.toString()```
`unshift()` | 数组的开头添加新元素 | ```ary.unshift("a")```

遍历数组

```javascript
let ary = [1,2,3,4,5]

for (let key of ary) {
    console.log(key);
}

// value ：数组内的值  index: 下标索引 ary:数组本身
ary.forEach(function callback(value,index,ary){
    console.log(value,index,ary);
})

// 自己写一个forEach
Array.prototype.myEach = function(fn){
    for (let i = 0; i < this.length; i++) {
        fn(this[i],i,this)
    }
}
```

 查找数组中的某个元素，如果有，返回对应下标，没有则返回-1
```javascript
let ary = [1,2,3,4,5]
console.log(ary.indexOf(3));

// findIndex 返回的是下标
let index = ary.findIndex(function callback(value,index,ary){
    if (value == 2) {
        return true
    }
})

// find 返回的是value，找不到返回undefined 
let value = ary.find(function callback(value,index,ary){
    if (value == 2) {
        return true
    }
})

```

根据条件查找数组内的元素，并且返回一个新的数组
```javascript
let ary = [1,2,3,4,5]

// filter 返回的是一个新的数组
let ary1 = ary.filter(function callback(value,index,ary){
    if(value % 2 == 0){
        return true
    }
})

slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]


splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。第二个数字是0时是添加，>0时是替换
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

排序
```javascript
let ary = [1,3,2,4,5]

//  使用sort方法默认是正序
ary.sort()

//  根据 a 和 b的值确定倒序还是正序
ary.sort(function (a,b){
    if (a > b) {
        return -1
    } else  if (a < b) {
        return 1
    }{
        return 0
    }
})

// 升序a-b 降序b-a 
ary.sort(function (a,b){
    return a-b
})


// 时间排序
var data = [
    {
        name:'1',
        time:'2019-04-26 10:53:19'
    },
    {
        name:'2',
        time:'2019-04-26 10:51:19'
    }
]
data.sort(function(a,b){
    return a.time < b.time ? 1 : -1
}
```



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

```javascript
// ES6中，字符串可以使用`来引用
let name ="la"
let string = `我的名字是${name}`
```

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

## Javascript 中调用网络请求

```javascript
var xhr = new XMLHttpRequest();
url = "http://www.baidu.com"
xhr.open("GET", url, true);
xhr.send();

// 加载成功
xhr.onload = function () {
    // 输出接收到的文字数据
    console.log(xhr.responseText)
    // 解析成json数据
    var json = JSON.parse(xhr.responseText);
    var list = json["data"]["images"]
    // 根据类名查询到对应的节点，因为类名是可以有多个重复的，所以获取的是一个数组
    var body = document.getElementsByClassName("content")[0];
    for (var dict of list) {
        // 生成节点，把节点添加到content节点下
        var img = document.createElement("img")
        body.appendChild(img)
    }

}

// 加载失败 
xhr.onerror = function () {
    document.getElementById("demo").innerHTML="请求出错";
}
```

## Map

Map的 常用方法
```
var map = new Map();
//设值
map.set("A","aaaa");
map.set("B","bbbb");
map.set("C","cccc");
map.set("D","dddd");
console.log(map)
//结果
// 0: {"A" => "aaaa"}
// 1: {"B" => "bbbb"}
// 2: {"C" => "cccc"}
// 3: {"D" => "dddd"}
//取值
let v =map.get("A")
console.log(v)
//结果：aaaa

//根据Key修改Value
map.set("B","XXX")
console.log(map)
//结果
// 0: {"A" => "aaaa"}
// 1: {"B" => "XXX"}
// 2: {"C" => "cccc"}
// 3: {"D" => "dddd"}

//判断key是否存在
let boo =  map.has("D");
console.log(boo)
//结果 true

//删除
map.delete("C");
//结果
// 0: {"A" => "aaaa"}
// 1: {"B" => "XXX"}
// 3: {"D" => "dddd"}

//获取key，value
map.forEach(function (value, key, map) {
    alert("key:"+key+"~~~"+"value:"+value)
})
```