# Activity
## 创建启动的Activity
```kotlin
<activity android:name=".FitstActivity">
    android:label="This is FirstActivity"  //导航title
    <intent-filter>
        <action android:name="android.intent.action.MAIN" /> // 主activity
        <category android:name="android.intent.category.LAUNCHER" /> //启动时的activity
    </intent-filter>
</activity>
```
## Activity的生命周期
* onCreate(): 第一次被创建，可以在里面加载布局，绑定事件
* onStart():  Activity由不可见变为可见的时候调用
* onResume():  Activity准备好与用户交互，并处于栈顶和运行状态
* onPause(): 系统准备去启动或者恢复另一个Activity的时候调用，通常在这里保存数据，释放消耗CPU的资源
* onStop(): Activity的完全不可见的时候调用
* onDestroy(): 被销毁之前调用
* onRestart(): 由停止状态变为运行状态之前调用
>除onRestart()方法之外，其他都是两两对应
1. 完整生命周期：onCreate() ---onDestroy()
2. 可见生命周期：onStart() --- onStop()
3. 前台生存期： onResume() --- onPause()

## Activity的启动模式
Activity拥有四种启动模式standard、 singleTop、 singleTask 、singleInstance

* standard： 默认的启动模式，不进行显示指定的情况下，都会使用这种。不管Activity已经在栈中，都会重新创建
* singleTop:  如果Activity处于栈顶，点击多少次都会显示原来的Activity，如果用户不处于栈顶，则会重新创建
* singleTask: 每次启动Activity时系统会查找栈中是否包含有该Activity，如果已经存在，则会把该Activity之上的所有Activity活动统统出栈，如果没有则会创建一个新的实例，调用onRestart()方法
* singleInstance: 会启用一个新的栈来管理Activity，解决共享Activity实例的问题

### 设置Activity的启动模式，需要设置`android:launchMode`
```kotlin
<activity android:name=".activity.ShopDetailActivity" 
    android:launchMode="singleInstance">
</activity>
```

## 进制 Activity 横屏切换
横竖屏切换会调用 Avtivity 的 oncreate 方法，一般禁止横竖屏切换有两种方法

第一种，在 AndroidManifest.xml 中注册时禁止横屏
```kotlin
android:screenOrientation="landscape"  // 横屏
android:screenOrientation="portrait"   // 竖屏
 <activity android:name=".ui.activity.PlayActivity" android:screenOrientation="portrait"></activity>
```

第二种，在代码中进行设置
```kotlin
requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE; //横屏设置

requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;  //竖屏设置

requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED; //默认设置

```