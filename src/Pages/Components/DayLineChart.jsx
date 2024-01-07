import React from "react";
import ReactApexChart from "react-apexcharts";

export default function DayLineChart() {
  const storedData = JSON.parse(sessionStorage.getItem("billDateCount"));
  // Extract date and count from stored data
  const dates = storedData.map((item) => item.date);
  const counts = storedData.map((item) => item.count);

  const series = [
    {
      name: "Products",
      data: counts,
      offsetY: 0,
    },
  ];
  const options = {
    chart: {
      width: "100%",
      height: "100%",
      type: "area",
      toolbar: {
        show: true,
      },
    },

    legend: {
      show: true,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      categories: dates,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        className="full-width"
        options={options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}
