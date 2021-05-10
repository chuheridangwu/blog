# 类和对象
JavaScript 的所有数据都可以看成对象，在 JavaScript 中，不区分类和实例的概念，而是通过原型`（prototype）`来实现面向对象编程。**JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。**

## 创建对象


## 构造函数
为了区分普通函数和构造函数，按照约定，**构造函数首字母应当大写**。构造函数只能通过new来调用，**当调用实例对象调用不存在的属性时，会在这个类中创建这个属性**
```javascript
// 通过这样的构造函数生成的对象，方法都会在不同的内存空间
function Person(name,age){
    this.name = name
    this.age = age
    this.say = function(){
        console.log(name + age + "开始说话")
    }
}

/*
1. 使用prototype 保存对象方法，只会生成一份内存空间
2. prototype也可以保存属性
3. 当构造函数和prototype有同样的属性和方法时，优先使用构造方法中的属性
4. 使用场景，当创建的对象都有共同的属性和方法时才会使用
*/
function Person(name,age){
    this.name = name
    this.age = age
}
Person.prototype = {
    constructor:Person, //指向自己的构造函数
    com:"属性",
    say:function(){
        console.log(this.age,this.name);
    }
}
```

## 继承
 call()、apply()、bind() 都是用来重定义 this 这个对象的！三个函数在传参时有所不同

 ```javascript
var obj={
    name:"xiaozhang",
    objAge:this.age,
    myFun:function(fm,t){
        console.log(this.name + this.age + fm + t);
    }
}

var db = {
    name:"哎呀",
    age:99
}

obj.myFun.call(db,"成都","上海")
obj.myFun.apply(db,["成都","上海"])
obj.myFun.bind(db,"成都","上海")()

call()方法的参数是直接放进去的
apply()方法参数传一个数组
bind()方法传参跟call()一样，但是需要使用()进行调用
 ```

 继承其实是更改this的指向
 ```javascript
function Person(age){
    this.age=age
} 

function Student(age,score){
    Person.call(this,age)
    this.score = score
}

Student.prototype = new Person()
Student.prototype.constructor = Student

 ```

## 获取原型类型
```javascript
let ary = new Array()
console.log(ary.constructor.name);
//instanceof  判断 当前实例对象是不是 Array这个类或者他的父类创建的
console.log(ary instanceof Array );
// isPrototypeOf 判断当前原型对象的原型是不是ary的原型 
let ary = new Array()
console.log(Array.prototype.isPrototypeOf(ary));
// 判断类和原型中是否有length这个属性 ，
console.log("length" in ary);
// 判断当前对象是否有length这个属性
console.log(ary.hasOwnProperty("length"));
```

## 属性的增删改差
当使用类中没有的属性时，就会给类添加对应的属性
```javascript
class Person{}

let p = new Person()
// 添加属性
p.name = "a"
// 删除属性
delete p.name
```

## 结构实例对象
```javascript
使用结构数组的方式结构实例对象

class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }
}

let p = new Person("a",18)
// 结构的变量名需要跟属性名称一样，否则会取不到值
let {name,age} = p;
console.log(name,age);
```

## 拷贝对象的值
```javascript
class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }
}

let p1 = new Person("a",18)
let p2 = new Person()

// 将p1的值拷贝到p2中
Object.assign(p2,p1)


// 如果类中有多个属性是对象，需要拷贝属性的值
class Person{
    cat={
        age:3
    }
    source=[1,2,3]
}

let p1 = new Person("a",18)
let p2 = new Person()

depCopy(p2,p1)

function depCopy(target,source){
    for (let key in source) {
        let value = source[key]
        // 如果属性是对象需要深层拷贝时，需要创建新的对象，再进行赋值
        if (value instanceof Object) {
            let subTarget = new value.constructor;
            target[key] = subTarget
            depCopy(subTarget,value)
        }else{
            target[key] = value
        }
    }
}
```


## ES6中的类和对象

定义类和构造方法
```javascript
class Person{
    // 当使用new方法创建对象时，系统会调用此方法
    constructor(age,name){
        this.age = age,
        this.name = name
        this.pen = function(){

        }
    }

    // 方法会被添加到原型上去
    say(){
        console.log(this.name + this.age);
    }

    // 定义静态方法
    static run(){
        console.log("静态方法");
    }
}

// 添加静态属性
 Person.num = 3

let p = new Person(1,"zs")
p.say()

Person.run()
```

继承
```javascript
class Person{
    constructor(name){
        this.name = name
    }
} 

class Student extends Person{
    constructor(name,age){
        super(name)
        this.age = age
    }
}
```

