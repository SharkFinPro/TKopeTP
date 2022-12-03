import * as fs from "node:fs";
import DatabaseManager from "./databaseManager.js";
import SessionManager from "./sessionManager.js";
import ProductManager from "./productManager.js";
import WebServer from "./webServer.js";

const databaseManager = new DatabaseManager();
const sessionManager = new SessionManager();
const productManager = new ProductManager(databaseManager);
const webServer = new WebServer(80, "../public/app", "../public/adminPanel");

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
        let user = sessionManager.getSession(parseInt(body.sessionId));
        let cart = {};
        let paymentMethod = body.paymentMethod;
        let time = body.time;

        let moneyMade = 0;

        for (let product in body.cart) {
            cart[product] = await productManager.getProduct(product);
            cart[product].count = body.cart[product];

            moneyMade += cart[product].count * cart[product].price;
        }

        const transactionLog = JSON.stringify({cart, paymentMethod, time});

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