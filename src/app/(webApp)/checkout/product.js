import checkoutStyles from "../stylesheets/checkout.module.css";

export default function Product({ productData }) {
    return (
        <tr>
            <td className={checkoutStyles.name}>{productData.displayName} - ${productData.price}</td>
            <td className={checkoutStyles.count}>{productData.count}</td>
        </tr>
    );
};