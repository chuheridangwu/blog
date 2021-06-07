# 操作文件和目录

处理文件时，需要导入os库，`import os`,主要的操作新建、改名、删除

```python
#!/usr/bin/python3

import os, sys

# 打开文件，如果没有会创建
fd = os.open("f1.txt",os.O_RDWR|os.O_CREAT)

# 写入内容必须是字节流
str = "This is runoob.com site"
ret = os.write(fd,bytes(str, 'UTF-8'))

# 数组转字符串
JsonStr = json.dumps(array) 

# 关闭文件
os.close(fd)
```

## os常用的方法

```python
# 查看当前目录的绝对路径:
>>> os.path.abspath('.')
'/Users/michael'

# 获取当前目录
os.getcwd()
'/Users/michael'

# 创建文件夹
os.mkdir("testdir")

# 删除目录，删除指定路径的目录。仅当前文件夹是空的才可以, 否则, 抛出OSError。
os.rmdir(path)

# 递归删除目录。像rmdir(), 如果子文件夹成功删除, removedirs()才尝试它们的父文件夹,直到抛出一个error(它基本上被忽略,因为它一般意味着你文件夹不为空)。
os.removedirs(path)

# 删除文件
os.remove("毕业论文.txt")

# 重命名文件或目录,需要完整路径 src -- 要修改的目录名  dst -- 修改后的目录名
os.rename(src, dst) 

# 递归重命名目录或文件。类似rename()。
os.renames(old, new)

# 返回指定路径下的文件和文件夹列表
os.listdir(path)

# 打开文件，设置需要打开的选项 ret = os.read(fd,12)
os.open(file, flags[, mode])
file: 要打开的文件
flags：该参数可以是以下选项，多个使用 "|" 隔开：

# 遍历文件夹，寻找文件夹下的目录及文件
os.walk(top[, topdown=True[, onerror=None[, followlinks=False]]])
top -- 根目录下的每一个文件夹(包含它自己), 产生3-元组 (dirpath, dirnames, filenames)【文件夹路径, 文件夹名字, 文件名】。
topdown --可选，默认为Truev(目录自上而下遍历)。如果为 False,  (目录自下而上遍历)。


# 读取文件
os.read(fd,n)
fd:  文件描述符。
n: 读取的字节

# 写入文件
os.write(fd, str)
fd: 文件描述符。
str: 写入的字符串。

# 关闭文件
os.close(fb)

# 改变默认目录
os.chdir("../")

# 获取目录列表
os.listdir("./")
```

## 路径处理（path）

```python
# 把目录和文件合并成一个路径
>>> os.path.join('/Users/michael', 'testdir')
'/Users/michael/testdir'

# 拆分路径，返回一个元组，后一部分总是最后级别的目录或文件名
>>> os.path.split('/Users/michael/testdir/file.txt')
('/Users/michael/testdir', 'file.txt')

# 拆分路径，获取文件扩展名
>>> os.path.splitext('/path/to/file.txt')
('/path/to/file', '.txt')

# 返回绝对路径
>>> os.path.abspath('/Users/user/Desktop/3.py')
'/Users/mlive/Desktop/3.py'

# 返回文件名
>>> os.path.basename('/Users/user/Desktop/3.py')
'3.py'

# 判断路径是否存在，存在是true,不存在是false
>>> os.path.exists('/Users/user/Desktop/3.py')
True

# 遍历path，进入每个目录都调用visit函数，visit函数必须有三个参数（arg,dirname,names）,dirname表示当前目录的目录名，names表示当前目录下的所有文件名，args是walk的第三个参数
os.path.walk(path,visit,arg)


# 判断路径是否是文件夹
os.path.isdir(path)

# 判断路径是否是文件
os.path.isfile(path)

```

## 常用Python处理

* 批量修改文件夹下的文件名称

```python
# -*- coding: UTF-8 -*-

# 批量在文件名前加前缀

import os

funFlag = 1 # 1表示添加标志  2表示删除标志

folderName = '/Users/user/Desktop/test/'

# 获取指定路径的所有文件名字
dirList = os.listdir(folderName)

# 遍历输出所有文件名字
for name in dirList:
    print name

    if funFlag == 1:
        newName = '[测试]-' + name
    elif funFlag == 2:
        num = len('[测试]-')
        newName = name[num:]
    print newName

    os.rename(folderName+name, folderName+newName)
```

## falgs 参数
| 方法|	描述 | 
| :---: | :---: | 
| os.O_RDONLY: | 以只读的方式打开| 
| os.O_WRONLY: | 以只写的方式打开| 
| os.O_RDWR : | 以读写的方式打开| 
| os.O_NONBLOCK: | 打开时不阻塞| 
| os.O_APPEND: | 以追加的方式打开| 
| os.O_CREAT: | 创建并打开一个新文件| 
| os.O_TRUNC: | 打开一个文件并截断它的长度为零（必须有写权限）| 
| os.O_EXCL: | 如果指定的文件存在，返回错误| 
| os.O_SHLOCK: | 自动获取共享锁| 
| os.O_EXLOCK: | 自动获取独立锁| 
| os.O_DIRECT: | 消除或减少缓存效果| 
| os.O_FSYNC : | 同步写入| 
| os.O_NOFOLLOW: | 不追踪软链接| 


## os.walk(path)函数
```python
# -*- coding: utf-8 -*
#!/usr/bin/python3

import os
path = "/Users/user/Desktop/test"


# root: 文件夹路径
# dirs: 文件夹元组
# files: 文件名元组
for root, dirs, files in os.walk(path, topdown=False):
    for name in files:
        print(os.path.join(root, name))
    for name in dirs:
        print(os.path.join(root, name))
```