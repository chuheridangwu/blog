# Node.js
NodeJS不是一门编程语言，是一个运行环境。这个运行环境由于集成了V8引擎，所以可以运行编写的JS代码，node运行环境最大的特点是提供了操作系统底层API的功能，通过底层API可以编写网页中无法实现的功能（打包、网站服务器等）。使用`node xxx.js` 可以运行js文件或者在命令行输入`node`进入node环境。

NodeJS核心库：Buffer、path、fs/pipe、http

NodeJS环境和浏览器一样都是一个JS的运行环境，都可以执行JS代码，但是由于宿主不同，所以特点也不同：
1. 浏览器环境提供`window`全局对象，NodeJS环境提供`global`全局对象
2. 浏览器环境全局this默认指向`window`，NodeJS环境全局this默认指向空对象`{}`
3. 浏览器环境提供了操作了跟DOM/BOM相关的API,NodeJS环境中没有DOM/BOM

## 安装
[NodeJS下载地址](https://nodejs.org/en/download/),Windows中的.exe文件可以直接安装。Mac OS系统使用`brew install node`进行安装。

**Linux 上安装 Node.js**

```shell
# wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz    // 下载
# tar xf  node-v10.9.0-linux-x64.tar.xz       // 解压
# cd node-v10.9.0-linux-x64/                  // 进入解压目录
# ./bin/node -v                               // 执行node命令 查看版本
v10.9.0
```
解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

```shell
ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/ 
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```
## 模块化
nodejs采用commonjs规范实现模块化开发。commonjs规范规定：
* 每一个文件就是一个模块
* 每个文件的变量、函数都是私有的，对其他文件不可见的
* 每个文件中的变量、函数必须通过 `exports` 暴露之后，其他文件才可以使用
* 如果想要使用其他文件暴露的变量、函数，必须通过`require("xxx")`导入模块才可以使用。

```javascript
let name = "test"

function sum(a,b){
 return a + b;
}

//  直接导出
exports.world = function() {
  console.log('Hello World');
}

// 第一种导出方式
exports.name=name
exports.sum=sum

// 第二种导出方式
module.name=name
module.sum=sum

// 在其他js文件使用模块
let hello = require("./hello.js")
console.log(hello.name)
```

## NPM
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题.例如允许用户从NPM服务器下载别人编写的第三方包到本地使用。由于npm是下载国外的包比较慢，国内创建了nrm和cnpm，使用方式跟npm一样。只是从国内镜像中下载资源。

NPM常见的命令：
```shell
# 查看版本号
npm-v

# 查看npm基本配置
npm config list 

# -g:代表全局安装，在每个项目中都可以使用。 不使用-g表示本地安装，只在当前项目可用
npm install -g  包名
npm install -g  包名@版本号 # 安装指定版本的包
npm uninstall -g  包名
npm update -g  包名  # 更新失败直接使用install进行安装

#  本地安装，需要首先创建packjson文件。先切换到对应的文件夹
npm init -y
npm install 包名
npm i  #  所有的包都会被安装
npm i  --production  # 只安装 packjson文件中 dependencies中的包
npm i --development  # 只安装 packjson文件中 devDevpandencies中的包
```

## Buffer
Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

**Buffer 提供了以下 API 来创建 Buffer 类：**
* `Buffer.alloc(size[, fill[, encoding]])：` 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
* `Buffer.allocUnsafe(size)：` 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
* Buffer.allocUnsafeSlow(size)
* `Buffer.from(array)：` 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
* `Buffer.from(arrayBuffer[, byteOffset[, length]])：` 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
* `Buffer.from(buffer)：` 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
* `Buffer.from(string[, encoding])：` 返回一个被 string 的值初始化的新的 Buffer 实例

## NodeJS 发动邮件
使用 nodeJS 发送邮件，需要使用`npm install nodemailer`安装`nodemailer`库。然后再对应的163邮箱中开启IMAP和POP3服务，配置163邮箱对应的授权密码管理。
```javascript
var nodemailer = require("nodemailer")

var transport = nodemailer.createTransport({
    host:"smtp.163.com", // 主机，在设置里面可以看到
    secureConnection:true, //使用SSL
    port:465,  //STMP端口号
    auth:{
        user:"xxx@163.com",
        pass:"xxx"  //设备密码
    }
})

var mailOptions = {
    from:"xxx@163.com", //发件人
    to:"xxx@qq.com",    // 收件人
    subject:"测试邮件",  //邮件标题
    text:"这是一封测试邮件", // 邮件内容
    html:"<b>helloworld<b>", // 使用html的格式发送邮件，优先级>text
    attachments:[
        {
            filename:"text",
            path:"./app.img" // 文件路径
        },
        {
            filename:"text1", // 文件名
            content:"test" //自己写文件内容
        }
    ]
}

transport.sendMail(mailOptions,function(err,response){
    if(err) console.log(err)
    else console.log(response)
})
```

## NodeJS学习网址
* [nodejs中文网](http://nodejs.cn/learn)
* [菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)