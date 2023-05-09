"use client";
import { useEffect, useState } from 'react';
import Product from "./product";
import Footer from "./footer";
import { cart, ProductData } from "../tools/cart.tsx";
import "../stylesheets/superWrapper.css";
import wrapperStyles from "../stylesheets/wrapper.module.css";
import checkoutStyles from "../stylesheets/checkout.module.css";

export default function Page() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        setProducts(cart.getActual());
        setTotal(cart.getTotalPrice());
        setPaymentMethod(cart.getPaymentMethod());
    }, []);

    useEffect(() => {
        if (paymentMethod) {
            cart.setPaymentMethod(paymentMethod);
        }
    }, [paymentMethod]);

    return <>
        <header className={wrapperStyles.header}>
            <h1>Checkout</h1>
        </header>
        <div className={wrapperStyles.content}>
            <table className={checkoutStyles.cartDisplay}>
                <thead>
                    <tr>
                        <th>Item - Price</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                <tbody>
                    {Object.keys(products).map((product) => <Product key={product} productData={products[product]} />)}
                </tbody>
            </table>
            <div className={checkoutStyles.paymentInfo}>
                <p className={checkoutStyles.total}>Total: ${total}</p>
                <div className={checkoutStyles.paymentTypeSelection}>
                    <button className={paymentMethod === "cash" ? checkoutStyles.selected : ""} onClick={() => setPaymentMethod("cash")}>Cash</button>
                    <button className={paymentMethod === "card" ? checkoutStyles.selected : ""} onClick={() => setPaymentMethod("card")}>Card</button>
                </div>
            </div>
        </div>
        <Footer />
    </>
}