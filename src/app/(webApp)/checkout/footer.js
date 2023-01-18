import cart from "../tools/cart.js";
import { useRouter } from "next/navigation";

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
        <div className="footer">
            <a onClick={checkout}>Finish</a>
        </div>
    );
};