## 使用网络
android使用网络需要先请求网络权限，配置在`manifest`中` <uses-permission android:name="android.permission.INTERNET"/>`


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
* 使用http的网络请求或者图片
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

## Glide 图片下载
### 导入第三方库
`implementation 'com.github.bumptech.glide:glide:4.11.0`
### 使用方式
普通的图片下载
```kotlin
Glide.with(holder.anchorView).load(model.getImg()).placeholder(R.drawable.place).into(holder.imgView); //带有预览图
Glide.with(holder.anchorView).load(model.getImg()).into(holder.imgView); //没有预览图
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
            val imgs = alinks.getElementsByTag("img")
            val title =  imgs.attr("alt" )
            val imgUrl = imgs.attr("data-original" )
            val linkUrl = alinks.attr("href")
            list.add(PhotoModel(imgUrl,title,linkUrl,url))
        }
        Handler(Looper.getMainLooper()).post {  // 回到主线程
            dataInfos.add(list)
            this.listener(dataInfos)
        }

    } catch (e: IOException) {
        Log.d("TAG", "getNewData: $e")
        e.printStackTrace()
    }
}.start()
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
2. 


## 经常导入的包
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
