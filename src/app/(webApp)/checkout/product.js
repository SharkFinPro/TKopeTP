import checkoutStyles from "../stylesheets/checkout.module.css";

export default function Product({ productData }) {
    return <tr>
        <td>{productData.displayName} - ${productData.price}</td>
        <td>{productData.count}</td>
    </tr>
};