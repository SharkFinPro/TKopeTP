import databaseManager from "./databaseManager.ts";

class ProductManager {
    getProductsByType(type) {
        return new Promise((resolve, reject) => {
            databaseManager.all(`SELECT productType, displayName, price, imageFile as image, id FROM Products WHERE productType=${type}`, (error, products) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(products);
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
            databaseManager.all("SELECT * FROM ProductTypes", (error, productTypes) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                let types = {};
                for (let productType of productTypes) {
                    types[productType.id] = productType.displayName;
                }

                resolve(types);
            });
        });
    }
}

const productManager = new ProductManager();
export default productManager;