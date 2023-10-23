import databaseManager from "./databaseManager";
import { ProductData, ProductType, RobustProductData } from "./productTypes";

export const getProductsByType = (type: string, active: boolean = false): Promise<ProductData[]> => {
  return databaseManager.all("SELECT productType, displayName, price, image, id FROM Products WHERE productType=? AND active=?",
    [type, active]);
}

export const getProducts = (): Promise<RobustProductData[]> => {
  return databaseManager.all("SELECT * FROM Products");
}

export const getProduct = (productID: string): Promise<ProductData> => {
  return databaseManager.get("SELECT productType, displayName, price, image, id FROM Products WHERE id=?",
    [productID]);
}

export const getProductTypes = (): Promise<ProductType[]> => {
  return databaseManager.all("SELECT * FROM ProductTypes");
}

export const updateProduct = (productData: RobustProductData): Promise<boolean> => {
  return databaseManager.run("UPDATE Products SET displayName=?, image=?, price=?, productType=?, active=? WHERE id=?",
    [productData.displayName, productData.image, productData.price, productData.productType, productData.active, productData.id]);
}

export const createProduct = (productData: RobustProductData): Promise<boolean> => {
  return databaseManager.run("INSERT INTO Products (productType, displayName, price, image, active) VALUES (?, ?, ?, ?, ?)",
    [productData.productType, productData.displayName, productData.price, productData.image, productData.active]);
}