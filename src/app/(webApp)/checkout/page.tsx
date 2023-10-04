"use client";
import { useEffect, useState } from "react";
import { cart } from "../../tools/cart";
import { ProductData } from "../../../productTypes";
import checkoutStyles from "./checkout.module.css";

export default function Page() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect((): void => {
    setProducts(cart.getActual());
    setTotal(cart.getTotalPrice());
    setPaymentMethod(cart.getPaymentMethod());
  }, []);

  useEffect((): void => {
    if (paymentMethod) {
      cart.setPaymentMethod(paymentMethod);
    }
  }, [paymentMethod]);

  return <>
    <div className={checkoutStyles.cartDisplayContainer}>
      <table className={checkoutStyles.cartDisplay}>
        <thead>
          <tr>
            <th>Item - Price</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductData) => (
            <tr key={product.id}>
              <td>{product.displayName} - ${product.price}</td>
              <td>{product.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={checkoutStyles.paymentInfo}>
      <p className={checkoutStyles.total}>Total: ${total}</p>
      <div className={checkoutStyles.paymentTypeSelection}>
        <button
          className={paymentMethod === "cash" ? checkoutStyles.selected : ""}
          onClick={() => setPaymentMethod("cash")}>
          Cash
        </button>
        <button
          className={paymentMethod === "card" ? checkoutStyles.selected : ""}
          onClick={() => setPaymentMethod("card")}>
          Card
        </button>
      </div>
    </div>
  </>;
}