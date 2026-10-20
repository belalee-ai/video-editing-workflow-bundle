# 组合包能力与获取方式

## 随包通用能力（11 个）

| Skill | 用途 |
|---|---|
| [video-editing-workflow](../../video-editing-workflow/SKILL.md) | 需求、分镜、主剪辑与验收 |
| [spoken-video-script](../../spoken-video-script/SKILL.md) | 使用者自己的口播与写稿 |
| [video-broll-director](../../video-broll-director/SKILL.md) | 真实素材、信息动画、人物与隐喻分诊 |
| [video-motion-director](../../video-motion-director/SKILL.md) | 动效选型、完成态与单样例 |
| [speech-progress-overlay](../../speech-progress-overlay/SKILL.md) | 章节/无标签、无人物/固定/跟随进度条，附配置与浏览器预览源码 |
| [video-character-assets](../../video-character-assets/SKILL.md) | 用户自己的真人或 IP 静态素材 |
| [handdrawn-video-diagrams](../../handdrawn-video-diagrams/SKILL.md) | 手绘故事、流程与关系图示 |
| [news-explainer-video](../../news-explainer-video/SKILL.md) | 新闻事实、机制与真实素材 |
| [video-cover-director](../../video-cover-director/SKILL.md) | 用户自己的封面方案 |
| [video-frame-art](../../video-frame-art/SKILL.md) | 可信选帧与静帧转译 |
| [text-motion-library](../../text-motion-library/SKILL.md) | 基础 001–030 的文字动作源码与载荷 |

这些通用入口不携带原作者个人风格、人物或工程。文字动效与进度条附通用源码（分别为载荷生成与浏览器预览）；其他入口提供通用制作方法，在用户确认后通过实际工具生成结果。

## 随包可选第三方（19 个）

通过根目录安装脚本的 `--include` 选择安装；不默认全部装入。它们保留各自版权与 MIT 许可，并增加一段组合包视频需求确认约定。原始展示样例不是用户默认风格。

| Skill | 文件 | 来源 |
|---|---|---|
| `animation-vocabulary` | `third_party/skills/animation-vocabulary/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `apple-design` | `third_party/skills/apple-design/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `emil-design-eng` | `third_party/skills/emil-design-eng/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `find-animation-opportunities` | `third_party/skills/find-animation-opportunities/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `gbro-collage-broll` | `third_party/skills/gbro-collage-broll/` | [上游仓库](https://github.com/pyang5166/gbro-collage-broll) |
| `good-broll` | `third_party/skills/good-broll/` | 收到的本地 MIT 包；作者 Amber Huang；公开原仓库尚未确立 |
| `gsap-core` | `third_party/skills/gsap-core/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-frameworks` | `third_party/skills/gsap-frameworks/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-performance` | `third_party/skills/gsap-performance/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-plugins` | `third_party/skills/gsap-plugins/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-react` | `third_party/skills/gsap-react/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-scrolltrigger` | `third_party/skills/gsap-scrolltrigger/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-timeline` | `third_party/skills/gsap-timeline/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `gsap-utils` | `third_party/skills/gsap-utils/` | [上游仓库](https://github.com/greensock/gsap-skills) |
| `humanizer-zh` | `third_party/skills/humanizer-zh/` | [上游仓库](https://github.com/op7418/humanizer-zh) |
| `improve-animations` | `third_party/skills/improve-animations/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `review-animations` | `third_party/skills/review-animations/` | [上游仓库](https://github.com/emilkowalski/skills) |
| `seedance-prompt-en` | `third_party/skills/seedance-prompt-en/` | [上游仓库](https://github.com/pa4uslf/seedance2-codex-skill) |
| `seedance-prompt-zh` | `third_party/skills/seedance-prompt-zh/` | [上游仓库](https://github.com/pa4uslf/seedance2-codex-skill) |

## 独立安装（37 个）

完整原仓库、插件与运行依赖按需安装。包含字体、媒体素材、外部工具或独立许可的项目不被压成“主包 MIT”；首次使用检查当前目录、工具和具体用途。当前上游可能与作者已装的旧版不同。

| Skill | 获取入口 | 注意 |
|---|---|---|
| `animator-skill` | [原仓库](https://github.com/rainlib/ai-storyboard) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `dbs-content` | [原仓库](https://github.com/dontbesilent2025/dbskill) | CC BY-NC 4.0；非本包默认商用路线 |
| `dbs-hook` | [原仓库](https://github.com/dontbesilent2025/dbskill) | CC BY-NC 4.0；旧名称已不在当前目录，见下文 |
| `dbs-xhs-title` | [原仓库](https://github.com/dontbesilent2025/dbskill) | CC BY-NC 4.0；旧名称已不在当前目录，见下文 |
| `embedded-captions` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `faceless-explainer` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `gbro-collage-info` | [原仓库](https://github.com/pyang5166/gbro-collage-info) | MIT 源码之外含单独许可的 GSAP 与 Mixkit 音效；独立安装并保留原说明 |
| `general-video` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-animation` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-audio` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-cli` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-core` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-creative` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-keyframes` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `hyperframes-registry` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `media-use` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `motion-graphics` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `music-to-video` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `onetake` | [原仓库](https://github.com/feitangyuan/onetake) | 非商业限制；商业用途先核对有效授权 |
| `product-launch-video` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `remotion-to-hyperframes` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `seedance-storyboard` | [原仓库](https://github.com/elementsix/elementsix-skills) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `storyboard-creation` | [原仓库](https://github.com/tool-belt/skills) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `talking-head-recut` | [原仓库](https://github.com/heygen-com/hyperframes) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `threejs-animation` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `threejs-fundamentals` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `threejs-interaction` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `threejs-lighting` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `threejs-loaders` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `threejs-materials` | [原仓库](https://github.com/CloudAI-X/threejs-skills) | 当前上游与本机旧副本内容不完全相同，不宣称原样移植 |
| `video-prompting` | [原仓库](https://github.com/square-zero-labs/video-prompting-skill) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `video-shotcraft` | [原仓库](https://github.com/Vincentwei1021/video-shotcraft) | 源码、音频素材、Remotion 运行许可分别处理 |
| `video-use` | [原仓库](https://github.com/browser-use/video-use) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `xiaohu-subtitle-polish` | [原仓库](https://github.com/xiaohuailabs/xiaohu-video-translate) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `xiaohu-video-md` | [原仓库](https://github.com/xiaohuailabs/xiaohu-video-translate) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |
| `seedance-2.0-prompter` | [原仓库](https://github.com/pexoai/pexo-skills) | 按当前仓库说明安装这个具体 Skill；尚未在本包做完整功能实测 |

### 旧名不能直接当成现在能安装的组件

当前 DBS 目录保留 `dbs-content`，已不见本机旧名 `dbs-hook` / `dbs-xhs-title`。当前存在 `dbs-title-cover-intro` / `dbs-script-flow`，可以按任务核对，但不能在用户不知情时当成同一组件。它们仍遵守 DBS 原许可，不能因主包 MIT 就默认用于商业制作。

## 一个来源未确立的旧副本

本机旧 `shuorenhua` 与已核验的 [MrGeDiao/shuorenhua](https://github.com/MrGeDiao/shuorenhua) 当前内容差异明显，尚不能确认原始出处，因此没有分发旧副本。该仓库可作为明确标注的替代选择，用户同意后再安装；不能把它写成旧包已经找到来源。基本写稿可由主模型完成，或按需使用随包的 `humanizer-zh`，不暗中替换。

## 官方工具与插件

- ChatCut：用户在自己的 Agent 中安装/连接当前官方插件，使用基础、导入、转录、口播、MG、验收和导出；按需要再启用音乐、声音、视频生成等。认证和编辑工具不能通过复制本包得到。
- Remotion：使用所选宿主的官方 Remotion 插件/Skill 和实际运行库；本包不复制插件缓存，按当前工具说明选 create/markup/captions/render 等任务。
- 生图：使用当前宿主实际可用且用户选择的图片生成/编辑工具。没有该工具就说明缺口，不把提示词当生成图片。

## 可复制的扩展安装请求

> 请从表中对应的原始仓库，按当前官方 README 为我的 Agent 安装我选定的 Skill。先核对实际名称、许可、依赖和现有定制；旧名不存在就说明变化并让我选替代。只装当前镜头需要的组件，保留版权说明，不复制账号或凭据，不自动启动生成、付费任务或发布。安装后分开报告文件完整性、客户端加载和实际功能实测。

详细分发状态、原始来源与许可信息见包根目录 `docs/dependencies.json` 和 `third_party/manifest.json`。
