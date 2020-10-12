# 持久化存储
>Android手机的存储分为：**内部存储** 和 **外部储存**，在Android4.4以前，手机机身存储就叫内部存储，插入的SD卡就是外部存储，**在Android4.4之后新的手机不再有外插SD卡的概念**，采取了内置闪存`（eMMC、UFS等）`的方式，所以内部存储和外部存储在新的Android手机上已经在同一个硬件上了。手机机身自带的存储也是外部存储，如果再插入SD卡的话也叫外部存储，现在也几乎没有在采用扩展卡内存这种方式来增加手机存储空间了，除此以外还有一种公有目录存储，它返回的目录全都是共享的公有目录

## 内部存储
内部存储的路径`data/data/包名`,**如果你想将文件存储于内部存储中，那么文件默认只能被你的应用访问到**当一个应用卸载之后，内部存储中的这些文件也被删除。对于这个内部目录，用户是无法访问的，除非获取root权限。

### 获取内部存储路径
* `context.getFilesDir()`获取当前项目文件路径，可以在设置中进行清除
* `context.getCacheDir()`获取缓存文件路径，系统根据存储情况进行清理

### 存储

```java
private void saveUserInfo(String ac, String pw) {
    File dir = this.getFilesDir();
    File saveFile = new File(dir,"info.text");
    try {
        if (!saveFile.exists()){ // 如果没有文件，进行创建
            saveFile.createNewFile();
        }
        FileOutputStream fos = new FileOutputStream(saveFile);
        fos.write((ac + "*" + pw).getBytes());
        fos.close();

    }catch (Exception e){
        e.printStackTrace();
    }
}
```

### 获取存储数据

```java
private void showSaveData() {
    try {
        FileInputStream inputStream = this.openFileInput("info.text");
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String info = bufferedReader.readLine(); // 获取存储的数据
        String[] split = info.split("\\*");

        // 设置数据
        mAccount.setText(split[0]);
        mPassword.setText(split[1]);

    }catch (Exception e){
        e.printStackTrace();
    }
}
```

## SD卡存储
存储路径 `/mnt/sdcard/`,可以使用`adb shell`查看相关路径

SD卡存储需要获得系统授权

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"></uses-permission>
```

### 存储

```java
private void saveUserInfo() {
    File filePath = new File("/mnt/sdcard");
    File saveFile = new File(filePath,"info.text");
    try {
        FileOutputStream fos = new FileOutputStream(saveFile);
        fos.write("test".getBytes());
        fos.close();
    }catch (Exception e){
        e.printStackTrace();
    }
}
```

### 读取
因为各大厂商的原因，sd卡的名称不一样，使用`Environment.getExternalStorageDirectory()` 方法获取存储卡路径。

```java
private void saveUserInfo() {
    File sdFile = Environment.getExternalStorageDirectory();
    File saveFile = new File(sdFile,"info.text");

    try {
        FileInputStream inputStream =  new FileInputStream(saveFile);
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String info = reader.readLine();
        Log.d(TAG, "获取sd卡存储的数据: " + info);

    }catch (Exception e){
        e.printStackTrace();
    }
}
```

### 获取sd卡的可用空间
```java
File exFile = Environment.getExternalStorageDirectory();
long freeSpace = exFile.getFreeSpace();
String size = Formatter.formatFileSize(this,freeSpace);
```

## SharedPreferences
`SharedPreferences`也属于内部存储,以`xml`文件形式进行保存，存储路径`/data/data/包名/shared_prefs`文件夹下


### 存储方法

mSharedPreferences 是一个私有变量`private SharedPreferences mSharedPreferences;`

```java
// 1. 获取SharedPreferences
mSharedPreferences = this.getSharedPreferences("setting",MODE_PRIVATE);

// 2. 进入编辑模式
SharedPreferences.Editor edit = mSharedPreferences.edit();

// 3. 保存数据
edit.putBoolean("state",false);

// 4. 提交编辑器
edit.commit();

// 获取存储的值
mSharedPreferences.getBoolean("state",false)
```

## 存储对象时，如果需要转存对象
```java
// 调用方式
List<Game> gameList = GsonUtil.getObjects(data, Game[].class);

// 使用Gson进行解析List对象
public static <T> ArrayList<T> getObjects(String s, Class<T[]> clazz) {
    ArrayList<T> ts = new ArrayList<😠);
    try {
        T[] arr = new Gson().fromJson(s, clazz);
        ts.addAll(Arrays.asList(arr));
    } catch (Exception ignore) {
    }
    return ts;
}
```

## 两个不同的实体类保存在一个数组中如何取
两个不同的实体类实现一个接口，保存数据时保存的是两个不同的实体类，在获取数据的时候，需要先转成 HashMap ,判断 map 中是否包含某个类的字段，如果包含，就是某个类
```java
// 实体类
public static class FeedsBean implements IBasePhotoInfo {
    private String image_large;
    private String image_thumb;
}

public static class ItemsBean implements IBasePhotoInfo {
    private String thumbUrl;
    private String smallThumbUrl;
}

// 读取
public List<IBasePhotoInfo> getPhotos(String key){
    String json = mSharedPreferences.getString(key,null);

    List<IBasePhotoInfo> photos = new ArrayList<>();

    // 定义转换类型
    Type type = new TypeToken<List<HashMap>>(){}.getType();
    List<HashMap> maps =mGson.fromJson(json, type);

    for (HashMap map : maps) {
        if (map.get("image_large") != null){
            FeedsBean feedsBean = new FeedsBean();
            feedsBean.setImage_large((String)map.get("image_large"));
            feedsBean.setImage_thumb((String)map.get("image_thumb"));
            photos.add(feedsBean);
        }else if (map.get("smallThumbUrl") != null){
            ItemsBean itemsBean = new ItemsBean();
            itemsBean.setSmallThumbUrl((String)map.get("smallThumbUrl"));
            itemsBean.setThumbUrl((String)map.get("thumbUrl"));
            photos.add(itemsBean);
        }
    }
    Log.d("TAG", "getPhotos: " + maps.toString());

    return photos;
}
```


## 参考网址
[Android-文件存储目录](https://cloud.tencent.com/developer/article/1551994)