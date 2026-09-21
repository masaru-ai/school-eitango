/* 英単語帳 Service Worker
   方針：ネットワーク優先（オンラインなら常に最新を取得＝自動更新）／
        オフライン時はキャッシュから表示。新SWは即時有効化する。 */
const CACHE = 'eitango-cache-v1';
const ASSETS = ['./', './index.html', './word-book-data.js', './manifest.json', './icon.svg'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      // ネットワーク優先＝更新を即反映
      const fresh = await fetch(req, { cache: 'no-store' });
      const c = await caches.open(CACHE);
      c.put(req, fresh.clone());
      return fresh;
    } catch (err) {
      // オフライン時はキャッシュ、無ければトップ
      const cached = await caches.match(req);
      return cached || caches.match('./index.html');
    }
  })());
});
