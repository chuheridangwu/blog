# AdMob
admob是谷歌广告，分为横幅广告、插页式广告、原声广告、激励广告。

广告主要显示过程是 注册、初始化、请求广告、显示。如果有业务需要在某个时间点进行实现，可以监听广告的每个过程

谷歌提供的测试id
```kotlin
<!-- Sample AdMob App ID: ca-app-pub-3940256099942544~3347511713 -->
横幅广告测试id： ca-app-pub-3940256099942544/6300978111
插页式广告测试id：ca-app-pub-3940256099942544/1033173712
原生广告id： ca-app-pub-3940256099942544/2247696110 
```

## 导入包
`implementation 'com.google.android.gms:play-services-ads:19.4.0'`

##  AndroidManifest.xml文件添加AdMob的应用id
```kotlin
<manifest>
    <application>
        <!-- Sample AdMob App ID: ca-app-pub-3940256099942544~3347511713 -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>
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
横幅广告分为四种，普通横幅广告、自适应横幅广告、智能横幅广告和原生广告
### 自适应横幅广告
1. 使用代码添加自适应横幅广告，宽高比的那种，横幅大小： 提供的宽度 x 自适应高度
```java
public class MyActivity extends AppCompatActivity {

    private FrameLayout adContainerView;
    private AdView adView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_my);

    // Initialize the Mobile Ads SDK.
    MobileAds.initialize(this, new OnInitializationCompleteListener() {
        @Override
        public void onInitializationComplete(InitializationStatus initializationStatus) { }
    });

    adContainerView = findViewById(R.id.ad_view_container);
    // Step 1 - Create an AdView and set the ad unit ID on it.
    adView = new AdView(this);
    adView.setAdUnitId("ca-app-pub-3940256099942544/6300978111");
    adContainerView.addView(adView);
    loadBanner();
    }

    //  请求banner
    private void loadBanner() {
    // Create an ad request. Check your logcat output for the hashed device ID
    // to get test ads on a physical device, e.g.,
    // "Use AdRequest.Builder.addTestDevice("ABCDE0123") to get test ads on this
    // device."
    AdRequest adRequest =
        new AdRequest.Builder().build();

    AdSize adSize = getAdSize();
    // Step 4 - Set the adaptive ad size on the ad view.
    adView.setAdSize(adSize);
    

    // Step 5 - Start loading the ad in the background.
    adView.loadAd(adRequest);
    }

    //  横幅宽高
    private AdSize getAdSize() {
    // Step 2 - Determine the screen width (less decorations) to use for the ad width.
    Display display = getWindowManager().getDefaultDisplay();
    DisplayMetrics outMetrics = new DisplayMetrics();
    display.getMetrics(outMetrics);

    float widthPixels = outMetrics.widthPixels;
    float density = outMetrics.density;

    int adWidth = (int) (widthPixels / density);

    // Step 3 - Get adaptive ad size and return for setting on the ad view.
    return AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(this, adWidth);
    }
}
```
* ads:adSize - 将此属性设置为要使用的广告尺寸。如果您不想使用该常量定义的标准尺寸，可改为设置自定义尺寸
* ads:adUnitId - 将此属性设置为您应用中用于展示广告的广告单元所用的唯一标识符。如果您要在不同的 Activity 中展示横幅广告，则其中每个都需要一个广告单元,也可以在代码中赋值

2. 监听加载
```java
mAdView.setAdListener(new AdListener() {
    @Override
    public void onAdLoaded() {
        // 广告加载完成后，系统会执行 onAdLoaded() 方法。例如，如果您想将为 Activity 或 Fragment 添加 AdView 的操作推迟到您确定广告会加载时再执行，就可以通过此方法做到。
    }

    @Override
    public void onAdFailedToLoad(LoadAdError adError) {
        // onAdFailedToLoad() 是唯一包含参数的方法。LoadAdError 类型的错误参数描述了发生的错误
    }

    @Override
    public void onAdOpened() {
        // 用户点按广告时，系统会调用此方法。
    }

    @Override
    public void onAdClicked() {
        // 此方法在 onAdOpened() 之后调用，具体是在用户点击打开其他应用（例如 Google Play），从而在后台运行当前应用时调用。
    }

    @Override
    public void onAdLeftApplication() {
        // 此方法在 onAdOpened() 之后调用，具体是在用户点击打开其他应用（例如 Google Play），从而在后台运行当前应用时调用。
    }

    @Override
    public void onAdClosed() {
        // 用户在查看了广告的目标网址后返回应用时，系统会调用此方法。应用可以使用此方法恢复暂停的活动，或执行任何其他必要的操作，以做好互动准备。如需了解 Android API Demo 应用中的广告监听器方法是如何实现的，
    }
});
```

### 智能横幅广告
界面中使用，尺寸需要是 "SMART_BANNER"
```xml
<com.google.android.gms.ads.AdView
    xmlns:ads="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    ads:adSize="SMART_BANNER"
    ads:adUnitId="ca-app-pub-3940256099942544/6300978111">
</com.google.android.gms.ads.AdView>
```

代码添加的方式
```java
AdView adView = new AdView(this);
adView.setAdSize(AdSize.SMART_BANNER);
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

## 原生广告

原生广告是一种跟原有布局相兼容的广告，自由度比较高，可以自己定制模板，也可以使用谷歌提供的模板。[点击跳转到下载地址](https://github.com/googleads/googleads-mobile-android-native-templates)

谷歌提供的模板有两种，一个小的横幅模板`@layout/gnt_small_template_view`，一个大的正方形模板`@layout/gnt_medium_template_view`，适合放在启动页或者其他空白处较多的地方。

布局文件，使用`TemplateView`显示资源
```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <!--  This is your template view 加载小图 -->
    <com.google.android.ads.nativetemplates.TemplateView
        android:id="@+id/my_template"
    app:gnt_template_type="@layout/gnt_small_template_view" 
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
</LinearLayout>
```

加载数据
```java
AdLoader adLoader = new AdLoader.Builder(getContext(), "ca-app-pub-3940256099942544/2247696110")
        .forUnifiedNativeAd(unifiedNativeAd -> {
            NativeTemplateStyle styles = new
                    NativeTemplateStyle.Builder().withMainBackgroundColor(new ColorDrawable(0x03DAC5)).build();
            TemplateView template = baseViewHolder.getView(R.id.my_template);
            template.setStyles(styles);
            template.setNativeAd(unifiedNativeAd);
        })
        .build();

adLoader.loadAd(new AdRequest.Builder().build());
```


## 加载失败原因
| errorcode | 值 | 原因 |
| --- | --- | --- |
| ERROR_CODE_INTERNAL_ERROR | 0 | 内部出现问题；例如，收到广告服务器的无效响应 |
| ERROR_CODE_INVALID_REQUEST | 1 | 广告请求无效；例如，广告单元 ID 不正确 |
| ERROR_CODE_INTERNAL_ERROR | 2 | 由于网络连接问题，广告请求失败 |
| ERROR_CODE_NO_FILL | 3 | 广告请求成功，但由于缺少广告资源，未返回广告 |