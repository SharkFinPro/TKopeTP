var products = cart.getActual();

var generateProduct = function generateProduct(product) {
    var productData = products[product];

    return React.createElement(
        "div",
        { className: "cartItem", key: product },
        React.createElement(
            "p",
            { className: "name" },
            productData.displayName,
            " - $",
            productData.price
        ),
        React.createElement(
            "p",
            { className: "count" },
            productData.count
        )
    );
};

var productsArray = [];
for (var product in products) {
    productsArray.push(generateProduct(product));
}
var productsRoot = ReactDOM.createRoot(document.getElementById("cartDisplay"));
productsRoot.render(productsArray);

document.getElementById("total").innerText = "Total: " + cart.getTotalPrice();

var paymentSelected = function paymentSelected(element, paymentType) {
    var selected = document.getElementById("selected");
    if (selected) {
        selected.setAttribute("id", "");
    }
    element.setAttribute("id", "selected");

    var button = document.getElementById("finish");
    button.setAttribute("href", "/");
    button.setAttribute("onclick", "cart.purchase(\"" + paymentType + "\")");
};