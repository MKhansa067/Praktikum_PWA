const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/offline.html',
];
// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
    })
);
});
// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() =>
                caches.match('/offline.html'));
        })
    );
});

// Listen for messages from the main thread
self.addEventListener('message', function (event) {
    if (event.data.action === "showNotification") {
        self.registration.showNotification("Hello from PWA!", {
            body: "Ini adalah notifikasi sederhana dari PWA kamu.",
            icon: "images/icons/icon-192x192.png"
        });
    }
});
