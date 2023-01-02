/* Product Data */
const acceptableProductTypes = JSON.parse(getRequest("/api/productTypes"));
let productType = new URLSearchParams(window.location.search).get("variant");

if (!Object.keys(acceptableProductTypes).includes(productType)) {
    window.location.replace("/");
}

productType = productType.toLowerCase();


class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    subFromCart(product) {
        cart.remove(product);

        this.loadProducts();
    }

    addToCart(product) {
        cart.add(product);

        this.loadProducts();
    }

    generateProduct(product, productData) {
        if (!productData.image) {
            productData.image = "images/NOT_FOUND.png";
        } else if (!productData.image.startsWith("images/")) {
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
                    <button className="purchaseThird option left" onClick={() => this.subFromCart(product)}>-</button>
                    <div className="purchaseThird display">
                        <p id={product}>{cart.getCount(product)}</p>
                    </div>
                    <button className="purchaseThird option right" onClick={() => this.addToCart(product)}>+</button>
                </div>
            </div>
        );
    }

    loadProducts() {
        let productsList = JSON.parse(postRequest("/api/products", productType));

        let products = [];
        for (let product in productsList) {
            products.push(this.generateProduct(product, productsList[product]));
        }

        this.setState({ products });
    }

    render() {
        return (
            <div className="content">
                <div className="products">
                    {this.state.products}
                </div>
            </div>
        );
    }
}