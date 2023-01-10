class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: "overview"
        };

        this.loadOverview = this.loadOverview.bind(this);
        this.loadOverviewPrice = this.loadOverviewPrice.bind(this);

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
                }],
                yAxisID: "y-axis-gravity"
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

    loadOverview() {
        const rawOverview = JSON.parse(getRequest("/api/admin/reporting/overview"));

        let labels = [];
        let content = [];

        for (let product in rawOverview) {
            labels.push(rawOverview[product].displayName);
            content.push(rawOverview[product].count);
        }

        this.createBarChart("Products Overview", labels, content, "Total Units");

        this.setState({
            selectedOption: "overview"
        });
    }

    loadOverviewPrice() {
        const rawOverview = JSON.parse(getRequest("/api/admin/reporting/overview"));

        let labels = [];
        let content = [];

        for (let product in rawOverview) {
            labels.push(rawOverview[product].displayName);
            content.push(rawOverview[product].count * rawOverview[product].price);
        }

        this.createBarChart("Products Overview by $", labels, content, "Total $")

        this.setState({
            selectedOption: "overviewPrice"
        });
    }

    render() {
        return (
            <div class="content-toolbar">
                <a class="content-toolbar-option content-toolbar-download" onClick={this.downloadExcel}>Download Report</a>
                <a class={`content-toolbar-option ${this.state.selectedOption === "overview" ? "content-toolbar-selected" : ""}`}
                    onClick={this.loadOverview}>Overview</a>
                <a class={`content-toolbar-option ${this.state.selectedOption === "overviewPrice" ? "content-toolbar-selected" : ""}`}
                   onClick={this.loadOverviewPrice}>Overview (Price)</a>
                <a class="content-toolbar-option">Graph 3</a>
                <a class="content-toolbar-option">Graph 4</a>
                <a class="content-toolbar-option">Graph 5</a>
            </div>
        );
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="content-display">
                <canvas id={"myChart"} style={{maxWidth: "50%", maxHeight: "75%"}}></canvas>
            </div>
        );
    }
}


class Content extends React.Component {
    render() {
        return (
            <div class="content">
                <Toolbar />
                <Display />
            </div>
        );
    }
}