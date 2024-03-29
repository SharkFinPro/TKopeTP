"use client";
import { ProductType, RobustProductData } from "../../../productTypes";
import { useEffect, useState } from "react";
import ProductEditor from "@/components/ProductEditor";
import { getRequest } from "../../tools/requests";
import Link from "next/link";
import productViewerStyles from "./productViewer.module.css";

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
    getRequest("/api/products").then((productData: RobustProductData[]) => setProducts(productData));
  }, [currentProduct]);

  return (
    <div className={productViewerStyles.wrapper}>
      <table className={productViewerStyles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Display Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Product Type</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((productData: RobustProductData) => (
            <tr onClick={() => setCurrentProduct(productData)} key={productData.id}>
              <td>{productData.id}</td>
              <td>{productData.displayName}</td>
              <td>${productData.price}</td>
              <td>
                {productData.image && <Link
                  href={`../api/images/get/${productData.image}`}
                  target={"_blank"}
                  prefetch={false}>
                  {productData.image}
                </Link>}
              </td>
              <td>{
                productTypes.length ?
                  productTypes.find((type: ProductType): boolean => type.id == productData.productType)?.displayName :
                  productData.productType
              }</td>
              <td
                style={{
                  color: productData.active ? "#0A551E" : "#960000"
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