let webPush = require("web-push");

const vapidKeys = {
    "publicKeys": "BGNqgYKsD1u6ShwlHR-q9AllYhYQ2FkbDAWxNRvx_y_FAuP4EOWnJyRkgEU8Yxma_5yAsaf0B_fNSJZ6mMlfgfY",
    "privateKeys": "3E2Ni63_nW5RDj\nDes-_816yI9_ajkcWBAoNSy1OL4go"
}

webPush.setVapidDetails(
    "mailto:example@yourdomain.org",
    vapidKeys.publicKeys,
    vapidKeys.privateKeys
)

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e2h8tWhZ-Cw:APA91bH9BUjNA40x99IlvKqfQR2XHKVtIEzLbHKkoiaEtXPSVrMvV9iTpct88-BOjAgA7P7Hn7eBKeQy8BjozWDtT14SqjwmQ8APzPmiyg7MTmVcdKcz6KmvudTNyzFrSTDaLNtrhey2",
    "keys": {
        "p256dh": "BNIKBvikfN3243YXc5U8MIbpSdwGkVVb3DnfZYx0e4aNjfXUjvgqBipF/P2R+Fv4YHOtytodrZRaGfiZsYHDzgc=",
        "auth": "Py1sN6sZwTuQYvF/9SKzmw=="
    }
};

let payload = "Thank you for using this app";

let options = {
    gcmAPIKey: "765977160668",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)