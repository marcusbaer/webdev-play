class Headline extends HTMLElement {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    slot { display: none; }
    a { text-decoration: none; }
    .ui-headline {
        color: #22252a;
        margin: 0 0 0.8rem;
        padding: 0;
        line-height: 1.2;
        font-family: dax_otcond_bold, BlinkMacSystemFont, -apple-system, Segoe UI,
            Roboto, Helvetica, Arial, sans-serif;
        font-weight: 400;
        padding: 0 1rem;        
    }

    .ui-headline.--h1 {
        font-size: 3.2rem;
    }

    .ui-headline.--h2 {
        font-size: 2rem;
    }

    .ui-headline.--h3,
    .ui-headline.--h4 {
        font-size: 1.8rem;
    }

    .ui-headline.--h5 {
        font-size: 1.6rem;
    }

    .ui-headline.--h6 {
        font-size: 1.4rem;
    }
    .ui-headline__link {
      color: #22252a;
      text-decoration: none;
    }
    </style>
    <h3 class="ui-headline">
      <a class="ui-headline__link" href="#" title="Zur Produktdetailseite"></a>
    </h3>
    <slot></slot>
`;

    // called for every component tag
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.link = this.$(".ui-headline__link");
    this.headline = this.$(".ui-headline");
  }

  get orderClass() {
    const level = this.getAttribute("order") || "3";
    return `--h${level}`;
  }

  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // called initially and whenever the name attribute changes
    console.log(
      `%cHeadline attribute change: ${name} ${newVal}`,
      "color: lightgray;"
    );
    const changeableAttributes = ["order"];
    if (changeableAttributes.includes(name) && oldVal && oldVal !== newVal) {
      this.render();
    }
  }

  connectedCallback() {
    // called when the component is attached to the dom
    this.render();
  }

  static get observedAttributes() {
    return ["order"];
  }

  getWrapperFromSlot() {
    const slot = this.$("slot");
    // const [wrapper] = slot.assignedNodes().filter(node => node.nodeName == "DIV");
    const [wrapper] = slot.assignedNodes().filter(node => {
      return (
        node.nodeName == "H1" ||
        node.nodeName == "H2" ||
        node.nodeName == "H3" ||
        node.nodeName == "H4" ||
        node.nodeName == "H5" ||
        node.nodeName == "H6"
      );
    });
    return wrapper;
  }

  getNodeFromSlot(selector) {
    const wrapper = this.getWrapperFromSlot();
    const node = wrapper.querySelector(selector);

    return node;
  }

  render() {
    const link = this.getNodeFromSlot(".ui-headline__link");
    this.headline.classList.add(this.orderClass);
    this.link.innerHTML = link.innerHTML;
    this.link.setAttribute("href", link.getAttribute("href"));
  }
}

customElements.define("roller-headline", Headline);
