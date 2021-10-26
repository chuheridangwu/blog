# 搭建本地服务器
使用iOS搭建本地服务器，可以在局域网内共享文件，很多本地播放器或者小说软件都有类似功能,比如wifi传书或者wifi传视频、wifi传图片等等。

## 项目使用场景
* 做个无线U盘这样的App（AppStore里搜一下就有好多）
* 做个无线相册这样的App（电脑使用浏览器直接访问到手机里的照片）
* 你的App如果需要用户导入一些文件进来
* 你的App如果需要导出一些文件到用户电脑上
* WIFI 传书

## 技术选择
目前主要是使用第三方进行搭建，选择[CocoaHTTPServer](https://github.com/robbiehanson/CocoaHTTPServer) 或者 [GCDWebServer](https://github.com/swisspol/GCDWebServer), `CocoaHTTPServer`已经很久没维护了，当前主要介绍`GCDWebServer`。[点击下载Demo](https://mlean.coding.net/public/iosdemo/LocalServe/git/files)

`GCDWebServer` 主要有三个类:
* **GCDWebServer:**  负责普通的http请求，打开网址时可以直接返回html网页或者进行重定向、提交表单等功能、实现一个静态的文件目录网站
* **GCDWebUploader:**  创建一个内嵌的 UI 网页，让用户可以在浏览器里上传，下载，删除文件，以及在 应用的沙盒中创建目录文件夹。
* **GCDWebDAVServer:**  实现一个 WebDAV 服务器，让用户可以使用任意的 WebDAV 客户端，比如： Transmit (Mac)，ForkLift (Mac) 或者 CyberDuck (Mac / Windows)，来访问我们 App 的沙盒目录文件。**使用网页直接打开是不显示的。**

## GCDWebServer
`GCDWebServer`会在程序启动的时候会运行个 HTTP 服务,负责普通的http请求，打开网址时可以直接返回html网页或者进行重定向、提交表单等功能、实现一个静态的文件目录网站和动态网站。

* 请求地址返回一个欢迎页面

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    _webServe = [[GCDWebServer alloc] init];

    [webServer addDefaultHandlerForMethod:@"GET" requestClass:[GCDWebServerRequest class] processBlock:^GCDWebServerResponse * _Nullable(__kindof GCDWebServerRequest * _Nonnull request) {
        NSString *html = @"<html><body>欢迎访问 <b>hangge.com</b></body></html>";
        return [GCDWebServerDataResponse responseWithHTML:html];
    }];

    [_webServe startWithPort:12335 bonjourName:@"GCD Web Server"];
}
```

* 创建一个静态网站，可以浏览文件目录

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    _webServe = [[GCDWebServer alloc] init];
    // 添加静态网站,可以点击浏览里面各个文件和文件夹，或者对文件进行下载操作。
    [_webServe addGETHandlerForBasePath:@"/" directoryPath:NSHomeDirectory() indexFilename:nil cacheAge:3600 allowRangeRequests:true];
    [_webServe startWithPort:12335 bonjourName:@"GCD Web Server"];
}
```
## GCDWebUploader
`GCDWebUploader` 是 `GCDWebServer `的子类，它提供了一个现成的 `HTML5` 形式的文件上传下载器，自带 UI 界面，让用户可以在浏览器里上传，下载，删除文件，以及在 iOS 应用的沙盒中创建目录文件夹
```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    NSString *uploadPath = [NSString stringWithFormat:@"%@%@",NSHomeDirectory(),@"/Documents"];
    _webUploader = [[GCDWebUploader alloc] initWithUploadDirectory:uploadPath];
    [_webUploader startWithPort:8080 bonjourName:@"Web Based Uploads"];
}
```

## GCDWebDAVServer
`GCDWebDAVServer` 可以实现一个 WebDAV 服务器，让用户可以使用任意的` WebDAV` 客户端，比如： `Transmit (Mac)`，`ForkLift (Mac)` 或者 `CyberDuck (Mac / Windows)`，用来访问我们 App 的沙盒目录文件。**注意:直接使用网页打开是不显示文件的**
```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    NSString *loadPath = [NSHomeDirectory() stringByAppendingPathComponent:@
                          "Documents"];
    _webDAVServer = [[GCDWebDAVServer alloc] initWithUploadDirectory:loadPath];
    [_webDAVServer startWithPort:8080 bonjourName:@"WebDAV Server"];
}
```

## 相关网址
* [GCDWebServer使用详解](https://xiaovv.me/2018/11/30/GCDWebServer-BasicUse/)* 
* [Swift - GCDWebServer使用详解1](https://developer.apple.com/library/archive/samplecode/CocoaHTTPServer/Introduction/Intro.html#//apple_ref/doc/uid/DTS10003604-Intro-DontLinkElementID_2)