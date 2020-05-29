class Angebotskueche extends HTMLElement {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      slot { display: none; }
      .ui-teaser-angebotskueche {
        cursor: pointer;
      }
      .ui-teaser-angebotskueche {
        color: #22252a;
        padding: 0;
        font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
          Arial, sans-serif;
        font-weight: 500;
        max-width: 400px;
        overflow: hidden;
        border: 0.1rem solid #e3e5e8;
        border-radius: 0.8rem;
      }
      
      .ui-teaser-angebotskueche > * {
        margin-bottom: 0.8rem;
      }
      
      .ui-teaser-angebotskueche:hover {
        border-color: #006ab3;
        -webkit-box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.2);
        box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.2);
      }
      
      .ui-teaser-angebotskueche:hover .ui-teaser-angebotskueche__image {
        transform: scale(1.1);
      }
      
      .ui-teaser-angebotskueche__image {
        transition: all 225ms ease-out;
      }
      
      .ui-teaser-angebotskueche__headline {
        color: #393e46;
        padding: 0 1rem;
      }
      
      .ui-teaser-angebotskueche__prices {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: -1.6rem;
      }
      
      .ui-teaser-angebotskueche__labels {
        list-style-type: none;
        margin: 0 0 1rem 0;
        padding: 0 1rem;
      }
      
      .ui-teaser-angebotskueche__label {
        color: #9da3af;
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem;
        font-size: 1.2rem;
      }
      
      .ui-teaser-angebotskueche__link {
        text-decoration: none;
      }
      .ui-teaser-angebotskueche__price-item {
        padding-right: 0.8rem;
      }
      
      .ui-teaser-angebotskueche__label > * {
        display: block;
      }      

      /* BOOTSTRAP COPY */
      .h-100 {
        height: 100%!important;
      }
      .mr-auto, .mx-auto {
        margin-right: auto!important;
      }
      .ml-auto, .mx-auto {
        margin-left: auto!important;
      }
    </style>
    <div class="ui-teaser-angebotskueche"></div>
    <slot></slot>
`;

    // called for every component tag
    super();

    // no shadow root here
    this.appendChild(template.content.cloneNode(true));
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.wrapper = this.$(".ui-teaser-angebotskueche");
  }

  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  connectedCallback() {

    const wrapper = this.getWrapperFromSlot();
    const styleClass = this.getComponentClasses();

    const redirectToLink = ev => {
      ev.preventDefault();
      const link = this.teaserImage.querySelector("a");
      const linkUrl = link ? link.getAttribute("href") : "#";

      document.location.href = linkUrl;
    };

    const setHoverMode = () => {
      this.teaserImage.setAttribute("hover", "hover");
    };

    const unsetHoverMode = () => {
      this.teaserImage.removeAttribute("hover");
    };

    this.wrapper.className = this.wrapper.className + " " + styleClass;
    this.wrapper.innerHTML = wrapper.innerHTML;

    this.teaserImage = this.$("roller-product-teaser-image");

    this.wrapper.addEventListener("mouseover", setHoverMode);
    this.wrapper.addEventListener("mouseout", unsetHoverMode);
    this.wrapper.addEventListener("click", redirectToLink);
  }

  getComponentClasses() {
    const slot = this.$("slot");
    const [div] = slot.assignedNodes().filter(node => node.nodeName == "DIV");

    return div.classList.value.replace(/ui-teaser-angebotskueche/, "");
  }

  getWrapperFromSlot() {
    const slot = this.$("slot");
    const [wrapper] = slot.assignedNodes().filter(node => node.nodeName == "DIV");
    return wrapper;
  }

  getNodeFromSlot(selector) {
    const wrapper = this.getWrapperFromSlot();
    const node = wrapper.querySelector(selector);

    return node;
  }

}

customElements.define("roller-teaser-angebotskueche", Angebotskueche);
