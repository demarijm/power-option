import { env } from "@/env";
import { restClient, websocketClient, IWebsocketClient } from "@polygon.io/client-js";
export const poly = restClient(env.POLYGON_API_KEY, "https://api.polygon.io", {
	trace: true,
});

export const polySocket = websocketClient(
	env.POLYGON_API_KEY,
	"wss://delayed.polygon.io",
);
