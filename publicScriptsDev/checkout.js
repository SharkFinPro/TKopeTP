const products = cart.getActual();

const generateProduct = (product) => {
    let productData = products[product];

    return (
        <div className="cartItem" key={product}>
            <p className="name">{productData.displayName} - ${productData.price}</p>
            <p className="count">{productData.count}</p>
        </div>
    );
};

let productsArray = [];
for (let product in products) {
    productsArray.push(generateProduct(product));
}
productsArray.push((<div key="total" className="total">Total: ${cart.getTotalPrice()}</div>))
const productsRoot = ReactDOM.createRoot(document.getElementById("cartDisplay"));
productsRoot.render(productsArray);

const paymentSelected = (element, paymentType) => {
    let selected = document.getElementById("selected");
    if (selected) {
        selected.setAttribute("id", "");
    }
    element.setAttribute("id", "selected");

    let button = document.getElementById("finish");
    button.setAttribute("href", "/");
    button.setAttribute("onclick", `cart.purchase("${paymentType}")`);
};