import { Metadata } from "next";
import { Viewer } from "./viewer";
import transactionStyles from "../stylesheets/transactions.module.css";
import Report from "../../../reporting/report";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Admin Panel Transactions"
};

export default function Page() {
  const transactions = new Report("./bin/dump.txt").getTransactions();

  return (
    <div className={transactionStyles.wrapper}>
      <div className={transactionStyles.header}>
        <h1>Transactions</h1>
      </div>
      <Viewer transactions={transactions.reverse()} />
    </div>
  );
}