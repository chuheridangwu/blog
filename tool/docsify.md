# docsify
使用docsify快速搭建个人博客
[官方文档]( https://docsify.js.org/#/zh-cn/quickstart)

## 安装 Docsify
1. 安装npm: `brew install node`
2. 安装 docsify:  `npm i docsify-cli -g`
3. 初始化docsify文档: `docsify init ./docs`
4. 启动本地预览:  `docsify serve docs`

##  添加搜索功能

```
<script>
  window.$docsify = {
    // 完整配置参数
    search: {
      maxAge: 86400000,               // 过期时间，单位毫秒，默认一天
      paths: [],                      // or 'auto'，匹配文件路径
      placeholder: 'Type to search',  // 搜索提示框文字， 支持本地化，例子在下面
      // placeholder: {
      //   '/zh-cn/': '搜索',
      //   '/': 'Type to search'
      // },
      noData: 'No Results!',          // 找不到结果文字提示，支持本地化，例子在下面
      // noData: {
      //   '/zh-cn/': '找不到结果',
      //   '/': 'No Results'
      // },
      depth: 2,                       // 搜索标题的最大程级, 1 - 6
    }
  }
</script>
<!-- 引入搜索模块 -->
<script src="//unpkg.com/docsify/lib/plugins/search.js"></script>
```
##  侧边栏显示标题

`
window.$docsify = {
    subMaxLevel: 3 #这里 3 表示显示几级标题
}
`

##   代码高亮
查看支持的代码高亮库列表 [prism](https://github.com/PrismJS/prism/tree/gh-pages/components)
`<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-php.min.js"></script>`
使用的方法
````
``` php
function getAdder(int $x): int 
{
    return 123;
}
```
````

##   代码块重复引用
如果多个代码块进行重读，使用多个`` ` ``来包含
`````
````
    ```kotlin
        代码块
    ```
````
`````

##   代码拷贝
```
  <!-- 引入代码拷贝  -->
  <script src="//unpkg.com/docsify-copy-code"></script>
```

##   导入图片限制图片大小

`![](./../imgs/图片名.png ':size=280')`

##   使用斜体和小与正常字号

正常字号 、_斜体_ 、<small>小字号</small>

> 参考网址
* https://segmentfault.com/a/1190000017576714
* https://docsify.js.org/#/zh-cn/quickstart
* https://notebook.js.org/#/
* [Docsify 进阶配置](https://zxiaosi.cn/archives/cd1d42d1.html)
