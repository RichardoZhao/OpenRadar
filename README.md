# 开源雷达 · OpenRadar

> **每天一份中文的 GitHub 热门开源工具榜。**
> 不用翻墙、不用啃英文、不用被信息流淹没——打开就知道今天有什么值得看的。

**当前版本：v0.1** · 可装在手机上（PWA）· MIT License

---

## 它解决什么问题

关注开源的人有个共同的困境：

```
· GitHub 官方 Trending 全是英文，看半天不知所云
· 技术社群的信息流一天几十条，抓不住重点
· 收藏夹越积越多，最后一条都没看过
· 想找"能用的工具"，搜出来的全是"学习资料"
```

**开源雷达做的事很简单**：每天从多个源头聚合，**筛选出真正能用的工具**，
按用途分好类，配上**中文简介**和**300 字详情**，推给你。

---

## 每天给你什么

| 榜单 | 来源 | 说明 |
|---|---|---|
| 🔥 **今日爆火** | GitHub Trending（日榜） | 今天涨星最快的 Top5 |
| 📈 **周增榜** | GitHub Trending（周榜） | 官方周增口径 Top5 |
| 📅 **月增榜** | GitHub Trending（月榜） | 月度趋势 |
| 🆕 **本周新项目** | GitHub Search API | 7 天内新建、且已有热度 |
| 🌟 **高分总榜** | GitHub Search API | 3 万星以上，经得起时间考验 |
| 📖 **精选周推** | 阮一峰《科技爱好者周刊》 | 每期自动跟进 |

**每个项目带四组数据**：`⭐总星` `🔥今日增` `📈周增` `📅月增`
—— 看热度也看势头，一眼分清新爆款和老牌经典。

**每条都有中文**：一句话简介 + 点开看 300 字详细介绍。**不需要英文能力。**

---

## 九类用途分类

不是按语言分、也不是按星数堆——**按"你想干什么"分**：

```
系统维护 · 文本编辑 · 图片处理 · 播放 · 音频剪辑
视频剪辑 · 文案写作 · AI Skill · Agent
```

另有 **[软件] / [Skill] / [Agent]** 形态徽章，一眼看出这是要装的东西、
还是给 AI 用的技能包。

---

## 怎么用

### 方式一：手机上装成 App（推荐）

1. 浏览器打开：**https://richardozhao.github.io/OpenRadar/**
2. **iPhone**：Safari 底部「分享」→「添加到主屏幕」
3. **Android**：Chrome 右上角菜单 →「安装应用」/「添加到主屏幕」

装完就是一个独立图标，**打开即用，支持离线**（看过一次的数据会缓存）。

### 方式二：电脑上直接用

浏览器打开同一个网址即可，无需安装任何东西。

### 方式三：本地跑

```bash
git clone https://github.com/RichardoZhao/OpenRadar.git
cd OpenRadar
# 起个静态服务器（不要直接双击 index.html，PWA 需要 http 环境）
python -m http.server 8123
# 浏览器访问 http://localhost:8123
```

> ⚠️ 局域网用手机访问 `http://<电脑IP>:8123` 时，PWA 安装和离线能力会失效
> ——浏览器要求 https 或 localhost 才算「安全上下文」。要装到手机请走 GitHub Pages。

---

## 三个 Tab

| Tab | 内容 |
|---|---|
| **高分榜** | 长期高星、值得收藏的经典工具 |
| **新项目** | 近期冒头的新东西，抢先看 |
| **分类** | 按九类用途浏览 |

卡片直接显示四组数据；「详情介绍」展开 300 字中文；「复制链接」一键带走。

---

## 技术说明

```
纯静态：HTML + CSS + 原生 JS，无框架、无构建、无后端
数据源：data.json（每日自动更新，本仓库内）
离线：Service Worker 缓存 shell，data.json 不缓存（保证拿到最新）
体积：整个应用 < 130 KB
部署：任意静态托管（GitHub Pages / nginx / 对象存储）
```

**为什么不做成小程序/App？** 因为 PWA 够了——装到手机和原生 App 几乎无差别，
却不用审核、不用签名、不用发版。改一个文件，所有人立刻用上最新版。

### 目录结构

```
.
├── index.html        应用本体（HTML + 内联 CSS/JS 单文件，约 18 KB）
├── manifest.json     PWA 清单
├── sw.js             Service Worker（离线缓存）
├── icons/            图标（192 / 512 / apple-touch-icon）
└── data.json         每日榜单数据（58 条，约 98 KB）
```

**为什么把 CSS/JS 全塞进一个 HTML？** 为了「发一个文件就能跑」——
PWA 本身不需要构建工具，拆成多文件只增加部署摩擦，不带来任何收益。

### data.json 结构

```json
{
  "date": "2026-09-15",
  "generated": "2026-09-15 09:17",
  "items": [
    {
      "name": "Mac-Duo",
      "owner_repo": "sumimakito/Mac-Duo",
      "url": "https://github.com/...",
      "desc_zh": "一句话中文简介",
      "detail_zh": "300 字中文详细介绍",
      "desc_en": "原始英文描述",
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

## 数据更新

`data.json` 由上游脚本每日定时生成并推送，本仓库只做托管。
数据管道（抓取 → 分类 → 中文翻译 → 榜单生成）不在本仓库内。

**数据新鲜度看这个**：打开页面顶部会显示数据日期与生成时间。

---

## 产品边界（不做的事）

| 不做 | 原因 |
|---|---|
| 编译/安装指南 | 那是各项目自己的文档；本工具只负责"让你知道有这个东西" |
| 推荐"学习资料"类仓库 | 目标是"能用的工具"，教程/题库/awesome 列表不收录 |
| 收录敏感/违规项目 | 有过滤词表（破解、漏洞利用等一律排除） |
| 人工编辑推荐 | 全自动，避免主观偏好与更新不及时 |

---

## 部署到自己的服务器

整个目录丢进任意静态托管即可：

```bash
# 例：nginx
scp -r ./* user@server:/var/www/openradar/
# nginx 配置指向该目录，完成
```

若要每天自动更新 `data.json`，在服务器上加一条 cron 拉取即可：

```bash
0 9 * * * curl -s -o /var/www/openradar/data.json \
  https://raw.githubusercontent.com/RichardoZhao/OpenRadar/main/data.json
```

---

## 相关仓库

| 仓库 | 用途 |
|---|---|
| **OpenRadar**（本仓库） | PWA 应用 + 每日数据 |
| [Field8-OpenRadar-data](https://github.com/RichardoZhao/Field8-OpenRadar-data) | 纯数据镜像（供 App / 第三方调用） |

---

## 许可

MIT License，见 [LICENSE](LICENSE)。
数据来源于 GitHub 公开信息与阮一峰周刊，版权归各原作者所有。

---

## 反馈

用着不顺手、想加哪一类、想接自己的数据源——都欢迎提 Issue。
这个工具首先是我自己每天在用的东西，**它得先对我有用，才可能对你有用**。
