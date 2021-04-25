# IPA重签名
IPA重签名是将IPA文件使用自己的证书进行重新签名，可以安装到自己的测试设备上，或者使用企业证书进行重签名进行分发。GitHub上的重签名工具[点击下载](https://github.com/DanTheMan827/ios-app-signer/tags)

重签名的准备工作:
1. 需要一个有效的证书和对应的描述文件(xxx.mobileprovision文件)，注意：**必须将描述文件命名为`embedded.mobileprovision`,否则即使签名成功也将不能安装ipa**
2. 需要从描述文件中导出`entitlements.plist`文件

## 获取证书名称
使用`security find-identity -p codesigning -v ` 命令列出所有的开发者证书，选择重签名的证书名称。开发者证书例如`Apple Distribution: xxx xxx (55RY2863NM)`

## 获取 entitlements.plist 文件
`entitlements.plist`文件可以从`embedded.mobileprovision`描述文件中获取。
1. 使用 `security cms -D -i` 命令将  `embedded.mobileprovision`文件生成一个plist文件
```shell
security cms -D -i embedded.mobileprovision > embedded.plist
```

2. 从生成的plist文件中导出key为`Entitlements`的部分，命名为`entitlements.plist`文件，这是我们打包时需要的。
```shell
/usr/libexec/PlistBuddy -x -c 'Print:Entitlements'  embedded.plist > entitlements.plist
```

## 对IPA进行重签名
准备工作完成后，开始对IPA文件进行重签名，签名分5步:首先对原有的ipa文件进行解压,删除原有的签名文件`_CodeSignature`，然后替换原来的描述文件，使用`codesign -f -s`命令进行重签名，最后进行打包。

1. 解压ipa包
```shell
unzip xxx.ipa 
```

2. 删除签名文件
```shell
rm -rf Payload/xxx.app/_CodeSignature/
```

3. 替换配置文件
```shell
cp embedded.mobileprovision Payload/xxx.app/
```

4. 签名
```shell
codesign -f -s "你的证书的名称" --entitlements entitlements.plist Payload/xxx.app
tip：证书的名称你可以通过mac自带的keychain Access钥匙串访问程序查看电脑上的证书。
```

5. 打包
```shell
zip -r resign_xxx.ipa Payload/
```

## 使用shell脚本进行重签名
将`embedded.mobileprovision`、`entitlements.plist`、ipa、shell文件放到同一个目录下，编写`resign.sh`脚本进行打包。
```shell
#!/bin/sh

if ! ([ -f "$1" ]); then
echo ----- \"${1}\"IPA文件不存在
exit
fi

ipaName=${1%.ipa}

if [ "$ipaName" = "$1" ]; then
echo ----- \"${1}\"error 不是ipa文件
exit
fi

## 证书名称
signName="iPhone Distribution: Hirich xxx Company xxx"

## step 1 解压ipa
unzip ${ipaName}.ipa

## step 2 删除旧签名文件
rm -rf Payload/*.app/_CodeSignature/

## step 3 拷贝证书配置和权限文件
cp embedded.mobileprovision Payload/*.app/embedded.mobileprovision

## step 4 重签名,这里要用到entitlements.plist文件，签名不对会安装失败
/usr/bin/codesign -f -s "$signName" --entitlements entitlements.plist Payload/*.app/

## step 5 打包
echo --- "开始打包"
zip -r ${ipaName}_resign.ipa Payload/
rm -rf Payload/
rm -rf __MACOSX/
```

## PlistBuddy
PlistBuddy 是 Mac电脑自带的操作 plist 文件的工具,文件路径`/usr/libexec/PlistBuddy`,使用方式:` /usr/libexec/PlistBuddy -c "Set key value" plist文件路径`

假设我们有一个plist文件如下,对其进行添加、修改、删除操作,每一个节点使用`:`号进行操作
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Platform</key>
	<dict>
		<key>item</key>
		<string>iOS</string>
	</dict>
	<key>Version</key>
	<string>1.0</string>
</dict>
</plist>
```

1. 添加
```shell
#  在 Platform下进行添加item1
/usr/libexec/PlistBuddy -c 'Add :Platform:item1 string "android"' ~/Desktop/example.plist
#  在根路径下添加name键
/usr/libexec/PlistBuddy -c 'Add :name string "example"' ~/Desktop/example.plist
```

2. 打印plist文件
```shell
# 打印plist文件
/usr/libexec/PlistBuddy -c "Print" ~/Desktop/example.plist
# 打印plist文件下的 Platform
/usr/libexec/PlistBuddy -c "Print:Platform" ~/Desktop/example.plist
# 打印plist文件 并且根据 Platform 生成新的plist文件,注意多了-x -c
/usr/libexec/PlistBuddy -x -c 'Print:Platform' ~/Desktop/example.plist > ~/Desktop/example1.plist
```

3. 修改
```shell
# 修改Version为1.1
/usr/libexec/PlistBuddy -c 'Set :Version "1.1"' ~/Desktop/example.plist
```

4. 删除
```shell
/usr/libexec/PlistBuddy -c 'Delete :Version' ~/Desktop/example.plist
```

5. 合并两个plist文件
```shell
# 需要先切换到对应的目录下
/usr/libexec/PlistBuddy  -c 'Merge a.plist' example.plist 
```

## 参考网址
[iOS软件包ipa重签名详解](https://www.jianshu.com/p/609109d41628)
[ipa重签名](https://segmentfault.com/a/1190000023388431)
[PlistBuddy](https://www.jianshu.com/p/e0d254ce9340)
