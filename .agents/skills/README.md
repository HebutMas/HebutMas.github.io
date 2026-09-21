# 项目内置 Agent Skills

本目录存放本仓库使用的 AI Agent 技能（[Agent Skills 规范](https://github.com/anthropics/skills)：每个技能是一个带 YAML frontmatter 的 `SKILL.md`）。
技能文件由 Claude Code / DeepSeek Harness 等支持 Agent Skills 的工具自动发现，**不参与网站构建**，也不会被 GitHub Pages 引用。

## 已安装

| 技能 | 用途 | 来源 |
|------|------|------|
| `frontend-design` | 视觉方向、字体与排版、避免「一眼 AI」的模板感设计 | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design)（官方，Apache-2.0） |
| `theme-factory` | 10 套预设主题（配色 + 字体），用于统一视觉风格 | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/theme-factory)（官方） |
| `ui-ux-pro-max` | 50+ 风格、97 套配色、57 组字体搭配、99 条 UX 规则的检索库，附 `scripts/search.py` | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills/tree/main/skills/ui-ux-pro-max)（社区镜像） |
| `web-interface-guidelines` | Vercel Labs 的 Web 界面规范：可访问性、焦点、表单、动画、性能 | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) |

## 用法

装了技能的工具会自动读取 `SKILL.md`，一般无需手动操作。`ui-ux-pro-max` 需要 Python 才能用检索脚本：

```bash
# 生成整套设计系统建议（配色 / 字体 / 风格 / 反模式）
python .agents/skills/ui-ux-pro-max/scripts/search.py "robotics competition team dark tech" --design-system -f markdown

# 查具体领域：ux / typography / color / style / landing
python .agents/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux
```

> Windows 控制台若报 `UnicodeEncodeError`，先设 `$env:PYTHONIOENCODING='utf-8'`。

## 更新

各技能均为上游仓库文件的直接副本，更新时重新拉取对应目录即可。上游许可：
`frontend-design`、`theme-factory` 为 Apache-2.0（见各自目录下 `LICENSE.txt`）；
`web-interface-guidelines` 为 MIT（见 `LICENSE`）。
