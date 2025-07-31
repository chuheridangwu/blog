# shell输出文字的颜色及字体格式
我们在命令行打印一些文字时，可以通过添加前缀将文字改变成不同的颜色或者添加背景色。比如`echo "\033[41;36m something here"`,打印出来就是红色背景的灰色文字。固定格式是:
```shell
echo  "\033[字背景颜色;文字颜色m字符串\033[0m" 
echo  "\033[41;36m打印的内容\033[0m"
```
对应的含义是：
```markdown
1. `\033` 是转义字符的C风格八进制代码,表示转义字符 Escape
2. `[41`表示字的背景颜色,取值范围在`40-47`之间。字背景颜色和文字颜色之间是英文的`;` 
3. `36` 表示文字颜色,文字颜色后面有个`m`表示字符串属性结束,后面跟随输出的字符串 
4. 字符串前后可以没有空格，如果有的话，输出也是同样有空格 
5. `\033[0m` 表示关闭字符的属性 `echo  "\033[41;36m打印内容\033[0m普通文字"`
```

## 字体颜色 30-37
```shell
echo -e "\033[30m 黑色字 " 
echo -e "\033[31m 红色字 " 
echo -e "\033[32m 绿色字 " 
echo -e "\033[33m 黄色字 " 
echo -e "\033[34m 蓝色字 " 
echo -e "\033[35m 紫色字 " 
echo -e "\033[36m 天蓝字 " 
echo -e "\033[37m 白色字 "
```

## 背景颜色 40-47
```shell
echo -e "\033[40;37m 黑底白字 "
echo -e "\033[41;37m 红底白字 "
echo -e "\033[42;37m 绿底白字 "
echo -e "\033[43;37m 黄底白字 "
echo -e "\033[44;37m 蓝底白字 "
echo -e "\033[45;37m 紫底白字 "
echo -e "\033[46;37m 天蓝底白字" 
echo -e "\033[47;30m 白底黑字 "
```

## 其他的属性
设置输出文字的其他属性,比如下划线、闪烁、高亮度等等。如果不想要文字设置的属性设置`\033[0m`关闭所有属性
```shell
echo -e "\033[0m 关闭所有属性" 
echo -e "\033[1m 设置高亮度 "
echo -e "\033[4m 下划线" 
echo -e "\033[5m 闪烁 "
echo -e "\033[7m 反显 "
echo -e "\033[8m 消隐 "
echo -e "\033[30m — \033[37m 设置前景色 "
echo -e "\033[40m — \033[47m 设置背景色 "
echo -e "\033[nA 光标上移n行 "
echo -e "\033[nB 光标下移n行 "
echo -e "\033[nC 光标右移n行 "
echo -e "\033[nD 光标左移n行 "
echo -e "\033[y;xH设置光标位置 "
echo -e "\033[2J 清屏 "
echo -e "\033[K 清除从光标到行尾的内容" 
echo -e "\033[s 保存光标位置 "
echo -e "\033[u 恢复光标位置 "
echo -e "\033[?25l 隐藏光标 "
echo -e "\033[?25h 显示光标 "
```

## 关于转义字符（Escape Character）
转义字符原本是指ASCII中的十进制27，十六进制1B，八进制033所定义的那个字符。对应于标准键盘左上角的ESC键。

在各种计算机语言与协议中，标志着一个转义序列开始的那个字符，都叫做`Escape character`。最常见的一个例子是C程序设计语言中，用反斜线字符`“\”`作为转义字符，来表示那些不可打印的ASCII控制符。在URI协议中，转义字符是百分号`“%”`。

终端的字符颜色使用转义序列控制的，是文本模式下的系统显示功能，和具体的语言无关。转义序列是以ESC开头,即用`\033`来表示（ESC是ASCII码用十进制表示是`27`，用八进制表示就是`033`）。在unicode编码中,Escape 使用`\u{001b}`表示。

参考下面的网址：
* [ANSI转义序列](https://zh.m.wikipedia.org/zh-hans/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)
* [Unicode字符列表](https://zh.m.wikipedia.org/zh/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8)

## Swift中输出带颜色的命令行
Swift内置了`unicode`支持。这会使用反斜杠无效.因此需要使用带有"`"\u{}"`语法的颜色代码。比如`print("\u{001B}[0;33myellow")`。在unicode编码中使用`\u{001B}`定义为转义字符 Escape。
```swift
enum ASCIIColor: String {
    case black = "\u{001B}[0;30m"
    case red = "\u{001B}[0;31m"
    case green = "\u{001B}[0;32m"
    case yellow = "\u{001B}[0;33m"
    case blue = "\u{001B}[0;34m"
    case magenta = "\u{001B}[0;35m"
    case cyan = "\u{001B}[0;36m"
    case white = "\u{001B}[0;37m"
    case `default` = "\u{001B}[0;0m"
}

extension DefaultStringInterpolation {
    mutating func appendInterpolation<T: CustomStringConvertible>(_ value: T, color: ASCIIColor) {
        appendInterpolation("\(color.rawValue)\(value)\(ASCIIColor.default.rawValue)")
    }
}
```

## 参考文档
* [shell脚本中echo显示内容带颜色](https://www.cnblogs.com/lr-ting/archive/2013/02/28/2936792.html)
* [使用Swift命令行工具进行颜色输出](https://qa.1r1g.com/sf/ask/1946554781/)
* [超级终端的字体背景和颜色显示等](https://blog.csdn.net/u014470361/article/details/81512330)
* [Swift第三方库Rainbow](https://github.com/onevcat/Rainbow)
* [关于\u001b转义字符](https://www.jianshu.com/p/248a276e1a18)
* [ANSI转义序列](https://zh.m.wikipedia.org/zh-hans/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)
* [Unicode字符列表](https://zh.m.wikipedia.org/zh/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8)
* [Unicode 字符百科](https://unicode-table.com/cn/001B/)