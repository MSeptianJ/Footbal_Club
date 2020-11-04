const CACHE_NAME = "SW-v0.53.0";
let urlsToCache = [
    "/",
    "/index.html",
    "/fc.html",
    "/manifest.json",
    "/css/custom.css",
    "/css/materialize.min.css",
    "/img/loading.gif",
    "/img/MPWA2_Maskable.png",
    "/img/MPWA2_Non-maskable.png",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/main.js",
    "/js/materialize.min.js",
    "/js/sw-register.js",
    "/pages/bookmark.html",
    "/pages/home.html",
    "/pages/nav.html",
    "/pages/standing.html",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    const base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(response => {
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push Message no payload";
    }

    let options = {
        body: body,
        icon: "../img/MPWA2_Non-maskable.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrived: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    )
})