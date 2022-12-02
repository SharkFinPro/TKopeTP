/* Cart Setup */
var subFromCart = function subFromCart(product) {
    cart.remove(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

var addToCart = function addToCart(product) {
    cart.add(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

/* Product Setup */
var acceptableProductTypes = {
    1: "Snacks & Drinks",
    2: "Patches",
    3: "Lodge",
    4: "National"
};

var productType = new URLSearchParams(window.location.search).get('variant');

if (!Object.keys(acceptableProductTypes).includes(productType)) {
    window.location.replace("/");
}

document.getElementById("header").innerText = acceptableProductTypes[productType];
document.title = "T'Kope TP - " + acceptableProductTypes[productType];

productType = productType.toLowerCase();

var products = JSON.parse(postRequest("products", productType));

var generateProduct = function generateProduct(product) {
    var productData = products[product];
    if (!productData.image) {
        productData.image = "images/NOT_FOUND.png";
    } else {
        productData.image = "images/" + productData.image;
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
                        return subFromCart(product);
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
                        return addToCart(product);
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