"use client";

import {
	Combobox as Combo,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Label,
} from "@headlessui/react";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Check, ChevronUp } from "lucide-react";

type Option = {
	label: string;
	value: string;
};

interface GenericComboboxProps {
	name: string;
	label: string;
	options: Option[];
}

export default function Combobox({
	name,
	label,
	options,
}: GenericComboboxProps) {
	const { control, setValue } = useFormContext();
	const [query, setQuery] = useState("");

	const filteredOptions =
		query === ""
			? options
			: options.filter((option) =>
					option.label.toLowerCase().includes(query.toLowerCase()),
				);

	return (
		<div>
			<Label className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</Label>
			<div className="relative mt-2">
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<Combo
							as="div"
							value={field.value}
							onChange={(selectedOption) => {
								setQuery("");
								setValue(name, selectedOption);
							}}
						>
							<ComboboxInput
								className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={(event) => setQuery(event.target.value)}
								onBlur={() => setQuery("")}
								displayValue={(option) => option?.label || ""}
							/>
							<ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
								<ChevronUp
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</ComboboxButton>

							{filteredOptions.length > 0 && (
								<ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredOptions.map((option) => (
										<ComboboxOption
											key={option.value}
											value={option}
											className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
										>
											<div className="flex">
												<span className="truncate group-data-[selected]:font-semibold">
													{option.label}
												</span>
											</div>

											<span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
												<Check className="h-5 w-5" aria-hidden="true" />
											</span>
										</ComboboxOption>
									))}
								</ComboboxOptions>
							)}
						</Combo>
					)}
				/>
			</div>
		</div>
	);
}
