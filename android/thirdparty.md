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
           
### 使用gson解析json数据
* 导入 `implementation 'com.google.code.gson:gson:2.8.6'`
* 字典数据解析
```
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


## 项目中经常导入的包
```
//viewPager2
implementation 'com.google.android.material:material:1.1.0'
//noinspection GradleCompatible
implementation 'com.android.support:recyclerview-v7:28.0.0'
//网络请求
implementation ("com.squareup.okhttp3:okhttp:4.7.2")
// 数据解析
implementation 'com.google.code.gson:gson:2.8.6'
// html解析
implementation('org.jsoup:jsoup:1.11.1')
// 图片下载
implementation 'com.github.bumptech.glide:glide:4.11.0'
  // 视频播放
implementation 'com.github.dueeeke.dkplayer:dkplayer-java:3.2.6'
implementation 'com.github.dueeeke.dkplayer:dkplayer-ui:3.2.6'
implementation 'com.github.dueeeke.dkplayer:player-ijk:3.2.6'
// 图片预览
implementation 'com.github.chrisbanes:PhotoView:2.1.3'
// 谷歌广告admob
implementation 'com.google.android.gms:play-services-ads:19.1.0'
```
