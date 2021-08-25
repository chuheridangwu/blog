# Python常用脚本

## 批量下载接口图片

```python
# -*- coding: utf-8 -*
#!/usr/bin/python3

import os
import json
import requests
import urllib

url="https://live.maozhuazb.com/Living/GetGiftListV2"

# 获取接口内容, 获取的数据bytes数据类型，将bytes类型转换成字符串
r = requests.get(url)
str1 = str(r.content, encoding = "utf-8") 

#  将字符串转换成 字典
dict = json.loads(str1)
list = dict.get("data").get("giftList")

#获取当前工作目录
dir = os.getcwd(); 

for target in list:
    # 判断当前路径是否已经创建了文件，如果没有则创建
    if not os.path.exists(target.get("name")):
        os.makedirs(target.get("name"))
    # 获取对应的接口数据
    icon = target.get("icon")
    hotIcon = target.get("hoticon")
    if len(icon) != 0 :
        #  下载图片，合并当前路径和新的文件夹路径 + 图片名称 
        urllib.request.urlretrieve(icon, os.path.join(dir, target.get("name")) + '/icon.png')



# 从url中提取文件名
url = 'http://www.**.net/images/logo.gif'
filename = os.path.basename(url)

# urllib.request.urlretrieve() 函数有三个参数,第一个是url地址，第二个是路径地址，必须是'/home/zzp/333.jpg'这种类型，需要有文件名
例如： urllib.request.urlretrieve('https://www.baidu.com/3.jpg', '/home/zzp/333.jpg')
```

## 批量修改文件名

```python
# -*- coding: UTF-8 -*-
import os
path="/Users/user/Desktop/Retrofit2"

#获取该目录下所有文件，存入列表中
fileList=os.listdir(path)

n=0
for i in fileList:

    #设置旧文件名（就是路径+文件名） fileList[n]: 文件名称，os.sep添加系统分隔符
    oldname=path+ os.sep + fileList[n]  

    #设置新文件名
    newname=path + os.sep + "新的名字"
    
    #用os模块中的rename方法对文件改名
    os.rename(oldname,newname)  
    print(oldname,'======>',newname)

    n+=1
```