# 文件操作常用到的python段

## 批量修改文件名
```python
# -*- coding: UTF-8 -*-
import os
path="/Users/mlive/Desktop/Retrofit2"

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