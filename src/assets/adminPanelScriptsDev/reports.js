class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barColors: [
                "#650812",
                "#3f5e9a",
                "#ef1b23",
                "#7d8546",
                "#0d91cd"
            ],
            xValues: ["T'Kope Kwiskwis", "Nanuk", "Sikhs Mox Lamonti", "Toontuk", "Nisqually"],
            yValues: [406, 143, 249, 16, 356]
        }
    }

    componentDidMount() {
        this.generateChart();
    }

    generateChart() {
        Chart.defaults.color = '#E6E7E8';

        this.chart = new Chart("myChart", {
            type: "bar",
            data: {
                labels: this.state.xValues,
                datasets: [{
                    backgroundColor: this.state.barColors,
                    data: this.state.yValues
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
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Section G15 Membership",
                        font: {
                            size: 30,
                            family: "'MuseoSlab', 'MuseoSans', 'serif'"
                        }
                    },
                    legend: {
                        display: false
                    },
                    // labels: {
                    //     fontFamily: "'MuseoSlab', 'MuseoSans', 'serif'"
                    // }
                },
            }
        });
    }

    render() {
        return (
            <div class="content">
                <canvas id={"myChart"} style={{maxWidth: "50%", maxHeight: "75%"}}></canvas>
            </div>
        );
    }
}