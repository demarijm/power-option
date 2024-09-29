import { api, HydrateClient } from "@/trpc/server";
import { BlockRender } from "@/app/_features/block/components/block-render";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CreateBlock from "@/app/_features/block/components/create-block";

export default async function Page({ params }: { params: { id: string } }) {
	const view = await api.view.getViewById({
		id: params.id,
	});
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={<div>Loading...</div>}>
				<HydrateClient>
					<CreateBlock viewId={view?.id} />
					<BlockRender viewId={view?.id} blocks={view?.blocks} />
				</HydrateClient>
			</Suspense>
		</ErrorBoundary>
	);
}
