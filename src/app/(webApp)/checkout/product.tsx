import { ProductData } from "../../../productTypes";

export default function Product({ productData }: { productData: ProductData }) {
  return (
    <tr>
      <td>{productData.displayName} - ${productData.price}</td>
      <td>{productData.count}</td>
    </tr>
  );
}