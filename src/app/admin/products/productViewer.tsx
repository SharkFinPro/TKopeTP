"use client";
import { RobustProductData} from "../../../productTypes";
import { useEffect, useState } from "react";
import productViewerStyles from "../stylesheets/productViewer.module.css"
import Link from "next/link";

async function loadProducts(): Promise<RobustProductData[]> {
    const res: Response = await fetch("/api/products");
    return await res.json();
}

function Product({ productData }: { productData: RobustProductData }) {
    return (
        <tr>
            <td>{productData.id}</td>
            <td>{productData.displayName}</td>
            <td>${productData.price}</td>
            <td><Link href={"/images/" + productData.image} target={"_blank"}>{productData.image}</Link></td>
            <td>{productData.productType}</td>
            <td>{productData.active? "Yes" : "No"}</td>
        </tr>
    );
}

export function ProductViewer() {
    const [products, setProducts] = useState<RobustProductData[]>([]);

    useEffect((): void => {
        loadProducts().then((productData: RobustProductData[]) => setProducts(productData));
    });

    return <>
        <table className={productViewerStyles.productTable}>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Display Name</td>
                    <td>Price</td>
                    <td>Image</td>
                    <td>Product Type</td>
                    <td>Active</td>
                </tr>
            </thead>
            <tbody>
                {products.map((product: RobustProductData) => <Product key={product.id} productData={product} />)}
            </tbody>
        </table>
    </>
}