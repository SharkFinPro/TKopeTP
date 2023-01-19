import Link from "next/link";
import productManager from "../../productManager.mjs";
import Footer from "./footer";

import wrapperStyles from "./stylesheets/wrapper.module.css";
import indexStyles from "./stylesheets/index.module.css";

export default async () => {
    let categories = await productManager.getProductTypes();

    return <>
        <div className={wrapperStyles.header}>
            <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
        </div>
        <div className={wrapperStyles.content}>
            <div className={indexStyles.categories}>
                {Object.keys(categories).map((category) => (
                    <Link key={category} href={`products/${category}`}>{categories[category]}</Link>
                ))}
            </div>
        </div>
        <Footer />
    </>;
}