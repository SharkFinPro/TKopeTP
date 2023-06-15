import { access, mkdir, appendFile } from "fs";
import productManager from "../../../productManager";
import { ProductData } from "../../../productTypes";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  body.cart = JSON.parse(body.cart);

  const cart: ProductData[] = [];
  for (let { id, count } of body.cart) {
    let data: ProductData = await productManager.getProduct(id);
    data.count = count;
    cart.push(data);
  }

  const transactionLog: string = JSON.stringify({
    cart: JSON.stringify(cart),
    paymentMethod: body.paymentMethod,
    time: body.time
  });

  access("./bin", (err): void => {
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