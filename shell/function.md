# 函数
函数必须先定义，再调用。函数的定义形式： `function 方法名(){}`。直接使用函数名进行调用,函数进行传参时，在方法名后面带上参数，每个参数之间用空格进行分割。

* `$0`: 获取的是文件名称
* `$!`: 获取的是第一个参数 `$2` 是第2个参数，以此类推
* `$#`: 获取的是传参的总个数，即使有的参数没有使用，仍会被计算在内
* `$*`:  把所有的参数当做一个字符串，不管有没有使用都会被打印
* **函数返回值：** 使用return返回值，使用`$?`获取返回值，
`$?`只对上一条指令负责，如果函数返回后没有立刻保存参数，返回值不能再通过`$?`来获取。

**定义函数:**

```shell
function demoFunction(){
    echo "这是一个方法"
}
demoFunction

# 可以省略function或者()，两个只能同时省略一个
demo(){
    echo "这是一个方法"
}
demo
```

## 函数传参

```shell
function demoFunction(){
    echo "文件名称: $0"
    echo "第一个参数: $1"
    echo "第二个参数: $2"
    echo "参数共有多少个: $#"
    echo "用字符串输出所有参数: $*"
}
demoFunction 1 2 3 4   # 函数后跟参数，参数用空格进行分割

打印结果：
文件名称: test.sh
第一个参数: 1
第二个参数: 2
参数共有多少个: 4
用字符串输出所有参数: 1 2 3 4
```

## 有返回值函数
返回值是作为退出状态来使用，如果没有 return ，以函数中最后一条执行命令的返回状态为整个函数的退出状态
```shell
# 函数返回值使用 $? 进行获取 ， $? 只能获取上一次函数调用的记过
function fun_echo_return(){
    return $(( $1 + $2 ))
}

fun_echo_return 1 2

echo "函数的返回值是 $?"

# 通过函数代换的方式获取返回值
result=`fun_echo_return`
echo $result
```
## 函数内使用全局变量

```shell
num=1000

uname(){
    echo "调用 uname方法"
    ((num++))
    return 100
}

changeNum(){
    local num=100
    ((num++))
    echo $num
}

uname
echo $?    #  打印 100
echo $num    #  打印 1001
changeNum    #  打印 101
echo $num    #  打印 1001
```