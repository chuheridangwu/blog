# Re库
Re库是Python的标准库，主要用于字符串匹配，Re库的使用 r'正则表达式'，使用前需要导入`import re`

## 常用的方法
| 函数名 |	说明 | 
| :---: | :---: | 
| re.search()| 在字符串中搜索匹配正则表达式的第一个位置，返回match对象| 
| re.match()| 从一个字符串中的开始位置起匹配正则表达式，返回match对象| 
| re.findall()| 搜索字符串，以列表类型返回全部匹配的字符串| 
| re.split()| 将一个字符串按照正则表达式匹配结果进行分割，返回列表对象| 
| re.finditer()| 搜索字符串，返回一个匹配结果的迭代类型，每个迭代元素是match对象| 
| re.sub()| 在一个字符串中替换所有匹配正则表达式的子串，返回替换后的字符串| 

## re.search(parttern,string,flags=0)
在字符串中搜索匹配正则表达式的第一个位置，返回match对象
* parttern : 正则表达式的字符串
* string ：待匹配的字符串
* flags : 正则表达式使用时的控制标记
    * re.I    忽略正则表达式的大小写，[A-Z]能匹配小写字符
    * re.M  正则表达式中的^操作符能将给定字符串的每行当做匹配开始
    * re.S   正则表达式中的.操作符能匹配所有字符。默认不匹配换行符

```python
import re
match = re.search(r'[1-9]\d{5}','BIT 100081 100082')
if match:
    print(match.group(0))

打印结果：100081  #只匹配第一个位置
```

## re.match(parttern,string,flags=0)
从一个字符串中的开始位置起匹配正则表达式，返回match对象

```python
import re
match = re.match(r'[1-9]\d{5}','BIT 100081 100082')
if match:
    print(match.group(0))

打印结果为空  #因为只匹配字符串的开始位置，所以没有match对象

import re
match = re.match(r'[1-9]\d{5}','100083BIT 100081 100082')
if match:
    print(match.group(0))
打印结果：100083
```


## re.findall(parttern,string,flags=0)
搜索字符串，以列表类型返回全部能匹配的字符串

```python
import re
ls = re.findall(r'[1-9]\d{5}','100083BIT 100081 100082')
print(ls)

打印结果： ['100083', '100081', '100082']
```

## re.split(parttern,string,maxsplit=0,flags=0)
将一个字符串按照正则表达式匹配结果进行分割，符合正则表达式结果作为一个空元素，返回列表对象
maxsplit : 最大分割数，剩余部分作为最后一个元素输出

```python
import re
ls = re.split(r'[1-9]\d{5}','100083BIT 100081 100082')
print(ls)
ls1 = re.split(r'[1-9]\d{5}','100083BIT 100081 100082',maxsplit=1)
print(ls1)

打印结果：['', 'BIT ', ' ', '']
        ['', 'BIT 100081 100082']
```

## re.finditer(parttern,string,flags=0)
搜索字符串，返回一个匹配结果的迭代类型，每个迭代元素是match对象

```python
import re
for m in re.finditer(r'[1-9]\d{5}','100083BIT 100081'):
    if m:
        print(m.group(0))

打印结果：  100083
          100081
```

## re.sub(parttern，repl,string,count=0,flags=0)
在一个字符串中替换所有匹配正则表达式的子串，返回替换后的字符串
* repl : 替换匹配的字符串
* count :  最大替换次数

```python
import re
string = re.sub(r'[1-9]\d{5}','zipcode','BIT100081 TSU100082')
print(string)
str = re.sub(r'[1-9]\d{5}','zipcode','BIT100081 TSU100082',count=1)
print(str)

打印结果：BITzipcode TSUzipcode
        BITzipcode TSU100082
```

## Re的其他写法

```python
等价写法
rst = re.search(r'[1-9]\d{5}','BIT 100081')
等价于
pat = re.compile(r'[1-9]\d{5}')
res = pat.search('BIT 100081')
```

`pat = re.compile(pattern,flags=0)`

将正则表达式的字符串编译成正则表达式对象

## 贪婪匹配和最小匹配
在匹配的字符串中，如果字符串有多项字符串可以匹配正则表达式的，默认使用贪婪匹配，即匹配最长的字符串，例:

```python
import re
match = re.search(r'PY.*?N','PYANBNCNDNEN')  # 默认使用贪婪匹配
if match:
    print(match.group(0))
    
match1 = re.search(r'PY.*?N','PYANBNCNDNEN') # 更改正则，使用？约束成最小匹配
if match1:
    print(match1.group(0))
    
打印结果：PYANBNCNDNEN
        PYAN
```

## Match对象
match对象是一次匹配的结果，里面包含了很多匹配信息，如果希望获得所有的匹配对象，使用findall

### 属性

| 属性 |	说明 | 
| :---: | :---: | 
| string | 待匹配的文本 | 
| re | 匹配时使用的pattern对象(正则表达式) | 
| pos | 正则表达式搜索文本的开始位置 | 
| endpos | 正则表达式搜索文本的技术位置 | 

### 方法

| 方法 |	说明 | 
| :---: | :---: | 
| group(0) | 获取匹配后的字符串 |  
| start() | 匹配字符串在原始字符串的开始位置 |
| end() | 匹配字符串在原始字符串的结束位置 | 
| span() | 返回(.start(),.end()) | 

```python
import re
match = re.search(r'[1-9]\d{5}','BIT100081 TSU100084')
if match:
    print("string:" + match.string)
    print(match.re)
    print(match.pos)
    print(match.endpos)
    print(match.group(0))
    print(match.start())
    print(match.end())
    print(match.span())
    
打印结果：string:BIT100081 TSU100084
    <_sre.SRE_Pattern object at 0x10ded39f0>
    0
    19
    100081
    3
    9
    (3, 9)
```
