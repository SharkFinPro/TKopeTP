import { Toolbar } from "./toolbar";
import { Metadata } from "next";
import { headers } from "next/headers";
import Report from "../../../reporting/report";
import productManager from "../../../productManager";
import { ProductData, ProductType } from "../../../productTypes";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import reportStyles from "../stylesheets/report.module.css";

export const metadata: Metadata = {
  title: "Reports",
  description: "Admin Panel Reports"
};

export default async function Page() {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const report: Report = new Report("./bin/dump.txt");
  const rawOverview: ProductData[] = report.getOverview();
  const categories: ProductType[] = await productManager.getProductTypes();

  return (
    <div className={reportStyles.wrapper}>
      <Toolbar rawOverview={JSON.stringify(rawOverview)} categories={JSON.stringify(categories)} />
      <div className={reportStyles.display}>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}