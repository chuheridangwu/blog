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