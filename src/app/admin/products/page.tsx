import { Metadata } from "next";
import { ProductViewer } from "./productViewer";
import { getProducts, getProductTypes } from "../../../productManager";
import { ProductType, RobustProductData } from "../../../productTypes";

export const metadata: Metadata = {
  title: "Products",
  description: "Admin Panel Products"
};

export default async function Page() {
  const products: RobustProductData[] = await getProducts();
  const productTypes: ProductType[] = await getProductTypes();

  return (
    <ProductViewer
      initialProducts={products}
      productTypes={productTypes} />
  );
}