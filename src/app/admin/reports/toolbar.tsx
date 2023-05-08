"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chart } from "chart.js/auto";
import { getRequest } from "../../tools/requests";
import reportStyles from "../stylesheets/report.module.css";

function ToolbarOptionButton({ children, action, selected }: { children: string, action: any, selected: boolean}) {
    return <button className={`${reportStyles.toolbarOption} ${selected ? reportStyles.toolbarSelected : ""}`} onClick={action}>{children}</button>
}

function ToolbarTypeButton({ children, action, selected }: { children: string, action: any, selected: boolean}) {
    return <button className={`${reportStyles.toolsSwapOption} ${selected ? reportStyles.toolsSwapOptionSelected : ""}`} onClick={action}>{children}</button>
}

let chart: Chart;
async function loadGraph(selectedOption: string, graphType: string) {
    let labels: string[] = [], content: number[] = [], title: string = "", yLabel: string = "";

    if (selectedOption === "overview") {
        const rawOverview = await getRequest("/api/admin/reporting/overview");
        title = "Products Overview";

        if (graphType === "units") {
            yLabel = "Total Units";
            for (let product in rawOverview) {
                labels.push(rawOverview[product].displayName);
                content.push(rawOverview[product].count);
            }
        } else if (graphType === "money") {
            yLabel = "Total $";
            for (let product in rawOverview) {
                labels.push(rawOverview[product].displayName);
                content.push(rawOverview[product].count * rawOverview[product].price);
            }
        }
    } else if (selectedOption === "overviewCategory") {
        const rawOverview = await getRequest("/api/admin/reporting/overview");
        const categories = await getRequest("/api/productCategories");
        title = "Products Overview by Category";

        for (let category in categories) {
            labels[+category - 1] = categories[category];
            content[+category - 1] = 0;
        }

        if (graphType === "units") {
            yLabel = "Total Units";
            for (let product in rawOverview) {
                content[rawOverview[product].productType - 1] += rawOverview[product].count;
            }
        } else if (graphType === "money") {
            yLabel = "Total $";
            for (let product in rawOverview) {
                content[rawOverview[product].productType - 1] += rawOverview[product].count * rawOverview[product].price;
            }
        }
    }

    if (chart) {
        chart.destroy();
    }

    chart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: "rgba(0, 85, 150, 0.75)",
                borderColor: "#005596",
                borderWidth: 3,
                borderRadius: 10,
                data: content
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: "'MuseoSans', 'serif'"
                        },
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: "'MuseoSans', 'serif'"
                        },
                    },
                    title: {
                        display: true,
                        text: yLabel,
                        font: {
                            size: 25,
                            family: "'MuseoSans', 'serif'"
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 30,
                        family: "'MuseoSlab', 'MuseoSans', 'serif'"
                    }
                },
                legend: {
                    display: false
                }
            },
        }
    });
}

export function Toolbar() {
    const [selectedOption, setSelectedOption] = useState("overview");
    const [graphType, setGraphType] = useState("units");

    useEffect(() => {
        loadGraph(selectedOption, graphType);
    }, [selectedOption, graphType, []]);

    return (
        <div className={reportStyles.toolbar}>
            <div className={reportStyles.toolbarOptions}>
                <ToolbarOptionButton action={() => setSelectedOption("overview")} selected={selectedOption === "overview"}>Overview</ToolbarOptionButton>
                <ToolbarOptionButton action={() => setSelectedOption("overviewCategory")} selected={selectedOption === "overviewCategory"}>Overview (Category)</ToolbarOptionButton>
            </div>
            <div className={reportStyles.toolbarTools}>
                <div className={reportStyles.toolbarToolsSwap}>
                    <ToolbarTypeButton action={() => setGraphType("units")} selected={graphType === "units"}>Units</ToolbarTypeButton>
                    <ToolbarTypeButton action={() => setGraphType("money")} selected={graphType === "money"}>Money</ToolbarTypeButton>
                </div>
                <Link className={reportStyles.toolbarDownload} href="/api/admin/reporting/report.xlsx" target="_blank">Download Report</Link>
            </div>
        </div>
    );
}