// Offline support: always try the network first (so updates show right away), fall back to the saved copy when offline.
const CACHE='htq-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./play/','./guide.html','./privacy.html','./icon.svg','./manifest.webmanifest']).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if((u.hostname.endsWith('googleapis.com')&&!u.hostname.startsWith('fonts'))||/firebaseio\.com$|firebaseapp\.com$/.test(u.hostname))return;
 e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp)).catch(()=>{});}return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match(u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname))));});
