# this
函数在调用时，JavaScript会默认给this绑定一个值, this的绑定和定义的位置（编写的位置）没有关系,this的绑定和调用方式以及调用的位置有关系,this是在运行时被绑定的。

## 默认绑定
独立函数调用时使用默认绑定。独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用。
```javascript
    function foo(){
        console.log(this);
    }
    foo() //window

    function boo(func) {
        func()
    }
    var obj = {
        bar: function(){
            console.log(this);
        }
    }
    boo(obj.bar) //window
```

## 隐式绑定
通过某个对象进行调用的,也就是它的调用位置中，是通过某个对象发起的函数调用。
```javascript
    function foo(){
        console.log(this);
    }
    var obj = {
        name: "why",
        foo: foo
    }
    obj.foo() // obj

    var bar = obj.foo
    bar() // window
```

## 显示绑定
显示绑定使用call、apply、bind 函数
```javascript
function.apply(thisArg,[argsArray])
function.call(thisArg,[argsArray])
function.(thisArg[,arg1[,arg2[,...]]])

function foo(){
    console.log(this);
}
foo.call(window); //window
foo.call({name: "why"}); //{name: "why"}
foo.call(123); //Number对象，存放时123
```

## new 绑定
JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。
```javascript
function Person(name){
    console.log(this); //Person{}
    this.name = name;
}
var p = new Person("why")
```

## 箭头函数
箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。

箭头函数并不绑定this对象，那么this引用就会从上层作用于中找到对应的this:
```javascript
var obj = {
    data: [],
    getData: function(){
        setTimeout(() => {
            var res = ["a","b","c"]
            this.data.push(...res)
            console.log(this); //obj
        }, 1000);
    }
}

var obj = {
    data: [],
    getData: () => {
        setTimeout(() => {
            console.log(this); //window
        }, 1000);
    }
}
```