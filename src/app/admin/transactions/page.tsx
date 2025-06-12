import { Metadata } from "next";
import { Viewer } from "./viewer";
import Report from "../../../reporting/report";
import transactionStyles from "./transactions.module.css";

export const dynamic = "force-dynamic";

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
      <Viewer transactions={JSON.stringify(transactions.reverse())} />
    </div>
  );
}