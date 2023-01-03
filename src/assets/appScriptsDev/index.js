const Category = (props) => {
    return (
        <p><a href={"products?variant=" + props.variant}>{props.displayName}</a></p>
    );
};

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        const productCategories = JSON.parse(getRequest("/api/productTypes"));

        let categories = [];
        for (let category in productCategories) {
            categories.push(<Category variant={category} displayName={productCategories[category]} />);
        }

        this.setState({ categories });
    }

    render() {
        return (
            <div className="content">
                <div className="categories">
                    {this.state.categories}
                </div>
            </div>
        );
    }
}