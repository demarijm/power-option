"use client";
import React, { useRef } from "react";
import GridLayout from "react-grid-layout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../styles/view-dashboard.module.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

const Dashboard = () => {
  // Define the grid layout
  const layout = [
    { i: "chart1", x: 0, y: 0, w: 6, h: 8 },
    { i: "chart4", x: 6, y: 0, w: 6, h: 8 },
    { i: "chart2", x: 6, y: 0, w: 6, h: 8 },
    { i: "chart3", x: 0, y: 8, w: 12, h: 8 },
  ];

  // Chart options
  const options1 = {
    title: { text: "Chart 1" },
    series: [{ data: [1, 3, 2, 4] }],
  };

  const options2 = {
    title: { text: "Chart 2" },
    series: [{ data: [5, 3, 4, 7] }],
  };

  const options3 = {
    title: { text: "Chart 3" },
    series: [{ data: [2, 5, 3, 6] }],
  };
  const options4 = {
    title: { text: "Chart 4" },
    series: [{ data: [2, 5, 3, 6] }],
  };

  // References to chart instances
  const chartRefs = {
    chart1: useRef(null),
    chart2: useRef(null),
    chart3: useRef(null),
    chart4: useRef(null),
  };

  // Style for the chart container to make it fill its parent
  const chartContainerStyle = {
    width: "100%",
    height: "80%",
  };
  const onResize = (layout, oldItem, newItem) => {
    const chartRef = chartRefs[newItem.i];
    if (chartRef && chartRef.current) {
      chartRef.current.chart.reflow();
    }
  };

  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1700}
        margin={[20, 30]}
        onResize={onResize}
        containerPadding={[3, 3]}
        draggableHandle=".chart-drag-handle"
        isResizable={true}
      >
        <Card className="" key="chart1">
          <CardHeader className="chart-drag-handle cursor-move border-b-2">
            <CardTitle>Chart 1</CardTitle>
          </CardHeader>
          <HighchartsReact
            highcharts={Highcharts}
            options={options1}
            containerProps={{ style: chartContainerStyle }}
            ref={chartRefs.chart1}
          />
        </Card>
        <Card key="chart2">
          <CardHeader className="chart-drag-handle cursor-move border-b-2">
            <CardTitle>Chart 2</CardTitle>
          </CardHeader>
          <HighchartsReact
            highcharts={Highcharts}
            options={options2}
            containerProps={{ style: chartContainerStyle }}
            ref={chartRefs.chart2}
          />
        </Card>
        <Card key="chart4">
          <CardHeader className="chart-drag-handle cursor-move border-b-2">
            <CardTitle>Chart 4</CardTitle>
          </CardHeader>
          <HighchartsReact
            highcharts={Highcharts}
            options={options4}
            containerProps={{ style: chartContainerStyle }}
            ref={chartRefs.chart4}
          />
        </Card>
        <Card key="chart3">
          <CardHeader className="chart-drag-handle cursor-move border-b-2">
            <CardTitle>Chart 3</CardTitle>
          </CardHeader>
          <HighchartsReact
            highcharts={Highcharts}
            options={options3}
            containerProps={{ style: chartContainerStyle }}
            ref={chartRefs.chart3}
          />
        </Card>
      </GridLayout>
    </div>
  );
};

export default Dashboard;
