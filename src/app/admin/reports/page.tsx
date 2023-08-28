import { Toolbar } from "./toolbar";
import { Metadata } from "next";
import { headers } from "next/headers";
import Report from "../../../reporting/report";
import productManager from "../../../productManager";
import reportStyles from "../stylesheets/report.module.css";

export const metadata: Metadata = {
  title: "Reports",
  description: "Admin Panel Reports"
};

export default async function Page() {
  const headersList = headers(); // Opt in to dynamic rendering
  const rawOverview = new Report("./bin/dump.txt").getOverview();
  const categories = await productManager.getProductTypes();

  return (
    <div className={reportStyles.wrapper}>
      <Toolbar rawOverview={JSON.stringify(rawOverview)} categories={JSON.stringify(categories)} />
      <div className={reportStyles.display}>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}