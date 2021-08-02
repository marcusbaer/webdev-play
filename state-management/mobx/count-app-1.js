import { LitElement, html } from 'http://unpkg.com/lit-element?module'

class CountApp extends LitElement {
  static get properties () {
    return {
      count: { type: Number }
    }
  }

  constructor () {
    super()
    this.count = 10
  }

  render () {
    return html`
      ${this.count}
      <button @click=${this.incrementCount} alt="Increment Count">+</button>
    `
  }

  incrementCount() {
      this.count = ++this.count
    //   this.dispatchEvent(new CustomEvent('count-changed', {
    //       bubbles: true,
    //       cancelable: false,
    //       composed: true,
    //       detail: {
    //         count: this.count
    //       }
    //   }))
  }
}

customElements.define('count-app', CountApp)
