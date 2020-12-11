# xcode配置
xcode常见的一些配置，平时经常遇到找不到库、找不到头文件，可能都是这些配置导致的

* ${SRCROOT}：代表的是项目根目录下
* ${PROJECT_DIR}：代表的是整个项目
* ${PROJECT_FILE_PATH}表示project的当前路径，相当于$(PROJECT_DIR)/$(PROJECT_NAME).xcodeproj
* $(PROJECT_NAME) ： 项目名字
* ${PODS_ROOT}  : 项目使用cocoapods，pod文件目录
* $(inherited)：添加目录的时候写上 “$(inherited)” 就是表示路径自己从frameworks里面读取。 默认的情况下路径配置是不被 Targets 继承的，只有当Targets的设置加入了$(inherited)时才被继承，继承来自更高一级的配置。


## 搜索路径
Framework Search Paths
附加到项目中的framework 的搜索路径。

Library Search Paths
附加到项目中的第三方Library的搜索路径。

Header Search Path
头文件的搜索路径。

User Header Search Paths
只有在Always Search User Paths为Yes时才会被搜索。


## MAC 修改hosts权限
sudo vi /etc/hosts

## ping ip + 端口
nc -vz -w 2 120.79.79.253 12009


## XIB创建TableViewCell
```oc
// 创建cell
[_tableView registerNib:[UINib nibWithNibName:@"PersonMessageCell" bundle:nil] forCellReuseIdentifier:@"PersonMessageCell"];

// 使用
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
PersonMessageCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PersonMessageCell"];
return cell;
}

// 初始化界面时，需要创建圆角等
- (void)awakeFromNib {
    [super awakeFromNib];
    _bgView.layer.cornerRadius = 5;
    _bgView.layer.masksToBounds = YES;
}
```

## 使用URLWithString方法时 无法生成url
`NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@?%@",host_url,baseurl,postURL]];`
原因是字符串中存在特殊字符，需要先对字符串进行转义，
```
NSString *urlString = [NSString stringWithFormat:@"%@?paramstr=%@",url,[self jsonData]];
urlString = [urlString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
```


### APP内切换语言


1387371333 ： 是appid
testflight测试地址：https://beta.itunes.apple.com/v1/app/1391515055
appstore下载地址：https://itunes.apple.com/app/id1387371333


### iOS优化性能和卡顿

[iOS应用千万级架构：性能优化与卡顿监控](https://www.cnblogs.com/jys509/p/13296128.html) 来自李明杰的底层原理班