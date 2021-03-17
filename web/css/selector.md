# CSS 选择器
当我们使用CSS修饰HTML元素时，如何准确的找到要修饰的元素就至关重要。CSS使用选择器帮助我们找到想要修饰的元素，选择器的种类有很多，并且优先级高的选择器属性会覆盖掉优先级低的选择器。[点击查看所有的选择器](https://www.w3school.com.cn/cssref/css_selectors.asp)。

选择元素可以根据`标签名、类名或者id`、`按照属性`、`按照 DOM 数中的位置`进行选择。

## 选择器优先级
选择器的种类有很多，如果有多个选择器选择了同一个元素，应该使用谁的呢？所以应该给选择器一个优先级，**优先级高的选择器样式 会覆盖掉 优先级第选择器的样式，优先级相同的选择器 会覆盖掉之前的样式。**

`!important > 内联样式 > ID选择器 > 类选择器、属性选择器、伪类选择器 > 标签选择器、关系选择器、伪元素选择器 > 通配符选择器`

选择器 | 使用方式 | 优先级
------- | ------- | -------
!important | `background-color: red !important;` 一般不使用 | 最高
内联样式 | `<div style="background-color: yellow;">内联样式</div>` | 1000
ID选择器 | `#id名称{}` | 100
类选择器 | `.类名{}` 一个元素可以定义多个class,中间使用空格隔开 | 10
伪类选择器 | `a:link {}` | 10
属性选择器 | `input[disabled]{}` | 10
标签选择器 | `div{}` | 1
关系选择器 | `兄弟关系、父子关系` | 1
伪元素选择器 |  | 1
通配符选择器 | `*{}` | 0

## id选择器 （id是唯一的）
```html
<head>
    <h1 id="logo">
        <img src="/Users/mlive/Desktop/html5.png" width="64" alt="HTML5 logo">
        HTML5文档
    </h1>
</head>

<style>
    #logo{
        font-size: 60px;
        font-weight: 200;
    }
</style>
```

## 类选择器 (类可以是多个)

```html
<ul>
    <li class="done">Learn HTML</li>
    <li class="done">Learn Css</li>
    <li>Learn JavaScript</li>
</ul>

<style>
    .done{
        color: gray;
        text-decoration: line-through;
    }
</style>
```

## 标签选择器
```html
<h1>This is heading</h1>
<p>this is some paragraph.</p>

<style>
    h1{
        color: orange;
    }
    p{
        color: gray;
        font-size: 20px;
    }
</style>
```

## 属性选择器 （标签中的属性）

```html
<p>
    <label>用户名:</label>
    <input value="zhao" disabled>
</p>

<style>
    input[disabled]{
        background: #eee;
        color: #999;
    }
</style>

<!-- 使用更具体的属性值做判断 -->
<p>
    <label>密码:</label>
    <input type="password" required>
</p>

<style>
    input[type="password"]{
        border-color: red;
        color: red;
    }
</style>

<!-- 使用正则的方式判断属性以 某个值开头或者结尾 -->
<p><a href="#top">回到顶部</a></p>
<p><a href="a.jpg">查看图片</a></p>

<style>
    a[href^="#"]{
        color: #f54767;
        background: 0 content/lem url(top.svg) no-repeat;
        padding-left: 1.1em;
    }

    a[hred$=".jpg"]{
        color: deepskyblue;
        background: 0 center/lem url(img.svg) no-repeat;
        padding-left: 1.1em;
    }
</style>
```

## 伪类选择器 （动态伪类和结构特性伪类）

动态伪类，比如`a`标签，可以通过不同的状态类来显示。[点击查看所有伪类选择器](https://www.runoob.com/css/css-pseudo-classes.html)
```html
<a>example.com</a>

<style>
    a:link {color:#FF0000;} /* 未访问的链接 */
    a:visited {color:#00FF00;} /* 已访问的链接 */
    a:hover {color:#FF00FF;} /* 鼠标划过链接 */
    a:active {color:#0000FF;} /* 已选中的链接 */
</style>

注意： 在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。
注意： 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。
注意： 伪类的名称不区分大小写。
```

结构特性伪类
```html
<ol>
    <li>阿凡达</li>
    <li>泰坦尼克号</li>
    <li>星球大战</li>
</ol>

<style>
    li{
        list-style-position: inside;
        border-bottom: 1px solid;
        padding: 0.5em;
    }
    
    /* 第一个元素 */
    li:first-child{
        color: coral;
    }
    /* 最后一个元素 */
    li:last-child{
        border-bottom: none;
    }
</style>
```

## 关系选择器(直接组合、后代组合、亲子组合)

名称 | 语法 | 说明 | 示例
------- | ------- | ------- | -------
直接组合 | AB | 满足 A 同时满足 B | `input:focus`
后代组合 | A  B | 选中B，如果它是A的子孙 | `nav a`
亲子组合 | A > B | B必须是A的子元素才会被选中 | `section > p`

```html
<label>
    用户名：
    <input class="error" value="aa">
</label>
<span class="error">最少三个字符</span>

<style>
    .error{
        color: red;
    }

    /* 同时满足这两个条件才会被选中 */
    input.error{
        border-color: yellow;
    }
</style>

<!-- 后代组合 和 亲子组合 -->
<article>
    <h1>拉森国家公园</h1>
    <p>位于.....</p>
    <section>
        <h2>气候</h2>
        <p>天气特别的好</p>
    </section>
</article>

<style>
    article p{
        color: coral;
    }
    article > p{
        color: limegreen;
    }
    article section h2{
        border-bottom: 1px dashed #999;
    }
</style>
```

选择器组
```html
<style>
    body,h1,h2,h3,ul,ol{
        margin: 0;
        padding: 0;
    }

    [type="checkbox"],[type="radio"]{
        box-sizing: border-box;
        padding: 0;
    }
</style>
```

## 通配选择器 

```html
<style>
    *{
        color: red;
    }
</style>
```