const Body = () => {
    return (
        <div className="entry">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);