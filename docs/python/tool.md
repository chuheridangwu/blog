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

## 从文件中使用正则提取字符串

```python
# -*- coding: UTF-8 -*-
import re

# 读取文件
path="/Users/mlive/Desktop/strings1.xml"

# 读取文件  errors='ignore' 忽略编码错误  encoding='utf8'： 以utf8的格式读取文件内容
f=open(path, 'r+', encoding='utf8', errors='ignore')  

# 遍历读取行
line=f.readline()
while line:
    # 根据正则取出字符串 > 开头 < 结尾
    match=re.search(r'>.*<',line)
    if match:
        # 删除左边的 > 和右边的 <
        reString=match.group(0).lstrip(">").rstrip("<")
        print(reString)
    line = f.readline()

# 关闭文件
f.close()
```

## 批量将 webp 图片 转成 png图片
webp 转 png 需要使用到 dwebp 控件

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import time

# 遍历指定目录，显示目录下的所有文件名
def webpToPngWithPath(path):
    fileList=os.listdir(path)
    
    n=0
    for i in fileList:

        #设置旧文件名（就是路径+文件名） fileList[n]: 文件名称，os.sep添加系统分隔符
        filename=fileList[n]
        if filename.endswith('.webp'):
            webp = path+ os.sep + filename
            jpg = "/Users/dikh/Desktop/Resouce/%s.png"%(os.path.splitext(filename)[0])

            # 调用shell命令 将 webp 转换成 png
            commandline = "dwebp %s -o %s" % (webp, jpg)
            os.system(commandline)

            print(webp + " ------> 转换成功")

            # 删除原来的图片
            delline = "rm -f %s" % (webp)
            os.system(delline)

            print(webp + " ------> 删除原来的图片")

        n+=1

if __name__ == "__main__":
    webpToPngWithPath("/Users/dikh/Desktop/abc")
```

## 从网站获取IP池导出excil

```python
from io import StringIO
from os import name
from typing import final
import bs4
import requests
import csv
import random
import time
import socket
import http.client
# import urllib.request
from bs4 import BeautifulSoup

f_csv = 0
def get_content(url , data = None):
    header={
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.235'
    }
    timeout = random.choice(range(80, 180))
    while True:
        try:
            rep = requests.get(url,headers = header,timeout = timeout)
            rep.encoding = 'utf-8'
            # req = urllib.request.Request(url, data, header)
            # response = urllib.request.urlopen(req, timeout=timeout)
            # html1 = response.read().decode('UTF-8', errors='ignore')
            # response.close()
            break
        # except urllib.request.HTTPError as e:
        #         print( '1:', e)
        #         time.sleep(random.choice(range(5, 10)))
        #
        # except urllib.request.URLError as e:
        #     print( '2:', e)
        #     time.sleep(random.choice(range(5, 10)))
        except socket.timeout as e:
            print( '3:', e)
            time.sleep(random.choice(range(8,15)))

        except socket.error as e:
            print( '4:', e)
            time.sleep(random.choice(range(20, 60)))

        except http.client.BadStatusLine as e:
            print( '5:', e)
            time.sleep(random.choice(range(30, 80)))

        except http.client.IncompleteRead as e:
            print( '6:', e)
            time.sleep(random.choice(range(5, 15)))

    return rep.text
    # return html_text

def get_data(html_text):
    final = []
    bs = BeautifulSoup(html_text, "html.parser")
    body = bs.body
    tables = body.findAll('table')
    tab = tables[0]
    for tr in tab.tbody.findAll('tr',{'class':'ip1'}):
        td = tr.findAll('td')
        td1 = td[0].string
        td2 = td[1].get('title')
        strs = td2.split('IP地址')
        pro = strs[0]
        url = 'http://ip.bczs.net/city/' + td1
        html = get_content(url)
        result = get_ips(html,pro)
        for string in result:
                strs = string.split(' ')
                f_csv.writerow(strs)
        print(td2)
        time.sleep(1)
    return final


def get_ips(html_text,proname):
    final = []
    bs = BeautifulSoup(html_text, "html.parser")
    body = bs.body
    tables = body.findAll('table')
    tab = tables[0]
    for tr in tab.tbody.findAll('tr'):
        td = tr.findAll('td')
        td1 = td[0].string
        td2 = td[1].string
        td3 = td[3].string
        string = td1 + ' ' + td2 + ' ' + proname + td3
        final.append(string)
    return final


if __name__ == '__main__':
    url ='http://ip.bczs.net/city'
    with open('ip.csv', 'a', errors='ignore', newline='') as f:
            f_csv = csv.writer(f)
            f_csv.writerow(["开始","结束","地区"])
            html = get_content(url)
            result = get_data(html)
```

## 指定行插入文字
```python
# -*- coding: utf-8 -*

import os
#  遍历文件夹下的文件
for (root, dirs, files) in os.walk("/Users/xxx/Desktop/Lean/xgn/1"):
    for file_name in files:
        print('-----fileName-------' + file_name)
        print(os.path.splitext(file_name)[0]) # 获取文件名 xxx.txt 获取xxx
        lines=[]
        f=open(os.path.join(root, file_name), 'r')  #your path!
        for line in f:
            lines.append(line)
        f.close()
        lines.insert(2,"23232")
        s=''.join(lines)
        f=open(os.path.join(root, file_name), 'w+') #重新写入文件
        f.write(s)
        f.close()
        del lines[:]
```

## 删除视频制定前几秒后生成新的视频
```python
import os
import subprocess

# 设置要处理的视频文件夹路径和输出文件夹路径
input_output_folder = '../短视频/玩转手机影像全系课'

# 确保输出文件夹存在
if not os.path.exists(os.path.join(input_output_folder, 'output')):
    os.makedirs(os.path.join(input_output_folder, 'output'))

# 遍历文件夹中的所有视频文件
for filename in os.listdir(input_output_folder):
    if filename.endswith('.mp4') or filename.endswith('.avi'):
        # 构造输入和输出文件路径
        input_path = os.path.join(input_output_folder, filename)
        output_path = os.path.join(input_output_folder, 'output', filename)

        # 使用FFmpeg裁剪前10秒并输出到新的文件
        subprocess.run(['ffmpeg', '-i', input_path, '-ss', '00:00:12', '-c', 'copy', output_path])
```