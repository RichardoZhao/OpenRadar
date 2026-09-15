/* 开源雷达 —— 极简 Service Worker
 * 策略：
 *   1. 本站静态资源（index.html / manifest.json）：cache-first，
 *      命中缓存立即返回，同时在后台拉取网络更新缓存（下次访问即最新）；
 *   2. api.github.com 的接口响应：network-first，网络失败时回退缓存（离线可用）。
 */
const CACHE_NAME = 'radar-cache-v1';
const PRECACHE = ['./', './index.html', './manifest.json', './icons/icon-192.png'];

/* 安装：预缓存应用外壳 */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()) // 新版本立即接管
  );
});

/* 激活：清理旧版本缓存 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 缓存优先：命中即返回；未命中则请求网络并写入缓存（后台静默更新） */
function cacheFirst(req) {
  return caches.match(req).then((hit) => {
    if (hit) {
      // 后台更新缓存，不阻塞当前响应
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
      }).catch(() => {});
      return hit;
    }
    return fetch(req).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')); // 兜底：回到首页
  });
}

/* 网络优先：成功则更新缓存；网络失败回退缓存（没有缓存时给一个空结果） */
function networkFirst(req) {
  return fetch(req).then((res) => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((c) => c.put(req, copy));
    }
    return res;
  }).catch(() =>
    caches.match(req).then((hit) =>
      hit || new Response(JSON.stringify({ items: [], message: 'offline' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    )
  );
}

/* 请求分流 */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // data.json 不进 SW 缓存：页面用 ?v=时间戳 每次换 URL，缓存会无限膨胀；数据由页面自己的 localStorage 策略负责
  if (url.pathname.endsWith('/data.json')) return;
  if (url.origin === self.location.origin) {
    // 本站静态资源：cache-first
    e.respondWith(cacheFirst(req));
  } else if (url.hostname === 'api.github.com') {
    // GitHub API：network-first，失败回退缓存
    e.respondWith(networkFirst(req));
  }
});
