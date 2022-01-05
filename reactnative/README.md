# React Native
最近接手了一个使用React Native 和 原生混编的项目，花了一下午的时间了解了一下它，简单记录一下使用方式。不要求自己立刻学会，作用主要是要求自己可以使用和修改接收的项目。文档内容来自于[React Native中文网](https://reactnative.cn/docs/environment-setup)

## React Native 环境
选择iOS环境,必须安装的依赖有：Node、Watchman、Xcode 和 CocoaPods。使用 Homebrew 安装相关依赖， Node 版本需要是 v12 以上
```shell
brew install node
brew install watchman
```
Yarn 是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。使用`npm install -g yarn`安装。安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用yarn代替npm install命令，用yarn add 某第三方库名代替npm install 某第三方库名。

## 创建React Native 项目
直接用 node 自带的npx命令来使用（注意 init 命令默认会创建最新的版本）：
```
npx react-native init AwesomeProject
```

>注意一：请不要在目录、文件名中使用中文、空格等特殊符号。请不要单独使用常见的关键字作为项目名（如 class, native, new, package 等等）。请不要使用与核心模块同名的项目名（如 react, react-native 等）。

>注意二：0.60 及以上版本的原生依赖是通过 CocoaPods 集成安装的。CocoaPods 的源必须使用代理访问（镜像源也无效）。如果在 CocoaPods 的依赖安装步骤卡住（命令行停在 Installing CocoaPods dependencies 很久，或各种网络超时重置报错，或在ios目录中无法生成.xcworkspace文件），请务必检查确定你的代理配置是否对命令行有效。

可以使用--version参数（注意是两个杠）创建指定版本的项目。注意版本号必须精确到两个小数点。
```shell
npx react-native init AwesomeProject --version X.XX.X
```
还可以使用--template来使用一些社区提供的模板，例如带有TypeScript配置的：
```shell
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

## 运行项目
在你的项目目录中运行`yarn ios`或者`yarn react-native run-ios`：
```shell
cd AwesomeProject
yarn ios
# 或者
yarn react-native run-ios
```
此命令会对项目的原生部分进行编译，同时在另外一个命令行中启动 Metro服务对 js 代码进行实时打包处理（类似 webpack）。Metro服务也可以使用`yarn start`命令单独启动。

>提示：如果此命令无法正常运行，请使用 Xcode 运行来查看具体错误（run-ios 的报错没有任何具体信息）。注意 0.60 版本之后的主项目文件是.xcworkspace，不是.xcodeproj！

在正常编译完成后，开发期间请保持 Metro 命令行窗口运行而不要关闭。**以后需要再次运行项目时，如果没有修改过 ios 目录中的任何文件，则只需单独启动`yarn start`命令。如果对 ios 目录中任何文件有修改，则需要再次运行`yarn ios`命令完成原生部分的编译。**

yarn ios只是运行应用的方式之一。也可以在 Xcode 中直接运行应用。注意 0.60 版本之后的主项目文件是.xcworkspace，不是.xcodeproj。

运行项目成功后，如果想修改：
  * 使用你喜欢的编辑器打开App.js并随便改上几行。
  * 在 iOS 模拟器中按下`⌘-R`就可以刷新 APP 并看到你的最新修改！（如果没有反应，请检查模拟器的 `Hardware` 菜单中，`connect hardware keyboard `选项是否选中开启）

App.js是项目的入口，可以理解成单独一个界面。界面内容由js或者ts组成，语法跟html类似，样式的设置跟css类似，使用内联模式将样式设置到对应的视图中。小组件有两种写法，函数式组件或者是class组件。将组件写成函数或者类。

* 函数式组件

```javascript
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          borderColor: "red",
          borderWidth: 5,
          height: 100,
          width: 200
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderColor & borderWidth</Text>
    </View>
  );
}

// 组件的样式
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

* class组件

```javascript
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            borderColor: "red",
            borderWidth: 5,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderColor & borderWidth</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```