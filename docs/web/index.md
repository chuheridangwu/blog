# 前端开发

## 怎么学习CSS
CSS是用来装饰html了，既然是装饰，首先要找到要渲染的标签，所以有了标签选择器，为了更加的灵活，所以有了更多的选择器来选择对应的标签进行渲染。选择器多了，如果有多个选择器选择同一个标签进行渲染该如何选择呢，所以又有了选择器的优先级

CSS是以盒子模型为基础，盒子可以假设成我们装箱子的盒子，东西装进去占用的空间是content,东西跟箱子内部的距离是内间距padding，盒子的厚度是边框border，盒子跟其他盒子之间的距离是外间距margin

CSS既然是装饰html，自己本身需要有一些内容可以装饰，这个东西是属性，属性有很多种，
动画、背景、边框和轮廓、盒(框)、颜色、内容分页媒体、定位、可伸缩框、字体、生成内容、网格、超链接、行框、列表、外边距、marquee(跑马灯)、多列、内边距、分页媒体、定位、打印、变革、文本、2D/3D转换、过度、用户界面

## 相关网址
* [MDN HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
* [W3C 点击查看对应的属性](https://www.w3school.com.cn/cssref/index.asp#userinterface)
* [MDN 点击查看所有伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
* [在线调整元素阴影网址](https://html-css-js.com/css/generator/box-shadow/)  
* [在线调整文字阴影网址](https://html-css-js.com/css/generator/box-shadow/)
* [MDN Javascript方法查询](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
* [利用border或者CSS的特性做出的图形](https://css-tricks.com/the-shapes-of-css/#top-of-site)
* [MDN JavaScript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

## Electron中常用的库
`electron-window-state` : 保留窗口的位置和大小  `npm install electron-window-state -D`
`electron-store` : 保存数据
`electron-builder` : 打包
`nodemon` : 保存之后自动刷新界面 - `npm install nodemon -D`
`store2`: 本地存储
`lodash`: JavaScript工具库，对常见的一些方法做封装，包含节流防抖
`image-type`: 判断图片类型，es6
`file-type`: 判断文件类型，es6
`randomstring`: 生成随机字符串 -> `npm install randomstring`
`electron-is-dev`: 是否在开发阶段 -> `npm install electron-is-dev -D`

`Puppeteer`: 自动化测试,爬虫
`concurrently`: 同时运行多个命令 -> `npm install concurrently`

## Vue开发套装
`normalize.css`: 样式重置 -> `npm install normalize.css`
`vue-router`: 路由 -> `npm install vue-router`
`pinia`: 状态管理 -> `npm install pinia`
`less`: less格式解析 -> `npm install less -D`

## VSCode相关插件
* 中文插件：`Chinese`
* 颜色主题：`atom one dark`
* 文件夹图标：`VSCode Great Icons`
* 在浏览器中打开网页：`open in browser`、`Live Sever`
* 自动重命名标签：`auto rename tag`
* 编写CSS时将PX转换成vw`px to vw`
* 在react开发中会使用到的，打印语句cgl；`ES7+ React/Redux/React-Native snippets`