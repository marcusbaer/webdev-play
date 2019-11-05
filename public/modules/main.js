"use strict";

import App from "./components/App/App.js";
import theAnswer, { PI } from "./lib/numbers.js";
import uppercase from "./lib/uppercase.js";

async function parse() {
  console.log("UTILS DEMO:", uppercase("green"), theAnswer, PI);

  App("#app");
}

window.onload = parse;
