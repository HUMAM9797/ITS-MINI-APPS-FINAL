import * as myBridge from "./myBridge.js";

export async function getSubscription() {
    return new Promise((resolve) => {
        myBridge
            .getStorage("subscription")
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.error('Error getting subscription from bridge:', err);
                try {
                    const data = JSON.parse(localStorage.getItem("subscription"));
                    resolve(data);
                } catch (parseErr) {
                    console.error('Error parsing subscription from localStorage:', parseErr);
                    resolve(null);
                }
            });
    });
}


export async function setSubscription(subscriptionData) {
    return new Promise((resolve) => {
        myBridge
            .setStorage("subscription", subscriptionData)
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                console.error('Error setting subscription in bridge:', err);
                localStorage.setItem("subscription", JSON.stringify(subscriptionData));
                resolve(true);
            });
    });
}

export async function removeSubscription() {
    return new Promise((resolve) => {
        myBridge
            .removeStorage("subscription")
            .then(() => resolve(true))
            .catch((err) => {
                console.error('Error removing subscription from bridge:', err);
                localStorage.removeItem("subscription");
                resolve(true);
            });
    });
}
