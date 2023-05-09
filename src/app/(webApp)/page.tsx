import Link from "next/link";
import productManager from "../../productManager";
import Footer from "./footer";
import { Metadata } from "next";
import { ProductType } from "../../productTypes";
import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import indexStyles from "./stylesheets/index.module.css";

export const metadata: Metadata = {
    title: "Home",
    description: "Category Selection"
};

export default async function Page() {
    const categories: ProductType[] = await productManager.getProductTypes();

    return <>
        <header className={wrapperStyles.header}>
            <h1>T&apos;Kope Kwiskwis<br/>Trading Post</h1>
        </header>
        <div className={wrapperStyles.content}>
            <div className={indexStyles.categories}>
                {categories.map(({ id, displayName }: ProductType) => <Link key={id} href={`products/${id}`}>{displayName}</Link>)}
            </div>
        </div>
        <Footer />
    </>;
}