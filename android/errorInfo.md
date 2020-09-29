# 常见问题
>Cannot fit requested classes in a single dex file (# methods: 65600 > 65536)

编译报错,方法数量超出一个dex文件数量限制,在app的build.gradle文件的defaultConfig中添加
```
defaultConfig {
        ... ...
        multiDexEnabled true
    }
```

>Error: Invoke-customs are only supported starting with Android O (--min-api 26)

在app的build.gradle文件中android节点下增加：
```
compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8

```

> is not accessible from java.lang.Class android.app.AppComponentFactory

原因是 activity 不是 public ，不能创建实例，class 前加 public就可以解决了

>不能打印过长的log

当打印json数据的时候，经常只能打印一半，剩下的不能显示，是因为android开发工具的打印限制，使用下面方法进行循环打印即可

```kotlin
val tag = "LSG";
var msg: String? = "$data"
val max_str_length = 2001 - tag.length;
                    //大于4000时
while (msg?.length ?: 0 > max_str_length) {
    Log.e(tag, msg?.substring(0, max_str_length));
    msg = msg?.substring(max_str_length);
     }
//剩余部分
Log.e(tag, msg);
```