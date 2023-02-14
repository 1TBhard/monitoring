import { QueryClient } from "@tanstack/react-query";

export const QUERY_KEY = {
	PROJECT: "PROJECT",
	SPOT: "SPOT",
	AGENT: "AGENT",
} as const;

export const queryClient = new QueryClient();
