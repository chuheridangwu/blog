# 引用shell

引入外部 `shell` 脚本, 使用`.` 或者 `source` 关键字

```
. 脚本名称  # 点 与脚本名称之间需要空格隔开
或者
source  脚本名称
```

example:

```shell
# 创建 test.sh文件,内部创建url变量
#!/bin/bash
url=www.baidu.com

# 创建测试脚本test1.sh，引入test脚本
#!/bin/bash
. ./test.sh
echo "打印url的值: $url"
```