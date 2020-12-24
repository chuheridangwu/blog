# 英语单词

constructor

corners

shape  形状


Instance  实例
initialize  初始化
method  方法
discover  发现

segment 段
permission  权限

springboard 桌面

记录破解ev4视频加密的过程
1. ev4格式的视频需要制定的evplayer播放器才能够播放，当播放加密视频时，会弹出弹窗让用户输入激活码？激活码正确的话，才可以观看视频

我的思路：
我之前有一个加密视频可以观看，当断网的情况下，加密视频依然可以播放。并且本地会显示对应的激活码证书和token。

根据现象可以确认，观看视频不用从网络上获取，应该是保存到本地的。

猜想：
视频里应该有特征码，当播放器播放视频时，如果检测到对应的特征码，会给出弹窗，当用户输入激活码之后，联网进行判断，如果成功则忽略视频中的特征码。

根据弹窗的信息，搜索对应的字符串`Online Activation`,根据对应的方法名判断应该是获取证书列表的，并且方法内有一个cheak方法，应该是用来判断激活码是否正确的。

现在只要搞懂cheak里面是怎么判断的就可以了。

```
000000010005cf97         lea        rsi, qword [_av_base64_encode.b64+10907]    ; "DialogGetLicence"
000000010005cf9e         lea        rdx, qword [_av_base64_encode.b64+11306]    ; "Check"
```
lea指令可以用来将一个内存地址直接赋给目的操作数，例如：lea eax,[ebx+8]就是将ebx+8这个值直接赋给eax，而不是把ebx+8处的内存地址里的数据赋给eax。

搜索`_av_base64_encode.b64`,发现是`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`。现在要弄明白+11306是什么意思。
