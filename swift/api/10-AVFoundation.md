# AVFoundation
`AVFoundation`库 是 iOS 创建及编辑视听媒体文件的几个框架之一，提供了检查、创建、编辑或重新编码媒体文件的接口，也使得从设备获取的视频实时数据可操纵。通常情况简单的播放或者录像，直接使用 `AVKit` 框架或者 `UIImagePickerController` 类即可。
`AVFoundation` 框架中使用的基本数据结构，如时间相关的或描述媒体数据的数据结构都声明在 `CoreMedia` 框架中。

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

[AVFoundation官方文档](https://developer.apple.com/av-foundation/)
[AVFoundation框架解析（二）—— 实现视频预览录制保存到相册](https://www.jianshu.com/p/81d17b92fb1b)
[直接显示CMSampleBufferRef的视图AVSampleBufferDisplayLayer](https://blog.csdn.net/Xoxo_x/article/details/84039012)
[iOS硬解码H264视频流](https://www.jianshu.com/p/a716dce3b862)