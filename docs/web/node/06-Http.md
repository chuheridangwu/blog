# Http

创建一个基础的Web服务器
```javascript
import http from "http"

// 创建服务器
const server = http.createServer((req, res) => {
  res.end("Hello World -->")
})

//监听端口，端口不传默认随机端口,IP不传默认0.0.0.0
server.listen(8000,"127.0.0.1",() =>{
    console.log("server is running")
})
```

## 请求对象
在向服务器发送请求时会携带很多信息，比如
* 本次请求的URL，服务器需要根据不同的URL进行不同的处理；
* 本次请求的请求方式，比如GET、POST请求传入的参数和处理的方式是不同的；
* 本次请求的headers中也会携带一些信息，比如客户端信息、接受数据的格式、支持的编码格式等；

等等... 这些信息，Node会帮助我们封装到一个request的对象中，我们可以直接来处理这个request对象：
```javascript
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })

    console.log(req.method);
    console.log(req.headers);
    // 处理URL
    const url = req.url
    if (url === "/login") {
        res.end("user login")
    }else{
        res.end("404")
    }
})
```
如果用户发送的地址中还携带一些额外的参数,比如 `http://localhost:8000/login?name=why&password=123`,这时url的值是`/login?name=why&password=123`,使用内置模块url进行解析。query 信息使用querystring模块进行解析
```javascript
const server = http.createServer((req, res) => {
    // 解析url
    const { pathname, query } = url.parse(req.url)
    // 解析query，也可以使用析构的方式解析
    const queryObj = qs.parse(query)

    res.end(pathname)
})
```
如果是post请求，body的值传递的是json格式，使用curl模拟请求
```shell
curl --location --request POST 'http://127.0.0.1:8000/login' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: 127.0.0.1:8000' \
--header 'Connection: keep-alive' \
--data-raw '{
    "name":"why",
    "age":7654321  
}'
```
使用JSON进行解析，获取body参数
```javascript
const server = http.createServer((req, res) => {
   const { pathname } = url.parse(req.url)
   if (pathname === '/login') {
    if (req.method === 'POST') {
        req.setEncoding('utf-8')
        req.on('data', (chunk) => {
            const { name, age } = JSON.parse(chunk)
            console.log(name, age);
        })
    }
   }
   res.end('hello world')
})
```
在request对象的header中也包含很多有用的信息，客户端会默认传递过来一些信息：
* `content-type`是这次请求携带的数据的类型：
    * `application/json`表示是一个json类型；
    * `text/plain`表示是文本类型；
    * `application/xml`表示是xml类型；
    * `multipart/form-data`表示是上传文件；
* `content-length`：文件的大小和长度
* `accept-encoding`: 告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 .gz文件；
* `accept`：告知服务器，客户端可接受文件的格式类型；
* `user-agent`：客户端相关的信息；


## 返回响应结果
如果我们希望给客户端响应的结果数据，可以通过两种方式：
*  `Write`方法：这种方式是直接写出数据，但是并没有关闭流；
*  `end`方法：这种方式是写出最后的数据，并且写出后会关闭流；

如果我们没有调用 end，客户端将会一直等待结果，所以客户端在发送网络请求时，都会设置超时时间。在返回结果中，可以设置状态码和响应的头文件
```javascript
const server = http.createServer((req, res) => {
   res.writeHead(200, {
       "Content-Type": "text/plain;charset=utf-8"
   })
   res.write("你好")
   res.end('hello world')
})
```
Content-Type告诉客户端以什么方式解析，默认客户端接收到的是字符串。如果是`text/html;charset=utf-8`，浏览器会解析返回结果为html，如果是`text/plain;charset=utf-8`，浏览器会解析为纯文本。
```javascript
const server = http.createServer((req, res) => {
   res.writeHead(200, {
       "Content-Type": "text/html;charset=utf-8"
   })
   res.write("你好")
   res.end("<h2>Hello server</h2>")
})
```

## node中使用http请求
在node中，我们可以使用http模块来发送请求，但是需要注意的是，http模块只负责发送请求，但是不会处理响应结果，所以需要使用http模块发送请求后，还需要使用http模块来监听响应结果。
```javascript
import http from 'http';

http.get("http://127.0.0.1:8000",(res) => {
    res.on("data",(data) => {
        console.log(data.toString());
    })
})

const req = http.request({method:"POST",host:"127.0.0.1",port:8000},(res) => {
    res.on("data",(data) => {
        console.log(data.toString());
    })
})
// post 请求结束
req.end()
```

## 文件上传 
上传图片需要截取只有图片的数据，设置上传编码为二进制数据`req.setEncoding("binary")`，最后保存图片。
```javascript
import http from "http"
import qs from "querystring"
import fs from "fs"

const server = http.createServer((req, res) => {
   if (req.url === "/upload") {
    if (req.method === "POST") {
        // 图片文件必须设置为二进制
        req.setEncoding("binary")
        // 获取content-type中boundary的值
        const totalBoundary = req.headers["content-type"].split(";")[1]
        const boundary = totalBoundary.split("=")[1]
        
        const fileSize = req.headers["content-length"]
        let curSize = 0
        let body = ""
        req.on("data", (chunk) => {
            curSize += chunk.length
            res.write(`文件上传进度:${curSize/fileSize*100}`)
            body += chunk
        })
        req.on("end", () => {
            // 切割数据
            const payload = qs.parse(body,"\r\n",":")
            //获取最后的类型(image/png)
            const fielType = payload["Content-Type"].substring(1)
            //获取要截取的长度
            const position = body.indexOf(fielType) + fielType.length
            let imageData = body.substring(position)
            imageData = imageData.replace(/^\s\s*/,'')
            imageData = imageData.substring(0,imageData.indexOf('--'+boundary+'--'))

            fs.writeFile('./test.png',imageData,'binary',(err) =>{
                console.log(err);
                res.end("上传完成")
            })
        })
    }
   }
})
```