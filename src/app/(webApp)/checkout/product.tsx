interface ProductData {
    displayName: string;
    price: string;
    count: string;
}

export default function Product({ productData }: { productData: ProductData }) {
    return (
        <tr>
            <td>{productData.displayName} - ${productData.price}</td>
            <td>{productData.count}</td>
        </tr>
    );
}