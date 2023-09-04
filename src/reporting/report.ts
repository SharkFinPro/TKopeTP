import { readFileSync, existsSync } from "fs";
import * as XLSX from "xlsx";
import Cart from "./cart";
import { ProductData } from "../productTypes";

export default class Report {
  products: ProductData[] = [];
  totalProductsSold: number = 0;
  moneyMade: { cash: number, card: number } = { cash: 0, card: 0};
  timestamps: Date[] = [];
  productsWorksheet: XLSX.WorkSheet | undefined = undefined;
  carts: Cart[] = [];

  constructor(file: string) {
    if (existsSync(file)) {
      const transactions: string[] = readFileSync(file, "utf8").split("\n");
      transactions.pop();

      for (let transaction of transactions) {
        const cartData = JSON.parse(transaction);
        const cart: Cart = new Cart(cartData.cart || cartData, cartData.paymentMethod, cartData.time);
        this.carts.push(cart);
        this.processCart(cart);
      }
    }
  }

  processCart(cart: Cart): (number | void) {
    let totalMoney: number = 0;

    if (typeof cart.cart === "object") { // Legacy (object)
      for (let product in cart.cart) {
        totalMoney += this.processProduct(cart.cart[product], cart.paymentMethod);
      }
    } else { // Current (array)
      const cartProducts = JSON.parse(cart.cart);
      for (let cartProduct of cartProducts) {
        totalMoney += this.processProduct(cartProduct, cart.paymentMethod);
      }
    }

    if (cart.time) {
      this.timestamps.push(new Date(cart.time));
    }

    cart.totalMoney = totalMoney;
  }

  processProduct(product: ProductData, paymentMethod: string): any {
    if (!product.count) {
      return;
    }

    let productData: ProductData | undefined = this.products.find((p: ProductData): boolean => p.id === product.id);

    if (!productData) {
      this.products.push(product);
    } else if (productData.count) {
      productData.count += product.count;
    }

    if (!productData) {
      productData = this.products.find((p: ProductData): boolean => p.id === product.id);
    }

    if (!productData) {
      return;
    }

    this.totalProductsSold += product.count;

    const moneyMade = product.count * productData.price;

    if (paymentMethod === "cash") {
      this.moneyMade.cash += moneyMade;
    } else if (paymentMethod === "card") {
      this.moneyMade.card += moneyMade;
    }

    return moneyMade;
  }

  sendToSheet(): void {
    const sheetData: any[] = [];

    sheetData.push([ "Product", "Count", "Price", "Total" ]);

    for (let { displayName, count, price } of this.products) {
      if (!count) {
        continue;
      }

      sheetData.push([
        displayName,
        { v: count, t: "n" },
        { v: price, t: "n", z: "$#" },
        { v: count * price, t: "n", z: "$#" }
      ]);
    }

    sheetData.push([
      "Total",
      { v: this.totalProductsSold, t: "n" },
      "",
      { v: this.moneyMade.cash + this.moneyMade.card, t: "n", z: "$#" },
      "",
      "Cash:",
      { v: this.moneyMade.cash, t: "n", z: "$#", alignLeft: true },
      "Card: ",
      { v: this.moneyMade.card, t: "n", z: "$#" }
    ]);

    const productsWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
    productsWorksheet["!cols"] = [{ width: 25 }];

    this.productsWorksheet = productsWorksheet;
  }

  getExcel() {
    if (!this.productsWorksheet) {
      this.sendToSheet();
    }

    if (!this.productsWorksheet) {
      return;
    }

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, this.productsWorksheet, "Products");

    return XLSX.writeXLSX(workbook, { type: "buffer" });
  }

  getOverview(): ProductData[] {
    return this.products;
  }

  getTimes(): Date[] {
    return this.timestamps;
  }

  getTransactions() {
    return this.carts;
  }
}