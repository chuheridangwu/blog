# 约束布局
##  添加依赖
```kotlin
implementation 'com.android.support.constraint:constraint-layout:1.1.3'
```
## 常见的属性
```kotlin
layout_constraintLeft_toLeftOf   //自己的左边在对应视图的左边 ，前边的left是自己的，toLeftOf 是对应视图的
layout_constraintLeft_toRightOf  //自己左侧对应视图右侧
layout_constraintRight_toLeftOf
layout_constraintRight_toRightOf
layout_constraintTop_toTopOf
layout_constraintTop_toBottomOf
layout_constraintBottom_toTopOf
layout_constraintBottom_toBottomOf
layout_constraintBaseline_toBaselineOf //文本基线，如果两个文本高度不一样，但是希望他们对齐，可以使用这个
layout_constraintStart_toEndOf
layout_constraintStart_toStartOf
layout_constraintEnd_toStartOf
layout_constraintEnd_toEndOf
```
## 常见的约束方式
### 角度定位
```kotlin
app:layout_constraintCircle="@id/textView_2" //对应的视图
app:layout_constraintCircleAngle="120"         // 角度
app:layout_constraintCircleRadius="150dp"       // 跟视图的距离
```
### 边距 margin
```kotlin
android:layout_marginLeft="10dp"
android:layout_marginTop="10dp"
注意：如果只是单纯的设置间距是没有效果的，需要先找到视图的相对定位
```
### 跟可能会隐藏的控件间距
```kotlin
app:layout_goneMarginLeft="10dp" //可能隐藏的控件
```
### 居中
```kotlin
app:layout_constraintLeft_toLeftOf="parent"
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"
app:layout_constraintRight_toRightOf="parent"
```
### 偏移
```kotlin
控件给出相对位置之后，可以进行偏移,必须有相对位置才有效
android:layout_marginLeft="150dp"
app:layout_constraintLeft_toLeftOf="parent"
app:layout_constraintRight_toRightOf="parent"

水平偏移
app:layout_constraintVertical_bias="0.8"    //垂直
app:layout_constraintHorizontal_bias="0.8" // 水平
app:layout_constraintLeft_toLeftOf="parent"
app:layout_constraintRight_toRightOf="parent"
```
### 尺寸约束
```kotlin
当使用wrap_content给出高度或者宽度时，可以使用android:minWidth / android:minHeight或者
android:maxWidth/android:maxHeight来显示最小或者最大宽高

宽和高使用0dp来配合约束
app:layout_constraintDimensionRatio="1:1" //宽或者高为0时，可以直接设置比例
app:layout_constraintDimensionRatio="H,2:1" //高2 宽1
app:layout_constraintDimensionRatio="W,2:1" // 宽2 高1
```

### 链，如果控件在一条线上，可以当做一个链，有横链和纵链
```kotlin
<TextView
    android:id="@+id/TextView1"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toLeftOf="@+id/TextView2" />

<TextView
    android:id="@+id/TextView2"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:layout_constraintLeft_toRightOf="@+id/TextView1"
    app:layout_constraintRight_toLeftOf="@+id/TextView3" />

<TextView
    android:id="@+id/TextView3"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:layout_constraintLeft_toRightOf="@+id/TextView2"
    app:layout_constraintRight_toRightOf="parent" />
```
在链头设置layout_constraintHorizontal_chainStyle属性，三个值可以设置
spread： 空格 控件 空格 控件 空格 控件 空格
spread_inside: 控件 空格 控件 空格 控件
packet: 空格 控件控件控件 空格

layout_constraintHorizontal_weight： 设置每个控件的权重 设置水平权重时先设置控件宽 layout_width=0dp
layout_constraintVertical_weight:  设置每个控件的权重 设置水平权重时先设置控件宽 layout_Height=0dp
