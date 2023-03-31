# 获取IPA文件
自从 iTunes 中没有苹果商店之后，获取应用的ipa相对就比较麻烦，之前可以通过降级iTunes来获取，升级苹果系统之后这种方法也不奏效。目前可以使用`Apple Configurator` 和 `ipatool`进行获取。在Mac13.0系统中，测试`Apple Configurator`也获取不到IPA了。

## ipatool
1. 安装ipatool
   ```shell
   brew tap majd/repo
   brew install ipatool
   ```
2. 使用`ipatool auth login -e 苹果账号 -p 苹果密码`登录苹果账号,如果有双重验证等下会提示你输入验证码
3. 使用`ipatool search 抖音 -l 1` 搜索抖音,只显示1个搜索结果，不加-l参数默认是5个
4. 使用`ipatool download -b com.ss.xxx -o ~/Desktop/ `下载IPA到桌面,不指定下载路径默认会下载到安装位置。

ipatool默认使用方式` ipatool [command]`，使用`ipatool -h`可以查看帮助，如果不知道某个参数的作用，使用`ipatool auth -h`继续查看指令含义

>如果出现`ERR error="failed to download file: license is required" success=false`错误，需要在 iOS 设备上下载该应用程序以获得它的许可证，然后才能使用`ipatool`

## Apple Configurator
现在利用 `Apple Configurator2` 应用来进行获取。
Apple Configurator2 在App Store可以直接搜到，安装要求，**系统版本要 >= 10.14.1才能安装**,如果您的系统版本低于10.14，需要升级系统。

### IPA获取流程
1. 登录账号
![AppleConfigurator2_1](../imgs/ios_img_28.png)

2. 选择要安装的app,手机连接电脑 > 选中对应的手机 > 点击添加  > 选应用 > 选择要安装的app。
    
    * 如果手机没有当前的应用，等到app下载安装完成的时候ipa就会消失
    * 如果手机已经安装了当前应用，会提示你该应用已经存在，是否替换。这个时候不要点击任何按钮，到第三步对应的路径去找ipa即可![AppleConfigurator2_2](../imgs/ios_img_29.png)
     
3. 根据路径进入对应的文件，获取到ipa
使用`command + shift + g`打开文件搜索框，输入路径
`~/Library/Group Containers/K36BKF7T3D.group.com.apple.configurator/Library/Caches/Assets/TemporaryItems/MobileApps/`

## 如何获取里面的资源文件
找到对应的ipa之后，修改后缀名为zip进行解压，解压后找到里面的资源包，右击 > 显示包内容。如果想要获取图片资源可以使用[iOS-Images-Extractor](https://github.com/devcxm/iOS-Images-Extractor)或者[AssetsExtractor](https://github.com/pcjbird/AssetsExtractor)


## IPA的链接
假设 appid 是1387371333，那么它们对应的下载地址为:
* Testflight中的测试地址：https://beta.itunes.apple.com/v1/app/1387371333，
* AppStore中的下载地址：https://itunes.apple.com/app/id1387371333