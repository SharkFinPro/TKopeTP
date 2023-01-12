import Link from "next/link";
import productManager from "../../productManager.mjs";
import "./stylesheets/index.css";

export default async () => {
    let categories = await productManager.getProductTypes();

    return (
        <div className="content">
            <div className="categories">
                {Object.keys(categories).map((category) => (
                    <Link key={category} href={`products/${category}`}>{categories[category]}</Link>
                ))}
            </div>
        </div>
    );
}