# UICollectionView

* 重要代理
```swift
        //创建用来布局的flowlayout对象
        _layout = [[UICollectionViewFlowLayout alloc] init];
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
        _collectionView.backgroundColor = kWhite(0.7);
        _collectionView.scrollsToTop = YES;
        //注册item
        [_collectionView registerClass:[UICollectionReusableView class] forSupplementaryViewOfKind:UICollectionElementKindSectionHeader withReuseIdentifier:kHeaderViewId];
    }
```

* 判断头部和尾部

```swift
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        
    }
```
## UICollectionViewFollow
