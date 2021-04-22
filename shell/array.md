## 数组
shell只支持一维数组，数组元素下标从0开始，数组用（）表示，数组内元素 使用 空格 分割

##  初始化

```shell
array=(a b 'c' "d")
echo ${array[0]}
echo ${array[1]}
echo ${array[2]}
echo ${array[3]}
```

##  获取数组内所有元素   使用*或者@进行获取

```shell
array=(a b 'c' "d")
echo "获取数组内所有元素${array[*]}"
echo "获取数组内所有元素${array[@]}"
```
##  获取数组长度

```shell
array=(a b 'c' "d")
echo "获取数组长度${#array[*]}"
echo "获取数组内长度${#array[@]}

```
## 遍历数组

```shell
array=(a b 'c' "d")
for i in ${array[*]}
do
    echo $i
done

"-------::::WHILE循环输出 使用 let i++ 自增:::::---------"
# let j++ 也可以写成 let "j++"
array=(a b 'c' "d")
j=0
while [ $j -lt ${#array[*]} ]
do
    echo ${array[j]}
    let j++
done
```
