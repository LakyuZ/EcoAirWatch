document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function () {
        scrollToTop(1000); // Durasi scroll dalam milidetik (di sini adalah 1000 milidetik)
    });

    function scrollToTop(scrollDuration) {
        const scrollHeight = window.scrollY,
            scrollStep = Math.PI / (scrollDuration / 25),
            cosParameter = scrollHeight / 2;
        let scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval(function () {
                if (window.scrollY !== 0) {
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                    window.scrollTo(0, (scrollHeight - scrollMargin));
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
    }
});

// Page load

window.addEventListener('load', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
  
    // Menampilkan animasi loading saat halaman dimuat ulang atau pindah ke halaman baru
    loadingOverlay.style.display = 'block';
  
    // Menyembunyikan animasi loading setelah beberapa waktu (di sini: 3 detik)
    setTimeout(function() {
      loadingOverlay.style.display = 'none';
    }, 1000); // Sesuaikan waktu menurut durasi animasi atau sesuai kebutuhan
  });
  
  
  
