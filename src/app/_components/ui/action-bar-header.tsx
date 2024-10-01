"use client";
import CreateBlock from "@/app/_features/block/components/create-block";
import { useParams } from "next/navigation";
import React from "react";

const ActionBarHeader = () => {
	const params = useParams();
	const { id } = params;
	if (!id) {
		return null;
	}
	return (
		<div className="border-b">
			<div className="mx-auto flex justify-end px-4 sm:px-6 mb-3 lg:px-8">
				<CreateBlock viewId={typeof id === "string" ? id : id[0]} />
			</div>
		</div>
	);
};

export default ActionBarHeader;
