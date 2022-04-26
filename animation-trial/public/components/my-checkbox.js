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

    this.shadow = this.attachShadow({ mode: 'open' })
    this.loadStyles()
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
    console.log(`toggle ${this.localName}`)
    this.checked = !this.checked
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

  async loadStyles () {
    const cssModule = await import(`./${this.tagName.toLowerCase()}.css`, {
      assert: { type: 'css' }
    })
    this.shadow.adoptedStyleSheets = [cssModule.default]
  }
}

export default MyCheckbox
