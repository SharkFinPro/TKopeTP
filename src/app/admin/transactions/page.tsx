import { Metadata } from "next";
import { headers } from "next/headers";
import { Viewer } from "./viewer";
import Report from "../../../reporting/report";
import transactionStyles from "../stylesheets/transactions.module.css";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Admin Panel Transactions"
};

export default function Page() {
  const headersList = headers(); // Opt in to dynamic rendering
  const transactions = new Report("./bin/dump.txt").getTransactions();

  return (
    <div className={transactionStyles.wrapper}>
      <div className={transactionStyles.header}>
        <h1>Transactions</h1>
      </div>
      <Viewer transactions={JSON.stringify(transactions.reverse())} />
    </div>
  );
}