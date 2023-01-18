import Link from "next/link";

import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function Footer() {
    return (
        <div className={wrapperStyles.footer}>
            <Link href="../checkout">Checkout</Link>
        </div>
    );
};