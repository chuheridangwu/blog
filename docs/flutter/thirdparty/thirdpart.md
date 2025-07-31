# 第三方库的一些用法

## 解析HTML的库
在Java中使用`Jsoup`解析HTML数据，dart中使用html第三方库进行解析，方法都大差不差。首先在`yaml`文件中中添加`html: ^0.15.0`,html库和material库中有类名相同，同时引用需要在material库后增加后缀`import 'package:flutter/material.dart' as prefix;`，一些常用的方法:
```dart
// 导入html库，show表示仅导入parse
import 'package:html/parser.dart' show parse;

// 解析HTML数据，拿妹子图举例
  void testhtml() async {
    // 发起请求获取首页的html数据
    Response res = await Dio().get("https://www.mzitu.com/best");
    // 将数据解析成Document
    Document doc = parse(res.data);
    // 获取到id为pins的对象，从pins中获取li标签，返回数组
    List datas = doc.getElementById("pins").getElementsByTagName("li");
      for (var item in datas) {
        // 输出html标签内容  
        print(item.outerHtml);
        // 根据名字获取 a 标签，返回数组
        print(item.getElementsByTagName("a")[0]);
        // 根据名字获取 img 标签，从img标签中获取具体的描述
        print(item.getElementsByTagName("img")[0].attributes["data-original"]);
      }
  }
```