'use strict';

const cacheVersion = 1
const currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'index.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(cache => {
      return cache.addAll(['./homer.mp3', offlineUrl])
    })
  )
})

this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
      return caches.match(offlineUrl)
      })
    )
  } else {
    event.respondWith(caches.match(event.request).then(response => {
      return response || fetch(event.request);
      })
    )
  }
})
