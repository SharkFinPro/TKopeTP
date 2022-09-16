const fs = require("fs");

fs.readFile("../bin/dump.txt", "utf8", (err, data) => {
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

    console.log(carts);
});