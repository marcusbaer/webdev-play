'use strict';

import Person from './person.js';

function createPersonsList() {

    return [
        Person.create({type: 'adult', name: 'Bernd', age: 36, email: 'bernd@family.com', phone: '+49 733 48943 448', children: ['Emilia'], citation: 'Wir sind so froh, dass wir noch ein E bekommen haben.'}),
        Person.create({type: 'child', name: 'Emilia', age: 8, email: 'emilia@family.com', favorite: 'Teddy', citation: 'Ohne das E hätte ich nie reden gelernt. Mein Name würde auch nicht funktionieren.'}),
    ];
}

export const PersonsService = {
    async load (config = {}) {
        return createPersonsList()
        // return new Promise((resolve, reject) => {})
        // return fetch(`persons.json`).then(response => response.json())
    },
}

export default PersonsService;