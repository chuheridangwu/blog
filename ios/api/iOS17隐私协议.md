# iOS17 隐私协议适配详解
1. 需要新建文件,选择`App Privacy`,创建文件名称为`PrivacyInfo.xcprivacy`文件
2. 文件中的内容根据苹果官方文档进行编写，示例内容，根据自己的需求进行修改
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSPrivacyTracking</key>
	<false/>
	<key>NSPrivacyTrackingDomains</key>
	<array>
		<string>xw-web.yixc.com</string>
		<string>r3cxzq.oplinking.com</string>
	</array>
	<key>NSPrivacyCollectedDataTypes</key>
	<array>
		<dict>
			<key>NSPrivacyCollectedDataType</key>
			<string>NSPrivacyCollectedDataTypeDeviceID</string>
			<key>NSPrivacyCollectedDataTypeLinked</key>
			<false/>
			<key>NSPrivacyCollectedDataTypeTracking</key>
			<false/>
			<key>NSPrivacyCollectedDataTypePurposes</key>
			<array>
				<string>Third-party advertising</string>
				<string>Other purposes</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyCollectedDataType</key>
			<string>NSPrivacyCollectedDataTypeUserID</string>
			<key>NSPrivacyCollectedDataTypeLinked</key>
			<false/>
			<key>NSPrivacyCollectedDataTypeTracking</key>
			<false/>
			<key>NSPrivacyCollectedDataTypePurposes</key>
			<array>
				<string>Third-party advertising</string>
				<string>Other purposes</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyCollectedDataType</key>
			<string>Crash data</string>
			<key>NSPrivacyCollectedDataTypeLinked</key>
			<false/>
			<key>NSPrivacyCollectedDataTypeTracking</key>
			<false/>
			<key>NSPrivacyCollectedDataTypePurposes</key>
			<array>
				<string>Third-party advertising</string>
				<string>Other purposes</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyCollectedDataType</key>
			<string>Other diagnostic data</string>
			<key>NSPrivacyCollectedDataTypeLinked</key>
			<false/>
			<key>NSPrivacyCollectedDataTypeTracking</key>
			<false/>
			<key>NSPrivacyCollectedDataTypePurposes</key>
			<array>
				<string>Third-party advertising</string>
				<string>Other purposes</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyCollectedDataType</key>
			<string>Other data types</string>
			<key>NSPrivacyCollectedDataTypeLinked</key>
			<false/>
			<key>NSPrivacyCollectedDataTypeTracking</key>
			<false/>
			<key>NSPrivacyCollectedDataTypePurposes</key>
			<array>
				<string>Third-party advertising</string>
				<string>Other purposes</string>
			</array>
		</dict>
	</array>
	<key>NSPrivacyAccessedAPITypes</key>
	<array>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>0A2A.1</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategorySystemBootTime</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>35F9.1</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryDiskSpace</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>E174.1</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryActiveKeyboards</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>54BD.1</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryUserDefaults</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>CA92.1</string>
			</array>
		</dict>
	</array>
</dict>
</plist>
```

* Privacy Tracking Enabled 【bool】，如果APP或三方SDK使用了 应用程序跟踪透明度框架下定义的数据进行跟踪 ，需要设置成YES。设置为YES的话，必须配置 `Privacy Tracking Domains`，就下面的的第二步，设置为NO的话忽略
* Privacy Tracking Domains 【array】, 添加跟踪的互联网域名，如果用户禁止 `ATTrackingManager` 的权限申请，这些域名会请求失败,模版中的两条数据是我随便填的。查看域名方法：`Xcode->open developer tool->Instruments->network->points of interest`
* Privacy Nutrition Label Types 【array】只需修改 `Collection Purposes` 下的内容即可,或者直接删除 `Privacy Nutrition Label Types 下的 item`，例如没有用到 `Device ID`，把item删掉就行Collection Purposes [填写内容对照链接](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests?language=objc)
* Privacy Accessed API Types 【array】同样只需修改 `Privacy Accessed API Reasons` 内容,用不到的话直接删item。[Privacy Accessed API Reasons 填写内容对照链接](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api?language=objc)
只需填写 DDA9​.1 会自动补全内容的,[点击查看分析脚本](https://github.com/crasowas/app_store_required_privacy_manifest_analyser.git)



## 参考文档
* [需要隐私清单和签名的 SDK](https://developer.apple.com/cn/support/third-party-SDK-requirements/)
* [一文搞定 App Store 春季新要求](https://zhuanlan.zhihu.com/p/689783121)
* [检查网络请求](https://developer.apple.com/documentation/xcode/detecting-when-your-app-contacts-domains-that-may-be-profiling-users)
* [描述隐私清单中的数据使用](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests)
* [iOS - 超好用的隐私清单分析脚本](https://blog.csdn.net/crasowas/article/details/137659281)