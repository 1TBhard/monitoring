import getSqlStatistics from "src/api/statistics/getSqlStatistics";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { TOP_SQL_ERROR_NUMBER } from "src/const/STATISTICS";
import { useQuery } from "@tanstack/react-query";

interface UseExceptionParams {
	stime: number;
	etime: number;
}

export default function useSqlStatistics({ stime, etime }: UseExceptionParams) {
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSqlStatistics({ stime, etime }),
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SQL],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
		notifyOnChangeProps: ["data", "error"],
	});

	const topSqlErrorStatistics =
		data?.records
			.sort((a, b) => b.count_error - a.count_error)
			.slice(0, TOP_SQL_ERROR_NUMBER) ?? [];

	const totalError = data?.records.reduce(
		(acc, cur) => acc + cur.count_error,
		0
	);

	return {
		sqlStatistics: topSqlErrorStatistics,
		allSqlStatistics: data?.records ?? [],
		totalError,
		totalService: data?.records ?? 0,
		isLoading,
		isError,
	};
}
