# ViewPage2
使用ViewPage2需要导入包
`implementation 'com.google.android.material:material:1.1.0'`

在xml中，如果有多个分类，使用tablayout布局
```
<com.google.android.material.tabs.TabLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/main_tabs"
    app:layout_constraintTop_toTopOf="parent"></com.google.android.material.tabs.TabLayout>

<androidx.viewpager2.widget.ViewPager2
    android:layout_width="match_parent"
    android:layout_height="0dp"
    app:layout_constraintTop_toBottomOf="@id/main_tabs"
    app:layout_constraintBottom_toBottomOf="parent"
    android:id="@+id/main_viewpager"></androidx.viewpager2.widget.ViewPager2>
```

创建
