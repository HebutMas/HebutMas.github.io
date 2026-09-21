---
name: web-interface-guidelines
description: Vercel Labs 的 Web 界面规范清单，覆盖可访问性、焦点状态、表单、动画、布局与性能。用于审查 HTML/CSS/JS 界面代码，或实现交互组件时对齐工程标准。
---

# Web Interface Guidelines

Vercel Labs 维护的 Web 界面规则集（MUST / SHOULD / NEVER），用于审查与实现 UI 代码。

## 资源

- `AGENTS.md` — 精简规则集，按交互、动画、布局、内容与可访问性、性能、暗色主题分组。**实现组件前先读这份。**
- `command.md` — 代码审查清单，逐条列出可勾选规则。**审查页面/组件时用这份。**
- `README.md` — 完整版规范，每条规则附带「为什么」与正反例。需要判断某条规则的边界时读它。

## 使用方式

审查（review）：
1. 用 `command.md` 的规则逐条比对目标文件。
2. 输出精简但完整的问题列表，标明文件与行号，高信噪比，不必客套。
3. 按严重程度排序：先可访问性与键盘可用性，再性能与布局，最后风格细节。

实现（implement）：
1. 先读 `AGENTS.md` 中的 MUST 条款，作为实现的硬约束。
2. 关键不可退让项：可见焦点环（`:focus-visible`）、命中区域尺寸（移动端 ≥44px）、`prefers-reduced-motion`、图片显式尺寸防 CLS、`for`/`id` 关联的表单标签、语义化标签优先于 ARIA。
3. 完成后对照 `command.md` 自查一遍再交付。

## 注意

这套规则是工程标准，与具体视觉风格无关：它保证界面「能用、好用、对所有人都能用」，不决定界面「长什么样」。视觉方向由 `frontend-design` 等技能负责。
