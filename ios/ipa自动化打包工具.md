# ipa自动化打包工具
我们这里所说的自动化打包需要使用到两个工具， fastlane + gitlab中的CI/CD。需要你的代码是保存在gitlab里面的。fastlane提供打包和上传功能，gitlab提供监听功能。比如现在的需求是，当我提交代码到某个分支时，会自动对分支代码进行打包上传到testflight，这就需要fastlane 和 gitlab中的CI/CD进行配合

## fastlane
fastlane主要提供打包和上传功能，可以上传testflight、applestore、内网分发等。

通过 `brew  install fastlane`安装。

切换到项目当前目录下，执行`fastlane init`对项目进行初始化，初始化之前选择项目的Manage Schemes,把项目的shared选择框勾选上,允许所有用户共享
```ruby
1. 📸  Automate screenshots
2. 👩‍✈️  Automate beta distribution to TestFlight (自动testfilght型配置)
3. 🚀  Automate App Store distribution (自动发布型配置)
4. 🛠  Manual setup - manually setup your project to automate your (需要手动配置内容)

#  输入对应的apple账号密码进行登录
[10:42:34]: Please enter your Apple ID developer credentials
[10:42:34]: Apple ID Username:
xxxxxxx@163.com
[10:43:17]: Logging in...
[10:43:22]: ✅  Logging in with your Apple ID was successful

```
如果账号开启了二步验证，会在`apple connect`的时候报错，需要去苹果官网获取app专用密码

编辑`open ~/.zshrc`,把密码设置成全局变量,编辑好之后执行`source ~/.zshrc`生效
```
source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# 添加全局变量
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=App专用密码
```

再次执行 `fastlane init`，会让你设置`FASTLANE_SESSION`,再次编辑 `open ~/.zshrc`文件，编辑好之后执行`source ~/.zshrc`生效
```
source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# 添加全局变量
export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=App专用密码

#添加FASTLANE_SESSION
export FASTLANE_SESSION='XXX'
```
注意：`FASTLANE_SESSION`是有有效期的,现在的有效期是一个月，无效时，需要重新生成一个`FASTLANE_SESSION`

fastlane初始化完成后会在项目中生成对应的配置文件，
* `Appfile`中存储有关开发者账号相关信息
* `Fastfile`用于命令行调用和处理具体的流程，lane相对于一个action方法或函数 

执行`fastlane build`进行打包

## gitlab中的CI/CD
在gitlab代码仓库中找到设置->CI/CD，点开Runner，在打包的电脑上安装Runner,Runner是GitLab获取和执行流水线作业的进程，点开之后会看到以下的流程
```
1. 安装GitLab Runner
2. 在 Runner 设置时指定以下 URL： http://xxx.xxx.xxx.xxx/ 
3. 在安装过程中使用以下注册令牌： yw5zt2Xo_sdULpFwMizj 
4. 启动 Runner!
```

**安装Runner**

从gitlab上下载到本地文件夹
`sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64`

授予其执行权限
`sudo chmod +x /usr/local/bin/gitlab-runner`

注册Runner，在注册时会使用gitlab项目中对应的项目地址和token,注册时，会让在项目中添加`.gitlab-ci.yml`文件，该项目可以指定对应的runner进行作业
`gitlab-runner register`

启动
`gitlab-runner start ` 

停止
`gitlab-runner stop `

设置完成之后

**gitlab-ci.yml文件**
在`.gitlab-ci.yml`文件中，可以配置依赖关系和缓存、设置多个运行的命令等

[点击查看.gitlab-ci.yml文件的介绍](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html#the-gitlab-ciyml-file)

```
stages:
  - build
  - test
  - deploy

variables:
  LC_ALL: "en_US.UTF-8"
  LANG: "en_US.UTF-8"
  GIT_STRATEGY: clone

build:
  stage: build
  script:
    - bundle install
    - bundle exec fastlane build
  tags: // 配置打包的runnner名称
    - test_runner
  artifacts:
    paths:
      - ./*.ipa
```


## 参考文章
[效率神器Fastlane 之登陆校验](https://juejin.cn/post/6844903988295368711)