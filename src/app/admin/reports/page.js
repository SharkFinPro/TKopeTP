"use client";
import { Component } from "react";
import { Chart } from "chart.js/auto";

import "../stylesheets/report.css";

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
        await fetch("/api/admin/reporting/overview").then((rawOverview) => {
            console.log(rawOverview.json());
        }).catch((err) => {
            console.log(err);
        })

        // rawOverview = JSON.parse(rawOverview);
        let rawOverview = {};

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
        // const rawOverview = JSON.parse(getRequest("/api/admin/reporting/overview"));
        let rawOverview = await fetch("/api/admin/reporting/overview");
        rawOverview = JSON.parse(rawOverview);

        // const categories = JSON.parse(getRequest("/api/productCategories"));
        let categories = await fetch("/api/productCategories");
        categories = JSON.parse(categories);

        // const categories = {1:"Drinks & Snacks",2:"Patches",3:"Lodge",4:"National"};

        let labels = [];
        let content = [];
        console.log(this.state.graphType)
        if (this.state.graphType === "units") {
            for (let product in rawOverview) {
                let category = {
                    displayName: categories[rawOverview[product].productType],
                    id: rawOverview[product].productType
                };

                if (!labels.includes(category.displayName)) {
                    labels.push(category.displayName);
                    content[category.id - 1] = 0;
                }
                content[category.id - 1] += rawOverview[product].count;
            }

            this.createBarChart("Products Overview by Category", labels, content, "Total Units");
        } else {
            for (let product in rawOverview) {
                let category = {
                    displayName: categories[rawOverview[product].productType],
                    id: rawOverview[product].productType
                };

                if (!labels.includes(category.displayName)) {
                    labels.push(category.displayName);
                    content[category.id - 1] = 0;
                }
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
        });

        setTimeout(() => {
            this.updateGraph();
        }, 50);
    }

    selectMoney() {
        this.setState({
            graphType: "money"
        });

        setTimeout(() => {
            this.updateGraph();
        }, 50);
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
            <div className="content-toolbar">
                <div className="content-toolbar-options">
                    <a className={`content-toolbar-option ${this.state.selectedOption === "overview" ? "content-toolbar-selected" : ""}`}
                       onClick={this.loadOverview}>Overview</a>
                    <a className={`content-toolbar-option ${this.state.selectedOption === "overviewCategory" ? "content-toolbar-selected" : ""}`}
                       onClick={this.loadOverviewCategory}>Overview (Category)</a>
                </div>
                <div className="content-toolbar-tools">
                    <div className="content-toolbar-tools-swap">
                        <a className={`tools-swap-option ${this.state.graphType === "units" ? "tools-swap-option-selected" : ""}`}
                           onClick={this.selectUnits}>Units</a>
                        <a className={`tools-swap-option ${this.state.graphType === "money" ? "tools-swap-option-selected" : ""}`}
                           onClick={this.selectMoney}>Money</a>
                    </div>
                    <a className="content-toolbar-option content-toolbar-download" onClick={this.downloadExcel}>Download
                        Report</a>
                </div>
            </div>
        );
    }
}

export default () => {
    return <>
        <div className="content">
            <Toolbar />
            <div className="content-display">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    </>
};