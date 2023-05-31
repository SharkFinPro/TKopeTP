"use client";
import { RobustProductData } from "../../../productTypes";
import { useEffect, useState } from "react";
import { ProductEditor } from "./productEditor";
import Link from "next/link";
import productViewerStyles from "../stylesheets/productViewer.module.css"

async function loadProducts(): Promise<RobustProductData[]> {
    const res: Response = await fetch("/api/products");
    return await res.json();
}

function Product({ productData, setCurrentProduct }: { productData: RobustProductData, setCurrentProduct: any }) {
    return (
        <tr onClick={() => setCurrentProduct(productData)}>
            <td>{productData.id}</td>
            <td>{productData.displayName}</td>
            <td>${productData.price}</td>
            <td><Link href={"/images/" + productData.image} target={"_blank"} prefetch={false}>{productData.image}</Link></td>
            <td>{productData.productType}</td>
            <td>{productData.active? "Active" : "Inactive"}</td>
        </tr>
    );
}

export function ProductViewer() {
    const [products, setProducts] = useState<RobustProductData[]>([]);
    const [currentProduct, setCurrentProduct] = useState<RobustProductData | undefined>(undefined);


    useEffect((): void => {
        loadProducts().then((productData: RobustProductData[]) => {
            setProducts([...productData]);
        });
    }, [currentProduct]);

    return <>
        <table className={productViewerStyles.productTable}>
            <thead>
                <tr>
                    <td><strong>ID</strong></td>
                    <td><strong>Display Name</strong></td>
                    <td><strong>Price</strong></td>
                    <td><strong>Image</strong></td>
                    <td><strong>Product Type</strong></td>
                    <td><strong>Active</strong></td>
                </tr>
            </thead>
            <tbody>
                {products.map((product: RobustProductData) => <Product key={product.id} productData={product} setCurrentProduct={setCurrentProduct} />)}
            </tbody>
        </table>
        <ProductEditor productData={currentProduct} setProductData={setCurrentProduct} />
    </>;
}