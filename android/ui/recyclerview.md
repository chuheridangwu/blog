# RecyclerView
Recyclerview是现在比较常用的控件，有三种布局方式
* GridLayoutManager: //卡片布局
* LinearLayoutManager： //线性布局 可以设置横向或者纵向
* StaggeredGridLayoutManager: //瀑布流布局

RecyclerView 刷新数据有两种方式
* notifyDataSetChanged() //刷新全局
* notifyItemRangeChanged //刷新局部


##  导入库
```kotlin
implementation 'androidx.recyclerview:recyclerview:1.1.0'
```
## 设置布局样式
* GridLayoutManager  卡片布局
```kotlin
val manager =  GridLayoutManager(context,2)
recycler.layoutManager = manager
```
* LinearLayoutManager  线性布局
```kotlin
val manager =  LinearLayoutManager(context)
recycler.layoutManager = manager
// 设置分页
val snapHelper = PagerSnapHelper()
snapHelper.attachToRecyclerView(recycler)
```
* StaggeredGridLayoutManager  瀑布流布局
```kotlin
val mLayoutManager =  StaggeredGridLayoutManager(2,StaggeredGridLayoutManager.VERTICAL);
recyclerView.setLayoutManager(mLayoutManager);
```

## 创建适配器adapter
```kotlin
class MainRecycleAdapter(list:MutableList<PhotoModel>,pContext: Context): RecyclerView.Adapter<MainRecycleAdapter.Viewholder>() {
    var datas = list 
    val context = pContext
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Viewholder {
        return Viewholder(LayoutInflater.from(parent.context).inflate(R.layout.recycle_item,parent,false))
    }

    override fun getItemCount(): Int  = datas.size

    override fun onBindViewHolder(holder: Viewholder, position: Int) {
        val model = datas[position]
        Glide.with(holder.imgView).load(model.imgUrl).into(holder.imgView)
        holder.imgView.setOnClickListener {
            val intent = Intent(context,PhotoShowActivity::class.java)
            intent.putExtra("linkurl",model.link)
            intent.putExtra("position",position)
            intent.putExtra("datas",ArrayList<Parcelable>(datas))
            context.startActivity(intent)
        }
    }

    class Viewholder(view: View):RecyclerView.ViewHolder(view){
        val imgView: ImageView = view.findViewById(R.id.recycler_img)
    }
}
```

## 下拉刷新 SwipeRefreshLayout
1. 导入`implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0"`
2. SwipeRefreshLayout包裹住刷新的控件
```kotlin
<androidx.swiperefreshlayout.widget.SwipeRefreshLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/swipe">
    <androidx.recyclerview.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/main_recycle">
    </androidx.recyclerview.widget.RecyclerView>
</androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
```
3. 使用方法
 ```kotlin
// 设置下拉刷新
swipe.setOnRefreshListener{
    // 在这里进行下一页的加载
    // 加载数据完成后，通知界面刷新，关闭刷新动画
    adapter?.notifyDataSetChanged()
    swipe.isRefreshing = false
}
// 刷新渐变颜色
swipe.setColorSchemeResources(
    R.color.colorPrimary,
    R.color.colorPrimaryDark,
    R.color.colorAccent
);
 ```
 
##  上拉加载
>上拉加载更多是通过监听滚动视图的滚动位置进行计算的，当最后一个视图即将显示的时候，并且手指离开了屏幕，开始加载下一页数据
```kotlin
main_recycle.addOnScrollListener(object : RecyclerView.OnScrollListener(){  //添加滑动监听
    override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) { // 当状态进行改变时
        super.onScrollStateChanged(recyclerView, newState)
        var last = layoutManager.findLastVisibleItemPosition() // 获取到最后一个即将显示的视图位置
        var sum = adapter?.itemCount
        if (newState == RecyclerView.SCROLL_STATE_IDLE){ // 当停止滚动时
                // 在这里进行下一页数据加载
        }
    }
})
```

## 刷新局部数据的方法
```kotlin
public void setMoreData(List<BasePubuBean> puBuList) {
    int start = mayContentList.size();
    if (puBuList!=null && puBuList.size()!=0){
        mayContentList.addAll(puBuList);
        int end = mayContentList.size();
        mRecommendPuBuAdapter.notifyItemRangeInserted(start,end);
    }
}
```

## 瀑布流
瀑布流主要在适配器`onBindViewHolder`绑定数据的时候，使用`getLayoutParams().height`给对应的视图赋值高度
```
public class ColorAdapter extends RecyclerView.Adapter<ColorAdapter.ViewHolder>{
private String[] mDataSet;
private Context mContext;
private Random mRandom = new Random();

public ColorAdapter(Context context, String[] DataSet){
    mDataSet = DataSet;
    mContext = context;
}

@NonNull
@Override
public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    ViewHolder vh = new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_view,parent,false));
    return vh;
}

@Override
public int getItemCount() {
    return mDataSet.length;
}

@Override
public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
    holder.mTextView.setText(mDataSet[position]);
    holder.mTextView.getLayoutParams().height = getRandomIntInRange(300,180); //关键在于这句高度赋值
    holder.mTextView.setBackgroundColor(getRandomHSVColor());
}

// 获取随机高度
protected int getRandomIntInRange(int max, int min){
    return mRandom.nextInt(max)+min;
}

// 获取随机颜色
protected int getRandomHSVColor(){
    // Generate a random hue value between 0 to 360
    int hue = mRandom.nextInt(361);
    // We make the color depth full
    float saturation = 1.0f;
    // We make a full bright color
    float value = 1.0f;
    // We avoid color transparency
    int alpha = 255;
    // Finally, generate the color
    int color = Color.HSVToColor(alpha, new float[]{hue, saturation, value});
    // Return the color
    return color;
}

public static class ViewHolder extends RecyclerView.ViewHolder{
    public TextView mTextView;
    public ViewHolder(@NonNull View itemView) {
        super(itemView);
        mTextView = (TextView)itemView.findViewById(R.id.tv);
    }
}
```
瀑布流获取最后显示位置的方法，因为瀑布流的item高矮不确定性，所以在获取最后一个显示的position的时候和线性不一样
```kotlin
main_recycler_view.addOnScrollListener(object: RecyclerView.OnScrollListener(){
    override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
        super.onScrollStateChanged(recyclerView, newState)
        if (newState == RecyclerView.SCROLL_STATE_IDLE){
        val  position = manager.findFirstCompletelyVisibleItemPositions(null) // 获取显示的位置，数组形式
            for (i in position){
                if (i >= ApiClient.videoList.size -3 ){

                }
            }
        }
    }
})
```

## 滚动到指定位置

```kotlin
// scrollBy(x, y)这个方法是自己去控制移动的距离，单位是像素,使用scrollBy(x, y)需要自己去计算移动的高度或宽度
recyclerView.scrollBy(x, y)

// scrollToPosition(position)这个方法的作用是定位到指定项，就是把你想显示的项显示出来，但是在屏幕的什么位置是不管的，
recyclerView.scrollToPosition(3)

//smoothScrollToPosition(position)和scrollToPosition(position)效果基本相似，不同的是smoothScrollToPosition是平滑到你想显示的项，而scrollToPosition是直接定位显示
recyclerView.smoothScrollToPosition(position)。

// 滚动到指定位置，如果该项可以置顶就将其置顶显示
manager.scrollToPositionWithOffset(3, 0);
```

## Adapter跟Activity的交互
>有时候 adapter 里面的控件点击事件需要回调给 Activity，这个时候就需要它们进行交互，通常的做法是，定义一个接口类，定义实现的方法，adapter中创建对应的接口属性， 当需要回调时， adapter 通过接口方法回调给 Activity， Activity需要实现对应的接口方法

adapter中的类
```kotlin
class PlayAdapter(list: MutableList<Video>, listener: OnItemClickListener): RecyclerView.Adapter<PlayAdapter.ViewHolder>() {

    var videoList = list
    private val clickListener = listener // 接口属性

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlayAdapter.ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.play_recycler_item,parent,false))
    }

    override fun getItemCount(): Int = videoList.size

    override fun onBindViewHolder(holder: PlayAdapter.ViewHolder, position: Int) {
        val video = videoList[position]
        Glide.with(holder.bgImg).load(video.headImg).into(holder.bgImg)
        holder.closeBtn.setOnClickListener { this.clickListener.onCloseView()}

    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val bgImg: ImageView = itemView.findViewById(R.id.play_item_img)
        val closeBtn: Button = itemView.findViewById(R.id.close_btn)
    }

    interface OnItemClickListener{
        fun onCloseView()
    }
}

OnItemClickListener: 是对应的接口类
```

Activity中的代码
```kotlin
class PlayActivity : AppCompatActivity(),PlayAdapter.OnItemClickListener{
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_play)
    }

    override fun onCloseView() {
        finish()
    }
}
```

## 获取当前显示的位置
| 方法 | 作用 |
| --- | --- |
| findFirstVisibleItemPosition() | 返回当前RecycelrView中 **第一个可见的item** 的adapter postion |
| findLastVisibleItemPosition() | 返回当前RecycelrView中 **最后一个可见的item** 的adapter postion |
| findFirstCompletelyVisibleItemPosition() | 返回当前RecycelrView中 **第一个完整可见的item** 的adapter postion |
| findLastCompletelyVisibleItemPosition() | 返回当前RecycelrView中 **最后一个完整可见的item** 的adapter postion |

调用方式
```kotlin
val postion = (recyclerView.layoutManager as LinearLayoutManager ).findFirstCompletelyVisibleItemPosition()
```

这几个方法的差别在于： **一个是可见，一个是要完全可见**

> 注意点： 这4个方法，只有当 RecyclerView 在屏幕展示出来后，才能得到正常的返回值，否则都是`-1`



