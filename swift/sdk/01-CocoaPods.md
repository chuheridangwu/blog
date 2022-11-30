# CocoaPods
1. 安装CocoaPods,在终端输入 `sudo gem install cocoapods`,如果出现`ERROR:  While executing gem ... (Errno::EPERM)`错误,更换命令`sudo gem install -n /usr/local/bin cocoapods`

命令 | 含义
------- | -------
`pod search AFNetworking` | 在Cocoapods中搜索当前库信息
`pod install` | 安装


* 指定仓库地址
```
pod 'BRPickerView', :git => 'https://github.com/91renb/BRPickerView.git'
```


* Swift使用第三方时，有些库需要证书签名。解决方案在`Podfile`文件下添加一下方法
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

## 指定workspace
当有多个workspace,对主workspace进行指定，并且对不同的 target 导入相同的动态库,项目结构如下图:
![](../imgs/sdk/ios_sdk_27.png)
```
platform :ios, '11.0'
source 'https://github.com/CocoaPods/Specs.git'

workspace '../Mutable.xcworkspace'
target "Demoxxx" do
  use_frameworks!
  pod 'AFNetworking'
end

target "Demo" do
  project '../Demo/Demo.xcodeproj'
  use_frameworks!
  pod 'AFNetworking'
end
```

## CocoaPods源码和`Podfile`文件调试
1. 创建一个新的iOS项目，创建一个Podfile文件
```
  platform :ios, '11.0'
  source 'https://github.com/CocoaPods/Specs.git'
  target "DemoX" do
    use_frameworks!
    pod 'AFNetworking'
  end
```

2. [下载CocoaPods源码](https://github.com/CocoaPods/CocoaPods),将`CocoaPods`源码和iOS项目放到同一目录下，并在该目录下新建一个`Gemfile`文件,并运行`bundle install`。`Gemfile`文件内容
```
  source 'https://rubygems.org'
  # 指定本地CocoaPods路径
  gem 'cocoapods', path: './CocoaPods'
```

3. 创建 `launch.json` 文件，调试 rb 文件时可以选择是否创建 `launch.json`文件，修改部分内容
```json
  {
      // 悬停以查看现有属性的描述。欲了解更多信息，请访问: https://marketplace.visualstudio.com/items?itemName=KoichiSasada.vscode-rdbg
      "version": "0.2.0",
      "configurations": [
          {
              "type": "rdbg",
              "name": "Debug current file with rdbg",
              "request": "launch",
              // 指定使用的pod解释文件。
              "script": "${workspaceRoot}/CocoaPods/bin/pod",
              // pod 命令执行的路径。会在该路径下寻找Podfile文件。
              "cwd": "${workspaceFolder}/DemoX",
              // 执行的命令参数，在这里执行的是 pod install
              "args": ["install"],
              "askParameters": true
          },
          {
              "type": "rdbg",
              "name": "Attach with rdbg",
              "request": "attach"
          }
      ]
  }
```

4. 在`CocoaPods -> lib -> cocoapods -> command -> install.rb`文件中打断点,进行调试即可

5. iOS项目中的`Podfile`文件内容使用的也是ruby语法,也可以在`pod xxx`中打断点进行调试。

## 参考文章
https://www.jianshu.com/p/08e5f06dd31d
https://www.cnblogs.com/sundaysme/p/13698463.html  检查pod版本及更新pod
https://blog.csdn.net/qq_22625011/article/details/79930426  podfile里指定版本号，指定区间版本号，指定最小版本号，指定最大版本号
https://www.jianshu.com/p/d6a592d6fced  使用私有Cocoapods仓库 中高级用法

* [ruby官网](https://rubygems.org/gems/cocoapods) 
* [CocoaPods官网](https://cocoapods.org/) 
* [把玩CocoaPods post_install 和 pre_install](https://www.jianshu.com/p/d8eb397b835e?from=timeline&isappinstalled=0)