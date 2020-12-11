# 常见问题

> 打开项目一直卡顿，需要在编译前进入build.gradle文件中将`google()`修改代码

```kotlin
maven { url 'https://maven.aliyun.com/repository/public' }
maven { url 'https://maven.aliyun.com/repository/google' }
```

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

> 调试时手机打开app一直显示waiting for debugger，进不去app界面

重启手机

> android10 模拟器读取相机图片时报错：
FileNotFoundException(/storage/emulated/0/DCIM/Camera/xx.jpg: open failed: EACCES (Permission denied))

在下载图片前期已经申请了存储权限，代码中也动态申请过权限，报错的原因是因为在iOS10中，**必须要做分区存储的适配**
```xml
暂时性的解决方案，暂时不做分区存储：
AndroidManifest.xml 中 配置requestLegacyExternalStorage 即可

<application
        android:requestLegacyExternalStorage="true">  
```

>debug运行时，程序没有出现崩溃，在release打包的时候，程序出现了崩溃无法使用

原因是自己只对打包的时候使用了代码混淆，但是并没有写入混淆规则，导致只有release包崩溃。解决方案，在app/build.gradle文件中，导入自己的签名文件和对应的账号密码。并且配置debug和release一样的环境，这样以后就可以减少因为环境不一样导致的崩溃问题
```
signingConfigs {
        debug {
                storeFile file("../photoalbum.keystore") //签名文件，放在了project目录下
                storePassword "photo"
                keyAlias "photoalbumalias"
                keyPassword "photo"
        }
        release {
                storeFile file("../photoalbum.keystore")
                storePassword "photoalbum123"
                keyAlias "photoalbumalias"
                keyPassword "photoalbum123"
        }
}

buildTypes {
        release {
                minifyEnabled false
                shrinkResources false
                proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }

        debug{
                minifyEnabled false
                shrinkResources false
                proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
}
```