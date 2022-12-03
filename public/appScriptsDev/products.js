/* Cart Setup */
const subFromCart = (product) => {
    cart.remove(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

const addToCart = (product) => {
    cart.add(product);

    document.getElementById(product).innerText = cart.getCount(product);
};


/* Product Setup */
const acceptableProductTypes = JSON.parse(getRequest("/api/productTypes"));

let productType = new URLSearchParams(window.location.search).get('variant');

if (!Object.keys(acceptableProductTypes).includes(productType)) {
    window.location.replace("/");
}

document.getElementById("header").innerText = acceptableProductTypes[productType];
document.title = `T'Kope TP - ${acceptableProductTypes[productType]}`;

productType = productType.toLowerCase();

const products = JSON.parse(postRequest("/api/products", productType));

const generateProduct = (product) => {
    let productData = products[product];
    if (!productData.image) {
        productData.image = "images/NOT_FOUND.png";
    } else {
        productData.image = "images/" + productData.image;
    }

    cart.createListing(product, productData);

    return (
        <div className="product" key={product}>
            <div className="image">
                <img alt="product image" src={productData.image}></img>
            </div>
            <div className="name">
                <p>{productData.displayName} - ${productData.price}</p>
            </div>
            <div className="purchase">
                <button className="purchaseThird option left" onClick={() => subFromCart(product)}>-</button>
                <div className="purchaseThird display">
                    <p id={product}>{cart.getCount(product)}</p>
                </div>
                <button className="purchaseThird option right" onClick={() => addToCart(product)}>+</button>
            </div>
        </div>);
};

let productsArray = [];
for (let product in products) {
    productsArray.push(generateProduct(product));
}
const productsRoot = ReactDOM.createRoot(document.getElementById("products"));
productsRoot.render(productsArray);