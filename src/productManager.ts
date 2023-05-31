import databaseManager from "./databaseManager";
import {ProductData, ProductType, RobustProductData} from "./productTypes";

class ProductManager {
    getProductsByType(type: string, active: boolean = false): Promise<ProductData[]> {
        console.log(active)
        return new Promise((resolve, reject): void => {
            databaseManager.all(`SELECT productType, displayName, price, image, id FROM Products WHERE productType=${type}${active ? " AND active=true" : ""}`, (error: string, products): void => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(products);
            });
        });
    }

    getProducts(): Promise<RobustProductData[]> {
        return new Promise((resolve, reject): void => {
            databaseManager.all("SELECT * FROM Products", (error: string, products): void => {
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
            databaseManager.each(`SELECT productType, displayName, price, image, id FROM Products WHERE id=${productID}`, (error: string, product): void => {
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

    updateProduct(productData: RobustProductData): void {
        databaseManager.run(`UPDATE Products SET displayName='${productData.displayName}', image='${productData.image}', price='${productData.price}', productType='${productData.productType}', active='${productData.active}' WHERE id=${productData.id}`);
    }
}

const productManager: ProductManager = new ProductManager();
export default productManager;