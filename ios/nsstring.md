# NSString

## 获取文件路径
```objc
NSString *path = @"/Users/Demo/Library/Application Support/iPhoneSimulator/books/2013_50.zip";

NSLog(@"获取完整的文件名(带文件后缀)= %@",[path lastPathComponent]); //获取完整的文件名(带文件后缀) 2013_50.zip
NSLog(@"获取完整的路径(不带文件名) = %@",[path stringByDeletingLastPathComponent]); // 从路径中获得完整的路径(不带文件名)  /Users/Demo/Library/Application Support/iPhoneSimulator/books
NSLog(@"获取文件后缀名=%@",[path pathExtension]);  //获取文件后缀名 不带'.'  zip
NSLog(@"获取文件名=%@",[[path lastPathComponent] stringByDeletingPathExtension]); //获取文件名字 2013_50

NSLog(@"获取文件路径(不带文件后缀)=%@",[path stringByDeletingPathExtension]);//路径”标准化“ /Users/Demo/Library/Application Support/iPhoneSimulator/books/2013_50
NSLog(@"5=%@",[path stringByAbbreviatingWithTildeInPath]);//通过把波浪号替换为当前用户的主目录，来把2013_50.zip 转换为扩展的绝对路径
NSLog(@"6=%@",[path stringByExpandingTildeInPath]);
NSLog(@"7=%@",[path stringByStandardizingPath]); //返回标准格式路径
NSLog(@"8=%@",[path stringByResolvingSymlinksInPath]);
```