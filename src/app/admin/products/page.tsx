import { Metadata } from "next";
import { ProductViewer } from "./productViewer";
import productsStyles from "../stylesheets/products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Admin Panel Products"
};

export default async function Page() {
  return (
    <div className={productsStyles.content}>
      <ProductViewer processCDN={process.env.cdn} />
    </div>
  );
}