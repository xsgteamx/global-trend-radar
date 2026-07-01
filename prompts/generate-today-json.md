# Generate Today JSON

You are generating the daily data file for Global Trend Radar.

Output only valid JSON. Do not wrap it in Markdown. Do not include commentary before or after the JSON.

## Goal

Generate `data/today.json` for a global macro trend dashboard.

The product is not a news list, not a hot topic ranking, and not a long report. It is a concise "world observation window" that lets a reader understand the day's main global direction within 30 seconds.

## Required Pre-Update Archive Step

Before replacing `data/today.json`, preserve history.

Daily update order:

1. Read the existing `data/today.json`.
2. Read its `date` field.
3. Save that exact existing JSON to `data/history/<date>.json` before overwriting `today.json`.
4. Generate the new JSON for the new date.
5. Write the new JSON to `data/today.json`.
6. Save the same new JSON to `data/history/<new date>.json`.

Never overwrite `data/today.json` without first archiving the previous content. The history filename must match the JSON `date` field. If the target history file already exists and differs from the current `today.json`, stop for manual review instead of silently overwriting history.

## Required Shape

```json
{
  "date": "YYYY-MM-DD",
  "generatedBy": "ChatGPT",
  "version": "0.2",
  "headline": "",
  "summary": "",
  "windows": [],
  "statusGroups": {
    "high": [],
    "rising": [],
    "accelerating": [],
    "seed": []
  },
  "keyChanges": [],
  "sourcesNote": "本期由 ChatGPT 基于公开信息与趋势判断生成。"
}
```

## Windows

Generate exactly 8 observation windows:

1. 世界秩序 / 地缘安全
2. 经济金融 / 成本周期
3. 产业供应链 / 制造与贸易
4. 科技生产力 / AI 与自动化
5. 能源气候 / 资源与基础设施
6. 普通人生活 / 社会民生
7. 社会情绪 / 文化与舆论
8. 今日盲区

Each window must use this structure:

```json
{
  "id": "",
  "icon": "",
  "name": "",
  "title": "",
  "summary": "",
  "keywords": [],
  "status": ""
}
```

## Writing Constraints

- Each observation window keeps only one daily trend judgment.
- `title` must be short, concrete, and judgmental.
- `summary` should be a compact paragraph, not a long report.
- Recommended `summary` length: 80 to 180 Chinese characters.
- `keywords` should contain 5 to 8 short terms.
- `status` must be one of `high`, `rising`, `accelerating`, or `seed`.
- `headline` must be a highly compressed total judgment of the world today.
- Top-level `summary` explains the headline without becoming a long report.
- `keyChanges` must use `{ "from": "...", "to": "..." }`.
- `keyChanges` should contain 3 to 7 items.
- `statusGroups` must use the four required status keys.
- Each `statusGroups` category should contain around 20 representative short tags.
- Keep a global perspective; do not only follow the user's personal interests.
- Prefer durable macro shifts over one-day noise.
- Do not invent precise facts that would require citations unless you are confident they are broadly supported by public information.

## Output Rule

Return only JSON.
