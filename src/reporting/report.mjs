import { readFileSync } from "fs";
import * as XLSX from "xlsx";
import Cart from "./cart.mjs";

export default class Report {
    constructor(file) {
        this.products = {};
        this.totalProductsSold = 0;
        this.totalMoneyMade = 0;

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
            this.processCartProducts(cart.cart);
        }
    }

    processCartProducts(cart) {
        for (let product in cart) {
            if (!Object.keys(this.products).includes(product)) {
                this.products[product] = cart[product];
            } else {
                this.products[product].count += cart[product].count;
            }

            this.totalProductsSold += cart[product].count;
            this.totalMoneyMade += cart[product].count * this.products[product].price;
        }
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
            "Total": { v: this.totalMoneyMade, t: "n", z: "$#" }
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