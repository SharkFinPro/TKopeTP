import { Metadata } from "next";
import { ProductViewer } from "./productViewer";
import productManager from "../../../productManager";
import { ProductType, RobustProductData } from "../../../productTypes";
import productsStyles from "../stylesheets/products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Admin Panel Products"
};

export default async function Page() {
  const products: RobustProductData[] = await productManager.getProducts();
  const productTypes: ProductType[] = await productManager.getProductTypes();

  return (
    <div className={productsStyles.content}>
      <ProductViewer
        initialProducts={products}
        productTypes={productTypes} />
    </div>
  );
}