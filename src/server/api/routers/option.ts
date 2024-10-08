import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import {
	restClient,
	websocketClient,
	IWebsocketClient,
} from "@polygon.io/client-js";

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
	getDdoi: publicProcedure
		.input(
			z.object({
				ticker: z.string().min(1).optional().default("AAPL"),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.poly.options.snapshotOptionChain(input.ticker, {
				limit: 100,
				sort: "expiration_date",
				order: "asc",
				// expiration_date: "2024-10-02",
			});
		}),
	getTickers: publicProcedure
		.input(
			z.object({
				search: z.string().optional().default(""),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.poly.reference.tickers({
				type: "ETF",
				limit: 250,
				active: "true",
				market: "stocks",
				search: input.search,
			});
		}),
	getNews: publicProcedure
		.input(
			z.object({
				ticker: z.string().optional().default("SPY"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { results } = await ctx.poly.reference.tickerNews({
				ticker: input.ticker,
				limit: 20,
			});
			return results;
		}),
});
