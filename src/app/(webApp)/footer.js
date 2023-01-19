import Link from "next/link";

import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function Footer() {
    return (
        <div className={wrapperStyles.footer}>
            <Link className={wrapperStyles.footerButton} href="../checkout">Checkout</Link>
        </div>
    );
};