/* Network-only account/API requests. Only the static public offline page is cached. */
const CACHE='novinvds-public-offline-v1';
const OFFLINE='/offline.html';
const PUBLIC_ROUTES=new Set(['/','/services','/vps','/dedicated','/hosting','/domain','/addons','/network','/support','/network-store','/network-services','/datacenter','/blog','/knowledge','/faq','/downloads','/about','/contact','/affiliate','/license','/calculator','/vps-plans','/dedicated-plans','/hosting-plans','/vps-custom']);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([OFFLINE,'/brand/app-192.png'])));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('novinvds-public-offline-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 // Do not intercept private routes, APIs, submissions, rates, or third-party requests.
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname==='/brand/app-192.png'){event.respondWith(fetch(event.request).catch(()=>caches.match('/brand/app-192.png')));return;}
 if(event.request.mode!=='navigate'||!PUBLIC_ROUTES.has(url.pathname))return;
 event.respondWith(fetch(event.request).catch(async()=> (await caches.match(OFFLINE))||Response.error()));
});
