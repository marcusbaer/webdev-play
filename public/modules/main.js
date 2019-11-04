"use strict";

import App from "./App.js";
import theAnswer, { PI } from "./numbers.js";
import uppercase from "./uppercase.js";

async function parse() {
  console.log("UTILS DEMO:", uppercase("green"), theAnswer, PI);

  App("#app");
}

window.onload = parse;
