"use client";
import "../stylesheets/checkout.css";
import { useState } from 'react';

export default () => {
    const [paymentMethod, setPaymentMethod] = useState("");

    return (
        <div className="content">
            <div className="cartDisplay" id="cartDisplay">
                {/*{this.state.products}*/}
            </div>
            <div className="paymentInfo">
                {/*<div className="total" id="total">Total: {cart.getTotalPrice()}</div>*/}
                <div className="paymentTypeSelection">
                    <p><a className="paymentType" id={paymentMethod === "cash" ? "selected" : ""} onClick={() => {setPaymentMethod( "cash")}}>Cash</a></p>
                    <p><a className="paymentType" id={paymentMethod === "card" ? "selected" : ""} onClick={() => {setPaymentMethod( "card")}}>Card</a></p>
                </div>
            </div>
        </div>
    );
}