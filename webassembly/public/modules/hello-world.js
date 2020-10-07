// https://blog.bitsrc.io/a-complete-introduction-to-webassembly-and-its-javascript-api-3474a9845206
// https://webassembly.studio/?f=wne209a6cxq

let exports;
let buffer;
(async() => {
//   let response = await fetch('./modules/main.wasm');
//   let results = await WebAssembly.instantiate(await response.arrayBuffer());
  let results = await WebAssembly.instantiateStreaming(fetch('./modules/main.wasm'));
  let instance = results.instance;
  exports = instance.exports;
  buffer = new Uint8Array(exports.memory.buffer);

  findPower(5,3);
  
  printHelloWorld();
  
})();

const findPower = (base = 0, power = 0) => {
  console.log(exports.power(base,power));
}

const printHelloWorld = () => {
  let pointer = exports.helloWorld();
  let str = "";
  for(let i = pointer;buffer[i];i++){
    str += String.fromCharCode(buffer[i]);
  }
  console.log(str);
}