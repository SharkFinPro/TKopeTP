"use client";
import { Component } from 'react';
import Footer from "./footer";

import cart from "../tools/cart.js";
import Product from "./product.js";

import "../stylesheets/wrapper.css";
import "../stylesheets/checkout.css";

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
            <div className="content">
                <div className="cartDisplay" id="cartDisplay">
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </div>
                <div className="paymentInfo">
                    <div className="total" id="total">Total: {this.state.total}</div>
                    <div className="paymentTypeSelection">
                        <p><a className="paymentType" id={this.state.paymentMethod === "cash" ? "selected" : ""} onClick={() => {this.setPaymentMethod( "cash")}}>Cash</a></p>
                        <p><a className="paymentType" id={this.state.paymentMethod === "card" ? "selected" : ""} onClick={() => {this.setPaymentMethod( "card")}}>Card</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>;
    }
}