if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const f=e=>a(e,r),c={module:{uri:r},exports:s,require:f};i[r]=Promise.all(n.map((e=>c[e]||f(e)))).then((e=>(d(...e),s)))}}define(["./workbox-3ca83693"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"39.bundle.js",revision:"52a0568b2778e01c6ebdd73b94419f0f"},{url:"608.bundle.js",revision:"7560aaaf15ce20122ac20404a125cfc2"},{url:"app.webmanifest",revision:"e6aec737ea1f3c92884948ee60d585bd"},{url:"app~7bd12dde.bundle.js",revision:"a68612776032002c1b73e6a0b5bd6397"},{url:"app~7bd12dde.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~d0362038.bundle.js",revision:"010b8a41c5bbfca6fae349fa6149e0ef"},{url:"app~d0362038.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~d1658f4b.bundle.js",revision:"c42fd4d287e7b63d8ced08fb62bac650"},{url:"app~d1658f4b.css",revision:"5535706a9ef657c23bf0b5a0a1fdfe54"},{url:"app~e4317507.bundle.js",revision:"968ea4f3bb35f5ef3278a84d916ebdd7"},{url:"app~e4317507.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~f6563343.bundle.js",revision:"948a9e876615fc5ec9c63c21057acb29"},{url:"app~f6563343.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"data/DATA.json",revision:"0760fae8cf2d2b172678847987d1d95c"},{url:"data/favorite-restaurant-idb.js",revision:"09fe6f3e6182491c3874d2110c1ae897"},{url:"favicon.png",revision:"da83efa1efd1a6ae3b32a25d1e8d8b2f"},{url:"icons/icon-128x128.png",revision:"c0bd9ebd87cac07980ad5ea0bc0e3d89"},{url:"icons/icon-144x144.png",revision:"e471fba84dfda5864fa8588cb1967838"},{url:"icons/icon-152x152.png",revision:"e2585c879c82fc9881076df6b4dd559b"},{url:"icons/icon-192x192.png",revision:"8aeb9f50938bc32aebd3d68f7fb8e39b"},{url:"icons/icon-384x384.png",revision:"ad41eb56e7005b369386f4868810ea8a"},{url:"icons/icon-512x512.png",revision:"9a2512b6497e52a30425fb02b40772f7"},{url:"icons/icon-72x72.png",revision:"053862f3c887659830c0d21e6da7661b"},{url:"icons/icon-96x96.png",revision:"19bb760c6af039f1b885b184cfe08bd1"},{url:"images/logo/logo-white.png",revision:"465f9191f101f9bb82eed44d9a183ce6"},{url:"index.html",revision:"79aaaafdea63469aa92fbad7cf4ecbde"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"restaurantapp-api",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/")),new e.StaleWhileRevalidate({cacheName:"restaurantapp-image-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map