const idbPromised = idb.open("bookmark_db", 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains("bookmarks")) {
        upgradedDb.createObjectStore("bookmarks", {keyPath: "id"});
    }
});

const dbCheck = id => {
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                const transaction = db.transaction("bookmarks", "readonly");
                return transaction.objectStore("bookmarks").get(parseInt(id));
            })
            .then(data => {
                if (data !== undefined) {
                    resolve(data)
                }
            })
    })
}


const dbGet = id => {
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                const transaction = db.transaction("bookmarks", "readonly");
                return transaction.objectStore("bookmarks").get(parseInt(id));
            })
            .then(data => {
                if (data !== undefined) {
                    resolve(data)
                } else {
                    reject(new Error())
                }
            })
    })
}

const dbGetAll = () => {
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                const transaction = db.transaction("bookmarks", "readonly");
                return transaction.objectStore("bookmarks").getAll();
            })
            .then(data => {
                if (data !== undefined) {
                    resolve(data)
                } else {
                    reject(new Error("Bookmark not Found"))
                }
            })
    })
}

const dbAdd = bookmark => {
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                const transaction = db.transaction("bookmarks", "readwrite");
                transaction.objectStore("bookmarks").add(bookmark);
                return transaction;
            })
            .then(transaction => {
                if (transaction.complete) {
                    resolve(true)
                } else {
                    reject(new Error(transaction.onerror))
                }
            })
    })
}

const dbDelete = id => {
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                const transaction = db.transaction("bookmarks", "readwrite");
                transaction.objectStore("bookmarks").delete(parseInt(id));
                return transaction;
            })
            .then(transaction => {
                if (transaction.complete) {
                    resolve(true)
                } else {
                    reject(new Error(transaction.onerror))
                }
            })
    })
}