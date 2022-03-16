# Windows/Linux 生成iOS证书及p12文件
苹果现在对马甲包的查找力度比较大，生成证书的文件和上传IPA的IP地址可能都会有记录，为了防止被关联期间，可以使用其他系统生成iOS相关证书文件。

其他系统生成证书需要使用`openssl`生成对应的请求文件，在苹果下载对应的证书之后，从证书中导出P12文件供其他电脑使用。分为四步:
```markdwon
* 生成csr文件（通过OpenSSL命令）
* 生成mobileprovision文件（通过Apple开发者后台）
* 生成cer文件（通过Apple开发者后台）
* 生成P12文件（通过OpenSSL命令）
```

1. 生成csr文件
```shell
# 用到 Windows 或者 Linux 下的 openssl 命令，请自行安装。
openssl genrsa -out ios.key 2048
openssl req -new -sha256 -key ios.key -out ios.csr
```

2. 生成mobileprovision文件: 
```markdown
登录开发者后台，提交信息（需要用到前面生成的csr文件），下载。
https://developer.apple.com/account/ios/profile/
```
3. 生成cer文件
```markdown
在开发者后台，提交信息（需要用到前面生成的csr文件），下载。
https://developer.apple.com/account/ios/certificate/
```
4. 生成P12文件
```shell
   # 需要用到第一步生成的 ios.key 文件，以及 Apple 生成的 ios_distribution.cer 和 ios_development.cer 文件。
   openssl x509 -in ios_distribution.cer -inform DER -outform PEM -out ios_distribution.pem
   openssl pkcs12 -export -inkey ios.key -in ios_distribution.pem -out ios_distribution.p12

   openssl x509 -in ios_development.cer -inform DER -outform PEM -out ios_development.pem
   openssl pkcs12 -export -inkey ios.key -in ios_development.pem -out ios_development.p12
```

* [Windows/Linux 生成iOS证书及p12文件](https://www.cnblogs.com/liaozt/p/6202484.html)
* [Windows系统下生成IOS证书](https://www.cnblogs.com/zhao365845726/p/9310217.html)
* [网页制作证书](https://app.121xuexi.com/)