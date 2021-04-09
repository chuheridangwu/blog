## FFmpeg
使用`brew install ffmpeg`命令进行安装，视频文件本身其实是一个容器（container），里面包括了视频和音频，也可能有字幕等其他内容。

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

```
ffmpeg \
-i input.mp4 \
-vn -c:a copy \
output.aac
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

## 相关文章
[FFmpeg 视频处理入门教程](https://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)