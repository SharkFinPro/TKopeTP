import { access, mkdir, appendFile } from "fs";
import productManager from "../../../productManager";

export async function POST(request) {
    const body = await request.json();
    let cart = {};

    body.cart = JSON.parse(body.cart);

    for (let product of body.cart) {
        cart[product.id] = await productManager.getProduct(product.id);
        cart[product.id].count = product.count;
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