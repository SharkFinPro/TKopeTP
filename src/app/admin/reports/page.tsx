import { Toolbar } from "./toolbar";
import { Metadata } from "next";
import { headers } from "next/headers";
import Report from "../../../reporting/report";
import { getProductTypes } from "../../../productManager";
import { ProductData, ProductType } from "../../../productTypes";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import reportStyles from "./reports.module.css";

export const metadata: Metadata = {
  title: "Reports",
  description: "Admin Panel Reports"
};

export default async function Page() {
  const headersList: ReadonlyHeaders = headers(); // Opt in to dynamic rendering
  const report: Report = new Report("./bin/dump.txt");
  const rawOverview: ProductData[] = report.getOverview();
  const times: Date[] = report.getTimes();
  const categories: ProductType[] = await getProductTypes();

  return (
    <div className={reportStyles.wrapper}>
      <Toolbar
        rawOverview={JSON.stringify(rawOverview)}
        categories={JSON.stringify(categories)}
        times={JSON.stringify(times)}
      />
      <div className={reportStyles.display}>
        <canvas id="graphCanvas"></canvas>
      </div>
    </div>
  );
}