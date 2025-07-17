# VSCode开发工具

## VScode快捷键
快捷键 | 含义
------- | -------
`shift + alt + i` | 同时编辑多行
`shift + alt + 拖动鼠标` | 同时编辑多行
`option + 点击鼠标` | 同时编辑多行
`SHIFT+TAB `  |   代码块左移
`Alt+Up 或 Alt+Down`    |   上下移动一行
`Shift+Alt+F`   |   代码格式化
`command+shaift+o`   |   搜索文件
`command+shaift+p`   |   输入命令


## 常用插件
Markdown 相关插件: 
* `Markdown All in One`  右键添加一些 Markdown 常使用的快捷键，比如代码块
* `Markdown PDF`  Markdown 转PDF 或者 HTML

Flutter 相关插件:
* `Json to Dart Model` 数据转模型插件，可以直接根据json转成对应的model
* `Flutter Intl` 多语言插件

Web 相关插件:
* `open in browser` 右击选择浏览器打开html
* `JS-CSS-HTML Formatter` 保存之后自动格式化代码
* `Auto Rename Tag` 自动重命名配对的HTML/标签
* `CSS Peek` 追踪至样式

## settings.json
vscode存在两种设置 settings.json 的方式:
1. User Settings 用户设置： 用户级设置，该用户打开的所有vscode共用这个设置
2. Workspace Settings 工作区设置： 目录下.vscode 隐藏文件夹，设置文件为`.vscode/settings.json`，作用于当前工作区或项目，优先级高于用户设置。

`cmd + shift + p`输入setting,找到打开用户设置(JSON)
* `Open Workspace Settings` 也会打开UI设置界面；
* `Open User Settings (JSON)` 会打开用户设置 settings.json 文件；
* `Open Workspace Settings (JSON)` 会打开工作区设置 settings.json 文件

### 自动删除导入未使用的包
打开设置-> settings.json，添加以下配置：
```json
"editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always", // 在保存时使用 eslint 格式化
        "source.organizeImports": "always" // 保存时整理 import ，去掉没用的导包
}
```