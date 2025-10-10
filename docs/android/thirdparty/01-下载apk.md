# 谷歌商店下载apk

## 一、通过第三方下载
直接进到下面任意一个网站中，搜索想要下载的应用即可。
1. apkpure https://apkpure.com/ [推荐]
2. ApkMirro https://www.apkmirror.com/ [不推荐,下载格式是apkm，只能通过他们的安装包进行安装]
3. apkcombo https://apkcombo.com/ [推荐]
4. uptodown https://en.uptodown.com/ [强烈推荐]

>下载apk选择下载文件时，注意有apk和xapk的区别。xapk的包下载时是下载他们自己的安装工具。**xapk的包下载完成后不能直接安装到手机**。ApkMirro是将xapk搞成了apkm,安装需要使用他们的安装包进行安装。

也可以通过Google play链接提取, 在[Google play](https://play.google.com/store/apps)中搜索想要的应用后，复制应用的链接在下面网站中搜索，即可提取。
1. apkcombo https://apkcombo.com/apk-downloader/

## 二、通过手机安装，通过Apk Extractor进行导出
如果你有真机，并且有谷歌服务，可以先将软件安装到手机中，通过Apk Extractor（https://play.google.com/store/apps/details?id=com.evozi.apkextractor）将apk进行导出。如果有模拟器，也可以通过模拟器安装apk，然后通过Apk Extractor进行导出。苹果M系列的安装模拟器可以使用[BlueStacks](https://www.bluestacks.com/mac)

>注意：如果是xapk的包，只能通过手机导出，模拟器下载的apk框架和手机真机的不一至，安装时会提示错误

## 三、apk和xapk
### **1. XAPK 是什么？**
**XAPK（eXtended Android Package Kit）** 是一种 **Android 应用扩展安装包格式**，主要用于分发 **大型应用或游戏**（如《原神》《PUBG Mobile》）。

 **XAPK 文件组成**：
- **`base.apk`**（主程序 APK）
- **`split_config.*.apk`**（可选，拆分 APK，如 CPU 架构优化包）
- **`Android/obb/` 文件夹（可选，游戏数据包）**

---

### **2. 为什么 Google 采用 XAPK（更准确地说：Split APKs）？**
Google **官方并没有直接推广 `.xapk` 文件**，而是推出了 **Android App Bundle（AAB）**，最终在设备上生成 **Split APKs**（类似 XAPK 的结构）。

#### ** XAPK/Split APKs 的优势**
| 传统 APK 的问题 | XAPK/Split APKs 的改进 |
|---------------|----------------------|
| **1. 单一 APK 体积过大**<br>（包含所有 CPU架构、语言、DPI） | **⏬ 动态拆分，只下载所需部分**<br>（如：仅 arm64-v8a CPU 的 APK） |
| **2. 更新时需下载完整 APK**<br>（即使只修改一个小功能） | **🔄 增量更新**<br>（仅下载变化的部分，节省流量） |
| **3. OBB 数据管理复杂**<br>（需手动复制到 `/Android/obb/`） | **📦 自动集成 OBB 数据**<br>（XAPK 自带数据包，安装更方便） |

---

### **3. Google 的 Split APKs 和 XAPK 的区别**
|  | **Google Split APKs（AAB）** | **第三方 XAPK** |
|---|---|---|
| **来源** | Google Play 自动优化生成 | APKPure、TapTap 等第三方商店 |
| **格式** | `.apks`（多个 APK） | `.xapk`（ZIP 打包版） |
| **安装方式** | 通过 Play Store 自动处理 | 需要第三方工具（SAI、APKMirror Installer） |
| **是否自带 OBB** | ❌ 不包含 | ✅ 部分 XAPK 包含 |
| **主要用途** | 减少下载大小 | 离线分享大型游戏 |