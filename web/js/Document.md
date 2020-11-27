# Document
Document是指当前窗口对象，标签也称为Dom元素

## 获取标签对象
通过`id`获取标签
document.getElementById("box")

通过`class名称`获取标签,返回的是一个数组
document.getElementsByClassName("box")

通过`name名称`获取标签,返回的是一个数组
document.getElementsByName("box")

通过`标签名称`获取标签,返回的是一个数组
document.getElementsByTagName("div")

通过`选择器`获取标签,querySelector只会根据指定选择器返回找到的第一个元素
document.querySelector("#box")

querySelectorAll会根据指定选择器返回所有找到的元素
document.querySelectorAll("div")

根据`children`获取当前元素下所有的子元素
let divs = document.querySelector("div")
console.log(divs.children)

<!-- childNodes 以树的形式获取所有节点，节点由（标签，文本，属性）组成 -->
let divs = document.querySelector("div")
for (let node of divs.childNodes) {
    if (node.nodeType == Node.ELEMENT_NODE) {
    console.log(node)
    }
}
 
## 元素属性的增删改查
获取元素属性，使用`.`方式无法获取自定义属性
let img = document.querySelector("img")
console.log(img.alt)
console.log(img.getAttribute("alt"));

修改元素属性
let img = document.querySelector("img")
img.title = "新的title"
img.setAttribute("title","新的title")

新增元素属性,`setAttribute`如果属性不存在新增，如果属性存在就修改
let img = document.querySelector("img")
img.setAttribute("test","新的title")

删除元素属性
let img = document.querySelector("img")
img.removeAttribute("title")

## 元素内容
获取元素内容
   let div = document.querySelector("div")
   <!-- 
   innerHTML 获取的内容带标签
   innerText 获取的内容会去除空格
   textContent  获取的内容不去除两端空格
    -->
    console.log(div.innerHTML);
    console.log(div.innerText);
    console.log(div.textContent);

设置元素内容
   <!-- 
   innerHTML 设置的内容如果含有标签会转换成标签元素
   innerText 内容不会转化成标签元素
   textContent  内容不会转化成标签元素
    -->
let div = document.querySelector("div")
div.innerHTML = "<span>我是span</span>"
div.innerText = "<span>我是span</span>"
div.textContent ="<span>我是span</span>"


## 元素样式

设置元素样式

let div = document.querySelector("div")
// 第一种方式，通过预先写好的样式，把类名赋值给他
div.className = "box"

// 第二种方式，通过这种方式设置的是行内样式
div.style.width = "200px";
div.style.height = "300px";
div.style.backgroundColor = "red";

获取元素样式
let div = document.querySelector("div")
<!-- 获取div的样式 -->
let style = window.getComputedStyle(div);
console.log(style.width);
<!-- 直接通过div.style.width获取的只能是行内样式的宽度 -->
console.log(div.style.width);

## 点击事件
绑定事件,[点击查看所有事件名称](https://www.w3school.com.cn/jsref/dom_obj_event.asp)
元素.事件名称=function(){}

let div = document.querySelector("div")
div.onclick=function(){
    alert("lalala")
}

<!-- a标签本身有点击事件，如果要覆盖系统的点击事件，添加点击事件之后 return false -->
let a = document.querySelector("a")
a.onclick=function(){
    alert("a标签被点击了")
    return false
}