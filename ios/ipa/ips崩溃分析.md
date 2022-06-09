# ips崩溃分析
APP崩溃之后，通过`手机设置-隐私-分析与改进-分析数据-分享`导出崩溃日志ips。通过对ips进行分析，可以获取到具体的崩溃位置。在iOS 15之前,通过

当不确定dSYM跟对应的崩溃日志是否一致时，通过`dwarfdump --uuid dSYM文件路径`查看dSYM的UUID。

## symbolicatecrash
使用 symbolicatecrash 文件分析崩溃日志一般分为四步
```markdown
1. 找到 symbolicatecrash 文件
    * 通过shell指令`find /Applications/Xcode.app -name symbolicatecrash`可以找到文件的位置
    * 一般位于`/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash`文件中
2. 将`symbolicatecrash`文件、xxx.dSYM文件、ips文件放在同一文件夹中
3. 进入当前目录，运行shell指令`./symbolicatecrash xxx.crash xxx.app.dSYM/ > output.crash`进行错误解析
4. 如果出现`missing DEVELOPER_DIR.....`报错，执行`export DEVELOPER_DIR="/Applications/XCode.app/Contents/Developer`指令之后继续执行解析
```

>⚠️ 如果出现报错`missing DEVELOPER_DIR path: /Applications/Xcode.app/Contents/Developer`,执行`export DEVELOPER_DIR="/Applications/XCode.app/Contents/Developer`之后再执行解析的命令

##  iOS15 - CrashSymbolicator.py
iOS 15之后，iPhone 崩溃日志不再是之前的行式表示，而是JSON格式记录。苹果在Xcode13的工具里提供了新的脚本，名字为`CrashSymbolicator.py`，通过Python编写的脚本。

使用 `CrashSymbolicator.py` 文件分析崩溃日志可以按照以下的步骤：
```markdown
1. 找到 `CrashSymbolicator.py`文件
    * 通过`find /Applications/Xcode.app -name CrashSymbolicator.py`可以找到文件的位置。
    * 一般位于`/Applications/Xcode.app/Contents/SharedFrameworks/CoreSymbolicationDT.framework/Versions/A/Resources`文件中
2. 执行Python脚本，输入对应的参数文件，由于`CrashSymbolicator.py`文件中需要其他的Python模块，调用时需要完整的路径。
    * `python3 /Applications/Xcode.app/Contents/SharedFrameworks/CoreSymbolicationDT.framework/Versions/A/Resources/CrashSymbolicator.py 需要解析的崩溃日志 -d dSYM所在路径 -o 解析后的日志地址`
```

----

如果想跟 symbolicatecrash 一样可以直接拷贝到外面使用的话，需要在脚本首行增加如下代码,[查看地址](https://github.com/a20251313/symbolIOS/blob/main/CrashSymbolicator.py)：
```python
import sys
sys.path.append("/Applications/Xcode.app/Contents/SharedFrameworks/CoreSymbolicationDT.framework/Versions/A/Resources/")
```
将修改后的`CrashSymbolicator.py`、dSYM、ips文件放在同一文件夹下，使用以下指令导出解析后的日志
```shell
python3 CrashSymbolicator.py input.ips -d ./xxx.app.dSYM -o ./out.ips
```

`CrashSymbolicator.py`参数说明：
```markdown
* `“-d”，”–dsym"`：后面需要加上dSYM文件所在的路径
* `“-o”,，"–output"`：后面需要加上解析后的崩溃日志保存地址，默认是终端输出
* `“-s”，"–search-dir"`：后面需要加上额外的系统符号文件所在的目录
* `“-p”, “–pretty”`：崩溃日志格式化，默认不需要
* `“-w”, “–workers”`：开启多进程符号化崩溃日志，默认不开启
* `”–no-inlines"`,：解析的时候需要显示内联函数，默认不显示
* `“–no-source-info"`：解析的时候不显示函数的文件和行数，默认显示
* `”–only-missing"`：只回溯崩溃堆栈，默认回溯所有符号
* `“–no-system-frameworks”`：系统符号不解析，默认解析
* `”-v"，"–verbose"`：输出解析过程详细日志，默认不输出
* `“crash_log”`:要解析的崩溃日志路径，或者等待终端输入
```

## 信息来源
* [iOS15之后苹果崩溃日志解析方法](https://blog.csdn.net/a2025131311/article/details/121037998)




