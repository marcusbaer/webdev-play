const CACHE = "play-v190926";

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE).then(function(cache) {
            cache.addAll([
                // cache resources that are used later on
            ]);
            return cache.addAll([
                // cache resources that are required directly
                'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
                'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js',
                'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.esm.browser.js',
                // '/modules/tpl/App.html',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method !== "GET") return;
    //console.log("FETCH", event.request.url);
 
    // cache first, then request (no caching)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (event.request.url.indexOf('tpl/')>0 && event.request.url.endsWith('.html')) {
                // convert templates for Vue
                return response || fetch(event.request)
                    .then((response) => response.text())
                    .then((body) => {
                        // Export the response body as a JavaSript string.
                        // The response body has to be sanitized before turning it
                        // into JavaScript code.
                        // Credits: https://stackoverflow.com/a/22837870
                        const newBody = `export default "${JSON.stringify(body).slice(1, -1)}"`
                        // Replace the original response with an ES6 module
                        return new Response(newBody, {
                            headers: new Headers({
                                'Content-Type': 'application/javascript'
                            })
                        })
                    })
            } else {
                return response || fetch(event.request);
            }
        })
    );
});
