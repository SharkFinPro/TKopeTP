exports.is_production = process.pkg ? true : false;
const cwd = this.is_production ? process.cwd() : __dirname;

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 80;

const sessionId = ~~(Math.random() * 100000);
const sessions = new Map();

const products = require("./products.js");
let productsList = {};
for (let productType in products) {
    for (let product in products[productType]) {
        productsList[product] = products[productType][product];
    }
}

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const compression = require('compression');
app.use(compression());

app.listen(port, () => {
    console.log(`Server listening on port ${port} with session ID ${sessionId}`);
});

app.get("/sessionID", (req, res) => {
   res.send(sessionId.toString());
});

app.post("/createSession", (req, res) => {
    let body = JSON.parse(Object.keys(req.body)[0]);

    let id;
    do {
       id = ~~(Math.random() * 100000);
    } while (sessions.has(id));

    res.send(id.toString())
    sessions.set(id, { name: "" });
});

app.post("/setName", (req, res) => {
    let body = JSON.parse(Object.keys(req.body)[0]);

    sessions.get(parseInt(body.sessionId)).name = body.name;

    res.send();
});

app.post("/products", (req, res) => {
    let type = JSON.parse(Object.keys(req.body)[0]);

    res.send(JSON.stringify(products[type]));
});

app.post("/purchase", (req, res) => {
    let body = JSON.parse(Object.keys(req.body)[0]);
    let user = sessions.get(parseInt(body.sessionId));
    let cart = {};

    for (let product in body.cart) {
        cart[product] = productsList[product];
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

    res.send();
});