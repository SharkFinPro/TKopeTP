const fs = require("fs");

fs.writeFile("../bin/report.txt", "", (err) => {
    if (err) {
        console.error(err);
    }
});

const write = (data) => {
    fs.appendFileSync("../bin/report.txt", data + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });
};

/* Load Carts */
let carts = [];

try {
    let fileData = fs.readFileSync("../bin/conclaveDump.txt", "utf8").split("\n");

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

for (let cart of carts) {
    let productsInCart = Object.keys(cart);

    for (let product of productsInCart) {
        // Stats
        if (productsInCart.length > 1) {
            // Initialize if first instance
            if (!soldTogether[product]) {
                soldTogether[product] = {
                    count: 0,
                    displayName: cart[product].displayName
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
                        displayName: cart[p].displayName
                    }
                }

                soldTogether[product][p].count++;
            }


            // Increase soldTogether count
            soldTogether[product].count++;
            totalTogetherTransactions++;
            totalTogetherItems += cart[product].count;

        } else {
            if (!soldSolo[product]) {
                soldSolo[product] = {
                    count: 0
                }
            }

            soldSolo[product].count++;
            totalSoloTransactions++;
            totalSoloItems += cart[product].count;
        }

        // Load product if it's the first instance
        if (!productsPurchased[product]) {
            productsPurchased[product] = {
                price: cart[product].price,
                count: 0
            };
        }

        // Increase product count
        productsPurchased[product].count += cart[product].count;
    }
}

/* Display Stats */

write("------------------------------ Items Sold Solo ------------------------------");
for (let product in soldSolo) {
    write(`${product} sold solo ${soldSolo[product].count} times`);
}
write("-----------------------------------------------------------------------------");

write("---------------------------- Items Sold Together ----------------------------");
for (let product in soldTogether) {
    write("------------------------------");
    write(`${product} sold with other items ${soldTogether[product].count} times`);

    let others = Object.keys(soldTogether[product]);
    for (let other of others) {
        if (other !== "count" && other !== "displayName") {
            write(`${product} sold with ${other} ${soldTogether[product][other].count} times`);
        }
    }

    write("------------------------------");
}
write("-----------------------------------------------------------------------------");

/* Tally Money Made */
let totalMoney = 0;
let totalItems = 0;

for (let product in productsPurchased) {
    let productTotalMoney = productsPurchased[product].price * productsPurchased[product].count;
    totalMoney += productTotalMoney;
    totalItems += productsPurchased[product].count;

    write(`${product} made $${productTotalMoney} with ${productsPurchased[product].count} items sold`);
}
write("-----------------------------------------------------------------------------");

write(`Total single-item Transactions: ${totalSoloTransactions}`);
write(`Total single-item items sold: ${totalSoloItems}`);
write(`Total multi-item Transactions: ${totalTogetherTransactions}`);
write(`Total multi-item items sold: ${totalTogetherItems}`);
write(`Total Money Made: $${totalMoney}`);
write(`Total Items Sold: ${totalItems}`);