# Global Trend Radar / 全球风向盘

[![Deploy to GitHub Pages](https://github.com/xsgteamx/global-trend-radar/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/xsgteamx/global-trend-radar/actions/workflows/deploy-pages.yml)

一个用于快速观察全球趋势变化的轻量仪表盘。

它不是新闻日报、热点榜或长篇报告，而是一个“世界观察窗”：

> 信息少，但是凝练；打开首页 30 秒内看懂世界正在往哪偏。

## 在线部署

本项目可通过 GitHub Pages 部署。

默认项目页地址：

https://xsgteamx.github.io/global-trend-radar/

每次推送到 `main` 后，GitHub Actions 会自动构建并发布 `dist`。

注意：当前 `vite.config.ts` 使用 `base: '/global-trend-radar/'`，适配 GitHub Project Pages。如果绑定自定义域名，需要改为 `base: '/'`。

如果仓库还没有启用 Pages，需要在 GitHub UI 中设置：

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

## 当前数据供给方式

V0.2 起，数据源是 ChatGPT。

GitHub 项目负责展示和存档，ChatGPT 负责观察、判断、总结，并生成可落库的 JSON 数据。

```text
ChatGPT 生成今日全球风向数据
        ↓
输出 JSON
        ↓
写入 repo：data/today.json
        ↓
复制归档：data/history/YYYY-MM-DD.json
        ↓
前端读取 today.json 展示首页
```

## MVP 目标

- 使用静态 JSON 驱动首页
- 展示 7 个固定世界系统层 + 1 个动态盲区格
- 每个观察窗只展示领域名、今日风向标题、一句话判断和关键词
- 展示今日状态标签与“从 A 到 B”的关键变化
- 保持前台信息少、判断明确、30 秒可读

## 世界观察窗

1. 世界秩序 / 地缘安全
2. 经济金融 / 成本周期
3. 产业供应链 / 制造与贸易
4. 科技生产力 / AI 与自动化
5. 能源气候 / 资源与基础设施
6. 普通人生活 / 社会民生
7. 社会情绪 / 文化与舆论
8. 今日盲区

## 本地运行

```bash
pnpm install
pnpm run dev
```

如果本机使用 npm，也可以运行：

```bash
npm install
npm run dev
```

## 构建

```bash
pnpm run build
```

## 本地预览生产构建

```bash
pnpm run preview
```

## 数据入口

当前前端读取：

```text
data/today.json
```

历史快照保存在：

```text
data/history/YYYY-MM-DD.json
```

## 手动更新今日数据

1. 让 ChatGPT 生成今天的 JSON。
2. 覆盖 `data/today.json`。
3. 复制一份到 `data/history/YYYY-MM-DD.json`。
4. 运行 `pnpm run build`。
5. commit/push。

数据字段和写作约束见 [docs/chatgpt-data-contract.md](docs/chatgpt-data-contract.md)。

生成提示词模板见 [prompts/generate-today-json.md](prompts/generate-today-json.md)。
