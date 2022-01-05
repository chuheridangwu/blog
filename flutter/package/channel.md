# 跨平台交互
文档根据[Flutter中文社区文档](https://flutter.cn/docs/development/platform-integration/platform-channels?tab=ios-channel-objective-c-tab)参考进行编写，简化文档信息内容，基于Flutter2.0版本。文档介绍了如何编写自定义的平台相关代码。

Flutter允许调用相关平台的 API，无论是 Android 中的 Java 或 Kotlin 代码，还是 iOS 中的 Objective-C 或 Swift 代码。

客户端做方法调用的时候 `MethodChannel` 会负责响应，从平台一侧来讲，Android 系统上使用 `MethodChannelAndroid`、 iOS 系统使用 `MethodChanneliOS` 来接收和返回来自 `MethodChannel` 的方法调用。

## 示例项目，获取手机电量
通过获取手机电量的例子演示平台之间如果通信。dart 通过消息 `getBatteryLevel()` 来调用 Android 的 `BatteryManager` API 及 iOS 的 `device.batteryLevel` API。注意: iOS中模拟器是获取不到电量信息的。

### 第一步：创建项目
首先通过命令行创建一个项目`flutter create -i objc -a kotlin batterylevel`。`-i objc`表示 iOS 平台使用 Objective-C 语言， `-a kotlin` 表示Android 平台使用 Kotlin。

也可以使用`-a java`或`-i swift`表示使用java语言和swift语言。

### 第二步: 创建 Flutter 平台客户端
首先，构建通道。在返回电池电量的单一平台方法中使用 `MethodChannel`。

通道的客户端和宿主端通过传递给通道构造函数的通道名称进行连接。一个应用中所使用的所有通道名称必须是唯一的；使用唯一的 **域前缀** 为通道名称添加前缀，比如：`samples.flutter.dev/battery`。
```dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
...
class _MyHomePageState extends State<MyHomePage> {
    // 设置通道名称   samples.flutter.dev/battery
    static const platform = const MethodChannel('samples.flutter.dev/battery');

    // 获取电量状态,根据标识符指定调用的方法（通过指定 String 标识符 getBatteryLevel 调用具体的方法）
    String _batteryLevel = 'Unknown battery level.';

    Future<void> _getBatteryLevel() async {
        String batteryLevel;
        try {
            // 获取调用平台方法的结果，调用可能会失败，所以使用try catch
            final int result = await platform.invokeMethod('getBatteryLevel');
            batteryLevel = '电池电量 $result % .';
        } on PlatformException catch (e) {
            batteryLevel = "获取电池电量失败: '${e.message}'.";
        }
        // 更改文字按钮状态 
        setState(() {
            _batteryLevel = batteryLevel;
        });
    }

    @override
    Widget build(BuildContext context) {
        return Material(
            child: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                    ElevatedButton(
                        child: Text('Get Battery Level'),
                        onPressed: _getBatteryLevel,
                    ),
                    Text(_batteryLevel),
                    ],
                ),
            ),
        );
    }
}
```

### 第三步: 添加 Android 平台的实现
在项目视图中打开 kotlin 文件夹下的 `MainActivity.kt` 文件（注意：如果使用 Android Studio 2.3 进行编辑，请注意 kotlin 目录的显示名称为 java）。

在 `configureFlutterEngine()` 方法中创建一个 `MethodChannel` 并调用 `setMethodCallHandler()`。确保使用的通道名称与 Flutter 客户端使用的一致。这里 dart 和 Android 之间通信的通道名称是`samples.flutter.dev/battery`,方法名称是`getBatteryLevel`
```kotlin
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES


class MainActivity: FlutterActivity() {
  private val CHANNEL = "samples.flutter.dev/battery"

  override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {

    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {call, result ->
     
      // 这里的 getBatteryLevel 是dart传递的方法标识符
      if (call.method == "getBatteryLevel") {
        val batteryLevel = getBatteryLevel()

        if (batteryLevel != -1) {
          result.success(batteryLevel)
        } else {
          result.error("UNAVAILABLE", "Battery level not available.", null)
        }
      } else {
        // 如果没有对应的方法名，则返回找不到方法的错误  
        result.notImplemented()
      }
    }
  }
    // 获取电量方法
  private fun getBatteryLevel(): Int {
    val batteryLevel: Int
    if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
        val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    } else {
        val intent = ContextWrapper(applicationContext).registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
        batteryLevel = intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 / intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
    }
    return batteryLevel
  }

}
```

### 第四步： 添加 iOS 平台的实现
打开项目导航 **Runner > Runner** 下的 `AppDelegate.m` 文件。在 `application didFinishLaunchingWithOptions:` 方法中创建一个 `FlutterMethodChannel` 并添加一个处理程序。确保使用的通道名称与 Flutter 客户端使用的一致。
```objc
#import <Flutter/Flutter.h>
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions {
  FlutterViewController* controller = (FlutterViewController*)self.window.rootViewController;

  FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
                                          methodChannelWithName:@"samples.flutter.dev/battery"
                                          binaryMessenger:controller.binaryMessenger];

  __weak typeof(self) weakSelf = self;
  [batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
    // Note: this method is invoked on the UI thread.
    if ([@"getBatteryLevel" isEqualToString:call.method]) {
        int batteryLevel = [weakSelf getBatteryLevel];

        if (batteryLevel == -1) {
        result([FlutterError errorWithCode:@"UNAVAILABLE"
                                    message:@"Battery info unavailable"
                                    details:nil]);
        } else {
        result(@(batteryLevel));
        }
    } else {
        result(FlutterMethodNotImplemented);
    }
  }];

  [GeneratedPluginRegistrant registerWithRegistry:self];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// 获取电量的方法
- (int)getBatteryLevel {
  UIDevice* device = UIDevice.currentDevice;
  device.batteryMonitoringEnabled = YES;
  if (device.batteryState == UIDeviceBatteryStateUnknown) {
    return -1;
  } else {
    return (int)(device.batteryLevel * 100);
  }
}
```
以上，点击按钮之后就可以调用 Android 和 iOS 平台获取电量的结果了。然而这并不是类型安全的。为了正确通信，调用/接收消息取决于 `host` 和 `client` 声明相同的参数和数据类型。 `Pigeon` 包可以用作 `MethodChannel` 的替代品，它将生成以结构化类型安全方式发送消息的代码。

## Pigeon
Pigeon 是一个代码生成工具。在 Pigeon 中，消息接口在 Dart 中进行定义，通过命令行使用它生成对应的 Android 以及 iOS 的代码。更复杂的例子以及更多信息尽在 [Pigeon Pub.dev](https://pub.flutter-io.cn/packages/pigeon)。

Pigeon 是为了消除了在主机和客户端之间匹配字符串的需要消息的名称和数据类型。它支持：嵌套类，消息转换为 API，生成异步包装代码并发送消息。生成的代码具有相当的可读性并保证在不同版本的多个客户端之间没有冲突。支持 Objective-C，Java，Kotlin 和 Swift（通过 Objective-C 互操作）语言。

以下内容参考[Google 2020开发者大会Flutter专题](https://cloud.tencent.com/developer/article/1763737?from=article.detail.1729565)。

也可以参考这篇文章[Pigeon- Flutter多端接口一致性以及规范化管理实践](https://cloud.tencent.com/developer/article/1729565)

### 第一步: 添加Pigeon
 在dart项目中使用 Pigeon , `pubspec.yaml`文件中添加`pigeon: ^0.2.3`.

### 第二步: 生成模型
在 lib 同级目录下创建 pigeons 文件夹，新建一个 `message.dart` 模型文件，作为存放dart侧的入口文件，等添加如下代码，内容为接口、参数、返回值的定义:
```dart
import 'package:pigeon/pigeon.dart';

class SearchRequest {
  String query = "";
}

class SearchReply {
  String result = "";
}

// @HostApi() 标注了通信对象和接口的定义，
@HostApi()
abstract class Api {
  SearchReply search(SearchRequest request);
}

// 输出配置信息
void configurePigeon(PigeonOptions opts) {
  opts.dartOut = '../video_player_platform_interface/lib/pigeon.dart';  //输出了 dart 模板文件；
  opts.dartTestOut = '../video_player_platform_interface/lib/test.dart';  //测试模板
  opts.objcHeaderOut = 'ios/Classes/messages.h'; //iOS输出文件位置
  opts.objcSourceOut = 'ios/Classes/messages.m'; //iOS输出文件位置
  opts.objcOptions.prefix = 'FLT'; //插件默认的前缀
  opts.javaOut =
      'android/src/main/java/io/flutter/plugins/videoplayer/Messages.java'; //输出java文件
  opts.javaOptions!.package = 'com.example.demo'; //android 包名
}
```
在 message.dart 文件中，通过` @HostApi()` 注解标示了通信对象和接口，之后我们只需要执行如下命令，就可以生成对应代码到工程中

`flutter pub run pigeon  --input pigeons/message.dart` 

这条命令是以下命令的缩写(这里我测试的时候使用上面这条命令没有成功，使用下面的命令成功了，注意更换成自己的包名)

`flutter pub run pigeon  --input pigeons/message.dart  --dart_out lib/pigeon.dart  --objc_header_out ios/Runner/pigeon.h --objc_source_out ios/Runner/pigeon.m --java_out android/app/src/main/java/Pigeon.java --java_package "com.xxx.自己的包名"`

命令的参数的含义：
* --input：引入了我们创建的 message.dart 文件；
* --dart_out：输出了 dart 模板文件；
* --objc_header_out 和 --objc_source_out 输出了 object-c 文件；
* --java_out 输出了 java 文件；

命令执行后会创建 pigeon.dart 文件输出到 lib 目录下， object-c 文件输出到了 ios/Runner 目录下，java 文件输出到指定的 com.xxx.x'x'x" 包名路径下。

### 第三步：实现Android平台
因为 Pigeon 目前只能生成 java 和 oc 的代码，如果是 kotlin 项目需要在项目中调用 java代码。使用 Android Studio 打开项目，发现在我们的包名之下有 Pigeon 文件。在 `MainActivity` 文件中添加以下代码：
```kotlin
class MyApi : Pigeon.Api{
    override fun search(arg: Pigeon.SearchRequest?): Pigeon.SearchReply {
        var replay =  Pigeon.SearchReply();
        replay.result = "测试消息";
        return replay;
    }
}

class MainActivity: FlutterActivity() {

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        // 返回dart结果
        Pigeon.Api.setup(flutterEngine.dartExecutor.binaryMessenger, MyApi());
      }

}
```
在使用kotlin 调用 java 的方法时，可以能会出现不能调用java1.8方法的问题，使用以下方式解决:

>  报错  Calls to static methods in Java interfaces are prohibited in JVM target 1.6. Recompile with '-jvm-target 1.8'

原因是不能使用java8的新特性，在 `app/build.gradle` 下添加一下配置即可:

java项目
```
compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

```

Kotlin项目
```
kotlinOptions {
        jvmTarget = '1.8'
    }
```

### 第四步：实现iOS平台代码
在iOS平台中，会在 Runner 文件夹下生成 pigeon 文件，**如果项目中没有导入文件，需要手动导入。**
```objc
#import <Flutter/Flutter.h>
#import <UIKit/UIKit.h>
#import "pigeon.h"

@interface AppDelegate : FlutterAppDelegate<Api>

@end

------------- 实现 -------------

#import "AppDelegate.h"
#import "GeneratedPluginRegistrant.h"
#import "pigeon.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    FlutterViewController* controller = (FlutterViewController*)self.window.rootViewController;
    
    // 调用方法
    ApiSetup(controller.binaryMessenger, self);
    
  [GeneratedPluginRegistrant registerWithRegistry:self];
  // Override point for customization after application launch.
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// 实现代理方法
-(SearchReply *)search:(SearchRequest*)input error:(FlutterError **)error {
    SearchReply* result = [[SearchReply alloc] init];
    result.result  = [NSString stringWithFormat:@"%s%@","测试数据",input.query];
    return result;
}

@end
```

### 第五步: 在dart文件中进行测试
在dart平台中调用其他平台的方法
```dart
  Future<void> _demoTest() async {
    SearchRequest request = SearchRequest()..query = "Aaron";
    Api api = Api();
    SearchReply reply = await api.search(request);
    print(reply.result);  
  }
```