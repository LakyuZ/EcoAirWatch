

// Fungsi untuk mengupdate data pada elemen 
function updateDataSuhu(value, timestamp) {
    document.getElementById('valueSuhu').textContent = value;
    document.getElementById('timeSuhu').innerHTML = timestamp.replace('\n', '<span class="separator"></span>');
}

// ...

// Fungsi untuk mengambil data dari API PM2.5
async function fetchDataSuhu() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/suhus');
        const data = await response.json();

        if (data.length > 0) {
            // Mengonversi label "created_at" ke format waktu 24 jam
            const latestTime = formatTimestampToWIB(data[data.length - 1].created_at);

            // Mengambil nilai terbaru dari item.kadarPartikel1
            const latestValue = data[data.length - 1].temperaturSuhu;

            // Memanggil fungsi untuk mengupdate data
            updateDataSuhu(latestValue, latestTime);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchDataPm2point5() ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchDataSuhu();

    // Atur interval untuk mengupdate data setiap beberapa detik (misalnya, setiap 5 detik)
    setInterval(fetchDataSuhu, 5000);
});

// Fungsi untuk menampilkan pop-up chart
function showChartPopup4(popupId) {
    var popup4 = document.getElementById(popupId);
    if (popup4) {
        popup4.style.display = "block";

        // Inisialisasi chart di dalam pop-up chart
        const popupCanvas4 = popup4.querySelector("canvas");
        const computedStyle = getComputedStyle(popup4);
        const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        const marginY = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);

        // Set lebar dan tinggi canvas sesuai dengan lebar dan tinggi efektif elemen pop-up
        popupCanvas4.width = popup4.clientWidth - paddingX - marginX;
        popupCanvas4.height = popup4.clientHeight - paddingY - marginY;

        const popup4Ctx = popupCanvas4.getContext('2d');
        let popup4Chart = new Chart(popup4Ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Suhu',
                    data: [],
                    borderWidth: 1,
                    borderColor: 'darkcyan', // Change line color to red
                    pointBackgroundColor: 'darkcyan',
                    backgroundColor: 'darkcyan', // Change fill color to green
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
        async function fetchDataSuhu() {
            try {
                const response = await fetch('https://ecoairwatchapi.000webhostapp.com/suhus');
                const data = await response.json();

                // Mengonversi label "created_at" ke format waktu 24 jam
                const labels = data.map(item => formatTimestampToWIB(item.created_at));

                // Mengambil nilai terbaru dari item.kadarPartikel1
                const latestValue = data.length > 0 ? data[data.length - 1].temperaturSuhu : 0;

                // Update data di chart pop-up
                popup4Chart.data.labels = labels;
                popup4Chart.data.datasets[0].data = data.map(item => item.temperaturSuhu);

                // Perbarui chart pop-up
                popup4Chart.update();

                // Update nilai pada elemen <div> dengan id 'valuePm25'
                document.getElementById('valueSuhu').textContent = latestValue;

                // Mengambil nilai terbaru dari item.created_at
                const latestTimestamp = data.length > 0 ? data[data.length - 1].created_at : 0;

                // Mengonversi timestamp terbaru ke format waktu 24 jam
                const latestTime = formatTimestampToWIB(latestTimestamp);

                // Update nilai pada elemen <div> dengan id 'timePm25'
                document.getElementById('timeSuhu').innerHTML = latestTime.replace('\n', '<span class="separator"></span>');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Panggil fetchDataPm2point5Popup untuk pertama kali
        fetchDataSuhu();

        // Atur interval untuk mengupdate chart pop-up setiap beberapa detik (misalnya, setiap 5 detik)
        setInterval(fetchDataSuhu, 5000);
    }
}

// Fungsi untuk menutup pop-up chart
function closeChartPopup4(popupId) {
    var popup4 = document.getElementById(popupId);
    if (popup4) {
        popup4.style.display = "none";
    }
}
