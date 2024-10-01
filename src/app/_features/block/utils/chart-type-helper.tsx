import DisplayDarkPoolChart from "../../chart/components/darkpool.chart";
import type { DisplayType } from "@prisma/client";
export const renderChart = (chartType: DisplayType) => {
	switch (chartType) {
		case "TOP10DARKPOOL":
			return <DisplayDarkPoolChart />;
		case "GAMMAFLOW":
			return "Top 10";
		case "DDOI":
			return "Top 5";
		default:
			return "Unknown";
	}
};
