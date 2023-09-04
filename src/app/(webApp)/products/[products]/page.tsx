import { Product } from "./product";
import Footer from "../../footer";
import { Metadata } from "next";
import productManager from "../../../../productManager";
import { ProductData } from "../../../../productTypes";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Product Selection"
};

export default async function Page({ params }: {params: { products: string }})  {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const products: ProductData[] = await productManager.getProductsByType(params.products, true);

  return <>
    <header className={wrapperStyles.header}>
      <h1>Products</h1>
    </header>
    <div className={wrapperStyles.content}>
      <div className={productsStyles.products}>
        {products.map((product: ProductData) => (
          <Product
            key={product.id}
            productData={product}
            processCDN={process.env.cdn}
          />
        ))}
      </div>
    </div>
    <Footer />
  </>
}