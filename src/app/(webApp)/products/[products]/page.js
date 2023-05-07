import Product from "./product.js";
import Footer from "../../footer";
import "../../stylesheets/superWrapper.css";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";
import productManager from "../../../../productManager.mjs";

export const metadata = {
    title: "Products",
    description: "Product Selection"
};

export default async function Page({ params })  {
    let products = {};
    if (params.products !== "%5Bproducts%5D")
        products = await productManager.getProductsByType(params.products);

    return <>
        <header className={wrapperStyles.header}>
            <h1>Products</h1>
        </header>
        <div className={wrapperStyles.content}>
            <div className={productsStyles.products}>
                {Object.keys(products).map((product) => <Product key={product} productData={products[product]} />)}
            </div>
        </div>
        <Footer />
    </>
}