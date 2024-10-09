import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { api } from "@/trpc/react";

const GammaExposureChart = () => {
	const { data } = api.option.getOptionChain.useQuery({
		ticker: "EVRI",
		// expiration_date: "2024-10-02",
	});

	if (!data) return <div>Loading...</div>;

	// Highcharts configuration
	const options = {
		chart: {
			zoomType: "xy",
			backgroundColor: "#222", // Dark theme
		},
		title: {
			text: "Gamma Exposure",
			style: { color: "#fff" },
		},
		xAxis: {
			categories: data.strikePrices, // X-Axis shows strike prices
			crosshair: true,
			labels: {
				style: { color: "#fff" },
			},
		},
		yAxis: [
			{
				// Primary yAxis (Gamma Exposure)
				title: {
					text: "Gamma Exposure",
					style: { color: "#fff" },
				},
				labels: {
					style: { color: "#fff" },
				},
				opposite: false,
				min: 0, // Adjust minimum to allow bars to be more visible
			},
			{
				// Secondary yAxis (Implied Volatility)
				title: {
					text: "Implied Volatility",
					style: { color: "#fff" },
				},
				opposite: true,
				labels: {
					style: { color: "#fff" },
				},
				min: 2, // Adjust min based on your data range for IV
				max: 6, // Adjust max based on your data range for IV
			},
		],
		tooltip: {
			shared: true,
			backgroundColor: "#333",
			style: { color: "#fff" },
		},
		legend: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "top",
			itemStyle: { color: "#fff" },
		},
		series: [
			{
				name: "Positive Gamma",
				type: "column",
				data: data.positiveGammas, // Positive gamma as bar chart
				color: "#4CAF50",
				yAxis: 0, // Map to the primary Y-axis (Gamma)
			},
			{
				name: "Negative Gamma",
				type: "column",
				data: data.negativeGammas, // Negative gamma as bar chart
				color: "#F44336",
				yAxis: 0, // Map to the primary Y-axis (Gamma)
			},
			{
				name: "Gamma Exposure",
				type: "line",
				data: data.gammas, // Gamma exposure line
				yAxis: 0, // Map to the primary Y-axis (Gamma)
				color: "#FFFF00",
			},
			{
				name: "Implied Volatility",
				type: "line",
				data: data.impliedVolatilities, // Implied volatility as a line
				yAxis: 1, // Map to the secondary Y-axis (IV)
				color: "#FFA500",
				dashStyle: "shortdash",
			},
			{
				name: "Average IV",
				type: "line",
				data: data.averageIVs, // Average IV line (yellow)
				color: "#FFD700",
				yAxis: 1, // Map to the secondary Y-axis (IV)
			},
		],
		plotOptions: {
			column: {
				pointPadding: 0.2, // Adjust padding to make bars wider
				borderWidth: 0,
				groupPadding: 0.1, // Reduce group padding to make bars closer and clearer
			},
			line: {
				marker: {
					enabled: false,
				},
			},
		},
		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
						},
					},
				},
			],
		},
	};

	return (
		<div>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default GammaExposureChart;
