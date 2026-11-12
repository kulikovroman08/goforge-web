const CACHE="goforge-gym-v2-3";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon.svg","./gym/","./gym/index.html","./gym/app.js","./gym/catalog.js","./gym/theory.js","./gym/quiz-bank.js","./gym/golings-links.js"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
event.respondWith(fetch(event.request).then(response=>{if(response.ok){const cp=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,cp))}return response}).catch(()=>caches.match(event.request)))});
