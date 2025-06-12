import { Toolbar } from "./toolbar";
import { Metadata } from "next";
import Report from "../../../reporting/report";
import { getProductTypes } from "../../../productManager";
import { ProductData, ProductType } from "../../../productTypes";
import reportStyles from "./reports.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reports",
  description: "Admin Panel Reports"
};

export default async function Page() {
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