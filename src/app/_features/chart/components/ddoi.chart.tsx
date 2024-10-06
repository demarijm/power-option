import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
const DdoiChart: React.FC = () => {
	const { data, error } = api.option.getDdoi.useQuery({
		ticker: "EVRI",
	});

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Ddoi Chart</h1>
			<pre>{<pre>{JSON.stringify(data, null, 2)}</pre>}</pre>
		</div>
	);
};

export default DdoiChart;
