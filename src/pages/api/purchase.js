import { access, mkdir, appendFile } from "fs";
import productManager from "../../productManager.mjs";

export default async (req, res) => {
    let body = req.body;
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

    res.status(200).send();
}