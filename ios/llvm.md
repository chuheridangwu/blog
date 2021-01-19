# LLVM
Objective-C在变为机器代码之前，会被LLVM编译器转换为中间代码（Intermediate Representation）
可以使用`clang -emit-llvm -S main.m`指令生成中间代码,如果想生成汇编代码使用`clang -emit -llvm -S main.m`(emit 和 llvm中间有空格)。

为什么转成C++的实现跟真正的实现不太一样？
iOS的编译器LLVM工作流程 OC -> 中间代码 -> 汇编。转成中间代码，是为了更好的跨平台。

## 语法简介

语法 | 含义
------- | -------
@ | 全局变量
% | 局部变量
alloca | 在当前执行的函数的堆栈帧中分配内存，当该函数返回到其调用者时，将自动释放内存
i32 | 32位4字节的整数
align | 对齐
load | 读出，store 写入
icmp | 两个整数值比较，返回布尔值
br | 选择分支，根据条件来转向label，不根据条件跳转的话类似 goto
label | 代码标签
call | 调用函数

具体可以参考官方文档：https://llvm.org/docs/LangRef.html
