# 文件操作

对文件的处理，打开、关闭文件、读取文件内容、向文件内写内容、定位读写

> `open()`方法写法

`open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
`
* file: 必需，文件路径（相对或者绝对路径）。
* mode: 可选，文件打开模式
* buffering: 设置缓冲
* encoding: 一般使用utf8
* errors: 报错级别
* newline: 区分换行符
* closefd: 传入的file参数类型
* opener:

## mode的模式（read、write、add）

只有`write`和`add`的时候，如果文件不存在，才会创建新的文件。

| 模式|	描述|
| :---: | :---: | 
|t|	文本模式 (默认)。|
|x|	写模式，新建一个文件，如果该文件已存在则会报错。|
|b|	二进制模式。|
|+|	打开一个文件进行更新(可读可写)。|
|r|	以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。|
|rb|	以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。一般用于非文本文件如图片等。|
|r+|	打开一个文件用于读写。文件指针将会放在文件的开头。|
|rb+|	以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。一般用于非文本文件如图片等。|
|w|	打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。|
|wb|	以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。|
|w+|	打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。|
|wb+|	以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。|
|a|	打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。|
|ab|	以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。|
|a+|	打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。|
|ab+|	以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。|

## 常用函数
| 方法|	描述 | 警告 |
| :---: | :---: | :---: | 
| `fileObject.close()` | 关闭文件。关闭后文件不能再进行读写操作。 | 
| `fileObject.name` | 获取文件名称（带路径） | 
| `fileObject.read([size])` | 从文件读取指定的字节数，如果未给定或为负则读取所有 | 
| `fileObject.readline([size])` | 读取整行，包括 "\n" 字符。 | 
| `fileObject.readlines([size])` | 返回列表，包含所有的行。 | 
| `fileObject.seek(offset[, whence])` | 用于移动文件读取指针到指定位置。 | 
| `fileObject.tell()` | 返回文件指针当前位置 | 
| `fileObject.write( [ str ])` |  返回文件指针当前位置 | <br> `write()` 方法用于向文件中写入指定字符串。<br><br>  在文件关闭前或缓冲区刷新前，字符串内容存储在缓冲区中，这时你在文件中是看不到写入的内容的。<br><br>  如果文件打开模式带 `b`，那写入文件内容时，**str (参数)要用 encode 方法转为 bytes 形式**，否则报错：`TypeError: a bytes-like object is required, not 'str'。` <br> |
| `fileObject.writelines( [ str ])` | 用于向文件中写入一序列的字符串,这一序列字符串可以是由迭代对象产生的，如一个字符串列表。换行需要制定换行符 `\n` | 
| `fileObject.truncate( [ size ])` | 截取文件，从开头开始截取，不指定指针位置的话，那么会清空文件，其中 Widnows 系统下的换行代表2个字节大小。 | size -- 可选，如果存在则文件截断为 size 字节 |


* **readlines()函数**

```python
#!/usr/bin/python3
 
# 打开文件
file = open("runoob.txt", "r")
print ("文件名为: ", fo.name)
 
for line in file.readlines():                          #依次读取每行  
    line = line.strip()                             #去掉每行头尾空白  
    print ("读取的数据为: %s" % (line))
 
# 关闭文件
file.close()
```
* **seek(offset[, whence])函数**
    * **offset** -- 开始的偏移量，也就是代表需要移动偏移的字节数，如果是负数表示从倒数第几位开始。
    * **whence** -- 可选，默认值为 0。给 offset 定义一个参数，表示要从哪个位置开始偏移；0 代表从文件开头开始算起，1 代表从当前位置开始算起，2 代表从文件末尾算起。

```python
#!/usr/bin/python3
 
# 打开文件
fo = open("runoob.txt", "r+")
print ("文件名为: ", fo.name)
 
line = fo.readline()
print ("读取的数据为: %s" % (line))
 
# 重新设置文件读取指针到开头
fo.seek(0, 0)
line = fo.readline()
print ("读取的数据为: %s" % (line))
 
# 关闭文件
fo.close()
```


##  常用文件处理方式

> 批量修改文件名

```python
# -*- coding: UTF-8 -*-
import os
path="/Users/user/Desktop/Retrofit2"

#获取该目录下所有文件，存入列表中
fileList=os.listdir(path)

n=0
for i in fileList:
    
    #设置旧文件名（就是路径+文件名） fileList[n]: 文件名称
    oldname=path+ os.sep + fileList[n]   # os.sep添加系统分隔符
    
    #设置新文件名
    newname=path + os.sep + "新的名字"
    
    os.rename(oldname,newname)   #用os模块中的rename方法对文件改名
    print(oldname,'======>',newname)
    
    n+=1
```

> 制作文件的备份

```python
# -*- coding: UTF-8 -*-

oldFileName = input("输入拷贝的文件名称：")
oldFile = open(oldFileName,'r')

if oldFile:

    # 提取文件的后缀
    fileFlagNum = oldFileName.rfind('.')

    print(fileFlagNum)

    if fileFlagNum > 0:
        fileFlag = oldFileName[fileFlagNum:]

    newFileName = oldFileName[:fileFlagNum] + '复件' + fileFlag

    # 创建新文件
    newFile = open(newFileName,'w')
    for line in oldFile.readlines():
        newFile.write(line)


    # 关闭文件
    oldFile.close()
    newFile.close()
```

## 常见错误
> io.UnsupportedOperation: can't do nonzero end-relative seeks

这个问题主要是因为在python3和python2的问题，如果在Python2中是不会报错的，Python3则会报错。因为Pyhon3在文本文件中，没有使用b模式选项打开的文件，只允许从文件头开始计算相对位置，从文件尾计算时就会引发异常

解决办法：`fi =open("mytest.txt","rb") #将打开模式从r变成rb即可`

> IOError: [Errno 9] Bad file descriptor
没有写的权限，在open$$打开文件的时候给写入权限