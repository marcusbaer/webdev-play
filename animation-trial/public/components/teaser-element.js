export default class TeaserElement extends HTMLElement {
  static get tagName () {
    return 'teaser-element'
  }

  constructor () {
    super()

    const headline = this.getAttribute('headline')
    const image = this.getAttribute('image')
    const text = this.getAttribute('text')

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `
        <h3>${headline}</h3>
        <img src="${image}">
        <p>${text}</p>
        <a href="#">Zum Artikel</a>
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
