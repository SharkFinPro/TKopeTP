module.exports = class ProductManager {
    constructor(productsList) {
        this.typedProducts = productsList;

        this.products = {};
        for (let productType in this.typedProducts) {
            for (let product in this.typedProducts[productType]) {
                this.products[product] = this.typedProducts[productType][product];
            }
        }
    }

    getProductsByType(type) {
        return JSON.stringify(this.typedProducts[type]);
    }

    getProduct(product) {
        return this.products[product];
    }
}