# 逆向准备
在逆向学习中我们需要准备一台越狱手机，学习如何安装越狱插件，如何使用`Cycript`和`Reveal`对APP界面进行分析，如何使用`MachOView、class-dump、Hopper、Disassembler、ida等`工具对`Mach-O`文件进行分析，以及如何调试代码和对IPA进行重签名。

## 手机越狱
在 iOS9 之后越狱的环境越来越差，iOS越狱都不是完美越狱，完美越狱和非完美越狱的差别就在于`非完美越狱只要手机重启之后就需要重新越狱`。目前iOS的最新系统是15.2,我们可以通过[爱思助手网址](https://www.i4.cn/firmware.html)查看可越狱手机的手机和系统。我当前测试手机是iPhoneX，手机系统是13.4。

目前比较6的越狱方案是[uncOver](https://unc0ver.dev/),通过[uncOver官网](https://unc0ver.dev/)下载最新的IPA，对IPA进行重签名之后安装到手机,安装成功后打开`uncOver`软件,直接点击`Jailbreak`按钮就可以直接越狱了，越狱成功后手机会安装`Cydia`商店。手机重启后`Cydia`商店打开会闪退，这时就需要重新越狱了。目前支持越狱的最新系统到`iOS14.8`。

或者也可以直接使用爱思客户端进行越狱，下载爱思电脑客户端，连接手机后点击工具箱中的一键越狱按钮,其原理还是通过`uncOver`来帮助手机越狱，只不过爱思助手的可越狱工具更多一些，个人感觉使用爱思助手更方便一些，能用工具的就用工具进行。一些越狱相关的教程也可以查看[爱思官网](https://www.i4.cn/news_4.html)。

## Cydia
Cydia 是越狱后的苹果商店,我们可以在 Cydia 中安装各种第三方的软件、插件、补丁、APP。它的作者是`Jay Freeman(saurik)`。Cydia 默认有`BigBoss`、`apt.bingner.com`等软件源,我们可以通过添加软件源来增加更多可下载的插件。常见的软件源有：
```markdown
* `雷锋源` : 添加软件源`http://apt.cydiaba.cn`
* `Cydia贴吧源` : 添加软件源`http://apt.cydiaba.cn`
```
Cydia必装的几个插件有:
```markdown
* `Apple File Conduit "2"` : 安装之后可以访问iOS设备的文件系统,通过iFunBox查看所有文件,有时候安装之后依然不能查看需要对手机重新越狱，重新安装。
* `AppSync Unified`: 可以绕过系统验证，随意安装、运行破解的ipa安装包。
* `iFile`: 可以在iPhone上自由访问iOS文件系统，类似的有`Filza File Manager`、`File Browser`、`Filza File 文件管理器`
* `OpenSSH` : 安装之后可以使用ssh通过电脑连接手机
* `Cycript`: 安装之后可以在内存中调试界面
* `Reveal2Loader`: 配合 Reveal 电脑端对APP界面进行分析
```
iPhone设备上有`root` 和 `mobile`两个用户。mobile 是普通权限账户，只能操作一些普通文件，不能操作系统级别的文件,文件夹位置是`/var/mobile`,root 是最高权限账户,文件夹位置是`/var/root`。

登录 root 用户使用`ssh root@IP地址`,登录 mobile 用户是`ssh mobile@IP地址`。登录之后可以通过`pwd`查看当前路径，会发现两个用户的路径是不同的。

未越狱的手机使用 iFunBox 连接时,手机名称后显示未越狱三个字，点击查看文件系统时，左下角显示`Media`。如果手机已越狱，手机名后不显示未越狱三个字。如果越狱手机在 Cydia 安装了`Apple File Conduit "2"`插件,使用 iFunBox 查看文件系统时,左下角显示的是`Device`。

>有时候通过Cydia安装插件后，显示重启 SpringBoard。意思是重启桌面，SpringBoard就是iOS的桌面。

通常情况下，通过Cydia安装的安装包是`deb`格式(结合软件包管理工具apt)，如果通过Cydia源安装deb失败，可以先从网上下载deb格式的安装包，然后将deb安装包放到`/var/root/Media/Cydia/AutoInstall`路径下，重启手机，Cydia就会自动安装deb。由于目前都是非完美越狱，手机重启之后越狱会消失，所以这种方法暂时没试过，并且Media文件夹下也没有看到Cydia路径，当前信息只做一个保留，方便以后遇到时进行尝试。

## 越狱后文件路径 和 常见指令
手机越狱后，使用 iFunbox 连接手机，查看文件系统时，会发现左下角显示的是`Device`,文件也比未越狱时要多了很多，这里说一下常见的文件的位置。
```markdown
* /var/root    root用户文件位置
* /var/mobile    mobile用户文件位置
* /etc/ssh/ssh_config   客户端ssh配置,通过Cydia安装ssh之后才会有
* /etc/ssh/sshd_config    服务端ssh配置,通过Cydia安装ssh之后才会有
* /etc/ssh/ssh_host_rsa_key.pub   公钥，客户端连接之后才会有
* /etc/ssh/ssh_host_rsa_key     私钥,客户端连接之后才会有
* /var/root/.ssh/authorized_keys    客户端rsa登录授权文件，只有客户端使用密钥登录的时候才会有当前路径
* /var/containers/Bundle/Application/xxxx      手机内安装的应用对应的目录
* /usr/lib/cycript0.9/      Cycript插件对应的目录，封装的cy文件可以放到当前目录下
```

常见的指令:

指令 | 含义
------- | -------
`killall SpringBoard` | 重启iPhone桌面
`reboot` | 重启手机
`ssh root@192.168.16.119` | 通过SSH登录iPhone
`scp ~/.ssh/id_rsa.pub root@ip地址:~/.ssh` | 拷贝文件到iPhone
`scp -P 10010 ~/.ssh/id_rsa.pub root:localhost:~/.ssh` | 如果开启了USB端口转发，使用此命令拷贝文件到iPhone

## 代码判断手机是否越狱
判断手机是否越狱主要是通过判断手机是否有越狱后的文件夹和文件变量进行判断的。有以下几种方式:
1. 通过越狱后增加的越狱文件判断: 一般来说，手机越狱后会增加以下文件,判断这些文件是否存在，只要有存在的，就可以认为手机已经越狱了。
```markdwon
/Applications/Cydia.app
/Library/MobileSubstrate/MobileSubstrate.dylib
/bin/bash
/usr/sbin/sshd
/etc/apt
```
相关代码：
```objc
    NSArray *jailbreak_tool_paths = @[
        @"/Applications/Cydia.app",
        @"/Library/MobileSubstrate/MobileSubstrate.dylib",
        @"/bin/bash", 
        @"/usr/sbin/sshd",
        @"/etc/apt"
    ];

    - (BOOL)isJailBreak {
        for (int i=0; i<jailbreak_tool_paths.count; i++) {
            if ([[NSFileManager defaultManager] fileExistsAtPath:jailbreak_tool_paths[i]]) {
                NSLog(@"The device is jail broken!");
                return YES;
            }
        }
        NSLog(@"The device is NOT jail broken!");
        return NO;
    }
```
2. 根据是否能打开cydia判断
```objc
    - (BOOL)isJailBreak {
        if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"cydia://"]]) {
            NSLog(@"The device is jail broken!");
            return YES;
        }
        NSLog(@"The device is NOT jail broken!");
        return NO;
    }
```
3. 根据是否能获取所有应用的名称判断,没有越狱的设备是没有读取所有应用名称的权限的。
```objc
    - (BOOL)isJailBreak {
        if ([[NSFileManager defaultManager] fileExistsAtPath:@"User/Applications/"]) {
            NSLog(@"The device is jail broken!");
            NSArray *appList = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:@"User/Applications/" error:nil];
            NSLog(@"appList = %@", appList);
            return YES;
        }
        NSLog(@"The device is NOT jail broken!");
        return NO;
    }
```
4. 根据使用stat方法来判断cydia是否存在,这个方法的思路还是通过判定cydia应用，但方法是使用stat函数，同时会判断是否有注入动态库。
```objc
    int checkInject() {
        int ret;
        Dl_info dylib_info;
        int (*func_stat)(const char*, struct stat*) = stat;
        char *dylib_name = "/usr/lib/system/libsystem_kernel.dylib";
        if ((ret = dladdr(func_stat, &dylib_info)) && strncmp(dylib_info.dli_fname, dylib_name, strlen(dylib_name))) {
            return 0;
        }
        return 1;
    }
    
    int checkCydia() {
        struct stat stat_info;
        if (!checkInject()) {
            if (0 == stat("/Applications/Cydia.app", &stat_info)) {
                return 1;
            }
        } else {
            return 1;
        }
        return 0;
    }
```
5. 根据读取的环境变量是否有值判断。`DYLD_INSERT_LIBRARIES`环境变量在非越狱的设备上应该是空的，而越狱的设备基本上都会有`Library/MobileSubstrate/MobileSubstrate.dylib`,相关代码：
```objc
    char* printEnv(void) {
        charchar *env = getenv("DYLD_INSERT_LIBRARIES");
        NSLog(@"%s", env);
        return env;
    }
 
    - (BOOL)isJailBreak {
        if (printEnv()) {
            NSLog(@"The device is jail broken!");
            return YES;
        }
        NSLog(@"The device is NOT jail broken!");
        return NO;
    }
```

## 逆向App的思路
逆向App的思路可以分为四步,分析界面、分析代码、动态调试、代码编写。
```markdown
界面分析: 使用Cycript、Reveal
代码分析: 对Mach-O文件的静态分析,使用MachOView、class-dump、Hopper、Disassembler、ida等
动态调试: 对运行中的APP进行代码调试，debugserver/LLDB
代码编写: 注入代码到APP中，必要时还可能需要重新签名，打包ipa
```

## 逆向相关论坛
* [iOS逆向论坛](https://iosre.com/)
* [看雪论坛](https://www.kanxue.com/)