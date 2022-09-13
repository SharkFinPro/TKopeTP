const products = JSON.parse(postRequest("products", productType));

const generateProduct = (product, key) => {
    cart.createListing(product);

    let productData = products[product];

    if (!productData.image) {
        productData.image = "images/NOT_FOUND.png";
    }

    return (
        <div className="product" key={key}>
            <div className="image">
                <img alt="product image" src={productData.image}></img>
            </div>
            <div className="name">
                <p>{productData.displayName} - ${productData.price}</p>
            </div>
            <div className="purchase">
                <button className="purchaseThird option left" onClick={()=>{subFromCart(product)}}>-</button>
                <div className="purchaseThird display">
                    <p id={product}>{cart.getCount(product)}</p>
                </div>
                <button className="purchaseThird option right" onClick={()=>{addToCart(product)}}>+</button>
            </div>
        </div>);
};
let productsArray = [];
let productsKeys = Object.keys(products);
for (let i = 0; i < productsKeys.length; i++) {
    productsArray.push(generateProduct(productsKeys[i], i));
}
const productsRoot = ReactDOM.createRoot(document.getElementById("products"));
productsRoot.render(productsArray);

const subFromCart = (product) => {
    cart.remove(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

const addToCart = (product) => {
    cart.add(product);

    document.getElementById(product).innerText = cart.getCount(product);
};