import cart from "../tools/cart.js";
import { useRouter } from "next/navigation";

import wrapperStyles from "../stylesheets/wrapper.module.css";

export default function Footer() {
    const router = useRouter();
    const checkout = () => {
        if (!cart.getPaymentMethod()) {
            return;
        }

        cart.purchase();

        router.push("/");
    };

    return (
        <div className={wrapperStyles.footer}>
            <a onClick={checkout}>Finish</a>
        </div>
    );
};