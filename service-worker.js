
const CACHE_NAME = 'shinhan-bank-v1';
const urlsToCache = [
  '/',
  '/public/themes/shinhan/img/logo-01.svg',
  '/public/themes/shinhan/img/loading-icon-2.png',
  '/public/themes/shinhan/img/i_lock.png',
  '/public/themes/shinhan/img/i_search2.png',
  '/public/themes/shinhan/img/i_close_2.png',
  '/public/themes/shinhan/css/stylelibs.min.css',
  '/public/themes/shinhan/scss/style.min.css',
  '/public/article.css',
  '/public/themes/shinhan/js/jsmain.min.js',
  '/public/themes/shinhan/js/main.js',
  '/public/uploads/personal/2025/RLD/2025.01_RLD_Unsecured--Loan_Baneer.jpg',
  '/public/uploads/corporate/Valid-ID-Passport.png',
  '/public/uploads/corporate/family-record-book-KT3-temporary-residence.png',
  '/public/uploads/corporate/Proof-of-income-labor-contract-monthly.png',
  '/public/themes/shinhan/img/shinhan_logo_2.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
