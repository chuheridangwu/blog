
# List用法

集合包含列表list、映射Map、集合Set。
```dart
// List
 var names = ["1","2","3"];
// 利用set给数组去重  
 names = Set.from(names).toList();
 // Set
 var moves =  {"莎士比亚","肖金钱豹","花蝴蝶"};
 // Map
 var info = {"name":"小明","age":12};
```

## 数组的增删改查
数组主要的作用就是增删改查，常用的就是查改删

增
```dart
List.add()  // 添加指定的值到末尾
List.addAll()  // 添加其他数组到末尾
List.insert(index,value)  // 在指定的位置插入值
List.insertAll(int start, [Itearble]])  // 在指定的位置，插入数组的值
```

删
```dart
List.remove()  // 函数删除列表中第一次出现的指定项。如果成功返回true
List.removeAt()  // 函数删除指定索引处的值并返回删除的值
List.removeLast()  // 删除数组中最后一个值
List.removeRange(int start, int end)  // 删除指定范围内的项目,不包含end
```

改
```dart
List.replaceRange(int start_index,int end_index,Iterable <items>) // 使用Iterable替换指定范围的值，不包含end
```

## List 使用 Map方法获取到索引的技巧
首先将List转成map对象，然后使用通过遍历 map 对象获取到索引,之后将map的value转回List。
```dart
final fruitList = ['apple', 'orange', 'mango'];
final fruitMap = myList.asMap(); // {0: 'apple', 1: 'orange', 2: 'mango'}

// 使用方式
fruitList.asMap.map((i, element) => MapEntry(i, Stack(
  GestureDetector(onTap: () {
    setState(() {
      // print("element=${element.toString()}");
    });
  }),
))).values.toList();
```