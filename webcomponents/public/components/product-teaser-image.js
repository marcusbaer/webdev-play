class ProductTeaserImage extends HTMLElement {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
        slot { display: none; }
        .ui-product-teaser-image__image {
            min-height: 170px;
            transition: all 225ms ease-out;
            width: 100%;
        }
        .ui-product-teaser-image__link {
            display: block;
            width: fit-content;
            overflow: hidden;
        }
        .ui-product-teaser-image.--hover .ui-product-teaser-image__image {
            transform: scale(1.1);
        }
    </style>
    <div class="ui-product-teaser-image">
        <a class="ui-product-teaser-image__link" href="#" tabindex=-1>
            <img class="ui-product-teaser-image__image" src="" alt="" />
        </a>
    </div>
    <slot></slot>
`;

    // called for every component tag
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.wrapper = this.$(".ui-product-teaser-image");
    this.link = this.$(".ui-product-teaser-image__link");
    this.image = this.$(".ui-product-teaser-image__image");
  }

  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == "hover" && oldVal !== newVal) {
      // this.render();
      this.setHoverMode(this.isHovered);
    }
  }

  static get observedAttributes() {
    return ["hover"];
  }

  get isHovered() {
    return this.hasAttribute("hover");
  }

  getWrapperFromSlot() {
    const slot = this.$("slot");
    const [wrapper] = slot
      .assignedNodes()
      .filter(node => node.nodeName == "DIV");
    return wrapper;
  }

  getNodeFromSlot(selector) {
    const wrapper = this.getWrapperFromSlot();
    const node = wrapper.querySelector(selector);

    return node;
  }

  setHoverMode(on = false) {
    if (on) {
      this.wrapper.classList.add("--hover");
    } else {
      this.wrapper.classList.remove("--hover");
    }
  }

  render() {
    const link = this.getNodeFromSlot(".ui-product-teaser-image__link");
    const image = this.getNodeFromSlot(".ui-product-teaser-image__image");

    this.link.className = this.link.className + " " + link.classList.value;
    this.image.className = this.image.className + " " + image.classList.value;

    this.link.setAttribute("href", link.getAttribute("href"));
    this.image.setAttribute("src", image.getAttribute("src"));
  }
}

customElements.define("roller-product-teaser-image", ProductTeaserImage);
