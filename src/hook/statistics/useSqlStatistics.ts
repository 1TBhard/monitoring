/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import getSqlStatistics from "src/api/statistics/getSqlStatistics";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { TOP_SQL_ERROR_NUMBER } from "src/const/STATISTICS";
import { QUERY_KEY } from "src/hook/store";

interface UseExceptionParams {
	stime: number;
	etime: number;
}

export default function useSqlStatistics({ stime, etime }: UseExceptionParams) {
	const { data, isLoading } = useQuery({
		queryFn: () => getSqlStatistics({ stime, etime }),
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SQL, stime, etime],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
	});

	const topSqlErrorStatistics =
		data?.records
			.sort((a, b) => b.count_error - a.count_error)
			.slice(0, TOP_SQL_ERROR_NUMBER) ?? [];

	// useMemo의 키
	const memoKey = topSqlErrorStatistics
		?.map((sqlStatistic) => sqlStatistic.count_error)
		.join("-");

	const sqlStatistics = useMemo(() => topSqlErrorStatistics, [memoKey]);

	const totalError = useMemo(() => {
		data?.records.reduce((acc, cur) => acc + cur.count_error, 0);
	}, [memoKey]);

	return {
		sqlStatistics,
		allSqlStatistics: data?.records ?? [],
		totalError,
		totalService: data?.records ?? 0,
		isLoading,
	};
}
