import "../stylesheets/checkout.css";

export default () => {
    return (
        <div className="content">
            <div className="cartDisplay" id="cartDisplay">
                {/*{this.state.products}*/}
            </div>
            <div className="paymentInfo">
                {/*<div className="total" id="total">Total: {cart.getTotalPrice()}</div>*/}
                <div className="paymentTypeSelection">
                    {/*<p><a className="paymentType" id={this.state.paymentMethod === "cash" ? "selected" : ""} onClick={() => {this.selectPayment( "cash")}}>Cash</a></p>*/}
                    {/*<p><a className="paymentType" id={this.state.paymentMethod === "card" ? "selected" : ""} onClick={() => {this.selectPayment( "card")}}>Card</a></p>*/}
                </div>
            </div>
        </div>
    );
}