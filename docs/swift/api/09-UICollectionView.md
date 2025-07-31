# UICollectionView
UICollectionView 是开发中常用的一个布局控件，跟`UITbaleView`一样可以设置分区，分区内cell的个数，区头视图和区位视图可重用。
```swift
//创建用来布局的flowlayout对象
_layout = [[UICollectionViewFlowLayout alloc] init];
// 设置滚动方向
_layout.scrollDirection = .horizontal
//设置每个item的边界缩进
_layout.sectionInset = UIEdgeInsetsMake(0, 0, 0, 0);
//设置item之间的最小间距
_layout.minimumInteritemSpacing = 0;
//设置行之间的最小间距
_layout.minimumLineSpacing = 0;
//设置分区页眉（header）大小
_layout.headerReferenceSize = CGSizeMake(0,0);
//设置分区脚的大小
_layout.footerReferenceSize = CGSizeMake(0,0);

//创建集合视图UICollectionView （同时绑定layout布局）
_collectionView = [[UICollectionView alloc] initWithFrame:CGRectMake(0, 0,SCREEN_WIDTH,SCREEN_HEIGHT+kSpaceH) collectionViewLayout:_layout];
_collectionView.showsVerticalScrollIndicator = NO;
//设置代理
_collectionView.delegate = self;
_collectionView.dataSource = self;
//注册区头区位
_collectionView.register(UICollectionReusableView.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: "kHeaderViewId")
_collectionView.register(UICollectionReusableView.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionFooter, withReuseIdentifier: "kFootViewId")
```

* 判断头部和尾部
```swift
func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        if kind == UICollectionView.elementKindSectionHeader {
        return collectionView.dequeueReusableSupplementaryView(ofKind: UICollectionView.elementKindSectionHeader, for: indexPath) as XDSHeaderReusableView
    }else{
        return collectionView.dequeueReusableSupplementaryView(ofKind: UICollectionView.elementKindSectionFooter, withReuseIdentifier: "kFootViewId", for: indexPath) as! XDSFooterReusableView
    }
}
```
* UICollectionViewFollowDelegate 
可以通过`UICollectionViewFlowLayout`类直接设置属性或者使用代理。
```swift
// item的Size
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize
// 分区到父视图之间的边距
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets
// 行间距
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat
// item之间的间距
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat
// 区头的Size
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForHeaderInSection section: Int) -> CGSize
// 区尾的Size
func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForFooterInSection section: Int) -> CGSize
```

* UICollectionView常用的方法
```swift
// 分区个数   
var numberOfSections: Int { get }
// 每个分区item的个数
func numberOfItems(inSection section: Int) -> Int
// 每个item的布局属性
func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes?
// 区头区位的布局属性
func layoutAttributesForSupplementaryElement(ofKind kind: String, at indexPath: IndexPath) -> UICollectionViewLayoutAttributes?
// 根据位置获取当前的 IndexPath
func indexPathForItem(at point: CGPoint) -> IndexPath?
// 根据 item 获取当前 IndexPath
func indexPath(for cell: UICollectionViewCell) -> IndexPath?
// 根据 IndexPath 获取当前item
func cellForItem(at indexPath: IndexPath) -> UICollectionViewCell?
// 获取界面上能显示出来了 item
var visibleCells: [UICollectionViewCell] { get }
// 获取当前界面上显示的 IndexPath，滑动过快时会不准确
var indexPathsForVisibleItems: [IndexPath] { get }
// 插入分区
func insertSections(_ sections: IndexSet)
// 删除分区
func deleteSections(_ sections: IndexSet)
// 移动分区
func moveSection(_ section: Int, toSection newSection: Int)
// 刷新单个分区 collectionView.reloadSections(IndexSet.init(integer: 0))
func reloadSections(_ sections: IndexSet)
// 插入item
func insertItems(at indexPaths: [IndexPath])
// 删除item
func deleteItems(at indexPaths: [IndexPath])
// 移动单个item
func moveItem(at indexPath: IndexPath, to newIndexPath: IndexPath)
// 刷新单个item
func reloadItems(at indexPaths: [IndexPath])
// 滚动到指定位置  collectionView.scrollToItem(at: IndexPath(item: 400, section: 0), at: UICollectionView.ScrollPosition.centeredHorizontally, animated: true)
func scrollToItem(at indexPath: IndexPath, at scrollPosition: UICollectionView.ScrollPosition, animated: Bool)
```

* UICollection的布局样式发生变化,可以通过重置或者调整`UICollectionViewFlowLayout`达到界面变化的效果，比如在点击item时进行变化
```swift
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        // 设置新的Layout
        let layout = UICollectionViewFlowLayout()
        let itemWidth = (screenWidth - 30) / 4
        layout.itemSize = CGSizeMake(itemWidth, itemWidth)
        // 使当前layout无效
        self.collectionView.collectionViewLayout.invalidateLayout()
        // 设置新的layout
        self.collectionView.setCollectionViewLayout(layout, animated: true)
        self.collectionView.reloadData()
    }
```

## UICollectionViewLayout
`UICollectionViewFlowLayout`是默认的布局方式,如果需要一些个性化的布局，比如瀑布流。这时就需要自定义 `UICollectionViewLayout`。


* UICollectionViewLayout的一些重要方法
```swift
// 为layout显示做准备工作
override func prepare()
// 所有 item 属性集合,每个 item 对应一个 UICollectionViewLayoutAttributes 类型的对象, 表示 item 的一些属性，比如 边框，中心点，大小，形状，透明度  transform 等
override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]?
// 单个 item 的属性
override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes?
// CGSize返回整个content区域的大小
override var collectionViewContentSize 
//当前layout的布局发生变动时，是否重写加载该layout。默认返回的是NO，若返回YES，则重新执行 prepare  layoutAttributesForElements 方法
override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool 
// 返回最终collectionView的偏移量，也就是collectionView停止滚动时候的偏移量，通过这个方法可以控制你最终想要让collectionView停止的位置
override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint
```


## 可拉伸的HeaderView
继承`UICollectionViewFlowLayout`，重写`override func layoutAttributesForElements(in:) -> [UICollectionViewLayoutAttributes]`方法，通过检查`representedElementKind`判断是否为section header，然后改变section header的高度
```swift
class StretchyHeaderLayout: UICollectionViewFlowLayout {
  override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
    let layoutAttributes = super.layoutAttributesForElements(in: rect)! as [UICollectionViewLayoutAttributes]

    let offset = collectionView!.contentOffset
    if (offset.y < 0) {
      let deltaY = abs(offset.y)
      for attributes in layoutAttributes {
        if let elementKind = attributes.representedElementKind {
            if elementKind == UICollectionView.elementKindSectionHeader {
            var frame = attributes.frame
            frame.size.height = max(0, headerReferenceSize.height + deltaY)
            frame.origin.y = frame.minY - deltaY
            attributes.frame = frame
          }
        }
      }
    }

    return layoutAttributes
  }

  override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool {
    return true
  }
}
```

## UICollectionViewLayoutAttributes
描述单个 item 的属性
```swift
var frame: CGRect
var center: CGPoint
var size: CGSize
var transform3D: CATransform3D
var bounds: CGRect
var transform: CGAffineTransform
var alpha: CGFloat
var zIndex: Int // default is 0
var isHidden: Bool // 作为优化，UICollectionView 可能不会为 hidden 属性为 YES 的项目创建视图
var indexPath: IndexPath
var representedElementCategory: UICollectionView.ElementCategory { get }
var representedElementKind: String? { get }  // 区头 or 区尾
// 便利构造器
convenience init(forCellWith indexPath: IndexPath)
convenience init(forSupplementaryViewOfKind elementKind: String, with indexPath: IndexPath)
convenience init(forDecorationViewOfKind decorationViewKind: String, with indexPath: IndexPath)
```

## isPagingEnabled 的效果
当 item 的大小跟 UICollectionView 宽度不一致时，使用`isPagingEnabled`就会出现偏移的问题。解决方案有两个：
1. 自定义`UICollectionViewLayout`
2. 使用滚动代理,在停止滑动时计算最近的 分区 和 item

自定义类继承自`UICollectionViewFlowLayout`,重写`override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint`方法，该方法决定了最后滚动在什么位置。
```swift
override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint {
    guard let collectionView = collectionView else { return .zero }
    
    // 1.计算中心点的 x 值
    let centerX = proposedContentOffset.x + collectionView.bounds.width / 2
    // 2.获取这个点可视范围内的布局属性
    let rect = CGRect(center: proposedContentOffset, size: collectionView.bounds.size)
    let attrs = self.layoutAttributesForElements(in: rect)
    
    // 3. 需要移动的最小距离
    var moveDistance = CGFloat(MAXFLOAT)
    // 4.遍历数组找出最小距离
    attrs!.forEach { (attr) in
        // 当前item的中心点 - 移动的中心点 < 移动的最小的距离
        if abs(attr.center.x - centerX) < abs(moveDistance) {
            moveDistance = attr.center.x - centerX
        }
    }
    // 5.返回一个新的偏移点
    var targetPoint = proposedContentOffset
    if targetPoint.x > 0 && targetPoint.x < collectionViewContentSize.width - collectionView.bounds.width {
        targetPoint.x += moveDistance
    }
    
    return targetPoint
}
```

使用`UIScrollViewDelegate`代理，同样也能达到分页的效果，每次 item 都停留在中间位置。代码如下：
```swift
extension HomeHeaderView: UIScrollViewDelegate{
    // 停止滑动时，当前的偏移量（即最近停止的位置）
    func scrollViewDidEndScrollingAnimation(_ scrollView: UIScrollView) {
        offsetx = scrollView.contentOffset.x
    }

    /// collectionView.pagingEnabled = NO; /// 禁止分页滑动时，根据偏移量判断滑动到第几个item
    /// 滑动 “减速滚动时” 是触发的代理，当用户用力滑动或者清扫时触发
    func scrollViewWillBeginDecelerating(_ scrollView: UIScrollView) {
        // 为了简化代码用了一个手势从滑动方向判断，所以用到了绝对值比对判断 左右滑动的值。
        // fabs ：处理double类型的取绝对值
        if fabs(scrollView.contentOffset.x - offsetx) > 10{
            scrollToNextPageOrLastPage(scrollView)
        }
    }

    /// 用户拖拽时 调用
    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        if fabs(scrollView.contentOffset.x - offsetx) > 10 {
            scrollToNextPageOrLastPage(scrollView)
        }
    }

    func scrollToNextPageOrLastPage(_ scrollView: UIScrollView) {
        /// 之前停止的位置，判断左滑、右滑
        if scrollView.contentOffset.x > offsetx { // i > 0（左滑，下一个（i最大为cell个数））

            // 计算移动的item的个数（item.width + 间距）
            let i = Int(scrollView.contentOffset.x / (screenWidth - ratioW(105) + ratioW(10)) + 1)
            let index = IndexPath(row: i, section: 0)
            // item居中显示
            collectionView.scrollToItem(at: index, at: .centeredHorizontally, animated: true)

        }else{  // i <= 0 （右滑，上一个）（i 最小为-1，所以有需要的话，在这里添加判断，使其最小为 i = 0）

            let i = Int(scrollView.contentOffset.x / (screenWidth - ratioW(105) + ratioW(10))  + 1)
            let index = IndexPath(row: i-1, section: 0)
            // item居中显示
            collectionView.scrollToItem(at: index, at: .centeredHorizontally, animated: true)
        }
    }
}
```

## 参考文档
* [自定义UICollectionView布局](https://blog.csdn.net/u014084081/article/details/70195024)
* [一篇较为详细的 UICollectionView 使用方法总结](https://zhang759740844.github.io/2017/07/27/UICollectionView%E5%AE%8C%E5%85%A8%E8%A7%A3%E6%9E%90/)