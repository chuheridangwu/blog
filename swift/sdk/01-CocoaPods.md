# CocoaPods
1. 安装CocoaPods,在终端输入 `sudo gem install cocoapods`,如果出现`ERROR:  While executing gem ... (Errno::EPERM)`错误,更换命令`sudo gem install -n /usr/local/bin cocoapods`
2. 查看某个库是否支持 CocoaPods,使用`pod search xxx`进行搜索


```
pod 'BRPickerView', :git => 'https://github.com/91renb/BRPickerView.git'
```


## 常用指令
pod search AFNetworking  搜索有没有库
pod install   安装




Swift使用第三方时，有些库需要证书签名。解决方案在`Podfile`文件下添加一下方法
```swift
platform :ios, '11.0'
source 'https://github.com/CocoaPods/Specs.git'
target 'xxx' do
end
post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.respond_to?(:product_type) and target.product_type == "com.apple.product-type.bundle"
      target.build_configurations.each do |config|
        config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
end
```


https://www.jianshu.com/p/08e5f06dd31d

https://www.cnblogs.com/sundaysme/p/13698463.html  检查pod版本及更新pod

https://blog.csdn.net/qq_22625011/article/details/79930426  podfile里指定版本号，指定区间版本号，指定最小版本号，指定最大版本号

https://www.jianshu.com/p/d6a592d6fced  使用私有Cocoapods仓库 中高级用法


https://rubygems.org/gems/cocoapods ruby官网
https://cocoapods.org/  cocoapods官网