import "./stylesheets/superWrapper.css";
import Head from "./head";

export default ({ children }) => {
    return <>
        <html lang="en">
            <Head />
            <body>
                {children}
            </body>
        </html>
    </>
}