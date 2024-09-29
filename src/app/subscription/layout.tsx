import { getServerAuthSession } from "@/server/auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect } from "react";

export default async function DashboardSubscription({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerAuthSession();

	if (session?.user?.isActive) {
		redirect("/dashboard");
	}
	// if (status === "unauthenticated") {
	// 	return redirect("/");
	// }

	// if (status === "loading") {
	// 	return <p>Loading...</p>;
	// }

	// if (status === "authenticated" && !session?.user?.isActive) {
	// }
	return (
		<section className="flex min-h-screen items-center">
			{/* Include shared UI here e.g. a header or sidebar */}
			<nav></nav>

			{children}
		</section>
	);
}
