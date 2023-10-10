import databaseManager from "./databaseManager";
import { ProductData, ProductType, RobustProductData } from "./productTypes";

class ProductManager {
  getProductsByType(type: string, active: boolean = false): Promise<ProductData[]> {
    return new Promise((resolve, reject): void => {
      databaseManager.all(`SELECT productType, displayName, price, image, id FROM Products WHERE productType=${type}${active ? " AND active=true" : ""}`,(error: string, products): void => {
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

  updateProduct(productData: RobustProductData): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      databaseManager.run(`UPDATE Products SET displayName=?, image=?, price=?, productType=?, active=? WHERE id=?`,
        [productData.displayName, productData.image, productData.price, productData.productType, productData.active, productData.id],
        (err: any): void => {
          if (err) {
            console.error(err);
            reject(err);
          }

          resolve(true);
        });
    });
  }

  createProduct(productData: RobustProductData): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      databaseManager.run(`INSERT INTO Products (productType, displayName, price, image, active) VALUES (?, ?, ?, ?, ?)`,
        [productData.productType, productData.displayName, productData.price, productData.image, productData.active],
        (err: any): void => {
          if (err) {
            console.error(err);
            reject(err);
          }

          resolve(true);
        });
    });
  }
}

const productManager: ProductManager = new ProductManager();
export default productManager;