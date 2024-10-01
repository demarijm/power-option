import { env } from "@/env";
import { restClient } from "@polygon.io/client-js";
export const poly = restClient(env.POLYGON_API_KEY, "https://api.polygon.io", {
	trace: true,
});
