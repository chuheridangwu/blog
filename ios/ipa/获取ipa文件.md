# 获取IPA文件
自从 iTunes 中没有苹果商店之后，获取应用的ipa相对就比较麻烦，之前可以通过降级iTunes来获取，升级苹果系统之后这种方法也不奏效。现在利用 `Apple Configurator2` 应用来进行获取。
Apple Configurator2 在App Store可以直接搜到，安装要求，**系统版本要 >= 10.14.1才能安装**,如果您的系统版本低于10.14，需要升级系统。

## IPA获取流程
1. 登录账号
![AppleConfigurator2_1](../imgs/ios_img_28.png)

2. 选择要安装的app
    手机连接电脑 > 选中对应的手机 > 点击添加  > 选应用 > 选择要安装的app
    
    **注意:**
             
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