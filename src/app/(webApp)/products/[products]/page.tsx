import Footer from "@/components/Footer";
import ProductSquare from "@/components/ProductSquare";
import { Metadata } from "next";
import { getProductsByType, getProductTypes } from "../../../../productManager";
import { ProductData, ProductType } from "../../../../productTypes";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import wrapperStyles from "../../wrapper.module.css";
import productsStyles from "./products.module.css";

export async function generateMetadata({ params }: { params: { products: string }}): Promise<Metadata> {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const productTypes: ProductType[] = await getProductTypes();
  const productType: ProductType | undefined = productTypes.find((productType: ProductType): boolean => {
    return productType.id == parseInt(params.products);
  });

  return {
    title: `${productType?.displayName} | Products`,
    description: `Product Selection - ${productType?.displayName}`
  };
}

export default async function Page({ params }: {params: { products: string }})  {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const products: ProductData[] = await getProductsByType(params.products, true);
  
  const productTypes: ProductType[] = await getProductTypes();
  const productType: ProductType | undefined = productTypes.find((productType: ProductType): boolean => {
    return productType.id == parseInt(params.products);
  });

  return <>
    <header className={wrapperStyles.header}>
      <h1>{productType?.displayName}</h1>
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