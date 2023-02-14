export const QUERY_COMMON = {
	RETRY: 5,
	RETRY_DELAY: 2000, // ms
	STALE_TIME: 5000,
	CACHE_TIME: 5000,
} as const;

export const QUERY_LONG_TERM = {
	RETRY: 5,
	RETRY_DELAY: 2000, // ms
	STALE_TIME: Infinity,
	CACHE_TIME: 60 * 1000, // 1시간
};
