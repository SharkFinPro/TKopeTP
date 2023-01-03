const Header = () => {
    return (
        <div className="header">
            <h1>Checkout</h1>
        </div>
    );
}

class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cartItem">
                <p className="name">{this.props.productData.displayName} - ${this.props.productData.price}</p>
                <p className="count">{this.props.productData.count}</p>
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            paymentMethod: cart.getPaymentMethod()
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        const productsList = cart.getActual();

        let products = [];
        for (let product in productsList) {
            products.push(<Product product={product} productData={productsList[product]} />)
        }

        this.setState({
            products,
            paymentMethod: this.state.paymentMethod
        });
    }

    selectPayment(paymentMethod) {
        this.setState({
            products: this.state.products,
            paymentMethod
        });

        cart.setPaymentMethod(paymentMethod);
    }

    render() {
        return (
            <div className="content">
                <div className="cartDisplay" id="cartDisplay">
                    {this.state.products}
                </div>
                <div className="paymentInfo">
                    <div className="total" id="total">Total: {cart.getTotalPrice()}</div>
                    <div className="paymentTypeSelection">
                        <p><a className="paymentType" id={this.state.paymentMethod === "cash" ? "selected" : ""} onClick={() => {this.selectPayment( "cash")}}>Cash</a></p>
                        <p><a className="paymentType" id={this.state.paymentMethod === "card" ? "selected" : ""} onClick={() => {this.selectPayment( "card")}}>Card</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

class Footer extends React.Component {
    purchase() {
        if (!cart.getPaymentMethod()) {
            return;
        }

        cart.purchase();

        window.location.replace("/");
    }

    render() {
        return (
            <div className="footer">
                <p onClick={this.purchase}><a id="finish">Finish</a></p>
            </div>
        );
    }
}