const RELEASE_ID = '0.1.2';
const CACHE_NAME = `einhornpay-cache-v${RELEASE_ID}`;

const origin = 'http://localhost:7004/einhorn-pay';
const methodName = `${origin}`;
const checkoutURL = `${origin}/checkout.html`;
let resolver;
let payment_request_event;

self.addEventListener('install', event => {
    skipWaiting()
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
              './',
              './app.html',
              './checkout.html',
              './einhornpay_96x96.png',
              './einhornpay_512x512.png',
              './einhornpay.svg',
              './manifest.json',
              './payment-manifest.json',
              './index.html',
              './modules/pwa.js'
            ]))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME)
        .then(cache => cache.match(event.request))
        .then(async response => {
            const { request } = event
            return response ?? fetch(request)
        })
    )
})

self.addEventListener('canmakepayment', event => {
    // console.log(event);
    event.respondWith(true);
});

self.addEventListener('paymentrequest', e => {
  // Preserve the event for future use
  payment_request_event = e;
  const { total, topOrigin, shippingOptions } = e;
  console.log('paymentrequest', e);

  // You'll need a polyfill for `PromiseResolver`
  // As it's not implemented in Chrome yet.
  resolver = new PromiseResolver();

  e.respondWith(resolver.promise);
  e.openWindow(`${checkoutURL}?total=${total.value}&currency=${total.currency}`).then(client => {
    if (client === null) {
      resolver.reject('Failed to open window');
    }
  }).catch(err => {
    resolver.reject(err);
  });
});

self.addEventListener('message', e => {
  console.log('A message received:', e);
  if (e.data === "payment_app_window_ready") {
    sendPaymentRequest();
    return;
  }

  if (e.data.methodName === methodName) {
    resolver.resolve(e.data);
  } else {
    resolver.reject(e.data);
  }
});

// Get the user's authorization

const sendPaymentRequest = () => {
  if (!payment_request_event) return;
  clients.matchAll({
    includeUncontrolled: false,
    type: 'window'
  }).then(clientList => {
    for (let client of clientList) {
      client.postMessage(payment_request_event.total);
    }
  });
}

function PromiseResolver() {
    /** @private {function(T=): void} */
    this.resolve_;
  
    /** @private {function(*=): void} */
    this.reject_;
  
    /** @private {!Promise<T>} */
    this.promise_ = new Promise(function(resolve, reject) {
      this.resolve_ = resolve;
      this.reject_ = reject;
    }.bind(this));
  }
  
  PromiseResolver.prototype = {
    /** @return {!Promise<T>} */
    get promise() {
      return this.promise_;
    },
  
    /** @return {function(T=): void} */
    get resolve() {
      return this.resolve_;
    },
  
    /** @return {function(*=): void} */
    get reject() {
      return this.reject_;
    },
  };