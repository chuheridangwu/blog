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