# 列表
列表常见的操作，初始化、增、删、改、查、排序

```
list.append(   list.count(    list.insert(   list.reverse(  
list.clear(    list.extend(   list.pop(      list.sort(     
list.copy(     list.index(    list.remove(  
```

## 添加元素(append, extend, insert)
```python
list = ['zhang','wang','zhao']
list.append("li")
打印list结果： ['zhang', 'wang', 'zhao', 'li']

list = [1, 2]
list2 = [3, 4]
list.append(list2)
打印list结果：[1, 2, [3, 4]]

list.extend(list2)
打印list结果：[1, 2, 3, 4]
```

* 通过extend可以将另一个集合中的元素逐一添加到列表中
```python
list = [1, 2]
list2 = [3, 4]

list.extend(list2)
打印list结果：[1, 2, 3, 4]
```

* insert(index, object) 在指定位置index前插入元素object
```python
list = [1, 2]
list.insert(1,3)
打印list结果[0, 3, 1, 2]
```

## 修改
```python
list = [1,2,3,4]
list[0] = 0
打印list结果[0, 2, 3, 4]
```
## 查找元素(in, not in, index, count)
* in（存在）,如果存在那么结果为true，否则为false
* not in（不存在），如果不存在那么结果为true，否则false

```python

list = [1,2,3,4,5,6]

if 1 in list:
    print("数组中包含")

if 1 not in list:
    print("数组中不包含")

```
* index: 寻找列表 某个值 第一个匹配项的下标位置

```python
list = ['a','b','c','a','b']
打印 list.index('c') 结果： 2
```

* count: 返回元素在列表中出现的次数

```python
list = [123, 'xyz', 'zara', 'abc', 123];
打印 list.count(123) 结果: 2
打印 list.count('zara') 结果: 1
```


## 删除元素(del, pop, remove,clear)
* del：根据下标进行删除

```python
list = [1,2,3,4,5]
del list[3]
打印list结果 [1, 2, 3, 5]
```
* pop：删除最后一个元素

```python
list = [1,2,3,4,5,6]
list.pop()
打印list结果 [1,2,3,4,5]
```
* remove：根据元素的值进行删除 （如果有多个重复元素，删除第一个）

```python
list = ['a', 'b', 'c', 'a']
list.remove('a')
打印list结果 ['b', 'c', 'a']
```

* clear： 清空列表元素

```python
list = ['a', 'b', 'c', 'a']
list.clear()
打印list结果 []
```

## 排序(sort, reverse)
* sort: 将list按特定顺序重新排列，默认为由小到大。参数`reverse=True`可改为倒序，由大到小。

```python
list = [1,4,2,3]
list.sort()
打印list结果: [1, 2, 3, 4]

list = [1,4,2,3]
list.sort(reverse=True)
打印list结果: [4, 3, 2, 1]
```

* reverse：将元素逆序

```python
list = [1,4,2,3]
list.reverse()
打印list结果: [1, 2, 3, 4]

```

## 列表操作符
| Python 表达式	| 结果 | 描述 |
| :---: | :---: | :---: |
| len([1, 2, 3]) | 3 | 长度 |
| [1, 2, 3] + [4, 5, 6]	| [1, 2, 3, 4, 5, 6] | 组合 |
| ['Hi!'] * 4 | ['Hi!', 'Hi!', 'Hi!', 'Hi!'] | 重复 |
| 3 in [1, 2, 3] | True | 元素是否存在于列表中 |
| for x in [1, 2, 3]: print x, | 1 2 3 | 迭代 |

## 常用函数
| 函数名称 | 说明 |
| :---: | :---: |
| cmp(list1, list2) | 比较两个列表的元素 |
| len(list) | 列表元素个数 |
| max(list) | 返回列表元素最大值 |
| min(list) | 返回列表元素最小值 |
| list(seq) | 将元组转换为列表 |

## 常用技巧
* 带索引的数组遍历
```python
chars = ['a', 'b', 'c', 'd']
for i, chr in enumerate(chars):
    print(i, chr)
```

* 数组转字符串
```python
# 数组转json字符串
JsonStr = json.dumps(array)
# 字符串转json
array = json.load(str)
```