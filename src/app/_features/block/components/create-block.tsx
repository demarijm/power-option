"use client";
import { Button } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";

import React from "react";
import { toast } from "sonner";
type Props = {
	viewId: string;
};
const CreateBlock = ({ viewId }: Props) => {
	const layout = { x: 8, y: 1, w: 3, h: 1 };
	const { mutate, isError, isPending, error } = api.block.create.useMutation({
		onSuccess: () => {
			// Optionally, you can handle success (e.g., refetch data, show a notification)
			console.log("Block created successfully!");
		},
		onError: (error) => {
			// Optionally, handle errors here
			toast.error(`Error creating block: ${error}`);
			console.error("Error creating block:", error);
		},
	});
	const handleCreateBlock = () => {
		mutate({
			layout: layout,
			name: "New Block",
			ticker: "SPX",
			type: "CHART",
			viewId: viewId,
		});
	};
	return (
		<div>
			<Button onClick={handleCreateBlock} disabled={isPending}>
				{isPending ? "Creating..." : "Create Block"}
			</Button>
			{isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
		</div>
	);
};

export default CreateBlock;
