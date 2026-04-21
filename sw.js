const CACHE_NAME = 'tor-cal-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-1.png'
  './icon.png'
];
];

// Install: Cache new assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Forces the waiting service worker to become active
});

// Activate: Clean up old caches (v1, v2, etc.)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Takes control of the page immediately
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
