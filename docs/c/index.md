# C语言基础

文章内容来源于李明杰的C语言视频和[C语言小白变怪兽](http://c.biancheng.net/c/?from=pdf_website_1_0)这本书。这本书挺值得看的，里面讲的非常详细，关于编译和链接的过程讲的也很细。

C语言中的32个关键字

int | float | double | char | short | long | signed | unsigned | if | else 
----|-------|--------|------|-------|------|--------|----------|----|------
switch | case | default | for | while | do | break | continue | return | void
const | sizeof | struct | typedef | static | extern | auto | register | enum | goto 
union | volatile


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