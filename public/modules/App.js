// https://salomvary.com/es6-modules-in-browsers.html
// https://www.jsdelivr.com/

import { Vue, Vuex } from './vendor.js'
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js'

export function App (el = 'body', personsList = []) {

    Vue.use(Vuex)

    const storeLogPlugin = store => {
        // called when the store is initialized
        store.subscribe((mutation, state) => {
            // called after every mutation.
            // The mutation comes in the format of `{ type, payload }`.
            console.group('Store log');
            console.log(mutation);
            console.log(state);
            console.groupEnd('Store log');
        })
    }

    const persons = {
        namespaced: true,
        state: {
            persons: personsList,
        },
        getters: {
            numberOfVoices: state => state.persons.length,
        },
        actions: {
            reset (context) {
                context.commit('reset')
            }
        },
        mutations: {
            reset (state) {
                state.persons = []
            },
        }
    }

    const store = new Vuex.Store({
        modules: {
            persons
        },
        strict: true, // In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown
        plugins: [storeLogPlugin]
    })

    return new Vue({
        el,
        store,
        template: `<div class="app p-2" style="width: 100%">
            <h1 v-if="peopleCount > 0" class="text-lg leading-tight font-semibold text-center text-gray-900" @click="toggleDebug">{{ h1 }}</h1>
            <ul>
                <li v-for="(person, index) in persons" :key="index" class="mt-3">
                    <div class="">{{ person.name }}</div>
                    <div class="italic text-base pl-3">„{{ person.citation }}“</div>
                    <div class="pl-3 text-xs">{{ getContact(person) }}</div>
                </li>
            </ul>
            <div class="text-center">
                <p class="pt-8 text-lg">Greif schnell zu! Dieses Angebot läuft bereits seit <span class="text-red-600">{{ uptime }}</span> Sekunden!</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded" @click="toggleCounterRunner" @style="buttonStyle">Ich will keine Zeit verlieren!</button>
            </div>
            <pre class="p-4" :style="expandableStyle" v-expandable:500.a.b="stopCounter" v-if="showDebug">{{ debug }}</pre>
        </div>`,
        // props: ['persons'],
        data () {
            return {
                h1: 'Stimmen früherer Käufer',
                counterInterval: null,
                counter: 0,
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
            ...Vuex.mapGetters({
                peopleCount: 'persons/numberOfVoices',
            }),
            buttonStyle () {
                return {
                    backgroundColor: this.counterInterval ? 'light-gray' : 'blue'
                }
            },
            debug () {
                return JSON.stringify(this.persons, undefined, 2)
            },
            persons: {
                get: function () { return this.$store.state.persons.persons },
                set: function (value) { this.$store.dispatch('reset'); }
            },
            uptime () {
                return this.counter
            }
        },
        directives: {
            expandable: {
                bind: function (el, binding, vnode) {
                    // console.log('BIND directive', binding.name, binding.arg, binding.modifiers, binding.value)
                    // console.log(vnode.data.directives, vnode.context)
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
