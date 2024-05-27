# Buffer
`Buffer` 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

## Buffer 提供的API
* `Buffer.alloc(size[, fill[, encoding]])：` 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
* `Buffer.allocUnsafe(size)：` 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
* Buffer.allocUnsafeSlow(size)
* `Buffer.from(array)：` 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
* `Buffer.from(arrayBuffer[, byteOffset[, length]])：` 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
* `Buffer.from(buffer)：` 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
* `Buffer.from(string[, encoding])：` 返回一个被 string 的值初始化的新的 Buffer 实例


```javascript
const buffer = Buffer.from("hello world")
console.log(buffer.toString()); // 字符串  hello world
console.log(buffer); //十六进制 <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

const buffer2 = Buffer.alloc(13)
buffer2[0] = 0x68
buffer2[1] = 0x65
buffer2[2] = 0x6c
buffer2[3] = 0x6c
buffer2[4] = 0x6f
console.log(buffer2.toString()); // hello

// 文本文件的读取
fs.readFile('./hello.mjs',(err,data) =>{
    console.log(data.toString());
})
```

图片文件读取
```javascript
import fs from 'fs'
import { Buffer } from 'buffer'
fs.readFile('./test.png',(err,data) =>{
    if (err) {
        console.log(err);
    }else{
        fs.writeFile('./copy.png',data,err =>{
            console.log(err);
        })
    }
})
```

>事实上我们创建Buffer时，并不会频繁的向操作系统申请内存，它会默认先申请一个8 * 1024个字节大小的内存，
也就是8kb


## Stream
Node中很多对象是基于流实现的，http模块的`Request`和`Response`对象、`process.stdout`对象。另外所有的流都是`EventEmitter`的实例

Node.js中有四种基本流类型：
* Writable：可以向其写入数据的流（例如 fs.createWriteStream()）。
* Readable：可以从中读取数据的流（例如 fs.createReadStream()）。
* Duplex：同时为Readable和的流Writable（例如 net.Socket）。
* Transform：Duplex可以在写入和读取数据时修改或转换数据的流（例如zlib.createDeflate()）。

### 读取文件 
一次性将一个文件中所有的内容都读取到程序（内存）中，但是这种读取方式有什么问题，比如文件过大、读取的位置、结束的位置、一次读取的大小。

```javascript
/**
 * 创建读取流
 * @param {*} path 文件路径
 * encoding 编码
 * start 开始读取的位置
 * end 结束读取的位置
 * highWaterMark 一次性读取字节的长度，默认是64kb
 */
const read = fs.createReadStream('./hello.mjs',{encoding:'utf-8',start:0,end:20,highWaterMark:2})
read.on('data',(chunk) =>{
    console.log(chunk);

    read.pause() //暂停
    
    setTimeout(() => {
        read.resume() //恢复
    }, 1000);
})
read.on('end',() =>{
    console.log('文件读取结束');
})
read.on('open',() =>{
    console.log('文件被打开');
})
read.on('error',(err) =>{
    console.log("文件读取失败-->",err);
})
read.on('close',() =>{
    console.log('文件关闭');
})

```
### 写入文件 
如果我们希望一点点写入内容，精确每次写入的位置等，可以使用createWriteStream。`flags`：默认是`w`，如果我们希望是追加写入，可以使用 `a`或者 `a+`,

一旦使用`start`写入具体位置。写入的内容会覆盖之前的内容。
```javascript
const write = fs.createWriteStream('./hello.mjs',{flags:'a+'})
write.write("你好",err =>{
    if (err) {
        console.log("写入失败",err);
    }
    console.log("写入成功");
})
write.on('finish',() =>{
    console.log("写入结束");
})
write.on('close',() =>{
    console.log("文件关闭");
})
// write.close() //关闭文件
// write.end()  //关闭文件
write.end("---")  //关闭文件之前写入数据 ---
```
写入流在打开后是不会自动关闭的，**我们必须手动关闭，调用close()方法，来告诉Node已经写入结束了**,并且会发出一个 finish 事件。另外一个非常常用的方法是 `end()`, 相当于做了两步操作： write传入的数据和调用close方法。

----------------------------------------------

正常情况下，我们可以将读取到的 输入流，手动的放到 输出流中进行写入。
```javascript
import fs from 'fs'

const reader = fs.createReadStream('./hello.mjs')
const writer = fs.createWriteStream('./hello.js')

// reader.on('data',(chunk) =>{
//     console.log(chunk);
//     writer.write(chunk,(err) => {
//         if (err) {
//             console.log("写入失败",err);
//         }else{
//             writer.close()
//             console.log("写入成功");
//         }
//     })
// })

// 上面的代码等同于下面这一句,写入完成后会调用close方法
reader.pipe(writer)
```