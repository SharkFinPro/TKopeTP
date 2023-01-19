import Footer from "../../footer.js";
import Header from "./header";

export default ({ children }) => {
    return <>
        <Header />
        {children}
        <Footer />
    </>;
}