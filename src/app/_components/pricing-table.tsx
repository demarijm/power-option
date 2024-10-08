const products = [
	{
		products: [
			{
				name: "base",
				type: "year",
				price: "142.99",
				productId: "price_1Q2LvHBlBPgVg69x64mF88f9",
				description: ["Unlimited Charts"],
				active: true,
			},
			{
				name: "Advanced+",
				type: "year",
				price: "238.99",
				productId: "price_1Q2LvHBlBPgVg69x64mF88f9",
				description: ["Appointment scheduling"],
				active: true,
			},
			{
				name: "Enterprize",
				type: "year",
				price: "238.99",
				productId: "",
				description: ["Appointment scheduling"],
				active: false,
			},
		],
	},
	{
		products: [
			{
				name: "base",
				type: "month",
				price: "14,99",
				productId: "price_1Q2LvHBlBPgVg69x64mF88f9",
				description: ["Appointment scheduling"],
				active: true,
			},
			{
				name: "Office+",
				type: "month",
				price: "24,99",
				productId: "price_1Q2LvHBlBPgVg69x64mF88f9",
				description: ["Appointment scheduling"],
				active: true,
			},
			{
				name: "Enterprize",
				type: "month",
				price: "24,99",
				productId: "",
				description: [
					"Appointment scheduling",
					"Patient notification",
					"Create up to one office",
					"appointment Tagging System",
					"Appointment status updates",
					"Appointment history tracking and filtering",
				],
				active: false,
			},
		],
	},
];

export function ProductCard({
	selectedPlan,
	product,
}: {
	selectedPlan: {
		plan: string;
		setPlan: React.Dispatch<React.SetStateAction<string>>;
	};
	product: {
		name: string;
		type: string;
		price: string;
		productId: string;
		description: string[];
		active: boolean;
	};
}) {
	if (product.active) {
		return (
			<div
				className={`rounded-md border-2 p-10 hover:cursor-pointer ${
					selectedPlan.plan === product.productId
						? "-translate-y-2"
						: "hover:-translate-y-2"
				} min-h-[22rem] w-full max-w-[21rem] transition-all`}
				onClick={() => selectedPlan.setPlan(product.productId)}
			>
				<div className="mb-2 text-3xl font-bold capitalize">
					{product.name} Plan
				</div>
				<div className="mb-2 flex items-baseline">
					<div className="mr-2 text-3xl">${product.price}</div> Per{" "}
					{product.type}
				</div>
				<ul className="list-disc pl-4">
					{product.description.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		);
	}
	return (
		<div
			className={
				"min-h-[22rem] w-full max-w-[21rem] border-2 border-neutral-400 bg-black p-10 text-neutral-400"
			}
		>
			<div className="mb-2 text-3xl font-bold capitalize">
				{product.name} Plan
			</div>
			<div className="mb-2 flex items-baseline">
				<div className="mr-2 text-3xl">${product.price}</div> Per {product.type}
			</div>
			<ul className="list-disc pl-4">
				{product.description.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export default function PricingTable({
	selectedPlan,
	selectedType,
}: {
	selectedPlan: {
		plan: string;
		setPlan: React.Dispatch<React.SetStateAction<string>>;
	};
	selectedType: {
		type: string;
		setType: React.Dispatch<React.SetStateAction<string>>;
	};
}) {
	return (
		<>
			<div className="m-auto mb-6 flex">
				<div
					className="m-2 border px-5 py-2 hover:cursor-pointer"
					onClick={() => selectedType.setType("monthly")}
				>
					Monthly
				</div>
				<div
					className="m-2 border px-5 py-2 hover:cursor-pointer"
					onClick={() => selectedType.setType("yearly")}
				>
					Yearly
				</div>
			</div>
			<div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
				{selectedType.type === "monthly"
					? products[1].products.map((product, index) => (
							<ProductCard
								selectedPlan={selectedPlan}
								product={product}
								key={index}
							/>
						))
					: products[0].products.map((product, index) => (
							<ProductCard
								selectedPlan={selectedPlan}
								product={product}
								key={index}
							/>
						))}
			</div>
		</>
	);
}
