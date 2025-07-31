## FFmpeg
使用`brew install ffmpeg`命令进行安装，视频文件本身其实是一个容器（container），里面包括了视频和音频，也可能有字幕等其他内容。

使用`brew`下载ffmpeg时，遇到错误`Error: No such file or directory @ rb_sysopen`,原来是一个依赖包下载不成功`（harfbuzz-3.1.1.arm64_monterey）`,可以先单独针对这个包进行下载`brew install harfbuzz`。

## 编码器
编码器（encoders）是实现某种编码格式的库文件。只有安装了某种格式的编码器，才能实现该格式视频/音频的编码和解码。以下是一些 FFmpeg 内置的视频编码器:
```
libx264：最流行的开源 H.264 编码器
NVENC：基于 NVIDIA GPU 的 H.264 编码器
libx265：开源的 HEVC 编码器
libvpx：谷歌的 VP8 和 VP9 编码器
libaom：AV1 编码器
```
音频编码器如下:
```
libfdk-aac
aac
```

## FFmpeg格式 ffmpeg {1} {2} -i {3} {4} {5}
参数可以忽略，例如`ffmpeg -i input.avi output.mp4` 转码
1. 全局参数
2. 输入文件参数
3. 输入文件
4. 输出文件参数
5. 输出文件



## FFmpeg 常用命令参数
FFmpeg 常用的命令行参数如下:
```
-c：指定编码器
-c copy：直接复制，不经过重新编码（这样比较快）
-c:v：指定视频编码器
-c:a：指定音频编码器
-i：指定输入文件
-an：去除音频流
-vn： 去除视频流
-preset：指定输出的视频质量，会影响文件的生成速度，有以下几个可用的值 ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow。
-y：不经过确认，输出时直接覆盖同名文件。
```

## 常见用法
1. **查看文件信息:** 查看视频文件的元信息，比如编码格式和比特率，可以只使用-i参数。`ffmpeg -i input.mp4`
2. **转换编码格式:** 将视频文件从一种编码转成另一种编码。一般使用编码器libx264,只需指定输出文件的视频编码器即可. `ffmpeg -i [input.file] -c:v libx264 output.mp4`
3. **转换容器格式:** 将视频文件从一种容器转到另一种容器。也是转码。`ffmpeg -i input.mp4 -c copy output.webm`
4. **调整码率:** 改变编码的比特率，一般用来将视频文件的体积变小。下面的例子指定码率最小为964K，最大为3856K，缓冲区大小为 2000K。`\`可以用来换行 

```
ffmpeg \
-i input.mp4 \
-minrate 964K -maxrate 3856K -bufsize 2000K \
output.mp4
```

5. **改变分辨率:** 从 1080p 转为 480p 。

```
ffmpeg \
-i input.mp4 \
-vf scale=480:-1 \
output.mp4
```

6. **提取音频:**

```shell
ffmpeg \
-i input.mp4 \
-vn -c:a copy \
output.aac

# 视频提取mp3
ffmpeg -i  ~/Desktop/test.mp4  -vn  ~/Desktop/test.mp3
```

7. **为音频添加封面:** 有些视频网站只允许上传视频文件。如果要上传音频文件，必须为音频添加封面，将其转为视频，然后上传。下面命令可以将音频文件，转为带封面的视频文件。

```
ffmpeg \
-loop 1 \
-i cover.jpg -i input.mp3 \
-c:v libx264 -c:a aac -b:a 192k -shortest \
output.mp4
```

上面命令中，有两个输入文件，一个是封面图片cover.jpg，另一个是音频文件input.mp3。-loop 1参数表示图片无限循环，-shortest参数表示音频文件结束，输出视频就结束。
1. **下载m3u8文件并转换成MP4格式**：`ffmpeg -i 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8' test.mp4`

## 使用FFMPEG将ts无损转换为mp4
文章来源:[使用FFMPEG将ts无损转换为mp4](https://www.simaek.com/archives/6/)
很多伙伴们会从各大视频网站上下载视频、电影、电视剧等，通常网站为了便于传输播放，都是使用TS格式封装视频流的。

>TS文件是一种媒体的扩展名，它是日本高清摄像机拍摄下进行的封装格式。MPEG2-TS（Transport Stream“传输流”；又称TS、TP、MPEG-TS 或 M2T）是用于音效、图像与数据的通信协定，最早应用于DVD的实时传送节目。MPEG2-TS格式的特点就是要求从视频流的任一片段开始都是可以独立解码的。
缺点就在于很多播放器不支持TS格式的视频，或者有的播放器支持，但是在播放时拖动进度条会卡顿，这时我们就需要将TS格式转换成常见的MP4等视频格式了。

这里使用工具ffmpeg，它可以用于各种音视频封装格式的生成和解析，下载和安装以及详细使用方法见官方文档：[Documentation](http://ffmpeg.org/documentation.html)。

将TS转为MP4的命令：
```
input.ts为输入TS文件名，output.mp4为输出的MP4文件名
ffmpeg -i input.ts -c copy -map 0:v -map 0:a -bsf:a aac_adtstoasc output.mp4
如果音轨不是AAC_ADTS可以不加-bsf:a aac_adtstoasc。
```
附加一个刚开始找到的方法，它对视频流的操作是使用libx264重编码，而不是copy，所以不是无损。
有重编码需求的可以使用：
```
ffmpeg -y -i input.ts -c:v libx264 -c:a copy -bsf:a aac_adtstoasc output.mp4
```
ffmpeg默认使用全部线程来进行转码，发热量有点大，可以加-threads n（n代表线程数）这个参数限制线程数。

![]()

## 相关文章
[FFmpeg 视频处理入门教程](https://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)