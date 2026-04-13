const CACHE_NAME = 'tor-calc-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Install the service worker and cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
function addRow(type) {
  const id = Date.now();
  const nowStr = getNow();
  let html = '';
  
  if(type === 'outs') {
    data.outs.push({ id, time: new Date(nowStr), qty: 0 });
    html = `<div class="input-row" data-id="${id}"><input type="datetime-local" value="${nowStr}" onchange="update('outs',${id},'time',this.value)"><input type="number" placeholder="Qty" onchange="update('outs',${id},'qty',this.value)"><button class="remove-btn" onclick="remove('outs',${id})">✕</button></div>`;
  } else if(type === 'packs') {
    data.packs.push({ id, time: new Date(nowStr), qty: 0, config: '' });
    html = `<div class="input-row" data-id="${id}"><input type="datetime-local" value="${nowStr}" onchange="update('packs',${id},'time',this.value)"><input type="number" placeholder="Qty" onchange="update('packs',${id},'qty',this.value)"><input type="text" placeholder="Config" onchange="update('packs',${id},'config',this.value)"><button class="remove-btn" onclick="remove('packs',${id})">✕</button></div>`;
  } else if(type === 'leftovers') {
    data.leftovers.push({ id, time: new Date(nowStr), qty: 0 });
    // Use the singular "leftover-container" here
    html = `<div class="input-row" data-id="${id}"><input type="datetime-local" value="${nowStr}" onchange="update('leftovers',${id},'time',this.value)"><input type="number" placeholder="Qty" onchange="update('leftovers',${id},'qty',this.value)"><button class="remove-btn" onclick="remove('leftovers',${id})">✕</button></div>`;
    document.getElementById('leftover-container').insertAdjacentHTML('beforeend', html);
    return; // Exit early since we handled the insertion here
  }
  
  // This handles outs and packs
  document.getElementById(`${type}-container`).insertAdjacentHTML('beforeend', html);
}

