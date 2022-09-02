importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/workbox-sw.js');

workbox.setConfig({
    modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/'
});

//关闭日志
self.__WB_DISABLE_DEV_LOGS = true;

const { core, precaching, routing, strategies, expiration } = workbox;
const { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } = strategies;
const { ExpirationPlugin } = expiration;

const cacheSuffixVersion = '_20200610';

core.setCacheNameDetails({
    prefix: 'bycg',
    suffix: cacheSuffixVersion
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (!key.includes(cacheSuffixVersion)) return caches.delete(key);
            }));
        })
    );
});


core.skipWaiting();
core.clientsClaim();

/**
 * 缓存第三方引用
 */
routing.registerRoute(
    /.*(cdn.jsdelivr.net|at.alicdn.com)/,
    new CacheFirst({
        cacheName: 'static-cdn' + cacheSuffixVersion,
        fetchOptions: {
            mode: 'cors',
            credentials: 'omit'
        },
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60,
                purgeOnQuotaError: true
            })
        ]
    })
);

//不作缓存
routing.registerRoute(
    /\/sw.js/,
    new NetworkOnly()
);


//缓存图片
routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
    new CacheFirst({
        cacheName: 'static-image' + cacheSuffixVersion,
    })
);

//缓存js css
routing.registerRoute(
    /.*\.(css|js)$/,
    new CacheFirst({
        cacheName: 'static-js-css' + cacheSuffixVersion,
    })
);

//本站其他文件 
routing.registerRoute(
    ({ url }) => {
        return url.hostname === location.hostname
    },
    new NetworkFirst({
        cacheName: 'static-other' + cacheSuffixVersion,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);