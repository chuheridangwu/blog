# curl 的用法
内容来自 [阮一峰的curl用法指南](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html),他写的文章都挺好的，文章格式看着也是赏心悦目，但是为了方便随时查看还是copy一份到自己的文档上来了，顺便也学习一下做个记录。英文好的话可以直接参考[Curl Cookbook](https://catonmat.net/cookbooks/curl)。

`curl` 是一个命令行工具，用来请求 `Web` 服务器。不带有任何参数时，curl 就是发出 GET 请求。例如`curl https://www.example.com`,表示向www.example.com发出 GET 请求，服务器返回的内容会在命令行输出。

## curl参数表格
参数 | 参数含义 | 举例
------- | ------- | -------
`-A` | 指定客户端的用户代理标头，即`User-Agent` | `curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com`
`-b` | 参数用来向服务器发送 `Cookie` | `curl -b 'foo=bar' https://google.com`
`-c` | 参数将服务器设置的 `Cookie` 写入一个文件 | `curl -c cookies.txt https://www.google.com`
`-d` | 参数用于发送 `POST` 请求的数据体  |   `curl -d'login=emma＆password=123' https://google.com/login`
`--data-urlencode` | 参数等同于-d，区别在于会自动将发送的数据进行 URL 编码 | `curl --data-urlencode 'comment=hello world' https://google.com/login`
`-e` | 参数用来设置 HTTP 的标头`Referer`，表示请求的来源 | `curl -e 'https://google.com?q=example' https://www.example.com`
`-F` | 参数用来向服务器上传二进制文件 | `curl -F 'file=@photo.png' https://google.com/profile`
`-G` | 参数用来构造 URL 的查询字符串 | `curl -G -d 'q=kitties' -d 'count=20' https://google.com/search`
`-H` | 参数添加 HTTP 请求的标头,就是Header | `curl -H 'Accept-Language: en-US' https://google.com`
`-i` | 参数打印出服务器回应的 HTTP 标头 | `curl -I https://www.baidu.com `
`-k` | 参数指定跳过 SSL 检测 | `curl -k https://www.example.com`
`-L` | 参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向 | `curl -L -d 'tweet=hi' https://api.twitter.com/tweet`
`--limit-rate` | 用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境 | `curl --limit-rate 200k https://google.com`
`-o` | 参数将服务器的回应保存成文件，等同于wget命令 | `curl -o example.html https://www.example.com`
`-O` | 参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名 | `curl -O https://www.example.com/foo/bar.html`
`-s` | 参数将不输出错误和进度信息 | `curl -s https://www.example.com`
`-S` | 参数指定只输出错误信息，通常与 `-o` 一起使用 | `curl -s -o /dev/null https://google.com`
`-u` | 参数用来设置服务器认证的用户名和密码 | `curl -u 'bob:12345' https://google.com/login`
`-v`/`--trace` | `参数输出通信的整个过程，用于调试` | `curl -v https://www.example.com`
`-x` | 参数指定 HTTP 请求的代理 | `curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com`
`-X` | 参数指定 HTTP 请求的方法,例如POST/GET/PUT/HEAD/DELETE/TRACE | `curl -X POST https://www.example.com`

## -A 
`-A` 参数指定客户端的用户代理标头，即`User-Agent`。curl 的默认用户代理字符串是`curl/[version]`。
```
// 将User-Agent改成 Chrome 浏览器。
$ curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com

// 移除User-Agent标头
$ curl -A '' https://google.com
上面命令会。

// 也可以通过-H参数直接指定标头，更改User-Agent。
$ curl -H 'User-Agent: php/1.0' https://google.com
```

## -b
-b 参数用来向服务器发送 Cookie。
```
// 生成一个标头Cookie: foo=bar，向服务器发送一个名为foo、值为bar的 Cookie
$ curl -b 'foo=bar' https://google.com

// 发送多个 Cookie，使用;号
$ curl -b 'foo1=bar;foo2=bar2' https://google.com

// 读取本地文件cookies.txt，里面是服务器设置的 Cookie（参见-c参数），将其发送到服务器。
$ curl -b cookies.txt https://www.google.com
```

## -c
-c 参数将服务器设置的 Cookie 写入一个文件。

```
// 将服务器的 HTTP 回应所设置 Cookie 写入文本文件cookies.txt。
$ curl -c cookies.txt https://www.google.com
```

## -d
-d 参数用于发送 POST 请求的数据体。

```
// 使用-d参数以后，HTTP 请求会自动加上标头Content-Type : application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此可以省略-X POST。
$ curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
$ curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login

// -d参数可以读取本地文本文件的数据，向服务器发送。 例如下文中:读取data.txt文件的内容，作为数据体向服务器发送
$ curl -d '@data.txt' https://google.com/login
```

## --data-urlencode
--data-urlencode 参数等同于 -d，发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码。
```
// 发送的数据hello world之间有一个空格，需要进行 URL 编码。
$ curl --data-urlencode 'comment=hello world' https://google.com/login
```

## -e
-e 参数用来设置 HTTP 的标头Referer，表示请求的来源。
```
// 将Referer标头设为https://google.com?q=example。
curl -e 'https://google.com?q=example' https://www.example.com

// -H 参数可以通过直接添加标头Referer，达到同样效果。
curl -H 'Referer: https://google.com?q=example' https://www.example.com
```

## -F
-F 参数用来向服务器上传二进制文件。可以使用`type`指定MIME类型，使用`filename`指定文件名。

```
// 将给 HTTP 请求加上标头Content-Type: multipart/form-data，然后将文件photo.png作为file字段上传。
$ curl -F 'file=@photo.png' https://google.com/profile

// -F参数可以指定 MIME 类型。指定 MIME 类型为image/png，否则 curl 会把 MIME 类型设为application/octet-stream。
$ curl -F 'file=@photo.png;type=image/png' https://google.com/profile

// -F参数也可以指定文件名。原始文件名为photo.png，但是服务器接收到的文件名为me.png。
$ curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
```
## -G
-G 参数用来构造 URL 的查询字符串。如果需要给 URL 编码，需要结合`--data--urlencode`参数

```
// 发出一个 GET 请求，实际请求的 URL 为https://google.com/search?q=kitties&count=20。如果省略--G，会发出一个 POST 请求。
$ curl -G -d 'q=kitties' -d 'count=20' https://google.com/search

// 如果数据需要 URL 编码，可以结合--data--urlencode参数。
$ curl -G --data-urlencode 'comment=hello world' https://www.example.com
```

## -H
-H 参数添加 HTTP 请求的标头。

```
// 添加 HTTP 标头Accept-Language: en-US。
$ curl -H 'Accept-Language: en-US' https://google.com

// 添加两个 HTTP 标头。
$ curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com

// 添加 HTTP 请求的标头是Content-Type: application/json，然后用-d参数发送 JSON 数据。
$ curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login
```
## -i
-i 参数打印出服务器回应的 HTTP 标头。

```
$ curl -i https://www.example.com
上面命令收到服务器回应后，先输出服务器回应的标头，然后空一行，再输出网页的源码。
```

## -I
-I 参数向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来。`--head` 参数等同于 `-I`。

```
// 输出服务器对 HEAD 请求的回应。
$ curl -I https://www.example.com

// --head参数等同于-I。
$ curl --head https://www.example.com
```

## -k
-k 参数指定跳过 SSL 检测。

```
// 不检查服务器的 SSL 证书是否正确
$ curl -k https://www.example.com
```

## -L
-L 参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向。`$ curl -L -d 'tweet=hi' https://api.twitter.com/tweet`

## --limit-rate
--limit-rate 用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境。
```
// 将带宽限制在每秒 200K 字节。
$ curl --limit-rate 200k https://google.com
```

## -o
-o 参数将服务器的回应保存成文件，等同于wget命令。

```
// 将www.example.com保存成example.html
$ curl -o example.html https://www.example.com
```

## -O
-O 参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。

```
// 将服务器回应保存成文件，文件名为bar.html。
$ curl -O https://www.example.com/foo/bar.html
```

## -s
-s 参数将不输出错误和进度信息。

```
// 一旦发生错误，不会显示错误信息。不发生错误的话，会正常显示运行结果。
$ curl -s https://www.example.com

// 如果想让 curl 不产生任何输出，可以使用下面的命令。
$ curl -s -o /dev/null https://google.com
```
## -S
-S 参数指定只输出错误信息，通常与 `-O`一起使用。

```
// 没有任何输出，除非发生错误。
$ curl -s -o /dev/null https://google.com
```

## -u
-u 参数用来设置服务器认证的用户名和密码。
```
// 设置用户名为bob，密码为12345，然后将其转为 HTTP 标头Authorization: Basic Ym9iOjEyMzQ1。
$ curl -u 'bob:12345' https://google.com/login

// curl  能够识别 URL 里面的用户名和密码，将其转为上个例子里面的 HTTP 标头。
$ curl https://bob:12345@google.com/login

// 只设置了用户名，执行后，curl 会提示用户输入密码。
$ curl -u 'bob' https://google.com/login
```
## -v
-v 参数输出通信的整个过程，用于调试。 `--trace`参数也可以用于调试。

```
// 输出通信过程
$ curl -v https://www.example.com

// --trace参数也可以用于调试，还会输出原始的二进制数据。
$ curl --trace - https://www.example.com
```
## -x
-x 参数指定 HTTP 请求的代理。

```
// 指定 HTTP 请求通过myproxy.com:8080的 socks5 代理发出。如果没有指定代理协议，默认为 HTTP。
$ curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com

// 对请求的代理使用 HTTP 协议。
$ curl -x james:cats@myproxy.com:8080 https://www.example.com
```

## -X
-X 参数指定 HTTP 请求的方法。

```
// 对https://www.example.com发出 POST 请求。
$ curl -X POST https://www.example.com
```

## 注意事项
1. 在 shell 中使用 curl 方法时，curl方法中如果引用了 shell 变量，需要使用双引号`""`包住变量。