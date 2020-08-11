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

* orientation: 选择滚动方向 horizontal 水平，默认垂直

## TextView
* textSize   文字大小 16sp
* textStyle 文字字体 bold： 加粗
* textColor  文字颜色
* gravity   文字是否居中显示 top bottom left right  center,可以使用|同时指定多个值
* isEnabled   是否可以被点击

## EditText
* focusable   是否允许获取焦点

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