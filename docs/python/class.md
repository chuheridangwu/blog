# 类

定义类的格式
```python
class 类名:
    属性
    方法列表
```

## 初始化方法 __init__
* __init__()方法，在创建一个对象时默认被调用，不需要手动调用
* __init__(self)中，默认有1个参数名字为self，如果在创建对象时传递了2个实参，那么__init__(self)中出了self作为第一个形参外还需要2个形参，例如__init__(self,x,y)
* __init__(self)中的self参数，不需要开发者传递，python解释器会自动把当前的对象引用传递进去

```python
# 定义汽车类
class Car:

    def __init__(self, newWheelNum, newColor):
        self.wheelNum = newWheelNum
        self.color = newColor
```

## 魔法方法 __xx__
* 在python中方法名如果是`__xxxx__()`的，那么就有特殊的功能，因此叫做“魔法”方法
* 当使用print输出对象的时候，只要自己定义了`__str__(self)`方法，那么就会打印从在这个方法中return的数据



## 网络请求
经常写一些小爬虫获取数据
```python
import  requests
response = requests.get("http://www.sina.com")
print(response.request.headers)
# 字符串格式
print (response.text)
print(response.content.decode('utf-8'))
# json格式
print(response.json())

# 数组转json
JsonStr = json.dumps(contents) 

//写入文件，写入文件必须是二进制数据，而且要有写的权限
# 打开文件
fd = os.open("/Users/mlive/Desktop/a.json",os.O_RDWR|os.O_CREAT)

# 写入字符串
os.write(fd,bytes(JsonStr, 'UTF-8'))

# 关闭文件
os.close(fd)
```