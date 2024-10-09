import React from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import {
	BlockType,
	DisplayType,
	type Block,
	type BlockMeta,
} from "@prisma/client";
import { Form } from "@/app/_components/ui/form/form";

import { z } from "zod";
import { Input } from "@/app/_components/ui/form/input";
import { Select } from "@/app/_components/ui/form/select";
import { Settings } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { MultiSelectField } from "@/app/_components/ui/multi-select-field";
import SelectTicker from "../../ticker/components/select-ticker";
type Props = {
	block: Block & {
		meta: BlockMeta;
	};
};
const editBlockSchema = z.object({
	viewId: z.string(),
	name: z.string(),
	type: z.nativeEnum(BlockType),
	ticker: z.string().optional(),
	display: z.nativeEnum(DisplayType),
});
const BlockSettings = ({ block }: Props) => {
	const utils = api.useUtils();
	const { mutate } = api.block.update.useMutation({
		onSuccess: () => {
			toast.success("Block updated successfully!");
			return utils.view.getViewById.invalidate({
				id: block.viewId,
			});
		},
		onError: (error) => {
			toast.error(`Error updating block: ${error.message}`);
			console.error("Error updating block:", error);
		},
	});
	function handleEditBlock(data: z.infer<typeof editBlockSchema>) {
		mutate({
			id: block.id,
			name: data.name,
			type: data.type,
			ticker: block.meta.ticker,
			display: data.display,
		});
	}
	return (
		<div>
			{" "}
			<Popover>
				<PopoverTrigger asChild>
					<Settings size={18} />
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="grid gap-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Dimensions</h4>
							<p className="text-sm text-muted-foreground">
								Set the dimensions for the layer.
							</p>
						</div>
						<div className="grid gap-2">
							<div className="grid w-full items-center gap-2">
								<Form onSubmit={handleEditBlock} schema={editBlockSchema}>
									{({ register, formState }) => (
										<div className="w-full grid gap-3">
											<input
												type="hidden"
												{...register("viewId")}
												value={block.viewId}
											/>
											<Input
												label="Name"
												defaultValue={block.name}
												error={formState.errors.name}
												registration={register("name")}
											/>
											<SelectTicker />
											{/* <Input
												label="Ticker"
												defaultValue={block.ticker}
												error={formState.errors.ticker}
												registration={register("ticker")}
											/> */}

											<Select
												label="Type"
												defaultValue={block.meta.type}
												error={formState.errors.type}
												registration={register("type")}
												options={[
													{
														label: "Chart",
														value: "CHART",
													},
													{
														label: "Table",
														value: "TABLE",
													},
													{
														label: "Notes",
														value: "NOTES",
													},
													{
														label: "News",
														value: "NEWS",
													},
												]}
											/>
											<Select
												label="DisplayType"
												defaultValue={block.meta.display}
												error={formState.errors.type}
												registration={register("display")}
												options={Object.entries(DisplayType).map(
													([key, value]) => ({
														label: key,
														value: value,
													}),
												)}
											/>

											<Button
												className="cursor-pointer"
												variant={"secondary"}
												name="submit"
												type="submit"
											>
												Save
											</Button>

											{formState.errors && (
												<p>{JSON.stringify(formState.errors)}</p>
											)}
										</div>
									)}
								</Form>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default BlockSettings;
