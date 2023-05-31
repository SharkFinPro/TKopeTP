import Footer from "./footer";
import { Metadata } from "next";
import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import { Categories } from "./categories";

export const metadata: Metadata = {
    title: "Home",
    description: "Category Selection"
};

export default async function Page() {
    return <>
        <header className={wrapperStyles.header}>
            <h1>T&apos;Kope Kwiskwis<br/>Trading Post</h1>
        </header>
        <div className={wrapperStyles.content}>
            <Categories />
        </div>
        <Footer />
    </>;
}