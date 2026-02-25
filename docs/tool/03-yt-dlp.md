#  yt-dlp 使用方式
安装`brew install yt-dlp`,安装好之后使用`yt-dlp --version`查看版本号。

## 1. 基础用法
### 1.1 下载单个视频
```bash
yt-dlp "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```
默认下载 最高质量的视频+音频合并文件（格式自动选择）

### 1.2 指定下载格式

```bash
# 仅下载 MP4 格式（优先 1080p 及以下）
yt-dlp -f "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]" --merge-output-format mp4 URL
# 仅下载音频（MP3）
yt-dlp -f "bestaudio" --extract-audio --audio-format mp3 URL

```
#### 关键参数：

* -f "..."：手动选择流（格式选择指南）
* --merge-output-format mp4：强制合并为 MP4
* --extract-audio：提取音频

### 1.3 下载播放列表

```bash
yt-dlp -o "%(playlist_title)s/%(playlist_index)02d-%(title)s.%(ext)s" --playlist-reverse PLAYLIST_URL
```

#### 效果：

```text
📂 播放列表名称/
├── 01-视频1.mp4
├── 02-视频2.mp4
└── ...
```
#### 参数说明：
* -o：自定义文件名（模板变量）
* --playlist-reverse：按顺序下载（默认倒序）

## 2. 高阶功能
### 2.1  Cookies 登录（年龄限制/会员视频）
```bash
yt-dlp --cookies-from-browser chrome URL
```
支持浏览器：chrome、firefox、edge、brave

### 2.2  断点续传 & 批量控制
```bash
# 记录已下载视频（避免重复）
yt-dlp --download-archive archive.txt URL
# 跳过已存在文件
yt-dlp --no-overwrites --skip-existing URL
# 限制下载速度（单位：字节/秒）
yt-dlp --limit-rate 2M URL  # 限速 2MB/s
```
### 2.3  元数据 & 字幕

```bash
# 嵌入元数据（标题、作者等）
yt-dlp --embed-metadata URL
# 下载字幕（自动匹配语言）
yt-dlp --write-subs --sub-langs "zh-Hans,en" URL
# 嵌入字幕到视频文件
yt-dlp --embed-subs URL

```
### 2.4 查看所有可用格式：
```bash
yt-dlp -F URL

# 最佳 1080p MP4 + 最佳音频
-f "bestvideo[ext=mp4][height<=1080]+bestaudio"
# 仅 AV1 编码（节省流量）
-f "bestvideo[ext=mp4][vcodec^=av01]+bestaudio"
# 4K HDR 优先
-f "bestvideo[height<=2160][hdr]+bestaudio"
```

## 3. 输出文件名自定义

| 变量 | 示例 | 说明 |
|------|------|------|
| `%(title)s` | `My Video.mp4` | 视频标题 |
| `%(id)s` | `dQw4w9WgXcQ` | 视频 ID |
| `%(upload_date)s` | `20231115` | 上传日期（YYYYMMDD） |
| `%(playlist_index)02d` | `01` | 两位数序号（补零） |
| `%(ext)s` | `mp4` | 文件扩展名 |

## 4. 下载YouTube播放列表
### 4.1 不保存临时缓存文件
```bash
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" \
       --merge-output-format mp4 \
       -o "%(playlist_title)s/%(playlist_index)02d-%(title)s.%(ext)s" \
       --cookies-from-browser chrome \
       --retries 10 \
       "https://www.youtube.com/watch?v=CFxkkKZ-ZtU&list=PLeNJjWBNnHY1P6oPAm7TNROvTl8C0NTOt"
```

| **参数** | **含义** |
|----------|----------|
| `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]"` | **选择最佳 MP4 视频 + M4A 音频的组合，否则回退到最佳 MP4** |
| `--merge-output-format mp4` | **强制合并后的输出格式为 `.mp4`（不生成 `.m4a` 临时文件）** |
| `-o "%(playlist_title)s/%(playlist_index)02d-%(title)s.%(ext)s"` | **定义文件名格式**：<br>• `%(playlist_title)s` = 播放列表名称作为文件夹名<br>• `%(playlist_index)02d` = 序号（`01`, `02`, …）<br>• `%(title)s` = 视频标题<br>• `%(ext)s` = 扩展名（`.mp4`） |
| `--cookies-from-browser chrome` | **使用 Chrome 浏览器的 cookies（可解决年龄限制问题）** |
| `--retries 10` | **失败时最大重试次数**（默认 10 次） |
| `"https://www.youtube.com/..."` | **YouTube 播放列表/视频链接** |

### 4.2 只下载1080p视频并且记录下载列表
```bash
yt-dlp -f "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4alpha4]/best[ext=mp4]" \
       --merge-output-format mp4 \
       -o "%(playlist_title)s/%(playlist_index)02d-%(title)s.%(ext)s" \
       --cookies-from-browser chrome \
       --retries 20 \
       --embed-metadata \
       --download-archive archive.txt \
       "https://www.youtube.com/..."
```

| 参数 | 作用 | 补充说明 |
|------|------|----------|
| `-f "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4]"` | **视频格式选择逻辑**：<br>1. 优先下载 `MP4` 格式的视频流（分辨率≤1080p）+ `M4A` 音频流<br>2. 若失败，直接选择最佳 `MP4` 格式（可能已含音频） | • `[ext=mp4]`：限制视频扩展名为 `mp4`<br>• `[height<=1080]`：仅接受分辨率≤1080p<br>• `/best[ext=mp4]`：回退方案（兼容性保障） |
| `--merge-output-format mp4` | **强制合并后的输出格式为 `MP4`** | 避免生成临时音频文件（如 `.m4a`），直接输出最终 `.mp4` |
| `-o "%(playlist_title)s/%(playlist_index)02d-%(title)s.%(ext)s"` | **自定义文件名和路径**：<br>• 文件存储在播放列表标题命名的文件夹中<br>• 文件名格式：`序号-视频标题.mp4`（如 `01-Introduction.mp4`） | • `%(playlist_index)02d`：两位数序号（补零）<br>• `%(ext)s`：自动匹配输出格式（此处固定为 `mp4`） |
| `--cookies-from-browser chrome` | **使用 Chrome 浏览器的 Cookies** | 用于下载需要登录/年龄验证的视频（支持 `firefox`/`edge` 等） |
| `--retries 20` | **网络错误时最大重试次数** | 默认 10 次，此处设为 20 次（适合不稳定网络） |
| `--embed-metadata` | **将视频元数据（标题、作者等）写入文件** | 方便本地播放器显示信息 |
| `--download-archive archive.txt` | **记录已下载视频到 `archive.txt`** | 避免重复下载同一播放列表时重复抓取 |
| `"YOUTUBE_URL"` | **目标 YouTube 播放列表/视频链接** | 支持单视频或整个播放列表 |

* 分辨率控制

  * [height<=1080] 确保不下载 4K 等高分辨率视频（节省带宽和存储）。
  * 若需更高分辨率，可改为 [height<=2160] 或直接移除限制。

## 5. 常见问题
### Q1: 如何更新 yt-dlp？
```bash
yt-dlp -U
```
### Q2: 为什么下载速度慢？
启用多线程分片下载：
```bash
yt-dlp --concurrent-fragments 5 URL
```

### Q3: 如何绕过 429 Too Many Requests？
```bash
yt-dlp --extractor-args youtube:player-client=android URL
```


