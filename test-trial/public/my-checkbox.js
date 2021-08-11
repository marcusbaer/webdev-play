class MyCheckbox extends HTMLElement {
  static get formAssociated () {
    return true
  }
  static get observedAttributes () {
    return ['checked']
  }
  static get tagName () {
    return 'my-checkbox'
  }

  constructor () {
    super()
    // Firefox and Safari don't support internals (https://bugzilla.mozilla.org/show_bug.cgi?id=1552313)
    if (this.attachInternals) this._internals = this.attachInternals()

    this.addEventListener('keyup', e => {
        if (e.code === 'Enter' || e.code === 'Space') {
          this.dispatchEvent(new PointerEvent('click', {
            bubbles: true,
            cancelable: true
          }));
        }
    });

    this.addEventListener('click', this._onClick.bind(this))
    // this.addEventListener('keyup', this._onClick.bind(this))

    this._internals.role = 'checkbox'
    this._internals.ariaChecked = false

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>
        :host { background: orange; display: inline-block; cursor: pointer; font-family: sans-serif; height: 12px; width: 12px; }
        :host(.checked) { background: limegreen; }
      </style>`
  }

  get form () {
    console.log('form', this._internals.form)
    return this._internals.form
  }
  get name () {
    return this.getAttribute('name')
  }
  get type () {
    return this.localName
  }

  get checked () {
    return this.hasAttribute('checked')
  }
  set checked (flag) {
    this.toggleAttribute('checked', Boolean(flag))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    // name will always be "checked" due to observedAttributes
    this.checked
      ? this.classList.add('checked')
      : this.classList.remove('checked')
    this._internals.setFormValue(this.checked ? 'on' : null)
    this._internals.ariaChecked = this.checked
  }

  _onClick (event) {
    // if (
    //   (event instanceof KeyboardEvent &&
    //     (event.code === 'Enter' || event.code === 'Space')) ||
    //   !(event instanceof KeyboardEvent)
    // ) {
      console.log(`toggle ${this.localName}`)
      this.checked = !this.checked
    // }
  }

  formResetCallback() {
      this.checked = false
  }

  formAssociatedCallback() {
      console.log('formAssociatedCallback called!')
  }

  formStateRestoreCallback(newValue, reason) {
      console.log('formStateRestoreCallback', newValue, reason)
  }
}

export default MyCheckbox
