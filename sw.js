this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      // TODO this will be a call aws to get all the resources to save
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/img.jpg',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  });
});
