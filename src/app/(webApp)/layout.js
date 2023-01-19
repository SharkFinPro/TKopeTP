import "./stylesheets/superWrapper.css";

export default ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body>
                {children}
            </body>
        </html>
    )
}