import Link from "next/link";
import React from "react";
import navBarStyles from "./stylesheets/navBar.module.css";

function Links() {
  return <>
    <Link href="/admin/">Home</Link>
    <Link href="/admin/reports">Reports</Link>
    <Link href="/admin/products">Products</Link>
    <Link href="/admin/transactions">Transactions</Link>
  </>
}

function SmallMenu() {
  return (
    <div className={navBarStyles.smallContent}>
      <div className={navBarStyles.smallContentOptions}>
        <Links />
      </div>
      <span className={navBarStyles.smallContentHeader}>☰</span>
    </div>
  );
}

export function NavBar() {
  return (
    <div className={navBarStyles.wrapper}>
      <div className={navBarStyles.title}>
        <h1><span className={navBarStyles.extraTitle}>Trading Post | </span>Admin Panel</h1>
      </div>
      <div className={navBarStyles.content}>
        <Links />
      </div>
      <SmallMenu />
    </div>
  );
}