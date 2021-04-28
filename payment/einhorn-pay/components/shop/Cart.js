import ProductList from './ProductList.js'

const localPrice = (value) => {
    return value?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

export default class Cart extends ProductList {

    constructor() {
        super()

        this.items = this.getStoredItems()
        this.taxes = {
            7: 0,
            21: 0
        }
        this.total = 0

        this.wrapperNode = this.$('.cart')
        this.countNode = this.$('.count')
        this.taxesNode = this.$('.taxes')
        this.totalNode = this.$('.total')
    }

    connectedCallback () {
        super.connectedCallback()
        window.document.addEventListener('cart/add', this.add.bind(this))
        window.document.addEventListener('cart/remove', this.remove.bind(this))

        if (this.countNode)
            this.countNode.textContent = this.items.length
        if (!this.badge)
            this.renderDetails(this.items)
    }

    add(event = null) {
        if (this.debug && event) console.info('add', event)
        this.items.push(event.detail)
        this.setStoredItems()
        if (this.countNode)
            this.countNode.textContent = this.items.length
        if (!this.badge)
            this.renderDetails(this.items)
    }

    remove(event = null) {
        if (this.debug && event) console.info('remove', event)
        const index = this.items.findIndex(item => item.code === event.detail.code)
        this.items.splice(index, 1)
        this.setStoredItems()
        if (this.countNode)
            this.countNode.textContent = this.items.length
        if (!this.badge)
            this.renderDetails(this.items)
    }

    getStoredItems () {
        const storedItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null
        return storedItems || []
    }

    setStoredItems () {
        const storedItems = localStorage.setItem('cart', JSON.stringify(this.items))
    }

    static get observedAttributes () {
        return [...super.observedAttributes, 'badge']
    }

    get badge () {
        return this.hasAttribute('badge')
    }

    set badge (value) {
        if (this.hasAttribute('badge')) {
            this.wrapperNode.classList.add('badge')
            // this.setAttribute('badge', true)
        } else {
            this.wrapperNode.classList.remove('badge')
        }
    }

    set service (value) {
        // console.log('SERVICE', value)
        fetch(value).then(response => response.json()).then(data => data.results).then(this.renderDetails.bind(this))
    }

    get sumOfTaxes () {
        const keys = Object.keys(this.taxes);
        const sum = keys.reduce((prev, curr) => {
            prev += this.taxes[curr];
            return prev;
        }, 0)
        return Math.round(sum * 100) / 100;
    }

    renderDetails (list = []) {
        list.forEach(item => {
            if (!this.taxes[item.tax]) this.taxes[item.tax] = 0
            const price = new Number(item.price.replace(/€/,'').replace(/,/,'.'))
            const total = price * (item.count || 1)
            this.taxes[item.tax] += item.tax / 100 * total
            this.total += total
        })
        if (this.listNode)
            this.listNode.innerHTML = list.length ? list.map(item => `<li><dpx-product remove code="${item.code}" name="${item.name}" price="${localPrice(item.price)}" tax="${item.tax}">${item.description || ''}</dpx-product></li>`).join('') : '<li>Keine Einträge</li>'
        if (this.totalNode && list.length) {
            const totalFormatted = typeof this.total === 'number' ? localPrice(this.total) : this.total
            this.totalNode.textContent = `${totalFormatted}`
        }
        if (this.taxesNode && list.length) {
            const taxes = Object.keys(this.taxes)
            this.taxesNode.textContent = taxes.map(tax => {
                const roundedTax = typeof this.taxes[tax] === 'number' ? localPrice(Math.round(this.taxes[tax] * 100) / 100) : this.taxes[tax]
                return `${tax}% = ${roundedTax}`
            }).join(', ')
        }
    }

    style() {
        return `.cart .count { font-size: 80%; display: none; transform: translateY(-10px); }
        .cart.badge .count { display: inline-block; color: inherit; }
        .taxes { font-style: italic; }
        .total { font-weight: bold; }`
    }

    template() {
        return `<span class="cart"><span class="count">0</span><ul></ul><div class="taxes"></div><div class="total"></div></span>`
    }
}
