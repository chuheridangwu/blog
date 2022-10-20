# C语言基础

## 代码块 { }
* 代码块作用域：从定义变量的那一行代码开始，到所在的代码块结束
* 代码块作用：及时回收不再使用的变量，为了提升性能

```c
#include <stdio.h>

int main(){
    // 定义一个代码块
    {
        float height = 1.5;
        printf("%.2f",height);
    } // 代码块结束释放height
    return 0;
}
```

## 类型修饰符
* short: 只能支持int， 减少int类型的字节数，从4个字节减到2个字节
* long: 只能支持int， 把int类型从4个字节扩充到8个字节，long num == long int num,打印需要用"%ld"
* signed: 有符号,正数 0 负数 signed int = signed
* unsigned: 无符号， 正数 0 没有负数，unsigned int = unsigned int的取值范围变成 0~2的32次方-1，因为最高比特位不需要当做符号位了

int 在32位编译器上只有2个字节，`long long int` 在64位编译器上还是8个字节，在32位编译器上代表也代表8个字节。
`printf("long :%lu -- short :%lu",sizeof(long long int),sizeof(short int));`

## 内存存储
变量存储时内存是从大到小存储，因为内存寻址是从大到小，变量地址是从大到小分配的，例子：

```c
#include <stdio.h>
int main(){
    int a = 10;
    int b = 20;
    printf("a = %p \n b = %p",&a,&b);
    return 0;
}

输出结果: a 比 b大4个字节
 a = 0x7ffee0396b98 
 b = 0x7ffee0396b94
```

## 获取类型的内存大小 sizeof

```c
#include <stdio.h>
int main(){
    int size = sizeof(10);
    int sizeInt = sizeof(int);
    printf("%d - %d",size,sizeInt);
    return 0;
}
```
## scanf
scanf是用来接收输入的值，直接使用变量的内存地址，单个传值`scanf("%d",&a)`; scanf中不能输入`\n`

## 多个传值

```c
#include <stdio.h>
int main(){
    int a ,b;
    scanf("%d,%d",&a,&b);
    printf("a = %d , b = %d",a,b);
    return 0;
}

输入多个参数时，需要用某些符号隔开
1,3
a = 1 , b = 3
```
printf的格式说明符及作用，scanf也可以用

column0 | column1
------- | -------
格式说明符 | 作用
%d 或者 %i | 以十进制的形式输出整数（带符号）
%o | 以八进制的形式输出整数
%x | 以十六进制的形式输出整数
%u | 以十进制无符号的形式输出整数
%c | 以字符形式输出一个字符
%s | 输出字符串中的字符，直到\0结束
%f | 以小数形式输出，%.2f 默认保留两位小数
%e | 以标准形式输出小数
%g | 系统自动选定%f或者%e
%p | 获取变量的内存地址，例&a

## 数学函数

数学函数对应的头文件 `math.h`

平方根sqrt、绝对值fabs、指数pow、正弦函数sin、反正弦函数asin、正切函数tan

## 字符函数

字符函数对应的头文件 `ctype.h`
大写字母转小写tolower、检查是否是字母函数 isalpha、检查大写字母函数isupper、检查数字字符函数isdigit、检查字母、数字字符函数isalnum

## 关键字
auto  double int struct break else long switch case enum register typedef char extern return union const float short unsigned continue for signed void default goto  sizeof volatile do if while static

## for循环

```c
for(语句1; 条件； 语句2)
{
    循环体
}
语句1： 初始化语句
语句2： 增量语句(执行完循环体后再执行的语句)
1. for一开始就会执行一次语句1(只会执行一次)
2. 判断条件是否成立，如果条件成立，就会执行一次循环体，然后执行语句2，再次判断条件是否成立

比如下面的几个for循环例子也可以执行:
#include <stdio.h>
int main(){
    int count = 0;
    for (; count < 50; ) {
        printf("%d",count);
        count++;
    }
    return 0;
}

例子2:
#include <stdio.h>
int main(){
    for (int count = 0; count < 50;printf("%d",count), count++) {

    }
    return 0;
}
```
## 函数
**main函数 `return 0` 是返回给操作系统的，代表程序是正常退出**

```c
函数的格式

返回值类型  函数名(形式参数列表)
{
    函数体
}

```
**include 作用**：拷贝文件导入文件的所有内容到#include所在的位置，自定义的文件用" "，系统自带的文件使用< >，导入自定义文件时可以使用绝对路径或者放在同一文件夹下

```c
#include <stdio.h>

int main(){
#include "mm.txt"
    return 0;
}

mm.txt的文件内容
printf("啦啦啦啦啦啦啦\n");
printf("啦啦啦啦啦啦啦\n");
printf("啦啦啦啦啦啦啦\n");
```

.h 文件作用： 被别人拷贝，编译链接的时候不需要管.h文件

## 内存存储
变量存储时内存是从大到小存储，因为内存寻址是从大到小

## Char  字符类型
* 字符类型只有一个字节，一个字节是8个二进制位，减去最高位，对应的取值范围-128~127
* 字符类型在ASCII码上都有对应的字符,比如大写A对应的是65，小写a对应的是97
* 汉字占三个字节，汉字不能使用char类型存储
* 单引号 'a' 是字符，双引号 "a" 是字符串

### 输出大写A-Z和小写 a-z
字母在ASCII码中对应的只是一个数，把对应的数用字符的形式输出就可以得到对应的字母，小写比大写字母固定的大32

```c
for (int i = 65; i < 91; i++) 
{
    printf("大写%c，小写%c\n",i,i+32);
}
```
## 数组
### 数组元素存储

计算数组的个数，数组内存大小/类型内存大小，比如

```c
int ary[] = {1,2,3}
int count - sizrof(ary) / sizeof(int)

```
### 数组占多少内存
数组的多少字节的计算方式： 类型的内存大小  个数，比如int ary[4], int 是4个字节，4 * 4 = 16，ary占16个字节

### 数组的内存地址
数组的内存地址就是第一条数据的内存地址，数组内的元素内存地址按下标顺序进行排列

```c
int ary[] = {1,2,3};
printf("ary --%p\n",&ary);
for (int i = 0; i < sizeof(ary)/sizeof(int); i++) {
      printf("ary[%d] --%p\n",i,&ary[i]);
 }
 
  打印结果：
 ary --0x7ffee7b23b80
 ary[0] --0x7ffee7b23b80
 ary[1] --0x7ffee7b23b84
 ary[2] --0x7ffee7b23b88

```
### 数组传参
**数组当做参数传到方法中时，传过去的实际是数组的指针**，指针在64位编辑器中占8个字节，在32位占4个字节，

MAC系统查看自己的编译器是多少位的命令 uname -a ， x86_64 表示系统为64位 i686 表示系统32位的

## 字符串
* 在C语言中字符串是以字符数组的形式存储的，如 char string[5] = "asds"
* 在C语言中字符串结尾都以\0为结束符，\0在ASCII码中是0 ，char string[3] = {'i','t','\0'} == char string[3] = "it"

### \0的用途
\0是结束符，C语言中如果没有找到\0，会继续向下面的内存中寻找直到遇到\0结束,举例： 

```c
char name[4] = "12345"; char 
name1[] = {'a','b'}; 
printf("%s",name1);

打印结果: ab12345

```
### strlen
strlen函数是计算字符串长度，需要导入#include <string.h>
strlen 函数计算的是字符数，汉字占三个字节，一个汉字等于三个字符 不计算尾部的\0

## 枚举
枚举只在确定只有固定几个值的时候使用
`enum Sex {Man,Woman,Unkown}`

## 类型总结
### 基本数据类型
* int
    * long int  、long: 8个字节 %ld(64位)
    * short int 、 short: 2个字节 %d %i (64位)
    * unsigned int 、unsigned： 4个字节 %zd
    * signed int 、signed： 4个字节 %d %i
* float/double:float 4个字节 %f,double 8个字节 %f
* char： 1个字节 %c %d 
    * char类型，保存在内存中的是它的ASCII码值
    * 'A' --> 65
    * 'a' --> 97

## 构造类型
* 数组、数据类型、数组名[数组个数]
* 结构体
* 指针类型： int *p，间接操作变量的值
* 枚举类型： 变量的值只有几个固定的值


## typedef
定义类型，给已经存在的类型取一个新的名称
 
```c
 typedef int MyInt； //给int类型定义别名MyInt
 typedef char * String； //也可以定义指针
 
 struct Student{
    int age;
 };
 
 typedef  struct Student MyStu; // 定义结构体
 
 enum Sex{Man,woMan}
 typedef enum Sex MySex; // 定义枚举
 
 typedef int (*Point)(int,int); // 定义函数指针

```
## static
* 静态局部变量：一般在函数内部或复合语句内部使用，特征是程序执行钱变量的存储空间被分配在静态区，并赋初值一次，若没有显示的赋初值，系统自动赋值为0，其值一直存在，知道程序结束
* 静态全局变量：只能被所定义的本文件中所有函数引用，不能被其他文件中的函数引用。(全局变量可以被整个程序的不同文件中的函数引用)

## extern
全局变量作用域是从变量定义的位置开始到文件结束，可被文件内的所有函数所共用，如果想在 全局变量定义的位置之前或其他文件中 的函数所引用时，必须对变量使用 extern 声明。

extern的另一个技巧是获取其他文件定义的全局变量，比如在一个文件内使用static定义了一个全局变量，如果要在另一个文件内获取到，可以使用extern进行重新定义获取。


int float double char short long signed unsigned
if else switch case default for while do
break continue return void const sizeof struct typedef
static extern auto register enum goto union volatile