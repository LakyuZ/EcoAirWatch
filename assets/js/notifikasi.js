 // Fungsi untuk menampilkan SweetAlert 2 saat ikon sampah di klik
 function confirmDelete(id) {
    Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Anda yakin ingin menghapus data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
    }).then((result) => {
        if (result.isConfirmed) {
            // Jika pengguna menekan "Ya, Hapus," maka panggil fungsi deleteData
            deleteData(id);
        }
    });
}

// Deklarasi Toast di luar fungsi deleteData
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


// Fungsi untuk menampilkan data tabel

function fetchDataAndPopulateTable() {
    var table = document.querySelector("table");

    // Mengambil data dari endpoint
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ecoairwatchapi.000webhostapp.com/push_notifikasis", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // Bersihkan isi tabel sebelum mengisi ulang
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Mengisi tabel dengan data
            data.forEach(function (entry) {
                var row = table.insertRow(-1);
                row.setAttribute('data-id', entry.id); // Simpan ID di atribut data-id

                var pm25Cell = row.insertCell(0);
                pm25Cell.textContent = entry.kadarPartikel;

                var levelPolusiCell = row.insertCell(1);
                levelPolusiCell.textContent = entry.statusPartikel;

                var waktuCell = row.insertCell(2);
                var date = new Date(entry.created_at);
                // Konversi ke zona waktu Asia/Jakarta
                var optionsTime = { timeZone: 'Asia/Jakarta', 
                                hour12: false, 
                                hour: 'numeric', 
                                minute: 'numeric'   };
                var optionsDate = { timeZone: 'Asia/Jakarta', 
                                hour12: false, 
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric'     };

                const formattedTime = new Intl.DateTimeFormat('id-ID', optionsTime).format(date); // Format jam sesuai opsi yang diatur
                const formattedDate = new Intl.DateTimeFormat('id-ID', optionsDate).format(date); // Format tanggal sesuai opsi yang diatur
                waktuCell.textContent = `${formattedTime}, ${formattedDate} `;

                var deleteCell = row.insertCell(3);
                var deleteIcon = document.createElement("img");
                deleteIcon.src = "https://img.icons8.com/plasticine/100/filled-trash.png";
                deleteIcon.width = 40;
                deleteIcon.height = 40;
                deleteIcon.alt = "Trash";
                deleteIcon.style.cursor = "pointer"; // Menambahkan efek cursor pointer
                deleteIcon.addEventListener("click", function () {
                    confirmDelete(entry.id);
                });
                deleteCell.appendChild(deleteIcon);
            });
        } else {
            console.error("Gagal mengambil data.");
        }
    };

    xhr.send();
}

// Perbarui data setiap beberapa detik (misalnya, setiap 2 detik)
setInterval(fetchDataAndPopulateTable, 1000);


// Fungsi untuk menghapus data dengan ID tertentu

function deleteData(id) {
    // Mengirim permintaan DELETE ke endpoint 192.168.0.146:80/partikel2s/delete/{id}
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://ecoairwatchapi.000webhostapp.com/push_notifikasis/delete/${id}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Hapus baris dari tabel
            var row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) {
                // Tampilkan notifikasi "Berhasil Dihapus" dengan animasi
                Toast.fire({
                    icon: 'success',
                    title: 'Berhasil Dihapus',
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    },
                });
            }
        } else {
            console.error("Gagal menghapus data.");
        }
    };

    xhr.send();
}


// Panggil fungsi untuk mengisi tabel dengan data saat halaman dimuat
// Simpan ID di atribut data-id untuk masing-masing baris
fetchDataAndPopulateTable();
