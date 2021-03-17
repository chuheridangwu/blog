# CSS
层叠样式表（英语：Cascading Style Sheets，缩写：CSS）是一种用来为结构化文档（如HTML文档或XML应用）添加样式（字体、间距和颜色等）的计算机语言。CSS不能单独使用，必须与HTML或XML一起协同工作，为HTML或XML起装饰作用。

CSS中有非常多的属性用来修饰文档对应的元素，[点击查看W3c中的 CSS 属性介绍](https://www.w3school.com.cn/cssref/index.asp#font)。将不同作用的属性进行分组，方便查看[点击查看 CSS 属性](https://www.runoob.com/cssref/css-reference.html)

使用选择器的方式，准确的描述要修饰的文档元素，[点击查看 CSS 选择器文档](https://www.runoob.com/cssref/css-selectors.html)

**如果想知道某个CSS属性的值或者查看它们的效果，[点击进入MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS)进行搜索。**

 ## 使用 CSS 
 CSS 有三种使用方式，分别是外联式、嵌入式、内联式

 ```html
 <!-- CSS 的基本用法 -->
选择器{
    属性: 值;
}

<!-- 外联式 -->
<link rel="stylesheet" type="text/css" href="css/main.css">

<!-- 嵌入式   -->
<style type="text/css">
    @import url(a.css);   //也可以使用@import导入其他样式,效率比link要低，一般不使用。
    div{ width:100px; height:100px; color:red }
</style>

 <!-- 内联  -->
<div style="width:100px; height:100px; color:red ">......</div>
 ```

 ## 常用的css属性
CSS 有很多修饰元素的属性，正式这些属性让HTML文档的色彩变得更加丰富。[点击进入 CSS 参考手册](http://css.doyoe.com/)
 ```html
 文本: color、direction、letter-spacing、word-spacing、line-height、text-align、text-indent、text-transform、text-decoration、white-space
 字体: font、font-family、font-style、font-variant、font-weight、font-stretch
 背景: background、background-color、background-image、background-repeat、background-attachment、background-position
 盒子模型: width、height、border、margin、padding
 列表: list-style、
 表格: border-collapse
 显示: display、visibility、overflow、opacity、filter
 定位: vertical-align、position、left、top、right、bottom、float、clear
 ```

### 字体属性（Font）
属性 | 描述 | CSS
------- | ------- | -------
font | 在一个声明中设置所有字体属性。 | 1
font-family | 文本的字体，从左到右按顺序选择 | 
font-size | 文本的字体尺寸 | 1
font-size-adjust | 为元素规定 aspect 值。 | 2
font-stretch | 收缩或拉伸当前的字体系列。 | 2
font-style | 规定文本的字体样式。 | 1
font-variant | 规定是否以小型大写字母的字体显示文本。 | 1
font-weight | 规定字体的粗细，取值范围100~900。 <br> 一些标签的 font-weight 默认是bold | * normal 等于400 <br>  * bold 等于900

**加载自定义字体@font-face**

自定义字体的种类有很多，使用`@font-face`可以支持网络字体，只要是`@`开头的都是CSS属性。常见的字体种类有：
* TrueType字体，扩展名是 .ttf
* OpenType字体，扩展名是 .ttf 、.otf,建立在TrueType字体之上
* Embedded OpenType字体，扩展名是 .eot，OpenType字体的压缩版
* SVG字体，扩展名是 .svg 、.svgz
* web开放字体，扩展名是 .woff，建立在TrueType字体之上

并不是所有的浏览器都支持以上字体，使用时需要多测试。
```html
@font-face{
    src: url("./a.otf");
    font-family: "草书";
}
```

### 文本相关属性
属性 | 描述 | 值
------- | ------- | -------
text-decoration | 用于设置文字的装饰线 <br> u、ins元素默认设置了`underline` | * none:去掉a元素默认的下划线 <br> * underline: 下划线 <br> * overline: 上划线 <br> * line-throough: 中划线
letter-spacing |  设置字母之间的间距 | 
word-spacing |  设置单词之间的间距 | 
text-transform | 用于设置文字的大小写转换 | * capitalize:将每个单词的首字符变为大写 <br> * uppercase: 将每个单词的所有字符变为大写 <br> * lowercase: 将每个单词的所有字符变为小写 <br> * none: 没有任何影响
text-indent | 用于设置第一行内容的缩进 | `text-indent:2em`刚好缩进2个文字
text-align | 用于设置元素内容在元素中的水平对齐方式 | * left:左对齐 <br> * right: 右对齐 <br> * center: 正中间显示 <br> * justify: 两端对齐


* em相对与font-size进行计算，2em相当于font-size*2
  

## 颜色
我们知道颜色是由 红(red)、绿（green）、蓝（blue）三原色组成，可以使用RGB进行表示三种颜色通道的变化，R（red）、G(Green)、B(Blue)，三种颜色叠加之后可以产生各种各样的颜色。

**使用十进制和十六进制的方式表示颜色：**
* 十进制表示，每一种颜色的取值范围`0~255`，正好是一个字节。例如：`RGB(122，122，122)`
* 十六进制表示，每一种颜色的取值范围是`00~FF`，一个字节共八个二进制位，两个16进制表示一个字节。例如：`#ff0000`,如果是重复的数字，可以直接用三位数进行表示。比如`#00ff00`可以直接使用`#0f0`进行表示

**颜色的规律：**
* RGB颜色值越大，越靠近白色，越浅色。`白色 -> rgb(255,255,255)  黑色 -> rgb(0,0,0)`
* 颜色值越小，越靠近黑色，越深色
* RGB颜色值一样的，一般是灰色，值越大越靠近深灰，越小越靠近浅灰

**RGBA:**
在RGB颜色的基础上加上透明度alpha，实现带有透明度的颜色。`alpha取值0.0~1.0`