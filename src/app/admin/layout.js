import "./stylesheets/wrapper.css";
import Link from "next/link";
export default ({ children }) => {
    return (
        <html lang="en">
        <head />
        <body>
            <div className="nav-bar">
                <div className="nav-title">
                    <h1>Trading Post | Admin Panel</h1>
                </div>
                <div className="nav-content">
                    <Link className="nav-option" href="admin/">Home</Link>
                    <Link className="nav-option" href="admin/reports">Reports</Link>
                </div>
            </div>
            {children}
        </body>
        </html>
    );
}