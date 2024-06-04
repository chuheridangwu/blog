# MySQL
数据库通俗来讲就是一个存储数据的仓库，数据库本质上就是一个软件、一个程序。通常将数据划分成两类：关系型数据库和非关系型数据库。
* 关系型数据库：MySQL、Oracle、DB2、SQL Server、Postgre SQL等； 在公司进行后端开发（Node、Java、Go等），还是以关系型数据库为主。
* 非关系型数据库：MongoDB、Redis、Memcached、HBse等；在爬取大量的数据进行存储时，会比较常见；
  * 非关系型数据库的英文其实是Not only SQL，也简称为NoSQL；存储数据也会更加自由（甚至我们可以直接将一个复杂的json对象直接塞入到数据库中）；
  * NoSQL是基于Key-Value的对应关系，并且查询的过程中不需要经过SQL解析，所以性能更高；


MySQL是一个关系型数据库，默认端口`3306`。它本质上是一个程序,这个程序中管理着多个数据库,每个数据库中可以有多张表,每个表中可以有多条数据。[下载MySQL](https://dev.mysql.com/downloads/mysql/)

----------------------------------------

MACOS下安装MySQL之后如果想在终端使用，需要配置环境变量：
``` shell
export PATH=$PATH:/usr/local/mysql/bin
mysql --version # 查看版本
```
MacOS安装MySQL之后，在System Preference中，进入MySQL，点击`Start MySQL Server`时，左侧的红色变成绿色后，立即又变成了红色，启动后立即又停止了! 在命令行中通过命令启动
```shell
# 启动
sudo /usr/local/mysql/support-files/mysql.server start
# 停止
sudo /usr/local/mysql/support-files/mysql.server stop
# 重启
sudo /usr/local/mysql/support-files/mysql.server restart
```

## 连接数据库
想要操作数据，首先要将数据库启动，通过账号密码和MySQL建立一个连接，最直接的方式就是通过终端来连接,
```shell
# root账号 Qwww2221.是密码
mysql -uroot -pQwww2221.
# 查看MySQL所有数据库
show databases;
# 退出 or exit;
quit;
```
MySQL中可以有多个数据库，通过`show databases;`可以查看MySQL中所有的数据库，**注意分号;是结束符不可忽略**,MySQL有4个默认的数据库：
* `infomation_schema`：信息数据库，其中包括MySQL在维护的其他数据库、表、列、访问权限等信息；
* `performance_schema`：性能数据库，记录着MySQL Server数据库引擎在运行过程中的一些资源消耗相关的信息；
* `mysql`：用于存储数据库管理者的用户信息、权限信息以及一些日志信息等；
* `sys`：相当于是一个简易版的`performance_schema`，将性能数据库中的数据汇总成更容易理解的形式；

### 终端对数据库的操作
在终端直接创建一个属于自己的新的数据库userdata，然后进入到这个数据库中，然后创建一个表，然后插入一些数据，然后查询数据。
```sql
# 如果数据库不存在创建数据库
create database if not exists userdata;
# 查看正在使用的数据库
select database();
# 使用数据库
use userdata;
# 查看表
show tables;
# 创建表
create table if not exists user(
  id int primary key auto_increment,
  name varchar(20),
  age int,
  sex varchar(10)
  );
# 插入数据
insert into user(name,age,sex) values('张三',18,'男');
insert into user(name,age,sex) values('李四',19,'女');
# 查询数据
select * from user;
# 删除数据
delete from user where id=1;
# 删除表
drop table if exists user;
# 删除数据库
drop database if exists userdata;
# 退出
quit;
```

## SQL语句
和数据库沟通的语言，这个语言就是SQL。SQL编写出来的语句，就称之为SQL语句。SQL语句的常用规范：
* 通常关键字是大写的，比如`CREATE`、`TABLE`、`SHOW`等等；
* 一条语句结束后，需要以 `;`` 结尾；
* 如果遇到关键字作为表明或者字段名称，可以使用``包裹;


常见的SQL语句我们可以分成四类：
*  `DDL（Data Definition Language`）：数据定义语言；可以通过DDL语句对数据库或者表进行：创建、删除、修改等操作；
*  `DML（Data Manipulation Language）`：数据操作语言；可以通过DML语句对表进行：添加、删除、修改等操作；
*  `DQL（Data Query Language）`：数据查询语言；可以通过DQL从数据库中查询记录；（重点）
*  `DCL（Data Control Language`）：数据控制语言；对数据库、表格的权限进行相关访问控制操作

## 数据库的操作
```sql
# 查看MySQL所有数据库
show databases;
# 如果数据库不存在创建数据库
create database if not exists userdata;
# 查看正在使用的数据库
select database();
# 使用数据库
use userdata;
# 删除数据库
drop database if exists userdata;
```

## 数据表的操作
```sql
# 查看数据库中所有的表
show tables;
# 查看某一个表结构
desc `user`
# 创建表
create table if not exists `user`(
  id int primary key auto_increment,
  name varchar(20),
  age int,
  sex varchar(10),
  height decimal(5,2),
);
# 查看创建表时的SQL语句
show create table `user`;
# 插入数据
insert into user(name,age,sex) values('张三',18,'男');
insert into user(name,age,sex) values('李四',19,'女');
# 查询数据
select * from user;
# 删除数据
delete from user where id=1;
# 删除表
drop table if exists `user`;
```

MySQL的日期类型有下面几种
* `DATE`：表示日期，格式为`YYYY-MM-DD`；
* `DATETIME`：表示日期和时间，格式为`YYYY-MM-DD HH:MM:SS`；
* `TIMESTAMP`：表示日期和时间，格式为`YYYY-MM-DD HH:MM:SS`，但是它不是存储在数据库中的，而是存储在服务器的计算机中，所以它不是固定的，每次服务器重启之后，时间都会重新计算；
* `TIME`：表示时间，格式为`HH:MM:SS`；
* `YEAR`：表示年份，格式为`YYYY`；

### 表约束

* 主键：`PRIMARY KEY`,为了区分一张表中每一条记录的唯一性，必须有一个字段是永远不会重复，并且不会为空的，这个字段我们通常会
将它设置为主键,
  * 主键是表中唯一的索引。必须是`NOT NULL`的，如果我们没有设置，MySQL也会隐式的设置为NOT NULL；
  * 主键也可以是多列索引，`PRIMARY KEY(key_part, ...)`，一般称之为联合主键；
* 唯一：`UNIQUE`,某些字段我们希望是唯一的，不会重复的，比如手机号码、身份证号码等，这个字段可以使用UNIQUE来约束,，UNIQUE 索引允许NULL包含的列具有多个值NULL。
* 不能为空：`NOT NULL`,某些字段我们要求用户必须插入值，不可以为空，使用 `NOT NULL` 来约束；
* 默认值：`DEFAULT` 某些字段我们希望在没有设置值时给予一个默认值，使用 DEFAULT来完成；
* 自动递增：`AUTO_INCREMENT` 某些字段我们希望不设置值时可以进行递增，比如用户的id，使用AUTO_INCREMENT来完成；

```sql
# 创建表
CREATE TABLE IF NOT EXISTS persons(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  age INT DEFAULT 0,
  telPhone VARCHAR(20) DEFAULT '' UNIQUE NOT NULL,
  createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
# 修改字段名称
ALTER TABLE persons CHANGE name username VARCHAR(20);
# 修改字段类型
ALTER TABLE persons MODIFY telPhone VARCHAR(20) DEFAULT '';
# 删除字段
ALTER TABLE persons DROP telPhone;
# 修改表名
ALTER TABLE persons RENAME TO person;
# 添加字段
ALTER TABLE person ADD email VARCHAR(20) DEFAULT '';
# 根据另一个表结构创建另外一张表
CREATE TABLE IF NOT EXISTS person_copy LIKE person;
# 根据另一张表的所有内容创建一个新的表
CREATE TABLE IF NOT EXISTS person_copy SELECT * FROM person;
```

## 数据操作
数据操作语言，通过DML语句对表进行添加、删除、修改等操作。我们通过创建一张表并且插入一些数据，然后通过DML语句来操作数据。
```sql
# 创建表
CREATE TABLE IF NOT EXISTS `products`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(20),
  `description` VARCHAR(200),
  `price` DOUBLE,
  `publishTime` DATETIME
);
# 插入数据
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) VALUES ('iPhone', 'iPhone12只要998', 998.88, '2020-10-10');
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) VALUES ('huawei', 'iPhoneP40只要888', 888.88, '2020-11-11');
# 修改符合条件的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88 WHERE `title` = 'iPhone';
# 修改所有数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88;
# 删除符合条件的数据
DELETE FROM `products` WHERE `title` = 'iPhone';
# 删除表中所有的数据
DELETE FROM `products`;
# 添加字段更新时间
ALTER TABLE `products` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 
```

## DQL查询语句
 * `SELECT`：查询；
 * `FROM`：从什么表中查询；
 * `WHERE`：查询条件；
 * `ORDER BY`：排序；
 * `LIMIT`：分页；
 * `GROUP BY`：分组；
 * `HAVING`：分组条件；
 * `UNION`：合并查询结果；
 * `EXISTS`：判断是否存在；
 * `IN`：查询条件；
 * `JOIN`：连接查询；
 * `CROSS JOIN`：交叉连接查询；
 * `LEFT JOIN`：左连接查询；
 * `RIGHT JOIN`：右连接查询；
 * `INNER JOIN`：内连接查询；
 * `FULL JOIN`：全连接查询；
 * `UNION ALL`：合并查询结果，不去重；
 * `INTERSECT`：交集查询；
 * `EXCEPT`：差集查询；
 * `CROSS JOIN`：交叉连接查询；
 * `SELF JOIN`：自身连接查询；

查询语句的格式
```sql
SELECT select_expr [, select_expr]... # 查询表达式，也就是字段名称
  [FROM table_references]  # 表名
  [WHERE where_condition] # 查询条件
  [ORDER BY expr [ASC | DESC]]  # 排序 ASC 升序, DESC 降序, 默认升序
  [LIMIT {[offset,] row_count | row_count OFFSET offset}]   # 分页
  [GROUP BY expr] # 分组
  [HAVING where_condition] # 分组条件
```

创建一个手机品牌表，通过实例进行查询
```sql
# 创建表
CREATE TABLE IF NOT EXISTS products(
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DOUBLE(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT
)
# 查询表中所有数据
SELECT * FROM products;
# 查询指定字段
SELECT brand FROM products;
# 对字段起别名
SELECT brand AS 品牌 FROM products;
# WHERE 的比较运算符 >、<、=、>=、<=、!= 查询
SELECT brand, title FROM products WHERE brand = '华为';
SELECT * FROM `products` WHERE price < 1000;
# 值为 NULL 查询，只能使用关键字 IS
SELECT * FROM products WHERE url IS NULL; 
SELECT * FROM products WHERE url IS NOT NULL; 
# WHERE 逻辑运算符 and 、or 查询 
SELECT * FROM `products` WHERE price < 1000 AND brand = '华为';
SELECT * FROM `products` WHERE price < 1000 OR brand = '华为';
# WHERE 查询价格区间 BETWEEN ... AND ... 查询(包含500和1000)
SELECT * FROM products WHERE price BETWEEN 500 AND 1000; 
# WHERE 模糊查询使用 LIKE 关键字，结合两个特殊的符号 % _
# %表示匹配任意个的任意字符
SELECT * FROM products WHERE title LIKE '%P40%';
# _表示匹配一个的任意字符；
SELECT * FROM products WHERE title LIKE '_P40%';
# IN 表示取多个值中的其中一个即可
SELECT * FROM products WHERE brand IN ('华为', '小米');
# ORDER BY 排序
SELECT * FROM products WHERE brand IN ('华为', '小米') ORDER BY price DESC;
# LIMIT 分页,使用关键字 OFFSET, limit 5  offset 0
SELECT * FROM products WHERE brand IN ('华为', '小米') ORDER BY price DESC LIMIT 5 OFFSET 0;
# LIMIT 分页,直接写2个数字，第一个值是 offset 0 , limit 10 
SELECT * FROM products WHERE brand IN ('华为', '小米') ORDER BY price DESC LIMIT 0, 10;
```
聚合函数，将一个表中的所有数据当做一组数据，对值集合进行操作的组（集合）函数。
```sql
# SUM所有price的值总和
SELECT SUM(price) FROM products;
# 使用别名
SELECT SUM(price) totalPrice FROM products;
# 平均价格
SELECT AVG(price) totalPrice FROM products WHERE brand = 'huawei';
# 最大最小值
SELECT MAX(price) FROM products;
SELECT MIN(price) FROM products;
# 产品个数,
SELECT COUNT(*) FROM products;
# 字段值为NULL时不计数
SELECT COUNT(url) FROM products;
# 去重计数 DISTINCT
SELECT COUNT(DISTINCT brand) FROM products;
```
聚合函数相当于默认将所有的数据分成了一组,`Group By `对数据进行分组，再对每一组数据，进行聚合函数的计算。
```sql
# brand分组，统计每个分组的个数
SELECT brand, COUNT(*) totalCount,AVG(price) FROM products GROUP BY brand;
# 分组之后 条件查询使用 HAVING
SELECT brand, AVG(price) avgPrice FROM products GROUP BY brand HAVING avgPrice > 1000;
# 平均分大于5的手机平均价格,需要先用 WHERE 条件筛选出数据，再对筛选的数据进行分组
SELECT brand, AVG(price) price FROM products WHERE score > 5 GROUP BY brand; 
```

## 多表处理
首先创建另一张表，添加模拟数据。
```sql
# 创建另一张表
CREATE TABLE IF NOT EXISTS `brand`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  website VARCHAR(100),
  worldRank INT
);
# 插入模拟数据
INSERT INTO `brand` (name, website, worldRank) VALUES ('华为', 'www.huawei.com', 1);
INSERT INTO `brand` (name, website, worldRank) VALUES ('小米', 'www.mi.com', 10);
INSERT INTO `brand` (name, website, worldRank) VALUES ('苹果', 'www.apple.com', 5);
INSERT INTO `brand` (name, website, worldRank) VALUES ('oppo', 'www.oppo.com', 15);
INSERT INTO `brand` (name, website, worldRank) VALUES ('京东', 'www.jd.com', 3);
INSERT INTO `brand` (name, website, worldRank) VALUES ('Google', 'www.google.com', 8);
```
### 创建外键
我们可以通过外键将两张表联系起来，将`products`中的`brand_id`关联到`brand`中的`id`。这样两张表就有联系了。如果是创建表添加外键约束，可以在创建`products`表时设置外键约束。
```sql
# 创建表时添加外键
CREATE TABLE IF NOT EXISTS products(
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DOUBLE(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT,
	brand_id INT,
  FOREIGN KEY (brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE RESTRICT ## 设置外键,并且设置新的action
)
```
如果是表已经创建好，额外添加外键，添加字段的同时设置为外键
```sql
# 先添加再绑定
ALTER TABLE `products` ADD brand_id INT;
# brand_id 是 products表中的字段 关联到 brand表中的 id 字段
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brand(id);
```

#### 外键约束
我们想一下如果外键被更新了或者删除了应该怎么办，其他表的数据是不是需要同时修改。默认设置的外键其他表更新和删除都不会发生变化，如果我们要所有表同步数据就需要更改。
* `RESTRICT`（默认属性）：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话会报错的，不允许更新或删除；
* `NO ACTION`：和RESTRICT是一致的，是在SQL标准中定义的；
* `CASCADE`：当更新或删除某个记录时，会检查该记录是否有关联的外键记录。
  * 更新：那么会更新对应的记录；
  * 删除：那么关联的记录会被一起删除掉；
* `SET NULL`：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话，将对应的值设置为NULL；

可视化工具`Navicat Premium`可以直接修改外键的属性，如果要通过代码修改，需要先找到外键的名称，删除外键，添加外键的同时设置删除和更新时的属性。
```sql
# 查看创建表的命令，可以看到外键名称
SHOW CREATE TABLE `products`;
# 删除之前的外键
ALTER TABLE `products` DROP FOREIGN KEY products_ibfk_1;
# 添加新的外键，并且设置新的action
ALTER TABLE `products` ADD FOREIGN KEY (brand_id)
                        REFERENCES brand(id)
                        ON UPDATE CASCADE ON DELETE CASCADE;
```
### 多表查询
如果我们希望查询到产品的同时，显示对应的品牌相关的信息，因为数据是存放在两张表中，所以这个时候就需要进行多表查询。
```sql
# 笛卡尔乘积，也称之为直积，表示为 X*Y；
SELECT * FROM `products`, `brand`;
```
直接使用这种方法，查询出来的数据是笛卡尔积，也就是所有产品都和所有品牌相关联。我们想要的是表中的某些特定的数据，可以使用 `SQL JOIN `操作。
* 左连接,获取到的是左边所有的数据（以左表为主）完整写法是`LEFT [OUTER] JOIN`，但是`OUTER`可以省略.(常用)
* 右连接,获取到的是右边所有的数据（以右表为主）
* 内连接,左边的表和右边的表都有对应的数据关联，两张表之间的交集
* 全连接,SQL规范中全连接是使用`FULL JOIN`，但是MySQL中并没有对它的支持，我们需要使用 `UNION` 来实现

```sql
# 左链接 ON是告诉表通过什么字段进行链接 
SELECT * FROM `products` LEFT JOIN `brand` ON `products`.`brand_id` = `brand`.`id`;
# WHERE 对查询到的结果再进行筛选
SELECT * FROM `products` LEFT JOIN brand ON `products`.`brand_id` = `brand`.`id` WHERE `brand`.`id` IS NULL;
# 右连接
SELECT * FROM `products` RIGHT JOIN `brand` ON `products`.`brand_id` = `brand`.`id`;
SELECT * FROM `products` RIGHT JOIN `brand` ON `products`.`brand_id` = `brand`.`id` WHERE `products`.`brand_id` IS NULL;
# 内连接
SELECT * FROM `products` JOIN `brand` ON `products`.`brand_id` = `brand`.`id`;
SELECT * FROM `products` INNER JOIN `brand` ON `products`.`brand_id` = `brand`.`id`;
SELECT * FROM `products` INNER JOIN `brand` ON `products`.`brand_id` = `brand`.`id` WHERE price > 1000;
# 全连接 
SELECT * FROM `products` FULL JOIN `brand` ON `products`.`brand_id` = `brand`.`id`;
# UNION MySQL不支持全连接(FULL JOIN)，需要使用UNION来代替
(SELECT * FROM products LEFT JOIN brand ON products.brand_id = brand.id)
UNION
(SELECT * FROM products RIGHT JOIN brand ON products.brand_id = brand.id)

# 两张表没有关联的数据
(SELECT * FROM products LEFT JOIN brand ON products.brand_id = brand.id WHERE brand.id IS NULL)
UNION
(SELECT * FROM products RIGHT JOIN brand ON products.brand_id = brand.id WHERE products.brand_id IS NULL)
```

-----------------------------------------------
表和表之间的关系一般有三种，一对一的关系表，一对多的关系表，多对多的关系表，比如学生可以选择多门课程，一个课程可以被多个学生选择。通过下面的例子展示，先建立2张表，填充数据
```sql
# 创建学生表
CREATE TABLE IF NOT EXISTS `students`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  age INT
);

# 创建课程表
CREATE TABLE IF NOT EXISTS `courses`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price DOUBLE NOT NULL
);

# 填充数据
INSERT INTO `students` (name, age) VALUES('why', 18);
INSERT INTO `students` (name, age) VALUES('tom', 22);
INSERT INTO `students` (name, age) VALUES('lilei', 25);
INSERT INTO `students` (name, age) VALUES('lucy', 16);
INSERT INTO `students` (name, age) VALUES('lily', 20);

INSERT INTO `courses` (name, price) VALUES ('英语', 100);
INSERT INTO `courses` (name, price) VALUES ('语文', 666);
INSERT INTO `courses` (name, price) VALUES ('数学', 888);
INSERT INTO `courses` (name, price) VALUES ('历史', 80);
INSERT INTO `courses` (name, price) VALUES ('物理', 800);
```
创建一个关系表来记录两张表中的数据关系,比如A选了语文和数学，B选了数学，C选了历史，在后面的查询中就只需要查询关系表，就可以知道学生的选择情况。
```sql
# 查询所有的学生选择的所有课程
SELECT stu.id studentId, stu.name studentName, cs.id courseId, cs.name courseName, cs.price coursePrice
FROM `students` stu
JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
JOIN `courses` cs ON ssc.course_id = cs.id; 

# 查询所有的学生选课情况
SELECT stu.id studentId, stu.name studentName, cs.id courseId, cs.name courseName, cs.price coursePrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id; 

# 查询某个同学选择了哪门课
SELECT stu.id studentId, stu.name studentName, cs.id courseId, cs.name courseName, cs.price coursePrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.id = 5; 

# 哪些学生是没有选课的
SELECT stu.id studentId, stu.name studentName, cs.id courseId, cs.name courseName, cs.price coursePrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE cs.id IS NULL;

# 查询哪些课程没有被学生选择
SELECT stu.id studentId, stu.name studentName, cs.id courseId, cs.name courseName, cs.price coursePrice
FROM `students` stu
RIGHT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
RIGHT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.id IS NULL;
```

> 切记，WHERE 是将前面的数据进行筛选，当不确定怎么使用 WHERE 选择数据时，先将全部数据搜出来，然后再筛选。

# 查询结果JSON
转换成json对象
```sql
SELECT products.id as id, products.title as title, products.price as price, products.score as score,
JSON_OBJECT('id', brand.id, 'name', brand.name, 'rank', brand.phoneRank, 'website', brand.website) as brand
FROM products 
LEFT JOIN brand ON products.brand_id = brand.id;
```
在多对多关系中，我们希望查询到的是一个数组，比如一个学生的多门课程信息，应该是放到一个数组中的，数组中存放的是课程信息的一个个对象这个,时候要 JSON_ARRAYAGG和JSON_OBJECT结合来使用
```sql
SELECT stu.id, stu.name, stu.age, JSON_ARRAYAGG(JSON_OBJECT('id', cs.id, 'name', cs.name)) as courses
FROM students stu
LEFT JOIN students_select_courses ssc ON stu.id = ssc.student_id
LEFT JOIN courses cs ON ssc.course_id = cs.id
GROUP BY stu.id
```