export const QUERY_COMMON = {
	RETRY: 0,
	RETRY_DELAY: 2000, // ms
	STALE_TIME: 4000,
	CACHE_TIME: 60 * 1000, // 30분,
	REFETCH_INTERVAL: 5000,
} as const;

export const QUERY_BY_HOUR = {
	RETRY: 0,
	RETRY_DELAY: 5000, // ms
	STALE_TIME: 60 * 1000, // 1시간
	CACHE_TIME: 59 * 1000, // 59분,
	REFETCH_INTERVAL: 60 * 1000, // 1시간
} as const;

export const QUERY_BY_DAY = {
	RETRY: 0,
	RETRY_DELAY: 5000,
	STALE_TIME: 24 * 60 * 1000, // 하루
	CACHE_TIME: 24 * 59 * 1000, // 하루 1분전,
	REFETCH_INTERVAL: 60 * 1000, // 1시간
} as const;

export const QUERY_LONG_TERM = {
	RETRY: 5,
	RETRY_DELAY: 5000, // ms
	STALE_TIME: Infinity,
	CACHE_TIME: 60 * 1000, // 1시간
} as const;
