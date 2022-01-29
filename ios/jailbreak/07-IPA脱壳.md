# IPA脱壳

## 脱壳
otool -l mcat | grep crypt  如果cryptid == 1说明是加壳的需要脱壳

otool -l /Users/mlive/Desktop/frida-ios-dump/Payload/bigoshow.app/bigoshow | grep cr
```
      locreloff 0
        nlocrel 0
     cryptoff 11636736
    cryptsize 4096
      cryptid 0
```

## 脱壳出现的错误
使用frida-ios-dump砸壳时一直出现`timeout was reached`，是因为必须要保证程序在运行中才可以砸壳


砸壳中出现错误，文件夹没有权限读写
```markdown
Generating "Mcat.ipa"
zip I/O error: Permission denied
zip error: Could not create output file (/Users/mlive/Desktop/frida-ios-dump/Mcat.ipa)
Command '('zip', '-qr', '/Users/mlive/Desktop/frida-ios-dump/Mcat.ipa', './Payload')' returned non-zero exit status 15.
```


`frida-ps -U ` 指令可以获取到手机上所有的脱壳


 sg.bigo.live 可以用名字,也可以用唯一标识，如果出现`unable to launch iOS app: The operation couldn’t be completed. Application "" is unknown to FrontBoard.`错误意思是根据名字找不到应用需要 使用唯一标识进行获取。

 `python3 dump.py -H 127.0.0.1 -p 2222 -u root -P alpine sg.bigo.live`


## 推荐阅读
* [iOS逆向工程（六）：使用frida-ios-dump工具，一键脱壳](https://www.jianshu.com/p/8d6234a7d740)
* [ios逆向之frida安装与使用基础](https://www.jianshu.com/p/71587d8b39f4)
* [IOS应用砸壳之frida-ios-dump](https://www.cnblogs.com/paperpen/p/14845675.html)
* [ios逆向-frida&环境&破解appSign算法](https://cloud.tencent.com/developer/article/1755721)


https://www.jianshu.com/u/ebb875fbe463