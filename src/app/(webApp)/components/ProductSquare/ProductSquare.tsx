"use client";
import { ProductData } from "../../../../productTypes";
import { useEffect, useState } from "react";
import { cart } from "../../tools/cart";
import Image from "next/image";
import loadingImage from "../../../../../public/images/NOT_FOUND.png";
import productSquareStyles from "./ProductSquare.module.css";

export default function ProductSquare ({
  productData
} : {
  productData: ProductData
}) {
  const [count, setCount] = useState(0);

  useEffect((): void => {
    cart.createListing(productData);
    setCount(cart.getCount(productData.id));
  }, [productData]);

  function subFromCart(): void {
    if (cart.remove(productData.id)) {
      setCount(count - 1);
    }
  }

  function addToCart(): void {
    cart.add(productData.id);
    setCount(count + 1);
  }

  return (
    <div className={productSquareStyles.product}>
      <div className={productSquareStyles.image}>
        <Image
          src={productData.image ? `/api/images/get/${productData.image}` : loadingImage}
          alt="Product Image"
          width={300}
          height={168.75}
        />
      </div>
      <p className={productSquareStyles.name}>{productData.displayName} - ${productData.price}</p>
      <div className={productSquareStyles.purchase}>
        <button
          className={productSquareStyles.option}
          type="button"
          onClick={subFromCart}>
          −
        </button>
        <p className={productSquareStyles.display}>{count}</p>
        <button
          className={productSquareStyles.option}
          type="button"
          onClick={addToCart}>
          +
        </button>
      </div>
    </div>
  );
}