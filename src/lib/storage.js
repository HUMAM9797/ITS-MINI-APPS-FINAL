import * as myBridge from "./myBridge.js";

export async function getSubscription() {
    return new Promise((resolve) => {
        myBridge
            .getStorage("subscription")
            .then((res) => {
                resolve(res);
            })
            .catch(() => {
                try {
                    const data = JSON.parse(localStorage.getItem("subscription"));
                    resolve(data);
                } catch {
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
            .catch(() => {
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
            .catch(() => {
                localStorage.removeItem("subscription");
                resolve(true);
            });
    });
}
