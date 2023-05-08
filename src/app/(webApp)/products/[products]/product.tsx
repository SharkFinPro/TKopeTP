"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import cart from "../../tools/cart.js";
import productsStyles from "../../stylesheets/products.module.css";
import loadingImage from "../../../../../public/images/NOT_FOUND.png";

export interface ProductData {
    count: Number;
    displayName: string;
    id: string;
    image: string;
    price: string;
    productType: Number;
}

export function Product({ productData }: { productData: ProductData }) {
    const [imageData, setImageData] = useState(loadingImage);
    const [count, setCount] = useState(0);

    useEffect((): void => {
        cart.createListing(productData);
        setCount(cart.getCount(productData.id));

        if (productData.image) {
            import("../../../../../public/images/" + productData.image).then((data) => setImageData(data));
        }
    }, []);

    function subFromCart(): void {
        if (cart.remove(productData.id)) {
            setCount(count - 1);
        }
    }

    function addToCart(): void {
        cart.add(productData.id);
        setCount(count + 1);
    }

    return <div className={productsStyles.product}>
        <div className={productsStyles.image}>
            <Image
                src={imageData}
                alt="Product Image"
            />
        </div>
        <p className={productsStyles.name}>{productData.displayName} - ${productData.price}</p>
        <div className={productsStyles.purchase}>
            <button className={`${productsStyles.option} ${productsStyles.left}`} type="button" onClick={subFromCart}>-</button>
            <p className={productsStyles.display} id={productData.id}>{count}</p>
            <button className={`${productsStyles.option} ${productsStyles.right}`} type="button" onClick={addToCart}>+</button>
        </div>
    </div>
}