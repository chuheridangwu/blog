# mysql2
mysql2在mysql的基础之上，进行了很多的优化、改进,通过代码链接数据库完成所有的操作。`npm install mysql2`安装。

```javascript
// 导入模块
import mysql from 'mysql2/promise';

// 创建一个数据库连接
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
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
