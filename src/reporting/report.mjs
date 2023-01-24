import { readFileSync } from "fs";
import * as XLSX from "xlsx";
import Cart from "./cart.mjs";

export default class Report {
    constructor(file) {
        this.products = {};
        this.totalProductsSold = 0;
        this.moneyMade = {
            cash: 0,
            card: 0
        };
        this.timestamps = [];

        this.productsWorksheet = null;


        const transactions = readFileSync(file, "utf8").split("\n");
        transactions.pop();

        this.carts = [];

        for (let transaction of transactions) {
            const cart = JSON.parse(transaction);
            this.carts.push(new Cart(cart.cart, cart.paymentMethod, cart.time));
        }

        this.processCarts();
    }

    processCarts() {
        for (let cart of this.carts) {
            this.processCart(cart);
        }
    }

    processCart(cart) {
        for (let product in cart.cart) {
            if (!Object.keys(this.products).includes(product)) {
                this.products[product] = cart.cart[product];
            } else {
                this.products[product].count += cart.cart[product].count;
            }

            this.totalProductsSold += cart.cart[product].count;

            if (cart.paymentMethod === "cash") {
                this.moneyMade.cash += cart.cart[product].count * this.products[product].price;
            } else if (cart.paymentMethod === "card") {
                this.moneyMade.card += cart.cart[product].count * this.products[product].price;
            }
        }

        this.timestamps.push(new Date(cart.time));
    }

    sendToSheet() {
        const sheetData = [];

        for (let id in this.products) {
            sheetData.push({
                "Product": this.products[id].displayName,
                "Count": { v: this.products[id].count, t: "n" },
                "Price": { v: this.products[id].price, t: "n", z: "$#" },
                "Total": { v: this.products[id].count * this.products[id].price, t: "n", z: "$#" }
            });
        }

        sheetData.push({
            "Product": "Total",
            "Count": { v: this.totalProductsSold, t: "n" },
            "Total": { v: this.moneyMade.cash + this.moneyMade.card, t: "n", z: "$#" }
        });

        const productsWorksheet = XLSX.utils.json_to_sheet(sheetData);
        productsWorksheet["!cols"] = [{ width: 25 }];

        this.productsWorksheet = productsWorksheet;
    }

    getExcel() {
        if (!this.productsWorksheet) {
            this.sendToSheet();
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, this.productsWorksheet, "Products");

        return XLSX.write(workbook, { type:"buffer", bookType:"xlsx" });
    }

    getOverview() {
        return JSON.stringify(this.products);
    }
}