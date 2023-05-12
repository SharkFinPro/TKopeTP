"use client";
import { ProductData } from "../../../productTypes";
import { useEffect, useState } from "react";
import productViewerStyles from "../stylesheets/productViewer.module.css"
import Link from "next/link";

async function loadProducts(): Promise<ProductData[]> {
    const res: Response = await fetch("/api/products");
    return await res.json();
}

function Product({ productData }: { productData: ProductData }) {
    return (
        <tr>
            <td>{productData.id}</td>
            <td>{productData.displayName}</td>
            <td>${productData.price}</td>
            <td><Link href={"/images/" + productData.image} target={"_blank"}>{productData.image}</Link></td>
        </tr>
    );
}

export function ProductViewer() {
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect((): void => {
        loadProducts().then((productData: ProductData[]) => setProducts(productData));
    });

    return <>
        <table className={productViewerStyles.productTable}>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Display Name</td>
                    <td>Price</td>
                    <td>Image</td>
                </tr>
            </thead>
            <tbody>
                {products.map((product: ProductData) => <Product key={product.id} productData={product} />)}
            </tbody>
        </table>
    </>
}