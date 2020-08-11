# 记录使用中的其他技巧
## 查看网页原码
有些网址不允许右键点击查看原码，使用`view-source:+网址`就可以直接查看原码

## python爬取有些图片的地址打开显示无效
是因为使用了缓存校验`referer`,在请求图片的时候需要在 header 头中添加 referer 网址，比如妹子图的网址
```kotlin
GlideUrl glideUrl = new GlideUrl("https://i.mmzztt.com/thumb/2018/07/141730_236.jpg", new LazyHeaders.Builder()
         .addHeader("referer", "https://www.mzitu.com/")
         .build());
 Glide.with(this).load(glideUrl).into(testImg);
```

## github设置代理
## 分辨需要设置的代理

- HTTP 形式：
   > git clone https://github.com/owner/git.git
- SSH 形式：
   > git clone git@github.com:owner/git.git

## 一、HTTP 形式
### 走 HTTP 代理

```bash
git config --global http.proxy "http://127.0.0.1:8080"
git config --global https.proxy "http://127.0.0.1:8080"
```

### 走 socks5 代理（如 Shadowsocks）

```bash
git config --global http.proxy "socks5://127.0.0.1:1080"
git config --global https.proxy "socks5://127.0.0.1:1080"
```

### 取消设置

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 二、SSH 形式

修改 `~/.ssh/config` 文件（不存在则新建）：

```
# 必须是 github.com
Host github.com
   HostName github.com
   User git
   # 走 HTTP 代理
   # ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=8080
   # 走 socks5 代理（如 Shadowsocks）
   # ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
```
拷贝网址主要用来备份：https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1



## 编程上的经验
多想想永远比一直无脑调试要好
2020-7-17日，调试Notifation server extension的时候出现一个问题，断点的地方一直不能进入，一直不断的运行，发谷歌测试推送，但是断点一直没有进入，最后发现是因为target对应版本的问题，手机系统版本是iOS13.2，支持的版本是iOS13.5，一下午的时间就这样浪费在毫无意义的推送上面去了。
在面对自己不理解或者认为很奇怪的错误时，尽可能的先停下来，不要不断的测试已经验证过的信息，要找一些别的角度来验证自己的想法，不要陷在思维怪圈里面。