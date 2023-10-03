import Link from "next/link";
import footerStyles from "./Footer.module.css";
import CheckoutButton from "./CheckoutButton";

export default function Footer({
  checkout = false
}: {
  checkout: boolean
}) {
  return (
    <footer className={footerStyles.wrapper}>
      {checkout ? (
        <CheckoutButton />
      ) : (
        <Link
          className={footerStyles.button}
          href="../checkout">
          Checkout
        </Link>
      )}
    </footer>
  );
};