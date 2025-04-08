/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var t,e,r,n={8452:(t,e,r)=>{var n=r(6540),o=r(5338),a=r(3319);function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return u(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function l(){l=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var a=e&&e.prototype instanceof b?e:b,i=Object.create(a.prototype),c=new N(n||[]);return o(i,"_invoke",{value:k(t,r,c)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var d="suspendedStart",y="suspendedYield",v="executing",m="completed",g={};function b(){}function w(){}function x(){}var E={};f(E,c,(function(){return this}));var O=Object.getPrototypeOf,j=O&&O(O(M([])));j&&j!==r&&n.call(j,c)&&(E=j);var L=x.prototype=b.prototype=Object.create(E);function _(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(o,a,c,u){var l=h(t[o],t,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==i(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function k(e,r,n){var o=d;return function(a,i){if(o===v)throw Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=P(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=h(e,r,n);if("normal"===l.type){if(o=n.done?m:y,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function P(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,P(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=h(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function M(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(i(e)+" is not iterable")}return w.prototype=x,o(L,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:w,configurable:!0}),w.displayName=f(x,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,s,"GeneratorFunction")),t.prototype=Object.create(L),t},e.awrap=function(t){return{__await:t}},_(S.prototype),f(S.prototype,u,(function(){return this})),e.AsyncIterator=S,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new S(p(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(L),f(L,s,"Generator"),f(L,c,(function(){return this})),f(L,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=M,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(I),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:M(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function s(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function f(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){s(a,n,o,i,c,"next",t)}function c(t){s(a,n,o,i,c,"throw",t)}i(void 0)}))}}var p=function(){var t=f(l().mark((function t(e,r){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.A.post("/wp-json/wpp-generator/v1/post-id/".concat(e,"/delete/"),{attributes:r},{headers:{"Content-Type":"application/json","X-WP-Nonce":mxsfwnAdminLocalize.nonce}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),h=function(){var t=f(l().mark((function t(e){var r,n=arguments;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.length>1&&void 0!==n[1]?n[1]:{},t.next=3,a.A.post("/wp-json/wpp-generator/v1/post-id/".concat(e),{attributes:r},{headers:{"Content-Type":"application/json","X-WP-Nonce":mxsfwnAdminLocalize.nonce}});case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=f(l().mark((function t(e,r){var n;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=encodeURIComponent(r),t.next=3,a.A.get("/wp-json/wpp-generator/v1/post-id/".concat(e,"/"),{params:{post_id:e,postMetaKey:n},headers:{"X-WP-Nonce":mxsfwnAdminLocalize.nonce}});case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}();const y=function(t){var e=t.postMetaKey,r=t.postId,o=t.postMetaValue,a=c((0,n.useState)(""),2),i=a[0],u=a[1],l=c((0,n.useState)(""),2),s=l[0],f=l[1],y=c((0,n.useState)(""),2),v=y[0],m=y[1];(0,n.useEffect)((function(){o&&d(r,e).then((function(t){if(200===t.status){var e=t.data;null!=e&&e.imageId&&null!=e&&e.imageUrl&&(f(parseInt(e.imageId)),u(e.imageUrl))}})).catch((function(t){}))}),[]);var g=null;return n.createElement("div",{className:"mx-image-uploader-react"},v&&n.createElement("div",{className:"error-message",style:{color:"red",marginBottom:"10px"}},v),n.createElement("button",{onClick:function(t){t.preventDefault(),m(""),g||(g=wp.media.frames.metaBoxUploadImage=wp.media({title:"Choose image",library:{type:"image"},button:{text:"Upload"},multyple:!1})).on("select",(function(){var t=g.state().get("selection").first().id;h(r,{imageId:t,postMetaKey:e}).then((function(e){if(200===e.status){f(t);var r=e.data.imageUrl;u(r)}else m("Failed to upload image. Please try again.")})).catch((function(t){var e,r=null!=t&&null!==(e=t.response)&&void 0!==e&&null!==(e=e.data)&&void 0!==e&&e.message?t.response.data.message:t.message;m("Error: "+r)}))})),g.open()},style:{display:i?"none":"block"}},"Choose Image"),i&&n.createElement(n.Fragment,null,n.createElement("img",{src:i,alt:"Uploaded",style:{display:"block",maxWidth:"100%"}}),n.createElement("button",{onClick:function(t){t.preventDefault(),p(r,{postMetaKey:e}).then((function(t){200===t.status?(u(""),f("")):m("Failed to delete image. Please try again.")})).catch((function(t){var e,r=null!=t&&null!==(e=t.response)&&void 0!==e&&null!==(e=e.data)&&void 0!==e&&e.message?t.response.data.message:t.message;m("Error: "+r)}))},style:{display:"block"},className:"mx-meta-box-image-remove"},"Remove Image"),n.createElement("input",{type:"hidden",value:s,name:"image-id-".concat(s)})))};document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".mx-image-uploader").forEach((function(t,e){var r=(0,o.H)(t),a=t.getAttribute("data-post-meta-key"),i=t.getAttribute("data-post-meta-value"),c=t.getAttribute("data-post-id");r.render(n.createElement(y,{postMetaKey:a,postMetaValue:i,postId:c}))}))}))}},o={};function a(t){var e=o[t];if(void 0!==e)return e.exports;var r=o[t]={exports:{}};return n[t](r,r.exports,a),r.exports}a.m=n,t=[],a.O=(e,r,n,o)=>{if(!r){var i=1/0;for(s=0;s<t.length;s++){for(var[r,n,o]=t[s],c=!0,u=0;u<r.length;u++)(!1&o||i>=o)&&Object.keys(a.O).every((t=>a.O[t](r[u])))?r.splice(u--,1):(c=!1,o<i&&(i=o));if(c){t.splice(s--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var s=t.length;s>0&&t[s-1][2]>o;s--)t[s]=t[s-1];t[s]=[r,n,o]},r=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,a.t=function(t,n){if(1&n&&(t=this(t)),8&n)return t;if("object"==typeof t&&t){if(4&n&&t.__esModule)return t;if(16&n&&"function"==typeof t.then)return t}var o=Object.create(null);a.r(o);var i={};e=e||[null,r({}),r([]),r(r)];for(var c=2&n&&t;"object"==typeof c&&!~e.indexOf(c);c=r(c))Object.getOwnPropertyNames(c).forEach((e=>i[e]=()=>t[e]));return i.default=()=>t,a.d(o,i),o},a.d=(t,e)=>{for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.j=902,(()=>{var t={902:0};a.O.j=e=>0===t[e];var e=(e,r)=>{var n,o,[i,c,u]=r,l=0;if(i.some((e=>0!==t[e]))){for(n in c)a.o(c,n)&&(a.m[n]=c[n]);if(u)var s=u(a)}for(e&&e(r);l<i.length;l++)o=i[l],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(s)},r=self.webpackChunkmxsfwn_npm_handler=self.webpackChunkmxsfwn_npm_handler||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var i=a.O(void 0,[344],(()=>a(8452)));i=a.O(i)})();