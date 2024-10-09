"use client";
import CreateBlock from "@/app/_features/block/components/create-block";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { Pencil } from "lucide-react";
import { useBlockStore } from "@/app/_features/block/store/block-store";

const ActionBarHeader = () => {
	const params = useParams();
	const { toggleEditMode } = useBlockStore();
	const { id } = params;
	if (!id) {
		return null;
	}
	return (
		<div className="border-b">
			<div className="mx-auto mb-3 gap-4 flex justify-end px-4 sm:px-6 lg:px-8">
				<Button onClick={toggleEditMode} variant={"outline"}>
					<Pencil size={18} />
				</Button>
				<CreateBlock viewId={typeof id === "string" ? id : id[0]} />
			</div>
		</div>
	);
};

export default ActionBarHeader;
