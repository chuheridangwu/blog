# C语言基础

* 1TB = 1024GB  
* 1GB = 1024 MB 
* 1MB = 2014KB   
* 1KB = 1024B
* 1个汉字占据三个字符，一个字符是一个字节


比特位(bit)：二进制位，一个0或者1就是一个比特位
字节(byte)： 8个二进制位是1个字节


代码的编译过程
* 编译：把c语言翻译成0和1，工具是clang编译器 指令 cc -c  文件名.c ,编译成功生成.o文件
* 链接： 把我们的.o文件跟系统自带的函数库合并在一起，生成一个可执行文件.out
* 运行： ./a.out

[c语言代码编译过程](https://www.cnblogs.com/CarpenterLee/p/5994681.html)
[什么事编译器](http://c.biancheng.net/view/450.html)

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

## 二进制、八进制、十进制、十六进制
* 二进制  ：以0b或者0B开头是二进制，如 0b11101101
* 八进制 ：以0开头的是八进制，如 045
* 十进制 ： 默认数字是十进制 ， 如 23
* 十六进制 ： 以0x开头是十六进制， 如 0x21458ad
一个字节是八个二进制位，最高位是0代表正数，是1代表负数

## 转换
### 二进制转十进制：
0b1100 = 0  2的0次方 + 0  2的1次方 + 1  2的2次方 + 1  2的3次方
### 十进制转二进制
十进制 9 = 8 + 1 = 2的3次方 + 1 = 1000 + 1 = 1001 
十进制 67 = 64 + 2 + 1 = 26次方 + 2的一次方 + 1 = 1000000 + 10 + 1 = 1000011
### N位二进制的最大取值范围
2位二进制的取值范围是0~3   ==  2的2次方-1
3位二进制的取值范围是0~7   ==  2的3次方-1
n位二进制的取值范围是   2的n次方-1
**int类型的取值范围，int 在64位编译器是4个字节，32个二进制位，因为最高位要代表正负，只有31个二进制位可以用，所以int类型的取值范围是 -2的31次方~2的31次方-1**

## 以二进制的形式输出int类型和char类型
方法原理，使用sizeof（）方法获取每个类型占多少二进制位，对每个二进制位进行偏移，并 按位与 上 1，就能获取到对应的二进制

```c
void printfBinary(int a){
    int number = (sizeof(int) * 8) - 1;
    while (number >= 0) {
        printf("%d",a>>number & 1);
        number--;
    }
}

// 因为左移<< 3 ==  *2的三次方
void printfChar(char a){
    int number = (sizeof(char)<<3) - 1;
    while (number >= 0) {
        printf("%d",a>>number & 1);
        number--;
    }
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

## 位运算
把变量的值转换成二进制位进行运算

**按位与 & ：只有对应的两个二进制位都为1，结果值才是1，否则是0**

```c
举例 9 & 5
9的二进制位 1001
5的二进制位 101
     
1001
0101
----
0001
按位与运算的作用，可以精确的知道每个二进制位，因为1与1才为1
```
**按位或  |  ： 只要有一个二进制位为1，结果值就是1，否则是0**

```c
9 | 5

1001
0101
----
1101

```
**按位异或 ^ : 当两个二进制位不相同时，结果是1，否则是0**

按位异或有对应的规律
* 相同的数值进行异或，结果肯定是0，比如9^9
* 交换 9^5^6 == 9^6^5
* 任何数值跟0进行异或，结果还是原来的值，9^0 == 9
* a^b^a == a^a^b == 0^b == b

```c
1001
0101
----
1100

```

**左移 <<  :   a << n，二进制位往左移n位**

```c
比如9的二进制位是
0000 0000 0000 0000  0000 0000 0000 1001，
左移1之后，最高位舍弃
0000 0000 0000 0000  0000 0000 0001 0010
10010对应的值是18

9 << 1 == 9 * 2的一次方 == 18
9 << 2 == 9 * 2的二次方 == 36
9 << n == 9 * 2的n次方
```
**右移 >>  :   a >> n，二进制位往右移n位**

```c
8 >> 1 == 8 / 2的一次方 == 4
8 >> 2 == 8 / 2的二次方 == 2
8 >> n == 8 / 2的n次方
```

## 交换值的三种写法
### 第一种，创造一个临时变量
```c
 int a = 10;
 int b = 5;
 int temp= a;
 a = b;
 b = temp

```

### 第二种，使用算法

```c
a = b - a; //a = -5
b = b - a; //b = 10
a = b + a; //a = 5
```
###第三种，使用位运算,a的二进制位1010，b的二进制位0101

```c
a = a ^ b; // a = 1111
b = a ^ b; // b = 1010
a = a ^ b; // a = 0101
```
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

## 指针
指针的格式： 变量类型 *  变量名，指针变量只能存储地址，指针就一个作用，能够根据一个地址值，访问对应的内存空间

```c
int a = 10;
int *p = &a; //等于(int *)p = &a;
*p = 20; //这里*只是表明它是一个指针类型
int **p2 = &p;  //指向指针的指针，只要在对方的类型上加* 就可以了，p的类型是int *

```
**指针都是8个字节，为什么要区分类型，是为了在赋值和取值的时候，在对应的内存区域，例
**

```c
int s = 4;
char a = 1;
int *b = &a;
printf("s = %p,a = %p,b = %p,a = %d",&s,&a,&b,*b);
打印结果：
s = 0x7ffeeb428b78,a = 0x7ffeeb428b77,b = 0x7ffeeb428b68,a = 1025，
之所以a得到的是1025，是因为a取得是4个字节的值，
s的二进制 0000 0000 0000 0000 0000 0000 0000 0100，
a的二进制 0000 0001，
获取*b的值，是从a的地址开始，获取到4个字节的二进制位。a的值变成 0000 0000 0000 0000 0000 0100 0000 0001
100 0000 0001转换成十进制就是1025

```
## 指针和数组的关系
指针指向数组的第一位数，指针+1根据数组的类型加对应的字节数，比如：

```c
int a[5] = {1,2,3};
int *p = &a;
printf("p ==%p, p+1 = %p, a = %p, p自己的地址 = %p",p,p+1,&a,&p); // 这里p+1对应的字节加四个字节，如果数组是char类型 p+1是加一个字节
p =0x7ffee8ea5b80, p+1 = 0x7ffee8ea5b84, a = 0x7ffee8ea5b80, p自己的地址 = 0x7ffee8ea5b60
 
*p = a, 相当于*p = a[0],数组的地址就是数组内第一位数据的地址
p + 1 相当于 &a[1], 取对应的值 *(p + 1)

```
定义一个方法，传过去一个数组内地址的某位数的值

```c
int main(){
    int a[5] = {10,20,30,40,50};
    void changeAry(int *ary);
    changeAry(&a[1]);
    return 0;
}

void changeAry(int *ary){
    printf("%d\n",ary[2]); //打印结果是40
}
 &a[1]  相当于 *（ary + 1）

```
## 指针跟字符串的关系

%S在遇到\0的时候就不再往下查询了

```c
char c[] = "it"; //变量字符串，可修改
char *c1 = "it"; //常量字符串，不可修改
printf("%c ---",*c1);
打印结果 i
指针字符串指向的是字符串首字符的地址
输出整个字符串
printf("%s ---",c1); //为什么这里可以得到整个字符串，因为%s遇到\0的时候就不再往下查询了

char *c1 = "it\0s";  
printf("%s ---",c1); // 这样的打印结果也是it

```
* 存储空间分布
    * 常量区： 存放常量字符串
    * 堆： 对象
    * 栈：局部变量


**指针字符串存在常量区，拥有缓存，相同的字符串，存储地址相同，如**

```c
char *c1 = "it";
char *c2 = "it";
printf("c1 = %p , c2 = %p",c1,c2);
打印结果：c1 = 0x10f0a0f80 , c2 = 0x10f0a0f80 // c1、c2首位字符地址相同

```
使用数组的字符串

```c
char c1[] = "it";
char c2[] = "it";
printf("c1 = %p , c2 = %p",c1,c2);
打印结果：c1 = 0x7ffee1bdab69 , c2 = 0x7ffee1bdab66

```
## 指向函数的指针
函数在加载的时候也会有内存地址，指针是专门保存并指向内存地址的，所以指针也可以指向函数

```c
void： 指针变量P指向的函数没有返回值
()： 指针变量P指向的函数没有形参
void (*p) (); // (*p)是固定写法
p = test;
(*p)();
p(); //  这两种都可以调用test方法

void test(){

}

```

* 局部变量： 生 命周期，从定义的那一行开始到方法结束，如果不初始化没有固定的初始值
* 全局变量： 从定义的那一行到文件结尾，会被后面的函数共享，程序启动时分配存储空间，程序退出时才会被销毁，默认初始值是0

## 结构体
结构体也属于数据类型，构造类型，多个基本数据类型组合而成的构造类型

```c
 struct Person{
     int age;
     double height;
     char *name;
 };
 struct Person p = {10,12.6,"nicheng"};
 // 给成员赋值和访问成员
 p.age = 30;
 int a = p.age;

```
结构体`错误的`初始化方式

```c
 // 不能初始化的方式
 struct Person p;
 p = {10,12.6,"nicheng"}; // 这样会报错，因为p现在相当于结构体的地址.也就是结构体第一位属性的地址，比如
 p相当于int age的地址，并不是结构体

```
### 结构体的内存分析
* 在定义类型的时候没有分配存储空间
* 结构体的大小根据内部成员的大小进行分配,《这里会有内存对齐的，结构体所占空间 必须是 最大成员字节数的倍数》

### 定义结构体的三种方式
定义类型再定义变量

```c
 struct Person{
     int age;
     double height;
     char *name;
 };
 struct Person p;

```
定义类型的同时定义变量

```c
 struct Person{
     int age;
     double height;
     char *name;
 }p;

```
定义类型的同时定义变量（省略类型名称，相比之前两种缺点 不能够重用）

```c
 struct{
     int age;
     double height;
     char *name;
 }p;

``` 
类型的作用域：结构体类型的作用域，从定义类型的开始到代码块的结束，如果定义全局类型，跟全局变量生命周期一样

### 结构体数组

```c
 struct Person{
        int age;
        char *name;
    };
    
    struct Person pers[] = {
        {1,"jack"},
        {2,"tony"}
    };
// 错误赋值方法，修改结构体数组里面的值不能这样改,因为取出来的是结构体的指针，只能初始化的时候这样设置
pers[0] = {3,"jackma"}; // 注意事项

// 正确的赋值方式
pers[0].age = 3;

```
### 指向结构体的指针

```c
 获取结构体内变量的方式
 struct Student{
     int age;
     int no;
 };
 struct Student stu = {20,10};
 struct Student *p; //指向结构体的指针
 p = &stu;
 
 // 第一种访问结构体成员变量的属性方式
 printf("no = %d , age = %d \n",stu.no,stu.age);
 
 // 第二种
 printf("no = %d , age = %d \n",(*p).no,(*p).age);
 
 // 第三种  这里为什么要用->，因为p是指向结构体的指针，并不是定义的结构体变量，做区分
 printf("no = %d , age = %d \n",p->no,p->age);

```
### 结构体与函数
如果只是把结构体传给函数，函数内的结构体更改不会改变原来的结构体变量的值，如果传的是结构体指针，会改变原来结构体变量的值

```c
 struct Student{
       int age;
 };

 void testStruct(struct Student stu){ //这里只是赋值关系，没有传指针过来，会开辟一个新的内存给结构体
     stu.age = 10;
 }

 void testStruct2(struct Student *stu){ // 这里传的是指针，所以值会改
     stu->age = 10;
 }

 int main(){
  
     struct Student stu = {20};
     testStruct(stu);
     printf("age = %d \n",stu.age);
     testStruct2(&stu);
     printf("age = %d \n",stu.age);
    return 0;
 }

``` 
### 结构体嵌套
不允许结构体嵌套自己，可以嵌套别的结构体
```c
 struct Student{
       int age;
 };

 struct Person {
     char *name;
     struct Student stu;
 };

 int main(){
  
     struct Person p = {"jack",{10}};
     printf("age = %d",p.stu.age);
    return 0;
 }

```
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

## 预处理指令（一个重点）

* 在代码编译成0和1之前运行的指令，预处理的三种方式，`宏定义 、文件包含、条件编译`
* 预处理指令的作用域: 从代码编写指令的那一行开始到文件的结尾

## 宏定义
宏定义只是把左边的东西替换成右边的东西，注意，只起到替换作用

**不带参数的宏定义**

```c
 #define 宏定义  5
 #define  COUNT 6  // 宏名默认大写或者以k开头
 #undef   //取消定义，宏定义到这里失效

```
**带参数的宏定义**

```c
 带参数的宏定义
 #define  sum（v1,v2） （（v1)+(v2)）
 宏定义传参时要注意，每个参数和结构都要用一个小括号（），防止传的值有问题影响计算结果，
 因为宏只起替换的作用，仅仅只有替换作用

// 如果参数前有#号，宏会自动在参数上加上""
#define file(path)  "123455" #path
```
## 条件编译
顾明思议：满足特定的条件才进行编译，有三种形式  `#ifdef、 #ifndef、#if`

### #ifdef: 需要先定义宏，如果有定义，指定对应的代码段，没有定义，执行另一个代码段
 
```c
 #define 标识符
 #ifdef 标识符 // 如果有定义标识符，执行代码段1
    程序段1
 #else        // 没有定义标识符执行代码段2
    程序段2
 #endif

```
**#ifndef: 需要没有定义宏**

```c
 #ifndef 标识符  // 如果没有有定义标识符，执行代码段1
    程序段1
 #else         // 如果有定义标识符，执行代码段2
    程序段2
 #endif

```
**#if: 满足条件则执行**

```c
 #if 条件
  代码段1
 #elif 条件
  代码段2
 #else
  代码段3
 #endif
```
## 文件包含 #include
`include`本质是拷贝另一个文件的内容到当前的位置
* #include <文件名>： 编译系统将在系统设定的标准目录下搜索该文件
* #include "文件名" : 编译系统首先在当前目录中查找该文件，再到系统设定的目录下查找

为了保证`.h`文件不被多次应用，一般都会使用`#ifndef + __文件名_H_`做一个宏定义

```c
 #ifndef _STDIO_H_
 #define _STDIO_H_
  文件中的内容
 #endif

```
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