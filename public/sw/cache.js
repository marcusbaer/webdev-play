const CACHE = "play-v191106";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      cache.addAll([
        // cache resources that are used later on
      ]);
      return cache.addAll([
        // cache resources that are required directly
        "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",
        "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js",
        "https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.esm.browser.js",
        "https://cdn.jsdelivr.net/npm/vue-custom-element@3.2.10/dist/vue-custom-element.esm.min.js",
        "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
        "https://unpkg.com/bootstrap-vue@latest/esm/index.js"
        // '/modules/components/App/App.html',
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  //console.log("FETCH", event.request.url);

  // cache first, then request (no caching)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (
        event.request.url.indexOf("components/") > 0 &&
        event.request.url.endsWith(".html")
      ) {
        // convert templates for Vue
        return (
          response ||
          fetch(event.request)
            .then(response => response.text())
            .then(body => {
              // Export the response body as a JavaSript string.
              // The response body has to be sanitized before turning it
              // into JavaScript code.
              // Credits: https://stackoverflow.com/a/22837870
              const newBody = `export default "${JSON.stringify(body).slice(
                1,
                -1
              )}"`;
              // Replace the original response with an ES6 module
              return new Response(newBody, {
                headers: new Headers({
                  "Content-Type": "application/javascript"
                })
              });
            })
        );
        // } else if (
        //   event.request.url.indexOf("bootstrap-vue") > 0 &&
        //   event.request.url.indexOf("esm/") > 0 &&
        //   !event.request.url.endsWith(".js")
        // ) {
        //   return (
        //     response ||
        //     fetch(
        //       new Request(event.request.url + "/index.js", {
        //         method: event.request.method,
        //         headers: event.request.headers,
        //         // mode: "same-origin", // need to set this properly
        //         credentials: event.request.credentials
        //         // redirect: "manual" // let browser handle redirects
        //       })
        //     )
        //   );
      } else {
        return response || fetch(event.request);
      }
    })
  );
});
