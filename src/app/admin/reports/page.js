"use client";
import { Component } from "react";
import { Chart } from "chart.js/auto";
import { getRequest } from "../../tools/requests";

import "../stylesheets/report.module.css";
import wrapperStyles from "../stylesheets/wrapper.module.css";
import reportStyles from "../stylesheets/report.module.css";

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: "overview",
            graphType: "units"
        };

        this.loadOverview = this.loadOverview.bind(this);
        this.loadOverviewCategory = this.loadOverviewCategory.bind(this);

        this.selectUnits = this.selectUnits.bind(this);
        this.selectMoney = this.selectMoney.bind(this);

        this.updateGraph = this.updateGraph.bind(this);

        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.loadOverview();
    }

    createBarChart(title, labels, content, yLabel) {
        if (this.chart) {
            this.chart.destroy();
        }

        Chart.defaults.color = "#36454F";

        this.chart = new Chart("myChart", {
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

    downloadExcel() {
        window.open("/api/admin/reporting/report.xlsx", "_blank")
    }

    async loadOverview() {
        const rawOverview = await getRequest("/api/admin/reporting/overview");

        let labels = [];
        let content = [];

        if (this.state.graphType === "units") {
            for (let product in rawOverview) {
                labels.push(rawOverview[product].displayName);
                content.push(rawOverview[product].count);
            }

            this.createBarChart("Products Overview", labels, content, "Total Units");
        } else {
            for (let product in rawOverview) {
                labels.push(rawOverview[product].displayName);
                content.push(rawOverview[product].count * rawOverview[product].price);
            }

            this.createBarChart("Products Overview", labels, content, "Total $")
        }

        this.setState({
            selectedOption: "overview"
        });
    }

    async loadOverviewCategory() {
        const rawOverview = await getRequest("/api/admin/reporting/overview");
        const categories = await getRequest("/api/productCategories");

        let labels = [];
        let content = [];
        for (let category in categories) {
            labels[category - 1] = categories[category];
            content[category - 1] = 0;
        }

        if (this.state.graphType === "units") {
            for (let product in rawOverview) {
                let category = {
                    displayName: categories[rawOverview[product].productType],
                    id: rawOverview[product].productType
                };

                content[category.id - 1] += rawOverview[product].count;
            }

            this.createBarChart("Products Overview by Category", labels, content, "Total Units");
        } else {
            for (let product in rawOverview) {
                let category = {
                    displayName: categories[rawOverview[product].productType],
                    id: rawOverview[product].productType
                };

                content[category.id - 1] += rawOverview[product].count * rawOverview[product].price;
            }

            this.createBarChart("Products Overview by Category", labels, content, "Total $");
        }

        this.setState({
            selectedOption: "overviewCategory"
        });
    }

    selectUnits() {
        this.setState({
            graphType: "units"
        }, this.updateGraph);
    }

    selectMoney() {
        this.setState({
            graphType: "money"
        }, this.updateGraph);
    }

    updateGraph() {
        if (this.state.selectedOption === "overview") {
            this.loadOverview();
        } else if (this.state.selectedOption === "overviewCategory") {
            this.loadOverviewCategory();
        }
    }

    render() {
        return (
            <div className={reportStyles.toolbar}>
                <div className={reportStyles.toolbarOptions}>
                    <button type="button" className={`${reportStyles.toolbarOption} ${this.state.selectedOption === "overview" ? reportStyles.toolbarSelected : ""}`}
                       onClick={this.loadOverview}>Overview</button>
                    <button type="button" className={`${reportStyles.toolbarOption} ${this.state.selectedOption === "overviewCategory" ? reportStyles.toolbarSelected : ""}`}
                       onClick={this.loadOverviewCategory}>Overview (Category)</button>
                </div>
                <div className={reportStyles.toolbarTools}>
                    <div className={reportStyles.toolbarToolsSwap}>
                        <button type="button" className={`${reportStyles.toolsSwapOption} ${this.state.graphType === "units" ? reportStyles.toolsSwapOptionSelected : ""}`}
                           onClick={this.selectUnits}>Units</button>
                        <button type="button" className={`${reportStyles.toolsSwapOption} ${this.state.graphType === "money" ? reportStyles.toolsSwapOptionSelected : ""}`}
                           onClick={this.selectMoney}>Money</button>
                    </div>
                    <button type="button" className={`${reportStyles.toolbarOption} ${reportStyles.toolbarDownload}`} onClick={this.downloadExcel}>Download
                        Report</button>
                </div>
            </div>
        );
    }
}

export default () => {
    return <>
        <div className={wrapperStyles.content}>
            <Toolbar />
            <div className={reportStyles.display}>
                <canvas className={reportStyles.displayCanvas} id="myChart"></canvas>
            </div>
        </div>
    </>
};