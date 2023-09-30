import { access, mkdir, appendFile } from "fs/promises";
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

  // Check if bin directory exists, if not then create it
  try {
    await access("./bin");
  } catch (e) {
    try {
      await mkdir("./bin");
    } catch (err) {
      console.error(err);
      return new Response("Error!", { status: 500 });
    }
  }

  // Write to dump text file in bin directory
  try {
    await appendFile("./bin/dump.txt", `${transactionLog}\n`);
  } catch (err) {
    console.error(err);
    return new Response("Error!", { status: 500 });
  }

  return new Response("Success!", { status: 200 });
}