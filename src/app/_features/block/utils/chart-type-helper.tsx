import DisplayDarkPoolChart from "../../chart/components/darkpool.chart";
import DdoiChart from "../../chart/components/ddoi.chart";
import type { DisplayType } from "@prisma/client";
export const renderChart = (chartType: DisplayType) => {
	switch (chartType) {
		case "TOP10DARKPOOL":
			return <DisplayDarkPoolChart />;
		case "GAMMAFLOW":
			return "Top 10";
		case "DDOI":
			return <DdoiChart />;
		default:
			return "Unknown";
	}
};
