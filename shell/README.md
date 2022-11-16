# shell
学习`shell`一个是为了写一些脚本方便一点，另一个是方便看别人的脚本。有些简单的脚本还是很有用的，比如自动打包工具。这里的shell文档只是一个木得感情的查找语法工具。

shell脚本运行的方式有三种`sh xxx.sh`/`bash xxx.sh`/`source xxx.sh`。
```markdown
* sh、bash :当前shell环境会启动一个子进程来执行脚本文件，执行后返回到父进程的shell环境
* source: 在当前的shell环境下执行脚本，`source xxx.sh` 也可以使用`.`代替，比如`. xxx.sh`
```

比如下面这个简单的脚本,进入到桌面，创建abc文件夹：
```shell
cd  ~/Desktop
mkdir abc
```
如果使用`sh、bash`运行,不会进入到cd对应的目录，如果使用`source`执行，执行cd后会跳转到对应的目录。

## shell指令

指令 | 含义
------- | -------
`pushd xxx` | 向栈内添加一个目录，相当于cd过去
`popd` | 返回上一个目录
`echo "打印"` | 打印
`$参数、${参数}` | 添加参数