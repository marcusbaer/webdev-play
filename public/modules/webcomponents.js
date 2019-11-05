"use strict";

// ui- == r-

import { Vue, vueCustomElement } from "./vendor.js";

import Label from "./components/Label/Label.js";
import Marquee from "./components/Marquee/Marquee.js";

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.ignoredElements = ["r-label", "r-marquee"];

// Enable the plugin
Vue.use(vueCustomElement);

// Register directives for global usage
Vue.directive("pointer", {
  bind(el, binding, vnode) {
    el.style.cursor = "pointer";
    el.style.fontStyle = binding.value ? "italic" : "normal";
  },
  componentUpdated(el, binding, vnode) {
    el.style.fontStyle = binding.value ? "italic" : "normal";
    // el.style.fontStyle = vnode.context.active ? "normal" : "italic";
  }
});

// Register your components

Vue.customElement("r-label", Label, {
  shadow: true,
  shadowCss: `
    .r-label {
        cursor: pointer;
    }
    .r-label.--sell {
        color: orange;
    }`
});

Vue.customElement("r-marquee", Marquee, {
  shadow: true,
  shadowCss: `
    i {
        text-transform: uppercase;
    }`
});
