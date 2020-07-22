## 使用网络权限
android使用网络需要先请求网络权限，配置在`manifest`中 `<uses-permission android:name="android.permission.INTERNET"/>`


* android studio 3.0以上会报错 Unable to resolve dependency for ':app@debug/compileClasspath': Could not download okhttp.jar
解决方案：
```
根目录中的build.gradle关于allproJects配置 搬到app/build.gradle文件中就可以了
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```
###  使用http的网络请求或者图片
安卓9.0系统出现 CLEARTEXT communication to XX not permitted by network security policy

    解决方案：
    1.  在res目录下新建一个xml文件夹，然后创建一个名为：network_config.xml文件，文件内容
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
            <base-config cleartextTrafficPermitted="true" />
    </network-security-config>
    ```
    2. 在 `AndroidManifest.xml` 的 `application` 节点下配置` android:networkSecurityConfig="@xml/network_config">`
    
## okHttp 网络请求
###  在`app/build.gradle`文件中的`dependencies`闭包中导入
```
implementation ("com.squareup.okhttp3:okhttp:4.7.2")
```
       
###  XML中配置网络请求权限
 ```kotlin
 <uses-permission android:name="android.permission.INTERNET"/>
  注意这个配置实在<manifest>下
```
        
###  使用OkHttp请求
* get请求
```java
private  void requestOkHttp() {
    new Thread(new Runnable() { //开启一个子线程
        @Override
        public void run() {
            try {
                OkHttpClient client = new OkHttpClient();
                Request request = new Request.Builder().url("http://api.hclyz.com:81/mf/json.txt").build();
                Response response = client.newCall(request).execute();
                String responseData = response.body().string();
                runOnUiThread(new Runnable() { // 回到主线程
                    @Override
                    public void run() {

                    }
                });
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }).start();
}
```
        
* post请求
  ```java
  private  void requestPostHttp(){
      new Thread(new Runnable() {
          @Override
          public void run() {
              try {
                  OkHttpClient client = new OkHttpClient();
                  RequestBody body = new FormBody.Builder().add("address", "jsonxiaohongmao.txt").build();  //不需要address，只是用来演示
                  Request request = new Request.Builder().url("http://api.hclyz.com:81/mf/").post(body).build();
                  Response response = client.newCall(request).execute();
                  String responseData = response.body().string();
                  Log.d(TAG, responseData);
                  runOnUiThread(new Runnable() {
                      @Override
                      public void run() {

                      }
                  });
              }catch (Exception e){
                  e.printStackTrace();
              }
          }
      }).start();
  }
```

* 异步请求
  
```kotlin
val client = OkHttpClient();
val request =
    Request.Builder().url(url).build()
val response = client.newCall(request).execute()

client.newCall(request).enqueue(object: Callback{
    override fun onFailure(call: Call, e: IOException) {
        TODO("Not yet implemented")
    }

    override fun onResponse(call: Call, response: Response) {
        TODO("Not yet implemented")
    }

})
```

* 异步
```kotlin
Thread{
    
}.start()
```

* 返回主线程
```kotlin
Handler(Looper.getMainLooper()).post {

}
```
           
### 使用gson解析json数据
* 导入 `implementation 'com.google.code.gson:gson:2.8.6'`
* 字典数据解析
```kotlin
    {"name":"Tom","age":20}
    Gson gson = new Gson();
    Person person = gson.fromJson(JsonData,Person.class);
```
* 数组解析
```
    [{"name":"Tom","age":20},{"name":"Tom","age":20}]
    List<Person> people = gson.fromJson(JsonData,new TypeToken<List<Person>>(){}.getType());
```
### 使用系统`JSONObject`进行解析
``` 
    JSONObject json = new JSONObject(jsonData)
    JSONArray array = new JSONArray(json.getString("pingtai"))
```

### 如果使用okhttp3.Callback 闭包在返回的数据中使用 `response.body().string()`,注意这里是`string()`
#### 使用okHttp可能遇到的问题
* android studio 3.0以上会报错 Unable to resolve dependency for 
```kotlin
               解决方式：
               把项目中的build.gradle关于allproJects配置搬到app/build.gradle文件中就可以了
                           allprojects {
                               repositories {
                                   google()
                                   jcenter()
                               }
                           }
```

## Glide 图片下载
### 导入第三方库
`implementation 'com.github.bumptech.glide:glide:4.11.0`
### 使用方式
普通的图片下载
```kotlin
Glide.with(holder.anchorView).load(model.getImg()).placeholder(R.drawable.place).into(holder.imgView); //带有预览图
Glide.with(holder.anchorView).load(model.getImg()).into(holder.imgView); //没有预览图
Glide.with(context).load(bean.getShopPic()).error(R.mipmap.ic_launcher).into(viewHolder.ivShopPic); //网络图片加载失败的时候显示预览图
```
加载图片时添加请求头header
```kotlin
GlideUrl glideUrl = new GlideUrl("https://i.mmzztt.com/thumb/2018/07/141730_236.jpg", new LazyHeaders.Builder()
         .addHeader("referer", "https://www.mzitu.com/")
         .build());
 Glide.with(this).load(glideUrl).into(testImg);
 ```

## jsoup HTML网页解析
jsoup是专业的HTML解析库，点击跳入[官方网址](https://jsoup.org/cookbook/extracting-data/dom-navigation)
### 导入第三方库
`implementation 'implementation('org.jsoup:jsoup:1.11.1')`
### 使用
解析HTML需要在异步进行操作
```kotlin
val url = "https://www.mzitu.com/best"
Thread{ //异步
    try {
        val doc =  Jsoup.connect(url).get()
        val listImg = doc.getElementById("pins")
        val liLinks = listImg.getElementsByTag("li")
        val list = mutableListOf<PhotoModel>()
        for (headline in liLinks) {
            val alinks = headline.getElementsByTag("a")[0] //A标签
            val imgs = alinks.getElementsByTag("img") //img标签
            val title =  imgs.attr("alt" )  //获取alt属性
            val imgUrl = imgs.attr("data-original" ) // 获取延迟的图片地址
            val linkUrl = alinks.attr("href") //获取a标签的href属性
            list.add(PhotoModel(imgUrl,title,linkUrl,url))
        }
        Handler(Looper.getMainLooper()).post {  // 回到主线程

        }

    } catch (e: IOException) {
        Log.d("TAG", "getNewData: $e")
        e.printStackTrace()
    }
}.start()
```
### 解析妹子图的网页
```Kotlin
    Thread(Runnable {
        kotlin.run {
            val doc = Jsoup.connect("https://www.mzitu.com/tag/ugirls/page/2/").get()
            val content = doc.getElementById("menu-nav")
            val links = content.getElementsByTag("a")
            Log.d(TAG, "onCreate: + 1 " + doc.title())
            for (headline in links){
                Log.d(TAG, "onCreate: +2 " + headline.attr("title") + headline.absUrl("href"))
                val title =  headline.attr("title");
                val href = headline.absUrl("href")
                titles = titles + DataModel(title,href)
            }

            val listImg = doc.getElementById("pins")
            val liLinks = listImg.getElementsByTag("li")
            for (headline in liLinks){
                val a = headline.getElementsByTag("a")
                val imgs = a.first().getElementsByTag("img")
                Log.d(TAG, "onCreate: + 3 " + imgs.attr("data-original"))
                Log.d(TAG, "onCreate: + 4 " + a.last().attr("title") + a.first().absUrl("href") );
                    photos = photos + PhotoModel("111",a.first().absUrl("href"))
                }
            runOnUiThread { kotlin.run {
                Log.d(TAG, "onCreate: " + titles.last())
            } }
        }
    }).start()
```

## 图片浏览 PhotoView
### app/build.gradle 导入
`implementation 'com.github.chrisbanes:PhotoView:2.1.3'`
### 根目录build.gradle中导入
```kotlin
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
    }
}
```
###  xml中添加控件
```kotlin
<com.github.chrisbanes.photoview.PhotoView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/photo_view"
    ></com.github.chrisbanes.photoview.PhotoView>
```

## 谷歌广告Admob
1. 导入包
`implementation 'com.google.android.gms:play-services-ads:19.1.0'`
2. AndroidManifest.xml文件添加AdMob的应用id
```kotlin
<manifest>
    <application>
        <!-- Sample AdMob App ID: ca-app-pub-3940256099942544~3347511713 -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
    </application>
</manifest>
```
3. 在Activity中调用`initialize()`方法：
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
     super.onCreate(savedInstanceState)
     setContentView(R.layout.activity_main)
     
     MobileAds.initialize(this) {}
 }
```

4. 选择对应的广告格式，普遍通常使用横幅式 和插页式
### 横幅式
1. xml中添加admob
```kotlin
<com.google.android.gms.ads.AdView
    xmlns:ads="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    ads:adSize="SMART_BANNER"
    ads:layout_constraintTop_toTopOf="parent"
    android:id="@+id/ad_view">
</com.google.android.gms.ads.AdView>
```
* ads:adSize - 将此属性设置为要使用的广告尺寸。如果您不想使用该常量定义的标准尺寸，可改为设置自定义尺寸
* ads:adUnitId - 将此属性设置为您应用中用于展示广告的广告单元所用的唯一标识符。如果您要在不同的 Activity 中展示横幅广告，则其中每个都需要一个广告单元,也可以在代码中赋值

2. 项目中使用
```kotlin
ad_view.adUnitId = "ca-app-pub-3940256099942544/6300978111"
ad_view.loadAd(AdRequest.Builder().build())
```
### 插页式
插页式广告通常在关卡中直接使用
```kotlin
mInterstitialAd = InterstitialAd(this)
mInterstitialAd.adUnitId = "ca-app-pub-8177181808824082/8389104912"
mInterstitialAd.loadAd(AdRequest.Builder().build())
```
需要进一步监听广告行为，比如加载、打开、关闭等，可以通过 AdListener 类监听这些事件。
```kotlin
mInterstitialAd.adListener = object: AdListener() {
    override fun onAdLoaded() {
        // Code to be executed when an ad finishes loading.
    }

    override fun onAdFailedToLoad(errorCode: Int) {
        // Code to be executed when an ad request fails.
    }

    override fun onAdOpened() {
        // Code to be executed when the ad is displayed.
    }

    override fun onAdClicked() {
        // Code to be executed when the user clicks on an ad.
    }

    override fun onAdLeftApplication() {
        // Code to be executed when the user has left the app.
    }

    override fun onAdClosed() { // 通常在这里进行加载新的插页式广告
         mInterstitialAd.loadAd(AdRequest.Builder().build())
    }
}
```

## KSYMediaPlayer_Android 金山播放器

### 导入项目地址

```kotlin
android {
    compileSdkVersion 24
    buildToolsVersion '25.0.0'

    defaultConfig {
        applicationId "com.ksyun.player.demo"
        minSdkVersion 16
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
        // 此处很重要，指定APP只使用 armeabi-v7a和arm64-v8a的库
        ndk {
            abiFilters 'armeabi-v7a','arm64-v8a'
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    sourceSets.main {
        jniLibs.srcDirs 'src/main/libs' // 动态库和jar的存放路径
        jni.srcDirs = [] // This prevents the auto generation of Android.mk
    }
}

//引用jcenter
dependencies {
    ...
    implementation 'com.ksyun.media:libksyplayer-java:2.1.2'
    implementation 'com.ksyun.media:libksyplayer-armv7a:2.1.2'
    implementation 'com.ksyun.media:libksyplayer-arm64:2.1.2'
    ...
}

```

### 在 AndroidManifest.xml 文件中添加权限

```kotlin
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```
### xml中引用播放界面

```kotlin
    <com.ksyun.media.player.KSYTextureView
        android:id="@+id/ksy_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:targetApi="ice_cream_sandwich"/>
```

### activity中使用

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //设置监听器
//        ksy_view.setOnBufferingUpdateListener(mOnBufferingUpdateListener);
//        ksy_view.setOnCompletionListener(mOnCompletionListener);
        ksy_view.setOnPreparedListener(mOnPreparedListener);
//        ksy_view.setOnInfoListener(mOnInfoListener);
//        ksy_view.setOnVideoSizeChangedListener(mOnVideoSizeChangeListener);
        ksy_view.setOnErrorListener(mOnErrorListener)
//        ksy_view.setOnSeekCompleteListener(mOnSeekCompletedListener);
        //设置播放参数
        ksy_view.bufferTimeMax = 2.0f;
        ksy_view.setTimeout(5, 30);

        // 循环播放
        ksy_view.isLooping = true

        //设置播放地址并准备
        ksy_view.dataSource = "rtmp://pull.lvpucheng.com/live/6326389_1595117745?txSecret=4c6d27ba4dfcdcd4560c450ffe0642a4&txTime=5F1396A8";
        ksy_view.prepareAsync();
    }

    // 开始播放
    private val  mOnPreparedListener: IMediaPlayer.OnPreparedListener
    get() =
        IMediaPlayer.OnPreparedListener(){
            // 设置视频伸缩模式，此模式为裁剪模式
            ksy_view.setVideoScalingMode(KSYMediaPlayer.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING);
            // 开始播放视频
            ksy_view.start();
        }

    // 停止播放
    private val mStopButton: View.OnClickListener
    get() = View.OnClickListener {
        if(ksy_view != null){
            ksy_view.stop();
        }
    }

    // 播放出现错误
    private val mOnErrorListener: IMediaPlayer.OnErrorListener
    get() = IMediaPlayer.OnErrorListener {
            _, _, _ ->
        true
    }

    // 切换至前后台
    override fun onPause() {
        super.onPause()
        //true表示切换到后台后仍然播放音频
        ksy_view.runInBackground(true);
    }

    override fun onResume() {
        super.onResume()
        ksy_view.runInForeground();
    }

    // 切换视频源，两种方式reload()或者重置播放新的视频
    private fun changeVideoUrl(){
        ksy_view.reload("https://media.w3.org/2010/05/sintel/trailer.mp4",true);
    }


    // 离开activity时对播放器进行销毁
    private  fun videoPlayEnd() {
            //释放播放器
            ksy_view.release()
    }
}
```


## 项目中经常导入的包
```
//viewPager2
implementation 'com.google.android.material:material:1.1.0'

//网络请求
implementation ("com.squareup.okhttp3:okhttp:4.7.2")
// 数据解析
implementation 'com.google.code.gson:gson:2.8.6'
// html解析
implementation('org.jsoup:jsoup:1.11.1')
// 图片下载
implementation 'com.github.bumptech.glide:glide:4.11.0'
// 金山视频播放器
implementation 'com.ksyun.media:libksyplayer-java:2.1.2'
implementation 'com.ksyun.media:libksyplayer-armv7a:2.1.2'
implementation 'com.ksyun.media:libksyplayer-arm64:2.1.2'

// 图片预览
implementation 'com.github.chrisbanes:PhotoView:2.1.3'
// 谷歌广告admob
implementation 'com.google.android.gms:play-services-ads:19.1.0'

// 下拉刷新和recyclerview
implementation 'androidx.recyclerview:recyclerview:1.1.0'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
```
