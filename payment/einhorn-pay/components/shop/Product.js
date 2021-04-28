import EinhornShadowElement from '../basics/EinhornShadowElement.js'

const localPrice = (value) => {
    return value?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

export default class Product extends EinhornShadowElement {

    constructor() {
        super()

        this.nameNode = this.$('h3')
        this.priceNode = this.$('.price')
        this.addToCartCodeNode = this.$('input[type=hidden]')
        this.addToCartSubmitNode = this.$('input[type=submit]')
        this.addToCartFormNode = this.$('form')
    }

    connectedCallback() {
        this.name = this.getAttribute('name')
        this.price = this.getAttribute('price')

        this.addToCartFormNode.addEventListener('submit', (ev) => {
            ev.preventDefault()
            var event = new CustomEvent(this.remove?'cart/remove':'cart/add', {
                detail: {
                    code: this.code,
                    description: this.getDescriptionFromSlot() || '',
                    name: this.name,
                    price: this.price,
                    tax: this.tax,
                    count: 1
                }
            })
            window.document.dispatchEvent(event)
        })
    }

    static get observedAttributes () {
        return [...super.observedAttributes, 'code', 'name', 'price', 'tax', 'remove']
    }

    getDescriptionFromSlot() {
        const slot = this.$("slot");
        const text = slot.assignedNodes()[0]
        // const text = slot.assignedNodes().filter(node => node.nodeName == "TEXT");
        return text.data;
    }

    get code () {
        return this.getAttribute('code')
    }

    set code (value) {
        if (this.addToCartCodeNode)
            this.addToCartCodeNode.value = value
    }

    get name () {
        return this.getAttribute('name')
    }

    set name (value) {
        if (this.nameNode)
            this.nameNode.textContent = value
    }

    get price () {
        return this.getAttribute('price')
    }

    set price (value) {
        if (this.priceNode)
            this.priceNode.textContent = `${localPrice(value)}`
    }

    get remove () {
        return this.hasAttribute('remove')
    }

    set remove (value) {
        this.addToCartSubmitNode.value = 'entfernen'
    }

    style() {
        return `.price { font-style: italic; }`
    }

    template() {
        return `<link rel="stylesheet" href="./einhorn-pay/css/ui.css"><h3></h3><p class="desc"><slot></slot></p><p class="price">3,90 €</p><form action="./services/add.json"><input type="hidden"><input type="submit" value="In den Warenkorb"></form>`
    }
}
