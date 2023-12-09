// Badge notif

function updateNotificationCount() {
    // Membuat permintaan HTTP untuk mengambil data dari REST API
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.233.146:80/push_notifikasis/", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                var jumlahData = 0;

                // Pastikan respons API memiliki struktur yang sesuai
                if (Array.isArray(data)) {
                    jumlahData = data.length;
                } else {
                    console.error("Respon API tidak sesuai dengan format yang diharapkan.");
                }

                console.log(jumlahData); // Tampilkan jumlah data di konsol
                var notifikasiElement = document.getElementById("notifikasi");
                notifikasiElement.innerHTML = `<span class="badge">${jumlahData}</span>`;
                notifikasiElement.classList.add("animate-notification");
            } else {
                console.error("Gagal mengambil data dari REST API.");
            }
        }
    };
    xhr.send();
}

// Panggil updateNotificationCount secara berkala (misalnya, setiap 5 detik)
setInterval(updateNotificationCount, 1000); // Ubah interval sesuai dengan kebutuhan Anda


// Notif Popup Warning

// Variabel untuk menyimpan status popup
let popupVisible = false;

// Fungsi untuk mengambil data dari API
async function fetchData() {
    try {
        const response = await fetch('http://192.168.233.146:80/push_notifikasis');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Gagal mengambil data dari API:', error);
        return null;
    }
}

// Fungsi untuk menampilkan popup jika ada perubahan dalam data
async function periksaDataBaru() {
    const data = await fetchData();
    const previousData = JSON.parse(localStorage.getItem('previousData'));

    if (data && previousData) {
        const isNewData = data.length > previousData.length; // Memeriksa apakah ada data baru
        if (isNewData) {
            // Data baru ditemukan, tampilkan popup
            tampilkanPopup();
        }
    }
    // Simpan data saat ini untuk perbandingan selanjutnya
    localStorage.setItem('previousData', JSON.stringify(data));
}

// Fungsi untuk menampilkan popup
function tampilkanPopup() {
    if (!popupVisible) {
        const popup = document.getElementById('popupNotif');
        popup.style.display = 'block';
        popupVisible = true;
    }
}

// Fungsi untuk menutup popup
function tutupPopup() {
    const popup = document.getElementById('popupNotif');
    popup.style.display = 'none';
    popupVisible = false;
}

// Memanggil fungsi periksaDataBaru saat halaman dimuat
window.onload = () => {
    periksaDataBaru();
    // Set interval untuk memeriksa data baru secara berkala
    setInterval(periksaDataBaru, 1000);
};
