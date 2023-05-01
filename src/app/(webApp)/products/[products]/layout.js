import Footer from "../../footer.js";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import Head from "./head";

export default ({ children }) => {
    return <>
        <Head />
        <header className={wrapperStyles.header}>
            <h1>Products</h1>
        </header>
        {children}
        <Footer />
    </>;
}