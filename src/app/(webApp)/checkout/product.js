export default function Product({ productData }) {
    return (
        <div className="cartItem">
            <p className="name">{productData.displayName} - ${productData.price}</p>
            <p className="count">{productData.count}</p>
        </div>
    );
};