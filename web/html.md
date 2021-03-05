# HTML

html是超文本标记语言，超文本指的是`超链接`,标记指的是`标签`，文件的扩展名为html或者htm

[点击查看HTML5标签列表](https://www.runoob.com/tags/html-reference.html)

[点击查看HTML5全局属性](https://www.runoob.com/tags/ref-standardattributes.html),全局属性是每个标签都可以使用的属性

[点击查看HTML5事件属性](https://www.runoob.com/tags/ref-eventattributes.html)

## html基础结构

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>网页标题</title>
    </head>
    <body>
        网页显示内容
    </body>
</html>
```
* `<!DOCTYPE html>` 声明为 HTML5 文档
* `<html>` 元素是 HTML 页面的根元素
* `<head>` 元素包含了文档的元（meta）数据，如 <meta charset="utf-8"> 定义网页编码格式为 utf-8。
* `<title>` 元素描述了文档的标题
* `<body>` 元素包含了可见的页面内容
* `<h1>` 元素定义一个大标题
* `<p>` 元素定义一个段落

## 常用的标签
column0 | column1
------- | -------
`<h1>` | 标题H1-H6，搜索引擎会使用标题将网页的结构和内容编制索引，网页上使用标题是很重要的。
`<p>` | 段落
`<bt/>` | 换行
`<img>` | 图像
`<a>` | 链接
`<ol>` | 无序列表
`<ul>` | 有序列表
`<textarea>` | 多行文本输入框
`<video>` | 视频播放器
`<textarea>` | 多行文本输入框
`<marquee>` | 跑马灯 `direction` 控制方向`up/down/right`，

## 字符实体
column0 | column1
------- | -------
`&nbsp;` | 空格
`&lt;` | <
`&gt;` | >
`&copy;` | 版权符号


### 相对路径 和 绝对路径
* `./ ` 表示当前文件所在目录下，比如：`./pic.jpg` 表示当前目录下的pic.jpg的图片，这个使用时可以省略。

* ` ../ ` 表示当前文件所在目录下的上一级目录，比如：`../images/pic.jpg` 表示当前目录下的上一级目录下的images文件夹中的pic.jpg的图片。


## 行内元素 和 块元素
### html块
1、div标签 块元素，表示一块内容，没有具体的语义。
2、span标签 行内元素，表示一行中的一小段内容，没有具体的语义。

### 含样式和语义的标签
1、em标签 行内元素，表示语气中的强调词
2、i标签 行内元素，原本没有语义，w3c强加了语义，表示专业词汇
3、b标签 行内元素，原本没有语义，w3c强加了语义，表示文档中的关键字或者产品名
4、strong标签 行内元素，表示非常重要的内容

### 语义化的标签
语义化的标签，就是在布局的时候多使用语义化的标签，搜索引擎在爬网的时候能认识这些标签，理解文档的结构，方便网站的收录。比如：h1标签是表示标题，p标签是表示段落，ul、li标签是表示列表，a标签表示链接，dl、dt、dd表示定义列表等，语义化的标签不多


## 列表

### 有序列表

```html
<ol>
    <li>列表文字一</li>
    <li>列表文字二</li>
    <li>列表文字三</li>
</ol>
```
### 无序列表

```html
<ul>
    <li>列表文字一</li>
    <li>列表文字二</li>
    <li>列表文字三</li>
</ul>
```

### 定义列表

```html
<h3>前端三大块</h3>
<dl>
    <dt>html</dt>
    <dd>负责页面的结构</dd>

    <dt>css</dt>
    <dd>负责页面的表现</dd>

    <dt>javascript</dt>
    <dd>负责页面的行为</dd>

</dl>
```

## 表格

```html
<table border="1">
    <caption>表格标题</caption>
    <tr>
        <th>动物</th>
        <th>水果</th>
        <th>植物</th>
    </tr>
    <tr >
        <td>猫</td>
        <td>苹果</td>
        <td rowspan="2">花</td>
    </tr>
    <tr >
        <td>狗</td>
        <td>香蕉</td>
    </tr>
    
</table>
```

* `<table>`   表格标签
* `<th>`   表格头部
* `<caption>`   表格标题
* `<tr>`   一行
* `<td>`   一列
* `border`   表格宽度，不赋值不显示表格
* `rowspan`  合并列
* `colspan`  合并行

## 表单
表单是用来手机用户信息的

```html
<form>
    账号：<input type="text" value="请输入账号">
    密码：<input type="password">
    
    <br>

    <!-- 单选框 -->
    性别：
    <input type="radio" name="gender"> 男
    <input type="radio" name="gender"> 女
    <input type="radio" name="gender" checked="checked"> 保密

    <br>

    <!-- 多选框 -->
    爱好：
    <input type="checkbox"> 篮球
    <input type="checkbox"> 足球
    <input type="checkbox"> 排球
    <input type="checkbox"> 读书

</form>
```

### 按钮

使用提交按钮，需要知道提交给谁，提交哪些数据？

首先在 `from` 表单设置跳转目标 `action`,点击时提交按钮时会使用 `name="user"` 输入框的数据，提交结果`https://www.baidu.com/?user=123`

```html
<form action="https://www.baidu.com/">
    账号：<input type="text" name="user">

    <br>

    <!-- 按钮 -->
        <input type="button" value="按钮">
        <input type="submit">
        <input type="reset">
</form>
```

### label标签
label 和 input进行绑定，点击label，input会聚焦

```html
<form>
    <label for="accout">账号：</label><input type="text" id="accout">
    <label for="pwd">密码：</label><input type="text" id="pwd">
</form>
```

## selected标签

```html
<select>
    <optgroup label="河南">
        <option>新乡</option>
        <option>信阳</option>
        <option selected>郑州</option>
        <option>开封</option>
    </optgroup>
</select>
```
* optgroup 组标题
* selected 默认选中
* option 一组

## 颜色
基本的颜色 red、black、blue
使用RGB表示颜色 ，我们知道颜色都是由红绿蓝三原色组成。
RGB格式表示颜色： 通过R（red）/G(Green)/B(Blue)三种颜色通道的变化，叠加产生各种各样的颜色。
十进制表示形式，每一种颜色的取值范围0~255，正好是一个字节。RGB(122，122，122)
十六进制表示形式，每一种颜色的取值范围是00~FF，一个字节八个二进制位，两个16进制表示一个字节。只是换了一种表达形式。#ff0000,如果是重复的，可以直接用三位数进行表示比如#00ff00和#0f0代表的是相同的意思。

颜色的规律：
* RGB颜色值越大，越靠近白色，越浅色。
* 颜色值越小，越靠近黑色，越深色
* RGB颜色值一样的，一般是灰色，值越大越靠近深灰，越小越靠近浅灰

RGBA： 在RGB颜色的基础上加上透明度alpha，实现带有透明度的颜色。alpha取值0.0~1.0.#

白色rgb(255,255,255)  黑色rgb(0,0,0)


# html快捷键
!和html:5 可以快速生成完整结构的html5代码

`>` 和 `+`
div>ul>li 快速生成
```
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

div+p+bq
```
<div></div>
<p></p>
<blockquote></blockquote>
```
div+div>p>span+em
```
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
```

`*` 和`^`
ul>li*3
```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

div+div>p>span+em^h1
```
<div></div>
<div>
    <p><span></span><em></em></p>
    <h1></h1>
</div>
```

`()`
div>(header>ul>li*2>a)+footer>p
```
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

(div>dl>(dt+dd)*3)+footer>p
```
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

属性
div#footer+div.page+div#footer.class1.class2.class3
```
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

td[title=hello]
```
<td title="hello"></td>
```

td[title=hello colspan=3]
`<td title="hello" colspan="3"></td>`

td[title colspan]
`<td title="" colspan=""></td>`

$: 代表索引 
ul>li.item$*5
```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

ul>li.item$@4*5
```
<ul>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
    <li class="item8"></li>
</ul>
```

{}
a{click}
`<a href="">click</a>`
a>{click}+span{here}
`<a href="">click<span>here</span></a>`

隐式标签：因为一些标签下面的子标签是固定的，所以不用写也没问题
ul>.item*3
```
<ul>
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>
</ul>
```

table>#row$*4>[colspan=2]
```
<table>
    <tr id="row1">
        <td colspan="2"></td>
    </tr>
    <tr id="row2">
        <td colspan="2"></td>
    </tr>
    <tr id="row3">
        <td colspan="2"></td>
    </tr>
    <tr id="row4">
        <td colspan="2"></td>
    </tr>
</table>
```

css
w100=`width: 100px;`
