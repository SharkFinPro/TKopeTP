import Link from "next/link";
import navBarStyles from "./NavBar.module.css";

function Links() {
  return <>
    <Link href="/admin/">Home</Link>
    <Link href="/admin/reports">Reports</Link>
    <Link href="/admin/products">Products</Link>
    <Link href="/admin/transactions">Transactions</Link>
  </>
}

export default function NavBar() {
  return (
    <div className={navBarStyles.wrapper}>
      <div className={navBarStyles.title}>
        <h1><span className={navBarStyles.extraTitle}>Trading Post | </span>Admin Panel</h1>
      </div>
      <div className={navBarStyles.content}>
        <Links />
      </div>
      <div className={navBarStyles.smallContent}>
        <div className={navBarStyles.smallContentOptions}>
          <Links />
        </div>
        <span className={navBarStyles.smallContentHeader}>☰</span>
      </div>
    </div>
  );
}