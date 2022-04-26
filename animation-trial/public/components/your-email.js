class YourEmail extends HTMLElement {
  static get tagName () {
    return 'your-email'
  }

  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    // this.shadow.innerHTML = ``

    this.readQueryParam()
  }

  connectedCallback () {

    const yourEmail = this.params.get('email')
    this.shadow.innerHTML = `${this.getAttribute('prefix') || ''} <strong>${yourEmail}</strong>`
  }

  readQueryParam () {
    const query = location.href.split('?')[1]
    this.params = new URLSearchParams(query)
    // for (let p of this.params) { console.log(p) }
    // this.params.get('email')
    // this.params.has('newsletter')
  }
}

export default YourEmail
