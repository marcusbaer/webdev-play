class Price extends HTMLElement {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
        slot { display: none; }
        .ui-price {
            color: #22252a;
            line-height: 1;
            font-family: dax_otcond_black, BlinkMacSystemFont, -apple-system, Segoe UI,
                Roboto, Helvetica, Arial, sans-serif;
            font-size: 2.4rem;
            white-space: nowrap;
            max-width: 11rem;
        }

        .ui-price.--special {
            text-align: center;
            color: #e2001a;
            position: relative;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            justify-content: center;
            margin-bottom: 0;
            font-size: 2.4rem;
            width: 11rem;
            height: 8rem;
            z-index: 1;
        }

        .ui-price.--special::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: url(https://roller-angebotskuechen.now.sh/res/bang.svg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            left: 0;
            top: 0;
            z-index: -1;
        }

        .ui-price.--deprecated::after {
            content: "";
            display: block;
            height: 0.2rem;
            background-color: #e2001a;
            max-width: 60px;
            -webkit-transform-origin: bottom left;
            transform-origin: bottom left;
            -webkit-transform: rotate(-30deg);
            transform: rotate(-30deg);
        }

        .ui-price__discount {
            display: block;
            font-size: 0.7rem;
            text-transform: uppercase;
            font-weight: 700;
            line-height: 1;
            z-index: 1;
            padding-top: 3.6em;
        }

        .ui-price__euro {
        }

        .ui-price__cents {
            position: relative;
            left: -0.3em;
            top: -0.7em;
            line-height: 1;
            font-size: 0.5em;
        }

        .ui-price__cents::after {
            content: "";
            position: absolute;
            top: 1.2em;
            left: 0;
            width: 100%;
            height: 0.15em;
            background-color: currentColor;
        }
    </style>
    <div class="ui-price">
        <span class="ui-price__discount"></span>
        <span class="ui-price__euro"></span>
        <span class="ui-price__cents"></span>
    </div>
    <slot></slot>
`;

    // called for every component tag
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.wrapper = this.$(".ui-price");
    this.discount = this.$(".ui-price__discount");
    this.euro = this.$(".ui-price__euro");
    this.cents = this.$(".ui-price__cents");
  }

  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  connectedCallback() {
    this.render();
  }

  getValueFromNode(identifier = "euro") {
    const slot = this.$("slot");
    const [div] = slot.assignedNodes().filter(node => {
      return node.nodeName == "DIV";
    });

    const priceNode = div.querySelector(`.ui-price__${identifier}`);
    return priceNode ? priceNode.innerText : null;
  }

  getComponentClasses() {
    const slot = this.$("slot");
    const [div] = slot.assignedNodes().filter(node => {
      return node.nodeName == "DIV";
    });

    return div.classList.value.replace(/ui-price/, "");
  }

  render() {
    const styleClass = this.getComponentClasses();

    this.wrapper.className = this.wrapper.className + " " + styleClass;
    this.discount.innerHTML = this.getValueFromNode("discount") || "";
    this.euro.innerHTML = this.getValueFromNode("euro") || "0";
    this.cents.innerHTML = this.getValueFromNode("cents") || "00";
  }
}

customElements.define("roller-price", Price);
