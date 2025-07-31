# Fragment
Fragment 的初衷是为了适应大屏幕的平板电脑，Fragment 终托管在 Activity 中，其生命周期直接受宿主 Activity 生命周期的影响。例如，当 Activity 暂停时，Activity 的所有片段也会暂停；当 Activity 被销毁时，所有片段也会被销毁。

Fragment有两种加载方式、动态加载和静态加载

自定义的 fragment 类继承自 Fragment

kotlin 中定义在 Fragment.xml 中的控件，不能在 `onCreatView()`方法中直接使用定义的id来，需要先赋值，Activity中可以直接使用控件id
```kotlin
val rootView =  inflater.inflate(R.layout.fragment_left,container,false)
val textView = rootView.findViewById<TextView>(R.id.fragment_text)
te.text = "哇哈哈哈，我拿到这里面的控件了"
```

## fragment的注意点
* Fragment依赖于Activity，不能独立存在
* 一个Activity可以有多个Fragment
* 一个Fragment可以被多个Activity重用
* Fragment有自己的生命周期，并能接收输入事件
* 可以在Activity运行时动态地添加或删除Fragment

## 静态加载 fragment
1. 创建fragment对应的xml文件，比如 `fragment_home.xml`

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="Button"
        />
</LinearLayout>
```
2. 创建对应的 `HomeFragment` 类，继承自 `Fragment`

```kotlin
class HomeFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, 
		container: ViewGroup?, 
		savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.ragment_home, container, false)
    }

}
```

3. 在 activity_main.xml 文件中引入 fragment 
   
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <fragment
        android:id="@+id/leftFrag"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:name="com.cool.testkotlin.FragmentLeft"></fragment>

</LinearLayout>
```



## 动态加载 FrameLayout

1.  在 activity_main.xml 文件中引入 fragment 

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/right"></FrameLayout>

</LinearLayout>
```


1. MainActivity 动态加载 Fragment 

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener {
            replaceFragment(HomeFragment())
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = supportFragmentManager
        val transaction = fragmentManager.beginTransaction()
        transaction.replace(R.id.rightLayout, fragment)
        transaction.commit()
    }

}
```

1. 动态加载 fragmnet 的步骤
* 创建fragment的实例
* 获取 FragmentManager,在Activity中直接调用 `getSupportFragmentManager()` 获取
* 开启一个事务，通过调用`manager.beginTransaction()`方法开启
* 向容器内添加或者替换 Fragment, 一般使用`replace()` 方法实现，需要传入容器id和代提那家的 fragment 实例
* 提交事务，调用 `commit()`方法

## 传值
### fragment之间的传值

### fragment与activity之间的传值

## 生命周期

* onAttach() 当Fragment和Activity建立关联时调用。
* onCreateView() 为Fragment创建视图（加载布局）时调用。
* onActivityCreated() 确保与Fragment相关联的Activity已经创建完毕时调用。
* onDestroyView() 当与Fragment关联的视图被移除时调用。
* onDetach() 当Fragment和Activity解除关联时调用。


## 使用findViewById
fragment中可以直接使用`getView().findViewById(R.id.btn)`，fragment可以直接获取到`context`

```kotlin
ksy_view = view?.findViewById(R.id.ksy_view) ?: KSYTextureView(context)
```

## java提交fragment

```java
private void initView() {
    // 创建fragment
    HomeFragment home = new HomeFragment();
    // 获取fragment管理器
    FragmentManager manager = getSupportFragmentManager();
    // 开启事务
    FragmentTransaction transaction =  manager.beginTransaction();
    // 添加 或 替换 fragment
    transaction.add(R.id.main_page_container,home);
    // 提交事务
    transaction.commit();
}
```