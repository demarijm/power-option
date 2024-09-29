import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import Dashboard from "./_features/dashboard/components/view-dashboard";
import Header from "@/app/_components/header";
import { Input } from "@/app/_components/ui/input";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import OptionsDataChart from "./_features/chart/view-option";
import ScatterChart from "./_features/chart/view-option";
import { Card } from "./_components/ui/card";

export default async function Home() {
	const hello = await api.post.hello({ text: "from tRPC" });

	const views = await api.view.getAll();
	const session = await getServerAuthSession();
	void api.post.getLatest.prefetch();
	if (!session) {
		redirect("/api/auth/signin");
	}

	return (
		<HydrateClient>
			<div className="max-w-full px-3  min-h-screen">
				{views.map((v) => {
					return (
						<Link key={v.id} href={`/views/${v.id}`}>
							<Card>{v.name}</Card>
						</Link>
					);
				})}
				<Dashboard />
			</div>{" "}
		</HydrateClient>
	);
}
