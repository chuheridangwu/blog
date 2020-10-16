# AdMob
admob是谷歌广告，分为横幅广告、插页式广告、原声广告、激励广告。

广告主要显示过程是 注册、初始化、请求广告、显示。如果有业务需要在某个时间点进行实现，可以监听广告的每个过程

实例id
```kotlin
<!-- Sample AdMob App ID: ca-app-pub-3940256099942544~3347511713 -->
横幅广告测试id： ca-app-pub-3940256099942544/6300978111
插页式广告测试id：ca-app-pub-3940256099942544/1033173712 
```

## 导入包
`implementation 'com.google.android.gms:play-services-ads:19.1.0'`

##  AndroidManifest.xml文件添加AdMob的应用id
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
## 初始化
在Activity中调用`initialize()`方法：
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
     super.onCreate(savedInstanceState)
     setContentView(R.layout.activity_main)
     
     MobileAds.initialize(this) {}
 }
```

## 横幅式
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

## 插页式

插页式广告通常在关卡中直接使用，根据需要在制定位置进行显示广告，显示前需要判断是否加载完成，用户关闭后，在监听方法中加载新的插页广告

1. 初始化
```kotlin
mInterstitialAd = InterstitialAd(this)
mInterstitialAd.adUnitId = "ca-app-pub-8177181808824082/8389104912"
mInterstitialAd.loadAd(AdRequest.Builder().build())
```

2. 可以根据需要进一步监听广告行为，比如加载、打开、关闭等，可以通过 AdListener 类监听这些事件。
```kotlin
mInterstitialAd.adListener = object: AdListener() {
    override fun onAdLoaded() { //	广告加载完成
        // Code to be executed when an ad finishes loading.
    }

    override fun onAdFailedToLoad(errorCode: Int) { //加载失败
        // Code to be executed when an ad request fails.
    }

    override fun onAdOpened() {
        // Code to be executed when the ad is displayed.
    }

    override fun onAdClicked() { // 点击
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

3. 显示广告
```kotlin
if (mInterstitialAd.isLoaded) { // 
    mInterstitialAd.show()
} else {
    Log.d("TAG", "The interstitial wasn't loaded yet.")
}
```

## 加载失败原因
| errorcode | 值 | 原因 |
| --- | --- | --- |
| ERROR_CODE_INTERNAL_ERROR | 0 | 内部出现问题；例如，收到广告服务器的无效响应 |
| ERROR_CODE_INVALID_REQUEST | 1 | 广告请求无效；例如，广告单元 ID 不正确 |
| ERROR_CODE_INTERNAL_ERROR | 2 | 由于网络连接问题，广告请求失败 |
| ERROR_CODE_NO_FILL | 3 | 广告请求成功，但由于缺少广告资源，未返回广告 |