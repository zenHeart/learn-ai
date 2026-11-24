---
title: Google Colab
description: 没有显卡、不想装环境，也能在浏览器里跑 Python 并按需用上 GPU。这一页带你从第一个单元格，一路做到把结果存进 Drive、管好密钥、在 notebook 里调通 Gemini API。
domain: product
tags:
  - colab
  - notebook
  - gpu
role: tutorial
pageClass: wide-figures readable-tables
---

# Google Colab

> **Colab 是 Google 托管的 Jupyter notebook 服务**：打开浏览器就能写 Python，不用装环境，还能按需切到 GPU / TPU。它替你解决的是「想学 AI、想跑模型，但本机没有显卡、也搞不定 Python 环境」。官方 FAQ 的定义是 a hosted Jupyter Notebook service that requires no setup to use，并免费提供计算资源，包括 GPU 和 TPU（[官方 FAQ](https://research.google.com/colaboratory/faq.html)，截至 2026-11-24）。

## 学完你能做什么

- 新建一个 notebook，运行第一个单元格，并知道运行结果为什么能被后面的单元格用到。
- 用几行 Python 判断当前运行时有没有 GPU，再把它切到 GPU 重跑一次。
- 装第三方包、上传文件、克隆 GitHub 仓库、挂载 Google Drive 读写文件。
- 把 API key 放进 Secrets，在 notebook 里调通 Gemini API，而不是把 key 明文写进单元格。
- 说清免费版「能用到什么程度、哪些东西不保证」，以及运行时断开后哪些会丢、哪些会留。
- 躲开最常见的坑：变量全丢、装完包要重启、大文件撑爆内存、分享时泄露信息。

## 先决条件

**写给谁**：会写前端代码、可能没写过 Python、**没用过 notebook**、本机没有 GPU 的工程师。不会 Python 也能照抄，本页每段代码都写了它在做什么。

| 要准备什么 | 说明 |
|---|---|
| 一个 Google 账号 | notebook 存在你的 Google Drive 里（官方 FAQ），要用到 Drive 就得登录 |
| 一个现代浏览器 | 官方 FAQ：Colab works with most major browsers, and is most thoroughly tested with the latest versions of Chrome, Firefox and Safari. |
| 一个 Gemini API key（可选） | 只在「调 Gemini API」和端到端例子里用到。在 [AI Studio](https://aistudio.google.com/app/apikey) 创建，背景见 [AI Studio](./ai-studio) |

**关于代码语言**：本站示例优先用 TypeScript，但 notebook 里跑的是 Python，所以这一页的代码全部是 Python 单元格，整格复制即可。

**这一页不教什么（非目标）**：

- **不教 Python 基础**。变量、函数、`import` 请另找入门材料。
- **不教机器学习理论**。模型是什么、训练是怎么回事，见站内的[模型生命周期导览](/zh/tech/01-model-lifecycle/)。
- **不教 BigQuery、Vertex AI 的完整工作流**。那是 Colab Enterprise 与 Google Cloud 的范围，官方入口见 [Colab Enterprise 文档](https://docs.cloud.google.com/colab/docs)。

## 核心概念

### 先划清边界：它是什么，不是什么

| 它是 | 它不是 |
|---|---|
| 浏览器里的托管 Jupyter notebook，无需安装（官方 FAQ：requires no setup to use） | IDE 的替代品。官方 FAQ 说它 prioritizes interactive compute，尤其适合机器学习、数据科学与教学；**本页据此不建议在里面做大工程** |
| 一个免费的 Python 环境，带受限制的 GPU / TPU 访问 | 免费且不限量的 GPU。官方 FAQ：Colab resources are not guaranteed and not unlimited |
| 默认把 notebook 和单元格输出存进你的 Google Drive | 一个离线、本地的私有环境。数据默认落在 Google 的托管服务里，详见「安全与隐私」 |

### 术语表

| 术语 | 一句话解释 | 为什么需要 |
|---|---|---|
| **notebook**（笔记本） | 把「说明文字、代码、运行结果」放在一起的一份文档 | 学 AI 时，解释、代码、输出要挨着看才读得懂 |
| **cell**（单元格） | notebook 里的一小块内容，分代码单元格和文本单元格 | 一次只跑一小段，出错时知道是哪一段 |
| **runtime**（运行时） | 云端分给你的一台临时虚拟机 | 代码不跑在本机，跑在这台机器上 |
| **kernel**（内核） | 运行时里真正执行你 Python 代码的后台进程 | 变量都存在它里面 |
| **CPU / GPU / TPU 运行时** | 同一台虚拟机，配上不同的计算硬件 | 训练模型、批量推理时 GPU 比 CPU 快得多 |
| **魔法命令**（magic） | 以 `%` 或 `%%` 开头、改变单元格执行方式的简写 | 计时、装包、写文件，一行就够 |
| **`!` 前缀** | 在单元格里直接执行一条 shell 命令 | 克隆仓库、看目录、调用系统工具 |
| **表单参数** `#@param` | 把代码里的一个变量变成界面上的输入框 | 改参数不用改代码 |
| **Google Drive 挂载** | 把你的云盘当成运行时里的一个文件夹 | 运行时断了，文件还在 |
| **临时磁盘** | 运行时自带的本地硬盘 | 读写快，但运行时回收后清空 |
| **compute units**（计算单元） | 付费版的「算力预付额度」 | 决定你能用多久、用多好的机器 |
| **Secrets**（密钥） | Colab 提供的凭据存放处，专门放 API key 这类东西 | key 不出现在代码和输出里 |
| **本地运行时**（local runtime） | 让 Colab 界面连到你电脑上的 Jupyter | 代码在本机跑，数据不出你的电脑 |

### notebook 与单元格

官方概览 notebook 的定义：A notebook is a list of cells. Cells contain either explanatory text or executable code and its output.

- **代码单元格**（code cell）放 Python 代码，运行后单元格下方出现输出；**文本单元格**（text cell）放 Markdown 说明，官方概览 notebook 说 You can double-click to edit this cell.

notebook 不是静态网页。官方 Welcome notebook 说它是 an interactive environment ... that lets you write and execute code：同一个 notebook 发给同事，对方可以改参数、重跑、马上看到不同结果。

<!-- TODO: 待核实 —— 运行后单元格左侧「[ ]」里是否显示执行序号。实测界面只看到未运行时的「[ ]」占位；官方概览 notebook 未描述序号样式 -->

### 运行时：代码到底跑在哪里

官方 FAQ 的原话：Code is executed in a virtual machine private to your account. Virtual machines are deleted when idle for a while, and have a maximum lifetime enforced by the Colab service.

拆开看是三件事：**它是云端的一台虚拟机**（官方 Welcome notebook：Colab notebooks execute code on Google's cloud servers），**它只属于你这个账号**，**它是临时的**（空闲会被回收，也有最长存活时间）。运行时没了，哪些东西跟着没了：

| 会丢（存在运行时里） | 会留（存在 notebook 或 Drive 里） |
|---|---|
| 所有变量、已经 import 的模块、训练到一半的模型 | 单元格里的代码和文字 |
| 用 pip 装的包（官方 FAQ：any custom files and libraries that you've setup 属于虚拟机的一部分） | 已保存的单元格输出 |
| 上传到临时磁盘的文件 | Drive 里的文件 |
| Drive 的挂载状态（连接新运行时后要重新授权） | GitHub 上的 notebook 副本 |

notebook 本身存在哪：官方 FAQ 说 Colab notebooks are stored in Google Drive, or can be loaded from GitHub.

### 内核

**kernel（内核）**是运行时里那个真正逐行执行你 Python 代码的后台进程。官方 Welcome notebook 说 Variables that you define in one cell can later be used in other cells，这些变量就保存在内核的内存里。官方 FAQ 还说明 Colab 只支持 Python：Colab focuses on supporting Python and its ecosystem of third-party tools.

所以有两种「重来」，范围不一样：

- **重启内核**（Runtime 菜单里的「重启会话」）：内存清空，虚拟机和磁盘上的文件还在。
- **删除运行时**（**Runtime > Disconnect and delete runtime**）：官方 FAQ 说这会把分配给你的虚拟机恢复原状。

<!-- TODO: 待核实 —— kernel 的官方定义措辞，以及「重启会话清空变量但保留磁盘文件」。查过 Colab FAQ（只提到 Jupyter kernels）与 jupyter-client 文档 kernels.html（未找到定义句）；正文里的解释属于通用知识，重启范围属社区经验，官方未确认 -->

### CPU、GPU、TPU 运行时

官方 FAQ：Colab offers optional accelerated compute environments, including GPU and TPU。具体有哪几种硬件，官方的说法是会随时间变化（vary over time），不承诺固定型号。关于免费版的 GPU，官方 `pro.ipynb` 的原话是：The free of charge version of Colab grants access to Nvidia's T4 GPUs subject to quota restrictions and availability. 拿不拿得到，取决于当时的配额和余量。用不上 GPU 时要切回 CPU。官方 FAQ 专门提醒：Executing code in a GPU or TPU runtime does not automatically mean that the GPU or TPU is being utilized.

### 魔法命令与 `!` 前缀

官方概览 notebook：Colaboratory shares the notion of magics from Jupyter. There are shorthand annotations that change how a cell's text is executed. 同一份 notebook 也说明：Execute any other process using `!` with string interpolation from python variables, and note the result can be assigned to a variable.

| 写法 | 作用 | 出处 |
|---|---|---|
| `%pip install 包名` | 在当前内核里用 pip 装包 | [colabtools 源码](https://github.com/googlecolab/colabtools/blob/main/google/colab/_installation_commands.py) |
| `%timeit 语句` | 用 timeit 模块给一条语句计时 | [IPython 文档](https://ipython.readthedocs.io/en/stable/interactive/magics.html) |
| `%%time` | 给整个单元格计时，打印 CPU 时间和墙钟时间 | 同上 |
| `%%writefile 文件名` | 把整个单元格的内容写进一个文件 | 同上 |
| `!命令 {变量}` | 执行一条 shell 命令，花括号里可以引用 Python 变量 | 官方概览 notebook |

`%` 开头叫**行魔法**，管一行；`%%` 开头叫**单元格魔法**，管整格，必须写在单元格第一行。

### 表单参数 `#@param`

官方 [Forms notebook](https://colab.research.google.com/notebooks/forms.ipynb)：Forms provide an easy way to parameterize code. From a code cell, select **Insert → Add form field**. When you change the value in a form, the corresponding value in the code will change.

```python
# @title 调参示例 { run: "auto" }
learning_rate = 0.01  # @param {type:"number"}
optimizer = "adam"    # @param ["adam", "sgd", "rmsprop"]

print(f"learning_rate={learning_rate}, optimizer={optimizer}")
```

- **会看到**：单元格变成一个表单，有一个数字框和一个下拉框。`{ run: "auto" }` 表示改动取值后自动重新运行。
- **为什么**：把学习率、文件路径这类要反复试的参数暴露出来，改参数不用改代码。

### Google Drive 挂载与临时磁盘

官方 `io.ipynb` 列了三种访问 Drive 的方式，最常用的是第一种：Mounting your Google Drive in the runtime's virtual machine。挂载后，Drive 在运行时里就是一个普通文件夹，用 `open()` 就能读写。临时磁盘是运行时自带的本地硬盘，读写比挂载的 Drive 快，但运行时回收后清空。官方 FAQ 建议：To maximize performance, reduce read/writes from Drive.

### compute units 与本地运行时

compute units 是 Colab 付费版的通用计量单位。官方 FAQ：Colab Pro, Pro+, and Pay As You Go offer you increased compute availability based on your compute unit balance。余额用尽后，付费用户回落到免费版的规则（截至 2026-11-24 官方 FAQ）。各档每月给多少、多少钱，见「费用与限制」。本地运行时是另一条路。官方说明页：Colab lets you connect to a local runtime. This allows you to execute code on your local hardware. 界面还是 Colab，代码却在你的电脑上跑。做法见「连到自己电脑上的 Jupyter」。

## 它是怎么工作的

读到这里你可能还有一个疑问：点下「运行」之后，代码到底经过了哪些地方？为什么隔一会儿回来，变量没了、Drive 里的文件却还在？带着这两个问题看下面的图。

<DocDiagram src="/diagrams/google-colab-runtime.svg" alt="这张图回答两个问题：你的代码到底跑在哪里；运行时断开之后，哪些东西还在，哪些没了。实线表示断开后仍然保留的关系，虚线表示断开后会消失的部分。左边是浏览器里的 notebook 界面，在你的电脑上，里面有单元格、输出和左侧栏，notebook 内容是在这里编辑的。中间上方是两个持久的位置：Google Drive 存放 notebook 文件与数据文件，GitHub 存放 notebook 副本与克隆下来的仓库。界面与 Drive 之间、界面与 GitHub 之间是实线双向箭头，断开后仍然保留。中间下方是云端的运行时虚拟机，代码实际运行在这里。它的算力类型可以是 CPU，也可以按需切换到 GPU 或 TPU，界面可以切换运行时类型。运行时里有三样东西在断开后会消失，用玫红色虚线框标出：内核进程与内存变量，例如变量和已导入的模块；临时磁盘，例如已安装的包和上传到运行时的文件；以及挂载状态。界面到运行时的连接也是虚线：界面把单元格代码发往运行时，运行时把输出送回界面。运行时经授权挂载后与 Drive 双向读写，这是虚线，因为断开后挂载失效。运行时可以从 GitHub 拉取 notebook 或仓库。右边是你电脑上的文件，原件留在你的电脑；上传到运行时的那份副本在临时磁盘上，断开后消失。Secrets 在你授权后把密钥交给运行时里的代码。本图省略了 Google 内部的基础设施、任何免费额度的具体数字，以及具体版本里才有的按钮与菜单名。" :width="1020" />

> **图的依据：** 「代码运行在一台云端虚拟机里」、单元格与输出、运行时类型切换，来自官方 [FAQ](https://research.google.com/colaboratory/faq.html)与官方概览 notebook [intro.ipynb](https://colab.research.google.com/notebooks/intro.ipynb)、[basic_features_overview.ipynb](https://colab.research.google.com/notebooks/basic_features_overview.ipynb)；挂载 Drive、读写 GitHub、上传文件与使用密钥来自官方 [io.ipynb](https://colab.research.google.com/notebooks/io.ipynb)（截至 2026-11-24）。图中保留了界面的三个部分、运行时里三样「断开后消失」的东西，以及四个外部位置各自的方向；省略了 Google 内部的基础设施、任何免费额度的具体数字，以及具体版本里才有的按钮与菜单名。实线是断开后仍然保留的关系，虚线是断开后会消失的连接与内容。

图分三个区域。**左边是浏览器里的界面**：单元格、输出、左侧栏都在这里，它只负责编辑和显示。**中间是运行时**：云端的一台虚拟机，里面有执行代码的内核、内存和一块临时磁盘，可以配 CPU，也可以按需换成 GPU 或 TPU；它的上方是 Google Drive 和 GitHub，这两个位置在运行时断开后仍然保留。**右边是另外两个外部位置**：Secrets 和你电脑上的文件。

关键在线型。**只有连到 Drive 和 GitHub 的关系会在运行时断开后保留**：官方 FAQ 说虚拟机空闲时会被删除，而 notebook 存在 Drive、可以从 GitHub 加载。内存里的变量、临时磁盘上的文件、装好的包，都随虚拟机一起消失。官方 FAQ 的提醒是 The virtual machine you're using, including any custom files and libraries that you've setup, will not be shared，所以要在 notebook 里留好安装和加载的单元格。

所以点一次「运行」，实际发生的是：浏览器把这格代码发给运行时里的内核，内核执行后把输出送回浏览器，显示在这格下方，变量则留在内核的内存里供后面的单元格使用。运行时被回收时，变量全没了，代码还在 notebook 里，随时能重跑。

## 10 分钟跑通第一件事

目标：新建 notebook，跑一个单元格，再确认有没有 GPU。

### 新建 notebook 并运行第一个单元格

**第 1 步：新建。** 打开 [colab.research.google.com](https://colab.research.google.com/)，登录 Google 账号，从 **File**（「文件」）菜单新建一个 notebook。官方 Welcome notebook 还给了直达写法：在地址后面加 `#create=true`。

- **会看到**：一个空 notebook。顶部是菜单栏，工具栏上有 **+ CODE**、**+ TEXT** 两个按钮，右上角是 **Share**（「分享」）。
- **为什么**：notebook 存在你的 Google Drive 里（官方 Welcome notebook），所以要先登录。

**第 2 步：粘贴代码。** 点 **+ CODE** 加一个代码单元格，粘进下面两行。

```python
message = "Hello, Colab"
print(message.upper())   # upper() 把字符串转成大写
```

**第 3 步：运行。** 点单元格左侧的 **Play icon**（「运行单元」），或按 `Shift+Enter`。

- **会看到**：第一次运行会先连上运行时，工具栏那个按钮变成 **CONNECTED**；随后单元格下方出现 `HELLO, COLAB`。
- **为什么**：代码在云端的运行时里执行，不在你的电脑上。按钮名和快捷键都出自官方概览 notebook，它还列了另外两种运行方式：`Cmd/Ctrl+Enter` 运行后停在原格，`Alt+Enter` 运行后在下方插入新格。

### 让变量跨单元格使用

```python
# 单元格 A：定义一个变量
seconds_in_a_day = 24 * 60 * 60
seconds_in_a_day        # 单元格最后一行的表达式会自动显示出来
```

```python
# 单元格 B：直接使用单元格 A 里的变量
seconds_in_a_week = 7 * seconds_in_a_day
print(f"一周有 {seconds_in_a_week} 秒")
```

按 A、B 的顺序运行，预期会看到 `86400` 和 `一周有 604800 秒`。在新运行时里先单独运行 B 会报 `NameError`，因为变量还没有定义。这就是后面「常见坑」里说的执行顺序问题。

### 检查当前运行时有没有 GPU

```python
import shutil
import subprocess

# nvidia-smi 是 NVIDIA 显卡自带的命令行工具；没有可用 GPU 时，它要么不存在，要么报错
if shutil.which("nvidia-smi") is None:
    print("没有连上 GPU：运行时里找不到 nvidia-smi")
else:
    result = subprocess.run(["nvidia-smi"], capture_output=True, text=True)
    if result.returncode != 0:
        print("没有连上 GPU：nvidia-smi 无法与显卡驱动通信")
    else:
        print("已连上 GPU，显卡信息如下：")
        print(result.stdout)
```

新 notebook 默认不带 GPU，预期会看到以「没有连上 GPU」开头的一行。

### 把运行时切到 GPU

1. 打开 **Runtime**（「代码执行程序」）菜单，选 **Change runtime type**（「更改运行时类型」）。
2. 在对话框里把 **Hardware accelerator**（硬件加速器）选成 GPU，保存。
3. 回到上面的单元格再运行一次。预期会看到以「已连上 GPU」开头的内容，后面跟着一段显卡信息表。

菜单路径出自官方 FAQ（Choose **Runtime > Change Runtime Type**）和官方 `pro.ipynb`；下拉框的名字出自官方 `gpu.ipynb`（select GPU from the Hardware Accelerator drop-down）。切换之后要重新执行单元格，这也是 `gpu.ipynb` 的指引。

用完记得切回去。官方 FAQ 的建议是：**Runtime > Change Runtime Type**，把 **Hardware Accelerator** 设成 **None**，理由是 avoid opting for GPUs or extra memory when it is not needed for your work.

## 日常用法

每个小节都按「做什么、会看到什么、为什么」来写，代码都是完整的单元格。

### 1. 安装第三方包

官方片段 notebook 的说法是：To import a library that's not in Colaboratory by default, you can use `!pip install` or `!apt-get install`. 本页推荐用 `%pip`：

```python
# %pip 是内核提供的行魔法：保证装到「正在执行你代码的这个 Python」里
%pip install -q pandas matplotlib scikit-learn
```

- **会看到**：几行 pip 的安装日志。已经装过的包会直接跳过。
- **为什么用 `%pip` 而不是 `!pip`**：`!pip` 把这行交给 shell，由 shell 找到 `pip`；`%pip` 由内核执行。Google 官方源码 `colabtools` 给 `%pip` 的注释是 Install a package in the current kernel using pip，官方 Gemini cookbook 的快速开始也用它。在 Colab 里两种写法最终执行的是同一条 `pip` 命令，所以官方片段两种都认；`%pip` 的语义更明确。

**装完包的「重启」警告。** `colabtools` 源码里有一个专门的提醒：如果你安装的包已经被 import 进内存，Colab 会显示 a warning + restart button。看到它就点警告里的重启按钮（对应 Runtime 菜单的「重启会话」），然后从上往下重新运行需要的单元格。最省事的做法是把安装单元格放在 notebook 最上面。

### 2. 挂载 Drive 并把结果存进去

```python
from google.colab import drive

# 第一次挂载会弹出授权窗口：按提示登录并允许，单元格会等你操作完
drive.mount("/content/drive")
```

- **会看到**：授权流程。官方 `io.ipynb` 的说法是 using an authorization code。完成后，写进去的文件会出现在 drive.google.com。
- **为什么**：运行时会被回收，Drive 不会。模型、清洗好的数据、实验结果，都要落到 Drive 才算保住。

```python
import json
from pathlib import Path
work_dir = Path("/content/drive/My Drive/colab-out")   # 注意 "My Drive" 中间有空格
work_dir.mkdir(parents=True, exist_ok=True)             # 文件夹不存在就创建，已存在也不报错

result = {"task": "colab-demo", "answer": 86400}
out_file = work_dir / "result.json"
out_file.write_text(json.dumps(result, ensure_ascii=False), encoding="utf-8")
print(f"已保存到 {out_file}")

drive.flush_and_unmount()   # 结束前把写入刷到 Drive 并卸载（官方 io.ipynb 用的就是这个调用）
```

两条来自官方 FAQ 的注意点：**别在「My Drive」根目录堆文件**，大约一万个条目就可能导致挂载失败，官方建议收进子文件夹；**大数据先打包再解压**，官方的建议是把数据以压缩包形式从 Drive 拷到运行时，在运行时本地解压，而不是在挂载的 Drive 目录里做大量小读写。

### 3. 读取数据：上传小文件、克隆 GitHub 仓库、读 Drive 里的 CSV

**上传小文件。** 官方 `io.ipynb` 说 `files.upload` 返回一个字典，键是文件名，值是文件内容：

```python
from google.colab import files

uploaded = files.upload()   # 弹出文件选择框；上传完成前，这一格会一直等着

if not uploaded:
    print("没有选择文件。")
for name, data in uploaded.items():
    print(f"已上传 {name}（{len(data)} 字节），现在可以用 open() 读取")
```

- **会看到**：一个文件选择框。上传后输出文件名和字节数，文件保存在运行时的当前工作目录。运行时回收后文件就没了，要留住的改用 Drive。

**从 GitHub 克隆仓库。** 换成 shell 命令更顺手。官方概览 notebook 说明 `!` 可以执行任何其他程序，并支持用花括号引用 Python 变量：

```python
repo_url = "https://github.com/googlecolab/colabtools.git"

!git clone --depth 1 {repo_url}   # --depth 1 只取最新一次提交，体积小、速度快
```

再跑一次会提示目录已存在，这是正常的。GitHub 上的 notebook 也能直接在 Colab 里打开，见「保存与分享」。

**读 Drive 里的 CSV。** 前提是已经挂载了 Drive：

```python
import pandas as pd
from pathlib import Path
csv_path = Path("/content/drive/My Drive/colab-out/data.csv")
try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    print(f"找不到 {csv_path}。请先把它放进 Drive 的 colab-out 文件夹。")
    df = None

if df is not None:
    print(f"共 {len(df)} 行")
    display(df.head())     # head() 取前 5 行，display() 把表格渲染出来
```

- **会看到**：行数和一张前 5 行的表格；文件不存在时是一句提示，而不是整格崩掉。

### 4. 测一段代码的耗时

**给整格计时，用 `%%time`。** 它必须写在单元格第一行：

```python
%%time
import time
time.sleep(0.5)   # 模拟一段耗时操作
```

IPython 文档对 `%time` 的说明是 The CPU and wall clock times are printed，所以输出里会多出 CPU 时间（CPU times）和墙钟时间（Wall time）两项。两个数差得多，说明时间花在等待上，而不是计算上。

**要更稳的数字，用 `%timeit`。** 它把语句重复跑多次再统计：

```python
%timeit sum(range(1_000_000))
```

IPython 文档里的输出样式是 `... per loop (mean ± std. dev. of 7 runs, ... loops each)`，带平均值和标准差。跑一次的 `%%time` 适合看量级，`%timeit` 适合比较两种写法。

**把单元格存成文件，用 `%%writefile`。** IPython 文档：Write the contents of the cell to a file.

```python
%%writefile greet.py
def greet(name: str) -> str:
    return f"你好，{name}"


print(greet("Colab"))
```

再开一格运行 `!python greet.py`，预期会看到 `你好，Colab`。写在运行时里的文件同样会随运行时消失；想保留，把文件名换成 Drive 挂载路径下的位置。

### 5. 把 API key 放进 Secrets

**NEVER 把 key 明文写进单元格。** 分享 notebook 时，单元格里的全部内容都会被对方看到。官方 Gemini API 认证演练的第一句就是：Remember to treat your API key like a password.

做法（步骤出自[官方认证演练](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Authentication.ipynb)）：

1. 打开 notebook，点左侧栏的 **Secrets**（钥匙图标；中文界面叫「Secret」）。
2. 新建一个 Secret，名字填 `GEMINI_API_KEY`。
3. 把 API key 粘进 `Value` 输入框。
4. 打开旁边的访问开关，允许笔记本使用这个 Secret。

```python
from google.colab import userdata

try:
    api_key = userdata.get("GEMINI_API_KEY")
    print(f"已读到密钥，长度 {len(api_key)}")   # 只看长度，确认读到了；不打印内容
except userdata.SecretNotFoundError:
    print("没有名为 GEMINI_API_KEY 的 Secret。请到左侧 Secret 面板新建。")
    raise
except userdata.NotebookAccessError:
    print("这个笔记本还没有 GEMINI_API_KEY 的访问权限。请到 Secret 面板打开访问开关。")
    raise
```

- **会看到**：`已读到密钥，长度 …`；没配置好时是一句说明加原始异常。
- **为什么**：三个异常类都来自 `colabtools` 的 `userdata.py`。`userdata.get` 是在运行时向 Colab 界面请求密钥，notebook 文件里只有 Secret 的名字，没有它的值。

### 6. 在 notebook 里调 Gemini API

模型和参数的概念在 [AI Studio](./ai-studio) 讲，这里只说在 notebook 里怎么调。写法跟随[官方快速开始](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb)，`gemini-4-hydrogen` 是它当天的默认模型（截至 2026-11-24），用之前到[官方模型清单](https://ai.google.dev/gemini-api/docs/models)核对。先装 SDK，单独放一格：

```python
%pip install -U -q "google-genai>=2.30.0"
```

```python
from google import genai
from google.colab import userdata
from google.genai import errors

MODEL_ID = "gemini-4-hydrogen"   # 模型名更新很快，用之前回官方模型清单核对


def ask_gemini(question: str, system_instruction: str = "你是耐心的技术导师，用中文简短回答。") -> str:
    """调用 Gemini API。失败时返回可读的提示，不让整个 notebook 停下来。"""
    try:
        api_key = userdata.get("GEMINI_API_KEY")
    except userdata.SecretNotFoundError:
        return "缺少密钥：请先在 Secrets 里新建 GEMINI_API_KEY。"
    except userdata.NotebookAccessError:
        return "缺少权限：请在 Secret 面板打开 GEMINI_API_KEY 的访问开关。"
    client = genai.Client(api_key=api_key)
    try:
        interaction = client.interactions.create(
            model=MODEL_ID,
            input=question,
            system_instruction=system_instruction,
        )
        return interaction.output_text
    except errors.APIError as e:          # 模型服务返回的错误：key 无效、额度用尽、模型名不对等
        return f"Gemini API 调用失败（code={e.code}）：{e.message}"


print(ask_gemini("用一句话解释 notebook 里的单元格是什么。"))
```

- **会看到**：一段中文回答；出错时是以「缺少密钥」「缺少权限」或「Gemini API 调用失败」开头的提示。
- **为什么这样写**：密钥相关的两类异常由 `userdata` 定义，API 错误用 SDK 的 `errors.APIError` 捕获，它带 `code` 和 `message` 两个字段（[SDK README](https://github.com/googleapis/python-genai/blob/main/README.md)）。

### 7. 端到端例子：给一批用户反馈做嵌入并可视化

**场景**：你是一个 Web 应用的前端，手里有一份用户反馈 CSV，想按意思自动归类。「嵌入」就是把每条文字变成一串数字（向量），意思相近的向量距离也近，概念见站内的[嵌入与检索](/zh/tech/04-grounding/embeddings-retrieval)。

整段代码不依赖 GPU：有 `GEMINI_API_KEY` 时用 Gemini 的嵌入模型，没有就降级成本地的 TF-IDF 统计向量。这样分享给没有 key 的同事，它照样跑得完。

**第 1 格：生成一份 CSV。** 有自己的数据时，换成上传或 Drive 里的文件即可。

```python
import csv

feedback = {
    "performance": ["首页要等十几秒才加载出来", "列表页滚动很卡，掉帧严重", "图片太多，页面打开特别慢"],
    "login": ["点登录按钮没有反应", "输入密码以后一直转圈，进不去", "退出之后再登录，提示账号不存在"],
    "payment": ["付款成功了，但是订单状态没变", "结算页报错，无法完成支付", "优惠券在结账时用不了"],
    "praise": ["新界面比以前清爽多了", "客服回复很快，问题当场解决", "深色模式很好看，希望一直保留"],
}
rows = [{"id": i, "topic": topic, "text": text} for i, (topic, text) in enumerate(
    (topic, text) for topic, texts in feedback.items() for text in texts)]

with open("feedback.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "topic", "text"])
    writer.writeheader()
    writer.writerows(rows)

print(f"已写入 feedback.csv，共 {len(rows)} 行")
```

**第 2 格：装依赖。** numpy、pandas、matplotlib 在官方示例 notebook 里都是直接 import 的；scikit-learn 这里显式装一次，已装过会跳过。

```python
%pip install -q scikit-learn
```

**第 3 格：读 CSV，拿到向量。**

```python
import numpy as np
import pandas as pd

df = pd.read_csv("feedback.csv", encoding="utf-8")
texts = df["text"].tolist()


def embed_with_gemini(items):
    """用 Gemini 的嵌入模型把文本变成向量；失败时抛出异常，交给调用方降级。"""
    from google import genai
    from google.colab import userdata
    client = genai.Client(api_key=userdata.get("GEMINI_API_KEY"))
    response = client.models.embed_content(model="gemini-embedding-2", contents=items)
    return np.array([item.values for item in response.embeddings], dtype=float)


def embed_with_tfidf(items):
    """降级方案：按字符切 n-gram 统计词频，不需要 key，也不需要联网。"""
    from sklearn.feature_extraction.text import TfidfVectorizer
    return TfidfVectorizer(analyzer="char", ngram_range=(2, 4)).fit_transform(items).toarray()


try:
    vectors = embed_with_gemini(texts)
    print(f"使用 Gemini 嵌入，向量形状 {vectors.shape}")
except Exception as e:   # 没有 key、没有网络或额度用尽时，退到本地方案
    print(f"Gemini 嵌入不可用（{type(e).__name__}），改用 TF-IDF。")
    vectors = embed_with_tfidf(texts)
    print(f"使用 TF-IDF，向量形状 {vectors.shape}")
```

<!-- TODO: 待核实 —— embed_content 返回对象里向量字段的名字（embeddings / values）。SDK README 只给了调用示例，没有展示返回值结构；本页按 SDK 的通用结构书写，未在 Colab 里实跑。字段名若有出入，代码会自动降级到 TF-IDF -->

**第 4 格：算相似度，画散点图。**

```python
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
# 余弦相似度：先把每个向量归一化成单位长度，再做矩阵乘法
norms = np.linalg.norm(vectors, axis=1, keepdims=True)
normed = vectors / np.clip(norms, 1e-12, None)   # clip 防止除以 0
similarity = normed @ normed.T
query = 4   # 第 4 条是登录相关的反馈
ranked = np.argsort(-similarity[query])          # 按相似度从高到低排序
print(f"与第 {query} 条最相近的 3 条：")
for i in ranked[1:4]:                            # 跳过它自己
    print(f"  [{i}] 相似度 {similarity[query, i]:.3f}  {texts[i]}")

# 把高维向量压到二维。标注用序号，避免图里的中文显示成方块
points = PCA(n_components=2).fit_transform(vectors)
plt.figure(figsize=(8, 6))
plt.scatter(points[:, 0], points[:, 1])
for i, (x, y) in enumerate(points):
    plt.annotate(str(i), (x, y))
plt.title("Feedback embeddings (2D by PCA)")
plt.show()
```

- **会看到**：与第 4 条最相近的 3 条反馈及其相似度，和一张 12 个点的散点图。
- **看点**：打印出来的 3 条是不是同为登录问题（编号 3、4、5）；图里同一个主题的点是否落在同一片。想保存向量，按第 2 节写进 Drive。

### 8. 保存与分享

| 目的 | 怎么做 | 结果在哪 |
|---|---|---|
| 保存 | **File > Save**（官方概览 notebook） | Google Drive |
| 复制一份再改 | **File > Make a Copy** | Google Drive |
| 下载文件 | 官方 FAQ：可以从 Colab 的 File 菜单下载；所有 notebook 都是开源的 Jupyter 格式（`.ipynb`） | 你的电脑 |
| 存到 GitHub | **File > Save a copy to GitHub**，需要授权 Colab 向你的仓库提交 | GitHub 仓库 |
| 打开 GitHub 上的 notebook | 把 GitHub 地址里的 `github.com` 换成 `colab.research.google.com/github` | 可编辑的新副本，运行和修改都不会覆盖原文件 |
| 发给同事 | 点右上角 **Share**（「分享笔记本」） | 一条链接，权限规则和 Google 文档、表格一样 |

**分享链接之前，想清楚对方能看到什么。** 上表的路径出自官方 FAQ、官方概览 notebook 和[官方 GitHub 演示 notebook](https://colab.research.google.com/github/googlecolab/colabtools/blob/main/notebooks/colab-github-demo.ipynb)。官方 FAQ 说得很直接：If you choose to share a notebook, the full contents of your notebook (text, code, output, and comments) will be shared. 对方拿到的是文字、代码、**输出**和评论的全集；你的虚拟机、里面的文件和装好的库不会共享。不想带出输出时，勾选 **Edit > Notebook settings > Omit code cell output when saving this notebook**（官方 FAQ）。官方 FAQ 还建议在 notebook 里留好安装和加载依赖的单元格，因为对方连到的是一台全新的运行时。

### 9. 连到自己电脑上的 Jupyter

适用场景：数据不能离开你的电脑，或者你想用自己的显卡。先读官方的安全提示：With a local connection, the code you execute can read, write, and delete files on your computer.

**第 1 步：在本机启动 Jupyter。** 官方说明页给的命令要多带几个参数，用来信任来自 Colab 前端的 WebSocket 连接：

```bash
jupyter notebook \
  --NotebookApp.allow_origin='https://colab.research.google.com' \
  --port=8888 \
  --NotebookApp.port_retries=0 \
  --NotebookApp.allow_credentials=True
```

启动后终端会打印一个用于认证的后端 URL（官方 Docker 示例里形如 `http://127.0.0.1:9000/?token=...`），复制备用。官方也提供了另一种方式：用 Colab 的 Docker 镜像启动，它预装了托管运行时里的包，仅支持 linux/amd64。

**第 2 步：在 Colab 里连接。** 官方说明页：click the "Connect" button and select "Connect to local runtime..."，在对话框里粘贴刚才的 URL，点 **Connect**。

两条限制要知道：官方 FAQ 说 Google Drive mounting on the runtime filesystem will not work with these approaches，也就是本地运行时不能挂载 Drive；分享 notebook 时，你本机的运行时不会被共享，对方打开时连的是 Colab 的托管运行时（官方说明页）。

### 10. 用 Colab 的 AI 辅助功能

Colab 内置了 Gemini 驱动的 AI 功能。官方 FAQ 的入口描述：click the Gemini spark icon in the notebook footer to open the main chat panel. 输入代码时还会看到 AI 自动补全。

| 你想让 AI 做什么 | 官方 FAQ 里的说法 |
|---|---|
| 写一段函数、样板代码，或跨单元格重构 | Generate and transform Code |
| 报错了，想知道怎么改 | Fix errors intelligently：Colab will iteratively suggest fixes in a diff view for your review |
| 给一个目标，让它自己分析数据 | Execute autonomous agentic flows：agent 会先生成计划，你确认后再执行 |
| 上传 CSV、JSON、Excel 让它分析并画图 | Analyze your data |

三点来自官方 FAQ 的提醒：**可用条件**是账号年龄满 18 岁并且位于支持的地区，看不到入口时用 **Help > Send feedback** 反馈；**AI 的权限**默认受限，原话是 By default, Colab AI does not have access to your Google Drive files or user secrets；**生成的代码要自己把关**，官方原话是 you are responsible for your use of the code.

Data Science Agent 的流程，官方开发者博客概括为四步：新建空白 notebook、上传数据、在 Gemini 侧栏描述目标、看它生成可运行的 notebook（[官方文章](https://developers.googleblog.com/en/data-science-agent-in-colab-with-gemini)，2025-03-03）。Colab Enterprise 的文档还给出了按钮级的名字，如 **Fix error**、**Explain error**、**Generate code**、**Explain code**（[Gemini in Colab Enterprise](https://docs.cloud.google.com/colab/docs/gemini-in-colab/overview)）。那是企业版的文档，你界面上的按钮以实际所见为准。

## 费用与限制

**免费能用，但资源不保证。** 这是官方 FAQ 的原话：Colab resources are not guaranteed and not unlimited, and usage limits sometimes fluctuate.

### 免费版能用到什么程度

以下均截至 2026-11-24 的官方 FAQ 与官方 `pro.ipynb`：

| 项目 | 免费版的情况 |
|---|---|
| 价格 | 免费。官方 FAQ：Colab is free of charge to use |
| Python 环境 | 开箱可用，可用 `!pip install` 或 `!apt-get install` 装包 |
| GPU / TPU | 能申请，但 heavily restricted；型号随时间变化，拿不拿得到看当时的配额与余量 |
| 最长运行时间 | at most 12 hours，并且 depends on availability and your usage patterns |
| 空闲超时 | 有。Runtimes will time out if you are idle；**具体时长官方不公布** |
| 内存与磁盘 | 官方不给具体数字。扩 Drive 容量不会增加运行时磁盘，订阅 Colab Pro 才会 |

官方 FAQ 明说 Colab does not publish these limits。所以别把长任务押在免费版上：把中间结果及时写进 Drive，让 notebook 随时能从头重跑。

### 付费档位

价格与计算单元读自[官方定价页](https://colab.research.google.com/signup)，截至 2026-11-24，未登录、界面语言为中文、显示的是美元价。你所在地区的价格以官方页当时显示为准。

| 档位 | 价格 | 计算单元 | 比免费版多什么 |
|---|---|---|---|
| Pay As You Go | US$9.99 / 100 个计算单元；US$49.99 / 500 个 | 按购买量 | 无需订阅，按实际用量付费；更快的 GPU |
| Colab Pro | US$9.99 / 月 | 每月 100 个，90 天后过期 | 更快的 GPU；更高内存的机器；更高的 AI 辅助额度 |
| Colab Pro+ | US$49.99 / 月 | 每月共 600 个，90 天后过期 | 优先使用更强的付费 GPU；最高的 AI 辅助额度；后台执行 |
| Colab Enterprise | 用多少，付多少 | 不适用 | 与 BigQuery、Vertex AI 集成；笔记本存在 Cloud 控制台里 |

关于后台执行，官方定价页的描述是：即使关闭浏览器，正在运行的笔记本也能继续运行长达 24 小时。官方 FAQ 补充了前提：if you have sufficient compute units.

**已经有 Google AI 订阅的用户**：官方 FAQ（截至 2026-11-24）说明，符合条件的付费 Google AI 方案现在也附带 Colab 权益，包括每月的计算单元额度和更强的 GPU / TPU，高档位还有后台执行；存储型的 Google One 方案不包含。各档的额度见 [Google AI 订阅](./google-pro)。

<!-- TODO: 待核实 —— 两个数字。官方 FAQ 没写各档 Google AI 方案每月给多少 Colab 计算单元；官方定价页 FAQ 里的「什么是计算单元？」等条目当时是折叠状态，没有读到各运行时每小时消耗多少计算单元 -->

**哪些事不许做。** 官方 FAQ 列了所有托管运行时都禁止的行为，和前端工程师最容易踩到的几条：把运行时当服务器用（file hosting, media serving, or other web service offerings not related to interactive compute with Colab）；免费版不允许 SSH shell、远程桌面这类远程控制，违反的话 may be terminated at any time without warning；以及拿多个账号绕过限制。需要不受这些限制的资源，官方给的出路是 GCP Marketplace 的专用虚拟机、Colab Enterprise，或自己提供算力的本地运行时。

## 安全与隐私

这一节把官方 FAQ 里与「谁能看到什么」有关的原话放在一起。

| 问题 | 官方怎么说（截至 2026-11-24） | 你该怎么做 |
|---|---|---|
| 代码跑在哪 | Code is executed in a virtual machine private to your account | 这里的「private」说的是虚拟机归你的账号独占，不是「数据不出 Google」 |
| notebook 和输出存在哪 | notebook 存在 Google Drive；官方本地运行时说明页：By default, all code cell outputs are stored in Google Drive | 输出里出现过的敏感内容，等于存进了 Drive |
| 分享后对方看到什么 | the full contents of your notebook (text, code, output, and comments) will be shared | 分享前逐格检查输出，必要时勾选 Omit code cell output |
| 挂载 Drive 的风险 | Mounting Google Drive on Colab allows any code in your notebook to access any files in your Google Drive | 不在不信任的 notebook 里授权挂载。被别人编辑过的 notebook 不会自动挂载，这是官方的保护 |
| AI 功能收集什么 | 使用生成式 AI 功能时，Google 会收集 prompts、相关代码、生成的输出、功能使用信息和你的反馈，保留时长是最多 18 个月 | 人工审阅者可能读到这些内容。官方要求：不要在提示词里放敏感或可识别身份的信息 |
| AI 能碰你的文件和密钥吗 | By default, Colab AI does not have access to your Google Drive files or user secrets | 只有你明确要求时，它才会生成访问这些内容的代码 |
| 本地运行时 | the code you execute can read, write, and delete files on your computer | 只连接你信任的 notebook |

官方 FAQ 里没有一句把 Colab 整体描述成「私有执行环境」。它能给的保证是「虚拟机私有给你的账号」加 Drive 的权限体系。所以给自己立三条规矩：

1. **敏感数据不上传。** 公司代码、用户数据、生产日志，先用脱敏样本练手。
2. **凭据只进 Secrets。** 不要写进单元格，也不要写进会在输出里回显的地方。
3. **分享前从头「全部运行」一遍。** 输出区是你最可能漏掉的地方。

## 常见坑

| 症状 | 原因 | 解决 | 依据 |
|---|---|---|---|
| 隔了一会儿回来，变量全没了 | 运行时空闲时被回收，变量只存在内核内存里 | 中间结果及时写进 Drive；让 notebook 能从头重跑 | 官方 FAQ |
| 装完包，import 的还是旧版本 | 安装的包已经被加载进内存，要重启内核才生效 | 把安装单元格放在最上面；看到警告就点重启按钮，再从上往下运行 | `colabtools` 源码 `_pip.py` |
| 免费版选不到 GPU，或者跑一半被断 | 免费版 GPU 访问 heavily restricted，资源不保证 | 缩短单次任务；写盘存档；用完切回 CPU；需要稳定算力就付费或用本地运行时 | 官方 FAQ |
| 读一个大文件，内核直接挂掉 | 文件比运行时内存还大 | 先看文件大小；分块读取；用压缩包整体拷到运行时再解压 | 官方 FAQ（内存无具体数字） |
| 分享出去的 notebook 里带着 API key | 分享会把文字、代码、输出、评论全部共享 | key 只放 Secrets；分享前检查输出；勾选 Omit code cell output | 官方 FAQ |
| 同一个 notebook，别人跑出来的结果和你不一样 | 单元格可以乱序运行，变量依赖执行顺序 | 交付前用 Runtime 菜单从头运行全部单元格；每个单元格只用前面单元格定义过的变量 | 变量跨单元格共享出自官方 Welcome notebook；乱序后果属社区经验，官方未确认 |
| `%%time` 没生效，单元格报错 | 单元格魔法必须写在第一行 | 把 `%%` 那一行挪到单元格最上面 | 语法出自 IPython 文档；报错表现属社区经验，官方未确认 |
| 切换运行时类型后，之前的变量没了 | 换运行时后需要重新执行单元格 | 切换后从头运行 | 官方 `gpu.ipynb` 要求切换后 re-execute；变量丢失属社区经验，官方未确认 |
| `drive.mount()` 超时，或报 `OSError: [Errno 5] Input/output error` | 「My Drive」根目录条目太多，或触发了 Drive 的配额限制 | 把文件收进子文件夹并清空回收站；减少小文件读写；配额问题等一天重置 | 官方 FAQ |
| GPU 明明开着，却收到「GPU 没被使用」的提示 | 代码没有用到 GPU，占着额度 | **Runtime > Change Runtime Type**，把 **Hardware Accelerator** 设成 **None** | 官方 FAQ |

## 故障排查

| 现象 | 先做什么 | 说明 |
|---|---|---|
| 单元格跑了很久停不下来 | **Runtime > Interrupt execution**（快捷键 `Cmd/Ctrl-M I`） | 官方概览 notebook 给的做法，不会删除运行时 |
| 运行时被弄坏了（改了系统文件、装了不兼容的软件） | **Runtime > Disconnect and delete runtime** | 官方 FAQ：把虚拟机恢复原状；这个操作有频率限制，失败了稍后再试 |
| 连接断开，单元格不再执行 | 重新连接，然后从头运行 | 运行时被回收后变量已清空 |
| `nvidia-smi` 的输出里出现 failed | **Runtime > Change runtime type**，选 GPU，重新执行 | 官方 `pro.ipynb` 的判断方式 |
| Drive 读写很慢 | 减少读写次数，把数据拷到运行时本地再处理 | 官方 FAQ：Drive 文件可能存放在离运行时很远的地区 |
| 看不到 AI 功能 | 确认账号满 18 岁且在支持的地区 | 仍不行就用 **Help > Send feedback**（官方 FAQ） |

想知道这台机器有多大内存，官方 `pro.ipynb` 给了一段用 psutil 查看内存的代码，可以直接复制过来运行。

## 下一步

- **把模型接进自己的产品。** notebook 里调通了，下一步是读懂参数和额度：[AI Studio](./ai-studio) 讲模型与参数，[Cookbook](./gemini-cookbook) 给场景配方。
- **不想离开编辑器。** 官方 Welcome notebook 介绍了 Visual Studio Code 的 Google Colab 扩展：装好后在本地的 `.ipynb` 里选 Colab 运行时即可（[公告](https://developers.googleblog.com/google-colab-is-coming-to-vs-code)）。
- **想要会自己规划、自己执行的编码助手。** 那是 [Antigravity](./antigravity) 的工作，官方还提供了一份名为 Antigravity CLI in Colab 的[笔记本](https://colab.research.google.com/notebooks/antigravity_cli.ipynb)。

## 深入阅读

| 资源 | 一句话 |
|---|---|
| [Colab 官方 FAQ](https://research.google.com/colaboratory/faq.html) | 运行时、资源限制、分享、AI 功能与数据的权威来源，本页大部分数字都出自这里 |
| [Welcome to Colab](https://colab.research.google.com/notebooks/intro.ipynb) 与 [Overview of Colaboratory Features](https://colab.research.google.com/notebooks/basic_features_overview.ipynb) | 官方入门 notebook，以及单元格、快捷键、`!` 与魔法命令、Drive 集成的概览 |
| [External data: Local Files, Drive, Sheets, and Cloud Storage](https://colab.research.google.com/notebooks/io.ipynb) | 上传、下载、挂载 Drive 的官方写法 |
| [Making the Most of your Colab Subscription](https://colab.research.google.com/notebooks/pro.ipynb) 与 [TensorFlow with GPU](https://colab.research.google.com/notebooks/gpu.ipynb) | GPU、内存的官方检查代码，以及开启 GPU 后的 CPU 与 GPU 耗时对比 |
| [Local runtimes](https://research.google.com/colaboratory/local-runtimes.html) | 连接本地运行时的完整步骤与安全说明 |
| [Colab 付费方案](https://colab.research.google.com/signup) | 当前价格、计算单元与各档权益 |
| [googlecolab 组织](https://github.com/googlecolab) | 官方仓库：`colabtools`（Python 库）、`colab-vscode`（VS Code 扩展）、`colab-mcp`（MCP 服务器）、`google-colab-cli`（操作 Colab 运行时的 CLI） |
| [Gemini API 快速开始](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb) | 官方 cookbook 里在 Colab 调 Gemini 的起点 |
| [IPython 魔法命令](https://ipython.readthedocs.io/en/stable/interactive/magics.html) | `%time`、`%timeit`、`%%writefile` 等命令的完整说明 |

## 相关页面

- [AI Studio](./ai-studio)：调模型参数、创建 API key。
- [Google AI 订阅与额度](./google-pro)：付费档位；符合条件的档位附带 Colab 权益。
- [Cookbook](./gemini-cookbook)：跨产品的场景配方。
- [Google Flow](./flow)：同属 Google 的创作工具，用来出落地页、宣传片和演示视频，不跑代码。
- [Antigravity](./antigravity)：会自己规划并修改仓库的编码智能体。
- [Codex 家族](../codex/)：OpenAI 的编码智能体与订阅体系。
