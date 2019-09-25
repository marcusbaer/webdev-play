'use strict';

import App from './App.js';
import Person from './person.js';
import theAnswer, { PI } from './numbers.js';
import uppercase from './uppercase.js';

console.log('UTILS DEMO:', uppercase('green'), theAnswer, PI);

async function parse() {
    const body = window.document.querySelector('body');
    const mainData = await getMainData();

    // const p = window.document.createElement('pre');
    // const text = window.document.createTextNode(JSON.stringify(mainData, undefined, 2));

    console.log(mainData.map(person => {
        return person.name + (person.contact.length ? ': ' + person.contact.map(item => item.shortDescription).join(', ') : '')
    }));

    App('#app', mainData);
}

function getMainData(ignoreTypeScript = false) {

    return [
        Person.create({type: 'adult', name: 'Bernd', age: 36, email: 'bernd@family.com', phone: '+49 733 48943 448', children: ['Emilia'], citation: 'Wir sind so froh, dass wir noch ein E bekommen haben.'}),
        Person.create({type: 'child', name: 'Emilia', age: 8, email: 'emilia@family.com', favorite: 'Teddy', citation: 'Ohne das E hätte ich nie reden gelernt. Mein Name würde auch nicht funktionieren.'}),
    ];
}

window.onload = parse;

export default getMainData;
