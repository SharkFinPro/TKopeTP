import Link from "next/link";
import productManager from "../../productManager.mjs";
import Footer from "./footer";
import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import indexStyles from "./stylesheets/index.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Category Selection"
};

export default async function Page() {
    const categories = await productManager.getProductTypes();

    return <>
        <header className={wrapperStyles.header}>
            <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
        </header>
        <div className={wrapperStyles.content}>
            <div className={indexStyles.categories}>
                {Object.keys(categories).map((category: string) => <Link key={category} href={`products/${category}`}>{categories[category]}</Link>)}
            </div>
        </div>
        <Footer />
    </>;
}