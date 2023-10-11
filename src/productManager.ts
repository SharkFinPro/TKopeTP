import databaseManager from "./databaseManager";
import { ProductData, ProductType, RobustProductData } from "./productTypes";

class ProductManager {
  getProductsByType(type: string, active: boolean = false): Promise<ProductData[]> {
    return databaseManager.all(`SELECT productType, displayName, price, image, id FROM Products WHERE productType=${type}${active ? " AND active=true" : ""}`);
  }

  getProducts(): Promise<RobustProductData[]> {
    return databaseManager.all("SELECT * FROM Products");
  }

  getProduct(productID: string): Promise<ProductData> {
    return databaseManager.each(`SELECT productType, displayName, price, image, id FROM Products WHERE id=${productID}`);
  }

  getProductTypes(): Promise<ProductType[]> {
    return databaseManager.all("SELECT * FROM ProductTypes");
  }

  updateProduct(productData: RobustProductData): Promise<boolean> {
    return databaseManager.run(`UPDATE Products SET displayName=?, image=?, price=?, productType=?, active=? WHERE id=?`,
      [productData.displayName, productData.image, productData.price, productData.productType, productData.active, productData.id]);
  }

  createProduct(productData: RobustProductData): Promise<boolean> {
    return databaseManager.run(`INSERT INTO Products (productType, displayName, price, image, active) VALUES (?, ?, ?, ?, ?)`,
      [productData.productType, productData.displayName, productData.price, productData.image, productData.active]);
  }
}

const productManager: ProductManager = new ProductManager();
export default productManager;