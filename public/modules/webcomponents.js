"use strict";

// ui- == r-

import { Vue, vueCustomElement } from "./vendor.js";
import Marquee from "./components/Marquee/Marquee.js";

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.ignoredElements = ["r-marquee"];

// Enable the plugin
Vue.use(vueCustomElement);

// Register your component
Vue.customElement("r-marquee", Marquee, {
  shadow: true,
  shadowCss: `
        .r-marquee {
            background-color: blue;
        }`
});
