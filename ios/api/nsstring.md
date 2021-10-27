# NSString
当前文档主要记录对字符串的一些处理，经常不写的时候就会忘记都有哪些方法，查找太浪费时间，这里统一📱做一下记录。

## 字符串与其他格式进行转换

* **ASCII码 转 NSString**

```objc
//ASCII码 转 NSString
unichar ch =65;
NSString *str =[NSString stringWithUTF8String:(char *)&ch]; //-->A

// ASCII to NSString
int asciiCode = 65;
NSString *string = [NSString stringWithFormat:@"%c", asciiCode]; //-->A

//2.NSString转ASCII码
NSString *string = @"]";
int asciiCode = [string characterAtIndex:0]; //-->93
```


*  **NSString 互转 char\***

```objc
//NSString转char
NSString *t = @"字符串";
const char *t2 =[t UTF8String];

NSString * cocoaString = @"My NSString";
const char * myCstring = [cocoaString cStringUsingEncoding:NSUTF8StringEncoding];

NSString *t = @"字符串1";
char mychar[100];
strcpy(mychar,(char *)[t UTF8String]);

//Char转NSString
const char * cString = "Hello";

NSString * cocoaString = [[NSString alloc] initWithCString:cString encoding:NSUTF8StringEncoding];
NSString *TempString =[NSString stringWithFormat:@"%s",cString];
NSString *str=[NSString stringWithCString:cString encoding:NSUTF8StringEncoding];
```

* **NSData 互转 char\***

```objc
//Char*转NSData
//方法一
char * postData = "TEST";
NSData *data = [NSData dataWithBytes:postData length:strlen(postData)];
//方法二 先转NSString再转data

//NSData转Char*
[data bytes];
NSString 互转 NSData

//NSString转NSData
NSData *data =[str dataUsingEncoding:NSUTF8StringEncoding];

//NSData转NSString
NSString * str  =[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
```

* **十六进制转十进制**

```objc
//    十六进制格式字符串(带不带0x都可)转成数字
unsigned int outVal;
NSScanner* scanner = [NSScanner scannerWithString:@"0x83"];
[scanner scanHexInt:&outVal];
NSLog(@"%d", outVal);
//-->131
```

* **十六进制转NSString**

```objc
NSString * str = @"68656C6C6F";
NSMutableString * newString = [[NSMutableString alloc] init] ;
int i = 0;
while (i < [str length])
{
    NSString * hexChar = [str substringWithRange: NSMakeRange(i, 2)];
    int value = 0;
    sscanf([hexChar cStringUsingEncoding:NSASCIIStringEncoding], "%x", &value);
    [newString appendFormat:@"%c", (char)value];
    i+=2;
}
NSLog(@"new str :%@",newString); 
//-->new str :hello
```

* **十六进制转十进制**

```objc
NSString *hexStr = @"0xff";
UInt64 mac1 =  strtoul([hexStr UTF8String], 0, 16);
NSLog(@"%llu",mac1);
NSLog(@"十六进制转十进制 --->%lu",strtoul(hexStr.UTF8String, 0, 16));
如果有溢出的话，使用scanner：

NSString *hexStr1 = @"0x00000000027743330000000000714C9C";
unsigned long long result = 0;
NSScanner *scanner = [NSScanner scannerWithString:hexStr1];
[scanner scanHexLongLong:&result];
NSLog(@"%llu",result);
```
* **十进制转十六进制**

```objc
+(NSString *)ToHex:(long long int)tmpid
{
    NSString *nLetterValue;
    NSString *str =@"";
    long long int ttmpig;
    for (int i = 0; i<9; i++) {
        ttmpig=tmpid%16;
        tmpid=tmpid/16;
        switch (ttmpig)
        {
            case 10:
                nLetterValue =@"A";break;
            case 11:
                nLetterValue =@"B";break;
            case 12:
                nLetterValue =@"C";break;
            case 13:
                nLetterValue =@"D";break;
            case 14:
                nLetterValue =@"E";break;
            case 15:
                nLetterValue =@"F";break;
            default:nLetterValue=[[NSString alloc]initWithFormat:@"%lli",ttmpig];
                
        }
        str = [nLetterValue stringByAppendingString:str];
        if (tmpid == 0) {
            break;
        }     
    }
    return str;
}

```
## 文件路径处理
NSString 类对文件路径的处理方式有很多中,获取文件名、获取文件路径、获取文件后缀、路径拼接 等等
```objc
NSString *path = @"/Users/Demo/Library/Application Support/iPhoneSimulator/books/2013_50.zip";

NSLog(@"获取完整的文件名(含文件后缀)= %@",[path lastPathComponent]); //获取完整的文件名(带文件后缀) 2013_50.zip
NSLog(@"获取完整的路径(不含文件名) = %@",[path stringByDeletingLastPathComponent]); // 从路径中获得完整的路径(不含文件名)  /Users/Demo/Library/Application Support/iPhoneSimulator/books
NSLog(@"获取文件后缀名(不含'.')=%@",[path pathExtension]);  //获取文件后缀名   zip
NSLog(@"获取文件名=%@",[[path lastPathComponent] stringByDeletingPathExtension]); //获取文件名字 2013_50

NSLog(@"获取文件路径(不含文件后缀)=%@",[path stringByDeletingPathExtension]);//路径”标准化“ /Users/Demo/Library/Application Support/iPhoneSimulator/books/2013_50
NSLog(@"5=%@",[path stringByAbbreviatingWithTildeInPath]);//通过把波浪号替换为当前用户的主目录，来把2013_50.zip 转换为扩展的绝对路径
NSLog(@"6=%@",[path stringByExpandingTildeInPath]);
NSLog(@"7=%@",[path stringByStandardizingPath]); //返回标准格式路径
NSLog(@"8=%@",[path stringByResolvingSymlinksInPath]);
```