import { LitElement, html } from 'http://unpkg.com/lit-element?module'
import { autorun } from 'https://unpkg.com/mobx@5.15.7?module'
import { store } from './store.js'

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

  connectedCallback() {
    super.connectedCallback()
    this.disposer = autorun(() => {
        this.count = store.count
    })
  }

  disconnectedCallback() {
      // clean up as for events
      this.disposer()
  }

  render () {
    return html`
      <button @click=${() => store.decrementCount()} alt="Decrement Count">-</button>
      ${this.count}
      <button @click=${this.incrementCount} alt="Increment Count">+</button>
    `
  }

  incrementCount() {
      store.count = ++this.count
    //   this.dispatchEvent(new CustomEvent('count-changed', {
    //       bubbles: true,
    //       cancelable: false,
    //       composed: true,
    //       detail: {
    //         count: this.count
    //       }
    //   }))
  }

//   decrementCount() {
//       store.count = --this.count
//   }
} 

customElements.define('count-app', CountApp)
