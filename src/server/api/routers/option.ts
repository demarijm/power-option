import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { observable } from "@trpc/server/observable";
import { env } from "@/env";

export const optionRouter = createTRPCRouter({
	optionsSubscription: publicProcedure
		.input(
			z.object({
				ticker: z.string().min(1),
			}),
		)
		.subscription(({ input }) => {
			return observable((emit) => {
				const ws = new WebSocket("wss://socket.polygon.io/options");
			});
		}),
});
