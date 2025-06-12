import Footer from "@/components/Footer";
import ProductSquare from "@/components/ProductSquare";
import { Metadata } from "next";
import { getProductsByType, getProductTypes } from "../../../../productManager";
import { ProductData, ProductType } from "../../../../productTypes";
import wrapperStyles from "../../wrapper.module.css";
import productsStyles from "./products.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ products: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  const productTypes: ProductType[] = await getProductTypes();
  const productType: ProductType | undefined = productTypes.find((productType: ProductType): boolean => {
    return productType.id == parseInt(resolvedParams.products);
  });

  return {
    title: `${productType?.displayName} | Products`,
    description: `Product Selection - ${productType?.displayName}`
  };
}

export default async function Page({ params }: { params: Promise<{ products: string }> })  {
  const resolvedParams = await params;

  const products: ProductData[] = await getProductsByType(resolvedParams.products, true);
  
  const productTypes: ProductType[] = await getProductTypes();
  const productType: ProductType | undefined = productTypes.find((productType: ProductType): boolean => {
    return productType.id == parseInt(resolvedParams.products);
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