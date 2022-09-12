const products = JSON.parse(postRequest("products", productType));

const generateProduct = (product) => {
    cart.createListing(product);

    let productData = products[product];

    if (!productData.image) {
        productData.image = "images/NOT_FOUND.png";
    }

    return '<div class="product">' +
        '<div class="image">' +
            `<img alt="product image" src="${productData.image}">` +
        '</div>' +
        '<div class="name">' +
            `<p>${productData.displayName} - $${productData.price}</p>` +
        '</div>' +
        '<div class="purchase">' +
            `<button class="purchaseThird option left" onclick="subFromCart('${product}')">-</button>` +
            '<div class="purchaseThird display">' +
                `<p id="${product}">${cart.getCount(product)}</p>` +
            '</div>' +
            `<button class="purchaseThird option right" onclick="addToCart('${product}')">+</button>` +
        '</div>' +
        '</div>';
};

for (let product in products)
{
    document.getElementById("products").innerHTML = document.getElementById("products").innerHTML + generateProduct(product);
}

const subFromCart = (product) => {
    cart.remove(product);

    document.getElementById(product).innerText = cart.getCount(product);
};

const addToCart = (product) => {
    cart.add(product);

    document.getElementById(product).innerText = cart.getCount(product);
};