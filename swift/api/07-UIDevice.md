# UIDevice
```swift
UIDevice.currentDevice().name  // 在 iOS 16 之前，用户分配的设备名称（例如@“我的 iPhone”）。
UIDevice.currentDevice().model  //例如 @"iPhone"、@"iPad"、@"watch"
UIDevice.currentDevice().systemName  //例如 @“iOS”、@"Mac OS"
UIDevice.currentDevice().systemVersion  //iOS手机系统版本 例如 @"16.0.3"

UIDevice.currentDevice().identifierForVendor?.uuidString  //可用于唯一标识设备的 UUID，在来自单个供应商的应用程序中相同
UIDevice.currentDevice().userInterfaceIdiom  //用户设备，比如是 iPad 还是 iPhone 还是Apple TV 还是mac

UIDevice.currentDevice().batteryState  //电池状态
UIDevice.currentDevice().batteryLevel  //电池电量 0..1 未知使用-1表示

//设备是否接近脸
UIDevice.currentDevice().proximityMonitoringEnabled
UIDevice.currentDevice().proximityState

//是否支持多任务
UIDevice.currentDevice().multitaskingSupported

//播放输入的声音
UIDevice.currentDevice().playInputClick()
```

设备旋转: 这里说的是设备的物理方向，不是屏幕的方向。
`isGeneratingDeviceOrientationNotifications`是否发送通知,假设是true，那么设备方向改变了，会发送通知`UIDeviceOrientationDidChangeNotification`通知 。

注意，获取方向的时候要在这两个函数之间获取
```swift
public enum UIDeviceOrientation : Int, @unchecked Sendable {
    case unknown = 0 // 未知
    case Portrait = 1 // 设备垂直，主页按钮在底部
    case PortraitUpsideDown = 2 // 设备垂直，主页按钮在顶部
    case LandscapeLeft = 3 // 设备水平方向，主页按钮在右侧
    case LandscapeRight = 4 // 设备水平方向，主页按钮在左侧
    case faceUp = 5 // 设备面向平面，面朝上
    case faceDown = 6 // 设备面向平面，面朝下
}

UIDevice.currentDevice().beginGeneratingDeviceOrientationNotifications()
let orientation = UIDevice.currentDevice().orientation //返回当前设备方向。 这将返回 UIDeviceOrientationUnknown ，除非正在生成设备方向通知。     
UIDevice.currentDevice().endGeneratingDeviceOrientationNotifications 
```

## Bundle.main.info
```swift
guard let info = Bundle.main.infoDictionary else { return }
// 获取App的版本号
let appVersion = info["CFBundleShortVersionString"]
// 获取App的build版本
let appBuildVersion = info["CFBundleVersion"]
// 获取App的名称
let appName = info["CFBundleDisplayName"] //
let appName1 = info["CFBundleName"]
// 本地化的名字
let appName2 = Bundle.main.localizedInfoDictionary?["CFBundleDisplayName"] as? String


// 获取APP名称
func getAppName() -> String {
    if let name = Bundle.main.localizedInfoDictionary?["CFBundleDisplayName"] as? String {
        return name
    }
    if let name = Bundle.main.infoDictionary?["CFBundleDisplayName"] as? String {
        return name
    }
    if let name = Bundle.main.infoDictionary?["CFBundleName"] as? String {
        return name
    }
    return "App"
}
```


获取手机型号
```swift
var modelName: String {
    var systemInfo = utsname()
    uname(&systemInfo)
    let machineMirror = Mirror(reflecting: systemInfo.machine)
    let identifier = machineMirror.children.reduce("") { identifier, element in
        guard let value = element.value as? Int8, value != 0 else { return identifier }
        return identifier + String(UnicodeScalar(UInt8(value)))
    }
    
    switch identifier {
    case "iPod1,1":  return "iPod Touch 1"
    case "iPod2,1":  return "iPod Touch 2"
    case "iPod3,1":  return "iPod Touch 3"
    case "iPod4,1":  return "iPod Touch 4"
    case "iPod5,1":  return "iPod Touch 5"
    case "iPod7,1":  return "iPod Touch 6"
    case "iPod9,1":  return "iPod Touch 7"

        
    case "iPhone3,1", "iPhone3,2", "iPhone3,3":  return "iPhone 4"
    case "iPhone4,1":  return "iPhone 4s"
    case "iPhone5,1":  return "iPhone 5"
    case "iPhone5,2":  return "iPhone 5"
    case "iPhone5,3", "iPhone5,4":  return "iPhone 5c"
    case "iPhone6,1", "iPhone6,2":  return "iPhone 5s"
    case "iPhone7,2":  return "iPhone 6"
    case "iPhone7,1":  return "iPhone 6 Plus"
    case "iPhone8,1":  return "iPhone 6s"
    case "iPhone8,2":  return "iPhone 6s Plus"
    case "iPhone8,4":  return "iPhone SE"
    case "iPhone9,1", "iPhone9,3":  return "iPhone 7"
    case "iPhone9,2", "iPhone9,4":  return "iPhone 7 Plus"
    case "iPhone10,1", "iPhone10,4": return "iPhone 8"
    case "iPhone10,2", "iPhone10,5": return "iPhone 8 Plus"
    case "iPhone10,3", "iPhone10,6": return "iPhone X"
    case "iPhone11,2": return "iPhone XS"
    case "iPhone11,4", "iPhone11,6": return "iPhone XS Max"
    case "iPhone11,8": return "iPhone XR"
    case "iPhone12,1": return "iPhone 11"
    case "iPhone12,3": return "iPhone 11 Pro"
    case "iPhone12,5": return "iPhone 11 Pro Max"
    case "iPhone12,8": return "iPhone SE 2"
    case "iPhone13,1": return "iPhone 12 mini"
    case "iPhone13,2": return "iPhone 12"
    case "iPhone13,3": return "iPhone 12 Pro"
    case "iPhone13,4": return "iPhone 12 Pro Max"
    case "iPhone14,2": return "iPhone 13 Pro"
    case "iPhone14,3": return "iPhone 13 Pro Max"
    case "iPhone14,4": return "iPhone 13 mini"
    case "iPhone14,5": return "iPhone 13"
    case "iPhone14,6": return "iPhone SE (3rd generation)"
    case "iPhone14,7": return "iPhone 14"
    case "iPhone14,8": return "iPhone 14 Plus"
    case "iPhone15,2": return "iPhone 14 Pro"
    case "iPhone15,3": return "iPhone 14 Pro Max"


    case "iPad2,1", "iPad2,2", "iPad2,3", "iPad2,4":return "iPad 2"
    case "iPad3,1", "iPad3,2", "iPad3,3":           return "iPad 3"
    case "iPad3,4", "iPad3,5", "iPad3,6":           return "iPad 4"
    case "iPad6,11", "iPad6,12":                    return "iPad 5"
    case "iPad7,5", "iPad7,6":                      return "iPad 6"
    case "iPad7,11", "iPad7,12":                    return "iPad 7"
    case "iPad11,6", "iPad11,7":                    return "iPad 8"
    case "iPad12,1", "iPad12,2":                    return "iPad 9"

    case "iPad4,1", "iPad4,2", "iPad4,3":           return "iPad Air"
    case "iPad5,3", "iPad5,4":                      return "iPad Air 2"
    case "iPad11,3", "iPad11,4":                    return "iPad Air 3"
    case "iPad13,1", "iPad13,2":                    return "iPad Air 4"
    case "iPad13,16", "iPad13,17":                  return "iPad Air 5"
    
    case "iPad2,5", "iPad2,6", "iPad2,7":           return "iPad Mini"
    case "iPad4,4", "iPad4,5", "iPad4,6":           return "iPad Mini 2"
    case "iPad4,7", "iPad4,8", "iPad4,9":           return "iPad Mini 3"
    case "iPad5,1", "iPad5,2":                      return "iPad Mini 4"
    case "iPad11,1", "iPad11,2":                    return "iPad Mini 5"
    case "iPad14,1", "iPad14,2":                    return "iPad Mini 6"
        
    case "iPad6,7", "iPad6,8", "iPad6,3", "iPad6,4", "iPad7,1", "iPad7,2", "iPad7,3", "iPad7,4", "iPad8,1", "iPad8,2", "iPad8,3", "iPad8,4", "iPad8,5", "iPad8,6", "iPad8,7", "iPad8,8", "iPad8,9", "iPad8,10", "iPad8,11", "iPad8,12", "iPad13,4", "iPad13,5", "iPad13,6", "iPad13,7", "iPad13,8", "iPad13,9", "iPad13,10", "iPad13,11":         return "iPad Pro"

        
    case "AppleTV2,1":  return "Apple TV 2"
    case "AppleTV3,1","AppleTV3,2":  return "Apple TV 3"
    case "AppleTV5,3":  return "Apple TV 4"
        
    case "i386", "x86_64":  return "Simulator"
        
    default:  return identifier
    }
}
```

* [iOS Device Types(设备型号:iPhone Model)对照表](https://www.theiphonewiki.com/wiki/Models)