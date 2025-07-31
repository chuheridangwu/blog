# Express
express是Node中比较流行的Web服务器框架,可以通过`express-generator`脚手架创建项目,`bin/www`是express框架的入口文件。
```shell
npm install -g express-generator # 安装脚手架
express express-demo # 创建项目
npm install  #安装依赖
node bin/www # 启动项目
```
也可以直接从零搭建自己的express项目
```shell
pnpm init
pnpm add express
```
express框架的基础使用方式
```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Get Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post Hello World!');
});

// 在request对象通过 req.params.fileId 获取值
app.post('/upload/:fileId', (req, res) => {
    console.log(req.params.fileId);
  res.send(`upload ${req.path} Hello World!`);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
```

## 中间件
中间件的本质是传递给express的一个回调函数。回调函数接受三个参数 `request对象`、`response对象`、`next函数（在express中定义的用于执行下一个中间件的函数）`。

如果当前中间件功能没有结束请求-响应周期，则必须调用`next()`将控制权传递给下一个中间件功能，否则，请求将被挂起。**如果注册有多个中间件，调用next()函数，会寻找符合规则的下一个中间件**
 
普通的中间件
```javascript
import express from 'express';

const app = express();

app.use((req,res,next) =>{
    console.log("注册普通的中间件-01")
    next()
    res.end("hello world")
})
app.use((req,res,next) =>{
    console.log("注册普通的中间件-02")
    res.end("hello world")
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
```
路径匹配中间件
```javascript
app.use('/home',(req,res,next) =>{
    res.send('<h1>Hello World</h1>');
})
```
路径和方法`<GET/POST>`都匹配的中间件
```javascript
app.get('/home',(req,res,next) =>{
    res.send('<h1>Hello World</h1>');
})
```
连续注册中间件
```javascript
app.get('/home',(req,res,next) =>{
    res.send('<h1>Hello World 2222</h1>');
    next();
},(res,req,next) =>{
    next();
},(res,req,next) =>{
    console.log(">>>>>>>>>");
})
```

## POST请求 - body解析
post请求时body传递的数据格式可以是json，可以是文件，也可以是`application/x-www-form-urlencoded`,如果是原生的解析方案
```javascript
import express from 'express';
const app = express();
//对body数据进行解析
app.use((req,res,next) => {
    if (req.headers['content-type'] === 'application/json') {
        req.on('data', (data) => {
            const info = JSON.parse(data.toString());
            req.body = info;
        })
        req.on('end', () => {
            next();
        })
    }else{
        next();
    }
})

app.post('/login', (req, res,next) => {
  console.log(req.body);
  res.end('ok');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
```
使用第三方`body-parser`进行解析,body中的数据是JSON格式,添加`pnpm add body-parser`到项目中
```javascript
//对body数据进行解析
app.use(express.json())
/**
 * 解析 application/x-www-form-urlencoded 格式
 * extended:true 解析时使用三方库qs
 * extended:false 解析时使用Node内置模块querystring
 */
app.use(express.urlencoded({extended:true}))
```
### form-data数据解析、上传文件
使用第三方`multer`对body中`form-data`格式的数据进行解析
```javascript
import express from 'express';
import multer from 'multer';
const app = express();
const upload = multer()
app.post('/login', upload.any(), (req, res,next) => {
    console.log(req.body);
    res.end('OK');
});
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
```
使用第三方`multer`保存上传文件,默认是没有后缀名的
```javascript
//file是from-data格式上传的文件，single是单个文件
const upload = multer({dest: './uploads/'})
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  // req.body 将具有文本域数据，如果存在的话
})
```
自定义文件保存地址和文件名称
```javascript
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
app.post('/upload', multer({storage}).single('file'), (req, res,next) => {
    console.log(req.file);
    res.end('文件上传成功');
});
```

>警告: 确保你总是处理了用户的文件上传。 永远不要将 multer 作为全局中间件使用，因为恶意用户可以上传文件到一个你没有预料到的路由，应该只在你需要处理上传文件的路由上使用。

------------------------------------

## GET请求参数解析
Get请求传递传递参数的方式有`params`和`query`,比如请求地址`http://localhost:8000/login/xxx/zzz?name=zhangsan&age=18`,
`xxx/zzz`是`params`，`name=zhangsan&age=18`是`query`。
```javascript
app.use('/login/:id/:name',(req,res,next) => {
    console.log(req.params);
    console.log(req.query);
    res.json("请求成功")
})
```

## 响应数据格式
```javascript
app.use('/login/:id/:name',(req,res,next) => {
    res.end("返回的是一个字符串")
})
app.use('/login/:id/:name',(req,res,next) => {
    res.josn(["返回的是一个json数据"])
})
```

## 日志记录
如果我们希望将请求日志记录下来，那么可以使用express官网开发的第三方库`morgan`。
```javascript
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';

const app = express();

const loggerWriter = fs.createWriteStream('./logs/access.log', { flags: 'a+' });
app.use(morgan('combined', { stream: loggerWriter }))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
```

## Express的路由
express处理接口都写在一个文件中太过复杂，使用路由将每个路径的文件进行分离，express有内置路由处理。
<!-- tabs:start -->

#### **Express使用路由**
```javascript
import express from 'express';
import userRouter from './router/user.js';

const app = express();

app.use("/users",userRouter)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
```

#### **user路由**
```javascript
import express, { Router } from 'express';

const router = express.Router();

router.get('/', (req, res,next) => {
    res.json(["小明"]);
})
router.post('/', (req, res,next) => {
    res.json(["小张"]);
})
router.post('/:id', (req, res,next) => {
    res.json(`${req.params.id}用户信息`);
})

export default router;
```

<!-- tabs:end -->

## 静态资源服务器

```javascript
import express from 'express';

const app = express();

// vite构建的build项目文件
app.use(express.static('./build'))

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
```

## 服务端错误处理

```javascript
import express from 'express';

const app = express();

app.use('/users',(req,res,next) => {
    const isLogin = false
    if(isLogin){
        res.json("登录成功")
    }else{
        next(new Error(USERNAME_DOES_NOT_EXIST))
    }
})

const USERNAME_DOES_NOT_EXIST = 'Username does not exist';
const USERNAME_CODE = 'Username code';
app.use((err,req,res,next) => {
    let status = 400
    switch(err.message){
        case USERNAME_DOES_NOT_EXIST:
            status = 404
            break
        default:
            status = 400
            break
    }
    res.status(status).json({
        message: err.message,
        code: USERNAME_CODE
    })
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
```