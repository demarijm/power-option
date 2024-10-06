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
	getAggregatesPerSecond: publicProcedure
		.input(
			z.object({
				ticker: z.string().min(1).optional().default("AAPL"),
			}),
		)
		.subscription(async ({ ctx, input }) => {
			if (!ctx.polySocket) {
				throw new Error("polySocket is not initialized");
			}

			const ws = ctx.polySocket.options();

			ws.on("error", (err: Error) => console.log("Failed to connect", err));

			ws.onclose((e) => {
				console.log("Connection closed", e);
			});

			ws.on("message", (msg: string) => {
				const parsedMessage = JSON.parse(msg);

				if (
					parsedMessage[0].ev === "status" &&
					parsedMessage[0].status === "auth_success"
				) {
					console.log(
						"Subscribing to the minute aggregates channel for ticker AAPL",
					);
					ws.send(JSON.stringify({ action: "subscribe", params: "AM.AAPL" }));
				}

				console.log("Message received:", parsedMessage);
			});
		}),
});
