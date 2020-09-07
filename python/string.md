# 字符串
输出字符串： `print "My name is %s and weight is %d kg!" % ('Zara', 21)`

字符串的常见操作，初始化、输出、拼接、插入、删除、比较、长度、查找、替换、部分替换、大小写转换 等等

> 三个引号

三个引号允许一个字符串跨多行，字符串中可以包含换行符、制表符以及其他特殊字符。
```python
hi = '''one 
two
there
'''
```

## Python字符串运算符
假设拥有变量`a=hello b=world`

| 操作符 | 说明 | 实例 |
| :---: | :---: | :---: |
| + | 字符串连接 | a+b<br><br>打印结果`hellowordld` |
| * | 重复输出字符串 | a*4<br><br>打印结果`hellohellohellohello` |
| [] | 通过索引后去字符串中的字符 | a[1]<br><br>打印结果`e` |
| [:] | 切片截取字符串 | a[:3]<br><br>打印结果`hel` |
| in | 字符串是否包含某个字符 | `"h" in a`<br><br>打印结果`True` |
| not in | 字符串是否不包含某个字符 | `"M" not in a`<br><br>打印结果`True` |
| r/ | 原始字符串，不对转义字符进行转义 | `print r'\n'`<br><br>打印结果`\n` |

## 查询
| 方法 | 说明 | 
| :---: | :---: |
| `string.find(str, beg=0, end=len(string))` | 检测 str 是否包含在 string 中 , beg 和 end 可以指定检查范围，如果是返回开始的索引值，否则返回-1 | 
| `string.rfind(str, beg=0,end=len(string) )` | 类似于 find()函数，不过是从右边开始查找，返回索引值 |
| `string.index(str, beg=0, end=len(string))` | 跟find()方法一样，只不过如果str不在 string中会报一个异常. |
| `string.rindex( str, beg=0,end=len(string))` | 类似于 index()，不过是从右边开始. |
| `len(string)` | 字符串长度 |
| `string.count(str, beg=0, end=len(string))` | 统计字符串里某个字符出现的次数。可选参数为在字符串搜索的开始与结束位置 |
| `max(string)` | string中的最大字符 |
| `min(string)` | string中的最小字符 |

## 替换、分割、拼接
| 方法 | 说明 | 参数说明 |
| :---: | :---: | :---: |
| `string.replace(str1, str2,  num=string.count(str1))` | 把 string 中的 str1 替换成 str2,如果 num 指定，则替换不超过 num 次. (num默认是全部替换),返回替换的字符串 |
| `string.split(str="", num=string.count(str))` | 以 str 为分隔符切片 string，如果 num 有指定值，则仅分隔 num + 1 个子字符串| str -- 分隔符，默认为所有的空字符，包括空格、换行(\n)、制表符(\t)等。<br> num -- 分割次数。默认为 -1, 即分隔所有。 |
| `str.splitlines([keepends])` | 按照行('\r', '\r\n', \n')分隔，返回各行作为元素的列表，参数 keepends 为 False，不包含换行符，如果为 True，则保留换行符 , 默认是False|
| `string.partition(str)` | 有点像 find()和 split()的结合体,从 str 出现的第一个位置起,把 字 符 串 string 分 成 一 个 3 元 素 的 元 组 (string_pre_str,str,string_post_str),如果 string 中不包含str 则 string_pre_str == string  | 
| `string.rpartition(str)` | 类似于 partition()函数,不过是从右边开始查找 |
| `string.join(seq)` | 以 string 作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串|

## 大小写转换
| 方法 | 说明 |
| :---: | :---: | 
| `string.capitalize()` | 返回一个字符串,第一个字符大写 | 
| `string.upper()` | 返回一个字符串, 所有小写字母转为大写 | 
| `string.title()` | 返回一个字符串，所有单词以大写开始，其余字母小写 | 
| `string.lower()` | 返回一个字符串，所有大写字符转为小写 | 
| `string.swapcase()` | 翻转 string 中的大小写(大写变小写，小写变大写) | 

## 字符串判断
| 方法 | 说明 |
| :---: | :---: | 
| `string.startswith(obj, beg=0,end=len(string))` | 检查字符串是否是以 obj 开头，是返回 True，否返回 False。<br> beg 和 end 指定检查范围,（可忽略） | 
| `string.endswith(obj, beg=0, end=len(string))` | 检查字符串是否是以 obj 结尾，是返回 True，否返回 False。<br> beg 和 end 指定检查范围,（可忽略） | 
| `string.isdigit()` | 如果 string 只包含数字 返回 True 否则返回 False. |
| `string.isalpha()` | 如果 string 只包含字母 则返回 True,否则返回 False |
| `string.isalnum()` | 如果 string 所有字符都是字母或数字则返回 True,否则返回 False|
| `string.isspace()` | 如果 string 中只包含空格，则返回 True，否则返回 False. |
| `string.islower()` | 如果 string 中所有的字母是否都为小写 |
| `string.isupper()` | 如果 string 中所有的字母是否都为大写 |
| `str == str` | 判断两个字符串是否相等 |
| `str1 not in str` | str1 不在 str内，返回True，否在False |
| `str1  in str` | str1 在 str内，返回True，否在False |


## 字符串填充
| 方法 | 说明 |
| :---: | :---: | 
| `string.center(width)` | 返回一个原字符串居中,并使用空格填充至长度 width 的新字符串 | 
| `string.ljust(width)` | 返回一个原字符串左对齐,并使用空格填充至长度 width 的新字符串 |
| `string.rjust(width)` | 返回一个原字符串右对齐,并使用空格填充至长度 width 的新字符串 |
| `string.zfill(width)` | 返回指定长度的字符串，原字符串右对齐，前面填充0。|

## 字符串删除空格
| 方法 | 说明 | 参数说明 |
| :---: | :---: | :---: | 
| `string.lstrip([chars])` | 移除string 左侧 指定的字符（默认为空格或换行符） | chars -- 移除字符串头尾指定的字符序列。 |
| `string.rstrip([chars])` | 移除string 右侧 指定的字符（默认为空格或换行符） | 
| `string.strip([chars])` | 在 string 上执行 lstrip()和 rstrip()，移string头尾指定的字符（默认为空格或换行符） | 

## 字符串编码解码、格式化
| 方法 | 说明 | 参数说明 |
| :---: | :---: | :---: | 
| `str.decode(encoding='UTF-8',errors='strict')` | 以 encoding 指定的编码格式解码 string，如果出错默认报一个 ValueError 的 异 常 ， 除非 errors 指 定 的 是 'ignore' 或 者'replace' | cencoding -- 要使用的编码，如"UTF-8"。<br>  errors -- 设置不同错误的处理方案。默认为 'strict',意为编码错误引起一个UnicodeError。 其他可能得值有 'ignore', 'replace', 'xmlcharrefreplace', 'backslashreplace' 以及通过 codecs.register_error() 注册的任何值。 |
| `string.encode(encoding='UTF-8', errors='strict')` | 以 encoding 指定的编码格式编码 string，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace' |  |
| `string.format()` | 格式化字符串 |  |

## 重点函数讲解
* `string.join(seq)`函数

```python
str = " "
li =["my","name","is","join"]
str.join(li)
打印结果 'my name is join'

str="_"
str.join(li)
打印结果：'my_name_is_join'
```

* `string.partition(str)`函数

```python
str = 'hello world and it'
str.partition('l') 
打印结果： ('he', 'l', 'lo world and it')

str.partition('z')
打印结果： ('hello world and it', '', '')
```

* `string.format()`函数

```python
>>>"{} {}".format("hello", "world")    # 不设置指定位置，按默认顺序
'hello world'
 
>>> "{0} {1}".format("hello", "world")  # 设置指定位置
'hello world'
 
>>> "{1} {0} {1}".format("hello", "world")  # 设置指定位置
'world hello world'

print("网站名：{name}, 地址 {url}".format(name="菜鸟教程", url="www.runoob.com"))
 
# 通过字典设置参数
site = {"name": "菜鸟教程", "url": "www.runoob.com"}
print("网站名：{name}, 地址 {url}".format(**site))
 
# 通过列表索引设置参数
my_list = ['菜鸟教程', 'www.runoob.com']
print("网站名：{0[0]}, 地址 {0[1]}".format(my_list))  # "0" 是必须的
```

* `str.maketrans(intab, outtab)`创建字符映射的转换表
    * intab -- 字符串中要替代的字符组成的字符串。
    * outtab -- 相应的映射字符的字符串


注：Python3.4 已经没有 string.maketrans() 了，取而代之的是内建函数: bytearray.maketrans()、bytes.maketrans()、str.maketrans() 。

```python
intab = "aeiou"
outtab = "12345"
trantab = str.maketrans(intab, outtab) #python3.7之前的方法是 maketrans(intab, outtab)

string = "i love you" 
print (string.translate(trantab))
打印结果： '3 l4v2 y45'
```

* 字符串和字节流之间的转换，可以直接使用`decode()`进行解码
 
从str到bytes，是编码,   比特流=str(串,encoding='utf-8')

```python
>>> s = "中文"
>>> type(s)
<class 'str'>
>>> b = bytes(s, encoding='utf-8')
>>> b
b'\xe4\xb8\xad\xe6\x96\x87'     #\x 代表是十六进制
>>> type(b)
<class 'bytes'>
>>> b.decode() # 直接进行解码，更改为中文
'中文'
```

从bytes到str，是解码，串=bytes(比特流,encoding='utf-8')

```python
>>> b
b'\xe4\xb8\xad\xe6\x96\x87'
>>> type(b)
<class 'bytes'>
>>> s1 = str(b, encoding='utf-8')   #这样是对的,指定解码方式
>>> s1
'中文'
>>> type(s1)
<class 'str'>
```

* 字符串可以直接判断是否在数组内
```python
controls = ("UIImageView","UILabel","UIView","UIScrollView","UIButton")
str = "UILable"
if str in controls:
    print('含有str')
```