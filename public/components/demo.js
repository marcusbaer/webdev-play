class Demo extends HTMLElement {

    constructor() {
        const template = document.createElement("template");
        template.innerHTML = `<style>
            :host {
                /* display: block; */
            }
            .roller {
                color: #22252a;
                font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                font-weight: 500;
             }
            .roller h1, .roller h2, .roller h3, .roller h4, .roller h5, .roller h6 {
                font-family: dax_otcond_bold, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                font-weight: 400;
                line-height: 1.2;
            }
            .demo { background-color: var(--demo-background-color, unset); border: var(--demo-border-width, 1px) solid var(--primary-color, #006ab3); border-radius: 0.8rem; padding: 8px; }
            .image-wrapper { max-width: 100%; min-height: 120px; overflow: hidden; }
            .image-wrapper.disabled { background-color: lightgray; }
            .--h3 { font-size: 1.8rem; margin: 0.8rem 0 0.8rem; }
            img { min-height: 120px; min-width: 120px; width: 100%; transition: all 225ms ease-out; }
            img:hover { transform: scale(1.1); }
            ul { list-style-type: lower-greek; }
            ul li { cursor: pointer; margin: 3px 0; padding: 2px 5px; width: fit-content; }
            ul li:hover { background-color: var(--primary-color, #006ab3); }
        </style>
        <div class="demo roller">
            <h1 class="--h3"></h1>
            <div class="image-wrapper disabled">
                <img src="">
            </div>
            <ul id="favorites"></ul>
            <input type="text" placeholder="Hinzufügen.." />
            <button>OK</button>
            <div>
                <slot></slot>
            </div>
        </div>`

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
