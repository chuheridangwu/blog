# CSS
 CSS 一周学习挑战2020年从10月21号正式开始。
 [css练习的网站](http://zh.learnlayout.com/)

 [点击查看W3c中的css属性介绍](https://www.w3school.com.cn/cssref/index.asp#font)

 [点击查看 CSS 属性](https://www.runoob.com/cssref/css-reference.html)

 [CSS 选择器文档](https://www.runoob.com/cssref/css-selectors.html)


## CSS 语法
```html
选择器{
    属性: 值;
}
div{ 
    width:100px; 
    height:100px; 
}
```
 ## 使用 CSS 的三种方式
 外联
 <!-- 外联 -->
 ```html
<link rel="stylesheet" type="text/css" href="css/main.css"
 ```
 嵌入式
 <!-- 嵌入 -->
 ```html
<style type="text/css">
div{ width:100px; height:100px; color:red }
</style>
 ```

 内联
 <!-- 内联 ,不推荐使用-->
 ```html
<div style="width:100px; height:100px; color:red ">......</div>
 ```

 
 ## 文本设置
### CSS 字体属性（Font）
column0 | column1 | column2
------- | ------- | -------
属性 | 描述 | CSS
font | 在一个声明中设置所有字体属性。 | 1
font-family | 文本的字体 | 1
font-size | 文本的字体尺寸 | 1
font-size-adjust | 为元素规定 aspect 值。 | 2
font-stretch | 收缩或拉伸当前的字体系列。 | 2
font-style | 规定文本的字体样式。 | 1
font-variant | 规定是否以小型大写字母的字体显示文本。 | 1
font-weight | 规定字体的粗细。 | 1