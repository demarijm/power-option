import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import Dashboard from "./_features/dashboard/components/view-dashboard";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Card } from "./_components/ui/card";

export default async function Home() {
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
