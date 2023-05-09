"use client";
import { cart } from "../tools/cart";
import { useRouter } from "next/navigation";
import wrapperStyles from "../stylesheets/wrapper.module.css";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function Footer() {
    const router: AppRouterInstance = useRouter();

    function checkout(): void {
        if (cart.getPaymentMethod()) {
            cart.purchase().then((): void => {
                router.push("/");
            });
        }
    }

    return (
        <footer className={wrapperStyles.footer}>
            <button type="button" className={wrapperStyles.footerButton} onClick={checkout}>Finish</button>
        </footer>
    );
};