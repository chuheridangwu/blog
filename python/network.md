# 网络
创建一个简单的服务端和客户端，来收发数据

* 服务端示例

```python
# server.py

import socket
import threading


def process_connection(client):
    """处理客户端连接"""
    # 接收客户端发来的数据
    data = b''
    while True:
        chunk = client.recv(1024)
        data += chunk
        if len(chunk) < 1024:
            break

    # 打印从客户端接收的数据
    print(f'data: {data}')
    # 给客户端发送响应数据
    client.sendall(b'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello World</h1>')

    # 关闭客户端连接对象
    client.close()


def main():
    # 创建 socket 对象
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 允许端口复用
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # 绑定 IP 和端口
    sock.bind(('127.0.0.1', 8000))
    # 开始监听
    sock.listen(5)

    while True:
        # 等待客户端请求
        client, addr = sock.accept()
        print(f'client type: {type(client)}\naddr: {addr}')

        # 创建新的线程来处理客户端连接
        t = threading.Thread(target=process_connection, args=(client,))
        t.start()


if __name__ == '__main__':
    main()
```

* 客户端示例

```python
# client.py

import socket

# 创建 socket 对象
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 指定服务器 IP 和端口，进行连接
sock.connect(('127.0.0.1', 8000))
# 向 URL "/" 发送 GET 请求
sock.send(b'GET / HTTP/1.1\r\nHost: 127.0.0.1:8000\r\n\r\n')

# 接收服务端响应数据
data = b''
while True:
    chunk = sock.recv(1024)
    data += chunk
    if len(chunk) < 1024:
        break
# 打印响应数据
print(data)

# 关闭连接
sock.close()
```

接下来修改我们上面实现的极简 HTTP 客户端程序，使其能够支持` response.status_code、response.headers` 和 `response.text`功能。

```python
# client.py

import socket
from urllib.parse import urlparse

class HTTPClient(object):
    """HTTP 客户端"""

    def __init__(self):
        # 创建 socket 对象
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 初始化数据
        self.status_code = 200
        self.headers = {}
        self.text = ''

    def __del__(self):
        # 关闭连接
        self.sock.close()

    def connect(self, ip, port):
        """建立连接"""
        self.sock.connect((ip, port))

    def request(self, method, url):
        """请求"""
        # URL 解析
        parse_result = urlparse(url)
        ip = parse_result.hostname
        port = parse_result.port or 80
        host = parse_result.netloc
        path = parse_result.path
        # 建立连接
        self.connect(ip, port)
        # 构造请求数据
        send_data = f'{method} {path} HTTP/1.1\r\nHost: {host}\r\n\r\n'.encode('utf-8')
        # 发送请求
        self.sock.send(send_data)
        # 接收服务端响应的数据
        data = self.recv_data()
        # 解析响应数据
        self.parse_data(data)

    def recv_data(self):
        """接收数据"""
        data = b''
        while True:
            chunk = self.sock.recv(1024)
            data += chunk
            if len(chunk) < 1024:
                break
        return data.decode('utf-8')

    def parse_data(self, data):
        """解析数据"""
        header, self.text = data.split('\r\n\r\n', 1)
        status_line, header = header.split('\r\n', 1)
        for item in header.split('\r\n'):
            k, v = item.split(': ')
            self.headers[k] = v
        self.status_code = status_line.split(' ')[1]


if __name__ == '__main__':
    client = HTTPClient()
    client.request('GET', 'http://127.0.0.1:8000/')
    print(client.status_code)
    print('--------------------')
    print(client.headers)
    print('--------------------')
    print(client.text)
```

## Flask

了解了WSGI框架，我们发现：其实一个Web App，就是写一个WSGI的处理函数，针对每个HTTP请求进行响应。

但是如何处理HTTP请求不是问题，问题是如何处理100个不同的URL。

每一个URL可以对应GET和POST请求，当然还有PUT、DELETE等请求，但是我们通常只考虑最常见的GET和POST请求。

一个最简单的想法是从environ变量里取出HTTP请求的信息，然后逐个判断：

```python
def application(environ, start_response):
    method = environ['REQUEST_METHOD']
    path = environ['PATH_INFO']
    if method=='GET' and path=='/':
        return handle_home(environ, start_response)
    if method=='POST' and path='/signin':
        return handle_signin(environ, start_response)
    ...
```
只是这么写下去代码是肯定没法维护了。

代码这么写没法维护的原因是因为WSGI提供的接口虽然比HTTP接口高级了不少，但和Web App的处理逻辑比，还是比较低级，我们需要在WSGI接口之上能进一步抽象，让我们专注于用一个函数处理一个URL，至于URL到函数的映射，就交给Web框架来做。

由于用Python开发一个Web框架十分容易，所以Python有上百个开源的Web框架。这里我们先不讨论各种Web框架的优缺点，直接选择一个比较流行的Web框架——Flask来使用。

用Flask编写Web App比WSGI接口简单,我们先用pip安装Flask：

$ pip3 install flask
然后写一个app.py，处理3个URL，分别是：

```
GET /：首页，返回Home；
GET /signin：登录页，显示登录表单；
POST /signin：处理登录表单，显示登录结果。
```

>注意噢，同一个URL/signin分别有GET和POST两种请求，映射到两个处理函数中。

Flask通过Python的装饰器在内部自动地把URL和函数给关联起来，所以，我们写出来的代码就像这样：

```python
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return '<h1>Home</h1>'

@app.route('/signin', methods=['GET'])
def signin_form():
    return '''<form action="/signin" method="post">
              <p><input name="username"></p>
              <p><input name="password" type="password"></p>
              <p><button type="submit">Sign In</button></p>
              </form>'''

@app.route('/signin', methods=['POST'])
def signin():
    # 需要从request对象读取表单内容：
    if request.form['username']=='admin' and request.form['password']=='password':
        return '<h3>Hello, admin!</h3>'
    return '<h3>Bad username or password.</h3>'

if __name__ == '__main__':
    app.run()
```

运行python app.py，Flask自带的Server在端口5000上监听：

$ python app.py 
 * Running on http://127.0.0.1:5000/
打开浏览器，输入首页地址http://localhost:5000/：

flask-home

首页显示正确！

再在浏览器地址栏输入http://localhost:5000/signin，会显示登录表单：

flask-signin-form

输入预设的用户名admin和口令password，登录成功：

flask-signin-ok

输入其他错误的用户名和口令，登录失败：

flask-signin-failed

实际的Web App应该拿到用户名和口令后，去数据库查询再比对，来判断用户是否能登录成功。

除了Flask，常见的Python Web框架还有：
```
Django：全能型Web框架；
web.py：一个小巧的Web框架；
Bottle：和Flask类似的Web框架；
Tornado：Facebook的开源异步Web框架。
```
当然了，因为开发Python的Web框架也不是什么难事，我们后面也会讲到开发Web框架的内容。

小结
有了Web框架，我们在编写Web应用时，注意力就从WSGI处理函数转移到URL+对应的处理函数，这样，编写Web App就更加简单了。

在编写URL处理函数时，除了配置URL外，从HTTP请求拿到用户数据也是非常重要的。Web框架都提供了自己的API来实现这些功能。Flask通过request.form['name']来获取表单的内容。

## 相关网址
* [用 Python 实现一个简易版 HTTP 客户端](https://segmentfault.com/a/1190000039167462)