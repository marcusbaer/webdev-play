import {
    observable,
    decorate,
    action,
    computed,
    autorun
} from 'https://unpkg.com/mobx@5.15.7?module'

class Store {
    constructor() {
        this.count = 0
    }

    decrementCount() {
        if (this.count > 0) {
            this.count = --this.count
        }
    }
}

decorate(Store, {
    count: observable,
    decrementCount: action
})

export const store = new Store()