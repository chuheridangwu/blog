# 上架准备工作
上架一个新的APP时，需要以下的资源
````markdown
 1、APP名称
 2、APP关键词
 3、隐私政策网址  (可以是简书、知乎、CSDN等网址)
 4、技术支持网址  (可以是简书、知乎、CSDN等网址)
 5、APP描述
 6、APP Store 预览图
   ```markdwon
   * 6.1   6.5英寸iPhone 1284 x 2778（iPhone 13 Pro Max、iPhone 12 Pro Max、iPhone 11 Pro Max，iPhone 11、iPhone XS Max、iPhone XR） 
   * 6.2   5.8英寸iPhone 1170 x 2532（iPhone 13 Pro、iPhone 13、iPhone 13 mini、iPhone 12 Pro、iPhone 12、iPhone 12 mini、iPhone 11 Pro、iPhone XS、iPhone X）
   * 6.3   5.5英寸iPhone 1242 x 2208（iPhone 8 Plus、iPhone 7 Plus、iPhone 6s Plus）
   * 6.4   4.7英寸iPhone 750 x 1334（iPhone SE（第 2 代）、iPhone 8、iPhone 7、iPhone 6s、iPhone 6）
   * 6.5   12.9英寸iPad 2732 x 2048（iPad Pro（第 4 代、第 3 代、（第 2 代）））
   ```
 7、SKU（产品标识：创建APP时需要）
 8、版权号（有则提供，没有可以先用公司的名称，后面可以随时改，商店会更新）
 9、宣传文本
 10、副标题
 11、审核信息（测试账号、APP使用场景描述、演示视频等等）
````

## logo需要的尺寸
开发者后台商店图标的logo尺寸为1024，必须是无透明通道的图片，图片格式可以改成`jpg`格式
```
20*20
29*29
40*40
58*58
60*60
76*76
80*80
120*120
152*152
167*167
180*180
1024*1024
```

## 启动页尺寸
启动图LaunchImage尺寸可以使用`Launch Screen.storyboard`，这样就不用搞这么多的尺寸图，如果需要自己做的话，需要适配以下尺寸。

```markdown
iPhone XsMax   1242*2688
iPhone Xr      828*1792
iPhone X/Xs    1125*2436
Retina HD 5.5  1242*2208
Retina HD 4.7  750*1334
iPhone         640*960
iPhone         320*480
Retina 4       640*1136

iPad Pro 11    1668*2388
iPad Pro 10.5  1668*2224
iPad Pro 12    2048*2732
iPad           768*1024
iPad           1536*2048
```

开发者账号上传应用的的更新信息通过官网进行查看。[点击查看苹果官网](https://help.apple.com/app-store-connect/#/dev4e413fcb8)

iOS 13后，Apple 要求使用LaunchScreen，启动页的这些尺寸用不到了。苹果在iOS13之后支持APP内多图标切换，如果遇到Icon确定不下来的，可以让设计多来几套图，让用户自己选择APP Icon。[点击查看APP内更换Logo的方式](https://juejin.cn/post/7049622522240729096)

## 关于马甲
马甲包主要在于开发者账号的证书下载和上传。通常使用Window电脑进行生成p12文件和上传IPA，不过为了保险起见，最好自己搞一套。网上也有可以生成p12文件和上传IPA的网址，不知道有多少开发者的账号折在这上面了。


相关网址:
```markdown
1. https://www.jianshu.com/p/8181fa0cf2ec    windows上传ipa工具
2. https://www.yunedit.com/  香蕉云编
3. https://www.yunedit.com/xueyuan/jx/zuanyongpwd  苹果开发者专用密码怎么设置
4. https://www.jianshu.com/p/114ba69acee0   马甲包4.3或other
```