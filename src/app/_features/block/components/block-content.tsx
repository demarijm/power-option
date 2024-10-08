import { api } from "@/trpc/react";
import type { Block, BlockMeta } from "@prisma/client";
import React from "react";
import { renderChart } from "../utils/chart-type-helper";
import NewsDetail from "../../news/components/news-detail";
type Props = {
	block: Block & {
		meta: BlockMeta;
	};
};
const BlockContent = ({ block }: Props) => {
	if (block.meta.type === "CHART") {
		return <div className="h-[90%]">{renderChart(block.meta.display)}</div>;
	}
	if (block.meta.type === "NEWS") {
		return (
			<div className="h-[90%]">
				<NewsDetail block={block} />
			</div>
		);
	}
};

export default BlockContent;
