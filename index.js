const express = require("express");
const app = express();
const port = 80;

const sessionId = ~~(Math.random() * 100000);
const sessions = new Map();

const products = require("./products.js");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

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
    let cart = body.cart;

    console.log(cart);

    res.send();
});