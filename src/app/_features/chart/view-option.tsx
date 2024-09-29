"use client";
import React from "react";
import Highcharts from "highcharts/highstock";
import dynamic from "next/dynamic";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
	ssr: false,
});

const ScatterChart = ({ data }) => {
	const chartOptions = {
		chart: {
			type: "candlestick",
			zoomType: "x",
		},
		title: {
			text: "Stock Price Data",
		},
		rangeSelector: {
			buttons: [
				{
					type: "hour",
					count: 1,
					text: "1h",
				},
				{
					type: "day",
					count: 1,
					text: "1D",
				},
				{
					type: "all",
					count: 1,
					text: "All",
				},
			],
			selected: 1,
			inputEnabled: false,
		},

		xAxis: {
			type: "datetime",
		},
		yAxis: [
			{
				labels: {
					align: "left",
				},
				height: "80%",
				resize: {
					enabled: true,
				},
			},
			{
				labels: {
					align: "left",
				},
				top: "80%",
				height: "20%",
				offset: 0,
			},
		],
		series: [
			{
				name: "Candlestick Data",
				type: "candlestick",
				data: data.map((item) => [item.t, item.o, item.h, item.l, item.c]), // Format data
				tooltip: {
					valueDecimals: 2,
				},
			},
			{
				name: "Volume",
				type: "column",
				data: data.map((item) => [item.t, item.v]), // Volume data
				yAxis: 1,
				tooltip: {
					valueDecimals: 0,
				},
			},
		],
		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 800,
					},
					chartOptions: {
						rangeSelector: {
							inputEnabled: false,
						},
					},
				},
			],
		},
	};

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={chartOptions} // Pass the dynamically generated options
		/>
	);
};

export default ScatterChart;
