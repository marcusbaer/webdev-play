'use strict';

import Person from './person.js';
import theAnswer, { PI } from './numbers.js';
import uppercase from './uppercase.js';

console.log('UTILS DEMO:', uppercase('green'), theAnswer, PI);

async function parse() {
    const body = window.document.querySelector('body');
    const mainResult = await main();

    const p = window.document.createElement('pre');
    const text = window.document.createTextNode(JSON.stringify(mainResult, undefined, 2));

    console.log(mainResult);
    const shortList = mainResult.map(person => {
        return person.name + (person.contact.length ? ': ' + person.contact.map(item => item.shortDescription).join(', ') : '')
    });

    const ul = window.document.createElement('ul');
    shortList.forEach(item => {
        const li = window.document.createElement('li');
        li.innerHTML = item;
        ul.appendChild(li);
    })

    p.appendChild(text);
    body.appendChild(ul);
    body.appendChild(p);
}

async function main(ignoreTypeScript = false) {

    return [
        Person.create({type: 'adult', name: 'Bob', age: 36, email: 'bob@family.com', phone: '+31 733 48943 448', children: ['Deborah']}),
        Person.create({type: 'child', name: 'Emily', age: 8, email: 'emily@family.com', favorite: 'Teddy'}),
    ];
}

window.onload = parse;

export default main;
