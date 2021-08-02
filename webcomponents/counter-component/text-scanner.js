class TextScanner extends HTMLElement {

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
    }

    connectedCallback () {
        // define node references
        this.scannerFocusNode = this.shadowRoot?.querySelector('.scanner__focus') || this.querySelector('.scanner__focus');

        this.scannerObserver = new IntersectionObserver ((entries, observer) => {
            entries.forEach((entry) => {
                // if element visible
                if (entry.isIntersecting) {
                    // stop observer
                    this.scannerObserver.unobserve(entry.target);
                    // start scan animation
                    this.setScannerPosition(0);
                }
            });
        });

        // observe element
        this.scannerObserver.observe(this);
    }

    disconnectedCallback () {
        // stop observer
        this.scannerObserver?.unobserve(this);
    }

    setScannerPosition (value = 0, direction = 1) {
        this.scannerFocusNode.style.left = value + 'px';
        setTimeout(() => {
            if (value+direction > window.innerWidth-30) {
                this.setScannerPosition(value-1, -1);
            } else if (value < 0) {
                this.setScannerPosition(0, 1);
            } else {
                this.setScannerPosition(value+direction, direction);
            }
        }, 3);
    }
}

export default TextScanner;