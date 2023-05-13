import navBarStyles from "./stylesheets/navBar.module.css";
import Link from "next/link";
import React from "react";

export function NavBar() {
    return (
        <div className={navBarStyles.wrapper}>
            <div className={navBarStyles.title}>
                <h1>Trading Post | Admin Panel</h1>
            </div>
            <div className={navBarStyles.content}>
                <Link href="/admin/">Home</Link>
                <Link href="/admin/reports">Reports</Link>
                <Link href="/admin/products">Products</Link>
            </div>
        </div>
    );
}