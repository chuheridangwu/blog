# Koa框架
koa是express同一个团队开发的一个新的Web框架。

```javascript
import Koa from 'koa';

const app = new Koa();

app.use((ctx, next) => {
    console.log(ctx.request);
    ctx.body = ["hello world"];
})

app.listen(8000,() => {
    console.log('server is running at port 8000');
})
```
koa注册的中间件提供了两个参数：`ctx：上下文（Context）对象`koa并没有像express一样，将req和res分开，而是将它们作为ctx的属性，`ctx.request`：获取请求对象；`ctx.response`：获取响应对象；`next`：本质上是一个dispatch，类似于之前的next；

## 路由 koa-router
Koa并没有提供`methods<GET/POST>`的方式来注册中间件，也没有提供`path`中间件来匹配路径；注册中间件只能通过`use`方法。如果是自己判断只能写这么一坨代码
```javascript
app.use((ctx, next) => {
    if (ctx.request.path === '/home') {
        if (ctx.request.method === 'GET') {
            ctx.body = "GET Request Response"
        } else {
            ctx.body = "POST Request Response"
        }
    }else{
        ctx.body = "other Request Response"
    }
})
```
在真实开发中我们需要使用路由将路径和method分离, koa官方并没有给我们提供路由的库，我们可以选择第三方库：[koa-router](https://github.com/ZijianHe/koa-router)

<!-- tabs:start -->

#### **koa-router使用路由**
```javascript
import koa from 'koa';
import userRouter from './router/user.js';

const app = new koa();

app.use(userRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

#### **user路由**
```javascript
import Router from 'koa-router'

const router = new Router({prefix: '/user'})

router.get('/', (ctx, next) => {
  ctx.body = 'GET user'
})

router.get('/:id', (ctx, next) => {
  ctx.body = `${ctx.params.id} - 用户信息`
})

router.post('/', (ctx, next) => {
  ctx.body = 'post user'
})

export default router
```

<!-- tabs:end -->

## GET请求参数解析
Get请求传递传递参数的方式有`params`和`query`,比如请求地址`http://localhost:8000/login/xxx/zzz?name=zhangsan&age=18`,
`xxx/zzz`是`params`，`name=zhangsan&age=18`是`query`。

在Koa中一般使用`koa-router`路由进行解析,我们可以通过`ctx.params`和`ctx.query`来获取请求参数。
```javascript
import koa from 'koa';
import Router from 'koa-router';
const app = new koa();

const userRouter = new Router({prefix: '/login'});
userRouter.get('/:id/:home',(ctx,next) => {
    console.log(ctx.url);
    console.log(ctx.params);
    console.log(ctx.query);
    ctx.body = '登录成功';
});
app.use(userRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

## POST请求 - body解析
使用`koa-bodyparser`对post请求的body进行解析,`application/x-www-form-urlencoded`格式的数据也可以解析。
```javascript
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
const app = new koa();

app.use(bodyParser())
app.use((ctx, next) => {
    console.log(ctx.request.body);
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

### form-data数据解析、上传文件
使用第三方` koa-multer`对body中`form-data`格式的数据进行解析,使用方式和Express中的`multer`一样。注意**解析的数据放到了`ctx。req`中**，如果想要数据是`ctx.req.body`,文件信息是`ctx.req.file`。

上传的文件名称使用系统生成，并且不带后缀，如果没有文件夹可以自动创建。
```javascript
import koa from 'koa';
import multer from 'koa-multer';
import Router from 'koa-router';

const app = new koa();
const upload = multer({ dest: './uploads' })

const fileRouter = new Router();
fileRouter.post('/upload', upload.single('file'), async (ctx, next) => {
    console.log(ctx.req.body);
    console.log(ctx.req.file);
    ctx.body = {
        code: 200,
        msg: '上传成功',
        data: ctx.req.file
    }
})
app.use(fileRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

可以修改文件名称和存储路径，上传文件时如果路径不存在则会报错。
```javascript
import koa from 'koa';
import path from 'path';
import multer from 'koa-multer';
import Router from 'koa-router';

const app = new koa();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const fileRouter = new Router();
fileRouter.post('/upload', upload.single('file'), async (ctx, next) => {
    console.log(ctx.req.body);
    console.log(ctx.req.file);
    ctx.body = {
        code: 200,
        msg: '上传成功',
        data: ctx.req.file
    }
})
app.use(fileRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

## 静态资源服务器
koa并没有内置部署相关的功能，需要使用第三方库`koa-static`,部署的过程类似于express。
```javascript
import koa from 'koa';
import staticServer from 'koa-static';
const app = new koa();
app.use(staticServer('./build'));
app.listen(8000,() => {
    concole.log('server is running at port 8000');
}
```

## 错误处理

```javascript
import koa from 'koa';

const app = new koa();

app.use((ctx,next) => {
   ctx.app.emit('error',new Error('something error'),ctx);
})

app.on('error',(err,ctx) => {
    console.log(err);
    ctx.status = 500;
    ctx.body = err.message;
})

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```
