// https://blog.bitsrc.io/a-complete-introduction-to-webassembly-and-its-javascript-api-3474a9845206

let compiledModule
let exports

// fetch('sample.wasm')
//     .then(response => response.arrayBuffer())
//     .then(bytes => WebAssembly.instantiate(bytes))
//     .then(results => {
//         exports = results.instance.exports
//     })

// One of the downsides of the above approach is that these methods don’t directly access the byte code, so require an extra step to turn the response into an ArrayBuffer before compiling/instantiating the wasm module.
// Instead, we can use the WebAssembly.compileStreaming / WebAssembly.instantiateStreaming methods to achieve the same functionality as above, with an advantage being able to access the byte code directly without the need for turning the response into an ArrayBuffer .
// You should note that the WebAssembly.instantiate and WebAssembly.instantiateStreaming return the instance as well as the compiled module as well, which can be used to spin up instances of the module quickly.


WebAssembly.instantiateStreaming(fetch('sample.wasm')).then(obj => {
  exports = obj.instance.exports;
  // access compiled module
  compiledModule = obj.module;
})

// When we instantiate a WebAssembly module instance, we can optionally pass an import object that would contain the values to be imported into the newly created module instance. These can be of 4 types

const global = new WebAssembly.Global({
    value: 'i64',
    mutable: true
}, 20);

let importObject = {
    js: {
        global
    }
};

WebAssembly.instantiateStreaming(fetch('global.wasm'), importObject)