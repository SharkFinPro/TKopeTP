"use client";
import { Component } from 'react';
import Product from "./product.js";
import cart from "../tools/cart.js";
import wrapperStyles from "../stylesheets/wrapper.module.css";
import checkoutStyles from "../stylesheets/checkout.module.css";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            paymentMethod: "",
            products: {}
        };
    }

    componentDidMount() {
        this.setState({
            total: cart.getTotalPrice(),
            paymentMethod: cart.getPaymentMethod(),
            products: cart.getActual()
        });
    }

    setPaymentMethod(method) {
        cart.setPaymentMethod(method);

        this.setState({
            paymentMethod: cart.getPaymentMethod()
        });
    }

    render() {
        return <>
            <div className={wrapperStyles.content}>
                <table className={checkoutStyles.cartDisplay}>
                    <tr>
                        <th className={checkoutStyles.name}>Item - Price</th>
                        <th className={checkoutStyles.count}>Count</th>
                    </tr>
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </table>
                <div className={checkoutStyles.paymentInfo}>
                    <div className={checkoutStyles.total}>Total: ${this.state.total}</div>
                    <div className={checkoutStyles.paymentTypeSelection}>
                        <button className={this.state.paymentMethod === "cash" ? checkoutStyles.selected : ""} onClick={() => {this.setPaymentMethod( "cash")}}>Cash</button>
                        <button className={this.state.paymentMethod === "card" ? checkoutStyles.selected : ""} onClick={() => {this.setPaymentMethod( "card")}}>Card</button>
                    </div>
                </div>
            </div>
        </>;
    }
}