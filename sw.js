// ============================================================
//  Always On Generators — Service Worker
//  Caches the hub page + assets for offline use.
//  Strategy: Cache-first for static assets, network-first
//  for navigation so updates are picked up automatically.
// ============================================================

const CACHE_NAME = 'aog-hub-v1';

// Assets to pre-cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  // Google Fonts – cache the CSS + the actual font files on first load
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;600;700&display=swap',
  // Logo from GitHub CDN
  'https://raw.githubusercontent.com/BrandonAOG/AOG-Logo/main/logo.png'
];

// ── Install: pre-cache everything we can ──────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local files reliably; remote ones best-effort
      return cache.addAll(['./', './index.html', './manifest.json'])
        .then(() =>
          Promise.allSettled(
            ['https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;600;700&display=swap',
             'https://raw.githubusercontent.com/BrandonAOG/AOG-Logo/main/logo.png']
            .map(url =>
              fetch(url, { mode: 'cors', credentials: 'omit' })
                .then(res => { if (res.ok) cache.put(url, res); })
                .catch(() => {}) // ignore network errors during install
            )
          )
        );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches ───────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: stale-while-revalidate for fonts/images,
//           network-first for HTML navigation ──────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Navigation (HTML pages) → network-first, fall back to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Google Fonts & logo → stale-while-revalidate (serve cache
  // instantly, update in background so next visit is fresh)
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'raw.githubusercontent.com'
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          const networkFetch = fetch(request, { mode: 'cors', credentials: 'omit' })
            .then(res => {
              if (res.ok) cache.put(request, res.clone());
              return res;
            })
            .catch(() => cached); // offline → use stale copy
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Everything else → cache-first
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});
