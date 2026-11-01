'use strict';
const BASE=new URL('./',self.location.href).pathname,PREFIX='grom-phone-'+BASE+'-',CACHE=PREFIX+'v5',FILES=['','style.css','mobile-sync.js','config.js','mobile-ui.js','manifest.webmanifest','icon.svg'].map(p=>BASE+p);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(BASE))return;event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match(event.request).then(found=>found||(event.request.mode==='navigate'?cache.match(BASE):Response.error())))));});
