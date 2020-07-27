# Retrofit
Retrofit 是一个网络请求类，通过注解的形式进行简化代码

点击查看[Retrofit最新版本](https://github.com/square/retrofit/releases)

![图片来源： 阳光沙滩](https://imgs.sunofbeaches.com/group1/M00/00/0C/rBsADV3xAMuAcjC2AAE3pqYX9Es260.png)
//图片来源： [阳光沙滩](https://www.sunofbeach.net/a/1202592838370578432)

## 请求网络权限
AndroidManifest
`manifest`节点下
`<uses-permission android:name="android.permission.INTERNET"></uses-permission>`

## http， 使用明文请求
`application`节点下
`android:usesCleartextTraffic="true"` //允许使用明文请求

## 导入库
```kotlin
implementation 'com.squareup.retrofit2:retrofit:2.9.0' 
implementation 'com.squareup.retrofit2:converter-gson:2.6.2' //结果转换成json对象
```
## Get 请求
假设有接口`http://api.myhug.cn/z/home`,首先创建一个接口类 API
API类内部用获取的方法
```kotlin
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.GET

interface API {
    // get 请求
    @GET("z/home")
    fun getJson(): Call<ResponseBody>
}
```
// 开始请求
```kotlin
// 创建retrofit
val retrofit = Retrofit.Builder().baseUrl("http://api.myhug.cn/").build()
// 创建server实例
val api = retrofit.create(API::class.java)
val task = api.getJson()
// 开始请求
task.enqueue(object : Callback<ResponseBody>{
    override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
        Log.d("TAG", "onFailure:  + ${t.toString()}")
    }

    override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
        if (response.code() == HttpURLConnection.HTTP_OK){
            // 这里有个坑，response.body()?.string() 只能被调用一次，谨记，打印要记得去掉
            Log.d("TAG", "onResponse: ${response.body()?.string()}")
        }
    }
})
```

## get请求带参数
请求带参数，有@QueryMap
```kotlin
// @Query
@GET("z/home")
fun getWithQueryParams(@Query("page") page: Int): Call<ResponseBody>

// QueryMap
@GET("z/home")
fun getWithQueryMapParams(@QueryMap map: Map<String,String>): Call<ResponseBody>
```

## Post 请求
## 请求参数
## 请求头

## 返回数数据转换成对象
1. 创建数据对象使用插件 java使用gsonformat  kotlin使用JsonKotlin
2. 使用gaon第三方库，在创建请求时，把对应的请求体转过去
```kotlin
// 获取返回数据
val result = response.body()?.string()
val gson = Gson()
val jsonResult = gson.fromJson(result,JsonData::class.java)
```
在请求时直接将数据转成json对象,找一个库进行导入
```
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```
API接口类，直接返回对象
```kotlin
interface API {
    // get 请求
    @GET("z/home")
    fun getJson(): Call<JsonData>
}
```

创建retrofit时，增加json序列化对象
```kotlin
// 创建retrofit
val retrofit = Retrofit.Builder().baseUrl("http://api.myhug.cn/").addConverterFactory(GsonConverterFactory.create()).build()
// 创建server实例
val api = retrofit.create(API::class.java)
val task = api.getJson()
// 开始请求
task.enqueue(object : Callback<JsonData>{
    override fun onFailure(call: Call<JsonData>, t: Throwable) {
        Log.d("TAG", "onFailure:  + ${t.toString()}")
    }

    override fun onResponse(call: Call<JsonData>, response: Response<JsonData>) {
        if (response.code() == HttpURLConnection.HTTP_OK){
            Log.d("TAG", "onResponse: ${response.body()}")
        }
    }

})
```


//[jcenter这里搜索第三方库](https://bintray.com/bintray/jcenter/)


## Url注解
```kotlin
// @Url 注解
@GET()
fun getWithUrl(@Url url: String,@QueryMap map: Map<String,String>): Call<JsonData>

```

## 注解参数
```kotlin

```


## 编译报错
1.译失败：Error: Invoke-customs are only supported starting with Android O (--min-api 26)

```kotlin
build.gradle文件中android节点下增加：

compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        }
```

2. 注意 返回值 `response.body().string()` 只能被调用一次


请求方法注解
请求参数注解
请求头注解
标记注解

## 请求方法注解
| 注解 | 方法含义 |
| --- | --- | 
| @GET | get请求 |
| @POST | post请求 |
| @PUT |  |
| @PATH |  |
| @OPTIONS |  |
| @HEAD |  |
| @HTTP |  |
|  |  |

## 请求参数注解
| 注解 | 方法含义 |
| --- | --- | 
| @Body |  |
| @Filed |  |
| @FiledMap |  |
| @PartMap |  |
| @Part |  |
| @Query |  |
| @QueryMap |  |
| @Url |  |
|  |  |

## 请求头注解
| 注解 | 方法含义 |
| --- | --- | 
| @Header |  |
| @Headers |  |
| @HeaderMap |  |
|  |  |
|  |  |

## 标记注解
| 注解 | 方法含义 |
| --- | --- | 
| @Streaming | 文件流 |
| @Multipart | 上传 |
| @FormUrlEncode | 表单提交 |


```kotlin
interface API {
    // get 请求
    @GET("z/home")
    fun getJson(): Call<JsonData>

    // @Query 注解
    @GET("z/home")
    fun getWithQueryParams(@Query("page") page: Int): Call<ResponseBody>

    // @QueryMap 注解
    @GET("z/home")
    fun getWithQueryMapParams(@QueryMap map: Map<String,String>): Call<JsonData>

    // @Url 注解
    @GET()
    fun getWithUrl(@Url url: String,@QueryMap map: Map<String,String>): Call<JsonData>

    // post 请求 @Body注解
    @POST("post/comment")
    fun postWithBody(@Body body :CommentBody):Call<ResponseBody>

    // post 上传单个文件
    @Multipart
    @POST("/file/upload")
    fun postFile(@Part part: MultipartBody.Part):Call<ResponseBody>

    // 表单提交
    @FormUrlEncoded
    @POST("login")
    fun doLogin(@Field("userName") userName: String,@Field("password") word: String):Call<loginResult>

    // 添加header
    @POST("post/comment")
    fun getHeader(@Header("client") client: String) :Call<ResponseBody>

    // 添加headers
    @Headers("client: android")
    @POST("post/comment")
    fun getHeaders() :Call<ResponseBody>

    // 添加headerMap
    @POST("post/comment")
    fun getHeaderMap(@HeaderMap map: Map<String,String>) :Call<ResponseBody>

    // 文件下载
    @Streaming
    @GET
    fun downFile(@Url url: String) :Call<ResponseBody>
}
```

## post 请求 @Body注解
```kotlin
// post 请求 @Body注解   CommentBody:是一个数据类
@POST("post/comment")
fun postWithBody(@Body body :CommentBody):Call<ResponseBody>
```

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


[Retrofit官方地址](https://square.github.io/retrofit/)


## 上传文件
创建接口，使用part参数
```kotlin
    // post 上传单个文件
    @Multipart
    @POST("/file/upload")
    fun postFile(@Part part: MultipartBody.Part):Call<ResponseBody>
```

进行请求，需要动态申请权限
```kotlin
    fun retrofitPost(){
        // 获取图片地址
        val file = File("/etc/mmi/pass.png")
        val body = RequestBody.create(MediaType.parse("image/png"),file)
        val part = MultipartBody.Part.createFormData("file",file.name,body)

        val retrofit = Retrofit.Builder().baseUrl("http://192.168.11.141:9102/").addConverterFactory(GsonConverterFactory.create()).build()
        val api = retrofit.create(API::class.java)
        val task = api.postFile(part)

        task.enqueue(object :Callback<ResponseBody>{
            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                Log.d("TAG", "onFailure:  + ${t.toString()}")
            }

            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                Log.d("TAG", "onResponse: ${response.body()?.string()}")
            }

        })
    }
```

## 表单提交
```kotlin
    // 表单提交
    @FormUrlEncoded
    @POST("login")
    fun doLogin(@Field("userName") userName: String,@Field("password") word: String):Call<loginResult>
```

请求
```kotlin
    fun login(){
        val retrofit = Retrofit.Builder().baseUrl("http://192.168.11.141:9102/").addConverterFactory(GsonConverterFactory.create()).build()
        val api = retrofit.create(API::class.java)
        val task = api.doLogin("1","2")
        task.enqueue(object :Callback<loginResult>{
            override fun onFailure(call: Call<loginResult>, t: Throwable) {
                Log.d("TAG", "onFailure:  + ${t.toString()}")
            }

            override fun onResponse(call: Call<loginResult>, response: Response<loginResult>) {
                Log.d("TAG", "onResponse: ${response.body()}")
            }

        })
    }
```


## 添加head信息
```kotlin
    @POST("post/comment")
    fun getHeader(@Header("client") client: String) :Call<ResponseBody>

    @Headers("client: android")
    @POST("post/comment")
    fun getHeaders() :Call<ResponseBody>

    @POST("post/comment")
    fun getHeaderMap(@HeaderMap map: Map<String,String>) :Call<ResponseBody>
```

## url路径动态修改
```kotlin
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId);
```