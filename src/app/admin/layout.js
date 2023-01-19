import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import navBarStyles from "./stylesheets/navBar.module.css";
import Link from "next/link";
export default ({ children }) => {
    return (
        <html lang="en">
        <head />
        <body>
            <div className={wrapperStyles.navBar}>
                <div className={navBarStyles.title}>
                    <h1>Trading Post | Admin Panel</h1>
                </div>
                <div className={navBarStyles.content}>
                    <Link className={navBarStyles.option} href="admin/">Home</Link>
                    <Link className={navBarStyles.option} href="admin/reports">Reports</Link>
                </div>
            </div>
            {children}
        </body>
        </html>
    );
}