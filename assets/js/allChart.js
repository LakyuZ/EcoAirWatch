// Fungsi untuk mengubah waktu ke format yang diinginkan (misalnya, WIB)
function formatTimeToWIB(timestamp) {
    const date = new Date(timestamp); // Membuat objek Date dari timestamp
    const optionsTime = {
        timeZone: 'Asia/Jakarta', // Mengatur zona waktu ke Waktu Indonesia Barat (WIB)
        hour12: false, // Format waktu dalam format 24 jam
        hour: 'numeric',
        minute: 'numeric'
       
    };

    const optionsDate = {
        timeZone: 'Asia/Jakarta', // Mengatur zona waktu ke Waktu Indonesia Barat (WIB)
        hour12: false, // Format waktu dalam format 24 jam
        day: 'numeric',
        month: 'numeric'
      
    };
    
    const formattedTime = new Intl.DateTimeFormat('id-ID', optionsTime).format(date); // Format jam sesuai opsi yang diatur
    const formattedDate = new Intl.DateTimeFormat('id-ID', optionsDate).format(date); // Format tanggal sesuai opsi yang diatur

    // Menggabungkan tanggal dan jam ke dalam satu string
    return `${formattedTime}, ${formattedDate} `;
}

// Chart PM2.5

// Inisialisasi chart dengan data awal yang kosong
const ctxPm = document.getElementById('pmChart').getContext('2d');
let myChart = new Chart(ctxPm, {
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


// Fungsi untuk mengambil data dari API PM10
async function fetchDataPm2point5() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/partikel1s');
        const data = await response.json();

        // Mengonversi label "created_at" ke format waktu 24 jam
        const labels = data.map(item => formatTimeToWIB(item.created_at));

        // Update data di chart
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = data.map(item => item.kadarPartikel1);

        // Perbarui chart
        myChart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchData untuk pertama kali
fetchDataPm2point5();

// Atur interval untuk mengupdate chart setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(fetchDataPm2point5, 6000);



// Chart Karbon Monoksida

// Inisialisasi chart dengan data awal yang kosong
const coCtx = document.getElementById('coChart').getContext('2d'); // Rename ctx to coCtx
let coChart = new Chart(coCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Karbon Monoksida',
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



// Fungsi untuk mengambil data dari API PM10
async function fetchDataCo() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/karbon_monoksidas');
        const data = await response.json();

        // Mengonversi label "created_at" ke format waktu 24 jam
        const labels = data.map(item => formatTimeToWIB(item.created_at)); // Use the renamed function

        // Update data di chart
        coChart.data.labels = labels;
        coChart.data.datasets[0].data = data.map(item => item.kadarCo);

        // Perbarui chart
        coChart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchData2 untuk pertama kali
fetchDataCo();

// Atur interval untuk mengupdate chart setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(fetchDataCo, 6000);



// Chart Suhu

// Inisialisasi chart dengan data awal yang kosong
const suhuCtx = document.getElementById('suhuChart').getContext('2d'); // Rename ctx to coCtx
let suhuChart = new Chart(suhuCtx, {
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



// Fungsi untuk mengambil data dari API SUHU
async function fetchDataSuhu() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/suhus');
        const data = await response.json();

        // Mengonversi label "created_at" ke format waktu 24 jam
        const labels = data.map(item => formatTimeToWIB(item.created_at)); // Use the renamed function

        // Update data di chart
        suhuChart.data.labels = labels;
        suhuChart.data.datasets[0].data = data.map(item => item.temperaturSuhu);

        // Perbarui chart
        suhuChart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchData2 untuk pertama kali
fetchDataSuhu();

// Atur interval untuk mengupdate chart setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(fetchDataSuhu, 6000);


// Chart Kelembaban

// Inisialisasi chart dengan data awal yang kosong
const kelembabantx = document.getElementById('kelembabanChart').getContext('2d');
let kelembabanChart = new Chart(kelembabantx, {
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



// Fungsi untuk mengambil data dari API PM10
async function fetchDataKelembaban() {
    try {
        const response = await fetch('https://ecoairwatchapi.000webhostapp.com/kelembabans');
        const data = await response.json();

        // Mengonversi label "created_at" ke format waktu 24 jam
        const labels = data.map(item => formatTimeToWIB(item.created_at));

        // Update data di chart
        kelembabanChart.data.labels = labels;
        kelembabanChart.data.datasets[0].data = data.map(item => item.temperaturKelembaban);

        // Perbarui chart
        kelembabanChart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fetchData untuk pertama kali
fetchDataKelembaban();

// Atur interval untuk mengupdate chart setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(fetchDataKelembaban, 6000);



