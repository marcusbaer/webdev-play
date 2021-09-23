document.body.innerHTML = '<happy-hippo></happy-hippo><br><textarea>Hallo</textarea>'
customElements.define('happy-hippo', class extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = '<p>I am <strong>strong enough</strong> to move that mountain.</p>';
    }
});
document.querySelector('happy-hippo').id = 'happy'
document.querySelector('happy-hippo').name = 'Dingo'