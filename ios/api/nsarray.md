# NSArray
NSArray是我们常用的一个类，里面有一些方法不经常用到，又往往需要查询，现在把不经常用到的一些方法做一个总结。省的以后到处找！

## 数组去重
数组去重是项目中经常遇到的问题，数组去重有很多种方式可以实现，利用数组、字典、NSSet、或者用KVC都可以做到数组去重。KVC数组去重[相关文档](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueCoding/CollectionOperators.html)。
```objc
// 数组去重
NSArray *array = @[@"1",@"2",@"3",@"1",@"4",@"5"];
NSMutableArray *requestAry = [NSMutableArray array];
for (NSString *string in array) {
    if (![requestAry containsObject:string]) {
        [requestAry addObject:string];
    }
}

// 使用字典去重，得到的数组是无序的
NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    for (NSString *string in array) {
         [dict setObject:string forKey:string];
     }
NSArray *dictAry = dict.allValues;

// NSSet去重，得到的数组无序
NSSet *set = [NSSet setWithArray:array];
NSArray *setAry =set.allObjects;

// kvc去重
NSArray *kvcAry = [array valueForKeyPath:@"@distinctUnionOfObjects.self"];
```

## 数组元素分页截取
需求，将数组元素进行分组处理，每5个元素为一个新的数组，使用`while`和`MIN(count,count)`进行处理。
```objc
NSMutableArray *array = [NSMutableArray array];
for (int i = 0; i < 23;i++) {
    NSString *s = [NSString stringWithFormat:@"%d",i];
    [array addObject:s];
}
NSMutableArray *requestAry = [NSMutableArray array];
NSInteger count = array.count;
int j = 0;
while (count) {
    NSRange range = NSMakeRange(j, MIN(5, count));
    NSArray *subAry = [array subarrayWithRange:range];
    [requestAry addObject:subAry];
    count -= range.length;
    j += range.length;
}
```

## 利用kvc获取数组元素的 和 / 平均值 / 最大值 / 最小值
```objc
NSArray *array = @[@"1",@"2",@"3",@"4",@"5"];
// 最大值
NSNumber *max = [array valueForKeyPath:@"@max.floatValue"];
// 最小值
NSNumber *min = [array valueForKeyPath:@"@min.floatValue"];
// 平均值
NSNumber *avg = [array valueForKeyPath:@"@avg.floatValue"];
// 和
NSNumber *sum = [array valueForKeyPath:@"@sum.floatValue"];

或者不指定类型
NSNumber *sum = [array valueForKeyPath:@"@sum.self"];
```

### 创建一个随机数组
思想：利用两个数组，第一个数组存放要随机的原始数据，第二个数组存放结果；然后arc4random产生一个随机数，将这个随机数用作下标，把第一个数组对应下标的数据取出并删除。取出后存入第二个数组。然后循环往复就可以了。即便两次arc4random产生的随机数是相同的，但第一个数组对应下标的数据却是不一样的。
```objc
- (NSArray *)randomArray{
    // 随机数据源
    NSMutableArray *arcAry = [[NSMutableArray alloc] initWithObjects:@1,@2,@3,@4,@5,@6, nil];
    NSMutableArray *requestAry = [NSMutableArray array];
    
    // 个数，需要跟随机数组的个数相同
    NSInteger m = 5;
    for (int i = 0; i < m; i++) {
        int t = arc4random()%arcAry.count;
        requestAry[i] = arcAry[t];
        arcAry[t] = [arcAry lastObject]; //为了更好的乱序，所以交换一下位置
        [arcAry removeLastObject];
    }
    return requestAry;
}

// 使用NSSet方式创建随机数组
NSMutableArray *ary = [NSMutableArray array];
for (int i = 0; i < 10; i++) {
    NSString *string = [NSString stringWithFormat:@"%d",i];
    [ary addObject:string];
}

NSSet *set = [NSSet setWithArray:ary];
```

 ## 数组的 交集、并集、差集
```objc
NSArray *array1 = @[@"1",@"2",@"3"];
NSArray *array2 = @[@"1",@"5",@"6"]; 
NSMutableSet *set1 = [NSMutableSet setWithArray:array1];
NSMutableSet *set2 = [NSMutableSet setWithArray:array2]; 

[set1 unionSet:set2];       //取并集后 set1中为1，2，3，5，6
[set1 intersectSet:set2];  //取交集后 set1中为1
[set1 minusSet:set2];      //取差集后 set1中为2，3，5，6
```

## 判断一个数组是否为另一个数组的子集
```objc
NSArray *array3 = @[@"1",@"2"];
NSArray *array4 = @[@"1",@"2",@"6"];
NSSet *set3 = [NSSet setWithArray:array3];
NSSet *set4 = [NSSet setWithArray:array4];

BOOL isSub = [set3 isSubsetOfSet:set4];     //isSub为YES
```

## 常用的方法
`-` componentsJoinedByString:
构造并返回一个NSString对象，该对象是在数组元素之间插入给定分隔符的结果。
```objc
    NSArray *array = @[@"a",@"b",@"c"];
    NSString *string = [array componentsJoinedByString:@"-"];
    打印string  a-b-c
```
`-` firstObjectCommonWithArray:
返回接收数组中包含的第一个对象，该对象等于另一个数组中的对象。
```objc
    NSArray *array = @[@"a",@"b",@"c"];
    NSArray *array2 = [array firstObjectCommonWithArray:@[@"c",@"a",@"b"]];
    NSLog(@"%@",array2); // a
```

`-` objectEnumerator
返回一个枚举器对象，该对象允许您访问数组中的每个对象。
`-` reverseObjectEnumerator
返回一个枚举器对象，该对象允许您以相反的顺序访问数组中的每个对象。
```objc
    NSArray *array = @[@"1",@"2",@"3",@"4",@"7",@"5",@"6"];
    NSEnumerator *enumerator = [array objectEnumerator];
    NSString *obj;
    while (obj = [enumerator nextObject]) {
        NSLog(@"数组正序值开始打印：%@\n",obj);
    }
    NSEnumerator *reverseEnumerator = [array reverseObjectEnumerator];
    id reverseObj;
    while (reverseObj = [reverseEnumerator nextObject]) {
        NSLog(@"数组逆序值开始打印：%@\n",reverseObj);
    }
```

`-` (NSArray<ObjectType> *)sortedArrayUsingFunction:(NSInteger (NS_NOESCAPE *)(ObjectType, ObjectType, void * _Nullable))comparator context:(nullable void *)context;
排序，已经有一种block的方法了，这也算是另一种实现,这种感觉没必要了，用swift的写法更便捷
```objc
// 实现函数
NSInteger intSort(id num1, id num2, void *context) {
    int v1 = [num1 intValue];
    int v2 = [num2 intValue];
    if (v1 < v2) {
        return NSOrderedAscending;
    } else if (v1 > v2) {
        return NSOrderedDescending;
    } else {
        return NSOrderedSame;
    }
}
NSArray *array = @[@"1",@"2",@"3",@"4",@"7",@"5",@"6"]
NSArray *array1 = [array sortedArrayUsingFunction:intSort context:nil];

// 便捷的实现排序
NSArray *array = @[@"1",@"2",@"3",@"4",@"7",@"5",@"6"];
NSArray *array1 = [array sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
        if ([obj1 intValue] < [obj2 intValue]) {
            return NSOrderedAscending;
        }else if ([obj2 intValue] < [obj1 intValue]){
            return NSOrderedDescending;
        }
        return NSOrderedSame;
    }];
```
`- `(void)replaceObjectAtIndex:(NSUInteger)index withObject:(ObjectType)anObject; 
用anObject替换index处的对象
```objc
NSMutableArray *array = [NSMutableArray arrayWithObjects:@"1",@"2",@"3", nil];
[array replaceObjectAtIndex:0 withObject:@"10"];
打印结果： @"10",@"2",@"3"
```
removeObjectIdenticalTo:将删除指向的对象，
removeObject:将针对数组中的所有项目运行isEqual:，并在其返回true时将其删除。
 编辑： 如果你知道你有相同的对象(如NSViews或类似的)，removeObject:应该用于removeObjectIdenticalTo:，PLACEHOLDER_FOR_CODE_4用于字符串和对象，它们可能不是同一个对象，但在实际应用中应该被认为是平等的，参考[Equality](https://nshipster.cn/equality/)看不可变的字符串有什么不同
 举个栗子
 ````
        NSString * s1 = [NSMutableString stringWithString: @"Red"];
        NSString * s2 = [NSMutableString stringWithString: @"Yellow"];
        NSString * s3 = [NSMutableString stringWithString: @"Red"];
        NSString * s4 = [NSMutableString stringWithString: @"Cyan"];
        NSMutableArray * myColors = [NSMutableArray arrayWithObjects: s1,s2,s3,s4,nil];
        打印  [myColors removeObject:s1]; ，会将s1和s3都删掉
             [myColors removeObjectIdenticalTo:s1]; 只删除s1
 ````

## 单个cell存在多个视图
一个cell上有多个重复view
```objc
NSInteger index = indexPath.row * 3;
NSMutableArray *listAry = [NSMutableArray array];
for (NSInteger i = index; i < (index + 3); i++) {
    if (i >= _appleSource.count ) {break;}
    Recharge * recharge = (Recharge*)[_appleSource objectAtIndex:i];
    [listAry addObject:recharge];
}
cell.recharges = listAry;
```
 

 
