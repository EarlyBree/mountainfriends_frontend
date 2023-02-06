import React from "react";

import Chart from "./Chart";

const TourChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const hike of props.hikes) {
    // console.log(hike.date.split("-")[1] - 1);
    // console.log(hike.mountain.difference);
    const tourMonth = hike.date.split("-")[1] - 1;
    chartDataPoints[tourMonth].value += hike.mountain.difference;
  }
  //   console.log(chartDataPoints);

  return <Chart dataPoints={chartDataPoints} />;
};

export default TourChart;
