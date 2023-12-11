

// Fungsi untuk mengupdate data pada elemen 
function updateDataCo(value, timestamp) {
    document.getElementById('valueCo').textContent = value;
    document.getElementById('timeCo').innerHTML = timestamp.replace('\n', '<span class="separator"></span>');
}

// ...


// Fungsi untuk mengambil data dari API PM2.5
async function fetchDataCo() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/karbon_monoksidas');
        const data = await response.json();

        if (data.length > 0) {
            // Mengonversi label "created_at" ke format waktu 24 jam
            const latestTime = formatTimestampToWIB(data[data.length - 1].created_at);

            // Mengambil nilai terbaru dari item.kadarPartikel1
            const latestValue = data[data.length - 1].kadarCo;

            // Memanggil fungsi untuk mengupdate data
            updateDataCo(latestValue, latestTime);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchDataPm2point5() ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchDataCo();

    // Atur interval untuk mengupdate data setiap beberapa detik (misalnya, setiap 5 detik)
    setInterval(fetchDataCo, 5000);
});

// Fungsi untuk menampilkan pop-up chart
function showChartPopup3(popupId) {
    var popup3 = document.getElementById(popupId);
    if (popup3) {
        popup3.style.display = "block";

        // Inisialisasi chart di dalam pop-up chart
        const popupCanvas3 = popup3.querySelector("canvas");
        const computedStyle = getComputedStyle(popup3);
        const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        const marginY = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);

        // Set lebar dan tinggi canvas sesuai dengan lebar dan tinggi efektif elemen pop-up
        popupCanvas3.width = popup3.clientWidth - paddingX - marginX;
        popupCanvas3.height = popup3.clientHeight - paddingY - marginY;

        const popup3Ctx = popupCanvas3.getContext('2d');
        let popup3Chart = new Chart(popup3Ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'CO',
                    data: [],
                    borderWidth: 1,
                    borderColor: 'blue', // Change line color to red
                    pointBackgroundColor: 'blue',
                    backgroundColor: 'blue', // Change fill color to green
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
        async function fetchDataCo() {
            try {
                const response = await fetch('https://ecoairwatchapi.000webhostapp.com/karbon_monoksidas');
                const data = await response.json();

                // Mengonversi label "created_at" ke format waktu 24 jam
                const labels = data.map(item => formatTimestampToWIB(item.created_at));

                // Mengambil nilai terbaru dari item.kadarPartikel1
                const latestValue = data.length > 0 ? data[data.length - 1].kadarCo : 0;

                // Update data di chart pop-up
                popup3Chart.data.labels = labels;
                popup3Chart.data.datasets[0].data = data.map(item => item.kadarCo);

                // Perbarui chart pop-up
                popup3Chart.update();

                // Update nilai pada elemen <div> dengan id 'valuePm25'
                document.getElementById('valueCo').textContent = latestValue;

                // Mengambil nilai terbaru dari item.created_at
                const latestTimestamp = data.length > 0 ? data[data.length - 1].created_at : 0;

                // Mengonversi timestamp terbaru ke format waktu 24 jam
                const latestTime = formatTimestampToWIB(latestTimestamp);

                // Update nilai pada elemen <div> dengan id 'timePm25'
                document.getElementById('timeCo').innerHTML = latestTime.replace('\n', '<span class="separator"></span>');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Panggil fetchDataPm2point5Popup untuk pertama kali
        fetchDataCo();

        // Atur interval untuk mengupdate chart pop-up setiap beberapa detik (misalnya, setiap 5 detik)
        setInterval(fetchDataCo, 5000);
    }
}

// Fungsi untuk menutup pop-up chart
function closeChartPopup3(popupId) {
    var popup3 = document.getElementById(popupId);
    if (popup3) {
        popup3.style.display = "none";
    }
}
