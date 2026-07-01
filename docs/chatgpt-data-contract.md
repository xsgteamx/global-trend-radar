# ChatGPT Data Contract

This document defines the data contract for Global Trend Radar V0.2.

ChatGPT is the current data supplier. The app reads one structured JSON file, `data/today.json`, and archived copies are stored in `data/history/YYYY-MM-DD.json`.

## Data Flow

```text
Before generating new data:
read current data/today.json
        ↓
archive the current file to data/history/<current date>.json
        ↓
ChatGPT generates the new daily global trend radar JSON
        ↓
write the new JSON to data/today.json
        ↓
copy the new JSON to data/history/<new date>.json
        ↓
the frontend imports data/today.json
```

Important: never overwrite `data/today.json` without first preserving the previous version in `data/history/YYYY-MM-DD.json`.

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
- `summary` can be richer than a single short sentence, but should stay readable as one compact paragraph.
- `summary` may include representative hotlist attention signals, but those signals must be translated into structural trend language.
- Recommended `summary` length: 90 to 200 Chinese characters.
- `keywords` should contain 5 to 8 items unless the frontend contract is changed.

## Hotlist Fusion Rule

Hotlist sources are attention signals, not final evidence.

Use hotlists to detect what people are searching, discussing, watching, sharing, doubting, or worrying about today. Then translate those signals into the 8 observation windows.

Recommended card composition:

- 70% structural judgment.
- 20% hotlist attention signal.
- 10% concrete example.

Rules:

- Do not copy raw hotlist titles into cards.
- Do not turn cards into a news list.
- Do not let celebrity, entertainment, or one-platform noise dominate unless it reveals a broader cultural, consumer, social, platform, or governance signal.
- Do not add fields such as `attentionSignals` until the frontend intentionally supports them.
- Keep hotlist evidence inside `summary`, `keywords`, `statusGroups`, or `sourcesNote` under the current contract.

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

Recommended rule for richer daily output:

- Each status group should contain around 36 representative tags when the UI can tolerate it; otherwise keep around 20.
- Tags should be short and scannable.
- Avoid duplicate or near-duplicate tags in the same group.
- Do not put long explanations inside `statusGroups`; explanations belong in `windows.summary`.

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
- Use hotlist signals to add today's public attention and ordinary-person perspective.
- Keep the frontend readable within 30 seconds.
- If a trend is uncertain, express it as `seed` rather than overstating confidence.

## Archive Rule

Historical data must be preserved before every update.

Daily update order:

1. Read current `data/today.json`.
2. Inspect its `date` field.
3. Write that exact current JSON to `data/history/<date>.json` before replacing it.
4. Generate the new daily JSON.
5. Write the new JSON to `data/today.json`.
6. Also write the same new JSON to `data/history/<new date>.json`.

Rules:

- Never overwrite `data/today.json` directly without first archiving the current file.
- The history filename must match the `date` field inside the JSON.
- If `data/history/<date>.json` already exists and differs from the current `today.json`, create a conflict note or stop for manual review rather than silently overwriting valuable history.
- History files are intended for future features such as reading prior radar JSON by date.
