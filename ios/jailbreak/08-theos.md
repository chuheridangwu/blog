# theos
过程是 我们编写的代码编程deb安装包，安装到手机上。

## 安装theos
安装theos可以分为以下三步:
```markdown
1. 安装签名工具ldid `brew install ldid`
2. 修改环境变量，终端添加theos命令
    2.1 编辑用户的配置文件`vim ~/.bash_profile`.
    2.2 在`.bash_profile`文件后加入下面这两行代码
        export THEOS=~/theos
        export PATH=$THEOS/bin:$PATH
    2.3 让环境变量立即生效 `source ~/.bash_profile`。或者重启终端
3. 在`$THEOS`目录下载代码，也就是刚配置的`~/theos`目录 `git clone --recursive https://github.com/theos.git $THEOS`。`git clone --recursive`是递归下载，会下载所有依赖的模块
```

## 创建theos项目
1. 创建新的项目
    ```sehll
    cd ~/Desktop
    nic.pl   // 创建新的theos项目
    ```
2. 选择`iphone/tweak`
3. 填写项目信息
    ```markdown
    * Project Name : 项目名称
    * Package Name :  项目ID (随便写)
    * Author/Maintainer Name :  作者名称
    * [iphone/tweak] MobileSubstrate Bundle filter : 需要修改的APP的bundle ID
    * [iphone/tweak] List of applications to terminate upon installation : 回车就行 
    ```
4. 创建theos项目之后,编辑`Makefile`文件,在前面加入环境变量，写清楚通过哪个IP和端口访问手机。`THEOS_DEVICE_IP` 和 `THEOS_DEVICE_PORT`
```Makefile
    export THEOS_DEVICE_IP=127.0.0.1
    export THEOS_DEVICE_PORT=2222

    TARGET := iphone:clang:latest:7.0
    INSTALL_TARGET_PROCESSES = SpringBoard

    include $(THEOS)/makefiles/common.mk

    TWEAK_NAME = bigotweek

    bigotweek_FILES = Tweak.x
    bigotweek_CFLAGS = -fobjc-arc

    include $(THEOS_MAKE_PATH)/tweak.mk
```
如果不希望每个项目的Makefile都编写IP和端口环境变量，可以添加到用户配置文件中。编辑完成后，`source ~/.bash_profile`让配置生效
```shell
$ vim ~/.bash_profile
export THEOS=~/theos
export PATH=$THEOS/bin:$PATH
export THEOS_DEVICE_IP=127.0.0.1
export THEOS_DEVICE_PORT=10010
$ source ~/.bash_profile
```
5. 打开 `Tweak.xm`文件，编写对应的hook代码。
```objc
    %hook CMPopTipView
        - (id)initWithCustomView:(id)arg1{
            return nil;
        }
        - (id)initWithMessage:(id)arg1{
            return nil;
        }
        - (id)initWithTitle:(id)arg1 message:(id)arg2{
            return nil;
        }
        - (id)initWithFrame:(struct CGRect)arg1{
            return nil;
        }
    %end
```
6. 编译 - 在theos当前目录下打包,终端输入`make`
7. 打包成deb - `make pageage`
8. 安装deb，默认会重启SpringBoard - `make install`

## hook应用思路
hook别人项目时，可以按照以下的思路去做:
```markdown
1. 打开应用,使用`frida-ps -Ua`查看应用的Bundle ID
2. 开启端口映射，将手机通过usb连接到电脑，使用`iproxy 2222 22`进行端口映射
3. 使用`python3 dump.py -H 127.0.0.1 -p 2222 -u root -P alpine com.bigo.live`指令对应用进行脱壳
4. 使用 Reveal 对界面进行分析，找到对应的 类 和 方法。或者通过cycript进行界面分析
6. 找到类之后，通过theos编写对应的类，hook掉对应的方法。
7. 编译 `make` -> 打包 `make package` -> 安装 `make install`
```
按照这一套流程走完应该没问题，如果需要安装到未越狱的手机，需要再进行打包。后面慢慢来。

## theos可能存在的问题
##### Make package出现错误
```shell
Can't locate IO/Compress/Lzma.pm in @INC (you may need to install the
IO::Compress::Lzma module) (@INC contains: /Library/Perl/5.18/darwinthread-multi-2level /Library/Perl/5.18 /Network/Library/Perl/5.18/darwinthread-multi-2level /Network/Library/Perl/5.18 /Library/Perl/Updates/5.18.2
/System/Library/Perl/5.18/darwin-thread-multi-2level
/System/Library/Perl/5.18 /System/Library/Perl/Extras/5.18/darwin-threadmulti-2level /System/Library/Perl/Extras/5.18 .) at
/Users/mj/theos/bin/dm.pl line 12.
BEGIN failed--compilation aborted at /Users/mj/theos/bin/dm.pl line 12.
make: *** [internal-package] Error 2
```

这是因为打包压缩方式有问题，改成gzip压缩就行了。
```markdown
1. 修改dm.pl文件,用#号注释掉`#use IO::Compress::Lzma; #use IO::Compress::Xz;`
2. 修改deb.mk文件第6行的压缩方式改为gzip，`_THEOS_PLATFORM_DPKG_DEB_COMPRESSION ?= gzip`。
```

##### Make的错误,错误内容是:
```shell
Error: You do not have an SDK in
/Library/Developer/CommandLineTools/Platforms/iPhoneOS.platform/Developer/S
DKs
```
这是因为电脑安装多个xcode导致路径错误，需要指定Xcode。` sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer/`

##### 多次编译会出错，内容：
```shell
> Making all for tweak xxx…
make[2]: Nothing to be done for `internal-library-compile'.
```
这是因为之前已经编译过有缓存导致的，clean一下即可。

## 推荐
* [iOS Tweak修改系统行为（classdump-dyld）](https://www.jianshu.com/p/15436bdf882d)