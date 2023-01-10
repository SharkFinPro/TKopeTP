const Body = () => {
    return (
        <div class="entry">
            <Navigation />
            <Content />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);