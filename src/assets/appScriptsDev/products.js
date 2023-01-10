/* Product Data */
const acceptableProductCategories = JSON.parse(getRequest("/api/productCategories"));
let productCategory = new URLSearchParams(window.location.search).get("variant");

if (!Object.keys(acceptableProductCategories).includes(productCategory)) {
    window.location.replace("/");
}

productCategory = productCategory.toLowerCase();
document.title = `${acceptableProductTypes[productCategory]} | T'Kope TP`;

class Product extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.productData.image) {
            this.props.productData.image = "images/NOT_FOUND.png";
        } else if (!this.props.productData.image.startsWith("images/")) {
            this.props.productData.image = "images/" + this.props.productData.image;
        }

        cart.createListing(this.props.product, this.props.productData);

        this.state = {
            count: cart.getCount(this.props.product)
        };
    }

    subFromCart(product) {
        cart.remove(product);

        this.setState({
            count: cart.getCount(this.props.product)
        });
    }

    addToCart(product) {
        cart.add(product);

        this.setState({
            count: cart.getCount(this.props.product)
        });
    }

    render() {
        return (
            <div className="product">
                <div className="image">
                    <img alt="product image" src={this.props.productData.image}></img>
                </div>
                <div className="name">
                    <p>{this.props.productData.displayName} - ${this.props.productData.price}</p>
                </div>
                <div className="purchase">
                    <button className="purchaseThird option left" onClick={() => this.subFromCart(this.props.product)}>-</button>
                    <div className="purchaseThird display">
                        <p id={this.props.product}>{this.state.count}</p>
                    </div>
                    <button className="purchaseThird option right" onClick={() => this.addToCart(this.props.product)}>+</button>
                </div>
            </div>
        );
    }
}

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

    loadProducts() {
        let productsList = JSON.parse(postRequest("/api/products", productCategory));

        let products = [];
        for (let product in productsList) {
            products.push(<Product product={product} productData={productsList[product]} />)
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