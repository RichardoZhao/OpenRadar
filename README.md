# OpenRadar

**A daily digest of trending GitHub open-source tools — in Chinese.**

Skip the English firehose and the endless feeds: open it and see what's actually worth looking at today.

`v0.1` · Installable PWA · MIT License

**▶ [Open the app](https://richardozhao.github.io/OpenRadar/)** · [中文说明 README](README.zh-CN.md)

---

## The problem

If you follow open source, you know the routine:

```
· GitHub Trending is all English — you skim and still aren't sure what's what
· tech feeds throw dozens of items a day at you; the signal gets lost
· you bookmark more and more, and read none of it
· you search for "tools I can actually use" and get tutorials instead
```

**OpenRadar aggregates daily, filters for tools that actually work, sorts them by what you want to do, and adds a
Chinese summary + a 300-character detail blurb.**

---

## What you get every day

| List | Source | What it is |
|---|---|---|
| 🔥 **Today's surge** | GitHub Trending (daily) | the 5 fastest-starred repos today |
| 📈 **Weekly gainers** | GitHub Trending (weekly) | official weekly top 5 |
| 📅 **Monthly gainers** | GitHub Trending (monthly) | monthly trend |
| 🆕 **New this week** | GitHub Search API | created within 7 days, already gaining traction |
| 🌟 **All-time high scorers** | GitHub Search API | 30k+ stars, proven over time |
| 📖 **Weekly picks** | Ruanyf's *Technology Enthusiast Weekly* | follows every new issue automatically |

**Four data points per project**: `⭐ total` `🔥 today` `📈 week` `📅 month` — momentum as well as scale, so you can
tell a fresh hit from a classic at a glance.

**Every entry is in Chinese**: a one-line summary, plus a 300-character description. No need to read the English source first.

---

## Nine categories

Not by language, not by star count — **by what you want to do**:

```
System utilities · Text editing · Image tools · Playback · Audio editing
Video editing · Copywriting · AI Skills · Agents
```

Plus **[App] / [Skill] / [Agent]** badges so you can tell at a glance whether it's something you install
or a skill pack you feed to an AI.

---

## How to use it

### ① Install as a phone app (recommended)

1. Open **https://richardozhao.github.io/OpenRadar/** in a browser
2. **iPhone**: Safari → Share → *Add to Home Screen*
3. **Android**: Chrome menu → *Install app* / *Add to Home Screen*

Tested on iPhone Safari and Android Chrome. Once installed it has its own icon and opens without a browser
(the data is cached; it refreshes when online).

### ② Use it on a desktop

Same URL in any browser. Nothing to install.

### ③ Run it locally

```bash
git clone https://github.com/RichardoZhao/OpenRadar.git
cd OpenRadar
# serve it statically (don't double-click index.html — a PWA needs an http context)
python -m http.server 8123
# open http://localhost:8123
```

> ⚠️ Accessing `http://<your-ip>:8123` from a phone **disables installation and offline mode** —
> browsers only treat `https` or `localhost` as a secure context. Use GitHub Pages if you want it on your phone.

---

## Three tabs

| Tab | Contents |
|---|---|
| **Top-rated** | long-standing, high-star classics worth keeping |
| **New** | recently emerged projects, early look |
| **Categories** | browse by the nine use cases |

Cards show all four data points; *Details* expands the 300-character summary; *Copy link* takes it with you.

---

## Technical notes

```
Pure static: HTML + CSS + vanilla JS — no framework, no build, no backend
Data: data.json (updated daily, lives in this repo)
Offline: Service Worker caches the shell; data.json is not cached (always fresh)
Size: the whole app is < 130 KB
Deploy: any static host (GitHub Pages / nginx / object storage)
```

**Why not a mini-program or native app?** Because a PWA is enough — installing it feels almost identical to a native
app, without review, signing or release cycles. Change one file and everyone is on the latest version.

### Repository layout

```
.
├── index.html        the app (HTML + inline CSS/JS, single file, ~18 KB)
├── manifest.json     PWA manifest
├── sw.js             service worker (offline cache)
├── icons/            icons (192 / 512 / apple-touch-icon)
└── data.json         daily list data (~58 items, ~98 KB)
```

**Why is all the CSS/JS inlined into one HTML file?** So that "a single file just runs" — a PWA needs no build
tooling, and splitting files would add deployment friction without any benefit.

### data.json shape

```json
{
  "date": "2026-09-15",
  "generated": "2026-09-15 09:17",
  "items": [
    {
      "name": "Mac-Duo",
      "owner_repo": "sumimakito/Mac-Duo",
      "url": "https://github.com/...",
      "desc_zh": "one-line Chinese summary",
      "detail_zh": "300-character Chinese detail",
      "desc_en": "original English description",
      "topics": ["macos", "..."],
      "lang": "Swift",
      "cat": "system",
      "badge": "app",
      "stars": 1234,
      "stars_today": 120,
      "stars_week": 800,
      "stars_month": 3000,
      "source": "trending_daily",
      "pushed_at": "2026-09-14T..."
    }
  ]
}
```

---

## Data updates

`data.json` is generated and pushed daily by an upstream pipeline; this repository only hosts it.
The pipeline (fetch → classify → translate → rank) is not part of this repository.

**To check freshness**: the page header shows the data date and generation time.

---

## Scope — what it deliberately does not do

| Not done | Why |
|---|---|
| Compile/install guides | that's each project's own documentation; this tool only tells you the thing exists |
| Recommending tutorial/awesome-list repos | the goal is *usable tools*; courses, problem sets and link lists are excluded |
| Listing sensitive or abusive projects | there is a block-list (cracks, exploits, etc.) |
| Human curation | fully automated, to avoid bias and staleness |

---

## Deploy to your own server

Drop the whole directory onto any static host:

```bash
# e.g. nginx
scp -r ./* user@server:/var/www/openradar/
# point nginx at that directory — done
```

To refresh `data.json` automatically each day, add a cron entry on the server:

```bash
0 9 * * * curl -s -o /var/www/openradar/data.json \
  https://raw.githubusercontent.com/RichardoZhao/OpenRadar/main/data.json
```

> ⚠️ **Whether that cron works depends on where your server is.**
> Mainland-China nodes usually cannot reach `raw.githubusercontent.com`, and the command **fails silently** —
> the site looks alive while the data is days old. On a mainland node, use your own data pipeline or a
> domestically reachable mirror; Hong Kong / overseas nodes can use the line above as-is.

---

## Related repositories

| Repository | Purpose |
|---|---|
| **OpenRadar** (this repo) | PWA app + daily data |
| [Field8-OpenRadar-data](https://github.com/RichardoZhao/Field8-OpenRadar-data) | data-only mirror (for apps / third parties) |

---

## Data & Privacy

Everything shown comes from public sources (GitHub public data, Ruanyf's *Technology Enthusiast Weekly*) and
**contains no personal information**.

- This app **collects and uploads no user data**: no accounts, no analytics, no third-party trackers.
- All logic runs in your own browser; `data.json` is a static file and no backend is called.
- If you deploy your own copy, please also **do not** paste personal information into public repositories or issues.

## Sources & License

- **Code**: MIT License — see [LICENSE](LICENSE).
- **Data**: project names, descriptions and star counts come from the public GitHub API; some recommendations come
  from the **public pages** of Ruanyf's *Technology Enthusiast Weekly*.
- **Third-party content**: copyright in each project's information and in the weekly's content **belongs to the
  respective authors**; this repository **only records titles, original links and automatically generated Chinese
  summaries — it does not reproduce third-party text**. The MIT license of this repository **does not cover**
  that third-party content.

## Disclaimer

- The Chinese summaries and details here are **generated by an automated pipeline** — use them for a quick look and
  **treat each project's official README as authoritative**.
- This tool provides **no** installation, build or usage guidance for any project; inclusion is neither a
  recommendation nor a security endorsement — evaluate before adopting.
- This is **v0.1**: classification rules and translations are still improving; mis-categorisation or translation
  drift is possible. Issues with corrections are welcome.

## Feedback

Awkward to use? Want another category? Want to plug in your own data source? Open an issue.
This tool is first of all something I use every day — **it has to be useful to me before it can be useful to you.**
