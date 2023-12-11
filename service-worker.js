let deferredPrompt;

const CACHE_NAME = "SW-003";
const toCache = [
  "/",
  "manifest.json",
  "assets/js/register.js",
  "assets/css/styles.css",
  "assets/css/navigation.css",
  "assets/images/product.png",
  "assets/images/product-192.png",
  "assets/js/chartPm.js",
  "assets/js/chartCo.js",
  "assets/js/chartSuhu.js",
  "assets/js/chartKelembaban.js",
  "assets/js/notifikasiPopup.js",
  "assets/js/allChart.js",
  "assets/js/informasi.js",
  "assets/js/notifikasi.js",
  "index.html",
  "notifikasi.html",
  "allChart.html",
  "informasi.html",
];

self.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 76 and later from showing the mini-infobar
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  // Tampilkan pesan atau elemen HTML yang menunjukkan tombol untuk mengundang pengguna untuk menginstal aplikasi
  // Misalnya, jika Anda memiliki tombol instalasi dengan ID 'btnInstall', Anda bisa mengatur event listener untuk tombol tersebut di sini
  const installButton = document.getElementById('btnInstall');
  if (installButton) {
    installButton.style.display = 'block'; // Tampilkan tombol instalasi jika tidak terlihat
    installButton.addEventListener('click', () => {
      // Munculkan prompt instalasi
      deferredPrompt.prompt();

      // Tunggu hingga pengguna menanggapi prompt instalasi
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Pengguna menerima instalasi');
          // Pengguna menerima instalasi, lakukan sesuatu di sini jika perlu
        } else {
          console.log('Pengguna menolak instalasi');
          // Pengguna menolak instalasi, lakukan sesuatu di sini jika perlu
        }

        // Reset deferredPrompt agar tidak muncul lagi setelah instalasi
        deferredPrompt = null;
      });
    });
  }
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});