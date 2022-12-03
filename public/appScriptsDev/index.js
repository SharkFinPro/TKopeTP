const productTypes = JSON.parse(getRequest("/api/productTypes"));

let categories = [];
for (let type in productTypes) {
    categories.push((
        <p><a href={"products?variant=" + type}>{productTypes[type]}</a></p>
    ));
}
const root = ReactDOM.createRoot(document.getElementById("categories"));
root.render(categories);