# ChatGPT Data Contract

This document defines the data contract for Global Trend Radar V0.2.

ChatGPT is the current data supplier. The app reads one structured JSON file, `data/today.json`, and archived copies are stored in `data/history/YYYY-MM-DD.json`.

## Data Flow

```text
ChatGPT generates today's global trend radar JSON
        ↓
Write the JSON to data/today.json
        ↓
Copy the same JSON to data/history/YYYY-MM-DD.json
        ↓
The frontend imports data/today.json
```

## Top-Level Fields

```json
{
  "date": "2026-07-01",
  "generatedBy": "ChatGPT",
  "version": "0.2",
  "headline": "国家买安全，企业买自动化，普通人保现金流，AI 吃电力，社会重新寻找可信。",
  "summary": "世界正在变得更安全化、更自动化、更成本敏感、更依赖电力，也更需要可验证的信任。",
  "windows": [],
  "statusGroups": {},
  "keyChanges": [],
  "sourcesNote": "本期由 ChatGPT 基于公开信息与趋势判断生成。"
}
```

| Field | Type | Meaning |
| --- | --- | --- |
| `date` | string | Date for the radar data, formatted as `YYYY-MM-DD`. |
| `generatedBy` | string | Data producer. Use `ChatGPT` for the current workflow. |
| `version` | string | Data contract version. Current value: `0.2`. |
| `headline` | string | Highly compressed one-sentence global judgment. |
| `summary` | string | Supporting explanation for the headline. |
| `windows` | array | Exactly 8 observation windows. |
| `statusGroups` | object | Tags grouped by status enum. |
| `keyChanges` | array | Key shifts written as `from` to `to`. |
| `sourcesNote` | string | Short note describing the basis of the generated judgment. |

## Observation Windows

Each item in `windows` must follow this shape:

```json
{
  "id": "technology-productivity",
  "icon": "🤖",
  "name": "科技生产力",
  "title": "AI 从工具变成执行层",
  "summary": "AI 不只是聊天，而是在进入办公、开发、客服、分析和流程自动化。",
  "keywords": ["Agent", "自动化", "工作流", "AI 审计", "本地 AI"],
  "status": "accelerating"
}
```

Required constraints:

- `windows` must contain exactly 8 items.
- The first 7 windows should cover the stable system layers: world order, economy and finance, industry and supply chain, technology and productivity, energy and climate, ordinary life, social culture.
- The 8th window is `今日盲区`, used for one important global signal the user may overlook.
- Each window must contain only one main trend judgment for the day.
- `title` should be short and judgmental, not a neutral topic label.
- `summary` should be one concise sentence.
- `keywords` must contain 3 to 6 items.

## Status Enum

`status` must be one of:

- `high`: 高位
- `rising`: 升温
- `accelerating`: 加速
- `seed`: 苗头

`statusGroups` must include all four keys:

```json
{
  "high": [],
  "rising": [],
  "accelerating": [],
  "seed": []
}
```

Each status group should contain short tags, not sentences.

## Key Changes

`keyChanges` records the most important shifts of the day:

```json
[
  { "from": "效率优先", "to": "安全韧性" },
  { "from": "聊天 AI", "to": "执行 AI" }
]
```

Rules:

- Use 3 to 7 changes.
- Keep both `from` and `to` short.
- Prefer structural shifts over one-off news events.

## Writing Rules For ChatGPT

- Do not produce a news list.
- Do not write a long report.
- Do not center the output only on the user's personal interests.
- Keep a global perspective.
- Prefer macro direction, system pressure, and durable signals.
- Keep the frontend readable within 30 seconds.
- If a trend is uncertain, express it as `seed` rather than overstating confidence.

## Archive Rule

Every time `data/today.json` is updated, copy the exact same content to:

```text
data/history/YYYY-MM-DD.json
```

The archive date must match the `date` field in the JSON.
