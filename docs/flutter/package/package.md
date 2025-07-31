# 制作插件
插件开发参考文章[前端技术：一文带你掌握Flutter插件开发新姿势](https://mp.weixin.qq.com/s/mRXDKvyj_3pDjxM_axTDmQ)，双端通信现在大部分都是用`Pigeon`。使用admob制作一个例子:

##  第一步：创建package包
使用`flutter create --org com.example.admob --template=plugin --platforms=android,ios -a kotlin -i objc admob_demo`命令创建项目,这将在 admob_demo 目录下创建一个插件项目，其中包含以下内容：
```  
   * lib/admob_demo.dart 文件。 主要用于Dart 插件 API 的实现，用于跟Native端进行通信
   * android/src/main/java/com/example/admob/admob_demo/AdmobDemoPlugin.kt 文件。 这是 Android 平台原生插件 API 实现（使用 Kotlin 编程语言）。
   * ios/Classes/AdmobDemoPlugin.m 文件。 这是 iOS 平台原生插件 API 实现（使用 Objective-C 编程语言）。
   * example/文件。 一个依赖于该插件并说明了如何使用它的 Flutter 应用。就是一个实例程序,你可以在程序上进行示例演示
```
## 第二步: iOS中使用pod添加Admob的SDK
在`admob_demo.podspec`文件中，添加`s.dependency 'Google-Mobile-Ads-SDK'`
```
Pod::Spec.new do |s|
  s.name             = 'admob_demo'
  s.version          = '0.0.1'
  s.summary          = 'A new flutter plugin project.'
  s.description      = <<-DESC
A new flutter plugin project.
                       DESC
  s.homepage         = 'http://example.com'
  s.license          = { :file => '../LICENSE' }
  s.author           = { 'Your Company' => 'email@example.com' }
  s.source           = { :path => '.' }
  s.source_files = 'Classes/**/*'
  s.public_header_files = 'Classes/**/*.h'
  s.dependency 'Flutter'
  s.dependency 'Google-Mobile-Ads-SDK'
  s.platform = :ios, '9.0'

  # Flutter.framework does not contain a i386 slice.
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES', 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'i386' }
end
```

**使用 Xcode 编辑 iOS 平台代码之前，首先确保代码至少被构建过一次（即从 IDE/编辑器执行示例程序，或在终端中执行以下命令： `cd admob_demo/example; flutter build ios --no-codesign`）**

## 第三步：使用Pigeon进行通信
创建`pigeons/admob_message.dart`文件夹和文件，在`admob_message.dart`文件中添加模型：
```dart
import 'package:pigeon/pigeon.dart';

class Admob {
   String adUnitId = "";
}

// @HostApi() 标注了通信对象和接口的定义，
@HostApi()
abstract class Api {
  void initializeAds();
  void loadInterstitialAd(Admob admob);
}

// 输出配置信息
void configurePigeon(PigeonOptions opts) {
  opts.dartOut = '../admob_demo/lib/pigeon.dart';  //输出了 dart 模板文件；
  opts.dartTestOut = '../admob_demo/lib/test.dart';  //测试模板
  opts.objcHeaderOut = 'ios/Classes/messages.h'; //iOS输出文件位置
  opts.objcSourceOut = 'ios/Classes/messages.m'; //iOS输出文件位置
  opts.javaOut =
      'android/src/main/kotlin/com/example/admob/admob_demo/Messages.java'; //输出java文件
  opts.javaOptions!.package = 'com.example.demo'; //android 包名
}
```
我们这里只添加两个方法，Admob初始化和加载插页广告，使用`flutter pub run pigeon  --input pigeons/admob_message.dart`命令生成模型文件。

## 第四步：编写AdmobDemoPlugin.m文件
可以直接使用 Xcod e编写 AdmobDemoPlugin.m 文件，打开`example/ios/Runner.xcworkspace`项目,在打开之前使用`cd admob_demo/example; flutter build ios --no-codesign`命令先构建一次。

从`GeneratedPluginRegistrant.m`中跳转到`AdmobDemoPlugin.m`文件进行编写。
```objc
#import "AdmobDemoPlugin.h"
#import "messages.h"
#import <GoogleMobileAds/GoogleMobileAds.h>

@interface AdmobDemoPlugin()<Api>
@property (nonatomic,strong)UIViewController *rootController;
@property (nonatomic,strong)GADInterstitialAd *interstitialAd;
@end

@implementation AdmobDemoPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  FlutterMethodChannel* channel = [FlutterMethodChannel
      methodChannelWithName:@"admob_demo"
            binaryMessenger:[registrar messenger]];
  AdmobDemoPlugin* instance = [[AdmobDemoPlugin alloc] registerWithRegistrar:registrar];
  [registrar addMethodCallDelegate:instance channel:channel];
}

- (instancetype)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar{
    if (self == [super init]) {
        ApiSetup(registrar.messenger, self);
        _rootController =
            UIApplication.sharedApplication.delegate.window.rootViewController;
    }
    return self;;
}

- (void)handleMethodCall:(FlutterMethodCall*)call result:(FlutterResult)result {
  if ([@"getPlatformVersion" isEqualToString:call.method]) {
    result([@"iOS " stringByAppendingString:[[UIDevice currentDevice] systemVersion]]);
  } else {
    result(FlutterMethodNotImplemented);
  }
}

-(void)initializeAds:(FlutterError *_Nullable *_Nonnull)error{
    [[GADMobileAds sharedInstance] startWithCompletionHandler:nil];
}

-(void)loadInterstitialAd:(Admob*)input error:(FlutterError *_Nullable *_Nonnull)error{
    GADRequest *request = [GADRequest request];
    __weak typeof(self) weakSelf = self;
    [GADInterstitialAd loadWithAdUnitID:@"ca-app-pub-3940256099942544/4411468910"
                                request:request
     
                      completionHandler:^(GADInterstitialAd *ad, NSError *error) {
      if (error) {
        NSLog(@"Failed to load interstitial ad with error: %@", [error localizedDescription]);
        return;
      }
        // 显示广告
        [ad presentFromRootViewController:weakSelf.rootController];
    }];
}
@end
```

## 第五步：编写dart接口的Api
我们的插件最后还是要让 dart 使用，所以还要写 dart 端的Api。编写`admob_demo.dart`文件：
```dart

import 'dart:async';

import 'package:admob_demo/pigeon.dart';
import 'package:flutter/services.dart';

class AdmobDemo {
  static const MethodChannel _channel =
      const MethodChannel('admob_demo');

  static Future<String?> get platformVersion async {
    final String? version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }

  static void  initializeAds(){
    Api api = Api();
    api.initializeAds();
  }
  static void showInterstitialAd(){
    Admob admob = Admob();
    admob.adUnitId = "ca-app-pub-3940256099942544/4411468910";
    Api api = Api();
    api.loadInterstitialAd(admob);
  }
}
```

## 第六步：使用示例进行展示
在 `example/lib/main.dart` 文件中,我们通过 `main.dart` 文件中进行调用，点击按钮显示插页式广告
```dart
import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:admob_demo/admob_demo.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _platformVersion = 'Unknown';

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  Future<void> initPlatformState() async {
    String platformVersion;
    try {
      platformVersion =
          await AdmobDemo.platformVersion ?? 'Unknown platform version';
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }
    if (!mounted) return;
    setState(() {
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {
    
    // 初始化
    AdmobDemo.initializeAds();

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Plugin example app'),
        ),
        body: Center(
          child: Text('Running on: $_platformVersion\n'),
        ),
        floatingActionButton: FloatingActionButton(onPressed: (){
           // 显示插页式广告
           AdmobDemo.showInterstitialAd();
        },),
      ),
    );
  }
}
```