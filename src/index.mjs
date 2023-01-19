import { access, mkdir, appendFile } from "fs";
import next from "next";
import sessionManager from "./sessionManager.mjs";
import productManager from "./productManager.mjs";
import webServer from "./webServer.mjs";
import Report from "./reporting/report.mjs";

webServer.getRequest("/api/sessionID", (req, res) => {
    res.send(sessionManager.getGlobalID().toString());
});

webServer.getRequest("/api/createSession", (req, res) => {
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

webServer.getRequest("/api/products/*", (req, res) => {
    const splitURL = req.url.split("/");
    const category = splitURL[splitURL.length - 1];

    productManager.getProductsByType(category).then((products) => {
        res.send(products);
    });
});

webServer.getRequest("/api/productCategories", (req, res) => {
    productManager.getProductTypes().then((types) => {
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

webServer.getRequest("/api/admin/reporting/report.xlsx", (req, res) => {
    const report = new Report("./bin/dump.txt");

    res.send(report.getExcel());
});

webServer.getRequest("/api/admin/reporting/overview", (req, res) => {
    const report = new Report("./bin/dump.txt");

    res.send(report.getOverview());
});

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });

nextApp.prepare()
    .then(() => {
        webServer.getRequest("*", nextApp.getRequestHandler());

        webServer.init();
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    })