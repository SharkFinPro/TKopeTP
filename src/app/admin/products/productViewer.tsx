"use client";
import { ProductType, RobustProductData } from "../../../productTypes";
import { useEffect, useState } from "react";
import { ProductEditor } from "./productEditor";
import { getRequest } from "../../tools/requests";
import Link from "next/link";
import productViewerStyles from "../stylesheets/productViewer.module.css";

export function ProductViewer({
  initialProducts,
  productTypes
}: {
  initialProducts: RobustProductData[],
  productTypes: ProductType[]
}) {
  const [products, setProducts] = useState<RobustProductData[]>(initialProducts);
  const [currentProduct, setCurrentProduct] = useState<RobustProductData | undefined | null>(undefined);

  useEffect((): void => {
    getRequest("/api/products").then((productData: RobustProductData) => setProducts(productData));
  }, [currentProduct]);

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
              <td>
                <Link
                  href={`../api/images/${productData.image}`}
                  target={"_blank"}
                  prefetch={false}>
                  {productData.image}
                </Link>
              </td>
              <td>{
                productTypes.length ?
                  productTypes.find((type: ProductType): boolean => type.id == productData.productType)?.displayName :
                  productData.productType
              }</td>
              <td
                style={{
                  color: productData.active ? "#198754" : "#CC0000"
                }}>
                {productData.active ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={productViewerStyles.options}>
        <button onClick={() => setCurrentProduct(null)}>Add New</button>
      </div>
      {currentProduct !== undefined && (
        <ProductEditor
          productData={currentProduct}
          productCategories={productTypes}
          onClose={() => setCurrentProduct(undefined)}
        />
      )}
    </div>
  );
}