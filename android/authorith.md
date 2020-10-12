# 系统权限


## 请求网络权限
只要是网络请求，都需要先在app内请求网络权限

AndroidManifest `manifest` 节点下
`<uses-permission android:name="android.permission.INTERNET"></uses-permission>`

如果是http请求，需要另外在
`application`节点下
`android:usesCleartextTraffic="true"` //允许使用明文请求


## 动态申请权限
```kotlin
private  val REQUEST_CODE = 1
@RequiresApi(Build.VERSION_CODES.M)
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    // 获取是否允许权限
    val permissionResult = checkSelfPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)
    if (permissionResult != PackageManager.PERMISSION_GRANTED){
        requestPermissions(listOf<String>(android.Manifest.permission.READ_EXTERNAL_STORAGE).toTypedArray(),REQUEST_CODE)
    }

}

// 结果返回
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == REQUEST_CODE){ //允许

    }
}
```

## 获取相册权限
```java
// 获取相册权限
private void checkPermission() {
    //检查权限（NEED_PERMISSION）是否被授权 PackageManager.PERMISSION_GRANTED表示同意授权
    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
            != PackageManager.PERMISSION_GRANTED) {
        //用户已经拒绝过一次，再次弹出权限申请对话框需要给用户一个解释
        if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission
                .WRITE_EXTERNAL_STORAGE)) {
            Toast.makeText(this, "请开通相关权限，否则无法正常使用本应用！", Toast.LENGTH_SHORT).show();
        }
        //申请权限
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_PERMISSION_CODE);
    } else {
        Toast.makeText(this, "授权成功！", Toast.LENGTH_SHORT).show();
    }
}
```