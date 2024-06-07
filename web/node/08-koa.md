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

可以修改文件名称和存储路径，必须确保文件夹或文件存在，否则会报错。
```javascript
import koa from 'koa';
import path from 'path';
import multer from 'koa-multer';
import Router from 'koa-router';

const app = new koa();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
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
> 如果你未创建文件上传需要保存的文件夹或文件，使用dest时，会根据dest配置的路径自动创建，**但是如果使用storage，必须确保文件夹或文件是否存在，否则会报错**

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

## Cookie
Cookie是某些网站为了辨别用户身份而存储在用户本地终端（Client Side）上的数据。浏览器会在特定的情况下携带上cookie来发送请求，我们可以通过Cookie来获取一些信息。

Cookie总是保存在客户端中，按在客户端中的存储位置，Cookie可以分为内存Cookie和硬盘Cookie。没有设置过期时间，默认情况下cookie是内存cookie，在关闭浏览器时会自动删除；有设置过期时间，并且过期时间不为0或者负数的cookie，是硬盘cookie，需要手动或者到期时，才会删除；
* 内存Cookie由浏览器维护，保存在内存中，浏览器关闭时Cookie就会消失，其存在时间是短暂的；
* 硬盘Cookie保存在硬盘中，有一个过期时间，用户手动清理或者过期时间到时，才会被清理；

cookie的生命周期：
* 默认情况下的cookie是内存cookie，也称之为会话cookie，也就是在浏览器关闭时会自动被删除；
* 我们可以通过设置expires或者max-age来设置过期的时间；
    * `expires`：设置的是`Date.toUTCString()`，设置格式是`;expires=date-in-GMTString-format`；
    * `max-age`：设置过期的秒钟，`;max-age=max-age-in-seconds` (例如一年为60*60*24*365)；

cookie的作用域：（允许cookie发送给哪些URL）
* Domain：指定哪些主机可以接受cookie, 如果不指定，那么默认是 origin，不包括子域名。 如果指定Domain，则包含子域名。例如，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如`developer.mozilla.org`）。
* Path：指定主机下哪些路径可以接受cookie,例如，设置 Path=/docs，则以下地址都会匹配：
    * /docs
    * /docs/Web/
    * /docs/Web/HTTP

设置Cookie和获取Cookie的值
```javascript
import koa from 'koa';
import Router from 'koa-router';
//设置Cookie

const app = new koa();

const fileRouter = new Router();
fileRouter.get('/test', async (ctx, next) => {
    // cookie的值不使用中文,需要使用 encodeURIComponent() 进行转码
    ctx.cookies.set("name", "hello", {
        maxAge: 1000 * 60
    });    
    ctx.body = '设置cookie成功'
})

fileRouter.get('/demo', async (ctx, next) => {
    const value = ctx.cookies.get('name');    
    ctx.body = '获取cookie -- ' + value
})

app.use(fileRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```
Session是基于cookie实现机制，在koa中，需要借助于 `koa-session` 来实现session认证。
```javascript
import koa from 'koa';
import Router from 'koa-router';
import Session from 'koa-session';

const app = new koa();

const session = Session({
    key: 'sessionId',
    maxAge: 1000 * 60, //过期时间
    httpOnly: true, //不允许通过js获取cookie
    rolling: true, //每次响应时，刷新session的有效期
    signed: true, //是否对cookie进行签名,防止数据篡改
},app);
app.keys = ['secret'];
app.use(session);

const fileRouter = new Router();
fileRouter.get('/test', async (ctx, next) => {
    // cookie的值不能是中文,会有转码问题
    ctx.session.user = {
        name: 'code',
        age: 18
    }  
    ctx.body = 'session 设置成功'
})
fileRouter.get('/demo', async (ctx, next) => {
    const user = ctx.session.user;    
    ctx.body = user
})
app.use(fileRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```

cookie和session的方式有很多的缺点：
* Cookie会被附加在每个HTTP请求中，所以无形中增加了流量（事实上某些请求是不需要的）；
* Cookie是明文传递的，所以存在安全性的问题；
* Cookie的大小限制是4KB，对于复杂的需求来说是不够的；
* 对于浏览器外的其他客户端（比如iOS、Android），必须手动的设置cookie和session；
* 对于分布式系统和服务器集群中如何可以保证其他系统也可以正确的解析session？

## JWT 实现token机制
JWT生成的Token由三部分组成：header、payload、signature。
* header
  * alg：采用的加密算法，默认是 HMAC SHA256（HS256），采用同一个密钥进行加密和解密；
  * typ：JWT，固定值，通常都写成JWT即可；
  * 将lag和typ通过base64Url进行编码；
* payload
  * 携带的数据，比如我们可以将用户的id和name放到payload中；
  * 默认也会携带`iat（issued at`），令牌的签发时间；
  * 我们也可以设置过期时间：`exp（expiration time）`； 
  * 会通过base64Url算法进行编码
* signature
  * 设置一个`secretKey`，通过将前两个的结果合并后进行`HMACSHA256`的算法；`HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey)`;
  * 如果secretKey暴露是一件非常危险的事情，因为之后就可以模拟颁发token，也可以解密token；

JWT的通常使用`jsonwebtoken`库来完成，使用非对称加密 RS256 生成私钥和公钥，私钥用于加密，公钥用于解密。

cd切换到项目秘钥文件夹,Mac系统使用opnessl命令生成公钥和私钥
```shell
openssl  genrsa -out private.key 2048
openssl  rsa -in private.key -pubout -out public.key
```
使用fs读取秘钥文件，将秘钥传到jwt的配置中。
```javascript
import koa from 'koa';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const app = new koa();
const fileRouter = new Router();

const privateKey = fs.readFileSync('./keys/private.key');
const publicKey = fs.readFileSync('./keys/public.key');

fileRouter.get('/test', async (ctx, next) => {
    const user = {id: 110, name: '张三李四王五马六'}
    const token = jwt.sign(user, privateKey, {
        expiresIn: 1000 * 60,
        algorithm: 'RS256'
    });
    ctx.body = token
})

fileRouter.get('/demo', async (ctx, next) => {
    try{
        const authorization = ctx.headers.authorization;
        const token = authorization.replace('Bearer ', '');
        const result = jwt.verify(token, publicKey,{
            algorithms: ['RS256']
        });
        ctx.body = result
    }catch(err){
        console.log(err)
        ctx.body = err
    }
})

app.use(fileRouter.routes());

app.listen(8000,() => {
    console.log('server is running at port 8000');
});
```
