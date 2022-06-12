# brew
[brew官网](https://brew.sh/),MAC安装brew指令`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`


指令 | 含义
------- | -------
`brew –help ` | 查看brew的帮助
`brew install xxx` | 安装软件
`brew uninstall xxx` | 卸载软件
`brew search xxx` | 搜索软件
`brew list` | 显示已经安装软件列表
`brew update` | 更新软件，把所有的Formula目录更新，并且会对本机已经安装并有更新的软件用*标明。
`brew upgrade xxx` | 更新某具体软件 
`brew info xxx` | 显示软件内容信息
`brew home` | 用浏览器打开brew主页
`brew deps` | 显示包依赖
`brew deps --installed --tree` | 显示包的依赖树
`brew server` | 启动web服务器，可以通过浏览器访问`http://localhost:4567/`来同网页来管理包
`brew cleanup xxx` | 删除程序，和upgrade一样，单个软件删除和所有程序老版删除。
`brew outdated` | 查看那些已安装的程序需要更新


