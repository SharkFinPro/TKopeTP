import * as fs from "node:fs";
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
    return new Promise(async (resolve, reject) => {
        let productList = await productManager.getProductsByType(body);

        resolve(productList);
    });
});

webServer.getRequest("/api/productTypes", (body) => {
    return new Promise(async (resolve, reject) => {
        let typeList = await productManager.getProductTypes(body);

        resolve(typeList);
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

        fs.access("./bin", (err) => {
            if (err) {
                fs.mkdir("./bin", (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            fs.appendFile("./bin/dump.txt", `${transactionLog}\n`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });

        resolve();
    });
});