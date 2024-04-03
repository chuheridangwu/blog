# vue遇到的一些问题

#### 1. 使用变量添加本地图片的时候，@不能变成src路径

```javascript
function imgAssetURL(image){
    // 参数1 相对路径
    // 参数2 当前路径的url
    return new URL(`../assets/img/${image}`,import.meta.url).href
}
```

### 2.修改第三方UI组件库的样式
1. 用插槽插入自己的元素，在自己的作用域直接修改这个元素
2. 全局定义一个变量，覆盖它默认变量的值 (全局都会修改)
3. 布局顶一个一个变量，覆盖它默认变量的值 （常用）
4. 使用`:deep()`直接查找对应子组件选择器，进行修改，使用方式 （常用）
```javascript
:deep(子组件元素选择器){
    // 修改css样式
}
```

### 3.vue项目有时候会出现版本依赖错误的问题
`npm install --force` 强制安装所有依赖版本
比如element-plus中依赖的是vue 3.1.0版本，但是你项目中使用的是3.2.0版本，可能就会出现安装不上的问题