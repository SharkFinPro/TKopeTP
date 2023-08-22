"use client";
import { useEffect, useState } from "react";
import { getRequest } from "../../tools/requests";
import transactionsStyles from "../stylesheets/transactions.module.css";

function Transaction({ data }: { data: any }) {
  const cart = JSON.parse(data.cart);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    console.log(expanded);
  }, [expanded]);

  return (
    <div className={transactionsStyles.transaction} onClick={() => setExpanded(!expanded)}>
      <p><span className={transactionsStyles.transactionHeader}>Items:</span> {cart.length}</p>
      <div className={transactionsStyles.transactionItems}>
        {expanded && cart.map((item: any) => (
          <p key={item.displayName}>- {item.displayName}</p>
        ))}
      </div>
      <p><span className={transactionsStyles.transactionHeader}>Payment Method:</span> {data.paymentMethod}</p>
      <p><span className={transactionsStyles.transactionHeader}>Total Money:</span> ${data.totalMoney}</p>
      <p><span className={transactionsStyles.transactionHeader}>Time:</span> {new Date(data.time).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}</p>
    </div>
  )
}

export function Viewer() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getRequest("/api/admin/reporting/transactions").then((transactionsData) => setTransactions(transactionsData));
  }, []);

  return (
    <div className={transactionsStyles.transactions}>
      {transactions.map((transaction: any) => <Transaction data={transaction} key={transaction.time} />)}
    </div>
  )
}