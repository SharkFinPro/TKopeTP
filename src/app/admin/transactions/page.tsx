import { Metadata } from "next";
import { Viewer } from "./viewer";
import transactionStyles from "../stylesheets/transactions.module.css";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Admin Panel Transactions"
};

export default function Page() {
  return (
    <div className={transactionStyles.wrapper}>
      <div className={transactionStyles.header}>
        <h1>Transactions</h1>
      </div>
      <Viewer />
    </div>
  );
}