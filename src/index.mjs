import { access, mkdir, appendFile } from "fs";
import sessionManager from "./sessionManager.mjs";
import productManager from "./productManager.mjs";
import webServer from "./webServer.mjs";

webServer.getRequest("/api/sessionID", () => {
    return new Promise((resolve, reject) => {
        resolve(sessionManager.getGlobalID().toString());
    });
});

webServer.postRequest("/api/createSession", (body) => {
    return new Promise((resolve, reject) => {
        sessionManager.createSession({ name: "" }).then((id) => {
            resolve(id.toString());
        });
    });
});

webServer.postRequest("/api/setName", (body) => {
    return new Promise((resolve, reject) => {
        let id = parseInt(body.sessionId);

        let sessionData = sessionManager.getSession(id);
        sessionData.name = body.name;
        sessionManager.setSession(id, sessionData);

        resolve();
    });
});

webServer.postRequest("/api/products", (body) => {
    return new Promise((resolve, reject) => {
        productManager.getProductsByType(body).then((products) => {
            resolve(products);
        });
    });
});

webServer.getRequest("/api/productTypes", (body) => {
    return new Promise((resolve, reject) => {
        productManager.getProductTypes(body).then((types) => {
            resolve(types);
        });
    });
});

webServer.postRequest("/api/purchase", (body) => {
    return new Promise(async (resolve, reject) => {
        let cart = {};

        for (let product in body.cart) {
            cart[product] = await productManager.getProduct(product);
            cart[product].count = body.cart[product];
        }

        const transactionLog = JSON.stringify({
            cart,
            paymentMethod: body.paymentMethod,
            time: body.time
        });

        access("./bin", (err) => {
            if (err) {
                mkdir("./bin", (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            appendFile("./bin/dump.txt", `${transactionLog}\n`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });

        resolve();
    });
});