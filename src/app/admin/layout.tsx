import React from "react";
import Link from "next/link";
import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import navBarStyles from "./stylesheets/navBar.module.css";

export default ({ children }: { children: React.ReactNode}) => {
    return <>
        <div className={wrapperStyles.navBar}>
            <div className={navBarStyles.title}>
                <h1>Trading Post | Admin Panel</h1>
            </div>
            <div className={navBarStyles.content}>
                <Link href="admin/">Home</Link>
                <Link href="admin/reports">Reports</Link>
            </div>
        </div>
        {children}
    </>
}