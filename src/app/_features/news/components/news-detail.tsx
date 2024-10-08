"use client";
import { api } from "@/trpc/react";
import { ITickerNews } from "@polygon.io/client-js";
import type { Block, BlockMeta } from "@prisma/client";
import { Avatar, List, Space } from "antd";
import { MessageCircle, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
type Props = {
	block: Block & {
		meta: BlockMeta;
	};
};
const NewsDetail: React.FC<Props> = ({ block }) => {
	const news = api.option.getNews.useQuery({
		ticker: block.meta.ticker ?? "SPY",
	});
	if (!news.data) {
		return null;
	}
	if (news.error) {
		return <div>Error loading news</div>;
	}
	return (
		<div className="overflow-y-scroll max-h-full">
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page);
					},
					pageSize: 3,
				}}
				loading={news.isLoading}
				dataSource={news.data}
				renderItem={(item) => (
					<List.Item
						key={item.id}
						extra={
							<Image
								width={272}
								height={250}
								alt="logo"
								src={item?.image_url}
							/>
						}
					>
						<List.Item.Meta
							avatar={<Avatar src={item} />}
							title={<a href={item.href}>{item.title}</a>}
							description={item.description}
						/>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default NewsDetail;
