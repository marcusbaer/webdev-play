class ScrollCounter extends HTMLElement {
    // re-initialize scroll listener on counter attribute change 

    useShadow = true;

    constructor() {
        super();
    
        if (this.shadowRoot) {
            // A Declarative Shadow Root exists!
            // wire up event listeners, references, etc.
        } else {
            // A Declarative Shadow Root doesn't exist.
            // Create a new shadow root and populate it
            const tagName = this.tagName.toLowerCase();
            const templateNode = document.querySelector(`#tpl-${tagName}`);

            if (this.useShadow) {
                const shadow = this.attachShadow({mode: 'open'});
                shadow.innerHTML = templateNode.innerHTML;
            } else {
                const template = document.createElement('template');
                template.innerHTML = templateNode.innerHTML;
                const content = template.content || template;
                this.appendChild(content.cloneNode(true));
            }
        }

        this.countStop = 0;
    }

    connectedCallback () {
        // define node references
        this.counterNode = this.shadowRoot?.querySelector('.counter') || this.querySelector('.counter');

        // set initial data
        this.hasWorker = this.hasAttribute('worker');
        this.counter = this.getAttribute('counter');
    }

    disconnectedCallback () {
        this.counterObserver?.unobserve(this);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    static get observedAttributes () {
        return ['counter'];
    }

    get counter () {
        return this.getAttribute('counter');
    }

    set counter (value) {
        this.restartCounter(new Number(value));
    }

    restartCounter(stop = 0) {
        if (this.hasWorker) {
            this.counterNode.classList.add('worker');
            this.worker = new Worker('./worker.js');
            this.worker.onmessage = event => { 
                const num = event.data;
                // console.log('message from worker', num, this);
                this.counterNode.textContent = num;
                if (num < this.countStop) {
                    this.worker.postMessage(num+1);
                } else {
                    this.worker.terminate();
                    delete this.worker;
                }
            };
        }

        if (this.counterNode) {
            this.countStop = stop;

            this.counterObserver?.unobserve(this);

            this.counterObserver = new IntersectionObserver ((entries, observer) => {
                entries.forEach((entry) => {
                    // if element visible
                    if (entry.isIntersecting) {
                        // stop observer
                        this.counterObserver.unobserve(entry.target);
                        // start counter
                        if (this.hasWorker) {
                            console.log(`start worker counter to ${this.countStop}`);
                            this.worker.postMessage(0);
                        } else {
                            console.log(`start standard counter to ${this.countStop}`);
                            this.setNoWorkerCounter(0);
                        }
                    }
                });
            });
    
            // observe element
            this.counterObserver.observe(this);
        }
    }

    async setNoWorkerCounter(value) {
        if (this.counterNode) {
            this.counterNode.textContent = value;
            if (value < this.countStop) {

                // loops block your UI
                for (let i=0; i<2000000000; i++) { }
                setTimeout(() => {
                    this.setNoWorkerCounter(value+1)
                }, 0);
            }
        }
    }

}

export default ScrollCounter;