# String
关于Swift中String的各种用法，拼接、查找、删除、转字典、转数组、转URL、文件后缀。文件扩展名等等。

1. 删除前后多余的空格
```swift
let str1 = "   欢迎访问 hangge.com   " //原始字符串
let str2 = str1.trimmingCharacters(in: .whitespaces) //除去前后空格
print("新字符串：\(str2)") //打印结果 欢迎访问 hangge.com
```

2. 删除前后指定的字符,下面代码将 String 字符串前后的尖括号给去除掉
```swift
let str1 = "<<hangge.com>>" //原始字符串
let characterSet = CharacterSet(charactersIn: "<>") //删除前后<>
let str2 = str1.trimmingCharacters(in: characterSet)
print("新字符串：\(str2)")  //打印结果 hangge.com
```

`CharacterSet` 里各个枚举类型的含义如下：
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

## 字符串扩展

字典和字符串的转换
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

// MARK: 字符串转字典
extension String {
    
    func toDictionary() -> [String : Any] {
        
        var result = [String : Any]()
        guard !self.isEmpty else { return result }
        
        guard let dataSelf = self.data(using: .utf8) else {
            return result
        }
        
        if let dic = try? JSONSerialization.jsonObject(with: dataSelf,
                           options: .mutableContainers) as? [String : Any] {
            result = dic
        }
        return result
    }
}
```

## URL字符串的编码与解码
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

## 字符串获取文件路径
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

## 推荐网址
* [Swift - 去除字符串前后的空白（trim方法）](https://www.hangge.com/blog/cache/detail_1649.html)
* [Swift - 实现URL字符串的编码与解码（urlEncoded、urlDecoded）](https://www.hangge.com/blog/cache/detail_1583.html)