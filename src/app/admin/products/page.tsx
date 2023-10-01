import { Metadata } from "next";
import { ProductViewer } from "./productViewer";
import productManager from "../../../productManager";
import { ProductType, RobustProductData } from "../../../productTypes";

export const metadata: Metadata = {
  title: "Products",
  description: "Admin Panel Products"
};

export default async function Page() {
  const products: RobustProductData[] = await productManager.getProducts();
  const productTypes: ProductType[] = await productManager.getProductTypes();

  return (
    <ProductViewer
      initialProducts={products}
      productTypes={productTypes} />
  );
}