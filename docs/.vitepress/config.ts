import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '开发者文档',
  description: '全栈开发技术文档',
  
  // 基础配置
  base: '/',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  
  // 启用 Git 时间戳
  ignoreDeadLinks: false,
  
  // 屏蔽指定文件,_sidebar.md 屏蔽侧边栏文件是在原来docsify中使用的，现在的vitePress打包不支持里面的链接方式
  srcExclude: ["**/_sidebar.md","**/_navbar.md"], // 支持 glob 模式

  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  // 主题配置
  themeConfig: {
    // 网站标题和logo
    siteTitle: '开发者文档',
    logo: '/logo.svg',
    
    // 导航栏
    nav: [
      { text: '🏠 首页', link: '/' },
      {
        text: '📱 移动开发',
        items: [
          {
            text: '跨平台',
            items: [
              { text: 'Flutter', link: '/flutter/' },
            ]
          },
          {
            text: '原生开发',
            items: [
              { text: 'Objective-C', link: '/ios/' },
              { text: 'Swift', link: '/swift/' },
              { text: 'Android', link: '/android/' }
            ]
          }
        ]
      },
      {
        text: '🌐 前端开发',
        items: [
          { text: 'Web 前端', link: '/web/' },
          { text: '网络篇', link: '/network/' }
        ]
      },
      {
        text: '🔧 系统开发',
        items: [
          { text: 'C 语言', link: '/c/' },
          { text: 'Python', link: '/python/' },
          { text: 'Shell 脚本', link: '/shell/' }
        ]
      },
      {
        text: '🛠️ 开发工具',
        items: [
          { text: '工具集合', link: '/tool/' },
          { text: 'Photoshop', link: '/photoshop/' }
        ]
      },
      { 
        text: '📝 生活', 
        link: '/live/',
        activeMatch: '^/live/'
      },
      {
        text: '📚 学习',
        link: '/xgn/',
        activeMatch: '^/xgn/'
      }
    ],

    // 侧边栏配置 - 根据实际目录结构
    sidebar: {
      // Flutter 侧边栏
      '/flutter/': [
        {
          text: '📱 Flutter 开发',
          collapsed: false,
          items: [
            { text: '📋 Flutter 概述', link: '/flutter/' }
          ]
        },
        {
          text: '🎯 关于 Dart',
          collapsed: false,
          items: [
            { text: '1.1 前言', link: '/flutter/dart/dart' },
            { text: '1.2 Dart速查表', link: '/flutter/dart/dart_dec' },
            { text: '1.3 List', link: '/flutter/dart/list' },
            { text: '1.4 异步', link: '/flutter/dart/async' },
            { text: '1.5 类和对象', link: '/flutter/dart/class' },
            { text: '1.6 空安全', link: '/flutter/dart/null-safety' }
          ]
        },
        {
          text: '🚀 Flutter 开发介绍',
          collapsed: false,
          items: [
            { text: '2.1 Flutter开发工具', link: '/flutter/preface/01-flutter' },
            { text: '2.2 Widget目录', link: '/flutter/preface/02-widgets' },
            { text: '2.3 布局原理', link: '/flutter/preface/03-layout' },
            { text: '2.4 关于Flutter中的Key', link: '/flutter/preface/04-key' },
            { text: '2.5 获取屏幕尺寸', link: '/flutter/preface/05-size' },
            { text: '2.6 枚举速查表', link: '/flutter/preface/06-enum' }
          ]
        },
        {
          text: '🎨 Flutter 基础组件',
          collapsed: false,
          items: [
            { text: '3.1 学习Widget之前', link: '/flutter/widgets/前言' },
            { text: '3.1 Container', link: '/flutter/widgets/container' },
            { text: '3.2 图片', link: '/flutter/widgets/image' },
            { text: '3.3 TextField', link: '/flutter/widgets/textfield' },
            { text: '3.4 裁剪Clip', link: '/flutter/widgets/clip' }
          ]
        },
        {
          text: '🏗️ 项目结构和路由',
          collapsed: false,
          items: [
            { text: '4.1 Scaffold', link: '/flutter/widgets/scaffold' },
            { text: '4.2 AppBar', link: '/flutter/widgets/appbar' },
            { text: '4.3 主题和颜色', link: '/flutter/widgets/theme' }
          ]
        },
        {
          text: '📜 可滚动组件',
          collapsed: false,
          items: [
            { text: '1.1 前言', link: '/flutter/scrollview/scroll' },
            { text: '1.2 ListView', link: '/flutter/scrollview/ListView' },
            { text: '1.3 GridView', link: '/flutter/scrollview/GridView' },
            { text: '1.4 SingleChildScrollView', link: '/flutter/scrollview/SingleChildScrollView' },
            { text: '1.5 CustomScrollView', link: '/flutter/scrollview/CustomScrollView' },
            { text: '1.6 ListWheelScrollView', link: '/flutter/scrollview/ListWheelScrollView' },
            { text: '1.7 PageView', link: '/flutter/scrollview/PageView' },
            { text: '1.8 TabBarView', link: '/flutter/scrollview/TabBarView' }
          ]
        },
        {
          text: '⚙️ 功能性组件',
          collapsed: false,
          items: [
            { text: '6.1 FutureBuilder', link: '/flutter/action/futureBuilder' },
            { text: '6.2 StreamBuilder', link: '/flutter/action/stream' },
            { text: '6.3 数据共享（InheritedWidget）', link: '/flutter/action/InheritedWidget' }
          ]
        },
        {
          text: '🎬 动画',
          collapsed: false,
          items: [
            { text: '7.1 隐式动画', link: '/flutter/animation/animation1' },
            { text: '7.2 显示动画', link: '/flutter/animation/animation2' },
            { text: '7.3 其他动画', link: '/flutter/animation/animation3' }
          ]
        },
        {
          text: '🔗 平台通信',
          collapsed: false,
          items: [
            { text: '8.1 多端通信', link: '/flutter/package/channel' },
            { text: '8.2 制作Flutter插件', link: '/flutter/package/package' },
            { text: '8.3 国际化', link: '/flutter/package/localizations' }
          ]
        },
        {
          text: '📦 三方插件',
          collapsed: false,
          items: [
            { text: '第三方插件', link: '/flutter/thirdparty/thirdpart' }
          ]
        }
      ],

      // iOS 侧边栏 - 按照原有结构完整配置
      '/ios/': [
        {
          text: '🍎 iOS 开发',
          collapsed: false,
          items: [
            { text: '📋 iOS 开发概述', link: '/ios/' }
          ]
        },
        {
          text: '第一章:小码哥底层原理',
          collapsed: false,
          items: [
            { text: '01-OC对象的本质', link: '/ios/principle/OC对象的本质' },
            { text: '02-isa和supperclass', link: '/ios/principle/isa和superclass' },
            { text: '03-KVO', link: '/ios/principle/kvo' },
            { text: '04-KVC', link: '/ios/principle/kvc的本质' },
            { text: '05-Category的本质', link: '/ios/principle/category1' },
            { text: '06-Category的load、initialize方法', link: '/ios/principle/category2' },
            { text: '07-Category之关联对象', link: '/ios/principle/category3' },
            { text: '08-认识Block', link: '/ios/principle/block1' },
            { text: '09-Block详解', link: '/ios/principle/block2' },
            { text: '10-位域和共同体union', link: '/ios/principle/runtime1' },
            { text: '11-Runtime准备工作', link: '/ios/principle/runtime2' },
            { text: '12-Runtime认识objc_msgSend', link: '/ios/principle/runtime3' },
            { text: '13-Runtim引发的面试题', link: '/ios/principle/runtime4' },
            { text: '14-Runtime的API', link: '/ios/principle/runtime5' },
            { text: '15-Runloop分析', link: '/ios/principle/runloop1' },
            { text: '16-Runloop的调用流程及应用', link: '/ios/principle/runloop2' },
            { text: '17-认识多线程', link: '/ios/principle/thread1' },
            { text: '18-线程锁的应用', link: '/ios/principle/thread2' },
            { text: '19-内存管理 - 定时器', link: '/ios/principle/memory1' },
            { text: '20-内存管理 - Tagged Pointer', link: '/ios/principle/memory2' },
            { text: '21-内存管理 - autorelease', link: '/ios/principle/memory3' },
            { text: '22-性能优化', link: '/ios/principle/性能优化' }
          ]
        },
        {
          text: '第二章:IPA相关知识',
          collapsed: false,
          items: [
            { text: '01-iOS签名流程', link: '/ios/ipa/iOS签名机制' },
            { text: '02-IPA重签名', link: '/ios/ipa/ipa重签名' },
            { text: '03-苹果商店获取ipa文件', link: '/ios/ipa/获取ipa文件' },
            { text: '04-fastlane自动化打包工具', link: '/ios/ipa/fastlane自动化打包工具' },
            { text: '05-xcodebuild自动化打包工具', link: '/ios/ipa/xcodebuild打包工具' },
            { text: '06-Windows生成iOS证书及p12文件', link: '/ios/ipa/window系统生成证书' },
            { text: '07-IPA分发', link: '/ios/ipa/ipa分发' },
            { text: '08-ips崩溃分析', link: '/ios/ipa/ips崩溃分析' },
            { text: '09-ideviceinstaller与iOS设备通信', link: '/ios/ipa/ideviceinstaller' },
            { text: '10-下载IPA历史版本', link: '/ios/ipa/下载IPA历史版本' }
          ]
        },
        {
          text: '第三章:API',
          collapsed: false,
          items: [
            { text: '01-NSArray', link: '/ios/api/nsarray' },
            { text: '02-NSString', link: '/ios/api/nsstring' },
            { text: '03-NSFilemanager', link: '/ios/api/nsfilemanager' },
            { text: '04-iOS权限', link: '/ios/api/authority' },
            { text: '05-视频画中画', link: '/ios/api/画中画' },
            { text: '06-NFC功能', link: '/ios/api/nfc' },
            { text: '07-客户端搭建本地服务器', link: '/ios/api/server' },
            { text: '08-蓝牙', link: '/ios/api/蓝牙' },
            { text: '09-sms扩展', link: '/ios/api/sms扩展' },
            { text: '10-Universal Link', link: '/ios/api/UniversalLink' }
          ]
        },
        {
          text: '第四章: 开发工具',
          collapsed: false,
          items: [
            { text: '01-Automator 自动化工具', link: '/ios/mac/automator' },
            { text: '02-AppleScript', link: '/ios/mac/applescript' },
            { text: '03-LLVM', link: '/ios/mac/llvm' },
            { text: '04-iOS中常见错误', link: '/ios/mac/ios_error' },
            { text: '05-上架准备工作', link: '/ios/mac/ready' }
          ]
        },
        {
          text: '第五章: 逆向相关',
          collapsed: false,
          items: [
            { text: '01-准备工作', link: '/ios/jailbreak/01-ready' },
            { text: '02-SSH', link: '/ios/jailbreak/02-ssh' },
            { text: '03-Cycript', link: '/ios/jailbreak/03-cycript' },
            { text: '04-Reveal', link: '/ios/jailbreak/04-reveal' },
            { text: '05-逆向思路', link: '/ios/jailbreak/05-逆向思路' },
            { text: '06-Mach-O文件', link: '/ios/jailbreak/06-mach-o' },
            { text: '07-IPA脱壳', link: '/ios/jailbreak/07-IPA脱壳' },
            { text: '08-theos', link: '/ios/jailbreak/08-theos' },
            { text: '09-命令行工具', link: '/ios/jailbreak/09-命令行工具' },
            { text: '10-动态调试/LLDB', link: '/ios/jailbreak/10-debugserver和LLDB' },
            { text: '11-ASLR', link: '/ios/jailbreak/11-aslr' },
            { text: '12-hook新概念项目', link: '/ios/jailbreak/12-hook新概念的过程' },
            { text: '13-LLVM和代码混淆', link: '/ios/jailbreak/13-llvm' },
            { text: '14-汇编', link: '/ios/jailbreak/14-汇编' },
            { text: '15-palera1n越狱', link: '/ios/jailbreak/15-palera1n' },
            { text: '16-TrollStore', link: '/ios/jailbreak/16-TrollStore' }
          ]
        }
      ],

      // Swift 侧边栏
      '/swift/': [
        {
          text: '🔶 Swift 语法',
          collapsed: false,
          items: [
            { text: '📋 Swift 概述', link: '/swift/' }
          ]
        },
        {
          text: 'API',
          collapsed: false,
          items: [
            { text: '01-String', link: '/swift/api/01-string' },
            { text: '02-多线程', link: '/swift/api/02-多线程' },
            { text: '03-指针', link: '/swift/api/03-指针' },
            { text: '04-Shell交互', link: '/swift/api/04-shell交互' },
            { text: '05-UI相关技巧', link: '/swift/api/05-UI' },
            { text: '06-Xib', link: '/swift/api/06-xib' },
            { text: '07-UIDevice', link: '/swift/api/07-UIDevice' },
            { text: '08-URLSession', link: '/swift/api/08-URLSession' },
            { text: '09-UICollectionView', link: '/swift/api/09-UICollectionView' },
            { text: '10-AVFoundation', link: '/swift/api/10-AVFoundation' },
            { text: '11-本地化', link: '/swift/api/11-本地化' },
            { text: '12-阿拉伯语RTL适配', link: '/swift/api/12-阿拉伯语RTL适配' },
            { text: '13-JSON解析', link: '/swift/api/13-JSON解析' }
          ]
        },
        {
          text: '工具',
          collapsed: false,
          items: [
            { text: '01-CocoaPods', link: '/swift/sdk/01-CocoaPods' },
            { text: '02-Cartahge', link: '/swift/sdk/02-Cartahge' },
            { text: '03-常用的三方库', link: '/swift/sdk/03-常用的三方库' },
            { text: '04-三方库使用方法', link: '/swift/sdk/04-三方库使用方法' },
            { text: '05-Xcode', link: '/swift/sdk/05-Xcode' },
            { text: '06-编译命令', link: '/swift/sdk/06-编译命令' },
            { text: '07-静态库', link: '/swift/sdk/07-静态库' },
            { text: '08-动态库', link: '/swift/sdk/08-动态库' },
            { text: '09-开发者账号', link: '/swift/sdk/09-开发者账号' }
          ]
        },
        {
          text: '基础语法',
          collapsed: false,
          items: [
            { text: '01-Swift基础语法', link: '/swift/grammar/01-swift基础语法' },
            { text: '02-Swift函数语法', link: '/swift/grammar/02-swift函数' },
            { text: '03-Swift枚举', link: '/swift/grammar/03-swift枚举' },
            { text: '04-Swift可选项', link: '/swift/grammar/04-swift可选项' },
            { text: '05-Swift结构体和类', link: '/swift/grammar/05-swift结构体和类' },
            { text: '06-Swift闭包', link: '/swift/grammar/06-swift闭包' },
            { text: '07-Swift属性/方法/下标', link: '/swift/grammar/07-swift属性' },
            { text: '08-Swift继承', link: '/swift/grammar/08-swift继承' },
            { text: '09-Swift初始化/可选链', link: '/swift/grammar/09-swift初始化' },
            { text: '10-Swift协议', link: '/swift/grammar/10-swift协议' },
            { text: '11-Swift错误处理', link: '/swift/grammar/11-swift错误处理' },
            { text: '12-Swift泛型', link: '/swift/grammar/12-swift泛型' },
            { text: '13-高级运算符', link: '/swift/grammar/13-高级运算符' },
            { text: '18-OC到Swift', link: '/swift/grammar/18-oc到swift' },
            { text: '19-函数式编程', link: '/swift/grammar/19-函数式编程' },
            { text: '20-面向协议编程', link: '/swift/grammar/20-面向协议编程' }
          ]
        }
      ],

      // 工具侧边栏
      '/tool/': [
        {
          text: '🛠️ 开发工具',
          collapsed: false,
          items: [
            { text: '📋 工具概述', link: '/tool/' },
            { text: '🐙 GitHub 优质项目', link: '/tool/01-GitHub项目' },
            { text: '💻 VSCode 使用指南', link: '/tool/02-vscode' },
            { text: '🔧 调试技巧', link: '/tool/skill' },
            { text: '🍎 MAC 电脑', link: '/tool/mac' },
            { text: '📦 抓包工具', link: '/tool/package' },
            { text: '🌐 curl 用法', link: '/tool/curl' },
            { text: '📚 Docsify', link: '/tool/docsify' },
            { text: '📊 Airtable', link: '/tool/airtable' },
            { text: '🔀 Git 用法', link: '/tool/git' },
            { text: '🎬 FFmpeg 常用方法', link: '/tool/ffmpeg' },
            { text: '🗄️ SQLite 常用方法', link: '/tool/sqlite' },
            { text: '🍺 Brew', link: '/tool/brew' },
            { text: '🔓 Mac 破解 Wifi', link: '/tool/破解wifi' },
            { text: '💎 Ruby', link: '/tool/ruby' },
            { text: '💻 Windows 虚拟机安装 MacOS 系统', link: '/tool/Windows虚拟机安装MacOS系统' }
          ]
        },
        {
          text: '🤖 AI 编程工具',
          collapsed: false,
          items: [
            { text: '🎯 Cursor 完整指南', link: '/tool/cursor/Cursor快速上手和科学使用指南' }
          ]
        }
      ],

      // Shell 侧边栏
      '/shell/': [
        {
          text: '🐚 Shell 脚本',
          collapsed: false,
          items: [
            { text: '📋 Shell 概述', link: '/shell/' },
            { text: '🐧 Linux', link: '/shell/liunx' }
          ]
        },
        {
          text: '📖 Shell 基础语法',
          collapsed: false,
          items: [
            { text: '认识 Shell', link: '/shell/shell' },
            { text: '运算符', link: '/shell/operador' },
            { text: '流程控制', link: '/shell/process' },
            { text: '函数', link: '/shell/function' },
            { text: 'Shell 命令行颜色', link: '/shell/color' }
          ]
        },
        {
          text: '📊 字典、数组',
          collapsed: false,
          items: [
            { text: '数组', link: '/shell/array' }
          ]
        },
        {
          text: '📁 文件操作',
          collapsed: false,
          items: [
            { text: '文件引用', link: '/shell/quote' },
            { text: '特殊字符', link: '/shell/character' }
          ]
        },
        {
          text: '🛠️ 工具类',
          collapsed: false,
          items: [
            { text: 'Shell 脚本', link: '/shell/tool' }
          ]
        }
      ],

      // Web 前端侧边栏
      '/web/': [
        {
          text: '🎨 前端基础',
          collapsed: false,
          items: [
            { text: '📋 概述', link: '/web/' },
            { text: 'HTML', link: '/web/html' }
          ]
        },
        {
          text: '🎨 CSS',
          collapsed: false,
          items: [
            { text: '1.认识CSS', link: '/web/css/1.css' },
            { text: '2.CSS选择器', link: '/web/css/2.selector' },
            { text: '3.CSS重要属性', link: '/web/css/3.css' },
            { text: '4.CSS布局', link: '/web/css/4.layout' },
            { text: '5.CSS动画', link: '/web/css/5.animation' },
            { text: '6.HTML5', link: '/web/css/6.html5' }
          ]
        },
        {
          text: '📜 JavaScript',
          collapsed: false,
          items: [
            { text: '1.基础语法', link: '/web/js/1.javascript' },
            { text: '2.数组', link: '/web/js/2.array' },
            { text: '3.函数', link: '/web/js/3.function' },
            { text: '4.类和对象', link: '/web/js/4.class' },
            { text: '5.DOM Document', link: '/web/js/5.document' },
            { text: '6.事件处理', link: '/web/js/6.event' },
            { text: '7.BOM', link: '/web/js/7.bom' },
            { text: '8.this', link: '/web/js/8.this' }
          ]
        },
        {
          text: '⚡ Vue',
          collapsed: false,
          items: [
            { text: '01.基础使用', link: '/web/vue/01-基础使用' },
            { text: '02.父子组件', link: '/web/vue/02-父子组件' },
            { text: '03.vue-router', link: '/web/vue/03-VueRouter' }
          ]
        },
        {
          text: '🖥️ Electron(桌面端应用)',
          collapsed: false,
          items: [
            { text: '01.基础使用', link: '/web/electron/01-基础使用' },
            { text: '02.问题', link: '/web/electron/02-问题' }
          ]
        },
        {
          text: '🟢 Node',
          collapsed: false,
          items: [
            { text: '01-node基础介绍', link: '/web/node/01-node基础介绍' },
            { text: '02-模块化', link: '/web/node/02-模块化' },
            { text: '03-内置模块', link: '/web/node/03-内置模块' },
            { text: '04-包管理工具', link: '/web/node/04-包管理工具' },
            { text: '05-Buffer', link: '/web/node/05-Buffer' },
            { text: '06-Http', link: '/web/node/06-Http' },
            { text: '07-Express', link: '/web/node/07-Express' },
            { text: '08-会话控制', link: '/web/node/08-会话控制' },
            { text: '09-MongoDB', link: '/web/node/09-MongoDB' },
            { text: '10-接口', link: '/web/node/10-接口' }
          ]
        },
        {
          text: '🔧 Puppeteer',
          collapsed: false,
          items: [
            { text: '01-基础使用', link: '/web/puppeteer/01-基础使用' },
            { text: '02-查找元素', link: '/web/puppeteer/02-查找元素' },
            { text: '03-Electron中使用', link: '/web/puppeteer/03-electron+puppeteer' }
          ]
        }
      ],

      // Android 侧边栏
      '/android/': [
        {
          text: '🤖 Android 开发',
          collapsed: false,
          items: [
            { text: '📋 Android 概述', link: '/android/' },
            { text: 'Activity', link: '/android/activity' },
            { text: 'Intent', link: '/android/intent' },
            { text: '本地存储', link: '/android/store' },
            { text: '常见错误', link: '/android/errorInfo' }
          ]
        },
        {
          text: '🛠️ AndroidStudio开发工具',
          collapsed: false,
          items: [
            { text: 'AndroidStudio', link: '/android/androidstudio' },
            { text: '系统权限', link: '/android/authorith' },
            { text: 'ADB', link: '/android/adb' },
            { text: 'APK', link: '/android/apk' }
          ]
        },
        {
          text: '📐 布局',
          collapsed: false,
          items: [
            { text: 'Layout布局', link: '/android/layout/layout' },
            { text: 'LinearLayout 线性布局', link: '/android/layout/linearlayout' },
            { text: 'RelativeLayout 相对布局', link: '/android/layout/relativelayout' },
            { text: 'ConstraintLayout 约束布局', link: '/android/layout/constranintlayout' }
          ]
        },
        {
          text: '🎨 View',
          collapsed: false,
          items: [
            { text: '常用View属性', link: '/android/ui/view' },
            { text: 'RecyclerView', link: '/android/ui/recyclerview' },
            { text: 'ViewPage2', link: '/android/ui/viewpage2' },
            { text: 'Fragment', link: '/android/ui/fragment' },
            { text: '自定义控件', link: '/android/ui/customview' }
          ]
        },
        {
          text: '📚 第三方框架',
          collapsed: false,
          items: [
            { text: '第三方框架', link: '/android/thirdparty/thirdparty' },
            { text: 'AdMob', link: '/android/thirdparty/admob1' },
            { text: 'Retrofit', link: '/android/thirdparty/retrofit' },
            { text: 'BaseRecyclerViewAdapterHelper', link: '/android/thirdparty/BaseRecyclerView' }
          ]
        },
        {
          text: '🔷 Kotlin',
          collapsed: false,
          items: [
            { text: '简介', link: '/android/kotlin/kotlin简介' },
            { text: 'String', link: '/android/kotlin/string' }
          ]
        }
      ],

      // C 语言侧边栏
      '/c/': [
        {
          text: '🔧 C 语言编程',
          collapsed: false,
          items: [
            { text: '📋 C 语言概述', link: '/c/' },
            { text: '01-编译', link: '/c/01-编译' },
            { text: '02-进位制', link: '/c/02-进位制' },
            { text: '03-位运算', link: '/c/03-位运算' },
            { text: '04-指针', link: '/c/04-指针' },
            { text: '05-结构体', link: '/c/05-结构体' },
            { text: '06-预处理指令', link: '/c/06-预处理指令' },
            { text: '07-变量和数据类型', link: '/c/07-变量和数据类型' },
            { text: '08-函数', link: '/c/08-函数' },
            { text: '09-编译过程', link: '/c/09-编译过程' },
            { text: '10-目标文件和可执行文件里面都有什么？', link: '/c/10-目标文件和可执行文件里面都有什么？' },
            { text: '11-什么是链接以及它的作用', link: '/c/11-什么是链接以及它的作用' },
            { text: '12-符号-链接的粘合剂', link: '/c/12.符号-链接的粘合剂' }
          ]
        }
      ],

      // Python 侧边栏
      '/python/': [
        {
          text: '🐍 Python 编程',
          collapsed: false,
          items: [
            { text: '📋 Python 概述', link: '/python/' }
          ]
        },
        {
          text: '📖 Python 基础语法',
          collapsed: false,
          items: [
            { text: '基础介绍', link: '/python/Python基础' },
            { text: '字符串', link: '/python/string' }
          ]
        },
        {
          text: '📊 字典、数组',
          collapsed: false,
          items: [
            { text: '数组', link: '/python/array' },
            { text: '字典', link: '/python/dictionary' },
            { text: '切片', link: '/python/slice' },
            { text: '公共方法', link: '/python/公共方法' }
          ]
        },
        {
          text: '📁 文件和文件夹',
          collapsed: false,
          items: [
            { text: '文件操作', link: '/python/file' },
            { text: '目录文件夹操作', link: '/python/os' }
          ]
        },
        {
          text: '🔍 正则表达式',
          collapsed: false,
          items: [
            { text: 'Re 库', link: '/python/re' },
            { text: '正则表达式', link: '/python/regular' }
          ]
        },
        {
          text: '🏗️ 类',
          collapsed: false,
          items: [
            { text: '类和对象', link: '/python/class' }
          ]
        },
        {
          text: '🌐 网络',
          collapsed: false,
          items: [
            { text: '简单创建服务端和客户端', link: '/python/network' }
          ]
        },
        {
          text: '🛠️ Python 脚本',
          collapsed: false,
          items: [
            { text: '常用脚本', link: '/python/tool' },
            { text: 'iOS 审核脚本', link: '/python/review' }
          ]
        }
      ],

      // 网络侧边栏
      '/network/': [
        {
          text: '🌐 网络技术',
          collapsed: false,
          items: [
            { text: '📋 网络概述', link: '/network/' },
            { text: '01-网络基础概念', link: '/network/01-基础概念' },
            { text: '02-MAC地址', link: '/network/02-MAC地址' },
            { text: '03-IP地址', link: '/network/03-IP地址' },
            { text: '04-路由', link: '/network/04-路由' },
            { text: '05-物理层', link: '/network/05-物理层' },
            { text: '06-数据链路层(Data Link)', link: '/network/06-数据链路层' },
            { text: '07-网络层', link: '/network/07-网络层' },
            { text: '08-传输层UDP/TCP', link: '/network/08-传输层' },
            { text: '09-TCP连接管理', link: '/network/09-TCP连接管理' },
            { text: '10-应用层 - 域名、DNS、DHCP', link: '/network/10-应用层1' },
            { text: '11-应用层 - HTTP协议', link: '/network/11-应用层2' },
            { text: '12-应用层 - 代理、CDN、网络安全', link: '/network/12-应用层3' },
            { text: '13-应用层 - 加密解密、数字签名、证书', link: '/network/13-应用层4' },
            { text: '14-应用层 - HTTPS', link: '/network/14-应用层5' },
            { text: '15-应用层 - HTTP/2 - HTTP/3', link: '/network/15-应用层6' },
            { text: '16-应用层 - 其他协议', link: '/network/16-应用层7' }
          ]
        }
      ],

      // Photoshop 侧边栏
      '/photoshop/': [
        {
          text: '🎨 Photoshop',
          collapsed: false,
          items: [
            { text: '📋 Photoshop 概述', link: '/photoshop/' },
            { text: '⌨️ 快捷键', link: '/photoshop/hotkey' },
            { text: '🛠️ 工具快捷键', link: '/photoshop/toolhotkey' },
            { text: '📐 选框', link: '/photoshop/选框' },
            { text: '📄 图层', link: '/photoshop/图层' },
            { text: '🔄 移动工具', link: '/photoshop/移动工具' },
            { text: '✂️ 抠图', link: '/photoshop/抠图' },
            { text: '🛤️ 路径', link: '/photoshop/路径' },
            { text: '🔷 形状', link: '/photoshop/形状' },
            { text: '💡 常用技巧', link: '/photoshop/作图技巧' }
          ]
        }
      ],

      // 生活侧边栏
      '/live/': [
        {
          text: '📝 生活',
          collapsed: false,
          items: [
            { text: '📋 生活概述', link: '/live/' }
          ]
        },
        {
          text: '💰 投资理财',
          collapsed: false,
          items: [
            { text: '股票', link: '/live/券商' },
            { text: '百科', link: '/live/live' },
            { text: '缠论', link: '/live/stock/1' },
            { text: '情绪波动', link: '/live/stock/情绪波动' }
          ]
        },
        {
          text: '📰 公众号文章',
          collapsed: false,
          items: [
            { text: '2022年文章合集', link: '/live/公众号/' }
          ]
        },
        {
          text: '📝 2022年文章列表',
          collapsed: true,
          items: [
            { text: '01-别听人给你瞎聊芯片与市场之间的关系', link: '/live/公众号/01-别听人给你瞎聊芯片与市场之间的关系' },
            { text: '02-田丰死的一点都不冤', link: '/live/公众号/02-田丰死的一点都不冤' },
            { text: '03-润出去不是问题，问题是润哪儿去？', link: '/live/公众号/03-润出去不是问题，问题是润哪儿去' },
            { text: '04-所有的礼贤下士，冲的都不是下士', link: '/live/公众号/04-所有的礼贤下士，冲的都不是下士' },
            { text: '05-与一个按摩技师聊买房', link: '/live/公众号/05-与一个按摩技师聊买房' },
            { text: '06-马斯克为什么不学韩信"以德服人"，而是乱开人？', link: '/live/公众号/06-马斯克为什么不学韩信"以德服人"，而是乱开人？' },
            { text: '07-阳光沙滩比基尼,你会懂.地摊啤酒流眼泪,你也会懂', link: '/live/公众号/07-阳光沙滩比基尼,你会懂.地摊啤酒流眼泪,你也会懂' },
            { text: '08-有人说，石家庄唯一美中不足的就是我在石家庄', link: '/live/公众号/08-有人说，石家庄唯一美中不足的就是我在石家庄' },
            { text: '09-石家庄与二十多年前黄宏的小品', link: '/live/公众号/09-石家庄与二十多年前黄宏的小品' },
            { text: '10-我为什么没有跟风骂张兰？', link: '/live/公众号/10-我为什么没有跟风骂张兰？' },
            { text: '11-为什么无论你怎么说，孩子都不上进？', link: '/live/公众号/11.为什么无论你怎么说，孩子都不上进？' },
            { text: '12-为什么说"不要和烂人纠缠"？', link: '/live/公众号/12.为什么说"不要和烂人纠缠"？' },
            { text: '13-为什么有钱人的孩子还那么拼？', link: '/live/公众号/13.为什么有钱人的孩子还那么拼？' },
            { text: '14-你可以不成功，但是一定要成长', link: '/live/公众号/14.你可以不成功，但是一定要成长' },
            { text: '15-为什么大多数人都讨厌相亲？', link: '/live/公众号/15.为什么大多数人都讨厌相亲？' },
            { text: '16-如何委婉地拒绝别人？', link: '/live/公众号/16.如何委婉地拒绝别人？' },
            { text: '17-为什么说要少看新闻？', link: '/live/公众号/17.为什么说要少看新闻？' },
            { text: '18-为什么很多人上了大学反而"变笨"了？', link: '/live/公众号/18.为什么很多人上了大学反而"变笨"了？' },
            { text: '19-为什么有些人明明很努力，但就是混不好？', link: '/live/公众号/19.为什么有些人明明很努力，但就是混不好？' },
            { text: '20-为什么说见世面很重要？', link: '/live/公众号/20.为什么说见世面很重要？' },
            { text: '21-为什么说要保持好奇心？', link: '/live/公众号/21.为什么说要保持好奇心？' },
            { text: '22-为什么有些人总是觉得自己怀才不遇？', link: '/live/公众号/22.为什么有些人总是觉得自己怀才不遇？' },
            { text: '23-为什么说要学会包装自己？', link: '/live/公众号/23.为什么说要学会包装自己？' },
            { text: '24-为什么说要学会拒绝？', link: '/live/公众号/24.为什么说要学会拒绝？' },
            { text: '25-为什么说要学会示弱？', link: '/live/公众号/25.为什么说要学会示弱？' },
            { text: '26-为什么说要学会装傻？', link: '/live/公众号/26.为什么说要学会装傻？' },
            { text: '27-为什么说要远离负能量的人？', link: '/live/公众号/27.为什么说要远离负能量的人？' },
            { text: '28-为什么说要学会忍耐？', link: '/live/公众号/28.为什么说要学会忍耐？' },
            { text: '29-为什么说要学会感恩？', link: '/live/公众号/29.为什么说要学会感恩？' },
            { text: '30-为什么说要学会放下？', link: '/live/公众号/30.为什么说要学会放下？' },
            { text: '31-为什么说要学会独处？', link: '/live/公众号/31.为什么说要学会独处？' },
            { text: '32-为什么说要学会投资自己？', link: '/live/公众号/32.为什么说要学会投资自己？' },
            { text: '33-为什么说要学会理财？', link: '/live/公众号/33.为什么说要学会理财？' },
            { text: '34-为什么说要学会规划？', link: '/live/公众号/34.为什么说要学会规划？' },
            { text: '35-为什么说要学会坚持？', link: '/live/公众号/35.为什么说要学会坚持？' },
            { text: '36-喜欢把精力浪费在董小三身上，却不喜欢计算数学期望', link: '/live/公众号/36.喜欢把精力浪费在董小三身上，却不喜欢计算数学期望' },
            { text: '37-学历最大的价值在于年轻的那十年，质疑你的人会很少', link: '/live/公众号/37.学历最大的价值在于年轻的那十年，质疑你的人会很少' },
            { text: '38-敲开董事长家大门的，从来不是学历', link: '/live/公众号/38.敲开董事长家大门的，从来不是学历' }
          ]
        },
        {
          text: '🌍 英语学习',
          collapsed: false,
          items: [
            { text: '单词', link: '/live/keyword' }
          ]
        }
      ],

      // 新概念英语侧边栏
      '/xgn/': [
        {
          text: '📚 新概念英语',
          collapsed: false,
          items: [
            { text: '📋 新概念英语概述', link: '/xgn/' }
          ]
        },
        {
          text: '📖 第一册课程',
          collapsed: false,
          items: [
            { text: 'Lesson 1 Excuse me!', link: '/xgn/1/01' },
            { text: 'Lesson 3 Sorry, sir.', link: '/xgn/1/03' },
            { text: 'Lesson 5 Nice to meet you', link: '/xgn/1/05' },
            { text: 'Lesson 7 Are you a teacher?', link: '/xgn/1/07' },
            { text: 'Lesson 9 How are you today?', link: '/xgn/1/09' },
            { text: 'Lesson 11 Is this your shirt?', link: '/xgn/1/11' },
            { text: 'Lesson 13 A new dress', link: '/xgn/1/13' },
            { text: 'Lesson 15 Your passports, please.', link: '/xgn/1/15' },
            { text: 'Lesson 17 How do you do?', link: '/xgn/1/17' },
            { text: 'Lesson 19 Tired and thirsty', link: '/xgn/1/19' },
            { text: 'Lesson 21 Which book?', link: '/xgn/1/21' },
            { text: 'Lesson 23 Which glasses?', link: '/xgn/1/23' },
            { text: 'Lesson 25 Mrs. Smiths Kitchen', link: '/xgn/1/25' },
            { text: 'Lesson 27 Mrs. Smiths living room', link: '/xgn/1/27' },
            { text: 'Lesson 29 Come in, Amy.', link: '/xgn/1/29' },
            { text: 'Lesson 31 Wheres Sally?', link: '/xgn/1/31' },
            { text: 'Lesson 33 A fine day', link: '/xgn/1/33' },
            { text: 'Lesson 35 Our village', link: '/xgn/1/35' },
            { text: 'Lesson 37 Making a bookcase', link: '/xgn/1/37' },
            { text: 'Lesson 39 Dont drop it!', link: '/xgn/1/39' },
            { text: 'Lesson 41 Pennys bag', link: '/xgn/1/41' },
            { text: 'Lesson 43 Hurry up!', link: '/xgn/1/43' },
            { text: 'Lesson 45 The bosss letter', link: '/xgn/1/45' },
            { text: 'Lesson 47 A cup of coffee', link: '/xgn/1/47' },
            { text: 'Lesson 49 At the butchers', link: '/xgn/1/49' },
            { text: 'Lesson 51 A pleasant climate', link: '/xgn/1/51' },
            { text: 'Lesson 53 An interesting climate', link: '/xgn/1/53' },
            { text: 'Lesson 55 The Sawyer family', link: '/xgn/1/55' },
            { text: 'Lesson 57 An unusual day', link: '/xgn/1/57' },
            { text: 'Lesson 59 Is that all?', link: '/xgn/1/59' },
            { text: 'Lesson 61 A bad cold', link: '/xgn/1/61' },
            { text: 'Lesson 63 Thank you, doctor.', link: '/xgn/1/63' },
            { text: 'Lesson 65 Not a baby', link: '/xgn/1/65' },
            { text: 'Lesson 67 The weekend', link: '/xgn/1/67' },
            { text: 'Lesson 69 The car race', link: '/xgn/1/69' },
            { text: 'Lesson 71 Hes awful!', link: '/xgn/1/71' },
            { text: 'Lesson 73 The way to King Street', link: '/xgn/1/73' },
            { text: 'Lesson 75 Uncomfortable shoes', link: '/xgn/1/75' },
            { text: 'Lesson 77 Terrible toothache', link: '/xgn/1/77' },
            { text: 'Lesson 79 Carols shopping list', link: '/xgn/1/79' },
            { text: 'Lesson 81 Roast beef and potatoes', link: '/xgn/1/81' },
            { text: 'Lesson 83 Going on holiday', link: '/xgn/1/83' },
            { text: 'Lesson 85 Paris in the spring', link: '/xgn/1/85' },
            { text: 'Lesson 87 A car crash', link: '/xgn/1/87' },
            { text: 'Lesson 89 For sale', link: '/xgn/1/89' },
            { text: 'Lesson 91 Poor Ian!', link: '/xgn/1/91' },
            { text: 'Lesson 93 Our new neighbour', link: '/xgn/1/93' },
            { text: 'Lesson 95 Tickets, please.', link: '/xgn/1/95' },
            { text: 'Lesson 97 A small blue case', link: '/xgn/1/97' },
            { text: 'Lesson 99 Ow!', link: '/xgn/1/99' },
            { text: 'Lesson 101 A card from Jimmy', link: '/xgn/1/101' },
            { text: 'Lesson 103 The French test', link: '/xgn/1/103' },
            { text: 'Lesson 105 Full of mistakes', link: '/xgn/1/105' },
            { text: 'Lesson 107 Its too small.', link: '/xgn/1/107' },
            { text: 'Lesson 109 A good idea', link: '/xgn/1/109' },
            { text: 'Lesson 111 The most expensive model', link: '/xgn/1/111' },
            { text: 'Lesson 113 Small change', link: '/xgn/1/113' },
            { text: 'Lesson 115 Knock, knock!', link: '/xgn/1/115' },
            { text: 'Lesson 117 Tommys breakfast', link: '/xgn/1/117' },
            { text: 'Lesson 119 A true story', link: '/xgn/1/119' },
            { text: 'Lesson 121 The man in a hat', link: '/xgn/1/121' },
            { text: 'Lesson 123 A trip to Australia', link: '/xgn/1/123' },
            { text: 'Lesson 125 Tea for two', link: '/xgn/1/125' },
            { text: 'Lesson 127 A famous actress', link: '/xgn/1/127' },
            { text: 'Lesson 129 Seventy miles an hour', link: '/xgn/1/129' },
            { text: 'Lesson 131 Dont be so sure!', link: '/xgn/1/131' },
            { text: 'Lesson 133 Sensational news!', link: '/xgn/1/133' },
            { text: 'Lesson 135 The latest report', link: '/xgn/1/135' },
            { text: 'Lesson 137 A pleasant dream', link: '/xgn/1/137' },
            { text: 'Lesson 139 Is that you, John?', link: '/xgn/1/139' },
            { text: 'Lesson 141 Sallys first train ride', link: '/xgn/1/141' },
            { text: 'Lesson 143 A walk through the woods', link: '/xgn/1/143' }
          ]
        }
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024'
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间 - 修复配置
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Shanghai'
      }
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 外部链接图标
    externalLinkIcon: true
  },

  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  // 构建配置 - 添加 Git 相关配置
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false
    }
  },

  // 添加 transformPageData 来确保时间戳正确处理
  transformPageData(pageData) {
    const canonicalUrl = `https://your-domain.com/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])

    // 确保 lastUpdated 正确设置
    if (pageData.lastUpdated) {
      pageData.lastUpdated = new Date(pageData.lastUpdated).getTime()
    }

    return pageData
  }
})
