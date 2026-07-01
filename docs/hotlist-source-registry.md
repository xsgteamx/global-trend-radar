# Hotlist Source Registry

This document defines the mainstream hotlist and trend entrances used by ChatGPT when generating `data/today.json`.

The current workflow does **not** require the frontend to fetch these sources directly. These sources are used as attention signals before ChatGPT produces the daily structured JSON.

## Source Role

Hotlists are not final evidence by themselves. They are attention signals.

Use them to answer:

- What are people searching for today?
- What are people discussing today?
- What content is spreading today?
- Which topics cross platforms or regions?
- Which topics are noisy entertainment and should be down-weighted?
- Which topics reveal broader structural shifts?

The final radar should still prefer macro direction, durable signals, and cross-domain interpretation.

## Domestic Entrances

| Source | Type | URL | Usage |
| --- | --- | --- | --- |
| 百度热搜 | Search attention | `https://top.baidu.com/board?tab=realtime` | Chinese search demand, public event attention, consumer and policy signals. |
| 知乎热榜 | Q&A / discussion | `https://www.zhihu.com/hot` | Knowledge-community discussion, middle-class concerns, education/work/technology narratives. |
| 哔哩哔哩热门 / 排行榜 | Video / youth culture | `https://www.bilibili.com/v/popular/rank/all` | Youth culture, gaming, ACG, tech creators, public-event video attention. |
| 抖音热点 | Short video / mass culture | `https://www.douyin.com/hot` | Mass short-video attention, lifestyle, consumption, entertainment, local events. |
| 微博热搜 | Social / celebrity / public events | `https://s.weibo.com/top/summary` | Fast social attention, public incidents, entertainment, sentiment bursts. |
| 腾讯新闻 | Portal news | `https://news.qq.com/` | Mainstream Chinese news framing and portal-level public news. |
| 今日头条热榜 | Algorithmic news / mass attention | `https://www.toutiao.com/hot-event/hot-board/` | Mass algorithmic news attention, local incidents, policy and social issues. |

## International Entrances

| Source | Type | URL | Usage |
| --- | --- | --- | --- |
| Google Trends / Trending Now | Search attention | `https://trends.google.com/trending` | Global and regional search surges, cross-country public attention. |
| TikTok Creative Center Trends | Short video / hashtag trends | `https://ads.tiktok.com/creative/creativeCenter/trends` | International short-video culture, hashtag diffusion, consumer and creator trends. |
| YouTube Trending | Video attention | `https://www.youtube.com/feed/trending` | Global video attention, creator economy, music, entertainment, public issues. |
| Reddit Popular | Forum / community attention | `https://www.reddit.com/r/popular/` | English-speaking community attention, tech culture, politics, society, memes. |
| Hacker News | Tech / startup attention | `https://news.ycombinator.com/` | Developer, startup, AI, software, infra and product signals. |
| Reuters | Hard news | `https://www.reuters.com/` | Hard-news verification for geopolitics, markets, policy, energy, companies. |
| AP News | Hard news | `https://apnews.com/` | Broad international factual baseline. |
| BBC News | Global news | `https://www.bbc.com/news` | Global public-news framing and regional coverage. |

## Weighting Rules

When generating `today.json`, ChatGPT should treat source types differently:

1. Search hotlists show demand and concern.
2. Social hotlists show emotion and diffusion speed.
3. Video hotlists show culture, consumption, youth and creator signals.
4. Q&A hotlists show confusion, debate and middle-class concerns.
5. Hard-news sources verify factual seriousness.
6. Official or institutional sources verify durable macro trends.

Do not let entertainment dominate the radar unless the topic reveals broader cultural, consumer, social, or technological change.

## Cross-Platform Promotion Rules

A topic deserves higher attention if it appears across multiple source types, for example:

- Search + social + hard news
- Short video + e-commerce + consumer behavior
- Q&A + workplace + education
- Search + policy + industry
- Tech forum + company news + investment

A topic should be down-weighted if it appears only as one-platform entertainment noise and has no broader signal.

## Daily Sampling Checklist

Before generating `today.json`, sample at least:

- 3 domestic attention entrances
- 3 international attention entrances
- 2 hard-news or institutional references

Then compress findings into the existing 8 observation windows:

1. 世界秩序
2. 经济金融
3. 产业供应链
4. 科技生产力
5. 能源气候
6. 普通人生活
7. 社会情绪文化
8. 今日盲区

## Current Limitations

Some sources are JS-rendered, login-gated, region-specific, or anti-bot protected. If a source cannot be fetched automatically, it can still be used as a manual browsing entrance or replaced with a nearby public source.

Do not build fragile scrapers against platforms that actively block automated fetching unless a stable public API or permitted data interface is available.
