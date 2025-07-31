# React Native 调试

你可以像调试JavaScript代码一样来调试你的React Native程序。对于调试React Native应用来说，Sources和Console是使用频率很高的两个工具。


## Developer Menu
Developer Menu 是React Native给开发者定制的一个开发者菜单，来帮助开发者调试React Native应用。

```markdown
* Android模拟器：可以通过`Command⌘ + M `快捷键来快速打开Developer Menu。也可以通过模拟器上的菜单键来打开。**高版本的模拟器通常没有菜单键的，不过Nexus S上是有菜单键的，如果想使用菜单键，可以创建一个Nexus S的模拟器。**

* iOS模拟器：可以通过`Command⌘ + D`快捷键来快速打开Developer Menu。
* iOS真机： 在真机上你可以通过摇动手机来开启Developer Menu。
```
## Chrome 开发工具
谷歌 Chrome 开发工具，是基于谷歌浏览器内含的一套网页制作和调试工具。开发者工具允许网页开发者深入浏览器和网页应用程序的内部。该工具可以有效地追踪布局问题，设置 JavaScript 断点并可深入理解代码的最优化策略。 Chrome 开发工具一共提供了8大组工具：

```markdown
* Element 面板： 用于查看和编辑当前页面中的 HTML 和 CSS 元素。
* Network 面板：用于查看 HTTP 请求的详细信息，如请求头、响应头及返回内容等。
* Source 面板：用于查看和调试当前页面所加载的脚本的源文件。
* TimeLine 面板： 用于查看脚本的执行时间、页面元素渲染时间等信息。
* Profiles 面板：用于查看 CPU 执行时间与内存占用等信息。
* Resource 面板：用于查看当前页面所请求的资源文件，如 HTML，CSS样式文件等。
* Audits 面板：用于优化前端页面，加速网页加载速度等。
* Console 面板：用于显示脚本中所输出的调试信息，或运行测试脚本等。
```

## 如何通过 Chrome调试React Native程序
iOS真机调试时需要打开`"RCTWebSocketExecutor.m"`文件，将`“localhost”`改为你的电脑的ip，然后在Developer Menu下单击"Debug JS Remotely" 启动JS远程调试功能。

#### 第一步：启动远程调试
真机测试时摇晃手机打开 `Developer Menu` 菜单,单击`"Debug JS Remotely"` 启动JS远程调试功能。此时Chrome会被打开，同时会创建一个“http://localhost:8081/debugger-ui.” Tab页。

#### 第二步：打开Chrome开发者工具
在当前Tab页下打开开发者工具。打开`Chrome菜单->选择更多工具->选择开发者工具`。你也可以通过快捷键(Command⌘ + Option⌥ + I on Mac, Ctrl + Shift + I on Windows)打开开发者工具。选择本地的js文件。


* [React Native调试技巧与心得](https://github.com/crazycodeboy/RNStudyNotes/blob/master/React%20Native%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7%E4%B8%8E%E5%BF%83%E5%BE%97/React%20Native%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7%E4%B8%8E%E5%BF%83%E5%BE%97.md)
* [react native调试](https://cloud.tencent.com/developer/article/1507520)