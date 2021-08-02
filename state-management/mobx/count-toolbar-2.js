import { LitElement, html } from 'http://unpkg.com/lit-element?module'
import { autorun } from 'https://unpkg.com/mobx@5.15.7?module'
import { store } from './store.js'

class CountToolbar extends LitElement {
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
      Hey there user! You have a count of ${this.count}!
      <button @click=${() => store.decrementCount()} alt="Decrement Count">-</button>
      <button @click=${() => store.count = 0} alt="Reset Count">reset</button>
    `
  }
}

customElements.define('count-toolbar', CountToolbar)
