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

### 4.使用ref获取dom元素

```html
<template>
  <div ref="detailRef"> </div>
</template>

<script setup>
    // ref获取dom元素,变量名称需要跟标签中的ref值一样
    const detailRef = ref();
</script>
```

### 5.获取组件的位置
```JavaScript
<div ref="mapRef"/>

const mapRef = ref()
const tabClick = (index) => {
 detailRef.value.scrollTo({
    top: mapRef.value.$el.offsetTop, //获取对应组件的偏移量
    behavior: 'smooth' //平滑的滚动
 })
```
### 5. v-if 和 v-show的区别
v-if: 根组件上删除
v-show: 只是隐藏不显示

### 6.路由跳转的本质是将组件删除之后重新添加，需要使用keep-alive保持组件状态

### 7. postcss-px-to-viewport在vite中配置
1. 安装 `npm install postcss-px-to-viewport -D`  vm适配，手机端适配
2. 因为vite中已经内联了postcss，所以并不需要额外的创建 postcss.config.js文件，vite关于css.postcss 我们只需要在 vite.config.ts中进行配置即可：具体配置如下:
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'

export default defineConfig({
  plugins: [
    vue()
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  }
})
```