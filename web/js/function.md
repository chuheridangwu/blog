# 函数
函数是最基本的一种代码抽象的方式。将重复的代码封装起来，使用的时候更加方便。

## 函数的定义
JavaScript中使用`function 方法名(参数){ 函数体 }`的方式来定义函数。调用方法时使用`方法名()`进行调用。
```javascript
// 定义abs函数，x是参数，return返回值。
function abs(x) {
    return x > 0 ? x : -x;
}
// 函数调用
abs(10);

// 在ES6中也可以使用箭头函数
let abs = (x) => {return x > 0 ? x : -x;}
```
在 JavaScript 中函数也是一个对象，可以使用另一种方式进行定义:
```javascript
let abs = function(x){
    return x > 0 ? x : -x;
}
```
在这种方式中，函数是一个匿名函数，没有方法名，匿名函数赋值给变量`abs`，通过变量`abs`就可以调用该函数。

## arguments 和 rest
由于JavaScript允许传入任意个参数而不影响调用，JavaScript还有一个关键字`arguments`，只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。`arguments`类似 Array 但它不是一个Array,经常用来做判断传入的参数个数
```javascript
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
}
```
在ES6标准中，为了更方便的获取函数中多传入的参数,引入了`rest`参数,主要用来获取函数中没有声明的参数。 **`rest`参数只能写在最后，前面用`...`标识**。在ES6中，形参可以指定默认值
```javascript
function foo(a, b, ...rest) {
    console.log('a = ' + a);    // a = 1
    console.log('b = ' + b);    // b = 2
    console.log(rest);  // Array [ 3, 4, 5 ]
}
foo(1, 2, 3, 4, 5);
```

## 变量的作用域
JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部,由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。

不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象`window`，全局作用域的变量实际上被绑定到`window`的一个属性：
```javascript
'use strict';
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
```
全局变量会绑定到`window`上，不同的 JavaScript 文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。**减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中**。例如:
```javascript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```
把自己的代码全部放入唯一的名字空间 MYAPP 中，会大大减少全局变量冲突的可能。许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。

## 解构赋值
从ES6开始，JavaScript引入了解构赋值，可以同时对一组变量进行赋值。
```javascript
// 对同一组变量进行赋值
let [x, y, z] = ['hello', 'JavaScript', 'ES6'];

//  也可以通过下面的形式进行解构赋值，注意嵌套层次和位置要保持一致
let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];

//  解构赋值还可以忽略某些元素：
let [, , z] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素

// 从对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性
let person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
let {name, address: {city, zip}} = person;

// 把passport属性赋值给变量id:
let {name, passport:id} = person;

// 如果person对象没有single属性，默认赋值为true:
var {name, single=true} = person;
```
有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误。这是因为JavaScript引擎把`{`开头的语句当作了块处理，于是`=`不再合法。解决方法是用小括号括起来：
```javascript
// 声明变量:
var x, y;
// 解构赋值:
{x, y} = { name: '小明', x: 100, y: 200}; // 报语法错误: Uncaught SyntaxError: Unexpected token =
// 使用()解决语法问题
({x, y} = { name: '小明', x: 100, y: 200});
```
解析赋能常用到的使用场景：
```javascript
// 数据交换
var x=1, y=2;
[x, y] = [y, x]

// 获取当前页面的域名和路径
var {hostname:domain, pathname:path} = location;

// 一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
```

## 函数的注意点
1. 如果函数中没有`return`语句，函数执行完毕后也会返回结果，只是结果为`undefined`
2. 函数调用时不限制传参个数