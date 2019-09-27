// https://v8.dev/features/class-fields#private-class-fields
// https://developers.google.com/web/updates/2019/07/devtools#privateclassfields
// https://medium.com/edge-coders/whats-new-in-es2017-or-es8-for-javascript-40352b089780

export default class Letter {

    letter = null
    
    #color = 'black'
    #lowerCase = false

    constructor (color = null) {
        this.letter = this.constructor.name

        if (color) {
            this.#color = color
        }
    }

    get color () {
        return this.#color
    }

    print () {
        const printLetter = this.#lowerCase ? this.letter.toLowerCase() : this.letter
        return `<span style="color: ${this.#color};">${printLetter}</span>`
    }

    toggleCase () {
        return this.#lowerCase = !this.#lowerCase
    }
}

export class E extends Letter {

    #privateAttribute = null

    constructor (color = null) {
        super(color)
    }

    get info () {
        return `I am the letter ${this.letter} with the color ${this.color}.`
    }
}
