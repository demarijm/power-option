import { restClient } from "@polygon.io/client-js";
export const poly = restClient(process.env.POLY_API_KEY);
