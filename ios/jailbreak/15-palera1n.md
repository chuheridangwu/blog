# palera1n 越狱教程
首先检查自己的手机和对应iOS版本是否能够越狱,[点击查看对应版本和工具](https://ios.cfw.guide/get-started/select-iphone/)。

目前iOS 16以上的系统只能通过`palera1n`进行越狱。并且iOS 16以上系统不支持 A11 以上的手机，也就是 iPhoneX 以上手机最大只支持 iOS 15.4.1 的系统。[palera1n官网地址](https://palera.in/), A8-A11 指的是苹果的手机芯片对应的设备。

以下是使用Mac电脑对手机越狱的过程

### 越狱步骤

* **步骤1:**
[点击下载 palera1n-macos-universal](https://objects.githubusercontent.com/github-production-release-asset-2e65be/537803484/4126ea86-5c65-4b53-8245-a16e6d4cf025?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T081415Z&X-Amz-Expires=300&X-Amz-Signature=d35626c6227fa129182602ce44508c06caca84a6a19d9fb73ba29a63730d5a8a&X-Amz-SignedHeaders=host&actor_id=16187897&key_id=0&repo_id=537803484&response-content-disposition=attachment%3B%20filename%3Dpalera1n-macos-universal&response-content-type=application%2Foctet-stream)

* **步骤2:** 打开终端，输入以下指令，如果出现提示，请输入您的管理员密码。
    ```shell
    # 进入下载文件夹
    cd ~/Downloads

    # 将文件移动到 /usr/local/bin/ 目录下
    sudo mv ./palera1n-macos-universal /usr/local/bin/palera1n

    #允许 palera1n 操作文件扩展属性
    sudo xattr -cr /usr/local/bin/palera1n 

    # 给与 palera1n 权限
    sudo chmod +x /usr/local/bin/palera1n
    ``` 
    -------------------------------------
* **步骤3:** 若越狱设备运行iOS 16系统且曾经设置过密码，则必须在越狱前清除所有内容和设置。
  
  * A11 设备上必须禁用密码，并且在运行过程中将无法使用密码或相关功能，如 `Face ID/Touch ID` 和` Apple Pay`等。
  
  * 进入`“设置”>“通用”>“传输或重置 iPhone”>“抹掉所有内容和设置”`，请务必在执行这些步骤之前备份您的 iPhone。
  
  -------------------------------------

* **步骤4:** 将越狱的设备连接到电脑,如果使用 USB-C 转闪电数据线，可能需要使用 USB-C 转 USB-A 适配器和 USB-A 转闪电数据线，因为某些 USB-C 转 Lightning 线可能不允许您将 iPhone 进入到 DFU 模式。

    -------------------------------------
  
* **步骤5:**  在终端窗口中执行以下命令 `palera1n -cf`
    
    ![](../imgs/palera1n/palera1n_0.png)

    此时设备将进入恢复模式，然后准备进入 DFU 模式。

    ![](../imgs/palera1n/palera1n_1.png)

    准备好进入 DFU 模式时，请按键盘上的Return 键。

    ![](../imgs/palera1n/palera1n_2.png)

    按照提示，**按住音量调低和侧面按钮约五秒钟，然后松开侧面按钮并继续按住音量调低按钮**，直到进入到 DFU 模式。

    ![](../imgs/palera1n/palera1n_3.png)

    -------------------------------------

* **步骤6:**  palera1n 将在 DFU 中检测到设备并开始执行越狱。此时您的设备将在下载模式下重新连接。
    
    ![](../imgs/palera1n/palera1n_4.png)

    您可能会收到以下错误：等待下载模式超时（错误代码：`-status_exploit_timeout_error`），要解决此问题，**请从 iPhone 上拔下数据线并重新连接**。

    ![](../imgs/palera1n/palera1n_5.png)

    这里运行结束后手机会重启，安静等待即可 !!! !!! !!! !!!

    -------------------------------------

 * **步骤7:**  返回终端窗口并执行以下命令以 rootful 模式越狱 `palera1n -f`

    ![](../imgs/palera1n/palera1n_6.png)

    您的设备将再次进入恢复模式，为进入 DFU 模式做准备。

    ![](../imgs/palera1n/palera1n_1.png)

    准备好进入 DFU 模式时，按键盘上的 Return 键。
    
    ![](../imgs/palera1n/palera1n_7.png)
    
    按照提示，按住**音量调低和侧面按钮约五秒钟**，然后**松开侧面按钮并继续按住音量调低按钮**，直到检测到 DFU 模式。

    ![](../imgs/palera1n/palera1n_8.png)

    -------------------------------------

* **步骤8:** 在 DFU 模式下检测到你的 iPhone 后，palera1n 将继续运行，此时您的设备将再次以下载模式重新连接。

    ![](../imgs/palera1n/palera1n_9.png)

    您可能还会收到以下错误：等待下载模式超时（错误代码：`-status_exploit_timeout_error`），同样从 iPhone 上拔下数据线并重新连接，等待palera1n 将继续运行。

    ![](../imgs/palera1n/palera1n_10.png)

    -------------------------------------

* **步骤9:** 这时iPhone 将再一次重启，重启后 palera1n 应用程序将被添加到 Springboard。 注意：这可能需要 10-20 秒
  
* **步骤10:** 接下来点击启动palera1n应用程序，安装 Slieo 和 Zerbra 即可。需要的插件可以在这两个商店下载。