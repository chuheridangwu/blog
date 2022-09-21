# swift调用shell
swift可以跟shell进行交互，需要使用到三个类:
```markdown
* Process 用来打开另外一个子进程，并监控其运行情况。
* Pipe  操作系统的管道，在这里用来接受子进程的输出。可以用于将process的输出传递至管道指定的地方，如一个output变量，或者文件也可以。
* CommandLine  用于获取脚本参数
```

## Process
Process类可以用来打开另外一个子进程，并监控其运行情况。它的相关属性：
```markdown
* launchPath： 指定了执行路径。如可以设置为 /usr/bin/env ，这个命令可以用于打印本机上所有的环境变量；也可以用于执行shell命令，如果你接了参数的话。本文的Demo就用它来执行输入的命令。
* arguments：参数，以数组形式传递即可。
* launch：调用launch函数即可启动process，用于执行命令。
* waitUntilExit：一般执行Shell命令，需要等待命令返回。
* terminationStatus：当前process的结束状态，正常为0.
* standardOutput：standardOutput对应于终端的标准输出。standardError则是错误输出。
```

## Pipe
Pipe这个类就是操作系统的管道，在这里用来接受子进程的输出。这里，可以用于将process的输出传递至管道指定的地方，如一个output变量，或者文件也可以。
```markdown
* fileHandleForReading：pipe从哪里读取内容？
* fileHandleForWriting：pipe将内容写到哪里？
```

## CommandLine
CommandLine 常用的只有两个属性。
```swift
print(CommandLine.argc) // 3 获取参数的个数
print(CommandLine.arguments) // ["xxx/Library/Developer/Xcode/DerivedData/mtool-frvvgamqfvvgjtfuuzqiondjocdq/Build/Products/Debug/mtool.app/Contents/MacOS/mtool", "-NSDocumentRevisionsDebugMode", "YES"] 获取具体的参数
```

## 仅执行Shell命令
这里提供了两种调用Shell命令的封装函数，个人更倾向于第二种，直接将Shell命令及参数封装成一个字符串传入即可。
```swift
@discardableResult
func runShell(_ command: String) -> Int32 {
    let task = Process()
    task.launchPath = "/bin/bash"
    task.arguments = ["-c", command]
    task.launch()
    task.waitUntilExit()
    return task.terminationStatus
}

@discardableResult
func runShellWithArgs(_ args: String...) -> Int32 {
    let task = Process()
    task.launchPath = "/usr/bin/env"
    task.arguments = args
    task.launch()
    task.waitUntilExit()
    return task.terminationStatus
}

// 调用方式
runShell("pwd")
runShell("ls -l")

runShellWithArgs("pwd")
runShellWithArgs("ls", "-l")
```

## 需要Shell命令的输出内容
如果需要shell命令的输出内容，这里就需要使用到Pipe了。
```swift
@discardableResult
func runShellAndOutput(_ command: String) -> (Int32, String?) {
    let task = Process()
    task.launchPath = "/bin/bash"
    task.arguments = ["-c", command]
    
    let pipe = Pipe()
    task.standardOutput = pipe
    task.standardError = pipe
    
    task.launch()
    
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output = String(data: data, encoding: .utf8)
    
    task.waitUntilExit()
    
    return (task.terminationStatus, output)
}

@discardableResult
func runShellWithArgsAndOutput(_ args: String...) -> (Int32, String?) {
    let task = Process()
    task.launchPath = "/usr/bin/env"
    task.arguments = args
    
    let pipe = Pipe()
    task.standardOutput = pipe
    task.standardError = pipe
    
    task.launch()
    
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output = String(data: data, encoding: .utf8)
    
    task.waitUntilExit()
    
    return (task.terminationStatus, output)
}

// 调用方式
let (ret1, output1) = runShellAndOutput("ls -l")
if let output11 = output1 {
    print(output11)
}

let (ret2, output2) = runShellWithArgsAndOutput("ls", "-l")
if let output22 = output2 {
    print(output2)
}
```

## 第三方 ShellOut
我们也可以通过封装好的[ShellOut库](https://github.com/chuheridangwu/ShellOut)进行调用,像调用普通的对象一样，它封装好了调用的方法。使用比较简单
```swift
let output = try shellOut(to: "echo", arguments: ["Hello world"])
print(output) // Hello world

// 您还可以轻松地一次运行一系列命令，可以选择在给定路径上运行：
try shellOut(to: ["mkdir NewFolder", "echo \"Hello again\" > NewFolder/File"], at: "~/CurrentFolder")
let output = try shellOut(to: "cat File", at: "~/CurrentFolder/NewFolder")
print(output) // Hello again
```

## 跟命令行进行交互
通过`readLine()`函数可以跟shell进行交互,比如`let num1 = readLine()`读取在命令行输入的内容并赋值给对应的变量。
```swift
func readContent(){
    print("请输入对应的内容：")
    guard let res = readLine() else { return }
    print(res)
}
```

## 参考网址
* [如何使用Swift来实现一个命令行工具](https://juejin.cn/post/6844904158269702151)
* [stackoverflow](https://stackoverflow.com/questions/26971240/how-do-i-run-a-terminal-command-in-a-swift-script-e-g-xcodebuild)
* [swift - 在命令行应用程序中从键盘输入](https://www.itranslater.com/qa/details/2325869775827764224)