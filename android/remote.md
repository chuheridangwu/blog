# 远程控制安卓手机

类似于TeamViewer,安装之后，可以通过模拟器操作手机，它的原理不知道是什么，目前搜到一些资料，以后如果有需要或者时间的话再研究。
* [android实现远程控制](https://blog.csdn.net/qq_24477797/article/details/103147952)
* [Android 实现远程控制(类似QQ的远程协助)](https://blog.csdn.net/u011046184/article/details/89647914?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.no_search_link&utm_relevant_index=10)
* [如何使用scrcpy远程控制Andorid手机](https://www.myfreax.com/how-to-use-scrcpy-to-remotely-control-an-android-phone/#0)

## android 实现远程控制
最近在搞一个Android端，类似TeamViewer的东西。 目前已经实现：在微信中打开一个网址，远程控制Android端页面操作（点击、滑动、回到首页、打开指定APP（比如说钉钉）、熄屏和亮屏）。

### 设备要求
一台Android手机（Android7.0以上，模拟点击需要api>=24）、任意可以打开网页的设备（我用的是iphone的微信打开的网页）和JavaWeb服务器

### 原理
网页发送指令给服务器，同时实时拉取Android设备上传的截屏；Android设备实时获取指令，根据指令确定 是否实时上传图片、滑动的笔迹、熄屏、亮屏、打开指定APP和回到首页等操作；Java服务器充当中转站。主要通过图片进行交互，图片有个缺点是h5加载太慢，之前也考虑过使用RTMP实时传输视频流，Android端倒是有现成的代码，但苦于对JS的拉流端不太了解。So，就使用图片将就下了。

### 难点
要实现以上操作，主要难点如下： 
```markdown
1. 对于不太擅长后台Java代码的我来说，部署服务器、上传下载图片等也算是一个难点。但这不是本篇讨论的重点，多google下也就解决了。 
2. 其次是JS代码编写，网络请求、触摸事件采集等。

3. 本篇重点是Android端的难点 
1) 截屏 
2) 模拟滑动点击
```

## 截屏
网页端要想发送指令，前提是收到可见的页面，如此才能发送正确的笔迹，页面资源来源于Android端的实时上传。所以截屏至关重要。 
之前一直以为截屏只有Root下通过shell命令或者连接usb通过adb执行shell命令才能截屏，但后来查阅了相关文章后发现，Android可以通过MEDIA_PROJECTION_SERVICE来实时截屏。步骤如下：

打开申请录屏的弹窗
```java
mMediaProjectionManager = (MediaProjectionManager) getApplication().getSystemService(Context.MEDIA_PROJECTION_SERVICE);
startActivityForResult(mMediaProjectionManager.createScreenCaptureIntent(), REQUEST_MEDIA_PROJECTION);
```
创建ImageReader，用于接收屏幕数据
```dart
mImageReader = ImageReader.newInstance(windowWidth, windowHeight, 0x1, 2); //ImageFormat.RGB_565
mMediaProjection = mMediaProjectionManager1.getMediaProjection(mResultCode, mResultData);
mVirtualDisplay = mMediaProjection.createVirtualDisplay("screen-mirror",windowWidth, windowHeight, mScreenDensity, DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
mImageReader.getSurface(), null, null);

```
通过ImageReader截取当前手机屏幕
```dart
Image image = mImageReader.acquireLatestImage();
if(image == null){ // 最后一帧如果被获取过，间隔短的话，后一帧可能还没生成。
    return;
}
int width = image.getWidth();
int height = image.getHeight();
final Image.Plane[] planes = image.getPlanes();
final ByteBuffer buffer = planes[0].getBuffer();
int pixelStride = planes[0].getPixelStride();
int rowStride = planes[0].getRowStride();
int rowPadding = rowStride - pixelStride * width;
Bitmap bitmap = Bitmap.createBitmap(width + rowPadding / pixelStride, height, Bitmap.Config.ARGB_8888);
bitmap.copyPixelsFromBuffer(buffer);
bitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height);
image.close();
```
保存Bitmap，上传到服务器
关闭预览
```dart
mVirtualDisplay.release();
mVirtualDisplay = null;
mMediaProjection.stop();
```
以上，截屏就已经讲完了，下面介绍下模拟点击

### 模拟滑动点击
>最初的思路来源于抢红包app(代码：https://github.com/lendylongli/qianghongbao)，其本质是通过AccessibilityService，获取到手机的特殊权限，以此来获取app页面元素，操控页面按钮，模拟点击。开始是在钉钉上进行获取测试，一步步分析页面对应的ID，通过AccessibilityService进入到考勤界面。但钉钉的webview那个Activity貌似对AccessibilityService进行了限制，无法在考勤界面获取到页面元素（并非WebView的原因，工作界面依然有WebView，但却可以找到并进入考勤界面）。所以到此为止，我们无法通过抢红包的思路实现准确的一键打开。当然，已经进入到考勤页面了，上班和下班打开的按钮基本是固定的，所以简单点记录下页面坐标也就可以实现。但这是不完美的，万一有什么误差没打卡成功呢，我就要补卡了啊。。 
所以我采用了另一种方案：直接远程控制，这样就不针对钉钉了，而是手机端的所有操作。以后可以扩展的地方也更多。

模拟滑动操作的api依然是`AccessibilityService`，不过现在换成了dispatchGesture方法，该方法要求API >= Android N 
核心代码如下：
```java
@TargetApi(Build.VERSION_CODES.N)
AccessibilityService.GestureResultCallback callback = new AccessibilityService.GestureResultCallback() {
    @Override
    public void onCompleted(GestureDescription gestureDescription) {
        super.onCompleted(gestureDescription);
        Log.d(TAG, "gesture completed");
    }
 
    @Override
    public void onCancelled(GestureDescription gestureDescription) {
        super.onCancelled(gestureDescription);
        Log.d(TAG, "gesture cancelled");
    }
};
 
@TargetApi(Build.VERSION_CODES.N)
private static GestureDescription createGestureDescription(Path path, int duration) {
    GestureDescription.StrokeDescription stroke = new             GestureDescription.StrokeDescription(path, 0, duration);
    GestureDescription.Builder strokeBuilder = new GestureDescription.Builder();
    strokeBuilder.addStroke(stroke);
    return strokeBuilder.build();
}
 
boolean result = dispatchGesture(createGestureDescription(path, duration), callback, null);
```
我们可以通过path让AccessibilityService对屏幕进行模拟触摸，从而实现对手机的控制。 
目前有个不足之处在于，传入的path，不管有多少个点，最终只取开始和结尾两个点，down取第一个点、move和up取最后一个点。如果path只有一个点，那么没有move，up和down为同一个点。


##  

明确两者：控制方 和 被控制方；

```markdown
实现思路：
    控制方获得被控制方的屏幕共享
    控制方获得点击屏幕的X轴,Y轴坐标
    通过服务器把坐标指令发送给被控制方
    被控制方采用adb命令模拟点击；
```

模拟操作都是用 input 来完成

我们用adb shell来简单的看一下该指令的使用帮助


    tap     =   点按<X坐标> <y坐标>（默认触摸屏）
    swipe =   滑动<x1> <y1> <x2> <y2> [持续时间（毫秒）]（默认值：触摸屏）

由此可见，我们可以通过这个命令来实现模拟人操作从而达成远程操作功能

adb命令：input tap X Y

该命令在Window,cmd shell下不用root可以执行。

java代码调用时需要ROOT权限；

（本文Demo没有实现屏幕共享，所以点击时看着被控方的屏幕需要点击的大概位置点击控制方屏幕测试效果

    屏幕共享功能可通过API21的录屏+MediaCode编码器实现

    adb命令下似乎还有个截屏的API 也可以实现屏幕共享，不过该API是隐藏的，即使用系统反射也调不起来。但可以用adb命令来获得，Vysor这个软件就是通过adb调起这个截屏API不断的截屏发送数据来实现屏幕共享的）

本文Demo采用的是UDP通讯 在同一wifi局域网下实现通讯进行控制交互

发送坐标的控制方：用 `dispatchtouchEvent()`；方法取得X,Y坐标
```java
  @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        msgShow.setText("点击位置的X坐标" + ev.getX() + "点击位置的Y坐标" + ev.getY());
        switch (ev.getAction()) {
            //  点击的开始位置
            case MotionEvent.ACTION_DOWN:
                msgShow.setText("起始位置：(" + ev.getX() + "," + ev.getY());
                break;
            //触屏实时位置
            case MotionEvent.ACTION_MOVE:
                msgShow.setText("实时位置：(" + ev.getX() + "," + ev.getY());
                break;
             //离开屏幕的位置
            case MotionEvent.ACTION_UP:
                msgShow.setText("结束位置：(" + ev.getX() + "," + ev.getY());
                sendMsg(ev.getX(), ev.getY());
                break;
            default:
                break;
        }
        
       //   注意返回值
      //    true：view继续响应Touch操作；
// false：view不再响应Touch操作，故此处若为false，只能显示起始位置，不能显示实时位置和结束位置
         
        return super.dispatchTouchEvent(ev);
    }
```
通过UDP发送JSON坐标数据  Data实体类就X,Y两个变量；这里的JSON我是用GSON插件生成的
```java
private  Gson gson = new Gson();
    private DatagramSocket sendSocket = null;
    private int sendPort = 8856;//发送端口
    private void sendMsg(float x, float y) {
        try {
            if (sendSocket == null) {
                sendSocket = new DatagramSocket(sendPort);
            }
                //发送到的IP
            InetAddress inetAddress = InetAddress.getByName("192.168.1.50");
            String jsno = getJsonStr(x,y);
            byte[] bytes = jsno.getBytes();
            DatagramPacket datagramPacket = new DatagramPacket(bytes, bytes.length, inetAddress, sendPort);
            sendSocket.send(datagramPacket);
            msgShow.setText("点击的坐标" + x + y);
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
 
    }
 
 
    public String getJsonStr(float x, float y) {
        Data p = new Data();
        p.setX(x);
        p.setY(y);
        return gson.toJson(p);
    }
```

接下来接收端：UDP监听帮助类
```java
public class UdpReceive {
    private DatagramSocket receiveSocket = null;
    private int receivePort = 8856;
    private DatagramPacket datagramPacket;
    private boolean isRunning = true;
    private static UdpReceive udpReceive;
 
    public static UdpReceive getUdpReceive() {
        if (udpReceive == null) {
            synchronized (UdpReceive.class) {
                udpReceive = new UdpReceive();
            }
        }
        return udpReceive;
    }
    
    //初始化UDP监听 传入监听的端口号，回调
    public void init(int port, Touch touch) {
        new Thread(() -> {
            try {
                while (isRunning) {
                    if (receiveSocket == null) {
                        receiveSocket = new DatagramSocket(port);
                    }
                    byte[] bytes = new byte[1024];
                    datagramPacket = new DatagramPacket(bytes, 0, bytes.length);
                    receiveSocket.receive(datagramPacket);
                    Log.e("接收成功 : " , new String(datagramPacket.getData()).trim());
                    if(touch!=null)
                    touch.move(datagramPacket.getData());
                }
            } catch (SocketException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```
UDP初始化   JSON数据用GSON解析
```java
UdpReceive.getUdpReceive().init(8856, new Touch() {
            @Override
            public void move(byte[] msg) {
                String data = new String(msg).trim();
                Data json = gson.fromJson(data,Data.class);
                Log.e("",String.valueOf(json.getX()+json.getY()));
                Log.e("X",String.valueOf(json.getX()));
                Log.e("Y",String.valueOf(json.getY()));
                runOnUiThread (() -> {
                    RootCmd.execRootCmd("input tap "+json.getX()+" "+ json.getY());
                });
            }
 
            @Override
            public void touch() {
 
            }
        });
```
 回调

```java
public interface Touch {
    void move(byte[] msg);
    void touch();
}
```

 ADB命令执行方法
```java
    /**
     * 执行命令且得到结果
     */
    public static String inputRootCmd(String cmd) {
        String result = "";
        DataOutputStream dos = null;
        DataInputStream dis = null;
 
        try {
            // 经过Root的android系统即有su命令
            Process p = Runtime.getRuntime().exec("su");
            dos = new DataOutputStream(p.getOutputStream());
            dis = new DataInputStream(p.getInputStream());
            dos.writeBytes(cmd + "\n");
            dos.flush();
            dos.writeBytes("exit\n");
            dos.flush();
            String line = null;
            while ((line = dis.readLine()) != null) {
                Log.d("result", line);
                result += line;
            }
            p.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (dos != null) {
                try {
                    dos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (dis != null) {
                try {
                    dis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
```
被控制方需要ROOT权限才能通过java调用ADB命令来实现点击，滑动等操作 

Demo下载

GitHub地址：https://github.com/zhuangguangkang0013/udpSend.git 发送端（控制方）

                      https://github.com/zhuangguangkang0013/udpReceive.git 接收端(被控制方)

限速云地址：https://pan.baidu.com/s/1x3_2YGtidTg3F9LsEmoeZA  提取码:6vm9

CSDN地址:   https://download.csdn.net/download/u011046184/11150664

Demo效果图



新款加入了屏幕共享，滑动事件
帖子更新时间：2019/5/25。
Demo没有实现屏幕分享！这个图只是给你们看看我初期实验效果，
用我前面说的(录屏+编码器)那些API就可以实现屏幕分享；