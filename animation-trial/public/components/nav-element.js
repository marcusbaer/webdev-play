export default class NavElement extends HTMLElement {
  static get tagName () {
    return 'nav-element'
  }

  constructor () {
    super()

    const href = this.getAttribute('href')

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `
        <a href="${href}">
          <slot></slot>
        </a>
    `
    this.loadStyles()
  }

  async loadStyles () {
    const cssModule = await import(`./${this.tagName.toLowerCase()}.css`, {
      assert: { type: 'css' }
    })
    this.shadow.adoptedStyleSheets = [cssModule.default]
  }
}
