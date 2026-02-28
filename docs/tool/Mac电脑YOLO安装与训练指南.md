# Mac电脑YOLO安装与训练指南
Mac电脑安装Yolo需要先安装以下软件：
1. Miniconda,创建虚拟环境，防止不同项目的库版本冲突。
2. PyTorch,深度学习的核心框架，负责底层的数学计算。
3. Ultralytics (YOLO),目前最流行的 YOLO 库，集成了模型、训练、预测等全套功能。
4. MPS (Metal),Apple 专用的加速框架，让训练跑在 M4 的 GPU 上而不是 CPU 上。

## 1. 安装环境
### 1.1 安装 Miniconda
```bash
brew install --cask miniconda #安装
conda init $(basename $SHELL)  #初始化，重启终端以激活 conda
```
### 1.2 conda创建虚拟环境

````bash
conda create -n yolo_env python=3.10 -y #创建yolo_env环境名
conda activate yolo_env #激活环境
````
>⚠️ 创建时会报错提示需要先同意服务条款,
```bash
1. conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
2. conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
```

#### 1.2.1 如果需要切换环境，需要使用以下命令
```bash
conda env list  # 带 * 的是当前激活的环境
conda activate 环境名 #切换环境
conda deactivate #退出当前环境
```
#### 1.2.2 （可选）关闭自动激活base环境
Miniconda安装后，每次打开终端都会自动进入`base`环境。如果你不喜欢这样，可以关闭自动激活：
```bash
conda config --set auto_activate_base false
conda config --set auto_activate_base true #如果想重新启用自动激活
```

### 1.3 安装 PyTorch 与 Ultralytics
这是最关键的一步，我们需要安装支持 Apple Silicon 的 PyTorch 版本。**需要先切换到`yolo_env`环境中再安装**。
```bash
pip install torch torchvision torchaudio # 安装 PyTorch

pip install ultralytics # 安装 YOLO 官方库
```
安装完成后可以通过以下命令验证mps是否可用和当前ultralytics版本
```bash
python -c "import torch; print('MPS可用：', torch.backends.mps.is_available())" #输出 MPS可用： True，恭喜！M4 GPU已经准备好为YOLO加速 

yolo version #获取ultralytics版本
```
获取的版本号是`Ultralytics`这个软件包的版本号，而 `YOLO11` 是模型架构的版本号。这两者并不冲突，`yolo version`可以理解为获取的是手机的系统版本（如 iOS 17.6）。而yolo11是模型架构版本，可以理解成手机中某个APP的版本。
> 关键点在于：从 YOLOv8 开始，Ultralytics 公司将后续的 YOLO 模型（包括 v8, v9, v10, v11 等）都统一放在同一个名为 ultralytics 的包中进行维护和分发。

## 2. 数据集准备
YOLO 需要特定格式的数据集（包含 `images` 和 `labels` 文件夹）。

**推荐方案：从 Roboflow 获取**

[Roboflow Universe](https://www.google.com.hk/search?q=https://universe.roboflow.com/search%3Fq%3Dplaying%2Bcards) 有很多现成的扑克牌数据集。

1. 搜索 "Playing Cards YOLOv11"。
2. 点击 Download Dataset，选择 YOLOv11 格式。
3. 下载并解压到你的工作目录下。

数据集结构示例：
```Plaintext
poker_data/
├── train/
│   ├── images/  (扑克牌照片)
│   └── labels/  (每张照片对应的 .txt 标注文件)
├── val/         (验证集)
└── data.yaml    (核心配置文件：记录了路径和类别)
```

## 3 训练模型
我们将使用 M4 芯片的 GPU (`device='mps'`) 进行训练。创建一个 Python 脚本 `train_poker.py` 或直接在终端输入:
```python
from ultralytics import YOLO
import torch

def train_poker():
    # 1. 检查 Mac 的 GPU (MPS) 是否可用
    if torch.backends.mps.is_available():
        device = "mps"
        print("检测到 M4 GPU 加速可用！")
    else:
        device = "cpu"
        print("未检测到 MPS，将使用 CPU 训练（速度较慢）")

    # 2. 加载模型
    # yolo11n.pt 是最新的轻量化模型，非常适合在 Mac Air 上运行
    model = YOLO("yolo11n.pt") 

    # 3. 开始训练
    model.train(
        data="data.yaml",    # 指定你的配置文件
        epochs=100,          # 训练轮数，新手建议先跑 50-100 轮
        imgsz=640,           # 输入图片大小
        batch=16,            # 批处理大小，M4 8G/16G 内存建议设为 16,16GB 内存设为 64 没问题
        workers=4,           # 建议先设为 4，Mac 上过高的 workers 有时会导致内存压力溢出
        device=device,       # 使用 M4 的 GPU 加速
        cache=True,          # 把图片加载到 16GB 内存中，这是 M4 最强的加速手段
        plots=True,          # 生成训练曲线图
        save=True,
        augment=True,        # 开启增强
        patience=30          # 如果连续 30 轮没有更好的 best.pt，就自动关机
    )

if __name__ == "__main__":
    train_poker()
```
环境切换到`yolo_dev`,运行`python train_poker.py`进行训练。

### 3.1 设置训练模型位置
在开始训练前通过`yolo setting`查看训练模型的保存位置，默认是在
```json
{
  "settings_version": "0.0.6",
  "datasets_dir": "/opt/homebrew/datasets",
  "weights_dir": "/opt/homebrew/weights",
  "runs_dir": "/opt/homebrew/runs",  //模型的保存位置
  "uuid": "c4e6a867cb39004559a17c72dde504459f319b5403bfd732d409c7eb34021577",
  "sync": true,
  "api_key": "",
  "openai_api_key": "",
  "clearml": true,
  "comet": true,
  "dvc": true,
  "hub": true,
  "mlflow": true,
  "neptune": true,
  "raytune": true,
  "tensorboard": false,
  "wandb": false,
  "vscode_msg": true,
  "openvino_msg": true
}
```
我们需要通过`yolo settings runs_dir="./runs"`命令设置训练模型在当前文件夹下面。如果找不到runs文件夹，在运行训练命令后看到`Logging results to /opt/homebrew/runs/detect/train`日志可以找到训练结果的文件夹。

**训练后的模型**
训练结束后，你会得到两个核心文件：
1. `runs/detect/train/weights/best.pt`：效果最好的模型（稍后测试就用它）。
2. `runs/detect/train/weights/last.pt`：最后一轮训练的模型。

### 3.2 模型中断后继续训练
在模型训练过程中，我们经常会因为待机或者种种原因造成中断，只要在通过以下脚本可以继续训练
```python 
from ultralytics import YOLO

# 这里的路径现在是相对于你项目根目录的相对路径
model = YOLO("runs/detect/train/weights/last.pt")

# 恢复训练并指定早停参数
model.train(
    resume=True,
    patience=30,      # 如果连续 30 轮没有更好的 best.pt，就自动关机
)
```
>📢 关键点： YOLO 通常在完成第一轮（Epoch 1）训练并进行第一次模型保存时，才会正式稳固地建立 `runs/detect/train/weights/last.pt` 目录结构,看到有这个文件建立中断后才能继续训练

**注意事项：**
1. **路径**：确保 `model` 指向的是 `last.pt` 而不是 `best.pt`。`last.pt` 记录了最后的训练状态（包括跑到了第几轮）。
2. **文件夹重名**：恢复训练时，YOLO 会自动识别并继续在之前的 `runs/detect/train/` 文件夹中写入数据。
3. **不要更改参数**：一旦开启 `resume=True`，你之前设置的 `epochs、imgsz` 等参数必须保持一致，不能中途修改。

### 3.3 设置观察训练过程
1. 进度条：你会看到每一轮 (Epoch) 的进度
2. 资源占用：你可以打开 Mac 的 “活动监视器” -> “GPU” 标签页，你会看到 GPU 使用率飙升，这说明 M4 正在全力工作
3. 结果输出：训练完成后，所有的结果（包括模型文件、准确率曲线图）都会自动保存在当前目录下的 `runs/detect/train/` 文件夹中
4. Mac电脑防止休眠：Mac 默认在合盖或长时间不操作时会休眠，这会中断训练。
   1. 方法：打开“系统设置” -> “锁定屏幕” -> “无操作时关闭显示器” 设为“从不”。
   2. 或者：在终端输入 `caffeinate` 命令，这会让 Mac 强制保持清醒。
5. 观察温度：如果 `s/it` 突然变慢（比如变成 `10s/it`），说明 CPU/GPU 因为过热降频了，拿个风扇吹一下或者让它休息会儿。

### 3.4 开启早停机制 (Early Stopping)
在 YOLO 训练中，**早停机制 (Early Stopping) **是一个非常智能的管家。它的核心逻辑是：如果模型在设定的轮数内（默认通常是 50 轮）准确率不再提升，它就会自动掐断训练，帮你节省电费和 M4 芯片的损耗。
你可以通过 `patience` 参数来调整这个轮数，比如设置 `patience=30` 就表示如果连续 30 轮没有更好的 `best.pt`，就自动关机。
```python 
from ultralytics import YOLO

# 加载断点
model = YOLO("runs/detect/train/weights/last.pt")

# 恢复训练并指定早停参数
model.train(
    resume=True,
    patience=30,      # 如果连续 30 轮没有更好的 best.pt，就自动关机
    project="./runs", # 确保路径正确
    name="detect/train"
)
```
观察 results.csv，等训练出 runs 文件夹后，打开里面的 results.csv。如果曲线还在往上走，说明还没喂饱，继续练。如果曲线变平了甚至往下掉了，说明已经到极限了。

## 4.测试与验证
训练完成后，模型会保存在 `runs/detect/train/weights/best.pt`。

预测单张图片:
```bash
yolo task=detect mode=predict model=runs/detect/train/weights/best.pt source='path/to/your_test_image.jpg' show=True
```

**实时摄像头测试**
这是最有趣的部分，用 M4 的摄像头看看它能否识别你手中的扑克牌：
```python
from ultralytics import YOLO

# 加载你训练好的模型
model = YOLO("runs/detect/train/weights/best.pt")

# 打开摄像头进行实时预测
model.predict(source="0", show=True, device="mps")
```

## 5. labels.cache的作用
在模型训练过程中，`train` 文件夹中产生`labels.cache`文件。它是 YOLO 为了大幅提升训练启动速度而自动生成的“速查表”。

### 5.1 它的作用
在正式开始训练之前，模型需要知道每一张图片对应的标签（Label）是否合法。
1. **扫描与校验**：它会检查你的 `.txt` 文件是否存在、格式是否正确（是否有 5 列数据）、类别 ID 是否超出范围，以及是否有损坏的图片。
2. **信息提取**：它会记录每张图片的尺寸（宽、高）和目标的数量。

### 5.2 什么时候该删掉它？
虽然它很方便，但如果你**修改了数据集**，它可能会变成你的绊脚石。

* **警告**：如果你修改了 `labels/*.txt` 里的标注内容（比如你通过脚本批量改了类别，或者删掉了一些框），但没有删除旧的 `labels.cache`，YOLO 可能会继续使用旧的缓存数据进行训练。

**建议在以下情况手动删除 `labels.cache`：**
1. 你往文件夹里新增或删除了图片/标签。
2. 你修改了 `.txt`文件里的内容。
3. 你怀疑标签加载有误（比如明明改了类别，但训练日志里显示的类别数量还是老的）。