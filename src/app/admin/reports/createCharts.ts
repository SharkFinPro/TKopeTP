import { Chart, ChartConfiguration } from "chart.js/auto";
import { ProductData, ProductType } from "../../../productTypes";
import "chartjs-adapter-date-fns";

const HEADER_FONT: string = "MuseoSlab, serif";
const BODY_FONT: string = "MuseoSans, serif";

let chart: Chart;
function createChart(config: ChartConfiguration): void {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart("graphCanvas", config);
}

function createOverviewGraph(labels: string[], content: number[], title: string, yLabel: string): void {
  createChart({
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
              family: BODY_FONT
            },
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: BODY_FONT
            },
          },
          title: {
            display: true,
            text: yLabel,
            font: {
              size: 25,
              family: BODY_FONT
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
            family: HEADER_FONT
          }
        },
        legend: {
          display: false
        }
      }
    }
  });
}

export function loadOverviewGraph(selectedOption: string, graphType: string, rawOverview: ProductData[], categories: ProductType[]): void {
  let labels: string[] = [],
    content: number[] = [],
    title: string = "",
    yLabel: string = "";

  if (selectedOption === "overview") {
    title = "Products Overview";

    if (graphType === "units") {
      yLabel = "Total Units";

      for (let { displayName, count } of rawOverview) {
        if (count) {
          labels.push(displayName);
          content.push(count);
        }
      }
    } else if (graphType === "money") {
      yLabel = "Total $";

      for (let { displayName, count, price } of rawOverview) {
        if (count) {
          labels.push(displayName);
          content.push(count * price);
        }
      }
    }
  } else if (selectedOption === "overviewCategory") {
    title = "Products Overview by Category";

    for (let { displayName, id } of categories) {
      labels[id - 1] = displayName;
      content[id - 1] = 0;
    }

    if (graphType === "units") {
      yLabel = "Total Units";

      for (let { productType, count } of rawOverview) {
        content[productType - 1] += count || 0;
      }
    } else if (graphType === "money") {
      yLabel = "Total $";

      for (let { productType, count, price } of rawOverview) {
        content[productType - 1] += (count || 0) * price;
      }
    }
  }

  createOverviewGraph(labels, content, title, yLabel);
}

function createTimelineGraph(data: any): void {
  createChart({
    type: "bar",
    data: {
      datasets: [{
        data,
        backgroundColor: "rgba(0, 85, 150, 0.75)",
        borderColor: "#005596",
        borderWidth: 3,
        borderRadius: 10,
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Hourly Timeline of Sales",
          font: {
            size: 30,
            family: HEADER_FONT
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour"
          },
          ticks: {
            font: {
              family: BODY_FONT
            },
          },
          title: {
            display: true,
            text: "Hour",
            font: {
              size: 25,
              family: BODY_FONT
            }
          }
        },
        y: {
          ticks: {
            font: {
              family: BODY_FONT
            },
          },
          title: {
            display: true,
            text: "Sales",
            font: {
              size: 25,
              family: BODY_FONT
            }
          }
        }
      },
    },
  });
}

export function loadTimelineGraph(times: Date[]): void {
  const days: any = {};
  for (let time of times) {
    const dateTime: Date = new Date(time);
    const day: number = dateTime.getDate();
    const hour: number = dateTime.getHours();

    if (!days.hasOwnProperty(day)) {
      days[day] = {
        timestamp: dateTime,
        "hours": {}
      };
    }

    if (!days[day]["hours"].hasOwnProperty(hour)) {
      days[day]["hours"][hour] = 0;
    }

    days[day]["hours"][hour]++;
  }

  const data: any[] = [];
  for (let day in days) {
    for (let hour in days[day]["hours"]) {
      const timestamp: Date = days[day].timestamp;
      const month: number = timestamp.getMonth() + 1;
      data.push({
        x: `${timestamp.getFullYear()}-${month > 9 ? month : `0${month}`}-${parseInt(day) > 9 ? day : `0${day}`} ${parseInt(hour) > 9 ? hour : `0${hour}`}:00:00`,
        y: days[day]["hours"][hour]
      });
    }
  }

  createTimelineGraph(data);
}