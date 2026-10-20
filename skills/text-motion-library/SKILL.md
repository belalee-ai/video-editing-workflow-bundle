---
name: text-motion-library
description: 复用随包 001–030 文字动效源码，按用户已确认的字体、配色、文字和真实帧率生成 ChatCut 可编辑叠层载荷；载荷生成不等于已接入工程。
---

# 文字动效词典：可携带源码版

本包只包含基础文字 001–030 的共用源码与 ChatCut 载荷生成器，不包含更大的图库网站、个人工程、字体文件或人物素材。编号不是筛选后的顺序；从 `src/motion-core.js` 的 `EFFECTS` 按编号、名称或 ID 解析。已指定效果就直接复用，没有方向时先给少量动作提案。

开始前遵守 [主流程需求确认](../video-editing-workflow/references/intake.md)。文字、字体、字号、颜色、位置、画幅、双语有无、动作与真实 fps 均来自本项目。样例配置只是测试，不是用户默认风格。无真实音频时可做获授权的示例预览，不宣称已校时。

## 生成载荷

Node.js 20+；生成器本身只用 Node 内置能力，无须安装网站、Remotion 或 React。工具生成的 JSX 在目标 ChatCut MG 运行环境执行，该环境是否支持所用能力需要实际检查。

在此 Skill 目录执行：

```sh
node scripts/chatcut-payload.mjs --config /absolute/path/project-motion.json --out /absolute/path/payload.json
```

配置包含 `effectCode`、实际 `fps` 与 `props`。`props` 必填 `text, fontFamily, fontSize, color, accent, background, transparentBackground, bilingual, speed, impact, startSeconds`；双语还需 `englishText`。字段值须先由本项目确认。输出是 JSON，不是 MP4。

只改字或调参也复用同一份源码；不按效果名字另造实现。`typing` 为固定字号、有标点停顿的自然键入，`typewriter` 保留弹性输入。原文最多 24 个字符，长文按真实语义拆段。动作、配色与字体独立；延长或调慢时同步最短时长与 `clipSeconds`，不能裁短片段截断进场或阅读。

## 接回 ChatCut

先读当前官方基础与 MG 说明。取 JSON 中的 `code`、`properties`、自然尺寸和时长，按当前工具协议内联提交；本地文件路径不能代替代码或上传结果。字体需在目标环境实际可用，不包含字体即不保证自动加载。

自然盒为 900×520，这是组件坐标，不是母版画幅。按母版已确认的素材窗口和安全区放置，不能把自然尺寸抄成视频尺寸。修改现有组件优先实例覆盖，避免改共享资产影响别处。

回读工程、属性与实际合成帧，检查入场、完成、退场、换字、调速、字体、英文间距、长文、透明背景和底片遮挡。真实视频的关键对象与字词按唯一音频校时；卡拉 OK 演示时间不等于自动对齐。

## 来源和验证边界

来源及许可见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。原型适配与独立实现分开，不声称是上游逐像素原版。当前打包验证以根目录验证记录为准；语法或载荷检查不能证明全部效果已在朋友的编辑器中实测。
