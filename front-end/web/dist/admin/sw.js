try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class r{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,r=i&&i.handler;if(!r&&this.s&&(r=this.s),r){try{a=r.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function h(e,s,a){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)r=new i(e,s,a);else if("function"==typeof e)r=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return o().registerRoute(r),r}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||l(u.precache),w=e=>e||l(u.runtime);function d(e){e.then(()=>{})}const p=new Set;class y{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.h=e,this.u=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.h,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(a?e:e.value),i&&u.length>=i?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async m(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),r=a[e].apply(a,n);r.onsuccess=()=>i(r.result)})}close(){this.o&&(this.o.close(),this.o=null)}}y.prototype.OPEN_TIMEOUT=2e3;const m={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(m))for(const s of t)s in IDBObjectStore.prototype&&(y.prototype[s]=async function(t,...n){return await this.m(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class q{constructor(e){this.g=e,this.o=new y("workbox-expiration",1,{onupgradeneeded:e=>this.q(e)})}q(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.g,id:this.v(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.v(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let r=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&r>=t?a.push(s.value):r++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}v(e){return this.g+"|"+g(e)}}class v{constructor(e,t={}){this.R=!1,this._=!1,this.k=t.maxEntries,this.U=t.maxAgeSeconds,this.g=e,this.D=new q(e)}async expireEntries(){if(this.R)return void(this._=!0);this.R=!0;const e=this.U?Date.now()-1e3*this.U:0,t=await this.D.expireEntries(e,this.k),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this._&&(this._=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.D.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.U){return await this.D.getTimestamp(e)<Date.now()-1e3*this.U}return!1}async delete(){this._=!1,await this.D.expireEntries(1/0)}}class b{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.N(n),a=this.j(s);d(a.expireEntries());const r=a.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.j(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.L=e,this.U=e.maxAgeSeconds,this.O=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}j(e){if(e===w())throw new t("expire-custom-caches-only");let s=this.O.get(e);return s||(s=new v(e,this.L),this.O.set(e,s)),s}N(e){if(!this.U)return!0;const t=this.T(e);return null===t||t>=Date.now()-1e3*this.U}T(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.O)await self.caches.delete(e),await t.delete();this.O=new Map}}const R=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const n=R(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},k=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),r=await x({plugins:i,request:t,mode:"read"});let c=await a.match(r,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;c=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},U=async({cacheName:e,request:s,response:n,event:i,plugins:r=[],matchOptions:c})=>{const o=await x({plugins:r,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:r,response:n,request:o});if(!h)return;const u=await self.caches.open(e),l=R(r,"cacheDidUpdate"),f=l.length>0?await k({cacheName:e,matchOptions:c,request:o}):null;try{await u.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:f,newResponse:h,request:o})},D=k,E=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=R(i,"fetchDidFail"),r=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class j{constructor(e={}){if(this.g=w(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.M=t?e.plugins:[N,...e.plugins]}else this.M=[N];this.G=e.networkTimeoutSeconds||0,this.P=e.fetchOptions,this.S=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.G){const{id:t,promise:r}=this.K({request:s,event:e,logs:n});a=t,i.push(r)}const r=this.C({timeoutId:a,request:s,event:e,logs:n});i.push(r);let c=await Promise.race(i);if(c||(c=await r),!c)throw new t("no-response",{url:s.url});return c}K({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.A({request:e,event:s}))},1e3*this.G)}),id:n}}async C({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await E({request:t,event:n,fetchOptions:this.P,plugins:this.M})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.A({request:t,event:n});else{const e=a.clone(),s=U({cacheName:this.g,request:t,response:e,event:n,plugins:this.M});if(n)try{n.waitUntil(s)}catch(e){}}return a}A({event:e,request:t}){return D({cacheName:this.g,request:t,event:e,matchOptions:this.S,plugins:this.M})}}try{self["workbox:background-sync:5.1.3"]&&_()}catch(e){}class L{constructor(e){this.I=e,this.o=new y("workbox-background-sync",3,{onupgradeneeded:this.F})}async pushEntry(e){delete e.id,e.queueName=this.I,await this.o.add("requests",e)}async unshiftEntry(e){const[t]=await this.o.getAllMatching("requests",{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this.I,await this.o.add("requests",e)}async popEntry(){return this.B({direction:"prev"})}async shiftEntry(){return this.B({direction:"next"})}async getAll(){return await this.o.getAllMatching("requests",{index:"queueName",query:IDBKeyRange.only(this.I)})}async deleteEntry(e){await this.o.delete("requests",e)}async B({direction:e}){const[t]=await this.o.getAllMatching("requests",{direction:e,index:"queueName",query:IDBKeyRange.only(this.I),count:1});if(t)return await this.deleteEntry(t.id),t}F(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains("requests")&&t.deleteObjectStore("requests"),t.createObjectStore("requests",{autoIncrement:!0,keyPath:"id"}).createIndex("queueName","queueName",{unique:!1})}}const O=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class T{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this.X=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of O)void 0!==e[s]&&(t[s]=e[s]);return new T(t)}toObject(){const e=Object.assign({},this.X);return e.headers=Object.assign({},this.X.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this.X.url,this.X)}clone(){return new T(this.toObject())}}const M=new Set,G=e=>{const t={request:new T(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class P{constructor(e,{onSync:s,maxRetentionTime:n}={}){if(this.H=!1,this.W=!1,M.has(e))throw new t("duplicate-queue-name",{name:e});M.add(e),this.h=e,this.$=s||this.replayRequests,this.J=n||10080,this.V=new L(this.h),this.Y()}get name(){return this.h}async pushRequest(e){await this.Z(e,"push")}async unshiftRequest(e){await this.Z(e,"unshift")}async popRequest(){return this.ee("pop")}async shiftRequest(){return this.ee("shift")}async getAll(){const e=await this.V.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this.J*1e3;t-n.timestamp>e?await this.V.deleteEntry(n.id):s.push(G(n))}return s}async Z({request:e,metadata:t,timestamp:s=Date.now()},n){const i={requestData:(await T.fromRequest(e.clone())).toObject(),timestamp:s};t&&(i.metadata=t),await this.V[n+"Entry"](i),this.H?this.W=!0:await this.registerSync()}async ee(e){const t=Date.now(),s=await this.V[e+"Entry"]();if(s){const n=60*this.J*1e3;return t-s.timestamp>n?this.ee(e):G(s)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(s){throw await this.unshiftRequest(e),new t("queue-replay-failed",{name:this.h})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register("workbox-background-sync:"+this.h)}catch(e){}}Y(){"sync"in self.registration?self.addEventListener("sync",e=>{if(e.tag==="workbox-background-sync:"+this.h){const t=async()=>{let t;this.H=!0;try{await this.$({queue:this})}catch(e){throw t=e,t}finally{!this.W||t&&!e.lastChance||await this.registerSync(),this.H=!1,this.W=!1}};e.waitUntil(t())}}):this.$({queue:this})}static get te(){return M}}class S{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this.se.pushRequest({request:e})},this.se=new P(e,t)}}try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}class K{constructor(e={}){this.ne=e.statuses,this.ie=e.headers}isResponseCacheable(e){let t=!0;return this.ne&&(t=this.ne.includes(e.status)),this.ie&&t&&(t=Object.keys(this.ie).some(t=>e.headers.get(t)===this.ie[t])),t}}class C{constructor(e){this.cacheWillUpdate=async({response:e})=>this.ae.isResponseCacheable(e)?e:null,this.ae=new K(e)}}function A(e){return new Promise(t=>setTimeout(t,e))}try{self["workbox:broadcast-update:5.1.3"]&&_()}catch(e){}const I=["content-length","etag","last-modified"],F=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);function z(e){return{cacheName:e.cacheName,updatedURL:e.request.url}}class B{constructor({headersToCheck:e,generatePayload:t}={}){this.re=e||I,this.ce=t||z}async notifyIfUpdated(e){var t,s,n;if(e.oldResponse&&(t=e.oldResponse,s=e.newResponse,(n=this.re).some(e=>t.headers.has(e)&&s.headers.has(e))&&!n.every(e=>{const n=t.headers.has(e)===s.headers.has(e),i=t.headers.get(e)===s.headers.get(e);return n&&i}))){const t={type:"CACHE_UPDATED",meta:"workbox-broadcast-update",payload:this.ce(e)};if("navigate"===e.request.mode){let t;e.event instanceof FetchEvent&&(t=e.event.resultingClientId),await async function(e){if(!e)return;let t=await self.clients.matchAll({type:"window"});const s=new Set(t.map(e=>e.id));let n;const i=performance.now();for(;performance.now()-i<2e3&&(t=await self.clients.matchAll({type:"window"}),n=t.find(t=>e?t.id===e:!s.has(t.id)),!n);)await A(100);return n}(t)&&!F||await A(3500)}const s=await self.clients.matchAll({type:"window"});for(const e of s)e.postMessage(t)}}}class X{constructor(e){this.cacheDidUpdate=async e=>{d(this.oe.notifyIfUpdated(e))},this.oe=new B(e)}}let H;async function W(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===H){const e=new Response("");if("body"in e)try{new Response(e.body),H=!0}catch(e){H=!1}H=!1}return H}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function Q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class ${constructor(e){this.g=f(e),this.he=new Map,this.ue=new Map,this.le=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=Q(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.he.has(i)&&this.he.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.he.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.le.has(e)&&this.le.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.le.set(e,n.integrity)}if(this.he.set(i,e),this.ue.set(i,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.g),a=await i.keys(),r=new Set(a.map(e=>e.url));for(const[e,t]of this.he)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const i=this.le.get(s),a=this.ue.get(n);return this.fe({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this.he.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async fe({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,h=await E({event:i,plugins:a,request:c});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:c,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await W(h)),await U({event:i,plugins:a,response:h,request:e===s?c:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.he}getCachedURLs(){return[...this.he.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.he.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let J;const V=()=>(J||(J=new $),J);const Y=(e,t)=>{const s=V().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let Z=!1;function ee(e){Z||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",a=>{const r=Y(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(i).then(e=>e.match(r)).then(e=>e||fetch(r));a.respondWith(c)})})(e),Z=!0)}const te=[],se={get:()=>te,add(e){te.push(...e)}},ne=e=>{const t=V(),s=se.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},ie=e=>{const t=V();e.waitUntil(t.activate())};var ae;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),ae={},function(e){V().addToCacheList(e),e.length>0&&(self.addEventListener("install",ne),self.addEventListener("activate",ie))}([{url:"_next/static/UDMwiukG1gDwjzpkca-GX/_buildManifest.js",revision:"c4f26e198bacaf75df703f66061d123e"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/_app.js",revision:"1c3036d562457e3e19e140912b0f5dc1"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/_error.js",revision:"242fe9e179d07e560ae0a707b72ddb14"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/admin.js",revision:"204675c51bbf6ad883197407e9910034"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/admin/face.js",revision:"5d73658b65707ddc58dfc78973f98839"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/admin/login.js",revision:"484a223790a22572e75005658bfedfef"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/admin/order.js",revision:"ea2145254732db2dee62ce9442cf7aad"},{url:"_next/static/UDMwiukG1gDwjzpkca-GX/pages/admin/user.js",revision:"685b449785ca72c7c0b9768de754e279"},{url:"_next/static/chunks/1cae221f.9f2c2ba0840e1422c591.js",revision:"39d0a732d7b85589b3be51141fc1f644"},{url:"_next/static/chunks/520f4141ad442c2681d55b3debf31a418923be8b.031c0e670b1b6945aa67.js",revision:"c7ad8a723da1781273f96bbed7803485"},{url:"_next/static/chunks/66a4cec5a6460bb3251a60934215486190ab22f8.74403ee9778ba34ed9ec.js",revision:"bd33ee31449c320044aaefaa7549ddf3"},{url:"_next/static/chunks/7b22421a5431b6c540f652fab719c5c44f99a231.a92d61cd9c3680016f5f.js",revision:"d5aca1956a8b2b0ac3ca15e63fc2681f"},{url:"_next/static/chunks/c2a3fe299d45445afe7ab0778164785ca583be21.1d4954ba6492de5a4ac8.js",revision:"76bae0838953d35332269c46a725f374"},{url:"_next/static/chunks/f99c8aa2f7307205555cc1abea01c108aa874334.d92550c4648ee74104c9.js",revision:"2400e02652107ecf79cb55367e708cbc"},{url:"_next/static/chunks/framework.4dd1003cc9c949c7fcd3.js",revision:"8dbfd54516c12914d3e0cd417cd67882"},{url:"_next/static/runtime/main-7e9b5ffaed5ca7bd5d33.js",revision:"16670c1a8eb321c5a2190222211b43c5"},{url:"_next/static/runtime/polyfills-75a3e900f517af39100f.js",revision:"69660e8abc12eddc98c54afddf701939"},{url:"_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}]),ee(ae),h(/^https?.*/,new j({cacheName:"offlineCache",plugins:[new b({maxEntries:200,purgeOnQuotaError:!0})]}),"GET"),h(/\.(?:js|css)$/,new class{constructor(e={}){if(this.g=w(e.cacheName),this.M=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.M=t?e.plugins:[N,...e.plugins]}else this.M=[N];this.P=e.fetchOptions,this.S=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this.we({request:s,event:e});let i,a=await D({cacheName:this.g,request:s,event:e,matchOptions:this.S,plugins:this.M});if(a){if(e)try{e.waitUntil(n)}catch(i){}}else try{a=await n}catch(e){i=e}if(!a)throw new t("no-response",{url:s.url,error:i});return a}async we({request:e,event:t}){const s=await E({request:e,event:t,fetchOptions:this.P,plugins:this.M}),n=U({cacheName:this.g,request:e,response:s.clone(),event:t,plugins:this.M});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"fay-resource-cache",fetchOptions:{mode:"no-cors"},matchOptions:{ignoreSearch:!0},plugins:[new b({maxEntries:500,maxAgeSeconds:604800,purgeOnQuotaError:!0}),new S("fay-resource-queue",{maxRetentionTime:3600}),new C({statuses:[0,200],headers:{"x-test":"true"}}),new X({channelName:"fay-resource-update"})]}),"GET"),h(/api/,new j({cacheName:"fay-api-cache",networkTimeoutSeconds:10,fetchOptions:{mode:"no-cors"},matchOptions:{ignoreSearch:!0},plugins:[new b({maxEntries:5,maxAgeSeconds:60,purgeOnQuotaError:!0}),new S("fay-api-queue",{maxRetentionTime:3600}),new C({statuses:[0,200],headers:{"x-test":"true"}}),new X({channelName:"fay-api-update"})]}),"GET"),h(/.png$/,new class{constructor(e={}){this.g=w(e.cacheName),this.M=e.plugins||[],this.P=e.fetchOptions,this.S=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,i=await D({cacheName:this.g,request:s,event:e,matchOptions:this.S,plugins:this.M});if(!i)try{i=await this.we(s,e)}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async we(e,t){const s=await E({request:e,event:t,fetchOptions:this.P,plugins:this.M}),n=s.clone(),i=U({cacheName:this.g,request:e,response:n,event:t,plugins:this.M});if(t)try{t.waitUntil(i)}catch(e){}return s}},"GET"),h(/.html$/,new j({plugins:[new C({statuses:[0,200]})]}),"GET");
