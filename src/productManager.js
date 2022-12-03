import databaseManager from "./databaseManager.js";

class ProductManager {
    getProductsByType(type) {
        return new Promise((resolve, reject) => {
            let productList = {};

            databaseManager.all(`SELECT productType, displayName, price, imageFile as image, id FROM Products WHERE productType=${type}`, (error, products) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                for (let product of products) {
                    productList[product.id] = product;
                }

                resolve(productList);
            });
        });
    }

    getProduct(productID) {
        return new Promise((resolve, reject) => {
            databaseManager.each(`SELECT productType, displayName, price, imageFile as image, id FROM Products WHERE id=${productID}`, (error, product) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(product);
            });
        });
    }

    getProductTypes() {
        return new Promise((resolve, reject) => {
            let types = {};
            databaseManager.all("SELECT * FROM ProductTypes", (error, productTypes) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                for (let productType of productTypes) {
                    types[productType.id] = productType.displayName;
                }

                resolve(types);
            });
        });
    }
}

export default new ProductManager();