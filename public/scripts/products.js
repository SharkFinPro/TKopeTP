var acceptableProductTypes = ["Candy", "Drinks", "Patches", "Lodge", "National"];

var urlParams = new URLSearchParams(window.location.search);
var productType = urlParams.get('variant');

if (!acceptableProductTypes.includes(productType)) {
    window.location.replace("/");
}

document.getElementById("header").innerText = productType;
document.getElementById("title").innerText = "T'Kope TP - " + productType;

productType = productType.toLowerCase();

var products = JSON.parse(postRequest("products", productType));

var generateProduct = function generateProduct(product) {
    var productData = products[product];
    if (!productData.image) {
        productData.image = "images/NOT_FOUND.png";
    }

    cart.createListing(product, productData);

    return React.createElement(
        "div",
        { className: "product", key: product },
        React.createElement(
            "div",
            { className: "image" },
            React.createElement("img", { alt: "product image", src: productData.image })
        ),
        React.createElement(
            "div",
            { className: "name" },
            React.createElement(
                "p",
                null,
                productData.displayName,
                " - $",
                productData.price
            )
        ),
        React.createElement(
            "div",
            { className: "purchase" },
            React.createElement(
                "button",
                { className: "purchaseThird option left", onClick: function onClick() {
                        subFromCart(product);
                    } },
                "-"
            ),
            React.createElement(
                "div",
                { className: "purchaseThird display" },
                React.createElement(
                    "p",
                    { id: product },
                    cart.getCount(product)
                )
            ),
            React.createElement(
                "button",
                { className: "purchaseThird option right", onClick: function onClick() {
                        addToCart(product);
                    } },
                "+"
            )
        )
    );
};

var productsArray = [];
for (var product in products) {
    productsArray.push(generateProduct(product));
}
var productsRoot = ReactDOM.createRoot(document.getElementById("products"));
productsRoot.render(productsArray);

var subFromCart = function subFromCart(product) {
    cart.remove(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

var addToCart = function addToCart(product) {
    cart.add(product);

    document.getElementById(product).innerText = cart.getCount(product);
};