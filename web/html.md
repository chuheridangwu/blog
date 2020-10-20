# HTML

html是超文本标记语言，超文本指的是`超链接`,标记指的是`标签`，文件的扩展名为html或者htm

[点击查看HTML5标签属性](https://www.runoob.com/tags/html-reference.html)

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