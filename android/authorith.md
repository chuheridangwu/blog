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