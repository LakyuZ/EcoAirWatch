// Fungsi untuk mengonversi timestamp ke format waktu 24 jam di zona waktu Jakarta (WIB)
function formatTimeToWIB1(timestamp) {
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
function updateDataPm25(value, status , timestamp) {
    document.getElementById('valuePm25').textContent = value;
    document.getElementById('statusUdara').textContent = status;
    document.getElementById('timePm25').innerHTML = timestamp.replace('\n', '<span class="separator"></span>');
}

// ...

// fungsi untuk indikator Icon bedasarkan level polusi

function updateStatusIcon() {
    // Ambil data dari REST API menggunakan JavaScript Fetch API
    fetch('https://ecoairwatchapi.000webhostapp.com/partikel1s') // Endpoint REST API
        .then(response => response.json())
        .then(data => {
            // Mendapatkan URL gambar ikon dari data yang diterima dari API
            const statusIconUrl = data[data.length - 1].statusIcon;

            // Mendapatkan elemen img dari HTML
            const statusIconImg = document.getElementById('statusIconImg');

            // Set atribut src img dengan URL gambar ikon dari API
            statusIconImg.src = statusIconUrl;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Panggil fungsi update saat halaman dimuat
setInterval(updateStatusIcon, 4000);



// Fungsi untuk mengambil data dari API PM2.5
async function fetchDataPm2point5() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/partikel1s');
        const data = await response.json();

        if (data.length > 0) {
            // Mengonversi label "created_at" ke format waktu 24 jam
            const latestTime = formatTimestampToWIB(data[data.length - 1].created_at);

            // Mengambil nilai terbaru dari item.kadarPartikel1
            const latestValue = data[data.length - 1].kadarPartikel1;

            // Mengambil nilai terbaru dari item.stausPartikel1
            const latestStatus = data[data.length - 1].statusPartikel1;

            // Memanggil fungsi untuk mengupdate data
            updateDataPm25(latestValue, latestStatus, latestTime);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchDataPm2point5() ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    fetchDataPm2point5();

    // Atur interval untuk mengupdate data setiap beberapa detik (misalnya, setiap 5 detik)
    setInterval(fetchDataPm2point5, 5000);
});


// fungsi popup

function showChartPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "block";

        // Inisialisasi chart di dalam pop-up chart
        const popupCanvas = popup.querySelector("canvas");
        const computedStyle = getComputedStyle(popup);
        const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
        const marginY = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);

        // Set lebar dan tinggi canvas sesuai dengan lebar dan tinggi efektif elemen pop-up
        popupCanvas.width = popup.clientWidth - paddingX - marginX;
        popupCanvas.height = popup.clientHeight - paddingY - marginY;

        const popupCtx = popupCanvas.getContext('2d');
        let popupChart = new Chart(popupCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'PM2.5',
                    data: [],
                    borderWidth: 1,
                    borderColor: 'lightcoral', // Change line color to red
                    pointBackgroundColor: 'lightcoral',
                    backgroundColor: 'lightcoral', // Change fill color to green
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
async function fetchDataPm2point5Popup() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/partikel1s');
        const data = await response.json();

        // Mengambil nilai terbaru dari item.statusPartikel1
        const latestStatus = data.length > 0 ? data[data.length - 1].statusPartikel1 : 0;

        // Menampilkan nilai statusPartikel1 di div 'statusUdara'
        document.getElementById('statusUdara').textContent = latestStatus;

        // Mengonversi label "created_at" ke format waktu 24 jam
        const labels = data.map(item => formatTimestampToWIB(item.created_at));

        // Mengambil nilai terbaru dari item.kadarPartikel1
        const latestValue = data.length > 0 ? data[data.length - 1].kadarPartikel1 : 0;

        // Update data di chart pop-up
        popupChart.data.labels = labels;
        popupChart.data.datasets[0].data = data.map(item => item.kadarPartikel1);

        // Perbarui chart pop-up
        popupChart.update();

        // Update nilai pada elemen <div> dengan id 'valuePm25'
        document.getElementById('valuePm25').textContent = latestValue;

        // Mengambil nilai terbaru dari item.created_at
        const latestTimestamp = data.length > 0 ? data[data.length - 1].created_at : 0;

        // Mengonversi timestamp terbaru ke format waktu 24 jam
        const latestTime = formatTimestampToWIB(latestTimestamp);

        // Update nilai pada elemen <div> dengan id 'timePm25'
        document.getElementById('timePm25').innerHTML = latestTime.replace('\n', '<span class="separator"></span>');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


        // Panggil fetchDataPm2point5Popup untuk pertama kali
        fetchDataPm2point5Popup();

        // Atur interval untuk mengupdate chart pop-up setiap beberapa detik (misalnya, setiap 5 detik)
        setInterval(fetchDataPm2point5Popup, 5000);
    }
}

// Fungsi untuk menutup pop-up chart
function closeChartPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}
