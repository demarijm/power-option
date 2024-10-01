import { BlockType } from "@prisma/client";
import { z } from "zod";
export const defaultLayout = { x: 3, y: 1, w: 3, h: 1 };
export const layoutSchema = z.object({
	x: z.number(),
	y: z.number(),
	w: z.number(),
	h: z.number(),
});
export const createBlockSchema = z.object({
	viewId: z.string(),
	name: z.string().default("New Block"),
	ticker: z.string().default("SPX"),
	type: z.nativeEnum(BlockType),
	layout: layoutSchema.default({ x: 3, y: 1, w: 3, h: 1 }),
});
export type CreateBlockInput = z.infer<typeof createBlockSchema>;
