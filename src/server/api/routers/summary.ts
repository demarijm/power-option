import { z } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { isValid, parseISO } from "date-fns";

const layoutSchema = z.object({
	x: z.number(),
	y: z.number(),
	w: z.number(),
	h: z.number(),
});
const polygonDateSchema = z
	.string()
	.refine((str) => isValid(parseISO(str)), {
		message: "Invalid date format. Expected YYYY-MM-DD.",
	})
	.transform((str) => parseISO(str));

export const summaryRouter = createTRPCRouter({
	summary: publicProcedure
		.input(
			z.object({
				ticker: z.string().default("O:SPY251219C00650000"),
				multiplier: z.number().default(1),
				timespan: z
					.enum([
						"day",
						"second",
						"minute",
						"hour",
						"week",
						"month",
						"quarter",
						"year",
					])
					.default("day"),
				from: polygonDateSchema.default("2023-01-09"),
				to: polygonDateSchema.default("2023-02-10"),
			}),
		)
		.query(async ({ input, ctx }) => {
			const res = await ctx.poly.options.aggregates(
				input.ticker,
				input.multiplier,
				input.timespan,
				input.from,
				input.to,
			);

			return {
				summary: res.results,
			};
		}),
});
