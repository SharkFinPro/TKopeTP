"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadOverviewGraph, loadTimelineGraph } from "./createCharts";
import reportStyles from "../stylesheets/report.module.css";

function ToolbarButton({ children, action, selected }: { children: string, action: any, selected: boolean }) {
  return (
    <button
      className={`${reportStyles.toolbarButton} ${selected ? reportStyles.toolbarSelected : ""}`}
      onClick={action}>
      {children}
    </button>
  );
}

export function Toolbar({ rawOverview, categories, times }: { rawOverview: string, categories: string, times: string }) {
  const [selectedOption, setSelectedOption] = useState("overview");
  const [graphType, setGraphType] = useState("units");

  useEffect(() => {
    if (selectedOption === "overview" || selectedOption === "overviewCategory") {
      loadOverviewGraph(selectedOption, graphType, JSON.parse(rawOverview), JSON.parse(categories));
    } else if (selectedOption === "timeline") {
      loadTimelineGraph(JSON.parse(times));
    }
  }, [selectedOption, graphType, categories, rawOverview, times]);

  return (
    <div className={reportStyles.toolbar}>
      <div className={reportStyles.toolbarOptions}>
        <ToolbarButton
          action={() => setSelectedOption("overview")}
          selected={selectedOption === "overview"}>
          Overview
        </ToolbarButton>
        <ToolbarButton
          action={() => setSelectedOption("overviewCategory")}
          selected={selectedOption === "overviewCategory"}>
          Overview (Category)
        </ToolbarButton>
        <ToolbarButton
          action={() => setSelectedOption("timeline")}
          selected={selectedOption === "timeline"}>
          Timeline
        </ToolbarButton>
      </div>
      <div className={reportStyles.toolbarTools}>
        <div className={reportStyles.toolbarToolsSwap}>
          <ToolbarButton
            action={() => setGraphType("units")}
            selected={graphType === "units"}>
            Units
          </ToolbarButton>
          <ToolbarButton
            action={() => setGraphType("money")}
            selected={graphType === "money"}>
            Money
          </ToolbarButton>
        </div>
        <Link className={reportStyles.toolbarDownload} href="/api/admin/reporting/report.xlsx" target="_blank">Download Report</Link>
      </div>
    </div>
  );
}