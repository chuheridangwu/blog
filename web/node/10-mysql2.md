# mysql2
mysql2在mysql的基础之上，进行了很多的优化、改进,通过代码链接数据库完成所有的操作。`npm install mysql2`安装。

```javascript
// 导入模块
import mysql from 'mysql2/promise';

// 创建一个数据库连接
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test',
});

// 简单查询
try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
  );

  console.log(results); // 结果集
  console.log(fields); // 额外的元数据（如果有的话）
} catch (err) {
  console.log(err);
}

// 使用占位符
  try {
    const statement = 'SELECT * FROM `products` WHERE `brand` = ? AND `price` > ?'
    const [results] = await connection.query(statement,['huawei', 500]);
    console.log(results);
  } catch (err) {
    console.log(err);
  }
```

## SQL预处理的使用
使用 MySQL2，您还可以提前准备好SQL预处理语句。 使用准备好的SQL预处理语句，MySQL 不必每次都为相同的查询做准备，这会带来更好的性能。 并且防止sql注入
```javascript
import mysql from 'mysql2/promise';

try {
  // 创建一个数据库连接
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
  });

  // execute 将在内部调用 prepare 和 query
  const [results, fields] = await connection.execute(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Rick C-137', 53]
  );

  console.log(results); // 结果集
  console.log(fields); // 额外的元数据（如果有的话）
} catch (err) {
  console.log(err);
}
```

## 连接池的使用
连接池通过重用以前的连接来帮助减少连接到 MySQL 服务器所花费的时间，当你完成它们时让它们保持打开而不是关闭。这改善了查询的延迟，因为您避免了建立新连接所带来的所有开销。
```javascript
import mysql from 'mysql2/promise';

// 创建连接池，设置连接池的参数
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10, // 连接池最大创建个数
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
```
>该池不会预先创建所有连接，而是根据需要创建它们，直到达到连接限制。

您可以像直接连接一样使用池（使用 pool.query() 和 pool.execute()）：
```javascript
try {
  // For pool initialization, see above
  const [rows, fields] = await pool.query('SELECT `field` FROM `table`');
  // Connection is automatically released when query resolves
} catch (err) {
  console.log(err);
}
```
或者，也可以手动从池中获取连接并稍后返回：
```javascript
// For pool initialization, see above
const conn = await pool.getConnection();

// Do something with the connection
await conn.query(/* ... */);

// Don't forget to release the connection when finished!
pool.releaseConnection(conn);
```

* [mysql2](https://github.com/sidorares/node-mysql2)

# Sequelize
对象关系映射（英语：Object Relational Mapping，简称ORM，或O/RM，或O/R mapping），是一种程序设计的方案。类似于两张表之间的关系表。Sequelize起到的作用就是这个。

你可以直接调用Sequelize提供的方法来操作数据库，也可以使用Sequelize提供的模型来操作数据库。`npm install sequelize mysql2`

链接数据库
```javascript
import mysql from 'mysql2/promise';
import {Sequelize,DataTypes,Model,Op} from 'sequelize';

const sequelize = new Sequelize('userdata', 'root', 'QAZwsx1234.', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
```

创建模型
```javascript
class Student extends Model {}
Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Students',
  createdAt: false,
  updatedAt: false
});
```
查询数据
```javascript
// 查询所有学生
const results = await Student.findAll({});
console.log(results);

// 查询年龄大于20岁的学生
const result2 = await Student.findAll({
  where: {
    age: {
      [Op.gt]: 20
    }
  }
});
console.log(result2);

//创建用户
const result3 = await Student.create({
  name: '张三',
  age: 20
});
console.log(result3);
```

# 项目过程
## 端口和账号密码登信息放到`.env`文件中，文件放在`package.json`同级目录中，在项目中使用第三方`dotenv`获取`.env`文件中的信息。

<!-- tabs:start -->
#### **.env文件内容**
```javascript
APP_PORT = 8000
```
#### **获取env文件内容**
```javascript
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.APP_PORT);
```

<!-- tabs:end -->

## 动态加载所有路由
将路由文件全部放在一个文件夹中,通过`fs`模块读取文件夹中的文件，然后通过`require`方法加载文件，然后通过`app.use`方法注册路由。
```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const useRoutes = function(app) {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') return;
        import(`./${file}`).then((module) => {
            app.use(module.default.routes());
            app.use(module.default.allowedMethods());
        });
    });
};
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

## 浏览器打开图片地址直接下载原因
需要设置`content-type`,不然会直接下载
```javascript
// 提供图片信息
ctx.response.set('content-type',result.mimetype)
ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`)
```