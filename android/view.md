# 常见的控件属性
在使用的过程中，如果不记得控件都拥有什么属性，选中xml界面，点击右上角->Design，使用可视化模式，选择对应的控件，在右侧列表中会显示它对应的属性
* match_parent   让当前空间的大小和父布局的大小一样
* wrap_content   当前空间的大小刚好包含里面的内容
* getLayoutParams()  获取到当前视图的布局，一般用来直接复制，如`mTextView.getLayoutParams().height = 100;`
## ImageView
* src 图片资源
* scaleType  图片的显示模式，一般用来适配图片
* clickable 是否允许点击
* visibility  显示或者隐藏 visible：可见   invisible：不可见 gone: 隐藏，
```kotlin
imageView.setVisibility(View.GONE);  //代码设置是否可见
imageView.setImageResource(R.drawable.test); 代码中设置图片资源
imageView.setBackgroundColor(getResources().getColor(R.color.blue_color)); //设置背景颜色
// 透明颜色
android:background="@android:color/transparent"
```

## TextView
* textSize   文字大小 16sp
* textStyle 文字字体 bold： 加粗
* textColor  文字颜色
* gravity   文字是否居中显示 top bottom left right  center,可以使用|同时指定多个值



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
