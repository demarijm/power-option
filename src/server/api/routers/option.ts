import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { observable } from "@trpc/server/observable";
import { env } from "@/env";
import { restClient } from "@polygon.io/client-js";

export const optionRouter = createTRPCRouter({
	getDarkpoolOrders: publicProcedure
		.input(
			z.object({
				ticker: z.string().min(1).optional().default("O:TSLA210903C00700000"),
				"timestamp.gt": z.string().optional(),
				limit: z.number().optional().default(100),
				"timestamp.gte": z.string().optional(),
				"timestamp.lte": z.string().optional(),
				"timestamp.lt": z.string().optional(),
				order: z.enum(["asc", "desc"]).optional(),
				timestamp: z.string().min(6).optional(),
			}),
		)
		.query(({ ctx, input }) => {
			return ctx.poly.options.trades(input.ticker, {
				"timestamp.gt": input["timestamp.gt"],
				limit: input.limit,
				"timestamp.gte": input["timestamp.gte"],
				"timestamp.lte": input["timestamp.lte"],
				"timestamp.lt": input["timestamp.lt"],
				order: input.order,
				timestamp: input.timestamp,
			});
		}),
});
