# iOS常用脚本
iOS因为审核的原因，需要经常更改类名，文件名、图片`hash值`、添加多余属性、添加垃圾方法，以下是常用的Python脚本

## 修改文件类名

```python

# -*- coding: utf-8 -*

import os

# 需要修改的类名前缀 （需替换）
pre_str = 'Room'
# 新的类名前缀 （需替换）
pre_to_str = 'AnchorRoom'
# 搜寻以下文件类型 （根据自己需求替换）
suf_set = ('.h', '.m', '.xib', '.storyboard','.mm','.pch')
# 项目路径   （找到自己的项目路径）
project_path = '/Users/mlive/Desktop/Mcat'
# 项目project.pbxproj文件路径 需要更新配置文件中的类名 （找到自己的项目project.pbxproj路径）
pbxpro_path = '/Users/mlive/Desktop/Mcat/9158Live.xcodeproj/project.pbxproj'

# 文件重命名函数，返回新的文件名
def file_rename(file_path):
    root_path = os.path.split(file_path)[0]     # 文件目录
    root_name = os.path.split(file_path)[1]     # 文件名包含扩展名
    filename = os.path.splitext(root_name)[0];  # 文件名
    filetype = os.path.splitext(root_name)[1];  # 文件扩展名

    new_path = os.path.join(root_path, filename.replace(pre_str, pre_to_str) + filetype)    # 拼接新路径
    os.renames(file_path, new_path)             # 文件重命名
    return filename.replace(pre_str, pre_to_str)

# 定义一个字典 key=旧类名 value=新类名
needModifyDic = {}
# 遍历文件，符合规则的进行重命名
for (root, dirs, files) in os.walk(project_path):
    for file_name in files:
        if file_name.startswith((pre_str,)) and file_name.endswith(suf_set):
            old_name = os.path.splitext(file_name)[0]
            new_name = file_rename(os.path.join(root, file_name))
            needModifyDic[old_name] = new_name

# 遍历文件，在文件中更换新类名的引用
print(needModifyDic)
for (root, dirs, files) in os.walk(project_path):
    for file_name in files:
        if file_name.endswith(suf_set):
            print('-----fileName-------' + file_name)
            with open(os.path.join(root, file_name), 'r+') as f:
                print('========fileName========' + file_name)
                s0 = f.read()
                f.close()
                for key in needModifyDic:
                    if key in s0:
                        with open(os.path.join(root, file_name), 'r+') as f4:
                            s1 = f4.read().replace(key, needModifyDic[key])
                            print(key + ' ------> ' + needModifyDic[key])
                            f4.seek(0)
                            f4.write(s1)
                            f4.truncate()
                            f4.close()
# 替换配置文件中的类名
for key in needModifyDic:
    with open(pbxpro_path, 'r+') as f:
        s0 = f.read()
        f.close()
        if key in s0:
            with open(pbxpro_path, 'r+') as f2:
                s = f2.read().replace(key, needModifyDic[key])
                f2.seek(0)
                f2.write(s)
                f2.truncate()
                f2.close()
```

## 类名宏定义

```python
# -*- coding: UTF-8 -*-
# 类名宏定义
import os
import re
import random   # 随机数
from random_words import RandomWords
rw = RandomWords()

filePath = "/Users/mlive/Desktop/morelive2" # 读取的路径
writePath = "/Users/mlive/Desktop/symbols.h"  # 写入的文件路径
prefix = "TMD"  # 类名前缀
shildDirs = ["Pods","Libstdc","Tool","ThirdParty","YYWebImage"] # 屏蔽的文件夹，该文件夹下所有文件不写入

listNames = []
delegates = []


# 遍历文件夹
def traverseDirs(path):
    for file in os.listdir(path):
        if os.path.isdir(os.path.join(path,file)) and file not in shildDirs:
            traverseDirs(os.path.join(path,file))
        elif file in shildDirs:
            continue
        else:
            file_name = os.path.splitext(file)
            if file_name[1] == ".m" and file_name[0] != "main" and '+' not in file_name:
                listNames.append(file_name[0])
            if file_name[1] == ".h" and '+' not in file_name:
                getProtocols(os.path.join(path,file))
                

# 获取代理名称
def getProtocols(path):
    f = open(path, 'r+', encoding='utf8', errors='ignore')  #errors='ignore' 忽略编码错误  encoding='utf8'： 以utf8的格式读取文件内容
    line = f.readline()
    while line:
        if "@protocol" in line and "<NSObject>" in line:
            start_index = line.find("@protocol") + len("@protocol")
            end_index = line.find("<NSObject>")
            str = line[start_index : end_index].strip()
            delegates.append(str)
        line = f.readline()
    f.close()
    return delegates


#写入宏 写入代理和类名
def writeContentForlist():
    content = ""
    for delegate in delegates: # 写入类名
        listContent = "// " + delegate + "\n" + "#ifndef " + delegate + "\n" + "#define " + delegate + "    " + randomName(delegate)  + "\n#endif   \n"
        content += listContent
    for name in listNames: # 写入类名
        listContent = "// " + name + "\n" "#ifndef " + name + "\n" + "#define " + name + "    " + randomName(name)  + "\n#endif   \n"
        content += listContent
    return content

# 生成随机类名 和 代理名
randomNammes = []
def randomName(name):

    content = ""
    for num in range(random.randint(3,5)):
        content = content + rw.random_word().capitalize()
        
    if content in randomNammes:
        randomName(name)
    elif "Delegate" in name:
        content = content + "Delegate"
    else:
        content = prefix + content
        
    randomNammes.append(content)
    
    return content

f = open(writePath,'w+')
traverseDirs(filePath)
content = writeContentForlist()
f.write(content)
f.close()
```

## .h文件添加oc属性

```python
# -*- coding: utf-8 -*
# .h文件中添加属性

import threading
import time
import os
import random # 随机数
from random_words import RandomWords # 获取随机单词
rw = RandomWords()

# 0 -- 清除添加的方法 ,1 -- 添加方法
flag = 1

# 项目路径
path = "/Users/mlive/Desktop/morelive2"

# 随机控件
controls = ["NSString","NSDictionary","NSMutableArray","NSArray","NSAttributedString"]

# 添加属性
def addAttributes(file_name):
    control = controls[random.randint(0,len(controls)-1)]
    name = "\n" + "@property (nonatomic,strong) " + control + " *" + file_name + rw.random_word() + ";"
    return name

for (root,dirs,files) in os.walk(path):
    for file_name in files:
        if file_name.endswith('.h') and '+' not in file_name : # 不在分类中添加控件

            with open(os.path.join(root,file_name),'r+', errors='ignore') as f:
                content = f.read()
                if '<Foundation/Foundation.h>'  in content or '<UIKit/UIKit.h>'  in content:
                    print("添加属性的文件名称" + file_name)
                    pos = content.rfind('@end')
                    attrs = ""
                    for num in range(5):
                        attrs = attrs + addAttributes(os.path.splitext(file_name)[0])
                    if flag:
                        content = content[:pos] + "\n" + "//start_attr" + attrs + "\n" + "//end_attr" + "\n" + content[pos:]
                    else:
                        start_index = content.rfind("//start_attr")
                        end_index = content.rfind("//end_attr") + len("//end_attr")
                        str = content[start_index : end_index]
                        content = content.replace(str,"")
                    # 定位开头
                    f.seek(0)
                    # 清空文件
                    f.truncate()
                    f.write(content)
                    f.close()
```


## .m文件中添加垃圾方法

```python
# -*- coding: utf-8 -*
# .m文件中添加方法

import os
import random # 随机数
from random_words import RandomWords # 获取随机单词
rw = RandomWords()


# 项目路径
path = "/Users/mlive/Desktop/TMBaseController"

# 控件
controls = ("UIImageView","UILabel","UIView","UIScrollView","UIButton")

# 0 -- 清除添加的方法 ,1 -- 添加方法
flag = 0

# 获取控件懒方法
def get_method():
    # 方法名
    methodName = rw.random_word() + rw.random_word().capitalize() + rw.random_word().capitalize() + rw.random_word().capitalize()
    
    # 获取随机一个控件
    control = controls[random.randint(0,len(controls)-1)]
    
    # 创建随机坐标
    rect = "(%s,%s,%s,%s)"%(random.randint(80,150),random.randint(80,150),random.randint(80,150),random.randint(80,150))
    
    content_add = "\n" + "- ("+ control +" *)" + methodName + "{" + "\n\n  " + "return [[" + control + " alloc] initWithFrame:CGRectMake" + rect + "];\n" + "\n}" + "\n"
    
    return content_add


for (root,dirs,files) in os.walk(path):
    for file_name in files:
        if file_name.endswith('.m') and ('+' not in file_name): # 只在.m文件中添加,忽略分类
            with open(os.path.join(root,file_name),'r+') as f:
                content = f.read()
                pos = content.rfind('@end')
                methods = ""
                for num in range(6):
                    methods = methods + get_method()
                if flag:
                    content = content[:pos] + "\n" + "//lazy ---" + methods + "//end_lazy ---" + "\n" + content[pos:]
                else:
                    start_index = content.rfind("//lazy ---")
                    end_index = content.rfind("//end_lazy ---") + len("//end_lazy ---")
                    str = content[start_index : end_index]
                    content = content.replace(str,"")
                # 定位到开头
                f.seek(0)
                # 清空文件
                f.truncate()
                f.write(content)
                f.close

```