import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { BlockType } from "@prisma/client";

export const layoutSchema = z.object({
	x: z.number(),
	y: z.number(),
	w: z.number(),
	h: z.number(),
});
type Layout = z.infer<typeof layoutSchema>;
export const blockRouter = createTRPCRouter({
	getByView: protectedProcedure
		.input(
			z.object({
				viewId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const view = await ctx.db.view.findUnique({
				where: { id: input.viewId },
				include: { blocks: true },
			});

			if (view?.userId !== ctx.session.user.id) throw new Error("Unauthorized");

			return ctx.db.view.findUnique({
				where: {
					id: input.viewId,
				},
				include: {
					blocks: true,
				},
			});
		}),
	create: protectedProcedure
		.input(
			z.object({
				viewId: z.string(),
				name: z.string(),
				ticker: z.string(),
				type: z.nativeEnum(BlockType),
				layout: layoutSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId: string | undefined = ctx.session?.user?.id;
			if (!userId) throw new Error("Not authenticated");

			const view = await ctx.db.view.findUnique({
				where: { id: input.viewId },
			});

			if (view?.userId !== userId) throw new Error("Unauthorized");
			const layout: Layout = input.layout;
			const data = await ctx.db.block.create({
				data: {
					name: input.name,
					ticker: input.ticker,
					type: input.type,
					layout: {
						create: {
							...layout,
						},
					},
					view: { connect: { id: input.viewId } },
				},
			});
			return data;
		}),
	delete: protectedProcedure
		.input(
			z.object({
				viewId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const block = await ctx.db.block.findUnique({
				where: { id: input.viewId },
				include: {
					view: true,
				},
			});
			if (block?.view?.userId !== ctx.session.user.id)
				throw new Error("Unauthorized");

			return ctx.db.block.delete({
				where: {
					id: input.viewId,
				},
			});
		}),
});
