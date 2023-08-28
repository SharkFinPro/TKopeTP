"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cart } from "../../tools/cart";
import { ProductData } from "../../../../productTypes";
import productsStyles from "../../stylesheets/products.module.css";
import loadingImage from "../../../../../public/images/NOT_FOUND.png";

export function Product({ productData, processCDN }: { productData: ProductData, processCDN: undefined | string }) {
  const [imageData, setImageData] = useState<StaticImageData | string>(loadingImage);
  const [count, setCount] = useState(0);

  const hostname: string = typeof window !== "undefined"
    ? window.location.hostname
    : "localhost";
  const cdn: string = processCDN || `http://${hostname}:3000`;

  useEffect((): void => {
    cart.createListing(productData);
    setCount(cart.getCount(productData.id));

    if (productData.image) {
      fetch(`${cdn}/images/${productData.image}`, { mode: "no-cors" }).then((): void => {
        setImageData(`${cdn}/images/${productData.image}`);
      }).catch((err): void => {
        console.log(err);
      });
    }
  }, [productData, cdn]);

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
    <div className={productsStyles.product}>
      <div className={productsStyles.image}>
        <Image
        src={imageData}
        alt="Product Image"
        width={300}
        height={168.75}
        />
      </div>
      <p className={productsStyles.name}>{productData.displayName} - ${productData.price}</p>
      <div className={productsStyles.purchase}>
        <button className={`${productsStyles.option} ${productsStyles.left}`} type="button" onClick={subFromCart}>-</button>
        <p className={productsStyles.display}>{count}</p>
        <button className={`${productsStyles.option} ${productsStyles.right}`} type="button" onClick={addToCart}>+</button>
      </div>
    </div>
  );
}