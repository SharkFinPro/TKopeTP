import { access, mkdir, appendFile } from "fs";
import sessionManager from "./sessionManager.mjs";
import productManager from "./productManager.mjs";
import webServer from "./webServer.mjs";
import Report from "./reporting/report.mjs";

webServer.getRequest("/api/sessionID", (req, res) => {
    res.send(sessionManager.getGlobalID().toString());
});

webServer.postRequest("/api/createSession", (body, res) => {
    sessionManager.createSession({ name: "" }).then((id) => {
        res.send(id.toString());
    });
});

webServer.postRequest("/api/setName", (body, res) => {
    let id = parseInt(body.sessionId);

    let sessionData = sessionManager.getSession(id);
    sessionData.name = body.name;
    sessionManager.setSession(id, sessionData);

    res.send();
});

webServer.postRequest("/api/products", (body, res) => {
    productManager.getProductsByType(body).then((products) => {
        res.send(products);
    });
});

webServer.getRequest("/api/productTypes", (body, res) => {
    productManager.getProductTypes(body).then((types) => {
        res.send(types);
    });
});

webServer.postRequest("/api/purchase", async (body, res) => {
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

    res.send();
});

webServer.getRequest("/api/admin/reporting/report.xlsx", (body, res) => {
    const report = new Report("./bin/dump.txt");

    res.send(report.getExcel());
});