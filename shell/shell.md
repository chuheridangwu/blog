# Shell
shell是c语言编写的程序，是用户使用liunx的桥梁，主要功能是用来写脚本，可以把一些重复类的工作交给shell来处理，提高我们的工作效率

## shell运行
1. 创建以`.sh`为扩展名的文件
2. 编辑脚本，第一行以`#！`开头，声明shell全路径。例如：`#!/bin/bash`
3. 运行脚本  `/bin/sh  test.sh`   或者 `bash test.sh` 或者 `sh test.sh`


## 基础变量
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

#  获取系统变量,输入 export 查看系统变量，可以直接使用系统变量echo $HOME
declare -x Apple_PubSub_Socket_Render="/private/tmp/com.apple.launchd.Es83Prcnzq/Render"
declare -x FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
declare -x GEM_HOME="/Users/DYM/.rvm/gems/ruby-2.3.0"
...

#  设置系统变量, export var=hello设置好之后通过export查看，可以看到设置的系统变量
export var=hello  # 设置var为系统变量
echo  $var   # var作为系统变量，可以直接使用

# 预定义变量和位置参数传递,shell 可以通过空格的方式向脚本传入参数 , $0 永远获取的是文件名称，$*加双引号之后，传递的参数当做一个整体，$@加双引号之后，还是原来的参数

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


# 获取交互输入的变量read
#!/bin/bash
read -p "输入你的姓名:" name  # 输入提示问题
echo $name

read -s var   # 隐藏输入内容
echo $var
```
## shell注意点
1. 赋值两边不能有空格 `name='dong'`