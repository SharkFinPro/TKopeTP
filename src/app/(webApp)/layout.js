import "./stylesheets/wrapper.css";
import Link from "next/link";

export default ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body>
                <div className="header">
                    <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
                </div>
                {children}
                <div className="footer">
                    <Link href="/checkout">Checkout</Link>
                </div>
            </body>
        </html>
    );
}