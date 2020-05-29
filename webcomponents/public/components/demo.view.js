export const style = `<style>
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
</style>`

export const html = `<div class="demo roller">
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

export default template => `${style}${html}`;