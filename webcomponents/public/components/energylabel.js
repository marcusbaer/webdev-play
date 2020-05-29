class EnergyLabel extends HTMLElement {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    slot { display: none; }
    .ui-energylabel {
      background-color: #c2c2c2;
      position: relative;
      display: inline-block;
      padding: 0 0.8rem;
      font-size: 1.2rem;
      color: #fff;
      white-space: nowrap;
      z-index: 1;
      margin-right: 2.2rem;
      border-radius: 0;

      min-width: 0;
      line-height: 1.2;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: visible;
      max-width: 100%;
      font-size: 1.2rem;
      padding: 0.7rem;
      min-width: 16px;
      text-align: center;
    }

    .ui-energylabel::after {
      content: "";
      position: absolute;
      background-color: #c2c2c2;
      height: 20px;
      width: 20px;
      transform: translate(-2px, -3px) rotate(45deg);
      z-index: -1;
    }

    .ui-energylabel.--a-plus-plus {
      background-color: #02a44f;
      padding-right: 1rem;
    }

    .ui-energylabel.--a-plus-plus::after {
      background-color: #02a44f;
      transform: translate(0px, -3px) rotate(45deg);
    }

    .ui-energylabel.--a-plus {
      background-color: #02a44f;
      padding-right: 1.5rem;
    }

    .ui-energylabel.--a-plus::after {
      background-color: #02a44f;
      transform: translate(5px, -3px) rotate(45deg);
    }

    .ui-energylabel.--a {
      background-color: #51b64c;
    }

    .ui-energylabel.--a::after {
      background-color: #51b64c;
      transform: translate(2px, -3px) rotate(45deg);
    }

    .ui-energylabel.--b {
      background-color: #c0d72c;
    }

    .ui-energylabel.--b::after {
      background-color: #c0d72c;
      transform: translate(2px, -3px) rotate(45deg);
    }

    .ui-energylabel.--c {
      background-color: #fef101;
    }

    .ui-energylabel.--c::after {
      background-color: #fef101;
      transform: translate(2px, -3px) rotate(45deg);
    }

    .ui-energylabel.--d {
      background-color: #fdb911;
    }

    .ui-energylabel.--d::after {
      background-color: #fdb911;
      transform: translate(2px, -3px) rotate(45deg);
    }

    .ui-energylabel.--e {
      background-color: #f27021;
    }

    .ui-energylabel.--e::after {
      background-color: #f27021;
      transform: translate(2px, -3px) rotate(45deg);
    }
    </style>
    <div class="ui-energylabel">A+</div>
    <slot></slot>
`;

    // called for every component tag
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.energylabel = this.$(".ui-energylabel");
  }

  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  connectedCallback() {
    // called when the component is attached to the dom
    this.render();
  }

  render() {
    const slot = this.$("slot");
    const [div] = slot.assignedNodes().filter(node => {
      return node.nodeName == "DIV";
    });

    const styleClass = div.classList.value.replace(/ui-energylabel/, "");

    this.energylabel.innerHTML = div.innerHTML;
    this.energylabel.className = this.energylabel.className + " " + styleClass;
  }
}

customElements.define("roller-energylabel", EnergyLabel);
