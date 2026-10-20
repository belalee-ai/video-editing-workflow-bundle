# 使用者需求与可修改配置

## 给接收者的第一次提问

先从已有简报提取答案，每轮只问缺失且会改变结果的一组；以下是确认清单，不要一口气让用户填写术语表。

| 选择 | 需要确认的内容 |
|---|---|
| 用在哪里 | 目标工程/平台、画幅与实际像素、帧率、唯一音频、总长；此次只提方案、改工程还是还需导出 |
| 导航形式 | 仅进度线，还是有章节名；模块划分和短标签；是否显示分隔线 |
| 人物开关 | 不要人物、固定陪伴、跟随进度；视频本身有真人不等于进度条也需要人物 |
| 人物来源 | 使用者自己的真人/IP/标识参考与用途许可；需新建时先确认形象和允许变化，不调用作者资产 |
| 位置与比例 | 顶部/底部/自定义 x,y；宽度/画布宽度、高度/画布高度；固定人物锚点、可见高度/画布高度；与字幕、证据和平台控件的距离 |
| 样式参考 | 参考主要负责布局、字体、颜色还是人物动作；不要从一张图擅自继承全部风格 |
| 字体与字号 | 中文、英文/数字字族和实际字重、字号、间距；字体是否实际可用及许可；缺字时先给替代样张 |
| 配色与底板 | 未开始/当前/已完成状态，进度线和点颜色；底板和深色填充的透明度；圆角、线宽、是否显示游标 |
| 宽度和节奏 | 按标签可读性/语义权重、等宽、自定义或按时长；词间停顿是否保持；切换渐变时长 |
| 人物动作 | 静态陪伴、整体跟随、还是独立肢体动作；幅度/节点反应；是否具备分层素材，不把平移当作抬手 |
| 交付 | 可编辑 MG 为主；若还需独立透明素材，确认格式、透明链路和导入验证；导出和发布分别授权 |

用户不确定时提出 1–2 个与画面相符的方案，先确认静态样张。没有人物/标签时相关字段记“不适用”。同一用户已确认的项目只改颜色时，不重问全部内容。

## 配置怎样填写

`assets/example-config.json` 只展示字段与合成时间。所有像素值对应 `canvas` 的实际像素，时间为秒。没有隐含的作者风格预设。

| 字段 | 含义 |
|---|---|
| `version` | 当前结构为 1 |
| `purpose` | 时间来源说明；正式项目写实际转写/人工校时来源，不能继续冒充合成示例 |
| `canvas` / `durationSeconds` | 实际画布宽高、fps、唯一音频/工程总长 |
| `labels` / `dividers` | `none` 或 `chapters`；分隔线仅在有章节时显示 |
| `safeArea` | `{x,y,width,height}`，按本次平台实际遮挡模板确认的安全矩形；不覆盖画面中的字幕/证据禁区检查 |
| `layout` | `x,y,width,labelHeight,gap,lineHeight,radius,cursorRadius`；隐藏标签后线条直接位于 y，不保留标签槽；游标半径 0 表示隐藏 |
| `font` | `family,size,weight`；脚本不安装字体。浏览器替代字形不等于用户已同意替换，正式结果须核对字形 |
| `colors` | `future,active,base,fill,line,cursor`，均为 `#RRGGBB`；已完成标签保留 active 色 |
| `opacity` | base/fill 各为 0–1，分别控制浅底板和深色进度层 |
| `transitionSeconds` | 标签颜色渐变秒数，与 fps 无关；0 为用户选定的瞬间切换 |
| `modules` | 按时间连续覆盖全片，每段含 `label,start,end,width,timing`；width 为正权重，运行时归一化，不是秒数 |
| `timing=words` | `words:[{text,start,end}]`，本段内真实起止时间、不可重叠；无词时不能编造 |
| `timing=confirmed-map` | 适用于无声或人工确认进度段，`points:[{time,fraction}]`；首尾分别对应本段起点0/终点1，时间严格递增、比例不回退。不能为凑配置自动平均切词 |
| `character.mode` | `none / fixed / follow`；none 无需其余人物字段 |

人物模式为 fixed/follow 时，增加：

- `sourceWidth,sourceHeight`：原始图像真实像素。
- `bounds:{x,y,width,height}`：实际 alpha 非透明像素包围框；不沿用任何旧人物坐标。不透明 JPEG/WebP 则使用完整图框并明确其背景可见。
- `visibleHeight,y`：可见轮廓高度和上边缘坐标。宽度按可见轮廓原比例推导，不拉伸。
- `fixedX`：fixed 模式可见轮廓左边缘；follow 根据进度前沿计算并夹取在安全区内。
- 图片通过命令的 `--image` 指定；生成的 HTML 会内嵌这张图片。它是用户项目产物，未经用户明确要求不要上传公开仓库。

源码的图片模式只提供固定/跟随位置；人物关节需要单独适配自己的分层素材。请参考 [实现说明](implementation.md)。

## 本地预览命令

需 Node.js 20+（实际验证版本见根目录验证记录），无需安装 npm 包。先将示例复制到自己的项目作为配置，再改成已确认参数及真实时间。下面命令从该 Skill 目录运行；输出路径按自己的项目指定。

```sh
node scripts/make-preview.cjs assets/example-config.json progress-preview.html
```

有自己的图片并已在配置填写 sourceWidth/sourceHeight/bounds/visibleHeight/y 等字段时：

```sh
node scripts/make-preview.cjs my-progress-config.json progress-preview.html \
  --image my-character.png
```

用浏览器打开生成的 HTML，点击播放或拖动时间查看状态；标签超宽会提示。预览背景为棋盘格，不会被写进 SVG。HTML 不含原视频与真实音频，不能检查真实遮挡或听感；把 SVG 叠层放回实际底片再验收。

适配其他渲染器时可复用 `require('./scripts/progress-core.js')` 的 `validate(config)`、`stateAt(config, seconds)`、`svgAt(config, seconds)`。先校验一次，再逐帧传当前时间；任意顺序 seek 不依赖前一帧。`svgAt` 是透明静态帧，不代表可编辑 MG 或透明视频。
