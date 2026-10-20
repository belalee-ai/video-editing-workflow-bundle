# 来源和许可

这是一套中文、透明叠层与参数化适配，不声称与上游完整视觉逐像素一致。

- 逐词出现、模糊上推和打字参考 Remotion Bits，https://github.com/av/remotion-bits 。仓库README与package.json标记MIT。参考了WordByWord.tsx、BlurSlideWord.tsx和Typewriter展示的帧驱动机制；本项目不依赖remotion-bits运行包。
- 遮罩、波浪和翻字改写自Remotion Scenes，https://github.com/lifeprompt-team/remotion-scenes 。Copyright (c) 2026 lifeprompt-team，MIT。调整了字体、底色、自然框、编辑属性和阅读停留，删除示例背景装饰；波浪末段归稳。
- 散字归位与停顿打字为本项目原创帧驱动实现。

## 2026-10-15扩充来源与实现边界

新增22种均为本库独立编写的Remotion帧驱动实现，参考公开演示和常见运动机制，没有复制或移植下列项目的组件源代码，也不声称与源站或剪映同名特效逐像素一致。

- Motion官方文字动画指南：https://motion.dev/docs/text-animation 。参考分字、滚动揭示、滚动字面与乱码解码等机制；未使用Motion+付费组件。
- Motion Primitives：https://motion-primitives.com/docs/text-effect ，项目https://github.com/ibelick/motion-primitives ，当前LICENCE.md为MIT。仅参考演示与机制，未引入其运行包。
- Magic UI：https://magicui.design/ ，项目https://github.com/magicuidesign/magicui ，当前LICENSE.md为MIT。各效果的对应演示链接保存在EFFECTS[].source。
- React Bits：https://reactbits.dev/c/text-animations ，项目https://github.com/DavidHDev/react-bits 。2026-10-15核对LICENSE.md为MIT + Commons Clause，限制组件本身（含移植版）的再分发。本库只作为视觉机制参考链接，故障切片、描边填充、残影和聚焦均独立实现，不分发上游组件代码。
- 用户提供的剪映截图用于理解通用动作与搜索叫法；截图是静态缩略图，不能证明完整时间过程。未提取剪映资产、模板、字体或专有代码。别名仅表示相近检索方向。
- 原创通用效果：停顿打字、散字归位、霓虹呼吸、放大震动。

Remotion Scenes的MIT许可：

Copyright (c) 2026 lifeprompt-team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
