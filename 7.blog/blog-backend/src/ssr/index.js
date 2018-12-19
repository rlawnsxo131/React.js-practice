//require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../blog-frontend/build/asset-manifest.json');

function buildHTML(rendered) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <link rel="shortcut icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="/manifest.json">
  <title>React App</title>
  <link href="/${manifest['main.css']}" rel="stylesheet">
  </head>
  
  <body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${rendered}</div>
  <script>!function(i){function e(e){for(var t,r,n=e[0],o=e[1],a=e[2],u=0,c=[];u<n.length;u++)r=n[u],s[r]&&c.push(s[r][0]),s[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i[t]=o[t]);for(p&&p(e);c.length;)c.shift()();return l.push.apply(l,a||[]),f()}function f(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,o=1;o<r.length;o++){var a=r[o];0!==s[a]&&(n=!1)}n&&(l.splice(t--,1),e=d(d.s=r[0]))}return e}var r={},c={9:0},s={9:0},l=[];function d(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,d),t.l=!0,t.exports}d.e=function(l){var e=[];c[l]?e.push(c[l]):0!==c[l]&&{1:1,3:1,4:1,5:1,8:1}[l]&&e.push(c[l]=new Promise(function(e,n){for(var t="static/css/"+({}[l]||l)+"."+{0:"31d6cfe0",1:"cc3e9881",3:"a517c90a",4:"88ff9c0d",5:"c3f60224",6:"31d6cfe0",8:"a59700e5"}[l]+".chunk.css",o=d.p+t,r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var u=(i=r[a]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(u===t||u===o))return e()}var c=document.getElementsByTagName("style");for(a=0;a<c.length;a++){var i;if((u=(i=c[a]).getAttribute("data-href"))===t||u===o)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var t=e&&e.target&&e.target.src||o,r=new Error("Loading CSS chunk "+l+" failed.\n("+t+")");r.request=t,n(r)},f.href=o,document.getElementsByTagName("head")[0].appendChild(f)}).then(function(){c[l]=0}));var r=s[l];if(0!==r)if(r)e.push(r[2]);else{var t=new Promise(function(e,t){r=s[l]=[e,t]});e.push(r[2]=t);var n,o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.charset="utf-8",a.timeout=120,d.nc&&a.setAttribute("nonce",d.nc),a.src=d.p+"static/js/"+({}[l]||l)+"."+{0:"23fdb48f",1:"90facf9f",3:"567a3a2d",4:"c7f699fd",5:"9782ccf5",6:"854a493e",8:"e18eb67b"}[l]+".chunk.js",n=function(e){a.onerror=a.onload=null,clearTimeout(u);var t=s[l];if(0!==t){if(t){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src,o=new Error("Loading chunk "+l+" failed.\n("+r+": "+n+")");o.type=r,o.request=n,t[1](o)}s[l]=void 0}};var u=setTimeout(function(){n({type:"timeout",target:a})},12e4);a.onerror=a.onload=n,o.appendChild(a)}return Promise.all(e)},d.m=i,d.c=r,d.d=function(e,t,r){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},d.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(t,e){if(1&e&&(t=d(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(d.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)d.d(r,n,function(e){return t[e]}.bind(null,n));return r},d.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/",d.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var p=n;f()}([])</script>
  <script src="/static/js/7.d6ec61aa.chunk.js"></script>
  <script src="/static/js/main.a7fe8aea.chunk.js"></script>
  </body>
  
  </html>`;
}

module.exports = async (ctx) => {
  const rendered = render(ctx);
  ctx.body = buildHTML(rendered);
};
