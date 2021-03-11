# Git基础命令

## 初始化

```
git init                    //初始化仓库
git add README.md           //添加描述文件
git add .                   //添加新增文件 .为添加所有新增文件，添加具体某个文件可以将.换为文件名
git commit -m“第一次提交”    //提交到本地 ""里为描述
git remote add origin https://github.com/chuheridangwu/new.git  //添加远程仓库地址
git push -u origin master   //推送到远程仓库 master:分支名称master一般为主分支
```

## 查看版本及回退
Git保存的是每一次的修改记录
`git add`:将当前修改添加到暂存区，
`git commit`:将暂存区的所有内容提交到当前分支

```
git status  //查看当前状态
git log     //查看提交日志
git reflog  //查看提交过的命令
git log --graph --pretty=oneline --abbrev-commit  // 查看提交过的记录
git reset --hard b957a5f    //hard:强制回退  b957a5f:提交过的版本号
git checkout --file         //撤销文件内的修改过 file为文件
git rm file //删除文件，如果文件没有提交到版本库，使用rm file 就可以， file: 文件名
```

## 分支管理
**HEAD**指向的永远是当前分支

```
git branch dev      //创建dev分支 dev: 分支名称
git checkout dev    //切换到dev分支
git checkout -b dev //创建并切换到dev分支，相当于一次执行上面两个命令
git branch          //查看当前分支
git branch -d dev   //删除dev分支
git merge dev       //将dev分支跟主分支进行合并
```
>当分支合并发生冲突时，使用`git status`可以告诉我们冲突的文件，Git的用`<<<<<<<，=======，>>>>>>>`标记出不同分支的内容，我们需要修改后重新合并

## 文件管理
```
git mv a.text b.text //更改文件名称 a.text: 原来的文件名 b.text: 更改的文件名
git mv a.text mydir //移动a.text文件到 mydir文件夹 mydir: 文件夹名称
git rm a.text       //移除文件，将文件提交到分支后需要这样删除
git rm -r mydir     //删除文件夹, mydir:文件名称
rm a.text           //移除本地文件
git diff            //查看文件修改内容
```
>做任何文件操作时，需要先cd到相对应的目录，然后再执行命令，不然会找不到文件

## 标签管理
```
git tag         //查看标签     
git tag v1.0    //创建标签，v1.0: 标签名称
git tag v0.9 b957a5f    // 在对应的的版本打标签  b957a5f:提交过的版本号
git show v0.9   //查看标签信息
git tag -d v0.1 //删除本地标签
git push origin :refs/tags/v0.9 //删除远程仓库的标签，如果标签已经推送到远程仓库需要用此命令
git push origin --tags  //一次推送所有尚未推送到远程的本地标签
```

## 忽略文件
系统自动生成的文件或者你觉得不需要上传的文件，可以使用.gitignore文件进行忽略，github上面有对应的忽略配置[点此查看](https://github.com/github/gitignore)

```
touch .gitignore    //创建.gitigonre文件
vim .gitignore      //编辑，直接将上面配置好的忽略文件copy过来就可以了
```

## 变基 rebase
rebase 命令：可以将提交到某一分支上的所有修改都移至另一分支上。
rebase操作原则：只对尚未推送或分享给别人的本地修改执行变基操作清理历史， 从不对已推送至别处的提交执行变基操作。
```
多人开发项目,当你进行提交代码时，如果需要先从主分支拉取最新代码，当你再次提交时查看提交日志会显示多出一条线，

*   5eee114 (HEAD -> main) Merge branch 'dev1' into main 就是想合并
|\  
| * 130455b (dev1) 7
* | 5d5348e 6
* | 9c6e9db (dev2) 5
|/  
* 4f028ad 4
* f712934 (dev) 3
* 0a88a77 2
* 040700e 1
* 40c8fb6 Initial Commit

使用 git rebase dev 之后的日志
* 737c1eb (HEAD -> main) 7
* 324cd55 6
* fcc7600 5
* e04703d 4
* f712934 (dev) 3
* 0a88a77 2
* 040700e 1
* 40c8fb6 Initial Commit
```

## github设置代理
使用github中，我们经常会遇到下载的时候贼慢的问题，需要设置一下github的代理

github上有两种下载方式，设置代理前要知道设置形式的代理
* HTTP 形式： `git clone https://github.com/owner/git.git`
* SSH 形式： `git clone git@github.com:owner/git.git`

> 设置 HTTP 形式的代理
* 设置HTTP 代理
```bash
git config --global http.proxy "http://127.0.0.1:8080"
git config --global https.proxy "http://127.0.0.1:8080"
```

* 设置 socks5 代理（如 Shadowsocks）
```bash
git config --global http.proxy "socks5://127.0.0.1:1080"
git config --global https.proxy "socks5://127.0.0.1:1080"
```

* 取消代理设置
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

> 设置 SSH 形式的代理

修改 `~/.ssh/config` 文件（不存在则新建）

```
# 必须是 github.com
Host github.com
HostName github.com
User git
# 走 HTTP 代理
# ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=8080
# 走 socks5 代理（如 Shadowsocks）
# ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
```

## 推荐网址
* [廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
* [易百Git教程](https://www.yiibai.com/git/)
* [GitHub 设置代理](https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1)