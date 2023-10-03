import Footer from "./components/Footer";
import { Metadata } from "next";
import ProductManager from "../../productManager";
import { ProductType } from "../../productTypes";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import Link from "next/link";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import indexStyles from "./stylesheets/index.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Category Selection"
};

export default async function Page() {
  const headersList: ReadonlyHeaders = headers();
  const categories: ProductType[] = await ProductManager.getProductTypes();

  return <>
    <header className={wrapperStyles.header}>
      <h1>T&apos;Kope Kwiskwis<br/>Trading Post</h1>
    </header>
    <div className={wrapperStyles.content}>
      <div className={indexStyles.container}>
        {categories.map(({ id, displayName }: ProductType) => (
          <Link
            key={id}
            href={`products/${id}`}
            className={indexStyles.category}>
            {displayName}
          </Link>
        ))}
      </div>
    </div>
    <Footer />
  </>;
}