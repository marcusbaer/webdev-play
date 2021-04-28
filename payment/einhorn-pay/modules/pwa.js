export const installer = (selector = '#installButton') => {
    let installPrompt;
    const button = document.querySelector(selector);

    // hide the button initially
    button.style.display = "none"

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        // show the button if it makes sense
        button.style.display = "inline-block";
        installPrompt = e;
    });

    // https://developers.google.com/web/fundamentals/app-install-banners/#mini-info-bar
    window.addEventListener('appinstalled', function (event) {
        // PWA was successfully installed
        console.log("PWA installed");
    });

    button.addEventListener('click', () => {
        if (!installPrompt ) {
            // The deferred prompt isn't available.
            return;
        }
    
        // Show the install prompt.
        installPrompt.prompt();
    
        // Log the result
        installPrompt.userChoice.then((result) => {
            // console.log('userChoice', result);
            // Reset the deferred prompt variable, since prompt() can only be called once.
            installPrompt = null;
            // Hide the install button.
            button.style.display = "none";
        });
    });
}

export const controllerChange = async () => {
    // https://whatwebcando.today/articles/handling-service-worker-updates/
    // app-based solution
    let refreshing = false;
    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    })
}

export const serviceWorker = async (worker = '/sw.js', scope = '/') => {
    if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register(worker, { scope }).then(function(registration) {}).catch(function(err) {})
        const swRegistration = await navigator.serviceWorker.register(worker, { scope });
        return swRegistration;
    } else {
        // throw new Error('No Service Worker support!')
        return null;
    }
}

const main = async (worker, scope) => {
    const serviceWorkerRegistration = await serviceWorker(worker, scope);

    // serviceWorkerRegistration.addEventListener('updatefound', () => {
    //     console.log('Service Worker update detected!');
    //     // install handler is not yet complete and it actually may fail to install
    //     // https://whatwebcando.today/articles/handling-service-worker-updates/

    //     // our new instance is visible under installing property, because it is in 'installing' state
    //     // let's wait until it changes its state
    //     serviceWorkerRegistration.installing.addEventListener('statechange', () => {
    //         if (serviceWorkerRegistration.waiting) {
    //             // our new instance is now waiting for activation (its state is 'installed')
    //             // we now may invoke our update UX safely
    //             // notificationBanner tells user, there's an update waiting to be activated
    //             // notificationBanner.addEventListener('click', () => {
    //             //     registration.waiting.postMessage('SKIP_WAITING');
    //             // });
    //         } else {
    //             // apparently installation must have failed (SW state is 'redundant')
    //             // it makes no sense to think about this update any more
    //         }
    //     });
    // });

    installer('#installButton');
    // controllerChange();
}

export const payment = (total = 0, taxes = 0, currency = 'EUR') => {

    const processPayment = (paymentResponse) => {

    }

    // - https://medium.com/dev-channel/integrating-the-payment-request-api-with-a-payment-service-provider-b6a23aa44bd6
    // - https://medium.com/dev-channel/how-payment-methods-work-in-the-payment-request-api-54b8f2ee03c5
    // - https://medium.com/dev-channel/addressing-common-misconceptions-about-the-payment-request-api-4d0db51dae75
    // - https://medium.com/dev-channel/how-payment-methods-work-in-the-payment-request-api-54b8f2ee03c5
    // - https://developers.google.com/pay/api/web/guides/paymentrequest/tutorial

    return new Promise((resolve, reject) => {

        if ('PaymentRequest' in window) {
            // Apple Pay, Google Pay, VISA, Mastercard
            const methodData = [
                {
                    supportedMethods: 'https://einhorn-pay.vercel.app',
                    // data: {
                    //     'environment': 'TEST',
                    //     'emailRequired': true,
                    //     'shippingAddressRequired': true
                    // }
                }, {
                    supportedMethods: 'basic-card',
                    data: {
                        supportedNetworks: ['visa', 'mastercard', 'jcb']
                    }
                }
            ]
            const paymentDetails = {
                total: {
                  label: 'Gesamt',
                  amount:{
                    currency: currency,
                    value: total
                  }
                },
                displayItems: [{
                    label: 'Warenwert',
                    amount: {
                      currency: currency,
                      value: total,
                    },
                  }, {
                    label: 'Rabatt(e)',
                    amount: {
                      currency: currency,
                      value: 0, // -total
                    },
                  }, {
                    label: 'MWSt.',
                    pending: true,
                    amount: {
                      currency: currency,
                      value: taxes,
                    },
                  }]
              }
            const options = { // email address, name, phone, or shipping data
                requestPayerName: true,
                requestPayerPhone: true,
                requestPayerEmail: true,
                requestShipping: false,
                // shippingType: 'pickup' // delivery or pickup
            }
            const request = new PaymentRequest(methodData, paymentDetails, options);
            // request.canMakePayment();
            request.show().then(paymentResponse => {
                // Close the payment request UI.
                // console.log(paymentResponse);
    
                return paymentResponse.complete().then(() => {
                    // console.log("payment done");
                    // Get the payment details from paymentResponse object
                    // Process payment
                    processPayment(paymentResponse);
                    resolve(paymentResponse);
                });
            }).catch(console.error);
    
        } else {
            // use fallback solution: Rechnungskauf, pay at pick up
            reject();
        }
    })
}

export function pwa (worker = '/sw.js', scope = '/', options = {}) {
    if ('serviceWorker' in navigator) {
        // you should wait until load event
        window.addEventListener('load', function() {
            main(worker, scope, options);
        });
    }
}

export default pwa;