# Vue Router

使用`pnpm add vue-router@4`安装

## 基础使用
设置路由
```javascript
import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: "/",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/detail/:id", //动态路由
            component: () => import("@/views/detail/detail.vue"),
        },
    ]
})

export default router
```

main.js中导入路由
```javascript
import router from './router'
createApp(App).use(router).mount('#app')
```

获取路由参数
```javascript
import { useRouter,useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id);
```

## 参考网址
* [Vue Router](https://router.vuejs.org/zh/)