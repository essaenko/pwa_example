self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const keys: string[] = await caches.keys();

      await Promise.all(keys.map(async (key: string) => await caches.delete(key)));
    })()
  )
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    (async () => {
      try {
        const { request } = event;
        const response: Response = await fetch(request);

        if (request.method === 'GET') {
          const cache: Cache = await caches.open('PWA_APP_v1');
          await cache.put(request, response.clone());
        }

        return response;
      } catch (e) {
        const cache: Cache = await caches.open('PWA_APP_v1');
        const cachedResponse: Response = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        throw e;
      }
    })()
  )
});