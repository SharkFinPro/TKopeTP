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
        <footer className={wrapperStyles.footer}>
            <button type="button" className={wrapperStyles.footerButton} onClick={checkout}>Finish</button>
        </footer>
    );
};