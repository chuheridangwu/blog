# AVFoundation
`AVFoundation`库 是 iOS 创建及编辑视听媒体文件的几个框架之一，提供了检查、创建、编辑或重新编码媒体文件的接口，也使得从设备获取的视频实时数据可操纵。通常情况简单的播放或者录像，直接使用 `AVKit` 框架或者 `UIImagePickerController` 类即可。
`AVFoundation` 框架中使用的基本数据结构，如时间相关的或描述媒体数据的数据结构都声明在 `CoreMedia` 框架中。

拍摄一秒假假设有30张图片,大部分图片是相同的,这些相同的图片属于数据冗余,可以删除不影响动画本身

* IBP帧
```
I帧 关键帧
B帧 相同的图片, 参考上一帧和下一帧,保留相同的部分
P帧 不同的图片
```

* 需要注意的地方，你需要在你app的 `Info.plist` 中添加如下键值对
```
/ 相册使用权限描述
Privacy - Photo Library Usage Description
// 相机使用权限描述
Privacy - Camera Usage Description
// 麦克风使用权限描述
Privacy - Microphone Usage Description
```

* AVFoundation库中常用到的类
```markdown
    * `AVCaptureSession` // 捕捉会话
    * `AVCaptureDevice` // 捕捉设备(摄像头、摄像头光圈、麦克风、闪光灯)
    * `AVCaptureDeviceDiscoverySession` //  监视可用捕获设备的查询
    * `AVCaptureDeviceInput` // 捕捉设备输入
    * AVCaptureOutput// 捕捉设备输出 (抽象类,声音or视频，使用子类实现)
        * `AVCapturePhotoOutput`  //静态图片
        * `AVCaptureMovieFileOutput`  // 将视频和音频记录到 QuickTime 电影文件的捕获输出
        * `AVCaptureAudioDataOutput`  // 音频
        * `AVCaptureVideoDataOutput`  // 视频
    * `AVCaptureConnection` // 捕捉连接(建立输入和输出的链接)
    * `AVCaptureVideoPreviewLayer` //捕捉预览
    * AVCaptureDevicePosition //捕捉预览
```

## AVCaptureDeviceDiscoverySession
用于查找、监视可用捕获设备的查询。匹配指定类型的设备(如麦克风和广角相机)。支持媒体类型采集(如音频、视频、或音视频同时)，和位置(如前置摄像头、后置摄像头)。
当创建一个采集设备发现会话(对该类进行实例化，获取一个对象)，你可以检查它的设备数组（即其devices属性，符合会话标准的一系列当前可用设备集合）

```swift
// 获取所有的摄像头
AVCaptureDevice.DiscoverySession.init(deviceTypes: [.builtInWideAngleCamera], mediaType: .video, position: .unspecified).devices
```


## AVCaptureVideoPreviewLayer 捕捉预览
```swift
var session: AVCaptureSession?  // 会话
var connection: AVCaptureConnection? { get } //连接
func captureDevicePointConverted(fromLayerPoint pointInLayer: CGPoint) -> CGPoint //屏幕坐标系转换为 摄像头坐标
func layerPointConverted(fromCaptureDevicePoint captureDevicePointOfInterest: CGPoint) -> CGPoint // 摄像头坐标转换为屏幕坐标
```


## VideoToolbox 硬解码名词(结构)解释
```markdown
1、`VTDecompressionSessionRef`：解码器对象数据结构；
2、`CMVideoFormatDescriptionRef`：图形解码相关格式及描述；
3、`CVPixelBufferRef`：编码前和解码后的图像数据结构；
4、`CMBlockBufferRef`：存在解码前图像数据内存结构；
5、`CMSampleBufferRef`：存放解码前的视频图像的容器数据结构；
6、`AVSampleBufferDisplayLayer`：以CMSampleBufferRef进行解码并显示Layer图层；
7、`SPS、PPS`：h.264解码参数信息；IDR：h.264视频流I帧；
```

保存图片：
```swift
//MARK:- save image
func WM_FUNC_saveImage(_ image:UIImage) -> Void {
    UIImageWriteToSavedPhotosAlbum(image, self, #selector(image(_:didFinishSavingWithError:contextInfo:)), nil)
}
@objc func image(_ image: UIImage, didFinishSavingWithError error: NSError?, contextInfo: UnsafeRawPointer) {
    if let error = error {
        // we got back an error!
        let ac = UIAlertController(title: "Save error", message: error.localizedDescription, preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    } else {
        let ac = UIAlertController(title: "Saved!", message: "Your altered image has been saved to your photos.", preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    }
}
```

保存视频：
```swift
//MARK:- save video
func WM_FUNC_saveVideo(_ urlStr:String) -> Void {
    UISaveVideoAtPathToSavedPhotosAlbum(urlStr, self, #selector(videoSaveStatus(_:didFinishSavingWithError:contextInfo:)), nil)
}
@objc func videoSaveStatus(_ urlstr: String, didFinishSavingWithError error: NSError?, contextInfo: UnsafeRawPointer){
    if error != nil {
    //error
    }else{
    //success
    }
}
```

## 参考网址
[AVFoundation官方文档](https://developer.apple.com/av-foundation/)
[AVFoundation框架解析（二）—— 实现视频预览录制保存到相册](https://www.jianshu.com/p/81d17b92fb1b)
[直接显示CMSampleBufferRef的视图AVSampleBufferDisplayLayer](https://blog.csdn.net/Xoxo_x/article/details/84039012)
[iOS硬解码H264视频流](https://www.jianshu.com/p/a716dce3b862)
[AVFoundation](https://juejin.cn/post/7018816531425394719)
[iOS获取设备摄像头——视频采集](https://www.jianshu.com/p/320d73482c35)