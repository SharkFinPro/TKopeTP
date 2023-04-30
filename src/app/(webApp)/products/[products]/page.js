import Product from "./product.js";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";
import productManager from "../../../../productManager.mjs";

export default async ({ params }) => {
    let products = {};
    if (params.products !== "%5Bproducts%5D")
        products = await productManager.getProductsByType(params.products);

    return <div className={wrapperStyles.content}>
        <div className={productsStyles.products}>
            {Object.keys(products).map((product) => <Product key={product} productData={products[product]} />)}
        </div>
    </div>
}