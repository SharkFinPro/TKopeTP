const sqlite3 = require('sqlite3');

module.exports = class ProductManager {
    constructor() {
        this.typedProducts = {};
        this.products = {};

        this.types = {};

        this.productDB = new sqlite3.Database("./src/db/TradingPost.sqlite");
        this.productDB.all("select productType, displayName, price, imageFile as image FROM Products;", (error, products) => {
            for (let product of products) {
                this.products[product.displayName] = product;

                if (!Object.keys(this.typedProducts).includes(product.productType.toString())) {
                    this.typedProducts[product.productType] = {};
                }
                this.typedProducts[product.productType][product.displayName] = product;
            }
        });

        this.productDB.all("select id, displayName FROM ProductTypes", (error, productTypes) => {
            for (let productType of productTypes) {
                this.types[productType.id] = productType.displayName;
            }

            console.log(this.types);
        });
    }

    getProductsByType(type) {
        return JSON.stringify(this.typedProducts[type]);
    }

    getProduct(product) {
        return this.products[product];
    }

    getProductTypes() {
        return this.types;
    }

    getProductTypeName(type) {
        return this.types[type];
    }
}