var productTypes = JSON.parse(getRequest("productTypes"));

var categories = [];
for (var type in productTypes) {
    categories.push(React.createElement(
        "p",
        null,
        React.createElement(
            "a",
            { href: "products.html?variant=" + type },
            productTypes[type]
        )
    ));
}
var root = ReactDOM.createRoot(document.getElementById("categories"));
root.render(categories);