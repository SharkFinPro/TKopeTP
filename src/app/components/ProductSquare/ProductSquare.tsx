import { ProductData } from "../../../productTypes";
import { ProductCounter } from "./ProductCounter";
import Image from "next/image";
import loadingImage from "../../../../public/images/NOT_FOUND.png";
import productSquareStyles from "./ProductSquare.module.css";

export default function ProductSquare ({
  productData
} : {
  productData: ProductData
}) {
  return (
    <div className={productSquareStyles.product}>
      <Image
        src={productData.image ? `/api/images/get/${productData.image}` : loadingImage}
        alt="Product Image"
        width={320}
        height={180}
      />
      <p className={productSquareStyles.name}>
        {productData.displayName} - ${productData.price}
      </p>
      <ProductCounter productData={productData} />
    </div>
  );
}