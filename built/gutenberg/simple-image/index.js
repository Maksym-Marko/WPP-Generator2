(()=>{"use strict";var e,t={671:()=>{const e=window.wp.blocks,t=JSON.parse('{"UU":"mxsfwn/simple-image","DD":"Simple Image","h_":"Add Simple Image"}'),a=window.React,r=(window.wp.i18n,window.wp.blockEditor),i=window.wp.components,n=window.wp.data,l=window.wp.element;(0,e.registerBlockType)(t.UU,{edit:function({attributes:e,isSelected:d,setAttributes:o}){const s=(0,r.useBlockProps)(),c=(0,n.useSelect)((t=>!!e.mediaId&&t("core").getEntityRecord("postType","attachment",e.mediaId)),[e]);return(0,l.useEffect)((()=>{c?.media_details&&o({mediaUrl:c.media_details.sizes.full.source_url})}),[c]),(0,a.createElement)("div",{...s},d&&(0,a.createElement)(i.Placeholder,{label:t.DD,instructions:t.h_},(0,a.createElement)(r.MediaUploadCheck,null,(0,a.createElement)(r.MediaUpload,{onSelect:e=>o({mediaId:e.id}),allowedTypes:["image"],value:e.mediaId,render:({open:t})=>(0,a.createElement)(i.Button,{icon:"upload",text:e.mediaId?"Change Image":"Upload Image",variant:"secondary",onClick:t})}))),e.mediaId&&e?.mediaUrl?(0,a.createElement)("img",{src:e.mediaUrl,id:e.mediaId}):(0,a.createElement)("h3",null,"No image attached!"))},save:function({attributes:e}){const t=r.useBlockProps.save();return(0,a.createElement)("div",{...t},(0,a.createElement)("img",{src:e.mediaUrl,"data-image-id":e.mediaId}))}})}},a={};function r(e){var i=a[e];if(void 0!==i)return i.exports;var n=a[e]={exports:{}};return t[e](n,n.exports,r),n.exports}r.m=t,e=[],r.O=(t,a,i,n)=>{if(!a){var l=1/0;for(c=0;c<e.length;c++){for(var[a,i,n]=e[c],d=!0,o=0;o<a.length;o++)(!1&n||l>=n)&&Object.keys(r.O).every((e=>r.O[e](a[o])))?a.splice(o--,1):(d=!1,n<l&&(l=n));if(d){e.splice(c--,1);var s=i();void 0!==s&&(t=s)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[a,i,n]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={440:0,608:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var i,n,[l,d,o]=a,s=0;if(l.some((t=>0!==e[t]))){for(i in d)r.o(d,i)&&(r.m[i]=d[i]);if(o)var c=o(r)}for(t&&t(a);s<l.length;s++)n=l[s],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(c)},a=globalThis.webpackChunkmxsfwn_npm_handler=globalThis.webpackChunkmxsfwn_npm_handler||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var i=r.O(void 0,[608],(()=>r(671)));i=r.O(i)})();