# TrollStore
TrollStore的作用允许未越狱的 iOS 用户将 IPA 文件旁加载到其设备上，并且启用永久签名功能。

TrollStore V2 适用于 `iOS 15.6-16.5（所有设备）`、`16.5.1-16.6.1（A8-A11 设备`）和 `iOS 17.0（A12+ 设备`）。最初的 TrollStore 支持 `iOS 14.0 – 15.4.1`。 

[进入巨魔商店官网](https://trollstore.app/)


## iOS 16.3 安装过程 
手机需要安装 Tip 软件，如果之前卸载了，从苹果商店重新下载。我之前使用同样的手机测试安装是失败的，后面通过 设置-通用-传输或还原iPhone-抹掉所有内容和设置 之后重新安装可以了。
1. [下载Misaka 8.1.1版本](https://github.com/straight-tamago/misaka/releases/tag/8.1.1)，使用 Sideloadly 自签名安装在手机上
2. 下载 TrollStore Helper
   1. 打开 Misaka (需要魔法网络)
   2. 点击 `Packages [Emu/Var]` 选项
   3. 点击左下角的工具箱
   4. 选择安装 TrollStore
   5. 点击Tips，会提示完成弹窗。(手机中需要安装Tips(中文是提示)软件，如果没有点击下面的下载)
3. 点击Tip软件, 如果出现闪退，重启手机，重复刚才的步骤，直到Tips软件中能看到 Installing TrollStore,手机上会出现巨魔商店 (这里我曾经点击过`Packages [Emu/Var]` 右上角到魔棒按钮。不知道跟这个有没有关系)
4. 安装 Persistence Helper（巨魔商店如果想长久保持在手机需要安装）
   1. 打开巨魔商店，点击设置
   2. 点击 `Install Persistence Helper`
   3. 从应用列表中选择“提示”

正常这个步骤就装好了，今天安装的时候一直遇到Tips闪退，多点击了几次，重启之后再打开就没闪退了。

## 在非越狱状态下更新 Dopamine 或者通过网盘安装IPA时 打开了放大器……
1. 安装了 `TrollStore` 及其 `Helper`。
2. TrollStore 版本号` >= 1.3.0`。
3. TrollStore 设置页中打开了 `URL Scheme`。

否则你在非越狱状态下更新 Dopamine 将打开 Apple 自带的放大器。

## 巨魔常用的一些软件
* [AppDump2](https://onejailbreak.com/blog/appdump2/) - 可以直接对手机安装IPA进行砸壳
* [ModMyIPA](https://github.com/powenn/ModMyIPA/releases) - 可以修改 IPA 文件的 Package 名字等信息。于是你可以利用它做 App 多开。
*[DebToIPA](https://github.com/sourcelocation/DebToIPA) - 它可以将 .deb 格式的 App 转成 .ipa 格式。
*[Filza](https://www.tigisoftware.com/default/?p=439) - iOS 平台上著名的文件管理器。特别地，它可以访问系统根目录下的文件。（当然，最好不要在不熟悉的情况下对其中文件进行修改）
*[CocoaTop](https://github.com/D0m0/CocoaTop/releases/) - iOS 平台上著名的进程管理器。
*[AppStore++](https://onejailbreak.com/blog/appstoreplusplus/) - 允许你自由降级从 AppStore 安装的 App。
*[IPA 提取器](https://github.com/SmileZXLee/IpaDownloadTool) - 允许你捕获网页安装的 IPA。