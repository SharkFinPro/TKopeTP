"use client";
import { useEffect, useState } from "react";
import { cart } from "../../tools/cart";
import { ProductData } from "../../../productTypes";
import productSquareStyles from "./ProductSquare.module.css";

export function ProductCounter({
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
  )
}