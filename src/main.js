const defineExampleWebComponent = function() {
  // define webcomponent
  class WebComponentCalculator extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.innerHTML = `
      <h2>Calculator WebComponent</h2>
      <input type=number>
      <input type=number>
      <p></p>
      <style>
      input { width: 80px; }
      </style>
    `;

      this.inputs = this.shadowRoot.querySelectorAll("input");
      this.p = this.shadowRoot.querySelector("p");

      this.update();

      this.inputs[0].addEventListener("input", e => {
        this.a = +e.target.value;
      });

      this.inputs[1].addEventListener("input", e => {
        this.b = +e.target.value;
      });
    }

    static get observedAttributes() {
      return ["a", "b"];
    }

    get a() {
      return +this.getAttribute("a");
    }

    set a(value) {
      this.setAttribute("a", value);
    }

    get b() {
      return +this.getAttribute("b");
    }

    set b(value) {
      this.setAttribute("b", value);
    }

    attributeChangedCallback() {
      this.update();
    }

    update() {
      this.inputs[0].value = this.a;
      this.inputs[1].value = this.b;

      this.p.textContent = `${this.a} + ${this.b} = ${this.a + this.b}`;
    }
  }

  // define web component
  customElements.define("webcomponent-calculator", WebComponentCalculator);

  // add web component
  const body = document.querySelector("body");

  body.innerHTML +=
    '<div class="container mx-auto px-4"><div class="flex pb-4 pt-4"><webcomponent-calculator></div></div>';
};

const runBundle = async function main() {
  // JS for add to cart button
  const button = window.document.querySelector("[rel=js-click-button]");

  button.addEventListener("click", () => {
    location.href = "checkout.html";
  });

  defineExampleWebComponent();
};

runBundle();

// export default runBundle;
