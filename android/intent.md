# Intent

>Intent初始化传入两个值，一个是当前上下文，一个是目标类 
>Intent(Context packageContext, Class<?> cls) 
## 隐式Intent
* 需要在AndroidMaininfest.xml文件中要启动的activity中设置
```kotlin
<activity android:name=".SecondActivity">
<intent-filter>
    <action android:name="com.example.ACTION_START"></action> //action只能有一个，category可以有多个，默认是DEFAULT
    <category android:name="android.intent.category.DEFAULT"></category>
    </intent-filter>
</activity>
```

* 跳转
```kotlin
val intent = Intent("com.example.ACTION_START");
intent.addCategory("android.intent.category.DEFAULT"); // 这里可以不写，因为默认就是这个，如果是自定义的需要写
startActivity(intent);
```
       
* 隐式Intent调用系统web界面
```kotlin
val intent =  Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("https://www.baidu.com"));
startActivity(intent);
```

## 显示Intent
```kotlin
val intent = Intent(context,PhotoShowActivity::class.java)
startActivity(intent)
```

## Intent传参

### Intent 普通传参 putExtra()
 A跳转B , B获取A传递的值
```kotlin
// A 跳转到 B
val intent = Intent(FitstActivity.this,SecondActivity::class.java); //A的代码
intent.putExtra("extra_data","Hello SecondAvtivity"); //传递简单的字符或者book值可以，如果传自定义对象，需要对象使用Serializable  或者 Parcelable 进行序列化
startActivity(intent);

// B 获取到A Intent的数据
val intent = getIntent();
val data = intent.getStringExtra("extra_data");
```

### Intent 带回调传参 startActivityForResult
* A 跳转到B， B返回到A数据
>A 跳转B 使用startActivityForResult()方法，传入inten和请求码,在onActivityResult()方法中接收返回的数据,requestCode是请求码，resultCode是返回结果

```java
Intent intent = new  Intent(FitstActivity.this,SecondActivity.class);
intent.putExtra("extra_data","Hello SecondAvtivity");
startActivityForResult(intent,1);

@Override //回调收B传回的值
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    switch (requestCode) {
        case 1:
            if (resultCode == RESULT_OK) {
                String resturnData = data.getStringExtra("data_return");
                Log.d("TAG", resturnData);
            }
    }
}
```

* B返回数据到A，在点击方法中可以直接调用

```java
Intent intent = new Intent();
intent.putExtra("data_return","hello first");
setResult(RESULT_OK,intent);
finish();
```

* 如果用户直接调用系统的返回按钮，需要在B重写`onBackPressed()`方法   
 
```java
public void onBackPressed() {
    super.onBackPressed();
    Intent intent = new Intent();
    intent.putExtra("data_return","hello first");
    setResult(RESULT_OK,intent); //两个参数，第一个是向上一个activity返回结果，第二个参数是带有数据的Intent
    finish();  //销毁当前activity
}
```

### Intent 传递数组对象
使用intent传递对象时，需要对象进行序列`Parcelable`或者`Serializable`,官方更推荐我们使用`Parcelable`
```kotlin
// 传递
val intent = Intent(context,PhotoShowActivity::class.java)
intent.putExtra("linkurl",model.link)
intent.putExtra("position",position)
intent.putExtra("datas",ArrayList<Parcelable>(datas)) //datas是mutablelist对象
context.startActivity(intent)

// 接收
val position = intent.getIntExtra("position",0)
val datas = intent.getParcelableArrayListExtra<PhotoModel>("datas")
```
####  Parcelable 和 Serializable的区别
Serializable（Java自带）：表示将一个对象转换成可存储或可传输的状态。序列化后的对象可以在网络上进行传输，也可以存储到本地。
Parcelable：将一个完整的对象进行分解，分解后的每一部分都是Intent所支持的数据类型，这样实现传递对象的功能了。

