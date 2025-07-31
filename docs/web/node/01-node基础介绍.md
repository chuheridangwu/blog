# node介绍
NodeJS是一个集成了V8引擎的运行环境。，node运行环境最大的特点是提供了操作系统底层API的功能，通过底层API可以编写网页中无法实现的功能,比如 打包、网站服务器。[打开官网](https://nodejs.org/en)下载安装NodeJs。

## 管理node版本
有时候电脑可能会安装多个node版本，MacOS下可以通过`nvm`和`n`进行管理。Windows下nvm是不能安装的,通过[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)进行管理。
* nvm：`Node Version Manager`
```shell
nvm list available #列出可用的nodejs版本
nvm list  #列出本机安装的nodejs版本
nvm install 18.16.0 #安装指定版本
nvm use 18.16.0 #使用指定版本
```
* n：`Interactively Manage Your Node.js Versions`
```shell
npm install -g n #安装n
n #查看所有版本
n lts # 安装最新的lts版本
n latest # 安装最新的版本
```

## 运行node和传递参数
在命令行输入`node`进入node环境，可以输入一些node的全局变量或者一些js代码进行调用。如果想调用一个js文件，比如`hello.js`,在命令行输入`node hello.js`即可运行。

如果想传递参数,调用时在文件后面加上要传入参数即可。比如传递参数why使用`node hello.js why`。在文件中通过`process.argv`获取到参数。
```javascript
console.log(process.argv);
/**
 *  process.argv 是一个数组，前两个参数一个是node的绝对路径，一个是当前脚本的绝对路径，从第三个参数开始才是传递的参数。
 [
    '/opt/homebrew/Cellar/node/21.7.3/bin/node',  // node的绝对路径
    '/Users//Desktop/hello.js', // 当前脚本的绝对路径
    'why' // 传递的参数
  ] 
 */

```

## 全局对象
node提供了一些全局对象在模块中任意使用，比如`global`、`process`、`setTimeout`、`console`、`exports`。在命令行中输入`node`进入node环境，继续输入`global.`连续按两下TAB键即可查看全局对象。


* `global`是一个全局对象，提到的`process、console、setTimeout`等都有被放到global中。
* `process`提供了Node进程中相关的信息,比如当前进程的pid、运行环境、参数信息等,还可以将环境变量读取到 process 的 env 中；
* 定时器函数：`setTimeout`、`setInterval`、`clearTimeout`、`clearInterval`
    * `setTimeout` callback在delay毫秒后执行一次；
    * `setInterval` callback在delay毫秒后重复执行一次；
    * `setImmediate` callbackI / O事件后的回调的“立即”执行

一些特殊的全局对象`__dirname`、`__filename`、`exports`、`module`、`require()`,这些全局对象可以在模块中任意使用，在命令行交互中是不可以使用的.
* `__dirname`：获取当前文件路径,不包括文件名  /Users/xxx/Desktop/projects
* `__filename`：获取当前文件路径 + 文件名称  /Users/xxx/Desktop/projects/helloworld.js


## NodeJS学习网址
* [nodejs中文网](http://nodejs.cn/learn)
* [菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)
