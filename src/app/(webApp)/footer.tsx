import Link from "next/link";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function Footer() {
  return (
    <footer className={wrapperStyles.footer}>
      <Link
        className={wrapperStyles.footerButton}
        href="../checkout">
        Checkout
      </Link>
    </footer>
  );
};