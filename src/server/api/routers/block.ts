import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { BlockType, DisplayType } from "@prisma/client";

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
					meta: {
						create: {
							ticker: input.ticker,
							type: "CHART",
							display: "TOP10DARKPOOL",
						},
					},
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
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().optional(),
				description: z.string().optional(),
				ticker: z.string().optional().default("SPX"),
				type: z.nativeEnum(BlockType).optional(),
				display: z.nativeEnum(DisplayType).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const data = await ctx.db.block.update({
				where: {
					id: input.id,
				},
				data: {
					name: input?.name,
					description: input?.description,
					meta: {
						update: {
							ticker: input?.ticker,
							type: input?.type,
							display: input?.display,
						},
					},
				},
			});
			return data;
		}),
	delete: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.block.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
