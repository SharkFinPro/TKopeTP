const fs = require("fs");

fs.readFile("../bin/conclaveDump.txt", "utf8", (err, data) => {
    if (err) {
        console.log(console.error);
    }
    data = data.split("\n");

    let carts = [];

    for (let cart of data) {
        if (cart) {
            carts.push(JSON.parse(cart));
        }
    }

    let productsPurchased = {};

    for (let cart of carts) {
        let productsInCart = Object.keys(cart);

        for (let product of productsInCart) {
            if (!productsPurchased[product]) {
                productsPurchased[product] = {
                    price: cart[product].price,
                    count: 0
                };
            }

            productsPurchased[product].count += cart[product].count;
        }
    }

    let totalMoney = 0;

    for (let product in productsPurchased) {
        let productTotalMoney = productsPurchased[product].price * productsPurchased[product].count;
        totalMoney += productTotalMoney;

        console.log(`${product} made $${productTotalMoney} with ${productsPurchased[product].count} items sold`);

    }

    console.log(`Total Money Made: $${totalMoney}`);
});