import demoView from './demo.view.js';

class Demo extends HTMLElement {

    constructor() {
        const template = document.createElement("template");
        template.innerHTML = demoView();

        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        this.button = this.$("button");
        this.favorites = this.$("#favorites");
        this.headline = this.$("h1");
        this.image = this.$("img");
        this.imageWrapper = this.$(".image-wrapper");
        this.input = this.$("input");
        this.wrapper = this.$(".demo");
    }

    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(
            `%cDemo component - attribute changed: ${name} ${newVal}`,
            "color: lightgray;"
        );
        const changeableAttributes = ["confirmation", "favorites", "image", "title"];
        if (name === "flagged") {
            this.renderFlagging();
        } else if (changeableAttributes.includes(name) && oldVal && oldVal !== newVal) {
            this.render();
        }
    }

    connectedCallback() {

        this.image.addEventListener('error', (event) => {
            this.imageWrapper.style.display = "none";
        })

        this.render();

        const deleteFavoriteHandler = (event) => {
            if (event.target.nodeName == 'LI') {
                const deleteItem = event.target.textContent;
                const confirmationQuestion = this.getAttribute("confirmation") || ": soll der Eintrag gelöscht werden?";
                const userConfirmedFeedback = window.confirm(deleteItem + confirmationQuestion);
                if (userConfirmedFeedback) {
                    let favoriteItems = this.favoriteItems;
                    favoriteItems = favoriteItems.filter(item => item != deleteItem)
                    this.favoriteItems = favoriteItems;

                    this.renderFavorites();
                }
            }
        }

        this.button.addEventListener("click", (event) => {
            if (this.input.value) {
                let favoriteItems = this.favoriteItems;
                favoriteItems.push(this.input.value);
                this.favoriteItems = favoriteItems;

                this.renderFavorites();
            }

            let custom = new CustomEvent('button-clicked', {
                detail: {
                  event
                }
            });
            this.dispatchEvent(custom);
        });

        this.favorites.addEventListener("click", deleteFavoriteHandler);
        this.favorites.addEventListener("keyup", (ev) => {
            if (ev.code == "Enter" || ev.code == "Space") {
                deleteFavoriteHandler(ev);
            }
        });
    }

    // equalsInitialFavoriteItems (items = []) {
    //     const initialFavoriteItems = this.getAttribute('favorites')? JSON.parse(this.getAttribute('favorites')): [];
    //     return items.toString() == initialFavoriteItems.toString();
    // }

    get favoriteItems () {
        const initialFavoriteItems = this.getAttribute('favorites')? JSON.parse(this.getAttribute('favorites')): [];
        const favoriteItems = localStorage.getItem("favoriteItems")? localStorage.getItem("favoriteItems").split("$--$"): initialFavoriteItems;

        return favoriteItems;
    }

    set favoriteItems (items = []) {
        localStorage.setItem("favoriteItems", items.join("$--$"));
    }

    get isFlagged () {
        return this.hasAttribute('flagged')
    }
    
    set isFlagged (isFlagged) {
        if (isFlagged) {
          this.setAttribute('flagged', 'flagged')
        } else {
          this.removeAttribute('flagged')
        }
    }

    static get observedAttributes() {
        return ["confirmation", "favorites", "flagged", "image", "title"];
    }

    render() {
        this.headline.textContent = this.getAttribute('title') || 'title';
        this.button.textContent = this.getAttribute('button') || 'button';
        this.image.setAttribute("src", this.getAttribute('image') || '');
        if (this.getAttribute('image')) {
            this.imageWrapper.classList.remove('disabled');
        }
        
        this.renderFavorites();
        this.renderFlagging();
    }

    renderFavorites() {
        this.favorites.innerHTML = this.favoriteItems.map(item => `<li tabindex="0">${item}</li>`).join('');
    }

    renderFlagging() {
        if (this.isFlagged) {
            this.wrapper.style.borderColor = '#e2001a';
        } else {
            this.wrapper.style = '';
        }
    }
}


customElements.define("roller-demo", Demo);
