# Document
`DOM (Document Object Model)` 译为文档对象模型，是 `HTML` 和 `XML` 文档的编程接口。`Document`是指当前窗口对象，标签也称为 `Dom` 元素。Dom获取元素后使用 style 修改 HTML 样式。

根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：
1. 整个文档是一个文档节点
2. 每个 HTML 元素是元素节点
3. HTML 元素内的文本是文本节点
4. 每个 HTML 属性是属性节点
5. 注释是注释节点

![](../imgs/web_img_3.png)

## 元素属性的增删改查

```javascript
// 获取元素属性，使用`.`方式无法获取自定义属性
let img = document.querySelector("img")
console.log(img.alt)
console.log(img.getAttribute("alt"));

// 修改元素属性
let img = document.querySelector("img")
img.title = "新的title"
img.setAttribute("title","新的title")

// 新增元素属性,`setAttribute`如果属性不存在新增，如果属性存在就修改
let img = document.querySelector("img")
img.setAttribute("test","新的title")

// 删除元素属性
let img = document.querySelector("img")
img.removeAttribute("title")
```

## 元素内容
```javascript
// 获取元素内容
//    innerHTML 获取的内容带标签
//    innerText 获取的内容会去除空格
//    textContent  获取的内容不去除两端空格
let div = document.querySelector("div")
console.log(div.innerHTML);
console.log(div.innerText);
console.log(div.textContent);

// 设置元素内容 
//    innerHTML 设置的内容如果含有标签会转换成标签元素
//    innerText 内容不会转化成标签元素
//    textContent  内容不会转化成标签元素
let div = document.querySelector("div")
div.innerHTML = "<span>我是span</span>"
div.innerText = "<span>我是span</span>"
div.textContent ="<span>我是span</span>"
```

## 元素样式

```javascript
// 设置元素样式
let div = document.querySelector("div")
// 第一种方式，通过预先写好的样式，把类名赋值给他
div.className = "box"

// 第二种方式，通过这种方式设置的是行内样式
div.style.width = "200px";
div.style.height = "300px";
div.style.backgroundColor = "red";

// 获取元素样式
let div = document.querySelector("div")
// 获取div的样式
let style = window.getComputedStyle(div);
console.log(style.width);
// 直接通过div.style.width获取的只能是行内样式的宽度
console.log(div.style.width);
```

## DOM 事件
Dom的点击事件也可以看做用户跟 HTML 的交互。

当用户点击鼠标时会有`onclick`事件，当一张页面或一幅图像完成加载会有`onload`事件,用户退出界面会有`onunload`事件，鼠标移动到元素上时会有`onmouseover`事件，鼠标移开时会有`onmouseout`事件,当输入字段被改变时会有`onchange`事件。[点击查看所有事件名称](https://www.w3school.com.cn/jsref/dom_obj_event.asp)

```javascript
//绑定事件: 元素.事件名称=function(){}
let div = document.querySelector("div")
div.onclick=function(){
    alert("lalala")
}

// a标签本身有点击事件，如果要覆盖系统的点击事件，添加点击事件之后 return false
let a = document.querySelector("a")
a.onclick=function(){
    alert("a标签被点击了")
    return false
}
```

## 常用方法

方法 | 描述
------- | -------
getElementById() | 通过`id`获取标签。`document.getElementById("box")`
getElementsByTagName() | 通过`标签名称`获取标签,返回一个数组。`document.getElementsByTagName("div")`
getElementsByClassName() | 通过`class名称`获取标签,返回一个数组。`document.getElementsByClassName("box")`
getElementsByName() |  通过`name名称`获取标签,返回一个数组。`document.getElementsByName("box")`
appendChild() | 把新的子节点添加到指定节点。
removeChild() | 删除子节点。
replaceChild() | 替换子节点。
insertBefore() | 在指定的子节点前面插入新的子节点。
createAttribute() | 创建属性节点。
createElement() | 创建元素节点。
createTextNode() | 创建文本节点。
getAttribute() | 返回指定的属性值。
setAttribute() | 把指定属性设置或修改为指定的值。

**根据选择器获取标签**
```javascript
// 通过`选择器`获取标签,querySelector只会根据指定选择器返回找到的第一个元素
document.querySelector("#box")

// querySelectorAll会根据指定选择器返回所有找到的元素
document.querySelectorAll("div")

// 根据`children`获取当前元素下所有的子元素
let divs = document.querySelector("div")
console.log(divs.children)

<!-- childNodes 以树的形式获取所有节点，节点由（标签，文本，属性）组成 -->
let divs = document.querySelector("div")
for (let node of divs.childNodes) {
    if (node.nodeType == Node.ELEMENT_NODE) {
        console.log(node)
    }
}
```

**document方法举例**
```javascript
var div = document.getElementsByTagName("div")[0];
console.log(div);
div.style.width = "100px";
div.style.height = "100px";
div.style.backgroundColor = "red";
// 添加点击方法
div.onclick = function(){
    this.style.backgroundColor = "green";
}
```

## 常用属性

属性 | 含义
------- | -------
`innerHTML` | 获取节点（元素）的HTML元素
`innerText` | 获取节点包含的文本值
`parentNode` | 获取节点（元素）的父节点
`childNodes` | 获取节点（元素）的子节点
`attributes` | 节点（元素）的属性节点
`nodeName` | 元素节点的 nodeName 与标签名相同,属性节点的 nodeName 与属性名相同
`nodeValue` | 元素节点返回 undefined 或者 null，文本节点返回文本本身，属性节点是属性值
`nodeType` | 1:元素、2:属性、3:文本、8:注释、9:文档