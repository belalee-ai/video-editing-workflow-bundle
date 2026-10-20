---
name: apple-design
description: Design or review Apple-style gesture, spring, and sheet interactions when requested. Not for generic typography or every frontend change.
---

# Apple Design

> 组合包接入说明（2026-10-19 新增）：仅在用本副本制作视频时，先读取已安装的 `video-editing-workflow` 的需求确认与验收规则。说话风格、画幅、人物有无/位置、素材大小、字体/字号参考、字幕和素材风格缺失时先询问；原文示例和默认值不是用户选择。已确认配置优先；当前实现无法满足时先说明并让用户选择。仅术语查询、代码诊断或局部修改不重问无关设置。



Use the current request and project conventions to select only the relevant guidance. Stay within the requested component or interaction; do not expand a local change into a full design review.

Read the needed section of [DESIGN-REFERENCE.md](DESIGN-REFERENCE.md), not the whole file. The reference preserves the detailed rules, examples, and links. Search its headings first:

- The Core Idea
- 1. Response — kill latency
- 2. Direct manipulation — 1:1 tracking
- 3. Interruptibility — the single most important principle
- 4. Behavior over animation — use springs
- 5. Velocity handoff — the seam between drag and animation
- 6. Momentum projection — animate to where the gesture is *going*
- 7. Spatial consistency — symmetric paths, anchored origins
- 8. Hint in the direction of the gesture
- 9. Rubber-banding — soft boundaries
- 10. Gesture design details (the "feel" checklist)
- 11. Frame-level smoothness
- 12. Materials & depth — translucency conveys hierarchy
- 13. Multimodal feedback — motion + sound + haptics
- 14. Reduced motion & accessibility
- 15. Typography — optical sizing, tracking, leading
- 16. Design foundations — the eight principles
- 17. Process
- Quick Reference

If a concrete task is already present, begin it directly. Ask only when a missing decision materially changes the result. Treat aesthetic prescriptions as context-sensitive guidance; report only evidence-backed issues and keep optional preferences separate. This entry governs scope and routing if the reference uses broader wording. Verify the affected visible result, then stop when the requested outcome is met.
