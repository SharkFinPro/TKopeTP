import "./stylesheets/index.css";
import Link from "next/link";

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
                        <Link href={`products/${category}`}>{categories[category]}</Link>
                    ))
                }
            </div>
        </div>
    );
}