# Array
JavaScript的 Array 可以包含任意数据类型，并通过索引来访问每个元素。数组的初始化`let list = new Array();`或者`let list = []`,数组对应的索引中没有存储数据，默认存储的是`undefind`

* [点击跳转菜鸟教程](https://www.runoob.com/jsref/jsref-obj-array.html)
* [点击跳转MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)


要取得 Array 的长度，可以直接访问 length 属性,注意:**直接给 Array 的 length 赋一个新的值会导致Array大小的变化**
```javascript
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```
可以通过索引修改数组的值，需要注意的是:**索引超过了范围，同样会引起Array大小的变化**
```javascript
var arr = [1, 2, 3];
arr[5] = 'x';  // arr变为[1, 2, 3, undefined, undefined, 'x']
```

## 数组修改
1. `push()`向Array的末尾添加若干元素，`pop()`则把Array的最后一个元素删除掉

```javascript
var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4 ,   数组内的值： [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'  //数组内的值 [1, 2, 'A']
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
```

2. 如果要往Array的头部添加若干元素，使用`unshift()`方法，`shift()`方法则把 Array的第一个元素删掉：

```javascript
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4  //数组: ['A', 'B', 1, 2]
arr.shift(); // 'A'   //数组 ['B', 1, 2]
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
```

3. `splice()` 函数是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素

```javascript
// splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。参数1是下标,参数2是替换多少个元素
let arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']

// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

4. `concat()`方法把当前的 Array 和另一个 Array 连接起来，并返回一个新的 Array,并不会改变原来的数组。另外: `concat()`方法可以接收任意个元素和 Array，并且自动把Array 拆开，然后全部添加到新的 Array 里：

```javascript
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']

//  `concat()`方法可以接收任意个元素和 Array，并且自动把Array 拆开，然后全部添加到新的 Array 里：
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
``` 

5. `join()`方法是一个非常实用的方法，它把当前 Array 的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

```javascript
var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
```

## 数组遍历
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

## 数组查找
1. `indexOf()`、`findIndex`、`find`获取一个指定的元素的下标,如果有，返回对应下标，没有则返回-1

```javascript
// indexOf()
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(30); // 元素30没有找到，返回-1

// findIndex 返回value===2的下标
let ary = [1,2,3,4,5]
let index = ary.findIndex(function callback(value,index,ary){
    if (value === 2) {
        return true
    }
})

// find 返回的是value，找不到返回undefined 
let value = ary.find(function callback(value,index,ary){
    if (value === 2) {
        return true
    }
})
```

2. 根据条件查找数组内的元素，并且返回一个新的数组

```javascript
// filter:根据函数条件返回一个新的数组 [2, 4]
let ary = [1,2,3,4,5]
let ary1 = ary.filter(function callback(value,index,ary){
    if(value % 2 == 0){
        return true
    }
})

//slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));  // 包含end ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));  //不包含end ["camel", "duck"]
console.log(animals.slice(1, 5));   // ["bison", "camel", "duck", "elephant"]
```

## 数组排序

```javascript
let ary = [1,3,2,4,5]

//  使用sort方法默认是正序
ary.sort()  // [1,2,3,4,5]

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

//  reverse() 反转排序
var arr = ['one', 'two', 'three'];
arr.reverse();  // ['three', 'two', 'one']

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

## 常用方法列表
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