import Footer from "./footer";
import { Metadata } from "next";
import ProductManager from "../../productManager";
import { ProductType } from "../../productTypes";
import { headers } from "next/headers";
import Link from "next/link";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import indexStyles from "./stylesheets/index.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Category Selection"
};

export default async function Page({ searchParams }: { searchParams: {} }) {
  const headersList = headers();
  const categories: ProductType[] = await ProductManager.getProductTypes();

  return <>
    <header className={wrapperStyles.header}>
      <h1>T&apos;Kope Kwiskwis<br/>Trading Post</h1>
    </header>
    <div className={wrapperStyles.content}>
      <div className={indexStyles.container}>
        <div className={indexStyles.categories}>
          {categories.map(({ id, displayName }: ProductType) => (
            <Link key={id} href={`products/${id}`}>{displayName}</Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>;
}