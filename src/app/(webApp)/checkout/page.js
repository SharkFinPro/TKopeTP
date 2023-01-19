"use client";
import { Component } from 'react';
import Product from "./product.js";
import cart from "../tools/cart.js";

import wrapperStyles from "../stylesheets/wrapper.module.css";
import checkoutStyles from "../stylesheets/checkout.module.css";
import validateSession from "../tools/validateSession";

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
        validateSession().then(() => {
            this.setState({
                total: cart.getTotalPrice(),
                paymentMethod: cart.getPaymentMethod(),
                products: cart.getActual()
            });
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
                <div className={checkoutStyles.cartDisplay}>
                    <div className={`${checkoutStyles.cartItemHeader} ${checkoutStyles.cartItem}`}>
                        <p className={checkoutStyles.name}>Item - Price</p>
                        <p className={checkoutStyles.count}>Count</p>
                    </div>
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </div>
                <div className={checkoutStyles.paymentInfo}>
                    <div className={checkoutStyles.total}>Total: ${this.state.total}</div>
                    <div className={checkoutStyles.paymentTypeSelection}>
                        <p><a className={this.state.paymentMethod === "cash" ? checkoutStyles.selected : ""} onClick={() => {this.setPaymentMethod( "cash")}}>Cash</a></p>
                        <p><a className={this.state.paymentMethod === "card" ? checkoutStyles.selected : ""} onClick={() => {this.setPaymentMethod( "card")}}>Card</a></p>
                    </div>
                </div>
            </div>
        </>;
    }
}