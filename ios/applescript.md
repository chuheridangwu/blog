# AppleScript
AppleScript是一种面向对象（Object-Oriented，简称OO）的脚本语言，和现在主流的
面向对象程序语言一样，它拥有三个重要术语：对象（Object）、属性（Property）和
命令（Command）。**AppleScript的采用Unicode文字编码，并且不区分大小写。**

注意：本文是从**Applescript 简明基础教程**里面摘抄出来的，只是做一些简化。

AppleScript中执行shell命令 `do shell script "touch  Users/xxx/Desktop/b.text"`,在shell中调用AppleScript使用`osascript -e 'display alert "警告！"'`

## 数据类型
AppleScript支持布尔型、数字型、字符型、日期型、常量型、List列表（也就是数组）、Record记录型（也就是我们说的字典）
```
// 布尔型 True False
// 数字型 Integer 整型、Real 实型  如：1、2、1.0、3.14、-1.56
// 字符型  "this is text"
// 日期型  date "2009年8月30日星期日 下午12:31:34"
// 常量型  如：yes，no，ask，这些常量可以是已经被AppleScript预定义的，也可以是用户定义的不可变变量。这种类型的数据一经确定不可更改。此外可以认为所有关键字都是常量型的数据
// 数组型  如：{1,2,3}，{{1,2},{a,b,c},}，{1,1.9, "text"}
// 字典型  如：{firstName:"iDoraemon", lastName:"Nathan"}，取值使用 firstName of {firstName:"iDoraemon", lastName:"Nathan"}
```
如果要确定数据类型使用`class of`,例如`class of "string"`。
类型转换使用`as`关键字
```
--文本类型转数字类型
"1.99" as real --得到Real类型的1.99，而原来的数据是Text（因为带有引号）。
"1.99" as integer --得到Integer类型的2，精度丢失！
"1" as real --得到Real类型的1.0，自动提升精度！
--转换成List类型
"text" as list --得到{"text"}
1.99 as list --得到{1.99}
{a:1, b:2} as list --得到{1, 2}，精度丢失（标识符丢失）！
```

## AppleScript字典
打开脚本编辑器，选择文件->打开字典，将会弹出对话框列出可脚本控制的程序。选中对应的程序，显示对应的程序命令解释
* 黄色s表示suite 套装
* 蓝色c表示command  命令
* 紫色c表示class  类
* 紫色p表示property 属性

例如finder中的make命令:

| 关键字 |  说明 |
| --- | ---- |
|make v : Make a new element | 第一行说明词性（v表示动词，和英文字典一样）和具体解释“创建一个新元素” |
|make | 首先是关键字make，必须先打make（看起来是废话）|
|new type : the class of the new element |  必须要有关键字new，并且后接参数type：所要创建元素的类型。冒号后面是对前面type的具体解释。|
|at location specifier : | the location at which to insert the element | 必须要有关键字at，并且后接location specifier类型的参数：元素要创建的位置。|
|[to specifier] : when creating an alias file, the original item to create an alias to or when creating a file viewer window, the target of the window | 可选关键字to，如用此关键字必须后接参数specifier。|
|[with properties record] : the initial values for the properties of the element | 可选关键字with properties |
|→ specifier : to the new object(s)|

Make 命令实战：
```
// 务必记得加上“Tell application xxx”和“End tell”,意思是告诉系统打开finder
tell application "Finder"
    make new folder at desktop
    --最精简的方式，不能比这个还少任何一项
    --其中make为命令，new和at为必备关键字参数，folder属于type，desktop属于location specifier
    --此语句在桌面上建立了一个未命名的文件夹
    make new folder at desktop with properties {name:"AppleScript"}
    --加上了可选参数，是Record类型的。
    --此语句在桌面上建立了一个名称为“AppleScript”的文件夹
end tell
```

##  AppleScript基础语法

```
// 定义变量 name为变量名称,value为其初始值，as type（可省略）用来强制指定类型
set name to value as type 

// myResult为自定义的名称； the result of语句用于获得命令的结果。并不是所有命令都有返回结果。
set myResult to the result of (make new folder at desktop) 
```

### 局部变量和全局变量
使用下面的代码来体验一下
```AppleScript
set message to "局部变量"     // 定义局部变量message
run aNewScript  //  运行脚本对象
displayA("作为形式参数定义的")  // 激活事件处理器displayA，并传递参数

------------------------------

--脚本对象定义开始--
script aNewScript --aNewScript是脚本对象的名称
    set message to "在脚本对象里定义的"     // 重定义局部变量message（重载）
    display dialog message  // 显示一个包含内容message的对话框
end script
--脚本对象定义结束--

--事件处理器定义开始--
on displayA(message) // displayA是事件处理器的名称 ,message是形式参数（一个局部变量）
    display dialog message  // 显示一个包含内容message的对话框
end displayA
--事件处理器定义结束--
```

### 数据共享，相当于指针
所谓数据共享机制，就是在复制和修改时──尤其是通过语句“set b to a”（把变量b赋值为变量a的值）方式时，AppleScript对于原数据和新数据内容的处理方式。和其他主流编程语言是基本一致的。
```
set a to 1 --给变量a赋值1
set b to a --给变量b赋值为a的值
display dialog "赋值的结果：a=" & a & "; b=" & b --显示a和b的值
set b to 0 --修改变量b的值为0
display dialog "修改变量b之后：a=" & a & "; b=" & b --再次显示a和b的值

赋值的结果：a=1; b=1
修改变量b之后：a=1; b=0
```

**如果使用数组和字典：**
```
set a to {1, 2, 3, 4, 5}   --定义a为List型数据
set b to a  --给变量b赋值为a的值（List型）
display dialog "赋值的结果：a=" & a & "; b=" & b    --显示a和b的值
set item 1 of b to 0 --修改List b中的第一个值为0
display dialog "修改变量b之后：a=" & a & "; b=" & b --再次显示a和b的值

赋值的结果：a=12345; b=12345
修改变量b之后：a=02345; b=02345
```

**copy关键字**
```
set a to {1, 2, 3, 4, 5} --定义a为List型数据
set b to 1 --需要提醒的是，使用copy之前必须先定义
copy a to b --给变量b赋值为a的值（List型）
display dialog "赋值的结果：a=" & a & "; b=" & b --显示a和b的值
set item 1 of b to 0 --修改List b中的第一个值为0
display dialog "修改变量b之后：a=" & a & "; b=" & b --再次显示a和b的值

赋值的结果：a=12345; b=12345
修改变量b之后：a=12345; b=02345
```

## 属性
属性和变量的根本区别在于其稳固性（Consistence）。即脚本退出后其值是否保持不变。属性在脚本退出运行后，仍然记录下它最后的值，并且下一次运行时可以被调出。因此，属性的一个用途就是记录一个脚本运行了多少次。属性的另一个特点是没有全局和局部之分，所有属性都是全局的。
```
property countTimes : 0
set countTimes to countTimes + 1
display dialog "这是第" & countTimes & "次运行本脚本"
```

### 预设变量
有些变量是预定义的，它包含预设值（常数）或者可以实现特殊功能。以下是几个常用的预定义变量：

命令 | 解释
------- | -------
 result： | 记录最近一个命令执行的结果，如果命令没有结果，那么将会得到错误
 it： | 指代最近的一个tell对象
 me： | 这指代段脚本。用法举例path to me返回本脚本所在绝对路径
 tab：| 用于string，一个制表位
 return： | 用于string，一个换行

## 流程控制
流程控制包括`tell`、`if...then ... else if ...then ... else ...end if`、`repeat ... end repeat`

**tell 语句**

```
tell application "Finder"
    close front window
end tell
```

**if 语句**

```
// 简单逻辑
if boolean then statement

// 复杂逻辑
set mark to 99
if mark ≥ 60 and mark < 80 then
    set response to "You passed the exam"
else if mark ≥ 80 then
    set response to "Congratulations! You're smart"
else
    set response to "Sorry. You failed"
end if
display dialog response
```

**循环语句 repeat**
循环语句中，使用`exit`退出循环，`return`也可以起到退出循环的作用，但是return的实际意义是退出当前的事件处理器，返回脚本流程。
```
// 无限循环
repeat
end repeat

// 限定次数循环,语法中的n指定了循环多少次。n必须为整数或者整型数据，且大于等于1
repeat n times
end repeat

// “直到”循环,boolean为假的时候循环执行，一旦boolean为真，退出循环。
repeat until boolean
end repeat


// while循环,在boolean为真时，循环反复执行，一旦boolean为假退出循环。
repeat while boolean
end repeat

// 变量循环,stepValue可省略，省略时为默认为1；loopVariable无需事先定义。这种循环用于精确控制循环次数，或者是和循环变量本身有关的循环。
repeat with loopVariable from startValue to stopValue by stepValue
end repeat

// List 数组循环 类似 for in
set myList to {"Hello", "Hi", "Hey", "Goodbye"} --定义一个List
repeat with i in myList
    display dialog (contents of i) --显示一个包含List中当前指向项目的内容的对话框
    set (contents of i) to "oh" --修改List中当前指向项目为"oh"
end repeat
```

 **Considering/Ignoring语句（用于文本比较）**
比较文本时，指定忽略或考虑某一属性（如大小写，空格等等）。
```
// 考虑attribute1但忽略attribute2
considering attribute1 but ignoring attribute2
end considering
```
`considering`和`ignoring`位置可以互换，但是`end considering`也要相应改成`end ignoring`，当然你可以只输入end，让编译器自己补上`considering/ignoring`。

attribute应该为下面列表中的任意一个：

关键字 | 含义
------- | -------
case | 大小写
diacriticals | 字母变调符号（如e和é）
hyphens | 连字符（-）
numeric strings | 数字化字符串（默认是忽略的），用于比较版本号时启用它
punctuation | 标点符号（,.?!等等，包括中文标点）
white space | 空格

##  AppleScript用户交互
AppleScript自带的用户交互功能全部包括于 AppleScript 字典中`StandardAdditions.osax`下`User Interaction`类

**display dialog 弹窗**

```
// 简单的弹窗提示
display dialog "弹窗内容"

// 5秒内自动关闭的弹窗，默认选中名表按钮
display dialog "这是一个对话框" buttons {"好的", "明白"} default button "明白" with title "标题" with icon note giving up after 5

// 带有输入框的对话框
display dialog "带有输入框的对话框" default answer "默认回答"
result  // 使用result获取返回值，AppleScript返回值默认是result，返回的是一个字典 {button returned:"好", text returned:"默认回答"}
set pass to text returned of result  //获取用户输入的内容，意思是从result中取出 text returned 的值赋值给pass


 [default answer text] :  弹窗内默认值
 [hidden answer boolean] : 隐藏输入内容
 [buttons list of text] : 紧跟List型参数，指定对话框拥有的按钮名称，注意最多为三个
 [default button text or integer] 紧跟text型参数的某一个按钮名称，设定默认按钮
 [with title text] :  指定对话框的标题（省略时无标题）
 [with icon] :  紧跟stop/note/caution中的一个或者file类型的路径，指定显示的图标
 [giving up after integer] 紧跟number型的整数，指定在number秒后自动消失对话框。
```

**其他弹窗**

```
// 警告弹窗
display alert "这是一个警告" message "警告的信息" as warning

// 列表选择对话框 choose from list，注意关键字中间使用with进行连接
choose from list {"备选一", "备选二", "备选三"} with title "这是一个列表选择框" with prompt "请做
出选择！" default items {"备选二"} with empty selection allowed and multiple
selections allowed

 直接参数   紧跟List类型参数，包含所有备选项
 title   紧跟text，指定选择框的标题
 prompt   指定提示信息
 default items  紧跟List，指定默认选择的项目
 empty selection allowed  写上表示允许不选
 multiple selections allowed  写上表示允许多选

// 文件选择对话框 choose file，要求用户指定一个将来用于保存信息的文件，注意: Choose file name命令并不会创建文件，它的返回值是file类型
choose file name with prompt "指定提示信息" default name "默认名称" default location file "Macintosh HD:Users"

 prompt   指定提示信息
 default name  指定默认名称
 default location  指定默认存储位置
 title   指定选择框的标题

// 选取文件夹对话框 choose folder，返回值为alias或者是List（
choose folder with prompt "指定提示信息" default location file "Macintosh HD:Users" with invisibles, multiple selections allowed and showing package contents

 invisibles 指定显示隐藏文件
 multiple selections allowed 表示可以多选
 showing package contents显示包内容，省略时则不显示隐藏文件/不可多选/不显示包内容

// 选取文件Choose File,参数同选取文件夹一样，多了一个文件类型of type
choose file of type {"txt"}
```

除了上述所说的几种常用对话框外，`AppleScript`还提供了`Choose color`用于选择颜色，返回包含 RGB信息的List，这个对话框（更准确的说是面板）和我们在其他软件，如Pages中的颜色选择面板是完全一样的。另外还有一些不常用的对话框，有兴趣的读者可自己阅读AppleScript字典。

关于用户交互，还有几个特殊的命令：beep,delay,say。这三个命令用起来都非常简单：
* beep后接一个整数，让机器蜂鸣n下，如果缺省整数，将会发出一声。
* delay后接一个整数，让代码暂停n秒，如果缺省整数，将会没有意义。
* say后接一个text，让电脑读给你听这个单词或句子。注意，Mac OS只会念英文。

##  AppleScript文件操作
Mac OS的`Alias`是记录文件的唯一识别码，即使文件被移动了，`Alias`替身仍然可以准确指向本来所指的文件。请注意：`AppleScript`也提供了传统的file类型，但是在一般情况下，我们总是使用alias而不是file来实现文件操作──file类型多用于操作尚不存在的文件。

在AppleScript中创建Alias类型的数据是非常容易的：只需要在alias关键词后加上路径──text类型的，以冒号为分隔符的完整路径，举例如下：
```
set myAlias2 to alias "Macintosh HD:Users:xxx:Desktop"
```

### 相对路径 path to
在Mac OS X中，有很多文件夹具有特殊地位，如用户的文档文件夹（Documents）、系统的资源库（Library）、应用程序文件夹（Application）等等，这些文件夹经常会被使用到，而用绝对路径来表达它们的位置显然会产生可移植性问题。AppleScript中提供的path to命令就是用来解决这个问题的：请看下面的示例代码。
```
path to documents folder --返回当前用户的“文档”文件夹绝对路径alias
path to library folder from system domain --返回系统的“资源库”绝对路径alias
```
可以使用path to命令来获得的文件夹非常多，如`application support`、`applications folder`、`desktop`、`documents folder`、`downloads folder`、system folder等等（请参阅
AppleScript字典）。

**文件读取**
文件读取使用`read`就可以了
```
set myFile to alias "Macintosh HD:Users:xxx:Desktop:example.txt"
read myFile
```
符号 | 含义
------- | -------
from 整数 | 指定从哪个位置开始读取（位置指字节数）
for 整数 | 指定读取多少个字节
to 整数 | 指定读取到哪个位置为止
before 文本 | 指定读取到文本所指定的关键字为止（不含本身）
until 文本 | 同上，但含本身
using delimiter 文本 | 指定分隔符读取成list类型的数据，这里参数也可是由文本组成的list
as 类型 | 指定读取成何种数据类型，如text,list

**写入文件**
基本的读取流程：即打开文件，写入数据，关闭文件。

要写入一个文件，首先需要`open for access with write permission`，然后使
用`write to`命令，最后还要`close access`。此外，write命令可以指定staring at参数（开始写入的位置）。

关于读取文件，事实上我们应该在读取之前先打开文件`（open for access）`，并在读取完毕之后正确关闭它`（close access`）。如果你读取文件之后没有关闭它，当你之后需要写入数据时，会发现根本没法打开写入权限，AppleScript会告知文件已经打开却没有给你写入的权限！总之一句话：**对于任何文件操作，必须要先打开再操作，最后要关闭！**
```
set aFile to alias "Macintosh HD:Users:xxx:Desktop:example.txt"
set fp to open for access aFile with write permission --打开文件
write "abc" to fp --写入数据
close access fp --关闭文件
```

## 事件处理器
相当于其他语言的函数，提高代码的复用性
```
on HelloWorld() --定义开始
    display dialog "Hello, world" --事件处理器中具体要执行的代码
end HelloWorld --定义结束

HelloWorld() --调用

// 带参数的函数
on Hello(somebody, howLong) --定义开始
    display dialog somebody giving up after howLong --该对话框将在指定时间后自动取消
end Hello --定义结束

Hello("Apple", 2) --调用，必须指定两个参数

// 返回值函数
on add(x, y)
    set answer to (x + y)
    return answer
end add
display dialog add(1, 2) --获取add处理器的返回值
```

**run和open事件处理器**
run是一个默认的事件处理器，是脚本运行的入口，任何不在其他事件处理器里的代码都隶属于run事件处理器。通常我们不需要、也没有必要显式声明run事件处理器。请记住，`如果你显式声明了run，那么不能有任何代码位于事件处理器外，即所有代码必须位于你的事件处理器中或者是run事件处理器中。`

**idle**这个事件处理器用于处理应用程序空闲时的后台任务，它具有循环的功能，只要不退出或者有其他任务，它就会隔一段时间自动执行其中的代码一次。其默认时间间隔是30秒，我们可以通过“return n”命令来控制时间间隔，如“return 10”，告诉AS每隔10秒执行一次`idle`中的任务。
**quit**它用于处理用户手动退出保持运行的程序时要执行的任务。其中，必须包含有`“continue quit”`命令，否则程序将不可能正常退出。也就是说，即使触发了quit事件处理器，该保持打开的应用程序也不一定会退出。应用程序将在执行`“continue quit”`命令时退出。
关于保持打开的脚本应用程序，示例如下：
```
on idle
    beep 2 --蜂鸣两声
    display dialog "程序正在运行" giving up after 1
    return 5 --设定每隔5秒执行一次
end idle
on quit
    display dialog "真的要退出？" buttons {"是的", "不"} --询问是否退出
    if button returned of result = "是的" then
        continue quit --只有这个命令才会让它真正退出
    end if
end quit
```

## AppleScript关键字

```
about    above   after  against     and     `apart from`     around     as   `aside from`   at
back     before     beginning   behind  below   beneath     beside  between     but  by
considering     contain  contains   continue    copy
div     does
eighth  else     end     equal   equals     error    every   exit
false   fifth  first    for    fourth    from   front
get  given  global
if   ignoring    in  `instead of`    into   is  it   its
last     local
me  middle   mod     my
ninth   not
of   on  onto   or  `out of`    over
prop     property    put
ref     reference    repeat     return   returning
script   second    set   seventh    since     sixth    some
tell     tenth   that    the    then    third    through    thru     timeout     times   to     transaction  true   try
until
where    while   whose  with    without
```

## 其他问题
**“System Events”遇到一个错误：“脚本编辑器”不允许辅助访问。**
系统权限问题，设置 -> 安全性与隐私 -> 辅助功能 -> 脚本编辑器

## 推荐网址
[聊一聊脚本语言：AppleScript](https://gcsnnb.github.io/2020/09/12/%E8%81%8A%E4%B8%80%E8%81%8A%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80%EF%BC%9AAppleScript/)