## Flutter
Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。可以看做是一个纯粹的UI框架来使用。VSCode安装插件Flutter/Dart/Code Runner,按F5进行调试。

## Mac平台安装Flutter
1. [下载SDK](https://flutter.dev/docs/development/tools/sdk/releases#macos)
2. 配置`.bash_profile`文件,添加`Flutter`SDK的路径，比如` export PATH=~/Desktop/flutter/bin:$PATH`。
3. 运行 `source $HOME/.bash_profile `刷新当前终端窗口。**如果你使用的是zsh，终端启动时 `~/.bash_profile` 将不会被加载，解决办法就是修改 `~/.zshrc` ，在其中添加：`source ~/.bash_profile`**
4. 使用`flutter doctor`检查需要安装的依赖项

## 创建项目
1. 使用`flutter create helloworld`创建 helloworld项目，
2. 使用`flutter devices`检查当前电脑的测试设备，如果没有的打开iOS模拟器`open -a Simulator`
3. cd到对应的文件夹，使用`flutter run`运行项目