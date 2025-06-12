import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getProductTypes } from "../../../productManager";
import { ProductType } from "../../../productTypes";
import Link from "next/link";
import wrapperStyles from "../wrapper.module.css";
import indexStyles from "./index.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: "Category Selection"
};

export default async function Page() {
  const categories: ProductType[] = await getProductTypes();

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
    <Footer checkout={false} />
  </>;
}