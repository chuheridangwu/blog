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
`implementation('org.jsoup:jsoup:1.11.1')`
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

##  BaseRecyclerViewAdapterHelper 基础adapter
导入包
```kotlin
implementation 'com.github.CymChad:BaseRecyclerViewAdapterHelper:3.0.4'

allprojects {
    repositories {
        google()
        jcenter()
        maven { url "https://jitpack.io" }
    }
}
```
### 初始化
`BaseQuickAdapter<T, VH>`为最基础的类型，直接使用`BaseQuickAdapter<T, VH>`即可简单快速实现一个Adapter：
```java
public class DemoAdapter extends BaseQuickAdapter<String, BaseViewHolder> {

    /**
     * 构造方法，此示例中，在实例化Adapter时就传入了一个List。
     * 如果后期设置数据，不需要传入初始List，直接调用 super(layoutResId); 即可
     */
    public DemoAdapter(list List<String>) {
        super(R.layout.layout_demo, list);
    }

    /**
     * 在此方法中设置item数据
     */
    @Override
    protected void convert(@NotNull BaseViewHolder helper, @NotNull String item) {
        helper.setText(R.id.tweetName, "This is an Item, pos: " + (helper.getAdapterPosition() - getHeaderLayoutCount()));
    }
}
```

### 添加点击事件
```java
// 设置点击事件
adapter.setOnItemClickListener(new OnItemClickListener() {
    @Override
    public void onItemClick(@NonNull BaseQuickAdapter adapter, @NonNull View view, int position) {
        Tips.show("onItemClick " + position);
    }
});
```

### 设置view中子view的点击事件,需要先注册点击控件
```java
// 先注册需要点击的子控件id（注意，请不要写在convert方法里）
adapter.addChildClickViewIds(R.id.btn, R.id.iv_num_add, R.id.item_click);
// 设置子控件点击监听
adapter.setOnItemChildClickListener(new OnItemChildClickListener() {
    @Override
    public void onItemChildClick(@NonNull BaseQuickAdapter adapter, @NonNull View view, int position) {
        if (view.getId() == R.id.btn) {
            Tips.show("onItemChildClick " + position);
        }
    }
});
```
### 加载更多
`LoadMoreModule`获取更多数据的接口，需要先实现接口数据`public class LoadMoreAdapter extends BaseQuickAdapter<Status, BaseViewHolder> implements LoadMoreModule`
```java
/**
    * 初始化加载更多
    */
private void initLoadMore() {
    mAdapter.getLoadMoreModule().setOnLoadMoreListener(new OnLoadMoreListener() {
        @Override
        public void onLoadMore() {
            request();
        }
    });
    mAdapter.getLoadMoreModule().setAutoLoadMore(true);
    //当自动加载开启，同时数据不满一屏时，是否继续执行自动加载更多(默认为true)
    mAdapter.getLoadMoreModule().setEnableLoadMoreIfNotFullPage(false);
}

/**
    * 请求数据
    */
private void request() {
    new Request(pageInfo.page, new RequestCallBack() {
        @Override
        public void success(List<Status> data) {
            mSwipeRefreshLayout.setRefreshing(false);
            mAdapter.getLoadMoreModule().setEnableLoadMore(true);

            if (pageInfo.isFirstPage()) {
                //如果是加载的第一页数据，用 setData()
                mAdapter.setList(data);
            } else {
                //不是第一页，则用add
                mAdapter.addData(data);
            }

            if (data.size() < PAGE_SIZE) {
                //如果不够一页,显示没有更多数据布局
                mAdapter.getLoadMoreModule().loadMoreEnd();
                Tips.show("no more data");
            } else {
                mAdapter.getLoadMoreModule().loadMoreComplete();
            }

            // page加一
            pageInfo.nextPage();
        }

        @Override
        public void fail(Exception e) {
            Tips.show(getResources().getString(R.string.network_err));
            mSwipeRefreshLayout.setRefreshing(false);
            mAdapter.getLoadMoreModule().setEnableLoadMore(true);

            mAdapter.getLoadMoreModule().loadMoreFail();
        }
    }).start();
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

## 导入本地library包

第一步把第三方下载到本地，解压，看到library包

接着修改项目中`settings.gradle` 内容，添加library
```
include ':app', ':library'
rootProject.name = "TaoBaoJava"
```

在`app/build.gradle` 下的 `dependencies` 中添加`implementation project(':library')`