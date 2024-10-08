/* eslint-disable max-lines-per-function */
"use client";
import { ChevronDownIcon, X } from "lucide-react";
import {
	useFormContext,
	type FieldValues,
	type Path,
	type UseFormReturn,
} from "react-hook-form";
import {
	FormItem,
	FormField,
	FormControl,
	FormLabel,
	FormMessage,
} from "./form/form";
import Select, {
	type Props as SelectProps,
	type ActionMeta,
	type GroupBase,
	components,
	type DropdownIndicatorProps,
	type ClearIndicatorProps,
	type MultiValueRemoveProps,
} from "react-select";
import { cn } from "@/lib/utils";

interface MultiSelectFieldProps<
	T extends FieldValues,
	Option,
	IsMulti extends boolean = true,
	Group extends GroupBase<Option> = GroupBase<Option>,
> {
	label?: string;
	placeholder?: string;
	name: Path<T>;
	isMulti?: IsMulti;
	onChange?: (
		newValue: IsMulti extends true ? readonly Option[] : Option | null,
		actionMeta: ActionMeta<Option>,
	) => void;
	selectProps?: Omit<
		SelectProps<Option, IsMulti, Group>,
		"name" | "value" | "onChange"
	>;
}

const DropdownIndicator = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
>(
	props: DropdownIndicatorProps<Option, IsMulti, Group>,
) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownIcon size={16} />
		</components.DropdownIndicator>
	);
};

const ClearIndicator = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
>(
	props: ClearIndicatorProps<Option, IsMulti, Group>,
) => {
	return (
		<components.ClearIndicator {...props}>
			<X />
		</components.ClearIndicator>
	);
};

const MultiValueRemove = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
>(
	props: MultiValueRemoveProps<Option, IsMulti, Group>,
) => {
	return (
		<components.MultiValueRemove {...props}>
			<X />
		</components.MultiValueRemove>
	);
};

const MultiSelectField = <
	T extends FieldValues,
	Option,
	IsMulti extends boolean = true,
	Group extends GroupBase<Option> = GroupBase<Option>,
>({
	label,
	placeholder,
	name,
	onChange,
	isMulti,
	selectProps,
}: MultiSelectFieldProps<T, Option, IsMulti, Group>): JSX.Element => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label ? <FormLabel>{label}</FormLabel> : null}
					<FormControl>
						<Select<Option, IsMulti, Group>
							{...selectProps}
							inputId={name}
							{...field}
							isMulti={false as IsMulti}
							closeMenuOnSelect={selectProps?.closeMenuOnSelect}
							hideSelectedOptions={false}
							name={name as string}
							unstyled
							styles={{
								input: (base) => ({
									...base,
									"input:focus": {
										boxShadow: "none",
									},
								}),
								// On mobile, the label will truncate automatically, so we want to
								// override that behaviour.
								multiValueLabel: (base) => ({
									...base,
									whiteSpace: "normal",
									overflow: "visible",
								}),
								control: (base) => ({
									...base,
									transition: "none",
								}),
							}}
							value={field.value}
							components={{
								DropdownIndicator,
								ClearIndicator,
								MultiValueRemove,
							}}
							onChange={(newValue, actionMeta) => {
								field.onChange(newValue);
								if (onChange) {
									onChange(newValue, actionMeta);
								}
							}}
							onBlur={field.onBlur}
							placeholder={placeholder}
							className="react-select-container"
							classNamePrefix="react-select"
							classNames={{
								control: ({ isFocused }) =>
									cn(
										isFocused ? controlStyles.focus : controlStyles.nonFocus,
										controlStyles.base,
									),
								placeholder: () => placeholderStyles,
								input: () => selectInputStyles,
								valueContainer: () => valueContainerStyles,
								singleValue: () => singleValueStyles,
								multiValue: () => multiValueStyles,
								multiValueLabel: () => multiValueLabelStyles,
								multiValueRemove: () => multiValueRemoveStyles,
								indicatorsContainer: () => indicatorsContainerStyles,
								clearIndicator: () => clearIndicatorStyles,
								// indicatorSeparator: () => indicatorSeparatorStyles,
								dropdownIndicator: () => dropdownIndicatorStyles,
								menu: () => menuStyles,
								groupHeading: () => groupHeadingStyles,
								option: ({ isFocused, isSelected }) =>
									cn(
										isFocused && optionStyles.focus,
										isSelected && optionStyles.selected,
										optionStyles.base,
									),
								noOptionsMessage: () => noOptionsMessageStyles,
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { MultiSelectField };

const controlStyles = {
	base: "border rounded-lg bg-white hover:cursor-pointer",
	focus: "border-primary-600 ring-1 ring-primary-500",
	nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const selectInputStyles =
	"flex flex-grow min-w-[20px] h-6  rounded-sm  border-none bg-transparent px-3  text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
	"bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
	"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
	"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const dropdownIndicatorStyles =
	"p-1 hover:bg-gray-100 text-black rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
	base: "hover:cursor-pointer px-3 py-2 rounded",
	focus: "bg-gray-100 active:bg-gray-200",
	selected: "after:content-['X'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
	"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";
