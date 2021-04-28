const RELEASE_ID = '0.1.2';
const CACHE_NAME = `einhorn-cache-v${RELEASE_ID}`;

const pageShell = (strings, ...values) => `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta name="robots" content="noindex,nofollow">
    <title>🦄 Shop</title>
    <link rel="manifest" href="manifest.json">
    <style>
        :root {
            --col-brand-01: #0B9CC9;
            --col-brand-02: #8E1EA1;
            --col-brand-03: #F8F9FD;
            --lay-space-01: 4px;
            --lay-space-02: 8px;
            --lay-space-04: 16px;
        }

        aside[aria-labelledby="cookie"] { display: none; }
    </style>
    <script type="module">
        import { pwa } from './einhorn-pay/modules/pwa.js';
        import './einhorn-pay/modules/custom-elements.js';
        pwa('./shop-sw.js', './');
    </script>
    <link rel="stylesheet" href="./einhorn-pay/css/main.css">
    <link rel="stylesheet" href="./einhorn-pay/css/ui.css">
</head>
<body>
    <header>
        <aside>
            ${strings.join('')}
        </aside>
        <nav aria-labelledby="mainmenu">
            <h2 id="mainmenu" class="sr-only" tabindex="-1">Main Navigation</h2>
            <ul>
                <li><a href="./index.html">Startseite</a></li>
                <li><a href="./warenkorb.html">Warenkorb<dpx-cart badge></dpx-cart></a></li>
                <li><a href="./einhorn-pay/app.html">Payment App</a></li>
            </ul>
        </nav>
    </header>
    <main aria-labelledby="maincontent">
        ${values[0]}
    </main>
    <footer>
        <hr/>
        <button id="installButton" class="button">App installieren</button>
    </footer>
</body>
</html>
`;

self.addEventListener('install', event => {
    skipWaiting()
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
                './icon_512x512.png',
                './index.html',
                './manifest.json',
                './warenkorb.html',
                './einhorn-pay/components/basics/EinhornShadowElement.js',
                './einhorn-pay/components/shop/Cart.js',
                './einhorn-pay/components/shop/Product.js',
                './einhorn-pay/components/shop/ProductList.js',
                './einhorn-pay/css/main.css',
                './einhorn-pay/css/ui.css',
                './einhorn-pay/modules/custom-elements.js',
                './einhorn-pay/modules/pwa.js',
                './services/promotions.json'
            ]))
    )
})

addEventListener('activate', event => {
    event.waitUntil(async function() {
      console.info(`Install new version ${RELEASE_ID}`);
      return clients.claim();
    }());
})

self.addEventListener('periodicsync', event => {
    // console.log(`periodicsync`, event);
    if (event.tag == 'get-latest-promotions') {
    }
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request))
            .then(async response => {
                const { request } = event

                if (response && request.destination === 'document') {
                    let text = await response.text()
                    let isSnippetContent = text.indexOf('<html') === -1
                    let responseBody = (isSnippetContent) ? pageShell`${text}` : text
                    return new Response(responseBody, {
                        headers: new Headers({
                            'Content-Type': 'text/html; charset=utf-8'
                        })
                    })
                }

                return response ?? fetch(request)
            })
    )
})

self.addEventListener('sync', (event) => {
    if(event.tag == 'get-latest-promotions') {
        event.waitUntil(
            // Get the data we have in the storage for the sync named SYNC-NAME and send it to the remote server.
            // Generally, it could be an iteration of the multiple items we have for this particular name.
            
        );
    }
})

// check storage quota
navigator.storage.estimate().then(console.log);
