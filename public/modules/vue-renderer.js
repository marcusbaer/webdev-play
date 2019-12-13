"use strict";

// falling back to vue-custom-element due to shadowCss issues
import { Vue, Vuex } from "./deps.js";
// import { Vue, Vuex, vueCustomElement } from "./deps.js";

// import Label from "./components/Label/Label.js";

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.productionTip = false;
Vue.config.ignoredElements = ["vue-label"];

// Enable the plugin
Vue.use(Vuex);
// Vue.use(vueCustomElement);

// Register directives for global usage
Vue.directive("pointer", {
  bind(el, binding, vnode) {
    el.style.cursor = "pointer";
    el.style.fontStyle = binding.value ? "italic" : "normal";
  },
  componentUpdated(el, binding, vnode) {
    el.style.fontStyle = binding.value ? "italic" : "normal";
    // el.style.fontStyle = vnode.context.active ? "normal" : "italic";
  },
});

// USAGE <vue-label type="sale">Angebot</vue-label>
// Vue.customElement("vue-label", Label, {
//   shadow: true,
//   shadowCss: `
//     .vue-label {
//       border: 1px solid;
//       cursor: pointer;
//       display: inline;
//       padding: 0.5rem;
//     }
//     .vue-label.--offer {
//       border-color: red;
//       color: red;
//     }
//     .vue-label.--sale {
//       border-color: orange;
//       color: orange;
//     }`,
// });

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

const KitchenService = {
  loadList(config = {}) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(resolve, 1000)
    // })
    return fetch(`/api/kitchens.json`).then(response => {
      return response.json().then(json => {
        return json.teaserList.length > 0 ? json.teaserList : [];
      });
    });
  },
};

const kitchens = {
  namespaced: true,
  state: {
    error: "",
    loaded: false,
    list: [],
  },
  getters: {
    error: state => state.error,
    loaded: state => state.loaded,
    list: state => state.list,
  },
  actions: {
    initialize({ commit, state }, messages = {}) {
      commit("setKitchens", []);
    },
    load({ commit, state }) {
      const pageIdentifier = state.page;

      KitchenService.loadList({ page: pageIdentifier })
        .then(kitchens => {
          commit("setKitchens", kitchens);
          commit("setLoaded", true);
          if (kitchens.length === 0) {
            commit("setError", "Keine Küchen vorhanden");
          }
        })
        .catch(error => {
          commit("setLoaded", true);
          commit("setError", "Küchen konnten nicht geladen werden");
          console.error(error);
        });
    },
  },
  mutations: {
    setError(state, data) {
      state.error = data;
    },
    setKitchens(state, data) {
      state.list = data;
    },
    setLoaded(state, data) {
      state.loaded = data;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    kitchens,
  },
  strict: true, // In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown
  //   plugins: [storeLogPlugin],
});

new Vue({
  store,
  el: "#vue",
  computed: {
    ...Vuex.mapGetters({
      error: "kitchens/error",
      loaded: "kitchens/loaded",
      teaserList: "kitchens/list",
    }),
  },
  created: function() {
    this.$store.dispatch("kitchens/initialize", this.messages);
    this.loadData();
  },
  methods: {
    loadData: function() {
      this.$store.dispatch("kitchens/load");
    },
  },
});
