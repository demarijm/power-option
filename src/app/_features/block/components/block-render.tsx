"use client";
import { Button } from "@/app/_components/ui/button";
import { useBlockStore } from "../store/block-store";
import { Card, CardHeader, CardTitle } from "@/app/_components/ui/card";
import React, { useEffect, useMemo } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { toast } from "sonner";
import { api, type RouterOutputs } from "@/trpc/react";

type Props = {
	viewId: string;
	blocks: any;
};

export const BlockRender = ({ blocks, viewId }: Props) => {
	const { clientBlocks, updateBlockLayout, setBlocks } = useBlockStore();

	const utils = api.useUtils();

	const blockMutation = api.view.updateBlocks.useMutation({
		onMutate: (v) => {
			console.log("values changed", v);
		},
		onError: (error) => {
			toast.error(`There was an issue ${error.message}`);
		},
		onSuccess: () => {
			toast.success("Success");
			return utils.view.getViewById.invalidate();
		},
	});

	useEffect(() => {
		if (blocks) {
			setBlocks(blocks);
		}
	}, [setBlocks, blocks]);

	const layout = useMemo(() => {
		return clientBlocks.map((block) => ({
			i: block.id,
			x: block.layout.x,
			y: block.layout.y,
			w: block.layout.w,
			h: block.layout.h,
		}));
	}, [clientBlocks]);

	const handleSaveLayout = (newLayout: ReactGridLayout.Layout[]) => {
		const updatedBlocks = clientBlocks.map((block) => {
			const updatedLayout = newLayout.find((layout) => layout.i === block.id);
			return updatedLayout
				? { ...block, layout: { ...block.layout, ...updatedLayout } }
				: block;
		});
		blockMutation.mutate({
			blocks: updatedBlocks,
			viewId: viewId,
		});
	};

	const onLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
		newLayout.map((nl) => {
			updateBlockLayout(nl.i, nl);
		});

		toast.custom(() => (
			<Card className="">
				<p>Would you like to save this?</p>
				<Button onClick={() => handleSaveLayout(newLayout)}>Save this</Button>
			</Card>
		));
	};

	const blocksToRender = useMemo(() => {
		return clientBlocks?.map((block) => (
			<div key={block.id}>
				<Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
					<CardHeader className="border-b p-3">
						<CardTitle>{block?.name}</CardTitle>
					</CardHeader>
					<div className="text-xs">{JSON.stringify(block.layout, null, 2)}</div>
				</Card>
			</div>
		));
	}, [clientBlocks]);

	return (
		<>
			<ReactGridLayout
				className="layout "
				cols={12}
				rowHeight={150}
				width={1200}
				layout={layout}
				onLayoutChange={onLayoutChange}
			>
				{blocksToRender}
			</ReactGridLayout>
		</>
	);
};
