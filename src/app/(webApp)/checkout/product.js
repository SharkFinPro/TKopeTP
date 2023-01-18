import checkoutStyles from "../stylesheets/checkout.module.css";

export default function Product({ productData }) {
    return (
        <div className={checkoutStyles.cartItem}>
            <p className={checkoutStyles.name}>{productData.displayName} - ${productData.price}</p>
            <p className={checkoutStyles.count}>{productData.count}</p>
        </div>
    );
};