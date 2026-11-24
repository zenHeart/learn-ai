---
title: Google Colab
description: "Run Python in the browser and use a GPU when you need one, even without a graphics card or a local environment to set up. This page takes you from your first cell to saving results into Drive, managing keys and calling the Gemini API from a notebook."
domain: product
tags:
  - colab
  - notebook
  - gpu
role: tutorial
pageClass: wide-figures
---

# Google Colab

> **Colab is Google's hosted Jupyter notebook service**: open a browser and write Python, with nothing to install, and switch to a GPU / TPU when you need one. It solves the problem of "I want to learn AI or run a model, but my machine has no graphics card and I cannot get a Python environment working". The official FAQ defines it as a hosted Jupyter Notebook service that requires no setup to use, and says it offers compute resources, including GPUs and TPUs, free of charge ([official FAQ](https://research.google.com/colaboratory/faq.html), as of 2026-11-24).

## What you will be able to do

- Create a notebook, run the first cell, and understand why later cells can use what it produced.
- Check with a few lines of Python whether the current runtime has a GPU, then switch it to a GPU and run again.
- Install third-party packages, upload files, clone a GitHub repository, and mount Google Drive to read and write files.
- Put an API key into Secrets and call the Gemini API from a notebook, instead of writing the key in plain text into a cell.
- Explain how far the free tier goes and what it does not guarantee, and what is lost or kept after the runtime disconnects.
- Avoid the most common pitfalls: every variable gone, a restart needed after installing a package, a large file exhausting the memory, and information leaked when you share.

## Prerequisites

**Who this is for**: engineers who write frontend code, may never have written Python, have **never used a notebook**, and have no GPU on their machine. You can copy the code even without knowing Python; every snippet on this page says what it does.

| What to prepare | Notes |
|---|---|
| A Google account | Notebooks are stored in your Google Drive (official FAQ), and using Drive requires you to sign in |
| A modern browser | Official FAQ: Colab works with most major browsers, and is most thoroughly tested with the latest versions of Chrome, Firefox and Safari. |
| A Gemini API key (optional) | Used only in "Call the Gemini API" and the end-to-end example. Create it in [AI Studio](https://aistudio.google.com/app/apikey); for background, see [AI Studio](./ai-studio) |

**About the code language**: this site prefers TypeScript for its examples, but a notebook runs Python, so every piece of code on this page is a Python cell. Copy a whole cell at a time.

**What this page does not teach (non-goals)**:

- **No Python basics.** For variables, functions and `import`, use an introductory resource elsewhere.
- **No machine learning theory.** For what a model is and how training works, see the on-site [model lifecycle guide](/tech/01-model-lifecycle/).
- **No full BigQuery or Vertex AI workflow.** That belongs to Colab Enterprise and Google Cloud; the official entry point is the [Colab Enterprise documentation](https://docs.cloud.google.com/colab/docs).

## Core concepts

### Draw the boundary first: what it is and what it is not

| What it is | What it is not |
|---|---|
| A hosted Jupyter notebook in the browser, with nothing to install (official FAQ: requires no setup to use) | An IDE replacement. The official FAQ says it prioritizes interactive compute and suits machine learning, data science and teaching in particular; **on that basis this page does not recommend building large projects in it** |
| A free Python environment with restricted access to a GPU / TPU | A free, unlimited GPU. Official FAQ: Colab resources are not guaranteed and not unlimited |
| Stores your notebooks and cell outputs in your Google Drive by default | An offline, local, private environment. Your data lands in Google's hosted service by default; see "Security and privacy" |

### Glossary

| Term | In one sentence | Why you need it |
|---|---|---|
| **notebook** | A document that keeps explanatory text, code and output together | When you learn AI, you only follow an explanation when it sits next to the code and the output |
| **cell** | One small block of content in a notebook; there are code cells and text cells | You run one small piece at a time, so when something fails you know which piece it was |
| **runtime** | A temporary virtual machine assigned to you in the cloud | Your code runs on that machine, not on your own |
| **kernel** | The background process inside the runtime that actually executes your Python code | All your variables are stored in it |
| **CPU / GPU / TPU runtime** | The same virtual machine, fitted with different compute hardware | A GPU is far faster than a CPU for training models and batch inference |
| **magic** | A shorthand that starts with `%` or `%%` and changes how a cell is executed | Timing, installing packages, writing files: one line is enough |
| **`!` prefix** | Runs one shell command directly in a cell | Cloning a repository, listing a directory, calling a system tool |
| **Form parameter** `#@param` | Turns one variable in your code into an input box in the interface | Change a parameter without changing the code |
| **Google Drive mount** | Makes your cloud drive act as a folder inside the runtime | The files are still there when the runtime disconnects |
| **Temporary disk** | The local disk that comes with the runtime | Fast to read and write, but wiped when the runtime is reclaimed |
| **compute units** | The paid plans' "prepaid allowance of compute" | Decides how long you can run and how good a machine you get |
| **Secrets** | The credential store that Colab provides, made for things like API keys | The key does not appear in the code or the output |
| **Local runtime** | Lets the Colab interface connect to a Jupyter on your own computer | The code runs on your machine, and your data never leaves your computer |

### Notebooks and cells

The official overview notebook defines it: A notebook is a list of cells. Cells contain either explanatory text or executable code and its output.

- A **code cell** holds Python code, and its output appears under the cell after it runs; a **text cell** holds Markdown explanation, and the official overview notebook says You can double-click to edit this cell.

A notebook is not a static web page. The official Welcome notebook calls it an interactive environment ... that lets you write and execute code: send the same notebook to a colleague, and they can change a parameter, rerun it and see a different result at once.

<!-- TODO: needs verification — whether the "[ ]" to the left of a cell shows an execution count after the cell has run. In the interface as tested, only the "[ ]" placeholder of a cell that has not run was seen; the official overview notebook does not describe the style of the count -->

### Runtime: where your code actually runs

The official FAQ, in its own words: Code is executed in a virtual machine private to your account. Virtual machines are deleted when idle for a while, and have a maximum lifetime enforced by the Colab service.

Broken down, that is three facts: **it is a virtual machine in the cloud** (official Welcome notebook: Colab notebooks execute code on Google's cloud servers), **it belongs to your account alone**, and **it is temporary** (it is reclaimed when idle, and it has a maximum lifetime). When the runtime is gone, this is what goes with it:

| Lost (stored in the runtime) | Kept (stored in the notebook or in Drive) |
|---|---|
| All variables, modules that are already imported, a model that is half trained | The code and text in the cells |
| Packages installed with pip (official FAQ: any custom files and libraries that you've setup are part of the virtual machine) | Saved cell outputs |
| Files uploaded to the temporary disk | Files in Drive |
| The mount state of Drive (you must authorize again after connecting to a new runtime) | Notebook copies on GitHub |

Where the notebook itself lives: the official FAQ says Colab notebooks are stored in Google Drive, or can be loaded from GitHub.

### Kernel

The **kernel** is the background process inside the runtime that executes your Python code line by line. The official Welcome notebook says Variables that you define in one cell can later be used in other cells, and those variables are kept in the kernel's memory. The official FAQ also states that Colab supports Python only: Colab focuses on supporting Python and its ecosystem of third-party tools.

So there are two kinds of "start over", with different scopes:

- **Restart the kernel**: choose **Restart session** in the Runtime menu. Memory is cleared; the virtual machine and the files on its disk remain.
- **Delete the runtime**: choose **Runtime > Disconnect and delete runtime**. The official FAQ says this resets the virtual machine assigned to you to its original state.

<!-- TODO: needs verification — the official wording of the definition of kernel, and the claim that "restarting the session clears the variables but keeps the files on disk". Checked the Colab FAQ (it only mentions Jupyter kernels) and the jupyter-client document kernels.html (no defining sentence found); the explanation in the text is general knowledge, and the scope of a restart is community experience, not confirmed officially -->

### CPU, GPU and TPU runtimes

Official FAQ: Colab offers optional accelerated compute environments, including GPU and TPU. As for which hardware is available, the official statement is that it varies over time (vary over time), and no fixed model is promised. On the free tier's GPU, the official `pro.ipynb` says: The free of charge version of Colab grants access to Nvidia's T4 GPUs subject to quota restrictions and availability. Whether you get one depends on the quota and the available capacity at the time. Switch back to CPU when you cannot use a GPU. The official FAQ gives a specific warning: Executing code in a GPU or TPU runtime does not automatically mean that the GPU or TPU is being utilized.

### Magics and the `!` prefix

The official overview notebook: Colaboratory shares the notion of magics from Jupyter. There are shorthand annotations that change how a cell's text is executed. The same notebook also says: Execute any other process using `!` with string interpolation from python variables, and note the result can be assigned to a variable.

| Syntax | What it does | Source |
|---|---|---|
| `%pip install package` | Installs a package with pip into the current kernel | [colabtools source](https://github.com/googlecolab/colabtools/blob/main/google/colab/_installation_commands.py) |
| `%timeit statement` | Times one statement with the timeit module | [IPython documentation](https://ipython.readthedocs.io/en/stable/interactive/magics.html) |
| `%%time` | Times the whole cell, printing the CPU time and the wall clock time | Same as above |
| `%%writefile filename` | Writes the whole content of the cell into a file | Same as above |
| `!command {variable}` | Runs a shell command; the braces can refer to a Python variable | Official overview notebook |

A command that starts with `%` is a **line magic** and covers one line; one that starts with `%%` is a **cell magic** and covers the whole cell, and it must be on the first line of the cell.

### Form parameters `#@param`

The official [Forms notebook](https://colab.research.google.com/notebooks/forms.ipynb): Forms provide an easy way to parameterize code. From a code cell, select **Insert → Add form field**. When you change the value in a form, the corresponding value in the code will change.

```python
# @title Parameter tuning example { run: "auto" }
learning_rate = 0.01  # @param {type:"number"}
optimizer = "adam"    # @param ["adam", "sgd", "rmsprop"]

print(f"learning_rate={learning_rate}, optimizer={optimizer}")
```

- **What you will see**: the cell turns into a form with a number box and a drop-down. `{ run: "auto" }` means the cell reruns automatically after you change a value.
- **Why**: parameters that you tweak over and over, such as the learning rate or a file path, are exposed as controls, so you change a parameter without changing the code.

### Google Drive mount and the temporary disk

The official `io.ipynb` lists three ways to access Drive. The first is the most common: Mounting your Google Drive in the runtime's virtual machine. Once mounted, Drive is an ordinary folder inside the runtime, and `open()` is all you need to read and write it. The temporary disk is the local disk that comes with the runtime. It reads and writes faster than a mounted Drive, but it is wiped when the runtime is reclaimed. The official FAQ advises: To maximize performance, reduce read/writes from Drive.

### Compute units and local runtimes

Compute units are the common unit of measure for Colab's paid plans. Official FAQ: Colab Pro, Pro+, and Pay As You Go offer you increased compute availability based on your compute unit balance. Once the balance is used up, a paying user falls back to the free tier's rules (official FAQ, as of 2026-11-24). For how many units each tier grants per month and what each tier costs, see "Costs and limits". A local runtime is another route. The official instructions page: Colab lets you connect to a local runtime. This allows you to execute code on your local hardware. The interface is still Colab, but the code runs on your own computer. For the steps, see "Connect to Jupyter on your own computer".

## How it works

By now you may still have one question: after you click Run, which places does the code actually pass through? And why, when you come back after a while, are the variables gone but the files in Drive still there? Keep these two questions in mind as you look at the diagram below.

<DocDiagram src="/diagrams/google-colab-runtime.en.svg" alt="This diagram answers two questions: where does your code actually run, and after the runtime disconnects, what is still there and what is gone? Solid lines are relationships that survive a disconnect; dashed lines are the connections and contents that disappear. On the left is the notebook interface in the browser, on your own computer. It holds the cells, the outputs, and the sidebar, and the notebook content is edited here. At the top of the middle are two persistent places: Google Drive, which holds notebook files and data files, and GitHub, which holds notebook copies and cloned repositories. The lines between the interface and Drive, and between the interface and GitHub, are solid double-headed arrows, so they survive a disconnect. Below them is the runtime virtual machine in the cloud, where the code actually runs. Its compute type can be CPU, or switch on demand to GPU or TPU, and the interface can switch the runtime type. Three things inside the runtime disappear when it disconnects, marked with dashed rose boxes: the kernel process and in-memory variables, such as variables and imported modules; the temporary disk, such as installed packages and files uploaded to the runtime; and the mount state. The connection from the interface to the runtime is dashed as well: the interface sends cell code to the runtime, and the runtime sends output back to the interface. After you authorize a mount, the runtime reads from and writes to Drive; this line is dashed because the mount is lost on a disconnect. The runtime can pull a notebook or a repository from GitHub. On the right are the files on your computer: the originals stay on your computer, while the copy uploaded to the runtime sits on the temporary disk and disappears on a disconnect. Secrets hands a key to the code in the runtime after you authorize it. This diagram leaves out Google's internal infrastructure, any specific free-tier numbers, and button or menu names that exist only in particular versions." :width="1020" lang="en" />

> **What the diagram is based on:** "code runs in a cloud virtual machine", cells and outputs, and switching the runtime type come from the official [FAQ](https://research.google.com/colaboratory/faq.html) and the official overview notebooks [intro.ipynb](https://colab.research.google.com/notebooks/intro.ipynb) and [basic_features_overview.ipynb](https://colab.research.google.com/notebooks/basic_features_overview.ipynb); mounting Drive, reading and writing GitHub, uploading files and using secrets come from the official [io.ipynb](https://colab.research.google.com/notebooks/io.ipynb) (as of 2026-11-24). The diagram keeps the three parts of the interface, the three things in the runtime that "disappear after a disconnect", and the direction of each of the four external places; it leaves out Google's internal infrastructure, any specific free-tier numbers, and button or menu names that exist only in particular versions. Solid lines are relationships that survive a disconnect; dashed lines are the connections and contents that disappear.

The diagram has three areas. **On the left is the interface in the browser**: the cells, the outputs and the left sidebar are all here, and it only edits and displays. **In the middle is the runtime**: a virtual machine in the cloud, holding the kernel that executes the code, the memory and a temporary disk; it can be configured with a CPU, or switched on demand to a GPU or TPU. Above it sit Google Drive and GitHub, the two places that outlive a disconnected runtime. **On the right are the other two external places**: Secrets and the files on your computer.

The line style is the key. **Only the connections to Drive and GitHub survive after the runtime disconnects**: the official FAQ says the virtual machine is deleted when it is idle, while notebooks are stored in Drive and can be loaded from GitHub. The variables in memory, the files on the temporary disk and the installed packages all disappear with the virtual machine. The official FAQ's reminder is The virtual machine you're using, including any custom files and libraries that you've setup, will not be shared, so keep the cells that install and load what you need inside the notebook.

So when you click Run once, what actually happens is: the browser sends the code of this cell to the kernel in the runtime; the kernel executes it and sends the output back to the browser, which displays it under the cell; the variables stay in the kernel's memory for later cells to use. When the runtime is reclaimed, every variable is gone, but the code is still in the notebook and can be rerun at any time.

## Get your first task working in 10 minutes

Goal: create a notebook, run one cell, then confirm whether a GPU is available.

### Create a notebook and run the first cell

**Step 1: Create.** Open [colab.research.google.com](https://colab.research.google.com/), sign in to your Google account, and create a new notebook from the **File** menu. The official Welcome notebook also gives a direct route: append `#create=true` to the address.

- **What you will see**: an empty notebook. The menu bar is at the top, the toolbar has two buttons, **+ CODE** and **+ TEXT**, and **Share** is in the top-right corner.
- **Why**: the notebook is stored in your Google Drive (official Welcome notebook), so you must sign in first.

**Step 2: Paste the code.** Click **+ CODE** to add a code cell, and paste in the two lines below.

```python
message = "Hello, Colab"
print(message.upper())   # upper() converts the string to uppercase
```

**Step 3: Run.** Click the **Play icon** to the left of the cell, or press `Shift+Enter`.

- **What you will see**: the first run starts by connecting to a runtime, and the button in the toolbar changes to **CONNECTED**; then `HELLO, COLAB` appears under the cell.
- **Why**: the code executes in the runtime in the cloud, not on your computer. The button name and the shortcut both come from the official overview notebook, which also lists two other ways to run: `Cmd/Ctrl+Enter` stays on the same cell after running, and `Alt+Enter` inserts a new cell below after running.

### Use a variable across cells

```python
# Cell A: define a variable
seconds_in_a_day = 24 * 60 * 60
seconds_in_a_day        # the expression on the last line of a cell is displayed automatically
```

```python
# Cell B: use the variable from cell A directly
seconds_in_a_week = 7 * seconds_in_a_day
print(f"A week has {seconds_in_a_week} seconds")
```

Run A, then B. You should see `86400` and `A week has 604800 seconds`. Running B alone first in a new runtime raises `NameError`, because the variable is not defined yet. This is the execution-order problem described later under "Common pitfalls".

### Check whether the current runtime has a GPU

```python
import shutil
import subprocess

# nvidia-smi is the command-line tool that ships with NVIDIA graphics cards; with no usable GPU, it is either missing or fails
if shutil.which("nvidia-smi") is None:
    print("No GPU connected: nvidia-smi was not found in the runtime")
else:
    result = subprocess.run(["nvidia-smi"], capture_output=True, text=True)
    if result.returncode != 0:
        print("No GPU connected: nvidia-smi cannot talk to the graphics driver")
    else:
        print("GPU connected. Graphics card information:")
        print(result.stdout)
```

A new notebook has no GPU by default. Expect a line that starts with "No GPU connected".

### Switch the runtime to a GPU

1. Open the **Runtime** menu and choose **Change runtime type**.
2. In the dialog, set **Hardware accelerator** to GPU and save.
3. Go back to the cell above and run it again. Expect output that starts with "GPU connected", followed by a table of graphics card information.

The menu path comes from the official FAQ (Choose **Runtime > Change Runtime Type**) and the official `pro.ipynb`; the name of the drop-down comes from the official `gpu.ipynb` (select GPU from the Hardware Accelerator drop-down). You must re-execute the cells after switching; that is also what `gpu.ipynb` instructs.

Remember to switch back when you are done. The official FAQ's advice is: **Runtime > Change Runtime Type**, and set **Hardware Accelerator** to **None**; the stated reason is to avoid opting for GPUs or extra memory when it is not needed for your work.

## Everyday use

Each subsection follows the same pattern: what to do, what you will see, why. Every piece of code is a complete cell.

### 1. Install third-party packages

The official snippets notebook says: To import a library that's not in Colaboratory by default, you can use `!pip install` or `!apt-get install`. This page recommends `%pip`:

```python
# %pip is a line magic provided by the kernel: it guarantees the packages are installed into the same Python that is executing your code
%pip install -q pandas matplotlib scikit-learn
```

- **What you will see**: a few lines of pip install log. Packages that are already installed are skipped.
- **Why `%pip` and not `!pip`**: `!pip` hands the line to the shell, and the shell finds `pip`; `%pip` is executed by the kernel. In Google's official source code `colabtools`, the comment on `%pip` is Install a package in the current kernel using pip, and the quickstart in the official Gemini cookbook uses it too. In Colab both forms end up running the same `pip` command, which is why the official snippets accept both; `%pip` has the clearer meaning.

**The "restart" warning after installing a package.** The `colabtools` source has a dedicated note: if the package you installed has already been imported into memory, Colab shows a warning + restart button. When you see it, click the restart button in the warning. It corresponds to **Restart session** in the Runtime menu. Then run the cells you need again, from top to bottom. The least troublesome approach is to put the install cell at the very top of the notebook.

### 2. Mount Drive and save results into it

```python
from google.colab import drive

# The first mount opens an authorization window: sign in and allow as prompted; the cell waits until you finish
drive.mount("/content/drive")
```

- **What you will see**: the authorization flow. The official `io.ipynb` describes it as using an authorization code. After that, the files you write appear in drive.google.com.
- **Why**: the runtime gets reclaimed; Drive does not. Models, cleaned data and experiment results only count as safe once they are in Drive.

```python
import json
from pathlib import Path
work_dir = Path("/content/drive/My Drive/colab-out")   # note the space in the middle of "My Drive"
work_dir.mkdir(parents=True, exist_ok=True)             # creates the folder if it is missing; does not raise if it already exists

result = {"task": "colab-demo", "answer": 86400}
out_file = work_dir / "result.json"
out_file.write_text(json.dumps(result, ensure_ascii=False), encoding="utf-8")
print(f"Saved to {out_file}")

drive.flush_and_unmount()   # flushes pending writes to Drive and unmounts before finishing (this is the call the official io.ipynb uses)
```

Two cautions from the official FAQ: **do not pile files into the root of "My Drive"**, because about ten thousand entries there can already make the mount fail, and the official advice is to tidy them into subfolders; **pack large data first, then unpack it**: the official advice is to copy the data from Drive to the runtime as an archive and unpack it locally on the runtime, instead of doing many small reads and writes in the mounted Drive directory.

### 3. Read data: upload a small file, clone a GitHub repository, read a CSV from Drive

**Upload a small file.** The official `io.ipynb` says `files.upload` returns a dictionary whose keys are file names and whose values are the file contents:

```python
from google.colab import files

uploaded = files.upload()   # opens a file picker; this cell keeps waiting until the upload finishes

if not uploaded:
    print("No file was selected.")
for name, data in uploaded.items():
    print(f"Uploaded {name} ({len(data)} bytes); you can now read it with open()")
```

- **What you will see**: a file picker. After the upload, the output gives the file name and the number of bytes; the file is saved in the runtime's current working directory. The file is gone once the runtime is reclaimed, so use Drive for anything you want to keep.

**Clone a repository from GitHub.** A shell command is the handier way here. The official overview notebook says `!` can execute any other program and supports referring to Python variables in braces:

```python
repo_url = "https://github.com/googlecolab/colabtools.git"

!git clone --depth 1 {repo_url}   # --depth 1 fetches only the latest commit: smaller and faster
```

Running it a second time says the directory already exists; that is normal. Notebooks on GitHub can also be opened directly in Colab; see "Save and share".

**Read a CSV from Drive.** This assumes Drive is already mounted:

```python
import pandas as pd
from pathlib import Path
csv_path = Path("/content/drive/My Drive/colab-out/data.csv")
try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    print(f"{csv_path} was not found. Put it into the colab-out folder in Drive first.")
    df = None

if df is not None:
    print(f"{len(df)} rows in total")
    display(df.head())     # head() takes the first 5 rows; display() renders the table
```

- **What you will see**: the number of rows and a table of the first 5 rows; when the file does not exist, one message instead of the whole cell crashing.

### 4. Time a piece of code

**To time the whole cell, use `%%time`.** It must be on the first line of the cell:

```python
%%time
import time
time.sleep(0.5)   # stands in for a slow operation
```

The IPython documentation says of `%time` that The CPU and wall clock times are printed, so the output gains two extra items, CPU times and Wall time. A large gap between the two numbers means the time went into waiting, not computing.

**For steadier numbers, use `%timeit`.** It runs the statement many times and then computes the statistics:

```python
%timeit sum(range(1_000_000))
```

The output style in the IPython documentation is `... per loop (mean ± std. dev. of 7 runs, ... loops each)`, with the mean and the standard deviation. `%%time`, which runs once, suits checking the order of magnitude; `%timeit` suits comparing two ways of writing the code.

**To save a cell as a file, use `%%writefile`.** IPython documentation: Write the contents of the cell to a file.

```python
%%writefile greet.py
def greet(name: str) -> str:
    return f"Hello, {name}"


print(greet("Colab"))
```

Open another cell and run `!python greet.py`; you should see `Hello, Colab`. Files written inside the runtime disappear with the runtime as well. To keep one, change the file name to a location under the Drive mount path.

### 5. Put the API key into Secrets

**NEVER write a key in plain text into a cell.** When you share a notebook, the other person sees everything in the cells. The first line of the official Gemini API authentication walkthrough is: Remember to treat your API key like a password.

How to do it (the steps come from the [official authentication walkthrough](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Authentication.ipynb)):

1. Open the notebook and click **Secrets** in the left sidebar (the key icon).
2. Create a new Secret and name it `GEMINI_API_KEY`.
3. Paste the API key into the `Value` input box.
4. Turn on the access switch beside it, to allow the notebook to use this Secret.

```python
from google.colab import userdata

try:
    api_key = userdata.get("GEMINI_API_KEY")
    print(f"Key read, length {len(api_key)}")   # show the length only, to confirm it was read; never print the content
except userdata.SecretNotFoundError:
    print("There is no Secret named GEMINI_API_KEY. Create it in the Secrets panel on the left.")
    raise
except userdata.NotebookAccessError:
    print("This notebook does not have access to GEMINI_API_KEY yet. Turn on the access switch in the Secrets panel.")
    raise
```

- **What you will see**: `Key read, length …`; when something is not configured, one explanatory line plus the original exception.
- **Why**: the three exception classes all come from `userdata.py` in `colabtools`. `userdata.get` requests the key from the Colab interface at run time, so the notebook file holds only the name of the Secret, never its value.

### 6. Call the Gemini API from a notebook

[AI Studio](./ai-studio) covers models and parameters; this section only covers how to call the API from a notebook. The code follows the [official quickstart](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb). `gemini-4-hydrogen` is its default model on that day (as of 2026-11-24); check it against the [official model list](https://ai.google.dev/gemini-api/docs/models) before you use it. Install the SDK first, in a cell of its own:

```python
%pip install -U -q "google-genai>=2.30.0"
```

```python
from google import genai
from google.colab import userdata
from google.genai import errors

MODEL_ID = "gemini-4-hydrogen"   # model names change fast; check the official model list before use


def ask_gemini(question: str, system_instruction: str = "You are a patient technical mentor. Answer briefly in English.") -> str:
    """Call the Gemini API. On failure, return a readable message so the whole notebook does not stop."""
    try:
        api_key = userdata.get("GEMINI_API_KEY")
    except userdata.SecretNotFoundError:
        return "Missing key: create GEMINI_API_KEY in Secrets first."
    except userdata.NotebookAccessError:
        return "Missing permission: turn on the access switch for GEMINI_API_KEY in the Secrets panel."
    client = genai.Client(api_key=api_key)
    try:
        interaction = client.interactions.create(
            model=MODEL_ID,
            input=question,
            system_instruction=system_instruction,
        )
        return interaction.output_text
    except errors.APIError as e:          # errors returned by the model service: invalid key, used-up quota, wrong model name, and so on
        return f"Gemini API call failed (code={e.code}): {e.message}"


print(ask_gemini("Explain in one sentence what a cell in a notebook is."))
```

- **What you will see**: a short answer in English; when something goes wrong, a message that starts with "Missing key", "Missing permission" or "Gemini API call failed".
- **Why written this way**: the two key-related exception classes are defined by `userdata`; API errors are caught with the SDK's `errors.APIError`, which carries two fields, `code` and `message` ([SDK README](https://github.com/googleapis/python-genai/blob/main/README.md)).

### 7. End-to-end example: embed a batch of user feedback and visualize it

**Scenario**: you are the frontend developer of a web application. You have a CSV of user feedback and want to group it by meaning automatically. An "embedding" turns each piece of text into a list of numbers (a vector); vectors with similar meanings are also close to each other. For the concept, see the on-site [embeddings and retrieval](/tech/04-grounding/embeddings-retrieval).

The whole piece of code works without a GPU: with a `GEMINI_API_KEY` it uses Gemini's embedding model; without one it falls back to local TF-IDF statistical vectors. So when you share it with a colleague who has no key, it still runs to the end.

**Cell 1: generate a CSV.** If you have your own data, replace it with an uploaded file or a file in Drive.

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

print(f"Wrote feedback.csv, {len(rows)} rows in total")
```

**Cell 2: install the dependencies.** The official example notebooks import numpy, pandas and matplotlib directly; scikit-learn is installed explicitly here once, and the install is skipped if it is already present.

```python
%pip install -q scikit-learn
```

**Cell 3: read the CSV and get the vectors.**

```python
import numpy as np
import pandas as pd

df = pd.read_csv("feedback.csv", encoding="utf-8")
texts = df["text"].tolist()


def embed_with_gemini(items):
    """Turn text into vectors with Gemini's embedding model; raises on failure and leaves the fallback to the caller."""
    from google import genai
    from google.colab import userdata
    client = genai.Client(api_key=userdata.get("GEMINI_API_KEY"))
    response = client.models.embed_content(model="gemini-embedding-2", contents=items)
    return np.array([item.values for item in response.embeddings], dtype=float)


def embed_with_tfidf(items):
    """Fallback: split the text into character n-grams and count them; needs no key and no network."""
    from sklearn.feature_extraction.text import TfidfVectorizer
    return TfidfVectorizer(analyzer="char", ngram_range=(2, 4)).fit_transform(items).toarray()


try:
    vectors = embed_with_gemini(texts)
    print(f"Using Gemini embeddings, vector shape {vectors.shape}")
except Exception as e:   # with no key, no network or used-up quota, fall back to the local method
    print(f"Gemini embeddings are not available ({type(e).__name__}); switching to TF-IDF.")
    vectors = embed_with_tfidf(texts)
    print(f"Using TF-IDF, vector shape {vectors.shape}")
```

<!-- TODO: needs verification — the names of the vector fields in the object that embed_content returns (embeddings / values). The SDK README gives only a calling example and does not show the structure of the return value; this page follows the SDK's general structure and was not actually run in Colab. If the field names are wrong, the code falls back to TF-IDF automatically -->

**Cell 4: compute the similarity and draw a scatter plot.**

```python
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
# Cosine similarity: first normalize each vector to unit length, then take the matrix product
norms = np.linalg.norm(vectors, axis=1, keepdims=True)
normed = vectors / np.clip(norms, 1e-12, None)   # clip guards against dividing by 0
similarity = normed @ normed.T
query = 4   # item 4 is login-related feedback
ranked = np.argsort(-similarity[query])          # sort by similarity, highest first
print(f"The 3 items closest to item {query}:")
for i in ranked[1:4]:                            # skip the item itself
    print(f"  [{i}] similarity {similarity[query, i]:.3f}  {texts[i]}")

# Compress the high-dimensional vectors to 2D. Label with the index, because the Chinese text would show up as boxes in the plot
points = PCA(n_components=2).fit_transform(vectors)
plt.figure(figsize=(8, 6))
plt.scatter(points[:, 0], points[:, 1])
for i, (x, y) in enumerate(points):
    plt.annotate(str(i), (x, y))
plt.title("Feedback embeddings (2D by PCA)")
plt.show()
```

- **What you will see**: the 3 feedback items closest to item 4 with their similarity scores, and a scatter plot of 12 points.
- **What to look at**: whether the 3 printed items are all login problems (indices 3, 4, 5), and whether the points of one topic fall in the same area in the plot. To keep the vectors, write them into Drive as in section 2.

### 8. Save and share

| Goal | How | Where the result is |
|---|---|---|
| Save | **File > Save** (official overview notebook) | Google Drive |
| Make a copy to edit | **File > Make a Copy** | Google Drive |
| Download the file | Official FAQ: you can download it from Colab's File menu; every notebook is in the open-source Jupyter format (`.ipynb`) | Your computer |
| Save to GitHub | **File > Save a copy to GitHub**; this requires authorizing Colab to commit to your repository | The GitHub repository |
| Open a notebook that is on GitHub | Replace `github.com` in the GitHub address with `colab.research.google.com/github` | A new editable copy; running and editing it does not overwrite the original file |
| Send it to a colleague | Click **Share** in the top-right corner | A link; the permission rules are the same as for Google Docs and Sheets |

**Before you share the link, be clear about what the other person will see.** The paths in the table above come from the official FAQ, the official overview notebook and the [official GitHub demo notebook](https://colab.research.google.com/github/googlecolab/colabtools/blob/main/notebooks/colab-github-demo.ipynb). The official FAQ puts it plainly: If you choose to share a notebook, the full contents of your notebook (text, code, output, and comments) will be shared. The other person gets the complete set of text, code, **output** and comments; your virtual machine, the files in it and the libraries you installed are not shared. If you do not want the output to go out, tick **Edit > Notebook settings > Omit code cell output when saving this notebook** (official FAQ). The official FAQ also advises keeping the cells that install and load dependencies inside the notebook, because the other person connects to a brand-new runtime.

### 9. Connect to Jupyter on your own computer

When this applies: your data must not leave your computer, or you want to use your own graphics card. Read the official security note first: With a local connection, the code you execute can read, write, and delete files on your computer.

**Step 1: Start Jupyter on your machine.** The command from the official instructions page carries a few extra arguments, so that the WebSocket connection from the Colab frontend is trusted:

```bash
jupyter notebook \
  --NotebookApp.allow_origin='https://colab.research.google.com' \
  --port=8888 \
  --NotebookApp.port_retries=0 \
  --NotebookApp.allow_credentials=True
```

After it starts, the terminal prints a backend URL used for authentication (in the official Docker example it looks like `http://127.0.0.1:9000/?token=...`); copy it for later. The official instructions page also offers another way: start with Colab's Docker image, which preinstalls the packages from the hosted runtime and supports linux/amd64 only.

**Step 2: Connect from Colab.** Official instructions page: click the "Connect" button and select "Connect to local runtime...". Paste the URL from the previous step into the dialog and click **Connect**.

Two limits to know: the official FAQ says Google Drive mounting on the runtime filesystem will not work with these approaches, which means a local runtime cannot mount Drive. When you share a notebook, the runtime on your machine is not shared; the other person connects to Colab's hosted runtime when they open it (official instructions page).

### 10. Use Colab's AI features

Colab has built-in AI features powered by Gemini. The official FAQ describes the entry point: click the Gemini spark icon in the notebook footer to open the main chat panel. You also see AI autocomplete as you type code.

| What you want the AI to do | What the official FAQ says |
|---|---|
| Write a function or boilerplate, or refactor across cells | Generate and transform Code |
| An error came up and you want to know how to fix it | Fix errors intelligently: Colab will iteratively suggest fixes in a diff view for your review |
| Give it a goal and let it analyze the data on its own | Execute autonomous agentic flows: the agent produces a plan first and executes it after you confirm |
| Upload CSV, JSON or Excel for it to analyze and chart | Analyze your data |

Three reminders from the official FAQ: **availability** requires the account to be 18 or older and located in a supported region; if you cannot see the entry point, report it through **Help > Send feedback**. **The AI's permissions** are restricted by default; the exact words are By default, Colab AI does not have access to your Google Drive files or user secrets. **You review the generated code yourself**; the official words are you are responsible for your use of the code.

The official developer blog sums up the Data Science Agent flow in four steps: create a blank notebook, upload the data, describe the goal in the Gemini sidebar, and watch it generate a runnable notebook ([official article](https://developers.googleblog.com/en/data-science-agent-in-colab-with-gemini), 2025-03-03). The Colab Enterprise documentation also gives button-level names, such as **Fix error**, **Explain error**, **Generate code** and **Explain code** ([Gemini in Colab Enterprise](https://docs.cloud.google.com/colab/docs/gemini-in-colab/overview)). That is the enterprise edition's documentation; go by what you actually see on the buttons in your interface.

## Costs and limits

**The free tier works, but the resources are not guaranteed.** The official FAQ, in its own words: Colab resources are not guaranteed and not unlimited, and usage limits sometimes fluctuate.

### How far the free tier goes

All of the following is from the official FAQ and the official `pro.ipynb`, as of 2026-11-24:

| Item | What the free tier gives you |
|---|---|
| Price | Free. Official FAQ: Colab is free of charge to use |
| Python environment | Works out of the box; install packages with `!pip install` or `!apt-get install` |
| GPU / TPU | You can request one, but it is heavily restricted; the model varies over time, and whether you get one depends on the quota and the available capacity at the time |
| Maximum run time | at most 12 hours, and it depends on availability and your usage patterns |
| Idle timeout | There is one. Runtimes will time out if you are idle; **the official source does not publish the exact duration** |
| Memory and disk | The official source gives no specific numbers. Upgrading Drive storage does not increase the runtime disk; subscribing to Colab Pro does |

The official FAQ says plainly: Colab does not publish these limits. So do not bet a long-running task on the free tier: write intermediate results into Drive as you go, and keep the notebook able to rerun from the top at any time.

### Paid tiers

The prices and compute units are read from the [official pricing page](https://colab.research.google.com/signup) as of 2026-11-24, while signed out, with the interface language set to Chinese, and the prices shown in US dollars. For your region, go by what the official page shows at the time.

| Tier | Price | Compute units | What it adds over the free tier |
|---|---|---|---|
| Pay As You Go | US$9.99 / 100 compute units; US$49.99 / 500 | By amount purchased | No subscription; pay for what you actually use; faster GPUs |
| Colab Pro | US$9.99 / month | 100 per month, expiring after 90 days | Faster GPUs; machines with more memory; a higher AI assistance quota |
| Colab Pro+ | US$49.99 / month | 600 in total per month, expiring after 90 days | Priority use of stronger paid GPUs; the highest AI assistance quota; background execution |
| Colab Enterprise | Pay for what you use | Not applicable | Integration with BigQuery and Vertex AI; notebooks are stored in the Cloud console |

On background execution, the official pricing page says: even with the browser closed, a running notebook can keep running for up to 24 hours. The official FAQ adds the precondition: if you have sufficient compute units.

**If you already have a Google AI subscription**: the official FAQ (as of 2026-11-24) states that eligible paid Google AI plans now come with Colab benefits as well, including a monthly compute unit allowance and stronger GPUs / TPUs, and background execution on the higher tiers; storage-type Google One plans are not included. For the allowance of each tier, see [Google AI subscriptions](./google-pro).

<!-- TODO: needs verification — two numbers. The official FAQ does not say how many Colab compute units each Google AI plan grants per month; entries in the official pricing page FAQ such as "What are compute units?" were collapsed at the time, so how many compute units each runtime consumes per hour was not read -->

**What you may not do.** The official FAQ lists the behaviors prohibited on all hosted runtimes. The ones a frontend engineer is most likely to hit are these: using the runtime as a server (file hosting, media serving, or other web service offerings not related to interactive compute with Colab); remote control such as an SSH shell or a remote desktop, which the free tier does not allow and which may be terminated at any time without warning; and using several accounts to get around the limits. If you need resources without these restrictions, the official ways out are dedicated virtual machines on GCP Marketplace, Colab Enterprise, or a local runtime where you supply the compute yourself.

## Security and privacy

This section gathers the official FAQ's own words on "who can see what".

| Question | What the official source says (as of 2026-11-24) | What you should do |
|---|---|---|
| Where the code runs | Code is executed in a virtual machine private to your account | "Private" here means the virtual machine belongs to your account alone, not that "your data never leaves Google" |
| Where notebooks and outputs are stored | Notebooks are stored in Google Drive; the official local runtime instructions page: By default, all code cell outputs are stored in Google Drive | Any sensitive content that has appeared in an output is, in effect, stored in Drive |
| What the other person sees after you share | the full contents of your notebook (text, code, output, and comments) will be shared | Check the outputs cell by cell before sharing; tick Omit code cell output when needed |
| The risk of mounting Drive | Mounting Google Drive on Colab allows any code in your notebook to access any files in your Google Drive | Do not authorize a mount in a notebook you do not trust. A notebook that someone else has edited does not mount automatically; that is the official protection |
| What the AI features collect | When you use the generative AI features, Google collects prompts, related code, generated output, feature usage information and your feedback, and keeps it for up to 18 months | Human reviewers may read this content. The official requirement: do not put sensitive or personally identifiable information in your prompts |
| Can the AI touch your files and keys? | By default, Colab AI does not have access to your Google Drive files or user secrets | Only when you explicitly ask does it generate code that accesses this content |
| Local runtime | the code you execute can read, write, and delete files on your computer | Connect only to notebooks you trust |

No sentence in the official FAQ describes Colab as a whole as a "private execution environment". What it can guarantee is "a virtual machine private to your account" plus Drive's permission system. So set yourself three rules:

1. **Do not upload sensitive data.** For company code, user data and production logs, practice with desensitized samples first.
2. **Credentials go into Secrets only.** Do not write them into cells, or anywhere they will be echoed in the output.
3. **Run all from the top once before you share.** The output area is where you are most likely to miss something.

## Common pitfalls

| Symptom | Cause | Fix | Source |
|---|---|---|---|
| You come back after a while and every variable is gone | The runtime was reclaimed while idle, and variables live only in the kernel's memory | Write intermediate results into Drive as you go; keep the notebook able to rerun from the top | Official FAQ |
| You installed a package, but import still loads the old version | The installed package is already loaded into memory, and a kernel restart is needed for the change to take effect | Put the install cell at the very top; when the warning appears, click the restart button and run again from top to bottom | `colabtools` source, `_pip.py` |
| The free tier offers no GPU, or the run is cut off halfway | GPU access on the free tier is heavily restricted, and the resources are not guaranteed | Shorten each task; save results to disk as you go; switch back to CPU when done; pay or use a local runtime if you need stable compute | Official FAQ |
| You read one large file and the kernel dies outright | The file is larger than the runtime's memory | Check the file size first; read in chunks; copy the archive to the runtime as a whole and unpack it there | Official FAQ (no specific number for memory) |
| A notebook you shared carries an API key | Sharing shares the text, code, output and comments in full | Keep keys in Secrets only; check the outputs before sharing; tick Omit code cell output | Official FAQ |
| The same notebook produces different results when someone else runs it | Cells can be run out of order, and variables depend on the execution order | Before handing it over, run every cell from the top through the Runtime menu; make each cell use only variables defined in earlier cells | Variables being shared across cells comes from the official Welcome notebook; the consequence of running out of order is community experience, not confirmed officially |
| `%%time` has no effect and the cell raises an error | A cell magic must be on the first line | Move the `%%` line to the very top of the cell | The syntax comes from the IPython documentation; the error behavior is community experience, not confirmed officially |
| After switching the runtime type, the earlier variables are gone | Cells must be re-executed after a runtime change | Run again from the top after switching | The official `gpu.ipynb` asks you to re-execute after switching; the loss of variables is community experience, not confirmed officially |
| `drive.mount()` times out, or raises `OSError: [Errno 5] Input/output error` | Too many entries in the root of "My Drive", or a Drive quota limit was hit | Tidy the files into subfolders and empty the trash; cut down on small-file reads and writes; for a quota problem, wait a day for the reset | Official FAQ |
| The GPU is clearly on, yet you get a warning that the GPU is not being used | The code does not use the GPU but holds the quota | **Runtime > Change Runtime Type**, and set **Hardware Accelerator** to **None** | Official FAQ |

## Troubleshooting

| Symptom | What to do first | Notes |
|---|---|---|
| A cell has been running for a long time and will not stop | **Runtime > Interrupt execution** (shortcut `Cmd/Ctrl-M I`) | The method given in the official overview notebook; it does not delete the runtime |
| The runtime is broken (system files changed, incompatible software installed) | **Runtime > Disconnect and delete runtime** | Official FAQ: resets the virtual machine to its original state; the operation is rate-limited, so try again later if it fails |
| The connection drops and cells stop executing | Reconnect, then run again from the top | The variables were cleared when the runtime was reclaimed |
| failed appears in the output of `nvidia-smi` | **Runtime > Change runtime type**, choose GPU, and execute again | The way the official `pro.ipynb` checks for it |
| Reading from and writing to Drive is very slow | Cut down the number of reads and writes, and copy the data to the runtime's local disk before processing it | Official FAQ: Drive files may be stored in a region far from the runtime |
| You cannot see the AI features | Confirm that the account is 18 or older and in a supported region | If it still fails, use **Help > Send feedback** (official FAQ) |

To find out how much memory the machine has, the official `pro.ipynb` includes a snippet that checks memory with psutil; you can copy it over and run it.

## Next steps

- **Connect the model to your own product.** Once the call works in a notebook, the next step is to understand parameters and quota: [AI Studio](./ai-studio) covers models and parameters, and the [Cookbook](./gemini-cookbook) gives recipes by scenario.
- **Stay in your editor.** The official Welcome notebook introduces the Google Colab extension for Visual Studio Code: once it is installed, select the Colab runtime in a local `.ipynb` ([announcement](https://developers.googleblog.com/google-colab-is-coming-to-vs-code)).
- **Want a coding assistant that plans and executes on its own.** That is the job of [Antigravity](./antigravity); there is also an official [notebook](https://colab.research.google.com/notebooks/antigravity_cli.ipynb) named Antigravity CLI in Colab.

## Further reading

| Resource | In one line |
|---|---|
| [Official Colab FAQ](https://research.google.com/colaboratory/faq.html) | The authoritative source on runtimes, resource limits, sharing, the AI features and data; most of the numbers on this page come from here |
| [Welcome to Colab](https://colab.research.google.com/notebooks/intro.ipynb) and [Overview of Colaboratory Features](https://colab.research.google.com/notebooks/basic_features_overview.ipynb) | The official introductory notebook, and an overview of cells, shortcuts, `!` and magics, and Drive integration |
| [External data: Local Files, Drive, Sheets, and Cloud Storage](https://colab.research.google.com/notebooks/io.ipynb) | The official way to upload, download and mount Drive |
| [Making the Most of your Colab Subscription](https://colab.research.google.com/notebooks/pro.ipynb) and [TensorFlow with GPU](https://colab.research.google.com/notebooks/gpu.ipynb) | Official code that checks the GPU and memory, and a CPU-versus-GPU timing comparison with the GPU on |
| [Local runtimes](https://research.google.com/colaboratory/local-runtimes.html) | The complete steps for connecting a local runtime, with the security notes |
| [Colab paid plans](https://colab.research.google.com/signup) | Current prices, compute units and the benefits of each tier |
| [googlecolab organization](https://github.com/googlecolab) | The official repositories: `colabtools` (Python library), `colab-vscode` (VS Code extension), `colab-mcp` (MCP server), `google-colab-cli` (CLI for operating Colab runtimes) |
| [Gemini API quickstart](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb) | The starting point in the official cookbook for calling Gemini in Colab |
| [IPython magics](https://ipython.readthedocs.io/en/stable/interactive/magics.html) | Full reference for `%time`, `%timeit`, `%%writefile` and the other commands |

## Related pages

- [AI Studio](./ai-studio) — tune model parameters, create an API key.
- [Google AI subscriptions and quota](./google-pro) — the paid tiers; eligible tiers come with Colab benefits.
- [Cookbook](./gemini-cookbook) — recipes by scenario, across products.
- [Google Flow](./flow) — Google's creative tool for landing pages, launch films and demo videos; it does not run code.
- [Antigravity](./antigravity) — a coding agent that plans and edits a repository on its own.
- [Codex family](../codex/) — OpenAI's coding agents and subscription plans.
