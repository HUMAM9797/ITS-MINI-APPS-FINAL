
function callMyAPI(name, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            if (window.my && typeof window.my[name] === "function") {
                window.my[name]({
                    ...options,
                    success: (res) => resolve(res.data ?? res),
                        fail: (err) => {
                            console.error('Bridge API fail:', err);
                            reject(err);
                        },
                });
            } else {
                reject(new Error("my API not available"));
                    console.error('Bridge API not available');
                    reject(new Error("my API not available"));
            }
        } catch (e) {
            reject(e);
        }
    });
}


export function getStorage(key) {
    return callMyAPI("getStorage", { key });
}


export function setStorage(key, data) {
    return callMyAPI("setStorage", { key, data });
}


export function removeStorage(key) {
    return callMyAPI("removeStorage", { key });
}

export function tradePay({ tradeNO, orderStr, paymentUrl }) {
    return new Promise((resolve, reject) => {
        try {
            if (window.my && typeof window.my.tradePay === "function") {
                window.my.tradePay({
                    tradeNO,
                    orderStr,
                    paymentUrl,
                    success: (res) => resolve(res),
                    fail: (err) => reject(err),
                });
            } else {
                reject(new Error("tradePay not available"));
            }
        } catch (e) {
            reject(e);
        }
    });
}
