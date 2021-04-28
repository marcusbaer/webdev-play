export default class EinhornShadowElement extends HTMLElement {
    constructor () {
        super()

        const template = document.createElement('template')
        template.innerHTML = this.getTemplate()

        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }

        this.debug = false
    }

    $ (selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

    $$(selector) {
        const nodes = this.shadowRoot && this.shadowRoot.querySelectorAll(selector);
        return Array.from(nodes);
    }

    $emit (eventName, eventDetail = {}) {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail: eventDetail,
            bubbles: true, // bubble up to shadow DOM boundary
            composed: true // bubble up and pass shadow DOM boundary to window
        }))
    }

    attributeChangedCallback (name, oldVal, newVal) {
        if (this.debug)
            console.log(
                `%cattribute changed: ${name} ${newVal}`,
                'color: rebeccapurple;'
            )
        this[name] = newVal
    }

    static get observedAttributes () {
        return ['debug']
    }

    get debug () {
        return this.hasAttribute('debug')
    }

    set debug (value) {
        if (this.hasAttribute('debug')) {
            console.log('enable debug mode')
        }
    }

    get value () {
        return 42
        // const slot = this.$("slot")
        // const text = slot.assignedNodes()[0]
        // return text.data
    }

    connectedCallback () {}

    disconnectedCallback () {}

    getTemplate () {
        const style = this.style()
        const template = this.template()
        return `<style>${style}</style>${template}`
    }

    style () {
        return `:host { display: block; }
            slot { display: block; }
        `
    }

    template () {
        return `<slot></slot>`
    }
}
