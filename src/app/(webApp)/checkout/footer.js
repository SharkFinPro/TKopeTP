"use client";
import cart from "../tools/cart.js";
import { useRouter } from "next/navigation";

import wrapperStyles from "../stylesheets/wrapper.module.css";

export default function Footer() {
    const router = useRouter();
    const checkout = () => {
        if (cart.getPaymentMethod()) {
            cart.purchase().then(() => {
                router.push("/");
            });
        }
    };

    return (
        <div className={wrapperStyles.footer}>
            <a onClick={checkout}>Finish</a>
        </div>
    );
};