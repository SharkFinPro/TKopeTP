import "./stylesheets/index.css";

const getCategories = async () => {
    let categories = await fetch("http://localhost/api/productCategories");

    return categories.json();
};

export default async () => {
    let categories = await getCategories();

    return (
        <div className="content">
            <div className="categories">
                {
                    Object.keys(categories).map((category) => (
                        <a href={`products?variant=${category}`}>{categories[category]}</a>
                    ))
                }
            </div>
        </div>
    );
}