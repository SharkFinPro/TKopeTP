import databaseManager from "./databaseManager";
import { ProductData, ProductType } from "./productTypes";

class ProductManager {
    getProductsByType(type: string): Promise<ProductData[]> {
        return new Promise((resolve, reject): void => {
            databaseManager.all(`SELECT productType, displayName, price, imageFile as image, id FROM Products WHERE productType=${type}`, (error: string, products): void => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(products);
            });
        });
    }

    getProducts(): Promise<ProductData[]> {
        return new Promise((resolve, reject): void => {
            databaseManager.all(`SELECT productType, displayName, price, imageFile as image, id FROM Products`, (error: string, products): void => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(products);
            });
        });
    }

    getProduct(productID: string): Promise<ProductData> {
        return new Promise((resolve, reject): void => {
            databaseManager.each(`SELECT productType, displayName, price, imageFile as image, id FROM Products WHERE id=${productID}`, (error: string, product): void => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(product);
            });
        });
    }

    getProductTypes(): Promise<ProductType[]> {
        return new Promise((resolve, reject): void => {
            databaseManager.all("SELECT * FROM ProductTypes", (error: string, productTypes): void => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(productTypes);
            });
        });
    }
}

const productManager: ProductManager = new ProductManager();
export default productManager;