// https://salomvary.com/es6-modules-in-browsers.html
// https://www.jsdelivr.com/

import { Vue } from './vendor.js'
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js'

export function App (el = 'body', personsList = []) {

    return new Vue({
        el,
        template: `<div class="app p-2" style="width: 100%">
            <h1 class="text-lg leading-tight font-semibold text-gray-900" @click="toggleDebug">{{ h1 }}</h1>
            <ul>
                <li v-for="(person, index) in persons" :key="index">
                    <div>{{ person.name }}</div>
                    <div>{{ person.citation }}</div>
                    <div>{{ getContact(person) }}</div>
                </li>
            </ul>
            <p class="pt-4">Greif schnell zu! Dieses Angebot läuft bereits seit {{ uptime }} Sekunden!</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold mt-8 py-2 px-4 rounded" @click="toggleCounterRunner" @style="buttonStyle">Ich will keine Zeit verlieren!</button>
            <pre class="p-4" :style="expandableStyle" v-expandable:500.a.b="stopCounter" v-if="showDebug">{{ debug }}</pre>
        </div>`,
        // props: ['persons'],
        data () {
            return {
                h1: 'Frühere Käufer',
                counterInterval: null,
                counter: 0,
                persons: personsList,
                expandableStyle: {
                    color: 'red',
                    display: 'block',
                    fontSize: '13px',
                    height: '100px',
                    overflowY: 'scroll',
                    width: '100%',
                },
                showDebug: false,
            }
        },
        created () {
            this.startCounter()
        },
        computed: {
            buttonStyle () {
            return {
                backgroundColor: this.counterInterval ? 'light-gray' : 'blue'
            }
            },
            debug () {
                return JSON.stringify(this.persons, undefined, 2)
            },
            uptime () {
                return this.counter
            }
        },
        directives: {
            expandable: {
                bind: function (el, binding, vnode) {
                    
                    console.log('BIND directive', binding.name, binding.arg, binding.modifiers, binding.value)
                    console.log(vnode.data.directives, vnode.context)
                }
            }
        },
        methods: {
            getContact (person) {
                return person.contact.map(item => item.shortDescription).join(', ')
            },
            startCounter () {
                this.counterInterval = setInterval(this.incrementCounter, 1000)
            },
            stopCounter () {
                clearInterval(this.counterInterval)
                this.counterInterval = null
            },
            incrementCounter () {
                this.counter++
            },
            toggleCounterRunner () {
                if (this.counterInterval) {
                    this.stopCounter()
                } else {
                    this.startCounter()
                }
            },
            toggleDebug () {
                this.showDebug = !this.showDebug
            }
        }
  })
}

export default App
