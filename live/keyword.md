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
extractor 提取器
entitlement 权限
script  脚本
rename 改名
open console  打开控制台
frame 帧

## 安卓中常用的单词
单词 | 含义
------- | -------
bridge | 桥梁
below | 下面
above | 上面
layout | 布局
position | 位置
anchorPoint | 锚点
interface | 接口
transaction | 交易
disable | 禁用
forword | 前言
duration | 持续时间
speed | 速度
repeat | 重复
symbols | 符号
section | 部分
encode | 编码
decode | 解码
platform | 平台
abstract | 抽象
gravity | 重力
stagger | 错开
visibility | 能见度; 可见性; 可见距离; 清晰度
visible | 看得见的; 明显的，显然的; 手头的，可得到的; 可察觉到的;
invisible | 看不见的; 不易为视线所见的，隐匿的; 无形的（指银行、旅游等服务）; 不引人注目的;
padding |  填充 -> 衬垫; 衬料; 赘语; 废话;
drawable | 可拉伸的
horizontal | 水平
vertical | 垂直

### 网络相关
connection: 连接; 联系，关系; 连接点; 亲戚;
exception: 例外，批评; 异议，反对;
input:  输入;投入
output: 输出;产量; 作品
stream: 数据流,河流，小河，川，溪;
parser: 剖析器;语法分析程序
runnable: 可运行的
document: 文件

## iOS常用的单词
### 网络相关
session: 开会，会议。计算机常用”会话控制“表达
request: 请求
Serialization: 序列化
Progress: 前进，进展
resume: 继续，重新开始
pause:  暂停
response: 响应，反应，回答
method: 方法
### 数组
deprecated: 不赞成，反对，弃用
attribute: 属性
priority: 优先，优先权
descending: 降序、降落
ascending: 升序、上升
replace: 替换、更换

## 其他常用英语单词
terminal: 终端
ifconfig
analyze: 分析
Review: 审核

## python

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
