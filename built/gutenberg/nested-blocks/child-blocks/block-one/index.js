(()=>{"use strict";var e,t={591:()=>{const e=window.wp.blocks,t=JSON.parse('{"UU":"mxsfwn/nested-blocks-child-blocks-block-one","DD":"Block One","h_":"Add Block One"}'),n=window.React,r=window.wp.i18n,s=window.wp.blockEditor,o=window.wp.components;(0,e.registerBlockType)(t.UU,{edit:function({attributes:e,isSelected:a,setAttributes:l}){const i=(0,s.useBlockProps)();return(0,n.createElement)("div",{...i},e.message&&!a?(0,n.createElement)(n.Fragment,null):(0,n.createElement)(o.Placeholder,{label:t.DD,instructions:t.h_},(0,n.createElement)(o.TextControl,{label:(0,r.__)("Message","wpp-generator-next-source"),value:e.message,onChange:e=>l({message:e})})),e.message?(0,n.createElement)("div",{"data-number":e.number,"data-size":e.size},e.message):(0,n.createElement)("div",null,"No Message"))},save:function({attributes:e}){const t=s.useBlockProps.save();return(0,n.createElement)("div",{...t},e.message)}})}},n={};function r(e){var s=n[e];if(void 0!==s)return s.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,n,s,o)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,s,o]=e[u],l=!0,i=0;i<n.length;i++)(!1&o||a>=o)&&Object.keys(r.O).every((e=>r.O[e](n[i])))?n.splice(i--,1):(l=!1,o<a&&(a=o));if(l){e.splice(u--,1);var c=s();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,s,o]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={517:0,905:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var s,o,[a,l,i]=n,c=0;if(a.some((t=>0!==e[t]))){for(s in l)r.o(l,s)&&(r.m[s]=l[s]);if(i)var u=i(r)}for(t&&t(n);c<a.length;c++)o=a[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},n=globalThis.webpackChunkmxsfwn_npm_handler=globalThis.webpackChunkmxsfwn_npm_handler||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var s=r.O(void 0,[905],(()=>r(591)));s=r.O(s)})();