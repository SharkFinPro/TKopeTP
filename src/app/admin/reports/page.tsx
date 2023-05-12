import { Toolbar } from "./toolbar";
import { Metadata } from "next";
import reportStyles from "../stylesheets/report.module.css";

export const metadata: Metadata = {
    title: "Reports",
    description: "Admin Panel Reports"
};

export default function Page() {
    return (
        <div className={reportStyles.wrapper}>
            <Toolbar />
            <div className={reportStyles.display}>
                <canvas id="myChart"></canvas>
            </div>
        </div>
    );
}