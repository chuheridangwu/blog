# Retrofit
Retrofit 是一个网络请求类，通过注解的形式进行简化代码,网络请求需要申请权限，点击查看[网络权限申请](/android/authorith.md)

点击查看[Retrofit最新版本](https://github.com/square/retrofit/releases)

[Retrofit官方地址](https://square.github.io/retrofit/)

[jcenter这里搜索第三方库](https://bintray.com/bintray/jcenter/)

## 导入库
```kotlin
implementation 'com.squareup.retrofit2:retrofit:2.9.0' 
implementation 'com.squareup.retrofit2:converter-gson:2.6.2' //返回数据转换成json对象
```
## Get 请求示例
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

## 返回数数据转换成对象

1. 创建数据对象使用插件 **java使用gsonformat  kotlin使用JsonKotlin**
2. 使用gson第三方库，在创建请求时，把对应的请求体转过去

```kotlin
// 获取返回数据
val result = response.body()?.string()
val gson = Gson()
val jsonResult = gson.fromJson(result,JsonData::class.java)
```
简单点的方法是直接在网络请求时，要求返回一个对象，使用gson第三方库完成
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

## 接口注解示范
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

    // post 请求 @Body注解 CommentBody是一个数据类
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

    // 动态修改请求路径
    @GET("group/{id}/users")
    fun groupList(@Path("id") groupId: Int):Call<ResponseBody>;
}
```

## 注解
### 请求方法注解
@GET @POST @DELETE @PUT @PATH @OPTIONS @HEAD 

### 请求参数注解
| 注解 | 方法含义 |
| --- | --- | 
| @Body | Post提交数据时的body |
| @Filed | Post提交数据时的表单字段 |
| @FiledMap | Post提交数据时的表单字段集合 |
| @PartMap | 上传文件和参数时 |
| @Part | 上传文件时使用 |
| @Query | url参数 |
| @QueryMap | url参数集合 |
| @Url | 请求路径 |

### 请求头注解
请求头header有三种注解方式，@Header、@Headers、@HeaderMap

### 标记注解
| 注解 | 方法含义 |
| --- | --- | 
| @Streaming | 文件流 |
| @Multipart | 上传 |
| @FormUrlEncode | 表单提交 |

## 编译报错
1.译失败：Error: Invoke-customs are only supported starting with Android O (--min-api 26)

```kotlin
build.gradle文件中android节点下增加：

compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        }
```

2. **注意 返回值 `response.body().string()` 只能被调用一次**

![图片来源： 阳光沙滩](https://imgs.sunofbeaches.com/group1/M00/00/0C/rBsADV3xAMuAcjC2AAE3pqYX9Es260.png)
//图片来源： [阳光沙滩](https://www.sunofbeach.net/a/1202592838370578432)