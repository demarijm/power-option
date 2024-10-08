"use client";
import { MultiSelectField } from "@/app/_components/ui/multi-select-field";
import { api } from "@/trpc/react";
import type React from "react";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce"; // You can use lodash for debouncing
import { ITickerDetails, ITickerTypes } from "@polygon.io/client-js";

type Props = {
	onChange: (value: any | null) => void;
};
const SelectTicker: React.FC<Props> = ({ onChange }) => {
	// Local state for the search input
	const [searchTerm, setSearchTerm] = useState("");

	// Debounce the search term to prevent excessive React Query calls
	const debouncedSearchTerm = debounce((term) => {
		setSearchTerm(term);
	}, 300);

	// Update search input when typing in MultiSelectField
	const handleSearchChange = (inputValue: string) => {
		debouncedSearchTerm(inputValue);
	};

	// Fetch tickers using the search term
	const tickers = api.option.getTickers.useQuery({
		search: searchTerm,
	});

	// Check if data is loading or fetching new results
	const isFetching = tickers.isFetching;

	if (tickers.error) {
		return <div>Error loading tickers</div>;
	}

	return (
		<>
			<MultiSelectField
				name="ticker"
				label="Ticker"
				isMulti={false}
				onChange={onChange}
				selectProps={{
					options: tickers.data ? tickers.data.results : [], // Use empty array while loading
					// isMulti: false,
					closeMenuOnSelect: true,

					getOptionLabel: (option) => option.ticker,
					getOptionValue: (option) => option.ticker,
					onInputChange: handleSearchChange, // Capture search input
					isLoading: isFetching, // Optional loading state for the field
				}}
			/>
		</>
	);
};

export default SelectTicker;
