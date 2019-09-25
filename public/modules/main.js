'use strict';

import App from './App.js';
import Person from './person.js';
import theAnswer, { PI } from './numbers.js';
import uppercase from './uppercase.js';

async function parse() {
    console.log('UTILS DEMO:', uppercase('green'), theAnswer, PI);

    App('#app', await getMainData());
}

function getMainData(ignoreTypeScript = false) {

    return [
        Person.create({type: 'adult', name: 'Bernd', age: 36, email: 'bernd@family.com', phone: '+49 733 48943 448', children: ['Emilia'], citation: 'Wir sind so froh, dass wir noch ein E bekommen haben.'}),
        Person.create({type: 'child', name: 'Emilia', age: 8, email: 'emilia@family.com', favorite: 'Teddy', citation: 'Ohne das E hätte ich nie reden gelernt. Mein Name würde auch nicht funktionieren.'}),
    ];
}

window.onload = parse;

export default getMainData;
