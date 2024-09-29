import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { layoutSchema } from "./block";

export const viewRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.view.findMany({
			where: {
				userId: ctx.session.user.id,
			},
		});
	}),
	getViewById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return ctx.db.view.findUnique({
				where: {
					id: input.id,
				},
				include: {
					blocks: {
						include: {
							layout: true,
						},
					},
				},
			});
		}),
	updateBlocks: protectedProcedure
		.input(
			z.object({
				viewId: z.string(),
				blocks: z.array(
					z.object({
						id: z.string(),
						layout: layoutSchema,
					}),
				),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { viewId, blocks } = input;

			const updateBlockPromises = blocks.map((block) => {
				console.log("This is the new update", block);
				return ctx.db.blockLayout.update({
					where: {
						blockId: block.id,
					},
					data: {
						x: block.layout.x,
						y: block.layout.y,
						w: block.layout.w,
						h: block.layout.h,
					},
				});
			});

			await Promise.all(updateBlockPromises);

			return { success: true };
		}),
	create: protectedProcedure
		.input(
			z.object({
				name: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.view.create({
				data: {
					name: input.name,
					user: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
	delete: protectedProcedure
		.input(
			z.object({
				viewId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const view = await ctx.db.view.findUnique({
				where: { id: input.viewId },
			});
			if (view?.userId !== ctx.session.user.id) throw new Error("Unauthorized");

			return ctx.db.view.delete({
				where: {
					id: input.viewId,
				},
			});
		}),
});
