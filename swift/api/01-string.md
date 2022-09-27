# String
Swift的字符串类型String，跟OC的NSString，在API设计上还是有较大差异,String遵守`BidirectionalCollection` 协议 和`RangeReplaceableCollection`协议，这两个协议包含了增删改查。String、Array 都遵守了这个协议.

* `BidirectionalCollection` 协议包含的`pstartIndex` 、 `endIndex` 属性、`index` 方法
* `RangeReplaceableCollection` 协议包含`append、insert、remove` 方法

## 1.基础用法
* 字符串拼接
```swift
var str: String = "1"
str.append("_2") // 拼接  1_2
str = str + "_3" // 重载运算符 +   1_2_3
str += "_4" // 重载运算符 +=  1_2_3_4
str = "\(str)_5" // \()插值    1_2_3_4_5
```

* 多语言带参数变量：
```swift
// Localizable.strings 文件中
"welcome enterRoom" = "欢迎 %1$@ 进入直播间";
textLabel.text = String(format: NSLocalizedString("welcome enterRoom", comment: "欢迎xxx进入直播间"), showText)
```

* String的插入和删除
```swift
// 字符串插入
    var str = "1_2"
    str.insert("_", at: str.endIndex) // 1_2_
    str.insert(contentsOf: "3_4", at: str.endIndex) // 1_2_3_4
    str.insert(contentsOf: "666", at: str.index(after: str.startIndex)) // 1666_2_3_4
    str.insert(contentsOf: "888", at: str.index(before: str.endIndex)) // 1666_2_3_8884
    str.insert(contentsOf: "hello", at: str.index(str.startIndex, offsetBy: 4)) // 1666hello_2_3_8884

    // 字符串删除
    str.remove(at: str.firstIndex(of: "1")!) // 666hello_2_3_8884
    str.removeAll { $0 == "6" } // hello_2_3_8884
    var range = str.index(str.endIndex, offsetBy: -4)..<str.index(before: str.endIndex)
    str.removeSubrange(range) // hello_2_3_4
```

* Substring 字符串截取
`String`可以通过`下标、 prefix、 suffix`等截取子串，子串类型不是`String`，而是`Substring`
```swift
var str = "1_2_3_4_5"
var substr1 = str.prefix(3) // 1_2
var substr2 = str.suffix(3) // 4_5
var range = str.startIndex..<str.index(str.startIndex, offsetBy: 3)
var substr3 = str[range] // 1_2
print(substr3.base) // 最初的String，1_2_3_4_5
var str2 = String(substr3) // Substring -> String
```

> Substring和它的base，共享字符串数据,Substring发生修改 或者 转为String时，会分配新的内存存储字符串数据

* 多行String
```swift
let str = """
1
    "2"
3
    '4'
"""
```

## 2. String 与 Character
* Character
```swift
var str = "123456"
for c in str { // c是Character类型
    print(c)
}
var c = str[str.startIndex] // c是Character类型
```

* 删除前后多余的空格
```swift
let str1 = "   欢迎访问 hangge.com   " //原始字符串
let str2 = str1.trimmingCharacters(in: .whitespaces) //除去前后空格
print("新字符串：\(str2)") //打印结果 欢迎访问 hangge.com
```

* 删除前后指定的字符,下面代码将 String 字符串前后的尖括号给去除掉
```swift
let str1 = "<<hangge.com>>" //原始字符串
let characterSet = CharacterSet(charactersIn: "<>") //删除前后<>
let str2 = str1.trimmingCharacters(in: characterSet) //hangge.com
```

* `CharacterSet` 里各个枚举类型的含义
```markdown
    * controlCharacters：控制符
    * whitespaces：空格
    * newlines：换行符
    * whitespacesAndNewlines：空格换行
    * decimalDigits：小数
    * letters：文字
    * lowercaseLetters：小写字母
    * uppercaseLetters：大写字母
    * nonBaseCharacters：非基础
    * alphanumerics：字母数字
    * decomposables：可分解
    * illegalCharacters：非法
    * punctuationCharacters：标点
    * capitalizedLetters：大写
    * symbols：符号
```

## 3. URL字符串的编码与解码
我们的应用中常常需要发起 `HTTP` 网络请求，如果拼接的 `URL` 地址中包含有中文、空格、特殊符号时，我们就要对其转义。否则就会无法正确访问。
```swift
extension String {
     
    //将原始的url编码为合法的url
    func urlEncoded() -> String {
        let encodeUrlString = self.addingPercentEncoding(withAllowedCharacters:
            .urlQueryAllowed)
        return encodeUrlString ?? ""
    }
     
    //将编码后的url转换回原始的url
    func urlDecoded() -> String {
        return self.removingPercentEncoding ?? ""
    }
}

// 使用样例
let urlStr = "http://hanggge.com?name=航歌&key=!*'();:@&=+$,/?%#[]"
print("转义后的url：\(urlStr.urlEncoded())")
print("还原后的url：\(urlStr.urlEncoded().urlDecoded())")
```

## 4. 字符串获取文件路径
字符串对路径和文件名称的处理
```swift
let path = "/Users/xxx/2013_50.zip"
let url = URL.init(fileURLWithPath: path) //将字符串转成url，才好处理路径

print("文件路径(不包含文件名) =>" + url.deletingLastPathComponent().path) //Users/xxx
print("文件路径(包含文件名) =>" + url.deletingPathExtension().path) //Users/xxx/2013_50
print("文件扩展名 =>" + url.pathExtension) //zip
print("文件名称(不包含扩展名) =>" + url.deletingPathExtension().lastPathComponent) //2013_50
print("文件名带扩展名 =>" + url.lastPathComponent) //2013_50.zip
```

## 5. String 与 NSString
String 与 NSString 之间可以随时随地桥接转换,如果你觉得String的API过于复杂难用，可以考虑将String转为NSString。
```swift
var str1: String = "jack"
var str2: NSString = "rose"
var str3 = str1 as NSString
var str4 = str2 as String
var str5 = str3.substring(with: NSRange(location: 0, length: 2))
print(str5) // ja
```
比较字符串内容是否等价,`String使用 == 运算符`,`NSString使用isEqual方法`，也可以使用 `== 运算符`（本质还是调用了`isEqual`方法）。

## 6. 字符串扩展
* 字典和字符串的转换
```swift
// MARK: 字典转字符串
extension Dictionary {
    func toJsonString() -> String? {
        guard let data = try? JSONSerialization.data(withJSONObject: self,
                                                     options: []) else {
            return nil
        }
        guard let str = String(data: data, encoding: .utf8) else {
            return nil
        }
        return str
     }
}
// MARK:  字符串转字典
extension String {
    
    func toDictionary() -> [String : Any] {
        var result = [String : Any]()
        guard !self.isEmpty else { return result }
        guard let dataSelf = self.data(using: .utf8) else { return result}
        if let dic = try? JSONSerialization.jsonObject(with: dataSelf,
                           options: .mutableContainers) as? [String : Any] {
            result = dic
        }
        return result
    }
}
```
## 推荐网址
* [Swift - 去除字符串前后的空白（trim方法）](https://www.hangge.com/blog/cache/detail_1649.html)
* [Swift - 实现URL字符串的编码与解码（urlEncoded、urlDecoded）](https://www.hangge.com/blog/cache/detail_1583.html)