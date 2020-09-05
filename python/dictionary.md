# 字典
字典常见的操作 增、删、改、查

```python
dict.clear(       dict.get(         dict.pop(         dict.update(
dict.copy(        dict.items(       dict.popitem(     dict.values(
dict.fromkeys(    dict.keys(        dict.setdefault( 
```
## 增加元素
```python
info = {'name':'xiaoming', 'id':1,  'address':'北京'}
info['sex']=2  # 在使用 变量名['键'] = 数据 时，这个“键”在字典中，不存在，那么就会新增这个元素
打印info结果：{'name':'xiaoming', 'id':1,  'address':'北京', 'sex':2}

# 两个字典进行合并
dict = {'Name': 'Runoob', 'Age': 7}
dict2 = {'Sex': 'female' }
dict.update(dict2)
打印dict结果： {'Name': 'Runoob', 'Age': 7, 'Sex': 'female'}
```

## 修改元素
```python
info = {'name':'xiaoming', 'id':1,  'address':'北京'}
info['id']=10  # 修改id的值
打印info结果：{'name':'xiaoming', 'id':1,  'address':'北京', 'sex':10}
```

## 删除元素(del、clear、pop、popitem)
```python
info = {'name':'xiaoming', 'id':1,  'address':'北京', 'sex':2}
del info['sex']
打印info结果： {'name':'xiaoming', 'id':1,  'address':'北京'}

info.pop['id']  # 返回值为被删除的值
打印info结果： {'name':'xiaoming',  'address':'北京'}

info.popitem() # 删除字典中的最后一对键和值。如果字典已经为空，却调用了此方法，就报出KeyError异常。
打印info结果： {'name':'xiaoming'}

info.clear()
打印info结果： {}
```

## 查找元素
| 方法 | 说明 |
| :---: | :---: |
| `len(dict)` | 获取字典的键值对个数 | 
| `dict.keys()` | 返回一个包含字典所有KEY |
| `dict.values()` | 返回一个包含字典所有value |
| `dict.items()` | 返回一个包含所有（键，值）元祖 |

```python
# 判断字典里面有没有key值
dict = {'name':'xiaoming', 'id':1,  'address':'北京', 'sex':2}
if 'name' in dict:
    print("info字典的key值含name")

# dict.keys()、dict.value()、dict.items() 返回的是一个不是一个列表，使用list
list(dict.keys())
list(dict.values())
list(dict.items())
```

## 循环
* 遍历字典的key-value
```python
dict = {'Name': 'Runoob', 'Age': 7}
for key,value in dict.items():
    print(key, ":\t", value)
```
* 遍历字典的key
```python
dict = {'Name': 'Runoob', 'Age': 7}
for key in list(dict.keys()):
    print(key)
```

* 遍历字典的value
```python
dict = {'Name': 'Runoob', 'Age': 7}
for value in list(dict.values()):
    print(value)
```

## 字典技巧

* key跟value进行调换

```python

dic = {
    'a': 1,
    'b': 2,
    'c': 3,
}

reverse = {v: k for k, v in dic.items()}

print(dic)
print(reverse)

输出结果:
{'a': 1, 'b': 2, 'c': 3}
{1: 'a', 2: 'b', 3: 'c'}

```

*  字典转成字符串
| 方法 | 说明 | 
| :---: | :---: | 
| `str(dict)` | 字典转成字符串格式 | 