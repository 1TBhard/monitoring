import { QueryClient } from "@tanstack/react-query";

export const QUERY_KEY = {
	PROJECT: "PROJECT",
	SPOT: "SPOT",
	AGENT: "AGENT",
	EXCEPTION: "EXCEPTION",
	ACTIVE_USER: "ACTIVE_USER",
} as const;

export const queryClient = new QueryClient();
