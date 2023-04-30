import { access, mkdir, appendFile } from "fs";
import productManager from "../../../productManager.mjs";

export async function POST(request) {
    const body = await request.json();
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
                    return new Response("Error!", { status: 500 });
                }
            });
        }
        appendFile("./bin/dump.txt", `${transactionLog}\n`, (err) => {
            if (err) {
                console.error(err);
                return new Response("Error!", { status: 500 });
            }
        });
    });

    return new Response("Success!", { status: 200 });
}