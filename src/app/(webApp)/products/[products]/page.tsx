import { Product, ProductData } from "./product";
import Footer from "../../footer";
import { Metadata } from "next";
import "../../stylesheets/superWrapper.css";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";
import productManager from "../../../../productManager.mjs";

export const metadata: Metadata = {
    title: "Products",
    description: "Product Selection"
};

export default async function Page({ params }: {params: { products: string }})  {
    let products: ProductData[] = [];
    if (params.products !== "%5Bproducts%5D")
        products = await productManager.getProductsByType(params.products);

    return <>
        <header className={wrapperStyles.header}>
            <h1>Products</h1>
        </header>
        <div className={wrapperStyles.content}>
            <div className={productsStyles.products}>
                {Object.keys(products).map((product: string) => <Product key={product} productData={products.at(+product) as ProductData} />)}
            </div>
        </div>
        <Footer />
    </>
}