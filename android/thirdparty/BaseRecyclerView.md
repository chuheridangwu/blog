# BaseRecyclerViewAdapterHelper

BaseRecyclerViewAdapterHelper 是一个针对Recycler控件的第三方，可以轻松实现多个效果，为我们节省了大量的重复代码，点击[跳转github地址](https://github.com/CymChad/BaseRecyclerViewAdapterHelper)

项目中引用导入
```java
implementation 'com.github.CymChad:BaseRecyclerViewAdapterHelper:3.0.4'

// root build.gradle文件中导入
allprojects {
    repositories {
        google()
        jcenter()
        maven { url "https://jitpack.io" }
    }
}
```

## 简单使用 BaseQuickAdapter

1. Adapter 继承自 `BaseQuickAdapter`

```java
public class DemoAdapter extends BaseQuickAdapter<ItemModel, BaseViewHolder> {

    public DemoAdapter() {
       super(R.layout.item_row_view);
    }

    // 行内的item
    @Override
    protected void convert(@NotNull BaseViewHolder baseViewHolder, ItemModel itemModel) {
        ((TextView)baseViewHolder.findView(R.id.text)).setText(itemModel.title);
    }

}
```

2. 使用

```java
public class MainActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private DemoAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mRecyclerView = findViewById(R.id.recycler_view);

        GridLayoutManager manager = new GridLayoutManager(this,2);
        mRecyclerView.setLayoutManager(manager);

        mAdapter = new DemoAdapter();
        mRecyclerView.setAdapter(mAdapter);

        initData();

    }

    private void initData() {
        List<ItemModel> datas = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            ItemModel itemModel = new ItemModel();
            itemModel.title = String.valueOf(i);
            datas.add(itemModel);
        }

        // 设置数据
        mAdapter.setList(datas);
        //mAdapter.addData(datas);用来实现添加数据，一般在获取到加载更多数据的使用
    }

}
```

3. RecyclerView顶部添加header视图

```java
View headerView = getLayoutInflater().inflate(R.layout.top_view,mRecyclerView,false);
mAdapter.addHeaderView(headerView);
```

4. 添加点击方法

```java
mAdapter.addChildClickViewIds(R.id.text);
mAdapter.setOnItemChildClickListener(new OnItemChildClickListener() {
    @Override
    public void onItemChildClick(@NonNull BaseQuickAdapter adapter, @NonNull View view, int position) {
        
    }
});
```

1. 使用`LoadMoreModule`接口实现加载更多数据，adapter实现`public class LoadMoreAdapter extends BaseQuickAdapter<Status, BaseViewHolder> implements LoadMoreModule`
```java
/**
    * 初始化加载更多
    */
private void initLoadMore() {
    mAdapter.getLoadMoreModule().setOnLoadMoreListener(new OnLoadMoreListener() {
        @Override
        public void onLoadMore() {
            request();
        }
    });
    mAdapter.getLoadMoreModule().setAutoLoadMore(true);
    //当自动加载开启，同时数据不满一屏时，是否继续执行自动加载更多(默认为true)
    mAdapter.getLoadMoreModule().setEnableLoadMoreIfNotFullPage(false);
}

/**
    * 请求数据
    */
private void request() {
    new Request(pageInfo.page, new RequestCallBack() {
        @Override
        public void success(List<Status> data) {
            mSwipeRefreshLayout.setRefreshing(false);
            mAdapter.getLoadMoreModule().setEnableLoadMore(true);

            if (pageInfo.isFirstPage()) {
                //如果是加载的第一页数据，用 setData()
                mAdapter.setList(data);
            } else {
                //不是第一页，则用add
                mAdapter.addData(data);
            }

            if (data.size() < PAGE_SIZE) {
                //如果不够一页,显示没有更多数据布局
                mAdapter.getLoadMoreModule().loadMoreEnd();
                Tips.show("no more data");
            } else {
                mAdapter.getLoadMoreModule().loadMoreComplete();
            }

            // page加一
            pageInfo.nextPage();
        }

        @Override
        public void fail(Exception e) {
            Tips.show(getResources().getString(R.string.network_err));
            mSwipeRefreshLayout.setRefreshing(false);
            mAdapter.getLoadMoreModule().setEnableLoadMore(true);

            mAdapter.getLoadMoreModule().loadMoreFail();
        }
    }).start();
}
```


## 加载不同的界面(简单的分区，不适用于复杂界面)

### RecyclerView加载不同视图的原理
RecyclerView如果想要加载不同的view，必须要知道在什么时候，加载什么样的视图，如果继承`RecyclerView.Adapter`,需要重写 `getItemViewType` 和 `onCreateViewHolder` 两个方法，在`getItemViewType`方法中返回类型，在`onCreateViewHolder` 方法中根据类型创建不同的视图

举个栗子：
```java
// 定义三个常量标识，三种item类型
public static final int TYPE_FULL_IMAGE = 0;
public static final int TYPE_RIGHT_IMAGE = 1;
public static final int TYPE_THREE_IMAGES = 2;

// 返回定义的类型
public int getItemViewType(int position){
    ItemModel model = mData.get(position);
    if (model.getType() == 0){
        return TYPE_FULL_IMAGE;
    }else if (model.getType() == 1){
        return TYPE_RIGHT_IMAGE;
    }else {
        return TYPE_THREE_IMAGES;
    }
}

// 根据类型返回对应的view
@NonNull
@Override
public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    View view;
    if (viewType == TYPE_FULL_IMAGE){
        view = View.inflate(parent.getContext(),R.layout.item_type_full_image,null);
    }else if (viewType == TYPE_RIGHT_IMAGE){
        view = View.inflate(parent.getContext(),R.layout.item_type_left_title,null);
    }else {
        view = View.inflate(parent.getContext(),R.layout.item_type_right_title,null);
    }
    return new ViewHolder(view);
}
```
### BaseSectionQuickAdapter加载不同视图的具体实现

1. 首先在模型上，需要实现`SectionEntity`接口,需要实现`isHeader()` 和 `getItemType()`方法来区分类型。

```java
// SectionEntity.HEADER_TYPE   head头
// SectionEntity.NORMAL_TYPE   默认视图

import com.chad.library.adapter.base.entity.SectionEntity;

public class ItemModel implements SectionEntity {

    String title;

    boolean isHeader;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setHeader(boolean header) {
        isHeader = header;
    }

    @Override
    public boolean isHeader() {
        return isHeader;
    }

    @Override
    public int getItemType() {
        return isHeader ? SectionEntity.HEADER_TYPE : SectionEntity.NORMAL_TYPE;
    }
}
```

2. Adapter继承`BaseSectionQuickAdapter`时，可以在初始化方法中直接加载对应的xml视图

```java

import com.chad.library.adapter.base.BaseSectionQuickAdapter;
import com.chad.library.adapter.base.viewholder.BaseViewHolder;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

public class DemoAdapter extends BaseSectionQuickAdapter<ItemModel, BaseViewHolder> {

    public DemoAdapter(@Nullable List<ItemModel> data) {
        super(R.layout.item_section_title_view, R.layout.item_row_view, data);
    }

    // 头部的item
    @Override
    protected void convertHeader(@NotNull BaseViewHolder baseViewHolder, @NotNull ItemModel itemModel) {
        ((TextView)baseViewHolder.findView(R.id.header)).setText(itemModel.title);
    }

    // 行内的item
    @Override
    protected void convert(@NotNull BaseViewHolder baseViewHolder, ItemModel itemModel) {
        ((TextView)baseViewHolder.findView(R.id.text)).setText(itemModel.title);
    }

}
```

3. Activity中的使用

```java
public class MainActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private DemoAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mRecyclerView = findViewById(R.id.recycler_view);

        GridLayoutManager manager = new GridLayoutManager(this,2);
        mRecyclerView.setLayoutManager(manager);

        mAdapter = new DemoAdapter(new ArrayList<ItemModel>());
        mRecyclerView.setAdapter(mAdapter);

        initData();

        initTopView();
    }

    // 加载头部视图
    private void initTopView() {
        View headerView = getLayoutInflater().inflate(R.layout.top_view,mRecyclerView,false);
        mAdapter.addHeaderView(headerView);
    }

    private void initData() {
        List<ItemModel> datas = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            ItemModel itemModel = new ItemModel();
            itemModel.title = String.valueOf(i);
            if (i % 5 == 0){
                itemModel.isHeader = true;
            }
            datas.add(itemModel);
        }

        mAdapter.setList(datas);
    }


}
```