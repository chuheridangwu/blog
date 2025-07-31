# Shell
shell是c语言编写的程序，是用户使用 liunx 的桥梁，主要功能是用来写脚本，可以把一些重复类的工作交给 shell 来处理，提高我们的工作效率。通过`echo $SHELL`查看当前使用的shell，一个电脑中可能有多个shell路径，通过`chsh`可以修改当前使用的shell。开启一个 shell 相当于开启了一个线程。

## shell运行
1. 创建以`.sh`为扩展名的文件
2. 编辑脚本，第一行以`#！`开头，声明shell全路径。例如：`#!/bin/bash`
3. 运行脚本  `/bin/sh  test.sh`   或者 `bash test.sh` 或者 `sh test.sh`


## 基础变量
变量分为自定义变量和环境变量。自定义变量只能在当前shell进程中使用,自定义变量默认是全局变量，使用局部变量需要在变量前加 `local` ，不能跨进程使用。环境变量是系统预设的一些变量，每一个进程都可以使用，当启动一个线程时，环境变量是从父进程拷贝到子进程，子进程改变环境变量不会影响到父进程。

**定义变量**
`name='dongyumao'`,name就是一个变量，赋值时=号两边不能有空格，传递参数

```shell
 name='dongyumao'
 value=$name
 echo $value
 echo ${value}
 echo "$value is good"   # 双""号支持解析  单''号不支持解析
 echo "$value is good \$500" #如果字符串中有特殊字符，使用\转意

# 设置只读变量
dongyumaodeMacBook-Pro:Desktop DYM$ url=www.sign.com.cn
dongyumaodeMacBook-Pro:Desktop DYM$ readonly url

# 删除变量   不能删除只读变量
dongyumaodeMacBook-Pro:Desktop DYM$ unset url
```

**环境变量**

```shell
#  获取系统变量,输入 export 查看系统变量，可以直接使用系统变量echo $HOME
declare -x Apple_PubSub_Socket_Render="/private/tmp/com.apple.launchd.Es83Prcnzq/Render"
declare -x FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
declare -x GEM_HOME="/Users/DYM/.rvm/gems/ruby-2.3.0"
...

#  设置系统变量, export var=hello设置好之后通过export查看，可以看到设置的系统变量
export var=hello  # 设置var为系统变量
echo  $var   # var作为系统变量，可以直接使用
```
**函数传参**

参数 | 含义
------- | -------
$0 | 当前shell文件路径
$1...$2... | 参数
$# | 传递的参数个数，需要-1
$@ | 所有传递的参数，可循环遍历每个参数 | 
$* | 所有传递的参数，可循环遍历每个参数
$? | 上一个命令执行的返回结果 | 
$$ | 当前进程号

```shell
# 预定义变量和位置参数传递,shell 可以通过空格的方式向脚本传入参数 , $0 永远获取的是文件名称，$*加双引号之后，传递的参数当做一个整体，$@加双引号之后，还是原来的参数。shift 会让参数进行左移。

#shell代码：
#!/bin/bash
echo "#当前shell脚本的文件名: $0"
echo "#第1个shell脚本位置参数: $1"
echo "#第2个shell脚本位置参数: $2"
echo "#第3个shell脚本位置参数: $3"
echo "#所有传递的位置参数: $*"
echo "#所有传递的位置参数: $@"
echo "#总传递的参数个数: $#"
echo "#当前程序运行的PID: $$"
echo "#上一个命令执行的返回结果$?"

编译结果：
MacBook-Pro:Desktop DYM$ bash test.sh 11 22 33 44
#当前shell脚本的文件名: test.sh
#第1个shell脚本位置参数: 11
#第2个shell脚本位置参数: 22
#第3个shell脚本位置参数: 33
#所有传递的位置参数: 11 22 33 44
#所有传递的位置参数: 11 22 33 44
#总传递的参数个数: 4
#当前程序运行的PID: 8270
#上一个命令执行的返回结果0
```

**交互式变量**
```shell
# 获取交互输入的变量read
#!/bin/bash
read -p "输入你的姓名:" name  # 输入提示问题
echo $name

read -s var   # 隐藏输入内容
echo $var
```

## 获取上一条命令的结果
shell 程序中一般使用`$?`获取上一条命令的执行结果，运行成功返回0，运行失败返回1。如果命令有返回值，可以通过命令代换的方式来获取。
```shell
# 输入date命令获取日期
mlive@mlivedeMacBook-Pro Desktop % date
2021年 5月 2日 星期日 09时15分46秒 CST
# 使用命令代换的方式获取到返回值，有两种方式
mlive@mlivedeMacBook-Pro Desktop % datetime=`date`
mlive@mlivedeMacBook-Pro Desktop % echo $datetime
2021年 5月 2日 星期日 09时22分10秒 CST
# 也可以使用$()
mlive@mlivedeMacBook-Pro Desktop % datetime=$(date)
# 也可以将liunx命令的返回结果存储起来
mlive@mlivedeMacBook-Pro Desktop % list=`ls`
mlive@mlivedeMacBook-Pro Desktop % echo $list
# 获取到当前shell路径,$0:代表当前shell路径， dirname获取到shell的绝对路径，cd到对应的文件夹，pwd输出路径
curPath=$(cd `dirname $0`;pwd)
echo $curPath
```

## 管道
`|`管道将上一个命令的输出结果当做下一个命令的输入。例如，查看某个文件使用`tee`命令保存成另外一个文件`cat a.sh | tee b.txt`

## 文件的重定向
`cmd > file`: 将标准输出重定向到新的文件中
`cmd >> file`: 追加

## shell脚本调试
shell没有单步调试的方法，`-n`读一遍脚本中的命令但不执行，用户检查脚本中的语法错误。`-v`一边执行脚本，一边将执行过的脚本命令打印到标准错误输出。`-x`提供跟踪执行信息，将执行的每一条命令和结果依次打印出来。

example：
```shell
sh -x ~/Desktop/test.sh
```

## shell注意点
1. 赋值两边不能有空格 `name='dong'`
2. echo 输出转义字符时，需要使用`echo -e `

## $?状态码结果

状态码 | 结果
------- | -------
0 | 命令成功完成
1 | 通常的未知错误
2 | 误用shell命令
126 | 命令无法执行
127 | 没有找到命令
128 | 无效的退出参数
128+x | 使用Linux信号x的致命错误。
130 | 使用Ctrl-C终止的命令
255 | 规范外的退出状态

## shell脚本判断是否安装了jq
#判断是否安装 json解析工具“jq”
```shell
if [ `command -v jq` ];then
    echo 'jq 已经安装'
else
    echo 'jq 未安装,开始安装json解析工具'
#安装jq
    brew install jq
fi
```

## echo单行和多行文字定向写入到文件中
如果是单行写入,直接使用`echo  写入内容 >  abc.text`。如果是多行写入,参考一下代码:
```shell
cat>abc.text<<EOF
这是一个由shell创建的文件
this is a file created by shell.
we want to make a good world.
EOF
```

`<<EOF` 表示当遇到EOF时结束输入，`cat>abc.text<<EOF` 这中间没有空格,如果想追加写入abc.text文件，可使用`cat>>test<<EOF 方式`


## unzip 解压

指令 | 含义
------- | -------
`unzip test.zip` | 把文件解压到当前目录下
`unzip -d /temp test.zip` | 如果要把文件解压到指定的目录下，需要用到-d参数。
`unzip -n test.zip` | 解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n参数
`unzip -l test.zip` | 只看一下zip压缩包中包含哪些文件，不进行解压缩
`unzip -v test.zip` | 查看显示的文件列表还包含压缩比率
`unzip -t test.zip ` | 检查zip文件是否损坏
`unzip -o test.zip -d /tmp/` | 将压缩文件test.zip在指定目录tmp下解压缩，如果已有相同的文件存在，要求unzip命令覆盖原先的文件

## xxd
xxd 命令用于用二进制或十六进制显示文件的内容，如果没有指定outfile参数，则把结果显示在屏幕上，如果指定了outfile则把结果输出到outfile中；如果infile参数为– 或则没有指定infile参数，则默认从标准输入读入。 转到比特(二进制数字) 模式, 而不是十六进制模式

比如下面的示例:
```shell
echo 0x313233 | xxd -r  #将16进制的数字转换成10进制 123
echo "a" | xxd -ps  #将字符转换成16进制 61
```

>需要注意的是，我们不能直接使用`xxd -r 0x313233`，原因是**xxd后面只能接文件!**而echo 123，并用管道连接，其实就是创建了一个临时文件交给xxd来处理

## ar 指令
ar 查看或者修改静态库文件

## strip
strip具体就是从特定文件中剥掉一些符号信息和调试信息。定义 main.c 文件
```c
#include <stdio.h>
  
int add(int x, int y)
{
    return x + y;
}
  
int aaa;
int bbb = 1;
char szTest[] = "good";
  
int main()
{
    int ccc = 2;
    return 0;
}
```
gcc指令生成编译文件,查看编译的结果
```shell
xxxxxMacBook-Pro-2 Desktop % gcc main.c
xxxxxMacBook-Pro-2 Desktop % file a.out
a.out: Mach-O 64-bit executable arm64
xxxxxMacBook-Pro-2 Desktop % nm a.out   
0000000100000000 T __mh_execute_header
000000010000400c S _aaa
0000000100003f7c T _add
0000000100004000 D _bbb
0000000100003f9c T _main
0000000100004004 D _szTest
xxxxxMacBook-Pro-2 Desktop % ls -l a.out
-rwxr-xr-x  1 mlive  staff  33490 Nov  9 15:11 a.out
```
通过`ls -l` 命令可知， a.out的大小是 33490 个字节；

通过`file`命令可知， a.out是可执行文件， 且是`not stripped`, 也就是说没有脱衣服。

通过`nm`命令， 可以读出 a.out 中的符号信息。使用 strip 剥掉一些符号信息
```
xxxxxMacBook-Pro-2 Desktop % strip a.out
xxxxxMacBook-Pro-2 Desktop % ls -l a.out
-rwxr-xr-x  1 mlive  staff  33384 Nov  9 15:14 a.out
xxxxxMacBook-Pro-2 Desktop % nm a.out
0000000100000000 T __mh_execute_header
```
通过`ls -l` 命令可知， a.out的大小是 33384 个字节

>strip不仅仅可以针对可执行文件， 还能针对目标文件和动态库等。