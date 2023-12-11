// Fungsi untuk mengonversi timestamp ke format waktu 24 jam di zona waktu Jakarta (WIB)
function formatTimestampToWIB(timestamp) {
    const date = new Date(timestamp);
    const optionsTime = {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    };

    const optionsDate = {
        hour12: false,
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };

    const timeString = date.toLocaleString('id-ID', optionsTime);
    const dateString = date.toLocaleString('id-ID', optionsDate);

    return `${timeString}\n${dateString}`;
}

// Fungsi untuk mengupdate data pada elemen "valuePm25" dan "timePm25"
function updateDataPm10(value, timestamp) {
    document.getElementById('valuePm10').textContent = value;
    document.getElementById('timePm10').innerHTML = timestamp.replace('\n', '<span class="separator"></span>');
}


// ...

/*

// Fungsi untuk mengambil data dari API PM2.5
async function fetchDataPm10() {
    try {
        const response = await fetch('http://192.168.233.146:80/partikel2s');
        const data = await response.json();

        if (data.length > 0) {
            // Mengonversi label "created_at" ke format waktu 24 jam
            const latestTime = formatTimestampToWIB(data[data.length - 1].created_at);

            // Mengambil nilai terbaru dari item.kadarPartikel1
            const latestValue = data[data.length - 1].kadarPartikel2;

            // Memanggil fungsi untuk mengupdate data
            updateDataPm10(latestValue, latestTime);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchDataPm2point5() ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchDataPm10();

    // Atur interval untuk mengupdate data setiap beberapa detik (misalnya, setiap 5 detik)
    setInterval(fetchDataPm10, 5000);
});

// Fungsi untuk menampilkan pop-up chart
function showChartPopup2(popupId) {
    var popup2 = document.getElementById(popupId);
    if (popup2) {
        popup2.style.display = "block";

        // Inisialisasi chart di dalam pop-up chart
        const popupCanvas2 = popup2.querySelector("canvas");
        const computedStyle = getComputedStyle(popup2);
        const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        const marginY = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);

        // Set lebar dan tinggi canvas sesuai dengan lebar dan tinggi efektif elemen pop-up
        popupCanvas2.width = popup2.clientWidth - paddingX - marginX;
        popupCanvas2.height = popup2.clientHeight - paddingY - marginY;

        const popup2Ctx = popupCanvas2.getContext('2d');
        let popup2Chart = new Chart(popup2Ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'PM10',
                    data: [],
                    borderWidth: 1,
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
        async function fetchDataPm10() {
            try {
                const response = await fetch('http://192.168.233.146:80/partikel2s');
                const data = await response.json();

                // Mengonversi label "created_at" ke format waktu 24 jam
                const labels = data.map(item => formatTimestampToWIB(item.created_at));

                // Mengambil nilai terbaru dari item.kadarPartikel1
                const latestValue = data.length > 0 ? data[data.length - 1].kadarPartikel2 : 0;

                // Update data di chart pop-up
                popup2Chart.data.labels = labels;
                popup2Chart.data.datasets[0].data = data.map(item => item.kadarPartikel2);

                // Perbarui chart pop-up
                popup2Chart.update();

                // Update nilai pada elemen <div> dengan id 'valuePm25'
                document.getElementById('valuePm10').textContent = latestValue;

                // Mengambil nilai terbaru dari item.created_at
                const latestTimestamp = data.length > 0 ? data[data.length - 1].created_at : 0;

                // Mengonversi timestamp terbaru ke format waktu 24 jam
                const latestTime = formatTimestampToWIB(latestTimestamp);

                // Update nilai pada elemen <div> dengan id 'timePm25'
                document.getElementById('timePm10').innerHTML = latestTime.replace('\n', '<span class="separator"></span>');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Panggil fetchDataPm2point5Popup untuk pertama kali
        fetchDataPm10();

        // Atur interval untuk mengupdate chart pop-up setiap beberapa detik (misalnya, setiap 5 detik)
        setInterval(fetchDataPm10, 5000);
    }
}

// Fungsi untuk menutup pop-up chart
function closeChartPopup2(popupId) {
    var popup2 = document.getElementById(popupId);
    if (popup2) {
        popup2.style.display = "none";
    }
}

*/