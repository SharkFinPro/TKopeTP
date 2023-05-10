import { access, mkdir, appendFile } from "fs";
import productManager from "../../../productManager";

export async function POST(request) {
    const body = await request.json();
    body.cart = JSON.parse(body.cart);

    let cart = [];
    for (let product of body.cart) {
        let data = await productManager.getProduct(product.id);
        data.count = product.count;
        cart.push(data);
    }

    const transactionLog = JSON.stringify({
        cart: JSON.stringify(cart),
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