//Registering Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then( () => {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch( () => {
                console.error("Pendaftaran ServiceWorker Gagal");
            });
    });
} else {
    console.error("ServiceWorker belum didukung browser ini.")
}

//Requesting Notification
if ("Notification" in window) {
    Notification.requestPermission().then(result => {
        if (result === "default") {
            console.log("Notification Box closed");
        } else if (result === "denied") {
            console.error("Notification Denied");
        }
        console.log(`Notification : ${result}`);
    })
} else {
    console.log("Browser not support notification");
}

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if (("PushManager" in window)) {
    navigator.serviceWorker.getRegistration().then(registration => {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BGNqgYKsD1u6ShwlHR-q9AllYhYQ2FkbDAWxNRvx_y_FAuP4EOWnJyRkgEU8Yxma_5yAsaf0B_fNSJZ6mMlfgfY")
        })
            .then(subscribe => {
                console.table({
                    endpoint: subscribe.endpoint,
                    p256dhKey: btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey("p256dh"))
                    )),
                    authKey: btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey("auth"))
                    ))
                })
            })
            .catch(e => {
                console.error("Cannot Subscribe : ", e.message)
            })
    })
}