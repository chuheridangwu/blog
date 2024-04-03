# JSON解析


## Codable

Codable是一种混合类型，由Decodable和Encodable协议构成`public typealias Codable = Decodable & Encodable`

数组转成对象
``` swift
struct Person: Decodable {
    let name: String
    let age: Int
}

let jsonString = "[{\"name\":\"John\",\"age\":30},{\"name\":\"Jane\",\"age\":25}]"
let jsonData = jsonString.data(using: .utf8)!

let decoder = JSONDecoder()
do {
    let people = try decoder.decode([Person].self, from: jsonData)
    print(people)
} catch {
    print("Error decoding JSON: \(error)")
}
```
注意，Codable 解码时如果设置JSON字符串中没有的属性并且设置默认值会导致解析失败，比如
```swift
struct Person: Decodable {
    let name: String
    let age: Int
    var height: Int = 0
}
```
如果不想解析失败并且添加JSON中没有的字段，需要使用可选类型
```swift
struct Person: Decodable {
    let name: String
    let age: Int
    var height: Int?
}
```
如果想使用默认值，可以参考下面的方法
```swift
struct Person: Decodable {
    let name: String
    let age: Int
    private let height: Int?
    var resolvedHiight: Int { 
        height ?? 10
    }
}
```

## 参考文档
* [使用 Property Wrapper 为 Codable 解码设定默认值](https://onevcat.com/2020/11/codable-default/#%E6%95%B4%E7%90%86-default-%E7%B1%BB%E5%9E%8B)