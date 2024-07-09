(()=>{"use strict";var e,t={187:()=>{const e=window.wp.blocks,t=JSON.parse('{"UU":"mxsfwn/full-width-section-image"}'),a=window.React,l=window.wp.i18n,i=window.wp.blockEditor,n=window.wp.components,r=window.wp.data,o=window.wp.element;(0,e.registerBlockType)(t.UU,{edit:function({attributes:e,setAttributes:t}){const m=(0,i.useBlockProps)(),[d,c]=(0,o.useState)(!1),s=["image"],g=(0,r.useSelect)((t=>!!e.mediaBGId&&t("core").getEntityRecord("postType","attachment",e.mediaBGId)),[e]);(0,o.useEffect)((()=>{g?.media_details&&t({mediaBGUrl:g.media_details.sizes.full.source_url})}),[g]);const u=(0,r.useSelect)((t=>!!e.sideImageId&&t("core").getEntityRecord("postType","attachment",e.sideImageId)),[e]);return(0,o.useEffect)((()=>{u?.media_details&&t({sideImageUrl:u.media_details.sizes.full.source_url})}),[u]),[(0,a.createElement)(i.InspectorControls,{key:"mx-settings"},(0,a.createElement)(n.PanelBody,{title:(0,l.__)("Side Image","heebos"),initialOpen:!0},(0,a.createElement)(n.PanelRow,null,(0,a.createElement)(i.MediaUploadCheck,null,(0,a.createElement)("div",{className:"mx-media-button-wrapper"},e?.sideImageUrl?(0,a.createElement)("div",{className:"mxsfwn-cover-image-wrapper"},(0,a.createElement)("img",{src:e.sideImageUrl}),(0,a.createElement)(n.Button,{icon:"trash",text:(0,l.__)("Remove","heebos"),isDestructive:!0,onClick:()=>{t({sideImageUrl:null,sideImageId:null})}})):(0,a.createElement)(a.Fragment,null),(0,a.createElement)(i.MediaUpload,{onSelect:e=>t({sideImageId:e.id}),allowedTypes:s,value:e.sideImageId,render:({open:t})=>(0,a.createElement)(n.Button,{icon:"upload",text:e.sideImageId?"Change Background Image":"Upload Background Image",variant:"secondary",onClick:t})})))),(0,a.createElement)(n.PanelRow,null,(0,a.createElement)(n.CheckboxControl,{label:"Image to right",help:"Image to right?",checked:"1"===e.imageToRight,onChange:e=>t({imageToRight:e?"1":"0"})}))),(0,a.createElement)(n.PanelBody,{title:(0,l.__)("Background Image","heebos"),initialOpen:!1},(0,a.createElement)(n.PanelRow,null,(0,a.createElement)(i.MediaUploadCheck,null,(0,a.createElement)("div",{className:"mx-media-button-wrapper"},e?.mediaBGUrl?(0,a.createElement)("div",{className:"mxsfwn-cover-image-wrapper"},(0,a.createElement)("img",{src:e.mediaBGUrl}),(0,a.createElement)(n.Button,{icon:"trash",text:(0,l.__)("Remove","heebos"),isDestructive:!0,onClick:()=>{t({mediaBGUrl:null,mediaBGId:null})}})):(0,a.createElement)(a.Fragment,null),(0,a.createElement)(i.MediaUpload,{onSelect:e=>t({mediaBGId:e.id}),allowedTypes:s,value:e.mediaBGId,render:({open:t})=>(0,a.createElement)(n.Button,{icon:"upload",text:e.mediaBGId?"Change Background Image":"Upload Background Image",variant:"secondary",onClick:t})})))))),(0,a.createElement)("div",{key:"mx-main-content",...m,style:(()=>{let t={};return e?.style&&(t.backgroundColor=e.style.color?.background,t.color=e.style.color?.text),e?.mediaBGUrl&&(t.backgroundImage='url("'+e.mediaBGUrl+'")'),t})(),"data-image-id":e.mediaBGId,"data-image-url":e.mediaBGUrl,"data-image-to-right":e.imageToRight},(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--image-wrapper"},(0,a.createElement)("img",{src:e.sideImageUrl,"data-side-image-id":e.sideImageId,alt:"",className:"mx-side-img"})),(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--content-wrapper"},(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--text"},(0,a.createElement)(i.InnerBlocks,null))))]},save:function({attributes:e}){const t=i.useBlockProps.save();return(0,a.createElement)("div",{...t,style:(()=>{let t={};return e?.style&&(t.backgroundColor=e.style.color?.background,t.color=e.style.color?.text),e?.mediaBGUrl&&(t.backgroundImage='url("'+e.mediaBGUrl+'")'),t})(),"data-image-id":e.mediaBGId,"data-image-url":e.mediaBGUrl,"data-image-to-right":e.imageToRight},(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--image-wrapper"},(0,a.createElement)("img",{src:e.sideImageUrl,"data-side-image-id":e.sideImageId,alt:"",className:"mx-side-img"})),(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--content-wrapper"},(0,a.createElement)("div",{className:"wp-block-mxsfwn-full-width-section-image--text"},(0,a.createElement)(i.InnerBlocks.Content,null))))}})}},a={};function l(e){var i=a[e];if(void 0!==i)return i.exports;var n=a[e]={exports:{}};return t[e](n,n.exports,l),n.exports}l.m=t,e=[],l.O=(t,a,i,n)=>{if(!a){var r=1/0;for(c=0;c<e.length;c++){for(var[a,i,n]=e[c],o=!0,m=0;m<a.length;m++)(!1&n||r>=n)&&Object.keys(l.O).every((e=>l.O[e](a[m])))?a.splice(m--,1):(o=!1,n<r&&(r=n));if(o){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[a,i,n]},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={0:0,48:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var i,n,[r,o,m]=a,d=0;if(r.some((t=>0!==e[t]))){for(i in o)l.o(o,i)&&(l.m[i]=o[i]);if(m)var c=m(l)}for(t&&t(a);d<r.length;d++)n=r[d],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(c)},a=globalThis.webpackChunkmxsfwn_npm_handler=globalThis.webpackChunkmxsfwn_npm_handler||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var i=l.O(void 0,[48],(()=>l(187)));i=l.O(i)})();