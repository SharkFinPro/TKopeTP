import Link from "next/link";
import footerStyles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={footerStyles.wrapper}>
      <Link
        className={footerStyles.button}
        href="../checkout">
        Checkout
      </Link>
    </footer>
  );
};