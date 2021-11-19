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

## 相关网址
* [用 Python 实现一个简易版 HTTP 客户端](https://segmentfault.com/a/1190000039167462)