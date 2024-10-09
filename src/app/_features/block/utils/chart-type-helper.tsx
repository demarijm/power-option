import DisplayDarkPoolChart from "../../chart/components/darkpool.chart";
import DdoiChart from "../../chart/components/ddoi.chart";
import GammaExposureChart from "../../chart/components/gamma-exposure.chart";
import type { DisplayType } from "@prisma/client";
export const renderChart = (chartType: DisplayType) => {
	switch (chartType) {
		case "TOP10DARKPOOL":
			return <DisplayDarkPoolChart />;
		case "GAMMAFLOW":
			return "Top 10";
		case "DDOI":
			return <DdoiChart />;
		case "GEX":
			return <GammaExposureChart />;
		default:
			return "Unknown";
	}
};
