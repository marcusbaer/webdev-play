!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(){}n.r(e);function o(t,e){for(const n in e)t[n]=e[n];return t}function c(t){return t()}function a(){return Object.create(null)}function i(t){t.forEach(c)}function l(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}new Set;function u(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function x(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}let b;function g(t){b=t}const y=[],v=[],$=[],k=[],w=Promise.resolve();let _=!1;function j(){_||(_=!0,w.then(S))}function E(t){$.push(t)}function S(){const t=new Set;do{for(;y.length;){const t=y.shift();g(t),T(t.$$)}for(;v.length;)v.pop()();for(let e=0;e<$.length;e+=1){const n=$[e];t.has(n)||(n(),t.add(n))}$.length=0}while(y.length);for(;k.length;)k.pop()();_=!1}function T(t){t.fragment&&(t.update(t.dirty),i(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(E))}const M=new Set;let O;function C(t,e){t&&t.i&&(M.delete(t),t.i(e))}function P(t,e,n,r){if(t&&t.o){if(M.has(t))return;M.add(t),O.c.push(()=>{M.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function A(t,e){const n=e.token={};function r(t,r,c,a){if(e.token!==n)return;e.resolved=c&&{[c]:a};const l=o(o({},e.ctx),e.resolved),s=t&&(e.current=t)(l);e.block&&(e.blocks?e.blocks.forEach((t,n)=>{n!==r&&t&&(O={r:0,c:[],p:O},P(t,1,1,()=>{e.blocks[n]=null}),O.r||i(O.c),O=O.p)}):e.block.d(1),s.c(),C(s,1),s.m(e.mount(),e.anchor),S()),e.block=s,e.blocks&&(e.blocks[r]=s)}if((c=t)&&"object"==typeof c&&"function"==typeof c.then){if(t.then(t=>{r(e.then,1,e.value,t)},t=>{r(e.catch,2,e.error,t)}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved={[e.value]:t}}var c}"undefined"!=typeof window?window:global;let B;function z(t,e){t.$$.fragment&&(i(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function H(t,e,n,o,s,u){const d=b;g(t);const f=e.props||{},p=t.$$={fragment:null,ctx:null,props:u,update:r,not_equal:s,bound:a(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:a(),dirty:null};let m=!1;var h;p.ctx=n?n(t,f,(e,n)=>{p.ctx&&s(p.ctx[e],p.ctx[e]=n)&&(p.bound[e]&&p.bound[e](n),m&&function(t,e){t.$$.dirty||(y.push(t),j(),t.$$.dirty=a()),t.$$.dirty[e]=!0}(t,e))}):f,p.update(),m=!0,i(p.before_update),p.fragment=o(p.ctx),e.target&&(e.hydrate?p.fragment.l((h=e.target,Array.from(h.childNodes))):p.fragment.c(),e.intro&&C(t.$$.fragment),function(t,e,n){const{fragment:r,on_mount:o,on_destroy:a,after_update:s}=t.$$;r.m(e,n),E(()=>{const e=o.map(c).filter(l);a?a.push(...e):i(e),t.$$.on_mount=[]}),s.forEach(E)}(t,e.target,e.anchor),S()),g(d)}"undefined"!=typeof HTMLElement&&(B=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){z(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class L{$destroy(){z(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function N(t){var e,n,o=t.error.message;return{c(){e=p("div"),n=m(o),x(e,"class","flex-1 text-red-300")},m(t,r){d(t,e,r),u(e,n)},p:r,d(t){t&&f(e)}}}function q(t){var e,n,o,c,a,i=t.price;return{c(){e=p("div"),n=m(i),o=m(" €"),c=h(),(a=p("div")).textContent="pro Stück",x(e,"class","flex-1 text-5xl"),x(a,"class","flex-1 text-2xl")},m(t,r){d(t,e,r),u(e,n),u(e,o),d(t,c,r),d(t,a,r)},p:r,d(t){t&&(f(e),f(c),f(a))}}}function W(t){var e;return{c(){(e=p("div")).textContent="... wird geladen",x(e,"class","flex-1 text-gray-600")},m(t,n){d(t,e,n)},p:r,d(t){t&&f(e)}}}function D(t){var e,n,c,a,i,l,s,b,g,y,v,$,k;let w={ctx:t,current:null,token:null,pending:W,then:q,catch:N,value:"price",error:"error"};return A(v=t.promise,w),{c(){e=p("div"),n=p("div"),c=p("h3"),a=m(t.name),i=h(),(l=p("div")).innerHTML='<div class="md:flex-shrink-0"><img class="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase"></div> <div class="mt-4 md:mt-0 md:ml-6"><div class="uppercase tracking-wide text-sm text-red-600 font-bold">Top Angebot</div> <a href="./index.html" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Deutschlands meistverkaufter Buchstabe</a> <p class="mt-2 text-gray-600">\n\t\t\t\t\t\tAls fünfter Buchstabe des deutschen Alphabets reiht sich das E ganz vorn in die Riege der Buchstaben ein.\n\t\t\t\t\t\tNicht umsonst bekam es auf Tastaturen einen Top-Platz innerhalb der glorreichen QWERTZ.\n\t\t\t\t\t\tKaufen auch Sie ein E und erleben Sie, wie flexibel sich dieser Buchstabe einsetzen lässt!\n\t\t\t\t\t\t</p></div>',s=h(),(b=p("div")).innerHTML='<div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">häufig</div> <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">vielseitig einsetzbar</div> <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">pflegeleicht</div>',g=h(),y=p("div"),w.block.c(),$=h(),(k=p("form")).innerHTML='<div class="flex-auto text-center px-4 py-2 m-2">\n\t\t\t\t\tAnzahl\n\t\t\t\t</div> <div class="flex-auto text-gray-700 text-center px-4 py-2 m-2"><input type="number" name="quantity" value="1" class="text-black text-2xl"></div> <div class="flex-auto text-gray-700 text-center px-4 py-2 m-2"><button class="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded" rel="js-click-button">\n\t\t\t\t\tJetzt kaufen\n\t\t\t\t\t</button></div>',x(c,"class","text-4xl"),x(n,"class","flex pb-4 pt-4"),x(l,"class","md:flex"),x(b,"class","flex bg-gray-200 mt-8"),x(y,"class","flex items-baseline max-w-sm mt-8 mx-auto"),x(e,"class","container mx-auto px-4"),x(k,"action","./checkout.html"),x(k,"class","flex bg-gray-200 mt-8 items-center pb-4 pt-8")},m(t,r){d(t,e,r),u(e,n),u(n,c),u(c,a),u(e,i),u(e,l),u(e,s),u(e,b),u(e,g),u(e,y),w.block.m(y,w.anchor=null),w.mount=()=>y,w.anchor=null,d(t,$,r),d(t,k,r)},p(e,n){var r,c;t=n,e.name&&(r=a,c=""+(c=t.name),r.data!==c&&(r.data=c)),w.ctx=t,v!==(v=t.promise)&&A(v,w)||w.block.p(e,o(o({},t),w.resolved))},i:r,o:r,d(t){t&&f(e),w.block.d(),w.token=null,w=null,t&&(f($),f(k))}}}function J(t,e,n){let{name:r="Produktname"}=e,o=async function(){const t=await fetch("/api/product/buchstabe-e.json");if(t.ok)return(await t.json()).price.toString().replace(/\./,",");throw new Error(t.statusText)}();return t.$set=t=>{"name"in t&&n("name",r=t.name)},{name:r,promise:o}}const Q=new class extends L{constructor(t){super(),H(this,t,J,D,s,["name"])}}({target:document.body,props:{name:"Buchstabe E"}});window.app=Q;e.default=Q}]);