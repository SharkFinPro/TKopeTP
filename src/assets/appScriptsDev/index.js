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

    generateCategory(product, productData) {
        return (
            <p key={product}><a href={"products?variant=" + product}>{productData}</a></p>
        )
    }

    loadCategories() {
        const productTypes = JSON.parse(getRequest("/api/productTypes"));

        let categories = [];
        for (let type in productTypes) {
            categories.push(this.generateCategory(type, productTypes[type]));
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