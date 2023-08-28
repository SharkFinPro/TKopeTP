"use client";
import { useState } from "react";
import { ProductData } from "../../../productTypes";
import transactionsStyles from "../stylesheets/transactions.module.css";

function Transaction({ data }: { data: any }) {
  const [expanded, setExpanded] = useState(false);
  const cart: ProductData[] = JSON.parse(data.cart);

  let totalItems = 0;
  for (let item of cart) {
    totalItems += item.count || 0;
  }

  return (
    <div className={transactionsStyles.transaction} onClick={() => setExpanded(!expanded)}>
      <p>
        <span className={transactionsStyles.transactionHeader}>Items: </span>
        {totalItems}</p>
      <div className={transactionsStyles.transactionItems}>
        {expanded && cart.map((item: any) => (
          <p key={item.displayName}>- {item.displayName} x {item.count} | ${item.price * item.count}</p>
        ))}
      </div>
      <p>
        <span className={transactionsStyles.transactionHeader}>Payment Method: </span>
        {data.paymentMethod}
      </p>
      <p>
        <span className={transactionsStyles.transactionHeader}>Total Money: </span>
        ${data.totalMoney}
      </p>
      <p>
        <span className={transactionsStyles.transactionHeader}>Time: </span>
        {new Date(data.time).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}
      </p>
    </div>
  );
}

export function Viewer({ transactions }: { transactions: any }) {
  return (
    <div className={transactionsStyles.transactions}>
      {transactions.map((transaction: any) => <Transaction data={transaction} key={transaction.time} />)}
    </div>
  )
}