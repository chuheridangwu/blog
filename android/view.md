# 常见的控件属性
在使用的过程中，如果不记得控件都拥有什么属性，选中xml界面，点击右上角->Design，使用可视化模式，选择对应的控件，在右侧列表中会显示它对应的属性
* match_parent   让当前空间的大小和父布局的大小一样
* wrap_content   当前空间的大小刚好包含里面的内容
* getLayoutParams()  获取到当前视图的布局，一般用来直接复制，如`mTextView.getLayoutParams().height = 100;`
## ImageView
* src 图片资源
* scaleType  图片的显示模式，用来适配图片
* clickable 是否允许点击
* visibility  显示或者隐藏 visible：可见   invisible：不可见 gone: 隐藏，
```kotlin
imageView.setVisibility(View.GONE);  //代码设置是否可见
imageView.setImageResource(R.drawable.test); 代码中设置图片资源
imageView.setBackgroundColor(getResources().getColor(R.color.blue_color)); //设置背景颜色
// 透明颜色
android:background="@android:color/transparent"
```

## 设置透明
`android:background="#CCFFFFFF"`,其中`FFFFFF`是白色颜色值，`CC`是代表透明度，可以根据以下的值进行改变
```
100% — FF
95% — F2
90% — E6
85% — D9
80% — CC
75% — BF
70% — B3
65% — A6
60% — 99
55% — 8C
50% — 80
45% — 73
40% — 66
35% — 59
30% — 4D
25% — 40
20% — 33
15% — 26
10% — 1A
 5% — 0D
 0% — 00 
```

使用16进制表示
```
tv.setBackgroundColor(0x66000000);
0x（代表16进制）|66（透明度，0为完全透明，ff为不透明）|000000（颜色的16进制码）
```

* orientation: 选择滚动方向 horizontal 水平，默认垂直

## TextView
* textSize   文字大小 16sp
* textStyle 文字字体 bold： 加粗
* textColor  文字颜色   // 文字颜色默认是白色，如果背景也是白色要注意被坑
* gravity   文字是否居中显示 top bottom left right  center,可以使用|同时指定多个值
* isEnabled   是否可以被点击
* maxLines  最大行数
* ellipsize 当字符超过大小时展示的方式

## EditText
* focusable   是否允许获取焦点
* android:imeOptions="actionSearch"  设置确定按钮类型
* android:inputType="text"    设置文本格式


##  代码设置视图宽高比
因为获取的是int类型，需要转换成float类型进行计算，最后使用的是像素，需要计算结果/2，不知道为什么计算的还不是很准确
```kotlin
val video = videoList[position]
val height = video.size.split("x")[1].toFloat()
val width = video.size.split("x")[0].toFloat()
if (context != null) {
    holder.img.layoutParams.height = ((height / width) * context.resources.displayMetrics.widthPixels.toFloat()).toInt() / 2
}
```

## 制作圆角
在app/res/drawable文件目录下，创建corners_bg.xml文件，文件内容
```
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#FFFFFF"></solid>     //  设置填充颜色
    <corners android:radius="3dp"></corners>    // 设置圆角
    <stroke
        android:width="1dp"
        android:color="@color/light_gray"></stroke> //设置边
</shape>

// 制作单个圆角
<corners android:bottomLeftRadius="10dp"
    android:bottomRightRadius="0dp"
    android:topLeftRadius="10dp"
    android:topRightRadius="0dp">
</corners>  
```
在layout使用的控件上，使用`android:background="@drawable/conner_bg"`

## 按钮点击效果（更换图标、背景色等）
安卓点击按钮更换图片，在app/res/drawable路径下，创建一个新的文件`iv_back_selector.xml`文件，文件内容包含选中和未选中的图片
```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/iv_back" android:state_pressed="false"></item>
    <item android:drawable="@drawable/iv_back_selected" android:state_pressed="true"></item>
</selector>
```
在layout文件中，imageView的src属性需要是对应的xml文件，点击需要打开
```
<ImageView
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:src="@drawable/iv_back_selector"
       android:clickable="true"
       ></ImageView>
```
---

## RadioGroup
RadioGroup是一个组view，里面的子容器是RadioButton，单选按钮，按钮点击取消上一个按钮的点击效果需要给每个button起一个id
```java
 <RadioGroup
        android:id="@+id/test_nav_bar"
        android:layout_width="match_parent"
        android:layout_height="49dp"
        android:layout_alignParentBottom="true"
        android:orientation="horizontal"
        >

        <RadioButton
            android:id="@+id/test_home"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:checked="true"  // 默认选中
            android:text="首页"
            android:layout_weight="1" //比例 1：1
            android:button="@null"  //取消前面的o
            android:gravity="center"  // 居中显示
            android:drawableTop="@drawable/selector_test_home_nav" //顶部显示图片
            android:textColor="@drawable/navigation_bar_color"></RadioButton> //显示文字颜色
        <RadioButton
            android:id="@+id/test_selected"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="精选"
            android:layout_weight="1"
            android:button="@null"
            android:gravity="center"
            android:drawableTop="@drawable/selector_test_selected_nav"
            android:textColor="@drawable/navigation_bar_color"></RadioButton>
    </RadioGroup>
```

---

## TabLayout 
```kotlin
    <com.google.android.material.tabs.TabLayout
        android:layout_width="match_parent"
        android:layout_height="30dp"
        app:tabMode="scrollable" // 可以滚动
        app:tabIndicatorColor="@color/colorTabSelected" // 底部滚动条颜色
        app:tabRippleColor="@color/colorTabNormal" // 点击时的颜色
        app:tabTextColor="@color/colorTabNormal" //文字默认颜色
        app:tabSelectedTextColor="@color/colorTabSelected" //文字选中颜色
        app:tabBackground="@color/colorPrimaryDark"  //底部颜色
        android:id="@+id/home_indicator"></com.google.android.material.tabs.TabLayout>
```

---

## 创建底部导航栏
创建底部导航栏，使用的控件`BottomNavigationView`
1. 导入 `implementation 'com.google.android.material:material:1.2.0-alpha03'`
2. xml文件中使用，如果要用的menu文件，在menu文件中创建对应的item

```java
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/main_navigation_bar"
        android:layout_width="match_parent"
        android:layout_height="49dp"
        android:layout_alignParentBottom="true"
        android:background="@color/white"
        app:itemIconTint="@drawable/navigation_bar_color"
        app:itemTextColor="@drawable/navigation_bar_color" // 点击时的颜色
        app:menu="@menu/my_navigation_items" />
```

3. 创建menu文件，首先创建menu文件夹，在文件夹内创建`y_navigation_items.xml`

```java
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@+id/home"  
        android:icon="@mipmap/home_normal"  // 图片
        android:title="@string/text_home"></item> //文字
    <item android:id="@+id/selected"
        android:icon="@mipmap/select_normal"
        android:title="@string/text_Selected"></item>
    <item android:id="@+id/red_packet"
        android:icon="@mipmap/red_packet_normal"
        android:title="@string/text_red_packet"></item>
    <item android:id="@+id/search"
        android:icon="@mipmap/search_normal"
        android:title="@string/text_Search"></item>
</menu>
```

4. 创建点击时的颜色，在`drawable`文件夹中创建`avigation_bar_color.xml`文件

```java
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="@color/colorPrimaryDark" android:state_checked="true"></item>
    <item android:color="@color/colorGrey"></item>
</selector>
```

5. 点击按钮事件

```java
public class MainActivity extends AppCompatActivity {

    private BottomNavigationView mNav;
    private HomeFragment hm;
    private SearchFragment sem;
    private RedPacketFragment rm;
    private SelectedFragment sm;
    private FragmentManager mFm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initFragment();

        initLister();
    }

    private void initFragment() {
         hm = new HomeFragment();
         sm = new SelectedFragment();
         rm = new RedPacketFragment();
         sem = new SearchFragment();
         mNav = findViewById(R.id.main_navigation_bar);
         mFm = getSupportFragmentManager();
         switchFragment(hm); //默认加载首页
    }

    // 监听底部导航栏点击
    private void initLister() {
        mNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.home:
                        LogUtils.d(this,"切换到首页");
                        switchFragment(hm);
                        break;
                    case R.id.selected:
                        LogUtils.d(this,"切换到精选");
                        switchFragment(sm);
                        break;
                    case R.id.red_packet:
                        LogUtils.d(this,"切换到特惠");
                        switchFragment(rm);
                        break;
                    case R.id.search:
                        LogUtils.d(this,"切换到搜索");
                        switchFragment(sem);
                        break;
                }
                return true;
            }
        });
    }
    private BaseFragment laseOneFragment = null;
    private void switchFragment(BaseFragment targetFragment){
        //如果上一个fragment跟当前要切换的fragment是同一个，那么不需要切换
        if (laseOneFragment == targetFragment){
            return;
        }
        // 代码加载fragment
        FragmentTransaction transaction = mFm.beginTransaction();

        //切换fragment逻辑,如果不在transaction则添加，如果已经存在，直接展示，不使用replace()方法进行替换 fragment
        if (!targetFragment.isAdded()){
            transaction.add(R.id.main_page_container,targetFragment);
        }else{
            transaction.show(targetFragment);
        }

        // 如果有上一个 fragment ，隐藏上一个 fragment
        if (laseOneFragment != null){
            transaction.hide(laseOneFragment);
        }

        laseOneFragment = targetFragment;

        // 提交事务
        transaction.commit();
    }

}
```

---
## shape的属性
```kotlin
<?xml version="1.0" encoding="utf-8"?>  
<shape xmlns:android="http://schemas.android.com/apk/res/android"  
    android:shape="rectangle">  
    <!-- rectangle：矩形、圆角矩形、弧形等  
        oval：圆、椭圆  
        line：线、实线、虚线  
        ring：环形 -->  
  
    <corners  <!-- 圆角 只适用于rectangle类型-->  
        android:radius="integer"    <!-- 圆角半径 -->  
        android:bottomLeftRadius="integer"  
        android:bottomRightRadius="integer"  
        android:topLeftRadius="integer"  
        android:topRightRadius="integer" />  
  
    <gradient  <!-- 渐变色 -->  
        <!-- 渐变的角度，线性渐变时才有效，必须是45的倍数 -->  
        android:angle="integer"  
        <!-- 渐变中心的相对X、Y坐标，放射渐变时才有效 -->  
        android:centerX="integer"  
        android:centerY="integer"  
        <!-- 渐变的半径，放射渐变(radial)时才有效-->  
        android:gradientRadius="integer"  
        <!-- 渐变开始、中心、结束的颜色 -->  
        android:startColor="color"  
        android:centerColor="integer"  
        android:endColor="color"  
        <!-- 渐变的类型 linear线性、radial放射、sweep扫描-->  
        android:type=["linear" | "radial" | "sweep"]  
        <!--  是否可在LevelListDrawable中使用 -->  
        android:useLevel=["true" | "false"] />  
  
    <padding  <!-- 设置内容与形状边界的内间距 -->  
        android:left="integer"  
        android:top="integer"  
        android:right="integer"  
        android:bottom="integer" />  
  
    <size  <!-- 大小 -->  
        android:width="integer"  
        android:height="integer" />  
  
    <solid  <!-- 填充的颜色 -->  
        android:color="color" />  
  
    <stroke  <!-- 刻画边线 -->  
        android:width="integer"  
        android:color="color"  
        android:dashWidth="integer"   <!-- 虚线长度 -->  
        android:dashGap="integer" />  <!-- 虚线间隔 -->  
</shape> 
```

## CardView
CardView需要导入`implementation 'com.android.support:cardview-v7:28.0.0'`

* cardUseCompatPadding: 设置默认分割线，背景色设置父类的背景颜色
* cardCornerRadius: 设置圆角
* cardBackgroundColor  背景颜色
* cardElevation 底部阴影



## 使用代码动态创建View
```java
@NonNull
@Override
public InnerHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    // 创建view
    ImageView iv = new ImageView(parent.getContext());
    // 设置宽高
    ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
    iv.setLayoutParams(layoutParams);
    // 设置拉伸
    iv.setScaleType(ImageView.ScaleType.CENTER);
    return new InnerHolder(iv);
}

// 动态添加view，假设使用的是RelativeLayout布局
// 首先获取LayoutParams,然后添加相对布局的属性，之后给view重新设置LayoutParams
RelativeLayout.LayoutParams layoutParams=  new RelativeLayout.LayoutParams(mAdView.getLayoutParams());
layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
// 设置边距,需要是dp
layoutParams.setMargins(0,0,0, SizeUtils.dip2px(getContext(),adHeight));
mAdView.setLayoutParams(layoutParams);
```

## 单位转换工具类 px转dp
单位转换工具类 dp 和 px 之间的关系取决于具体设备上的像素密度,density
`density = px / dp;`

```java
//根据手机分辨率从dp转成px
public class SizeUtils {
    public static int dip2px(Context context,float dpValue) {
        float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }
    //根据手机分辨率从px转成为dip
    public static int px2dip(Context context,float pxValue){
        //获取当前手机的像素密度
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int)(pxValue / scale + 0.5f); //四舍五入取整
    }
}
```

## 使用代码获取Drawable
```java
GradientDrawable selectedDrawable = (GradientDrawable)getContext().getDrawable(R.drawable.shape_indicator_point);
GradientDrawable normalDrawable = (GradientDrawable)getContext().getDrawable(R.drawable.shape_indicator_point);
normalDrawable.setColor(getContext().getColor(R.color.white));
```

## NestedScrollView 嵌套 ReclerView时的冲突问题
当 ReclerView 被嵌套到 NestedScrollView 中时，ReclerView 首先会遇到 **每个item都会被创建的问题**，会增加很大的内存，需要动态设置ReclerView 的高度

```java
// 父类布局，动态设置 RecyclerView 高度
// mHomePagerParent 是包裹  NestedScrollView 的 ViewGroup
// mHomePagerNestedView 是 NestedScrollView，为了获取顶部高度
// mContentList 是 ReclerView，动态设置他的高度是为了防止多个item一起创建
mHomePagerParent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
    @Override
    public void onGlobalLayout() {
        // 获取头部的高度
        int headerHeight = mHomeHeaderContainer.getMeasuredHeight();
        mHomePagerNestedView.setHeaderHeight(headerHeight);

        // 获取RecyclerView的高度
        int measureHeight = mHomePagerParent.getMeasuredHeight();
        LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) mContentList.getLayoutParams();
        layoutParams.height = measureHeight;
        mContentList.setLayoutParams(layoutParams);

        if (measureHeight != 0){
            mHomePagerParent.getViewTreeObserver().removeOnGlobalLayoutListener(this);
        }
    }
});
```

当 ReclerView 滑动时，他顶部的视图不能跟着滚动，需要先给出顶部视图的高度，在  NestedScrollView 视图滚动的位置，如果当前滚动的位小于顶部的高度，在监听到视图滚动时，需要让顶部视图跟随滚动

```java
// 获取顶部视图的高度
public void setHeaderHeight(int headerHeight){
    this.mHeaderHeight = headerHeight;
}
@Override
public void onNestedPreScroll(@NonNull View target, int dx, int dy, @NonNull int[] consumed, int type) {
    if (originScroll < mHeaderHeight){ //如果移动的值小于头部的值
        scrollBy(dx,dy);
        consumed[0] = dx;
        consumed[1] = dy;
    }

    super.onNestedPreScroll(target, dx, dy, consumed, type);
    Log.d("TAG", "onNestedScroll: 2");
}

@Override
protected void onScrollChanged(int l, int t, int oldl, int oldt) { 
    // 获取当前视图滚动的位置
    this.originScroll = t;
    super.onScrollChanged(l, t, oldl, oldt);
}
```

## 设置全屏
设置全屏有两种方式，

第一种直接使用xml文件，在对应的activty中添加 对应的主题，注意： 必须继承自Activity,否则会造成崩溃
```xml
<activity
    android:theme="@android:style/Theme.NoTitleBar.Fullscreen"
    android:name=".ui.activity.BrowseActivity"></activity>
```

```xml
<!-- 全屏显示页面 -->
<activity
    android:name=".ui.FullScreenActivity"
    android:screenOrientation="portrait"
    android:theme="@style/FullScreenTheme">
    <meta-data
        android:name="android.notch_support"
        android:value="true" />
</activity>
```

第二种，使用代码的方式,在创建的时候设置全屏
```java
@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // 设置全屏
    this.requestWindowFeature(Window.FEATURE_NO_TITLE);
    this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);
            
    setContentView(R.layout.activity_browse);
}
```

如果在fragment中动态切换全屏和非全屏，使用添加和清除flags, 这样做会有一个问题，在切换时，因为状态栏的出现和隐藏，会造成界面跳动，这样给用户的体验不太好，使用透明的状态栏会友好一些。
```java
private void switchFullScreen(Fragment fragment){
    //  设置是否是全屏,这样会有一个缺陷，切换fragment的时候界面出现跳动
    if ((fragment instanceof HomeFragment)){
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }else {
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}
```

设置透明状态栏，这样设置的意思是，把全部的界面都给activity使用，包括状态栏
```java
/**
    * 设置状态栏透明
    */
public void setStatusBarTranslucent(Activity activity) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        Window window = activity.getWindow();
        window.setNavigationBarColor(Color.BLACK);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        View decorView = window.getDecorView();
        int option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
        decorView.setSystemUiVisibility(option);
        //透明着色
        window.setStatusBarColor(Color.TRANSPARENT);
    }
}
```


## 禁止横屏
1. 单个页面禁用横屏模式：
在清单文件中加入 `android:screenOrientation="portrait"`

```xml
<activity
    android:name=".activity.CalculateFreightActivity_"
    android:screenOrientation="portrait" />
```

2. 使用代码进制横屏

```java
 @Override
 protected void onCreate(@Nullable Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // 禁用横屏
 }
 ```