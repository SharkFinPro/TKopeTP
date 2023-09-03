"use client";
import { ProductType, RobustProductData } from "../../../productTypes";
import { useEffect, useState } from "react";
import { ProductEditor } from "./productEditor";
import { getRequest } from "../../tools/requests";
import Link from "next/link";
import productViewerStyles from "../stylesheets/productViewer.module.css"

async function loadProducts(): Promise<RobustProductData[]> {
  const res: Response = await fetch("/api/products");
  return await res.json();
}

export function ProductViewer({ processCDN }: { processCDN: undefined | string }) {
  const [products, setProducts] = useState<RobustProductData[]>([]);
  const [currentProduct, setCurrentProduct] = useState<RobustProductData | undefined | null>(undefined);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  useEffect((): void => {
    getRequest("/api/productCategories").then((types: ProductType[]) => setProductTypes(types));

    loadProducts().then((productData: RobustProductData[]) => {
      setProducts(productData);
    });
  }, [currentProduct]);

  const hostname: string = typeof window !== "undefined"
    ? window.location.hostname
    : "localhost";
  const cdn: string = processCDN || `http://${hostname}:3000`;

  return (
    <div className={productViewerStyles.wrapper}>
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
          {products.map((productData: RobustProductData) => (
            <tr onClick={() => setCurrentProduct(productData)} key={productData.id}>
              <td>{productData.id}</td>
              <td>{productData.displayName}</td>
              <td>${productData.price}</td>
              <td><Link href={`${cdn}/images/${productData.image}`} target={"_blank"} prefetch={false}>{productData.image}</Link></td>
              <td>{
                productTypes ?
                  productTypes.find((type: ProductType) => type.id == productData.productType)?.displayName :
                  productData.productType
              }</td>
              <td style={{
                color: productData.active ? "#198754" : "#CC0000"
              }}>{productData.active? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={productViewerStyles.options}>
        <button onClick={() => setCurrentProduct(null)}>Add New</button>
      </div>
      <ProductEditor productData={currentProduct} setCurrentProduct={setCurrentProduct} />
    </div>
  );
}