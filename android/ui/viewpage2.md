# ViewPage2
1. 导入第三方库

```kotlin
implementation "androidx.viewpager2:viewpager2:1.0.0"
```

1. 在xml中，确认自己是否需要使用tablayout布局，可以不使用

```xml
<com.google.android.material.tabs.TabLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/main_tabs"
    app:layout_constraintTop_toTopOf="parent"></com.google.android.material.tabs.TabLayout>

<androidx.viewpager2.widget.ViewPager2
    android:layout_width="match_parent"
    android:layout_height="0dp"
    app:layout_constraintTop_toBottomOf="@id/main_tabs"
    app:layout_constraintBottom_toBottomOf="parent"
    android:id="@+id/main_viewpager"></androidx.viewpager2.widget.ViewPager2>
```

1. activity中的使用

```kotlin
val data = listOf(mutableListOf("a", "b", "c","d","e","f"),mutableListOf("1", "2"))
val data1 = listOf("1", "2")
val adapter =  ViewPagerAdaper(data,this)
view_pager.adapter = adapter
TabLayoutMediator(tabs,view_pager){tab,posint->
    tab.text = data1[posint]
}.attach()
```

## 创建适配器
创建ViewPage2的是适配器，使用解析的妹子图为例，页面布局样式是ViewPage2内是RecyclerView控件，所以传入的数据时数组嵌套的模式。

```kotlin
class MainViewAdapter(list:MutableList<MutableList<PhotoModel>>,pContext: Context): RecyclerView.Adapter<MainViewAdapter.Viewholder>() {
    var datas = list
    val context = pContext
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Viewholder {
        return Viewholder(LayoutInflater.from(parent.context).inflate(R.layout.viewpager_list,parent,false))
    }

    override fun getItemCount(): Int  = datas.size

    override fun onBindViewHolder(holder: Viewholder, position: Int) {
        val sources = datas[position]
        val manager =  GridLayoutManager(context,2)
        val adapter = MainRecycleAdapter(sources,context)
        holder.recycler.layoutManager = manager
        holder.recycler.adapter =  adapter

        // 设置下拉刷新
        holder.swipe.setOnRefreshListener{
            // 在这里进行下一页的加载
            SourceManager.pages[position] = "1"
            Log.d("TAG", "onScrollStateChanged: ${SourceManager.pages[position]} ${SourceManager.pages}")
            SourceManager.getMoreDataSource("${sources.last().referer}")
            SourceManager.setlistMoreDataListener {
                datas[position] = mutableListOf()
                datas[position].addAll(it)
                adapter.notifyDataSetChanged()
                Log.d("TAG", "onScrollStateChanged+ +++: ${datas[position].size}")
            }

            // 加载数据完成后，通知界面刷新，关闭刷新动画
            SourceManager.pages[position] = "1"
            adapter.notifyDataSetChanged()
            holder.swipe.isRefreshing = false
        }
        // 刷新渐变颜色
        holder.swipe.setColorSchemeResources(
            R.color.colorPrimary,
            R.color.colorPrimaryDark,
            R.color.colorAccent
        );

        getMoreData(holder,manager,adapter,sources.last().referer,position)

    }

    // 设置上拉加载
    private fun getMoreData(holder: Viewholder,manager: GridLayoutManager ,adapter: MainRecycleAdapter,url:String,position: Int){
        holder.recycler.addOnScrollListener(object : RecyclerView.OnScrollListener(){  //添加滑动监听
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) { // 当状态进行改变时
                super.onScrollStateChanged(recyclerView, newState)
                var last = manager.findLastVisibleItemPosition() // 获取到最后一个即将显示的视图位置
                var sum = adapter.itemCount
                if (newState == RecyclerView.SCROLL_STATE_IDLE && isRefresh  && last == sum-1){ // 当停止滚动时
                    isRefresh = false
                    // 在这里进行下一页数据加载
                    val page = SourceManager.pages[position].toInt()
                    SourceManager.pages[position] = "${page + 1}"
                    Log.d("TAG", "onScrollStateChanged: ${SourceManager.pages[position]} ${SourceManager.pages}")

                    if (datas[position].first().link.isEmpty()){
                        isRefresh = true
                       return //如果是干货妹子图，不进行上拉加载
                    }

                    SourceManager.getMoreDataSource("$url/page/${SourceManager.pages[position]}")
                    SourceManager.setlistMoreDataListener {
                        isRefresh = true

                        datas[position].addAll(it)
                        adapter.notifyDataSetChanged()
                        Log.d("TAG", "onScrollStateChanged+ +++: ${datas[position].size}")
                    }

                }

            }
        })
    }

    class Viewholder(view: View): RecyclerView.ViewHolder(view){
        val recycler: RecyclerView = view.findViewById(R.id.main_recycler)
        val swipe: SwipeRefreshLayout = view.findViewById(R.id.main_swipe)
    }
}
```

## 监听Viewpager2的滚动方法
```java
      mLoopView.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
          @Override
          public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
              super.onPageScrolled(position, positionOffset, positionOffsetPixels);
          }

          @Override
          public void onPageSelected(int position) {
              super.onPageSelected(position);
          }

          @Override
          public void onPageScrollStateChanged(int state) {
              super.onPageScrollStateChanged(state);
          }
      });
```

## 获取ViewPage2当前显示的View
在 adapter 中对当前的itemView设置tag，在 activity 中通过查询 tag 获取到当前的view
```java

//  设置ItemView的tag
@Override
protected void convert(@NotNull BaseViewHolder baseViewHolder, IBasePhotoInfo feedsBean) {
    baseViewHolder.itemView.setTag(baseViewHolder.getAdapterPosition());
}

// 根据tag获取到当前的View
View view = mViewPager.findViewWithTag(mViewPager.getCurrentItem());
```