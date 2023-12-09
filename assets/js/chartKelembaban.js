

// Fungsi untuk mengupdate data pada elemen 
function updateDataKelembaban(value, timestamp) {
    document.getElementById('valueKelembaban').textContent = value;
    document.getElementById('timeKelembaban').innerHTML = timestamp.replace('\n', '<span class="separator"></span>');
}

// ...

// Fungsi untuk mengambil data dari API PM2.5
async function fetchDataKelembaban() {
    try {
        const response = await fetch('http://192.168.233.146:80/kelembabans');
        const data = await response.json();

        if (data.length > 0) {
            // Mengonversi label "created_at" ke format waktu 24 jam
            const latestTime = formatTimestampToWIB(data[data.length - 1].created_at);

            // Mengambil nilai terbaru dari item.kadarPartikel1
            const latestValue = data[data.length - 1].temperaturKelembaban;

            // Memanggil fungsi untuk mengupdate data
            updateDataKelembaban(latestValue, latestTime);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchDataPm2point5() ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchDataKelembaban();

    // Atur interval untuk mengupdate data setiap beberapa detik (misalnya, setiap 5 detik)
    setInterval(fetchDataKelembaban, 5000);
});

// Fungsi untuk menampilkan pop-up chart
function showChartPopup5(popupId) {
    var popup5 = document.getElementById(popupId);
    if (popup5) {
        popup5.style.display = "block";

        // Inisialisasi chart di dalam pop-up chart
        const popupCanvas5 = popup5.querySelector("canvas");
        const computedStyle = getComputedStyle(popup5);
        const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        const marginY = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);

        // Set lebar dan tinggi canvas sesuai dengan lebar dan tinggi efektif elemen pop-up
        popupCanvas5.width = popup5.clientWidth - paddingX - marginX;
        popupCanvas5.height = popup5.clientHeight - paddingY - marginY;

        const popup5Ctx = popupCanvas5.getContext('2d');
        let popup5Chart = new Chart(popup5Ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Kelembaban',
                    data: [],
                    borderWidth: 1,
                    borderColor: 'darkorchid', // Change line color to red
                    pointBackgroundColor: 'darkorchid',
                    backgroundColor: 'darkorchid', // Change fill color to green
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Fungsi untuk mengambil data dari API PM2.5 untuk pop-up chart
        async function fetchDataKelembaban() {
            try {
                const response = await fetch('http://192.168.233.146:80/kelembabans');
                const data = await response.json();

                // Mengonversi label "created_at" ke format waktu 24 jam
                const labels = data.map(item => formatTimestampToWIB(item.created_at));

                // Mengambil nilai terbaru dari item.kadarPartikel1
                const latestValue = data.length > 0 ? data[data.length - 1].temperaturKelembaban : 0;

                // Update data di chart pop-up
                popup5Chart.data.labels = labels;
                popup5Chart.data.datasets[0].data = data.map(item => item.temperaturKelembaban);

                // Perbarui chart pop-up
                popup5Chart.update();

                // Update nilai pada elemen <div> dengan id 'valuePm25'
                document.getElementById('valueKelembaban').textContent = latestValue;

                // Mengambil nilai terbaru dari item.created_at
                const latestTimestamp = data.length > 0 ? data[data.length - 1].created_at : 0;

                // Mengonversi timestamp terbaru ke format waktu 24 jam
                const latestTime = formatTimestampToWIB(latestTimestamp);

                // Update nilai pada elemen <div> dengan id 'timePm25'
                document.getElementById('timeKelembaban').innerHTML = latestTime.replace('\n', '<span class="separator"></span>');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Panggil fetchDataPm2point5Popup untuk pertama kali
        fetchDataKelembaban();

        // Atur interval untuk mengupdate chart pop-up setiap beberapa detik (misalnya, setiap 5 detik)
        setInterval(fetchDataKelembaban, 5000);
    }
}

// Fungsi untuk menutup pop-up chart
function closeChartPopup5(popupId) {
    var popup5 = document.getElementById(popupId);
    if (popup5) {
        popup5.style.display = "none";
    }
}
