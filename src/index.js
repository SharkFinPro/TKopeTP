const fs = require("fs");
const SessionManager = require("./sessionManager.js");
const ProductManager = require("./productManager.js");
const WebServer = require("./webServer.js");

const sessionManager = new SessionManager();
const productManager = new ProductManager(require("../products.js"));

const webServer = new WebServer(80, "../public");
webServer.init();

webServer.getRequest("/sessionID", () => {
    return sessionManager.getGlobalID().toString();
});

webServer.postRequest("/createSession", (body) => {
    return new Promise((resolve, reject) => {
        sessionManager.createSession({ name: "" }).then((id) => {
            resolve(id.toString());
        });
    });
});

webServer.postRequest("/setName", (body) => {
    return new Promise((resolve, reject) => {
        let id = parseInt(body.sessionId);

        let sessionData = sessionManager.getSession(id);
        sessionData.name = body.name;
        sessionManager.setSession(id, sessionData);

        resolve();
    });
});

webServer.postRequest("/products", (body) => {
    return new Promise((resolve, reject) => {
        let productList = productManager.getProductsByType(body);

        resolve(productList);
    });
});

webServer.postRequest("/purchase", (body) => {
    return new Promise((resolve, reject) => {
        let user = sessionManager.getSession(parseInt(body.sessionId));
        let cart = {};

        for (let product in body.cart) {
            cart[product] = productManager.getProduct(product);
            cart[product].count = body.cart[product];
        }

        console.log(cart);

        fs.access("./bin", (err) => {
            if (err) {
                fs.mkdir("./bin", (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                fs.writeFile("./bin/dump.txt", `${JSON.stringify(cart)}\n`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                fs.appendFile("./bin/dump.txt", `${JSON.stringify(cart)}\n`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });

        resolve();
    });
});