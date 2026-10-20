# 第三方内容与分发范围

本包自有通用内容的 MIT 选择不改变第三方许可。`third_party/skills/` 中的每个组件保留完整原版权与许可；新增的视频需求确认段单独记录为组合包改动。详细文件指纹见 [manifest.json](../third_party/manifest.json)。

| 组件组 | 原作者/来源 | 许可与本次处理 |
|---|---|---|
| 8 个 GSAP Skill | [GreenSock](https://github.com/greensock/gsap-skills) | 原 Skill 说明 MIT；不包含 GSAP 运行库，后者许可单独核对 |
| 6 个动效与设计审查 Skill | [Emil Kowalski](https://github.com/emilkowalski/skills) | 原说明 MIT；按安装副本整理，不将本机说明与当前上游宣称逐字相同 |
| humanizer-zh | [op7418/humanizer-zh](https://github.com/op7418/humanizer-zh) | 原 MIT 保留 |
| good-broll | Amber Huang | 已收到本地包及 MIT 声明；保留全部原版权；未确立公开原仓库，不补造链接 |
| gbro-collage-broll | [pyang5166/gbro-collage-broll](https://github.com/pyang5166/gbro-collage-broll)，版权声明为狗哥笔记 | 原 MIT 保留；云端模型、额度与上传服务需用户自己的条件 |
| seedance-prompt-en / zh | [pa4uslf/seedance2-codex-skill](https://github.com/pa4uslf/seedance2-codex-skill)，版权声明为 Dex | 原 MIT 保留；中文条目拆为独立目录，未附视频模型或服务 |

基础文字源码另有 [组件来源通知](../skills/text-motion-library/THIRD-PARTY-NOTICES.md)，包含 Remotion Scenes 的完整 MIT 许可。它没有携带字体、人物、整站素材或 Remotion 运行库。

## 没有重新许可的内容

- `onetake`：按原仓库非商业许可独立安装。
- DBS：当前上游为 CC BY-NC 4.0，且部分旧 Skill 名已变化；保留入口与说明，不随主包当作可商用组件。
- `gbro-collage-info`：原包中 GSAP 程序与 Mixkit 音效有各自条件，因此本组合包只提供上游入口，不把音频素材当独立可再分发资源。
- HyperFrames、Remotion、VideoUse、Shotcraft 及其他工具：按原仓库安装；代码、字体、音频、服务与运行许可分别适用。
- 本机旧 `shuorenhua` 来源未确立，未分发；其他同名仓库只作为需要用户同意的替代。

上游入口和本次分发状态见 [依赖清单](dependencies.json)。第三方免责声明、作者署名和许可证不能被主包 LICENSE 替换。

`review-animations` 保留原包 Claude Code 的显式调用字段，同时新增 Codex 对应的 `allow_implicit_invocation: false` 策略；不为统一校验器而取消原来的调用限制。
