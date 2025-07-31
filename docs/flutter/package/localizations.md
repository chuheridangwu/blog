# 国际化
Flutter 给我们提供的 Widget 默认情况下就是支持国际化，但是在没有进行特别的设置之前，它们无论在什么环境都是以英文的方式显示的。如果想要添加其他语言，你的应用必须指定额外的 MaterialApp 属性并且添加一个单独的 package，叫做 `flutter_localizations`。

## pubspec中添加依赖
想要使用 `flutter_localizations` 的话，我们需要在 `pubspec.yaml` 文件中添加它作为依赖：
```dart
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```

## 设置MaterialApp

* 在 `localizationsDelegates` 中指定哪些 Widget 需要进行国际化
    * 用于生产本地化值集合的工厂
    * 我们这里指定了Material、Widgets、Cupertino都使用国际化
* `supportedLocales` 指定要支持哪些国际化
    * 我们这里指定中文和英文（也可以指定国家编码）
```dart
MaterialApp(
  locale: Locale("zh"), // 指定语言环境，默认是英语
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate, // 指定本地化的字符串和一些其他的值
    GlobalCupertinoLocalizations.delegate, // 对应的Cupertino风格
    GlobalWidgetsLocalizations.delegate // 指定默认的文本排列方向, 由左到右或由右到左
  ],
  supportedLocales: [
    Locale("en"),
    Locale("zh")
  ],
)
```
注意：如果要指定语言代码、文字代码和国家代码，可以进行如下指定方式：
```dart
// Full Chinese support for CN, TW, and HK
supportedLocales: [
  const Locale.fromSubtags(languageCode: 'zh'), // generic Chinese 'zh'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hans'), // generic simplified Chinese 'zh_Hans'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant'), // generic traditional Chinese 'zh_Hant'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hans', countryCode: 'CN'), // 'zh_Hans_CN'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant', countryCode: 'TW'), // 'zh_Hant_TW'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant', countryCode: 'HK'), // 'zh_Hant_HK'
],
```
如果想获取语言环境可以使用`Locale myLocale = Localizations.localeOf(context);`

### 设置iOS的多语言环境
对于iOS来说，实现国际化需要修改`info.plist`文件：
* 选择 `Information Property List` 项；
* 从 `Editor` 菜单中选择 `Add Item`，然后从弹出菜单中选择 `Localizations`；
* 为array添加一项选择 `Add Item`，选择 `Chinese`；

## 自定义控件本地化
本地化控件需要两步：
1. 创建本地化的类，提供本地化的文本。
2. 继承自 `LocalizationsDelegate` 类，实现Locale改变时加载新的Locale资源。

### 创建本地化类 MMLocalizations
```dart
import 'package:flutter/material.dart';

class MMLocalizations {
  final Locale locale;
  MMLocalizations(this.locale); 

  // 使用静态方法
  static MMLocalizations of(BuildContext context) {
    return Localizations.of(context, MMLocalizations);
  }

  static Map<String, dynamic> _localizedValues = {
    "en": {
      "title": "home",
      "greet": "hello~"
    },
    "zh": {
      "title": "首页",
      "greet": "你好~"
    }
  };

  String get title {
    return _localizedValues[locale.languageCode]["title"];
  }

  String get greet {
    return _localizedValues[locale.languageCode]["greet"];
  }

}
```
### 实现Delegate 类
Delegate的作用就是当 `Locale` 发生改变时，调用对应的 `load` 方法，重新加载新的 `Locale` 资源；
```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'MMLocalizations.dart';

class MMLocalizationsDelegate extends LocalizationsDelegate<MMLocalizations> {
  
  // 用于当前环境的Locale，是否在我们支持的语言范围
  @override
  bool isSupported(Locale locale) {
    return ["en", "zh"].contains(locale.languageCode);
  }

  // 当Localizations Widget重新build时，是否调用load方法重新加载Locale资源
  @override
  bool shouldReload(LocalizationsDelegate<MMLocalizations> old) {
    return false;
  }

  // 当Locale发生改变时（语言环境），加载对应的MMLocalizations资源,这个方法返回的是一个Future，因为有可能是异步加载的,我们是直接定义的一个Map，因此可以直接返回一个同步的Future（SynchronousFuture）
  @override
  Future<MMLocalizations> load(Locale locale) {
    return SynchronousFuture(MMLocalizations(locale));
  }

  static MMLocalizationsDelegate delegate = MMLocalizationsDelegate();
}
```
自定义的 Delegate 可以像 Flutter Widget 中的国际化方式一样对它们进行初始化，我们将其传入`localizationsDelegates`中，通过调用`MMLocalizations`的静态方法进行取值。
```dart
MaterialApp(
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate, // 指定本地化的字符串和一些其他的值
    GlobalCupertinoLocalizations.delegate, // 对应的Cupertino风格
    GlobalWidgetsLocalizations.delegate ,// 指定默认的文本排列方向, 由左到右或由右到左
    MMLocalizationsDelegate() // 自定义的代理
  ],
}

// 使用时
Column(
    children: [
        Text(MMLocalizations.of(context).greet),
        Text(MMLocalizations.of(context).title),
    ],
)
```
### 异步加载本地化数据
如果是异步加载本地化数据，需要修改 加载本地化语言的方法 和 Delegate 中的 load方法:
```dart
  static Map<String, Map<String, String>> _localizedValues = {};

  Future<bool> loadJson() async {
    // 1.加载json文件
    String jsonString = await rootBundle.loadString("assets/json/i18n.json");
    
    // 2.转成map类型
    final Map<String, dynamic> map = json.decode(jsonString);
    
    // 3.注意：这里是将Map<String, dynamic>转成Map<String, Map<String, String>>类型
    _localizedValues = map.map((key, value) {
      return MapEntry(key, value.cast<String, String>());
    });
    return true;
  }
```
Delegate 中加载load方法
```dart
  @override
  Future<MMLocalizations> load(Locale locale) async {
    final localization = MMLocalizations(locale);
    await localization.loadJson();
    return localization;
  }
```

## Intl包
上面的方式虽然支持多语言，但是很繁琐，不利于翻译和平时的项目使用，我们有更简单方法，那就是 arb 文件，其本质就是一个json文件，但是可以根据该文件转成对应的语言环境。[Intl的官方说明](https://flutter.dev/docs/development/accessibility-and-localization/internationalization#appendix-using-the-dart-intl-tools),我们可以通过安装插件帮我们简化生成文件的步骤。

1. 项目的 yaml 文件中添加intl插件
```dart
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.17.0
```
2. 开发工具安装插件。使用 VSCode 或者 Androidstudio 安装`Flutter Intl`插件。
3. Intl初始化，VSCode 按`shift + command + p`，搜索 `Flutter Intl: Initialize`进行初始化,lib目录下多了`generated`、`I10n`文件
4. 使用Intl，在`localizationsDelegates`中添加配置生成的class，名字是S。`supportedLocales` 使用` S.delegate.supportedLocales`
```dart
localizationsDelegates: [
  GlobalMaterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
  GlobalCupertinoLocalizations.delegate,
  HYLocalizationsDelegate.delegate,
  S.delegate
],
supportedLocales: S.delegate.supportedLocales,
```
5. 编写arb文件，在`intl_en.arb`文件中编写对应的文本，如果要添加中文，可以直接复制`intl_en.arb`，把文件名称改为`intl_zh.arb`就可以了
```dart
{
  "title": "首页",
  "greet": "您好~",
  "sayHello": "hello {name}"
}
```
6. 使用arb文件
```dart
children: [
    Text(S.of(context).sayHello("李二狗")),
    Text(S.of(context).title),
    Text(S.of(context).greet)
],
```