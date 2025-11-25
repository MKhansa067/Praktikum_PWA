if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    });
}

// Minta izin notifikasi
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log("Notifikasi diizinkan");

                // Kirim pesan ke Service Worker untuk menampilkan notif
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({ action: "showNotification" });
                }
            } else {
                console.log("Notifikasi ditolak");
            }
        });
    }
}
// Tambahkan event untuk tombol
document.getElementById("notifyBtn").addEventListener("click", requestNotificationPermission);
