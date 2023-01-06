import { writeFile, appendFileSync, readFileSync } from "fs";
import { join } from "path";
import xl from "excel4node";
const binFolder = "../bin/";

writeFile(join(binFolder, "report.txt"), "", (err) => {
    if (err) {
        console.error(err);
    }
});

const write = (data) => {
    appendFileSync(join(binFolder, "report.txt"), data + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });
};

/* Load Carts */
let carts = [];

try {
    let fileData = readFileSync(join(binFolder, "dump.txt"), "utf8").split("\n");

    for (let cart of fileData) {
        if (cart) {
            carts.push(JSON.parse(cart));
        }
    }
} catch (err) {
    console.error(err);
}

/* Tally Products Purchased */
let productsPurchased = {};

let soldSolo = {};
let totalSoloTransactions = 0;
let totalSoloItems = 0;

let soldTogether = {};
let totalTogetherTransactions = 0;
let totalTogetherItems = 0;

for (let cartData of carts) {
    let productsInCart = Object.keys(cartData.cart);

    for (let product of productsInCart) {
        // Stats
        if (productsInCart.length > 1) {
            // Initialize if first instance
            if (!soldTogether[product]) {
                soldTogether[product] = {
                    count: 0,
                    displayName: cartData.cart[product].displayName
                }
            }

            // Increase counts of all other items in cart
            for (let p of productsInCart) {
                if (p === product) {
                    continue;
                }

                // Initialize if first instance
                if (!soldTogether[product][p]) {
                    soldTogether[product][p] = {
                        count: 0,
                        displayName: cartData.cart[p].displayName
                    }
                }

                soldTogether[product][p].count++;
            }


            // Increase soldTogether count
            soldTogether[product].count++;
            totalTogetherTransactions++;
            totalTogetherItems += cartData.cart[product].count;

        } else {
            if (!soldSolo[product]) {
                soldSolo[product] = {
                    count: 0,
                    displayName: cartData.cart[product].displayName
                }
            }

            soldSolo[product].count++;
            totalSoloTransactions++;
            totalSoloItems += cartData.cart[product].count;
        }

        // Load product if it's the first instance
        if (!productsPurchased[product]) {
            productsPurchased[product] = {
                price: cartData.cart[product].price,
                count: 0,
                displayName: cartData.cart[product].displayName
            };
        }

        // Increase product count
        productsPurchased[product].count += cartData.cart[product].count;
    }
}

/* Display Stats */

write("------------------------------ Items Sold Solo ------------------------------");
for (let product in soldSolo) {
    // write(`${product} sold solo ${soldSolo[product].count} times`);
    write(`${soldSolo[product].displayName}`.padEnd(50, "_") + `${soldSolo[product].count} transaction(s)`);
}
write("");

write("---------------------------- Items Sold Together ----------------------------");
for (let product in soldTogether) {
    write(`${soldTogether[product].displayName} sold with other items in ${soldTogether[product].count} transaction(s)`);

    let others = Object.keys(soldTogether[product]);
    for (let other of others) {
        if (other !== "count" && other !== "displayName") {
            write(`${soldTogether[product].displayName} & ${soldTogether[other].displayName}`.padEnd(50, "_") + `${soldTogether[product][other].count}`);
        }
    }

    write("");
}

write("----------------------------------- Total -----------------------------------");

/* Tally Money Made and log to excel file */
let totalMoney = 0;
let totalItems = 0;

const wb = new xl.Workbook();
const ws = wb.addWorksheet("Sheet 1");
ws.cell(1, 1).string("Item");
ws.cell(1, 2).string("Count");
ws.cell(1, 3).string("Price");
ws.cell(1, 4).string("Total $");
let row = 2;

write("Product".padEnd(25, " ") + "Money made".padEnd(15, " ") + "Items Sold");
for (let product in productsPurchased) {
    let productTotalMoney = productsPurchased[product].price * productsPurchased[product].count;
    totalMoney += productTotalMoney;
    totalItems += productsPurchased[product].count;

    // write(`${product} made $${productTotalMoney} with ${productsPurchased[product].count} items sold`);
    write(`${productsPurchased[product].displayName}`.padEnd(25, "_") + `$${productTotalMoney}`.padEnd(15, "_") + `${productsPurchased[product].count}`);

    ws.cell(row, 1).string(productsPurchased[product].displayName);
    ws.cell(row, 2).number(productsPurchased[product].count);
    ws.cell(row, 3).number(productsPurchased[product].price).style({ numberFormat: "$#" });
    ws.cell(row, 4).formula(`B${row} * C${row}`).style({ numberFormat: "$#" });
    row++;
}
ws.cell(row, 3).string("TOTAL:");
ws.cell(row, 4).formula(`SUM(D2:D${row - 1})`).style({ numberFormat: "$#" });
wb.write("../bin/Report.xlsx");
write("");

write("----------------------------------- Recap -----------------------------------");

write(`Total single-item Transactions: ${totalSoloTransactions}`);
write(`Total items sold in single-item transactions: ${totalSoloItems}`);
write(`Total multi-item Transactions: ${totalTogetherTransactions}`);
write(`Total items sold in multi-item transactions: ${totalTogetherItems}`);
write(`Total Money Made: $${totalMoney}`);
write(`Total Items Sold: ${totalItems}`);