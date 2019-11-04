// https://salomvary.com/es6-modules-in-browsers.html
// https://www.jsdelivr.com/

import { Vue, Vuex } from "./vendor.js";
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js'
import { PersonsService } from "./services.js";
import Letter, { E } from "./letter.mjs";
import AppTemplate from "./tpl/App.html";

export function App(el = "body", initialPersonsList = []) {
  performance.mark("app-start");

  const e = new E("red");
  console.log(e.toggleCase(), e.info, e.print());
  // console.log(e.#color)

  Vue.use(Vuex);

  const storeLogPlugin = store => {
    // called when the store is initialized
    store.subscribe((mutation, state) => {
      // called after every mutation.
      // The mutation comes in the format of `{ type, payload }`.
      console.group("Store log");
      console.log(mutation);
      console.log(state);
      console.groupEnd("Store log");
    });
  };

  const persons = {
    namespaced: true,
    state: {
      persons: initialPersonsList
    },
    getters: {
      numberOfVoices: state => state.persons.length
    },
    actions: {
      initialize(context) {
        PersonsService.load().then(data => context.commit("set", data));
      },
      reset(context) {
        context.commit("reset");
      }
    },
    mutations: {
      reset(state) {
        state.persons = [];
      },
      set(state, persons = []) {
        state.persons = persons;
      }
    }
  };

  const store = new Vuex.Store({
    modules: {
      persons
    },
    strict: true, // In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown
    plugins: [storeLogPlugin]
  });

  const uppercaseFilter = value => value.toUpperCase();

  Vue.filter("uppercase", uppercaseFilter);

  const toggleMixin = {
    data() {
      return {
        show: false
      };
    },
    created() {
      this.show = true;
    },
    computed: {
      statusStyle() {
        return {
          color: this.show ? "green" : "red"
        };
      }
    },
    methods: {
      toggle() {
        this.show = !this.show;
      }
    }
  };
  // Vue.mixin('toggleMixin', toggleMixin) // global definition...

  Vue.directive("pointer", {
    bind(el, binding, vnode) {
      el.style.cursor = "pointer";
    },
    componentUpdated(el, binding, vnode) {
      el.style.fontStyle = binding.value ? "italic" : "normal";
      // el.style.fontStyle = vnode.context.show ? 'normal' : 'italic'
    }
  });

  return new Vue({
    el,
    mixins: [toggleMixin],
    store,
    template: AppTemplate,
    // props: ['persons'],
    data() {
      return {
        h1: "Stimmen früherer Käufer",
        counterInterval: null,
        counter: 0,
        expandableStyle: {
          color: "red",
          display: "block",
          fontSize: "13px",
          height: "100px",
          overflowY: "scroll",
          width: "100%"
        },
        showDebug: false
      };
    },
    created() {
      this.initializePersons();
      this.startCounter();

      performance.mark("app-created");
      performance.measure("app initialization", "app-start", "app-created");
      performance.measure("page initialization", undefined, "app-created");

      console.log(performance.getEntriesByType("measure"));
      performance.clearMarks();
      performance.clearMeasures();
    },
    computed: {
      ...Vuex.mapGetters({
        peopleCount: "persons/numberOfVoices"
      }),
      buttonStyle() {
        return {
          backgroundColor: this.counterInterval ? "light-gray" : "blue"
        };
      },
      debug() {
        return JSON.stringify(this.persons, undefined, 2);
      },
      persons: {
        get: function() {
          return this.$store.state.persons.persons;
        },
        set: function(value) {
          this.$store.dispatch("persons/reset");
        }
      },
      uptime() {
        return this.counter;
      }
    },
    directives: {
      expandable: {
        bind: function(el, binding, vnode) {
          // console.log('BIND directive', binding.name, binding.arg, binding.modifiers, binding.value)
          // console.log(vnode.data.directives, vnode.context)
        }
      }
    },
    methods: {
      getContact(person) {
        return person.contact.map(item => item.shortDescription).join(", ");
      },
      initializePersons() {
        this.$store.dispatch("persons/initialize");
      },
      startCounter() {
        this.counterInterval = setInterval(this.incrementCounter, 1000);
      },
      stopCounter() {
        clearInterval(this.counterInterval);
        this.counterInterval = null;
      },
      incrementCounter() {
        this.counter++;
      },
      toggleCounterRunner() {
        if (this.counterInterval) {
          this.stopCounter();
        } else {
          this.startCounter();
        }
      },
      toggleDebug() {
        this.showDebug = !this.showDebug;
      }
    }
  });
}

export default App;
