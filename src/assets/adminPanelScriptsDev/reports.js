const createBarChart = (title, labels, content, yLabel) => {
    Chart.defaults.color = '#36454F';

    return new Chart("myChart", {
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
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    downloadExcel() {
        window.open("/api/admin/reporting/report.xlsx", "_blank")
    }

    loadOverview() {
        if (this.chart) {
            this.chart.destroy();
        }

        const rawOverview = JSON.parse(getRequest("/api/admin/reporting/overview"));

        let labels = [];
        let content = [];

        for (let product in rawOverview) {
            labels.push(rawOverview[product].displayName);
            content.push(rawOverview[product].count);
        }

        this.chart = createBarChart("Products Overview", labels, content, "Total Units");
    }

    loadOverviewPrice() {
        if (this.chart) {
            this.chart.destroy();
        }

        const rawOverview = JSON.parse(getRequest("/api/admin/reporting/overview"));

        let labels = [];
        let content = [];

        for (let product in rawOverview) {
            labels.push(rawOverview[product].displayName);
            content.push(rawOverview[product].count * rawOverview[product].price);
        }

        this.chart = createBarChart("Products Overview by $", labels, content, "Total $")
    }

    render() {
        return (
            <div class="content-toolbar">
                <a class="content-toolbar-option content-toolbar-download" onClick={this.downloadExcel}>Download Report</a>
                <a class="content-toolbar-option" onClick={this.loadOverview}>Overview</a>
                <a class="content-toolbar-option" onClick={this.loadOverviewPrice}>Overview (Price)</a>
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

        // this.state = {
        //     barColors: [
        //         "#650812",
        //         "#3f5e9a",
        //         "#ef1b23",
        //         "#7d8546",
        //         "#0d91cd"
        //     ],
        //     xValues: ["T'Kope Kwiskwis", "Nanuk", "Sikhs Mox Lamonti", "Toontuk", "Nisqually"],
        //     yValues: [406, 143, 249, 16, 356]
        // }
    }

    // componentDidMount() {
        // this.generateChart();
        // console.log("Mounted!")
    // }
    //
    // generateChart() {
    //     Chart.defaults.color = '#36454F';
    //
    //     this.chart = new Chart("myChart", {
    //         type: "bar",
    //         data: {
    //             labels: this.state.xValues,
    //             datasets: [{
    //                 backgroundColor: this.state.barColors,
    //                 data: this.state.yValues
    //             }],
    //             yAxisID: "y-axis-gravity"
    //         },
    //         options: {
    //             scales: {
    //                 x: {
    //                     ticks: {
    //                         font: {
    //                             family: "'MuseoSans', 'serif'"
    //                         },
    //                     }
    //                 },
    //                 y: {
    //                     beginAtZero: true,
    //                     ticks: {
    //                         font: {
    //                             family: "'MuseoSans', 'serif'"
    //                         },
    //                     }
    //                 }
    //             },
    //             plugins: {
    //                 title: {
    //                     display: true,
    //                     text: "Section G15 Membership",
    //                     font: {
    //                         size: 30,
    //                         family: "'MuseoSlab', 'MuseoSans', 'serif'"
    //                     }
    //                 },
    //                 legend: {
    //                     display: false
    //                 }
    //             },
    //         }
    //     });
    // }

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