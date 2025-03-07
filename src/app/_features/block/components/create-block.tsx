"use client";
import { Button } from "@/app/_components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Form } from "@/app/_components/ui/form/form";
import { Input } from "@/app/_components/ui/form/input";
import { Select } from "@/app/_components/ui/form/select";
import { api } from "@/trpc/react";
import {
	type CreateBlockInput,
	createBlockSchema,
} from "@/app/_features/block/api/create-block";
import React from "react";
import { toast } from "sonner";
import SelectTicker from "../../ticker/components/select-ticker";
type Props = {
	viewId: string;
};

const CreateBlock = ({ viewId }: Props) => {
	const [open, setOpen] = React.useState(false);
	const utils = api.useUtils();
	const { mutate, isError, isPending, error } = api.block.create.useMutation({
		onSuccess: () => {
			toast.success("Block created successfully!");
			return utils.view.getViewById.invalidate({
				id: viewId,
			});
		},
		onError: (error) => {
			toast.error(`Error creating block: ${error}`);
			console.error("Error creating block:", error);
		},
	});

	const handleCreateBlock = (data: CreateBlockInput) => {
		console.log(data);
		mutate({
			layout: data.layout,
			name: data.name,
			ticker: data.ticker,
			type: data.type,
			viewId: viewId,
		});
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<Button disabled={isPending}>
						{isPending ? "Creating..." : "Create Block"}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<Form onSubmit={handleCreateBlock} schema={createBlockSchema}>
						{({ register, formState, setValue }) => (
							<>
								<DialogHeader>
									<DialogTitle>Create a block</DialogTitle>
									<DialogDescription>
										This will create a new block on your dashboard.
									</DialogDescription>

									<input type="hidden" {...register("viewId")} value={viewId} />
									<Input
										label="Name"
										error={formState.errors.name}
										registration={register("name")}
									/>
									<div className="grid gap-3  grid-cols-2">
										<Select
											label="Type"
											defaultValue="CHART"
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
										<SelectTicker
											onChange={(v) => setValue("ticker", v.ticker)}
										/>
									</div>

									<Button name="submit" type="submit">
										Submit
									</Button>
									{isError && (
										<p className="mt-2 text-red-500">Error: {error.message}</p>
									)}
								</DialogHeader>
							</>
						)}
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateBlock;
