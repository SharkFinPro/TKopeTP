const getProducts = async (type) => {
    let products = await fetch(`http://localhost/api/products/${type}`);

    return products.json();
};

export default async ({ params, searchParams }) => {
    const products = await getProducts(params.products);

    return (
        <div className="content">
            <div className="content-display">

            </div>
        </div>
    );
};