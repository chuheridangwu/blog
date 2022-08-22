# Linux
学习linux主要是在编程过程中偶尔要用到这些命令，使用linux来查询相对来说方便一些，自己经常忘记linux命令，查找不是很方便，所以记录下来

手册： 如果不知道命令都有什么参数，可以使用`man  对应的命令`来查询，比如`man  ls`

linux常见命令

命令    含义    示例
column0 | column1 | column2
------- | ------- | -------
cd | 切换到对应路径 | `cd xxx`
ls | 查看当前文件下目录 | `ls`
cat | 查看当前文件内容 | `cat xxx`
pwd | 查看当前路径 | `pwd`
mkdir | 创建文件件 | `mkdir xxx`
rmdir | 删除文件夹 | `rmdir xxx`
touch | 创建文件 | `touch xxx`
rm | 删除文件 | `rm xxx`
mv | 移动文件位置 | `mv xxx ~/xxx`
find | 查找文件 | `find xxx`
file | 查看文件具体类型，比如ipa其实就是zip文件。只是后缀改了 | `file xxx`

cd ls cat pwd  mkdir rmdir  touch  cp  rm mv find  file

## ls 查看文件
* ls  查看当前文件

|  快捷键   | 含义  |
|  ----  | ----  |
| `ls -l ` | 文件详情 |
| `ls -h ` | 文件大小，以字节显示 |
| `ls -2* ` | 搜索2开头的文件 |
| `ls -2?` | 文件详情 |

## ln
* ln -s 文件名
* ln -s

ln -s  属于软连接快捷方式
ln 属于硬链接快捷键

## cat
查看当前文件内容,一个`>`表示覆盖，两个`>>`表示追加。
cat 1.txt 2.txt >> 3.txt : 把1.txt  和 2.txt的内容合并到3.txt中

## grep
grep 是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来，grep 全称是 Global Regular Expression Print 表示全局正则表达式版本，使用权限是所有用户。

  快捷键   | 含义  |
  ----  | ----  |
 `grep 'a' 1.txt` | 查找a在1.txt的所有记录 |
 `grep -n 'a' 1.txt` | 显示在多少行 |
 `grep '^a' 1.txt`  | 显示a开头的内容 |
-c | 只输出匹配行的计数
-i | 不区分大小写
-h | 查询多文件时不显示文件名
-l | 查询多文件时只输出包含匹配字符的文件名
-n | 显示匹配行及行号
-s | 不显示不存在或无匹配文本的错误信息
-v | 显示不包含匹配文本的所有航
--colot=auto | 可以将找到的关键词部分加上颜色的延时
-E  |   使用扩展的正则表达式
-o  |   只显示跟查询匹配的部分

很多时候一行日志中有非常多的内容，我们往往只关心特定的部分，这个时候可以使用 grep 的正则来过滤出我们关心的部分,比如日志中的耗时我们可能会打印出 cost 10ms 这样的内容`grep -o -P "cost [0-9]+ms"`。`-o` 表示只输出匹配到的内容，每一行显示一个。`-P "regex"` 表示开启正则过滤
  
a$ 查找以a结尾的文件

// 因为Linux对文件后缀不敏感，所以不能想window一样考后缀等识别文件类型，也就是，linux下改变了文件的后缀名，仍然可以按它原来的样子执行。所以有查看文件类型的命令。
`file 文件`
参数
 -b 只列出结果，不显示文件名称file -b 文件
 -f 批量显示多个文件的文件类型file -f 文件列表
 -F 更改显示的时候的分隔符，默认是':"。file -F "==" -L软链接指向的原始文件的类型file -L 软链接`

## sort
命令从标准输入中读取数据，然后安装字符串内容进行排序

符号 | 含义
------- | -------
-f | 忽略字符大小写
-n | 比较数值大小
-t | 指定分隔符，默认是空格或者tab
-k | 指定分割后进行比较字段
-u | 重复的行只显示一次
-r | 反向排序
-R | 打乱排序

## uniq
去除重复的行，前提是重复的行是连续的

column0 | column1
------- | -------
-c | 显示每行重复的次数
-d | 仅显示重复过的行
-u | 仅显示不曾重复的行


## wc

column0 | column1
------- | -------
-l | 统计行数
-c | 统计字节数
-w | 统计单词数

## find

符号 | 含义
------- | -------
-name | 按照文件名查找文件`find -name "*.txt"`
-perm | 按照文件权限查找文件
-mtime -n +n | 按照文件的更改时间查找文件，-n表示文件更改时间距现在n天以内，+n表示文件更改时间距现在n天以前，find命令还有-atime和-ctime选项
d | 目录
b | 块设备文件
c | 字符设备文件
p | 管道文件
l | 符号链接文件
f | 普通文件 | 

> 查找某个文件下面的字符串
`find <directory> -type f -name "*.c" | xargs grep "<strings>"`
* <directory>是你要找的文件夹；如果是当前文件夹使用 `find $(pwd)`
* `-type f` 说明，只找文件
* `-name "*.c"`  表示只找C语言写的代码，从而避免去查binary；也可以写`"*"`，表示找所有文件
* <strings>是你要找的某个字符串

## xargs
xargs 的作用是将查找到的内容输出到一行，主要用来配合其他命令。比如查找对应的文件并移动到某个目录下
`find . -name "*.txt" | xargs -I{} mv {}  xxx/`。-I{} 指定一个替换字符串作为参数替换。

## sed
sed以行为单位处理文本。

符号 | 含义
------- | -------
-e  |   script允许多个脚本执行被执行
p | print打印
a | append追加
i | insert插入 | 
d | delete删除
s | substitution替换

## crontab
liunx系统定时器，

## dirname
给予dirname一个路径名时，它会删除最后一个斜线（'/'）后的任何后缀，并返回结果。主要用于shell脚本
```shell
dirname /usr/home/carpetsmoker/dirname.wiki
/usr/home/carpetsmoker     # 结果
```

## basename
basename获取文件名 + 后缀
```shell
basename /root/test.txt
test.txt   # 输出结果，文件名+扩展名

basename /root/test.txt .txt
test  # 输出结果 文件名

path=/root/test.txt
echo "${path%%.*}" 
/root/test  # 输出结果 路径+文件名  不包含后缀
```

## 文件名获取

上面两个命令是shell提供的，难免有些限制，我们可以使用`${}`来灵活获取，而且`${}`可以用来做shell的字符子串提取。
```shell
var='/dir1/dir2/dir3/a.b.c.d'
echo ${var%%.*} #### 右起，找到最后一个'.'字符，返回开始到该字符的内容（不含'/'）=> /dir1/dir2/dir3/a
echo ${var%/*}  ## 右起，找到第一个'/'字符，返回开始到该字符的内容（不含'/'）=> /dir1/dir2/dir3
echo ${var#*/}  ## 左起，找到第一个'/'字符，返回其后面的内容（不含'/'） => dir1/dir2/dir3/a.b.c.d
echo ${var##*/} ## 左起，找到最后一个'/'字符，返回其后面的内容（不含'/'） => a.b.c.d
```

对`${}`的总结：

```markdown
* #代表左起，%代表右起。两个符号代表最后一个字符，一个符号代表第一个字符
* #：左起第一个
* ##： 左起最后一个
* %：右起第一个
* %%：右起最后一个
```

```shell
FILE="example.tar.gz"
echo "${FILE%%.*}" #取头 => example
echo "${FILE##*.}" #取尾 => gz
echo "${FILE#*.}"  #去头 => tar.gz
echo "${FILE%.*}"  #去尾 => example.tar

FILE="xxx/xx/example.tar.gz"
echo "${FILE%%.*}" #取头 => xxx/xx/example
echo "${FILE##*.}" #取尾 => gz
echo "${FILE#*.}"  #去头 => tar.gz
echo "${FILE%.*}"  #去尾 => xxx/xx/example.tar
```

在shell中的示例:
```shell
fullfile=/mnt/cos2/venus_gram/ROM/leadcore_haige/leadcore_haige_AutoTag201608311742/cos-rom_1.2.-Leadcore_haige-201608311742.zip

filename=$(basename "$fullfile")
echo $filename  # cos-rom_1.2.-Leadcore_haige-201608311742.zip

extension="${filename##*.}"
echo $extension # zip

filename="${filename%.*}"
echo $filename # cos-rom_1.2.-Leadcore_haige-201608311742
```
