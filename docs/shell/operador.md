# 运算符
运算符有：算数运算符、整数关系运算符、布尔运算符、字符串运算符、文件运算符。

`[ ] 表达式`  常见的` > < `需要加转义字符,`[ [ ] ] 表达式`是`[ ]运算符`的扩充，支持` > < `运算符，不用转义

## 算数运算符

运算符 | 说明 | 举例
------- | ------- | -------
`+` | 加 |    `expr $a + $b`
`-` | 减 | `expr $a - $b`
`*` | 乘 | `expr $a \* $b` | 因为*在shell中有特殊含义，需要使用转义字符
`/ `| 除 | `expr $a / $b`
`%` | 求余 | `expr $a % $b`
`=` | 赋值 | `a=$b`
`==` | 相等 | `[ $a == $b ]`
`!=` | 不相等 | `[ $a != $b ]`

## 整数运算符

参数 | 说明 | 示例
------- | ------- | -------
`-eq` | 等于则条件为真 | `[ 1 -eq 10 ] | 返回false`
`-ne` | 不等于则条件为真 | `[ 1 -ne 10 ] | 返回true`
`-gt` | 大于则条件为真 | `[ 1 -gt 10 ] | 返回false`
`-lt` | 小于则条件为真 | `[ 1 -lt 10 ] | 返回true`
`-ge` | 大于等于则条件为真 | `[ 1 -ge 10 ] | 返回false`
`-le` | 小于等于则条件为真 | `[ 1 -le 10 ] | 返回false`

example:
```shell
[ 1 -eq 11 ] && echo "条件成立" || echo "条件不成立"   # 可以直接这样写

EQ 就是 EQUAL等于
NE 就是 NOT EQUAL不等于 
GT 就是 GREATER THAN大于　 
LT 就是 LESS THAN小于 
GE 就是 GREATER THAN OR EQUAL 大于等于 
LE 就是 LESS THAN OR EQUAL 小于等于
```

## 布尔运算符

运算符 | 说明 | 示例
------- | ------- | -------
`!` | 非运算，表达式为true 则返回false | `[ !false ]`
`-o` | 或运算， 有一个表达式为true，则返回true | `[ 1 -lt 10 -o 1 -gt 10 ] true`
`-a` | 与运算， 两个表达式都为true，则返回true | `[ 1 -lt 10 -a 10 -gt 1 ] true`

example:
```shell
[ 1 -lt 2 -a 5 -gt 10 ]; echo $?
[ 1 -lt 2 -o 5 -gt 10 ]; echo $?
```

## 逻辑运算符

运算符 | 说明 | 示例
------- | ------- | -------
`&&` | 逻辑与 | `[ [ 1 -lt 2 && 5 -gt 10 ] ]`
`\|\|` | 逻辑或 | `[ [ 1 -lt 2 \|\| 5 -gt 10 ] ]`

example:

```shell
[ [ 1 -lt 2 && 5 -gt 10 ] ];echo $?
[ [ 1 -lt 2 || 5 -gt 10 ] ];echo $?
# 如果执行失败，退出shell，一般使用
echo xxx || exit -1
```

## 字符串比较

参数 | 说明 | 示例
------- | ------- | -------
`==` | 等于则为真 | `[ "$a" == "$b" ]`
`!=` | 不相等则为真 | `[ "$a" != "$b" ]`
`-z` | 字符串长度为零则为真 | `[ | -z "$a" ]`
`-n` | 字符串长度不为空则为真 | `[ | -n "$a" ]`
`str1 > str2` | str1 大于 str2则为真 | str1 > str2
`str1 < str2` | str1 小于 str2则为真 | str1 < str2

example:
```shell
注意事项：
# 判断字符是否为空，需要加""号，否则永远是true，使用${#}判断是准确的
a=""
echo ${#a}
if [ -n "$a" ];then
  echo "长度不为0"
    else
  echo  "长度为0"
fi

```
## 文件运算符

参数 | 说明 | 示例
------- | ------- | -------
`-e` | 如果文件或者目录存在则为真 | `[-e \| file]`
`-s` | 如果文件存在且至少有一个字符则为真 | `[-s \| file]`
`-d` | 如果文件存在并且是目录则为真 | `[-d \| file]`
`-f` | 如果文件存在并且是普通文件则为真 | `[-f \| file]`
`-r` | 如果文件存在并且可读则为真 | `[-r \| file]`
`-w` | 如果文件存在并且可写则为真 | `[-w \| file]`
`-x` | 如果文件存在并且可执行则为真 | `[-x \| file]`

如果dym.txt文件存在，则不管它，如果不存在则主动创建，`||`  **之后接的是如果条件不成立**  

```shell
[ -d /Users/DYM/Desktop/dym.txt ] || mkdir  -p /Users/DYM/Desktop/dym.txt
```

**文件比较的例子**
``` shell
# 文件夹不存在则创建
if [ ! -d "/data/" ];then
  mkdir /data
  else
  echo "文件夹已经存在"
fi

# 文件存在则删除
if [ ! -f "/data/filename" ];then
  echo "文件不存在"
  else
  rm -f /data/filename
fi

# 判断文件夹是否存在
if [ -d "/data/" ];then
  echo "文件夹存在"
  else
  echo "文件夹不存在"
fi

# 判断文件是否存在
if [ -f "/data/filename" ];then
  echo "文件存在"
  else
  echo "文件不存在"
fi
```