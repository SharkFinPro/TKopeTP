const fs = require("fs");
const SessionManager = require("./sessionManager.js");
const ProductManager = require("./productManager.js");
const WebServer = require("./webServer.js");

const sessionManager = new SessionManager();
const productManager = new ProductManager();

const webServer = new WebServer(80, "../public");
webServer.init();

webServer.getRequest("/sessionID", () => {
    return new Promise((resolve, reject) => {
        resolve(sessionManager.getGlobalID().toString());
    });
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
        let paymentMethod = body.paymentMethod;
        let time = body.time;

        let moneyMade = 0;

        for (let product in body.cart) {
            cart[product] = productManager.getProduct(product);
            cart[product].count = body.cart[product];

            moneyMade += cart[product].count * cart[product].price;
        }

        const transactionLog = JSON.stringify({cart, paymentMethod, time});
        console.log(`Transaction completed using ${paymentMethod}!`);

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


/* Admin Panel */
webServer.getRequest("/admin", (req) => {
    return new Promise((resolve, reject) => {
        if (req.hostname !== "localhost") {
            resolve("You do not have access.");
        }

        resolve("Admin Panel");
    });
});