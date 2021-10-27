# iOS权限
在我们使用APP中，如果需要定位、相机、相册、蓝牙等权限时，需要首先在 info.plist 文件中添加对应的请求权限，在使用相关功能时，会先弹出对应的提示。

## 添加请求权限
在使用相关功能时，首先在 info.plist 文件中添加对应的请求权限。
```xml
麦克风权限：Privacy - Microphone Usage Description  是否允许此App使用你的麦克风？
相机权限： Privacy - Camera Usage Description  是否允许此App使用你的相机？
相册权限： Privacy - Photo Library Usage Description  是否允许此App访问你的媒体资料库？
保存图片到相册 ： Privacy - Photo Library Additions Usage Description
通讯录权限： Privacy - Contacts Usage Description  是否允许此App访问你的通讯录？
蓝牙权限：Privacy - Bluetooth Peripheral Usage Description  是否许允此App使用蓝牙？
语音转文字权限：Privacy - Speech Recognition Usage Description  是否允许此App使用语音识别？
APP使用期间获取定位信息(仅限应用在前台)：Privacy - Location When In Use Usage Description
定位权限: Privacy - Location Always Usage Description
允许一直获取定位信息(包括前台和后台): Privacy - Location Always and When In Use Usage Description
日历权限：Privacy - Calendars Usage Description
媒体库权限：Privacy - Media Library Usage Description
健康分享权限：Privacy - Health Share Usage Description
健康更新权限：Privacy - Health Update Usage Description
运动使用权限：Privacy - Motion Usage Description
音乐权限：Privacy - Music Usage Description
提醒使用权限：Privacy - Reminders Usage Description
Siri使用权限：Privacy - Siri Usage Description
电视供应商使用权限：Privacy - TV Provider Usage Description
视频用户账号使用权限：Privacy - Video Subscriber Account Usage Description
面部ID权限 ：Privacy - Face ID Usage Description
使用NFC功能： Privacy - NFC Scan Usage Description
```

## 定位权限

## 相机权限

## 通讯录权限
通讯录权限首先要导入`#import <Contacts/Contacts.h>`库，首先需要请求对应的通讯录权限。

```objc
typedef NS_ENUM(NSInteger, CNAuthorizationStatus)
{
    CNAuthorizationStatusNotDetermined = 0, // 用户没有选择权限
    CNAuthorizationStatusRestricted,    // 无法访问通讯录权限
    CNAuthorizationStatusDenied,    // 明确拒绝
    CNAuthorizationStatusAuthorized     //  授权允许
}
```
如果使用`CNContactFetchRequest`可以请求对应的权限，回调是在异步线程，如果需要更新UI，需要在主线程

请求权限
```objc
- (void)mm_requestContacts{
    
    CNAuthorizationStatus status = [CNContactStore authorizationStatusForEntityType:CNEntityTypeContacts];
    if (status == CNAuthorizationStatusNotDetermined) {
        CNContactStore *store = [[CNContactStore alloc] init];
        [store requestAccessForEntityType:CNEntityTypeContacts completionHandler:^(BOOL granted, NSError*  _Nullable error) {
            if (error) {
                NSLog(@"授权失败");
            }else {
                NSLog(@"成功授权");
                [self openContact];
            }
        }];
    }else if(status == CNAuthorizationStatusRestricted)
    {
        NSLog(@"用户拒绝");
        [self showAlertViewAboutNotAuthorAccessContact];
    }else if (status == CNAuthorizationStatusDenied)
    {
        NSLog(@"用户拒绝");
        [self showAlertViewAboutNotAuthorAccessContact];
    }else if (status == CNAuthorizationStatusAuthorized)//已经授权
    {
        //有通讯录权限-- 进行下一步操作
        [self openContact];
    }
    
}
```
用户允许权限之后，我们可以`CNContactStore`和`CNContactFetchRequest`获取通讯录信息，**注意回调这里还是子线程，如果需要更新UI或者其他操作，先回到主线程。**
```objc
//有通讯录权限-- 进行下一步操作
- (void)openContact{
    [UserModel standardInstall].isAuthContactsSuccess = YES;

    // 获取指定的字段,并不是要获取所有字段，需要指定具体的字段
    NSArray *keysToFetch = @[CNContactGivenNameKey, CNContactFamilyNameKey, CNContactPhoneNumbersKey];
    CNContactFetchRequest *fetchRequest = [[CNContactFetchRequest alloc] initWithKeysToFetch:keysToFetch];
    CNContactStore *contactStore = [[CNContactStore alloc] init];
    
    // 如果成功获取返回YES
    NSError *error;
    BOOL isSuccess =  [contactStore enumerateContactsWithFetchRequest:fetchRequest error:&error usingBlock:^(CNContact * _Nonnull contact, BOOL * _Nonnull stop) {
        
        NSString *givenName = contact.givenName;
        NSString *familyName = contact.familyName;
          NSLog(@"givenName=%@, familyName=%@", givenName, familyName);
        //拼接姓名
        NSString *nameStr = [NSString stringWithFormat:@"%@%@",contact.familyName,contact.givenName];
        
        NSArray *phoneNumbers = contact.phoneNumbers;
        
        for (CNLabeledValue *labelValue in phoneNumbers) {
            //遍历一个人名下的多个电话号码
            NSString *label = labelValue.label;
            CNPhoneNumber *phoneNumber = labelValue.value;
            
            NSString * string = phoneNumber.stringValue ;
            
            //去掉电话中的特殊字符
            string = [string stringByReplacingOccurrencesOfString:@"+86" withString:@""];
            string = [string stringByReplacingOccurrencesOfString:@"-" withString:@""];
            string = [string stringByReplacingOccurrencesOfString:@"(" withString:@""];
            string = [string stringByReplacingOccurrencesOfString:@")" withString:@""];
            string = [string stringByReplacingOccurrencesOfString:@" " withString:@""];
            string = [string stringByReplacingOccurrencesOfString:@" " withString:@""];
            
            NSLog(@"姓名=%@, 电话号码是=%@", nameStr, string);
            NSDictionary *dict = @{@"name":nameStr,@"phone":string};
            [[UserModel standardInstall].contactsAry addObject:dict];
        }
        
        
        //    *stop = YES; // 停止循环，相当于break；
        
    }];
    
    if (isSuccess || error) { // 注意： 这里还是子线程
        [[NSNotificationCenter defaultCenter] postNotificationName:KStartContactNotificationName object:nil];
    }

}
```