# 流程控制

## 单分支语句 
if 条件语句跟`[ ]`两边必须有空格,可以使用的条件，使用 `man test` 查看判断条件测试。

```shell
#  输入YES或者NO
read YES_OR_NO
if [ "$YES_OR_NO" = "yes" ];then
    echo $YES_OR_NO
fi

if which ls;then
    echo "ok" 
fi
```
## 双分支语句  if  ...  else

```shell
if [ 条件 ];then
        echo "ok"
   else
        echo 'false'
fi
```

## 多分支语句  if  ...  elif

```shell
if [ 条件1 ];then
    操作1
elif [ 条件2 ];then
    操作2
elif [ 条件3 ];then
        操作3
    else
        操作4
fi
```
## for循环 , {}两边不能有括号

```shell
for loop in {1..10}
do
    echo "The value is: $loop"
done
```
## while 循环

```shell
index=1
while(( $index<= 5 ))
do
    echo $index
    let "index++"   # let是liunx的命令
done

监听键盘的输入 FILM
echo "按下《CTRL-D》退出"
echo -n "输入你喜欢的网站名:"
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
```
## case 循环

```shell
echo "输入yes或者no"
read yes_or_no
case $yes_or_no in
    yes|y|Yes|YES) echo "你输入了yes" ;;
    n|[nN][oO]) echo "你输入了no" ;;
    *) echo "你选择了退出" ;;
esac
```
## break  跳出循环

```shell
while :   # while 和 :号之间需要有空格， break需要单独一行
do
    read -p "输入1-5之间的数字:" num
    case $num in
        1|2|3|4|5) echo "你输入的数字为$num"
        ;;
        *) echo "游戏结束"
        break     
        ;;
    esac
done
```

## continue 跳过这一步

```shell
# 游戏会一直结束不了，因为每次到了最后一步都会被跳过
#!/bin/bash
while :
do
    echo -n "输入 1 到 5 之间的数字: "
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的!"
            continue
            echo "游戏结束"
        ;;
    esac
done
```