import EinhornShadowElement from '../basics/EinhornShadowElement.js'

const localPrice = (value) => {
    return value?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

export default class ProductList extends EinhornShadowElement {

    constructor() {
        super()

        this.listNode = this.$('ul')
    }

    connectedCallback() {
        // this.service = this.getAttribute('service')
        // fetch()
        // this.buttonNode.addEventListener('click', ev => {
        //     ev.stopPropagation()
        //     const name = this.getDescriptionFromSlot()
        //     this.$emit('click', name)
        // })
    }

    static get observedAttributes () {
        return [...super.observedAttributes, 'service', 'list']
    }

    get list () {
        return this.getAttribute('list')
    }

    set list (value) {
        const items = JSON.parse(value)
        if (this.listNode)
            this.listNode.innerHTML = items.map(item => `<li><dpx-product code="${item.code}" name="${item.name}" price="${localPrice(item.price)}" tax="${item.tax}">${item.description || ''}</dpx-product></li>`).join('')
    }

    get service () {
        return this.getAttribute('service')
    }

    set service (value) {
        // console.log('SERVICE', value)
        fetch(value).then(response => response.json()).then(data => {
            if (this.listNode)
                this.listNode.innerHTML = data.results.map(item => `<li><dpx-product code="${item.code}" name="${item.name}" price="${localPrice(item.price)}" tax="${item.tax}">${item.description || ''}</dpx-product></li>`).join('')
        })
    }

    style() {
        return `ul { list-style-type: upper-roman; }`
    }

    template() {
        return `<ul></ul>`
    }
}
