# 自动操作 Automator
苹果电脑有一个脚本工具 Automator，可以处理一些重复任务。也可以通过Automator执行shell，比如我目前是想建立一个脚本实现自动打包功能。

1. 首先使用 shell 写一个自动打包工具,在 shell 中，通过 read 获取用户输入的项目名称，创建对应的文件夹。

```shell
projectPath="/Users/xxx/Desktop/wecash"
ipaPath="/Users/xxx/Desktop/ipa"

echo "请出入包名:"
read appName

cd $projectPath

xcodebuild clean

echo "清除项目成功，开始打包"

xcodebuild archive -project loan.xcodeproj -scheme loan  -archivePath $ipaPath/$appName/$appName.xcarchive

echo "开始打包成功，开始导出ipa"

xcodebuild -exportArchive -archivePath $ipaPath/$appName/$appName.xcarchive -exportPath $ipaPath/$appName -exportOptionsPlist $ipaPath/ExportOptions.plist

if [ $? -ne 0 ]; then  # 判断上条语句是否执行成功
    echo "导出IPA失败"
else
    echo "导出IPA成功"
fi

open $ipaPath/$appName
```

2. 如果使用 Automator 做一个脚本，首先需要通过AppleScript先获取到用户输入的内容，通过返回值，传给shell进行打包

**AppleScript**

```
on run {input, parameters}
	
    // 这会弹出一个密码对话框，并将结果存储到pass变量中。
	tell application "System Events"
		display dialog "Password:" default answer "" with hidden answer
	end tell
	set pass to text returned of result
	
    // 将结果返回给shell
	return {result}
end run
```
对应的shell脚本通过`$1`从AppleScript中获取返回值
```shell
projectPath="/Users/xxx/Desktop/wecash"
ipaPath="/Users/xxx/Desktop/ipa"

echo "请出入包名:"
appName=$1

echo "开始打包"

cd $projectPath

xcodebuild clean

echo "清除项目成功，开始打包"

xcodebuild archive -project loan.xcodeproj -scheme loan  -archivePath $ipaPath/$appName/$appName.xcarchive

echo "开始打包成功，开始导出ipa"

xcodebuild -exportArchive -archivePath $ipaPath/$appName/$appName.xcarchive -exportPath $ipaPath/$appName -exportOptionsPlist $ipaPath/ExportOptions.plist

if [ $? -ne 0 ]; then  # 判断上条语句是否执行成功
    echo "导出IPA失败"
else
    echo "导出IPA成功"
fi

open $ipaPath/$appName
```

写当前脚本主要的困难是不熟悉AppleScript的语法，不知道怎么返回值给下一步的shell。后来发现可以直接通过return返回值。如果先要在shell中遇到错误，想调用AppleScript给出系统弹窗，使用`osascript -e 'display alert "警告！"'`