# 类和对象

## 构造函数
构造函数的首字母必须大写
构造函数只能通过new来调用，**当调用实例对象调用不存在的属性时，会在这个类中创建这个属性**
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
