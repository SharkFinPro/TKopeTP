const DefaultHeader = () => {
    return (
        <div className="header">
            <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
        </div>
    );
}

const DefaultFooter = () => {
    return (
        <div className="footer">
            <p><a href="checkout">Checkout</a></p>
        </div>
    );
}

const Body = () => {
    return (
        <div className="entry">
            {typeof(Header) === "undefined" ? <DefaultHeader/> : <Header/>}
            <Content/>
            {typeof(Footer) === "undefined" ? <DefaultFooter/> : <Footer/>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);