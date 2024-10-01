import { api, HydrateClient } from "@/trpc/server";
import { BlockRender } from "@/app/_features/block/components/list-blocks";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page({ params }: { params: { id: string } }) {
	const view = await api.view.getViewById({
		id: params.id,
	});
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={<div>Loading...</div>}>
				<HydrateClient>
					{view?.id && <BlockRender viewId={view.id} blocks={view.blocks} />}
				</HydrateClient>
			</Suspense>
		</ErrorBoundary>
	);
}
