import Footer from "../../footer.js";
import wrapperStyles from "../../stylesheets/wrapper.module.css";

export default ({ children }) => {
    return <>
        <header className={wrapperStyles.header}>
            <h1>Products</h1>
        </header>
        {children}
        <Footer />
    </>;
}