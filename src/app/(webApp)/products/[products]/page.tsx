import Footer from "@/components/Footer";
import ProductSquare from "@/components/ProductSquare";
import { Metadata } from "next";
import { getProductsByType } from "../../../../productManager";
import { ProductData } from "../../../../productTypes";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import wrapperStyles from "../../wrapper.module.css";
import productsStyles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Product Selection"
};

export default async function Page({ params }: {params: { products: string }})  {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const products: ProductData[] = await getProductsByType(params.products, true);

  return <>
    <header className={wrapperStyles.header}>
      <h1>Products</h1>
    </header>
    <div className={wrapperStyles.content}>
      <div className={productsStyles.products}>
        {products.map((product: ProductData) => (
          <ProductSquare
            key={product.id}
            productData={product}/>
        ))}
      </div>
    </div>
    <Footer checkout={false} />
  </>
}