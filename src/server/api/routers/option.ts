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
	getOptionChain: publicProcedure
		.input(
			z.object({
				ticker: z.string().min(1).optional().default("AAPL"),
				expiration_date: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const optionChain = await ctx.poly.options.snapshotOptionChain(
				input.ticker,
				{
					expiration_date: input.expiration_date,
				},
			);

			// Check if the optionChain or its results are empty
			console.log("Option Chain Response:", optionChain);

			if (
				!optionChain ||
				!optionChain.results ||
				optionChain.results.length === 0
			) {
				return {
					error: "No data available for the given ticker and expiration date.",
				};
			}

			const impliedVolatilities = optionChain.results.map(
				(item) => item.implied_volatility,
			);

			// Calculate the average IV dynamically
			const totalIV = impliedVolatilities.reduce((acc, iv) => acc + iv, 0);
			const averageIV =
				impliedVolatilities.length > 0
					? totalIV / impliedVolatilities.length
					: 0;

			// Reshape the data with the calculated average IV
			const reshapedData = {
				strikePrices: optionChain.results.map(
					(item) => item.details.strike_price,
				),
				gammas: optionChain.results.map((item) => item.greeks.gamma),
				impliedVolatilities: impliedVolatilities,
				averageIVs: optionChain.results.map(() => averageIV), // Apply calculated average IV for all entries
				positiveGammas: optionChain.results.map((item) =>
					item.greeks.gamma > 0 ? item.greeks.gamma : 0,
				),
				negativeGammas: optionChain.results.map((item) =>
					item.greeks.gamma < 0 ? item.greeks.gamma : 0,
				),
			};

			return reshapedData;
		}),
});
